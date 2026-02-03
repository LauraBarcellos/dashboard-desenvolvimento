'use client';

import React from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Loader2, Search, Upload, X, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
// Badge removed - unused
import { clienteFormSchema, ESTADOS_BRASIL, type ClienteFormData } from '../schemas';
import {
  FASES_INICIAIS,
  SITUACOES_PROJETO,
  MODELOS_CONTRATO,
  MOCK_USERS,
  FASE_CONFIG,
} from '../constants';
import type { Cliente } from '../types';
import { toast } from 'sonner';

interface ClienteFormProps {
  cliente?: Cliente;
  onSubmit: (data: ClienteFormData) => Promise<void>;
  formId?: string;
  onSubmittingChange?: (isSubmitting: boolean) => void;
}

export interface ClienteFormRef {
  form: UseFormReturn<ClienteFormData>;
  isSubmitting: boolean;
  isEditMode: boolean;
  handleCancel: () => void;
}

/**
 * ViaCEP API response type
 */
interface ViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

/**
 * Format CEP: 12345678 -> 12345-678
 */
function formatCEP(cep: string): string {
  const digits = cep.replace(/\D/g, '');
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
}

/**
 * Format phone: 11987654321 -> (11) 98765-4321
 */
function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Format CPF/CNPJ
 */
function formatDocumento(doc: string): string {
  const digits = doc.replace(/\D/g, '');
  if (digits.length <= 11) {
    // CPF: 000.000.000-00
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
    if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
  } else {
    // CNPJ: 00.000.000/0000-00
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
    if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
    if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
  }
}

/**
 * Cliente form component with validation
 * Supports both create and edit modes
 */
export const ClienteForm = React.forwardRef<ClienteFormRef, ClienteFormProps>(
  ({ cliente, onSubmit, formId, onSubmittingChange }, ref) => {
  const router = useRouter();
  const isEditMode = Boolean(cliente);
  const [isLoadingCEP, setIsLoadingCEP] = React.useState(false);
  const [fotoPreview, setFotoPreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<ClienteFormData>({
    resolver: zodResolver(clienteFormSchema),
    defaultValues: {
      // CAMPOS OBRIGATÓRIOS DA SPEC
      nome: cliente?.nome || '',
      faseInicial: cliente?.faseInicial || undefined,
      situacao: cliente?.situacao || undefined,
      dataInicio: cliente?.dataInicio ? new Date(cliente.dataInicio).toISOString().split('T')[0] : '',
      status: cliente?.status || 'ativo',

      // CAMPOS OPCIONAIS - MODELO E EQUIPE
      modeloContrato: cliente?.modeloContrato || '',
      pm: cliente?.pm || '',
      po: cliente?.po || '',
      techLead: cliente?.techLead || '',

      // CAMPOS OPCIONAIS - LINKS
      linkBoard: cliente?.linkBoard || '',
      linkChat: cliente?.linkChat || '',
      linkHomologacao: cliente?.linkHomologacao || '',

      // CAMPOS OPCIONAIS - CONTATOS
      contatos: cliente?.contatos || [],

      // CAMPOS OPCIONAIS - DADOS ADICIONAIS
      email: cliente?.email || '',
      telefone: cliente?.telefone || '',
      documento: cliente?.documento || '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: undefined,
      endereco: cliente?.endereco || '',
      observacoes: cliente?.observacoes || '',
      fotoPerfil: undefined,
    },
  });

  const handleSubmit = async (data: ClienteFormData) => {
    await onSubmit(data);
  };

  const isSubmitting = form.formState.isSubmitting;
  const handleCancel = () => router.back();

  // Notify parent of submitting state changes
  React.useEffect(() => {
    if (onSubmittingChange) {
      onSubmittingChange(isSubmitting);
    }
  }, [isSubmitting, onSubmittingChange]);

  // Expose form methods to parent
  React.useImperativeHandle(ref, () => ({
    form,
    isSubmitting,
    isEditMode,
    handleCancel,
  }));

  /**
   * Buscar endereço por CEP usando ViaCEP
   */
  const handleBuscarCEP = React.useCallback(async () => {
    const cep = form.getValues('cep') || '';
    const cepDigits = cep.replace(/\D/g, '');

    if (cepDigits.length !== 8) {
      toast.error('CEP inválido', {
        description: 'Por favor, informe um CEP com 8 dígitos.',
      });
      return;
    }

    setIsLoadingCEP(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`);
      const data: ViaCEPResponse = await response.json();

      if (data.erro) {
        toast.error('CEP não encontrado', {
          description: 'O CEP informado não foi encontrado. Verifique e tente novamente.',
        });
        return;
      }

      // Preencher campos automaticamente
      form.setValue('logradouro', data.logradouro || '');
      form.setValue('bairro', data.bairro || '');
      form.setValue('cidade', data.localidade || '');
      form.setValue('estado', data.uf as typeof ESTADOS_BRASIL[number] | undefined);
      form.setValue('complemento', data.complemento || '');

      toast.success('Endereço encontrado!', {
        description: 'Os dados do endereço foram preenchidos automaticamente.',
      });
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      toast.error('Erro ao buscar CEP', {
        description: 'Não foi possível buscar o endereço. Tente novamente.',
      });
    } finally {
      setIsLoadingCEP(false);
    }
  }, [form]);

  // Watch contatos array for dynamic fields
  const contatos = form.watch('contatos') || [];

  return (
    <Form {...form}>
      <form id={formId} onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Informações Básicas */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-foreground">
            Informações Básicas
          </h4>

          {/* Foto de Perfil */}
          <FormField
            control={form.control}
            name="fotoPerfil"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo do Cliente</FormLabel>
                <FormControl>
                  <div className="flex items-start gap-4">
                    {/* Preview da foto */}
                    <div className="relative">
                      {fotoPreview ? (
                        <div className="relative group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={fotoPreview}
                            alt="Preview"
                            className="h-20 w-20 rounded-lg object-cover border-2 border-border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.preventDefault();
                              setFotoPreview(null);
                              field.onChange(undefined);
                              if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                              }
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="h-20 w-20 rounded-lg border-2 border-dashed border-border bg-muted/30 flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Botão de upload */}
                    <div className="flex-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // Validar tamanho
                            if (file.size > 5 * 1024 * 1024) {
                              toast.error('Arquivo muito grande', {
                                description: 'A imagem deve ter no máximo 5MB.',
                              });
                              return;
                            }

                            // Validar tipo
                            if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
                              toast.error('Formato inválido', {
                                description: 'Apenas imagens são permitidas (JPEG, PNG, WebP).',
                              });
                              return;
                            }

                            // Criar preview
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFotoPreview(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                            field.onChange(file);
                          }
                        }}
                        disabled={isSubmitting}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault();
                          fileInputRef.current?.click();
                        }}
                        disabled={isSubmitting}
                        className="w-full sm:w-auto"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {fotoPreview ? 'Alterar Logo' : 'Upload Logo'}
                      </Button>
                      <FormDescription className="mt-2">
                        Formatos aceitos: JPEG, PNG, WebP (máx. 5MB)
                      </FormDescription>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Nome do Cliente *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Banco Central do Brasil" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => {
                // Garantir que o valor seja 'ativo' ou 'inativo'
                const statusValue = field.value === 'inativo' ? 'inativo' : 'ativo';

                return (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-3 h-10">
                        <Button
                          type="button"
                          variant={statusValue === 'ativo' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => field.onChange('ativo')}
                          disabled={isSubmitting}
                          className="flex-1"
                        >
                          Ativo
                        </Button>
                        <Button
                          type="button"
                          variant={statusValue === 'inativo' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => field.onChange('inativo')}
                          disabled={isSubmitting}
                          className="flex-1"
                        >
                          Inativo
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Informações do Projeto */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-foreground">
            Informações do Projeto
          </h4>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <FormField
              control={form.control}
              name="faseInicial"
              render={({ field }) => (
                <FormItem className="lg:col-span-2">
                  <FormLabel>Fase Inicial do Projeto *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a fase" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FASES_INICIAIS.map((fase) => (
                        <SelectItem key={fase} value={fase}>
                          <div className="flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${FASE_CONFIG[fase].bgColor}`} />
                            {fase}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="situacao"
              render={({ field }) => (
                <FormItem className="lg:col-span-1">
                  <FormLabel>Situação do Projeto *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Situação" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SITUACOES_PROJETO.map((situacao) => (
                        <SelectItem key={situacao} value={situacao}>
                          {situacao}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dataInicio"
              render={({ field }) => (
                <FormItem className="lg:col-span-1">
                  <FormLabel>Data de Início *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="modeloContrato"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo de Contrato</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o modelo de contrato" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {MODELOS_CONTRATO.map((modelo) => (
                      <SelectItem key={modelo} value={modelo}>
                        {modelo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="bg-border/50" />

        {/* Equipe do Projeto */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-foreground">
            Equipe Devio
          </h4>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <FormField
              control={form.control}
              name="pm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Manager (PM)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o PM" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MOCK_USERS.filter(u => u.role === 'PM').map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="po"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Owner (PO)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o PO" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MOCK_USERS.filter(u => u.role === 'PO').map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="techLead"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tech Lead</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o Tech Lead" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MOCK_USERS.filter(u => u.role === 'Tech Lead').map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Links do Projeto */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-foreground">
            Links do Projeto
          </h4>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <FormField
              control={form.control}
              name="linkBoard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Azure DevOps (Board)</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://dev.azure.com/..."
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkChat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teams/Slack (Chat)</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://teams.microsoft.com/..."
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkHomologacao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ambiente de Homologação</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://homolog.exemplo.com"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Contatos do Cliente */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-semibold text-foreground">
              Contatos do Cliente
            </h4>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const current = form.getValues('contatos') || [];
                form.setValue('contatos', [
                  ...current,
                  { nome: '', cargo: '', email: '' },
                ]);
              }}
              disabled={isSubmitting}
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Contato
            </Button>
          </div>

          {contatos.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-foreground border-2 border-dashed border-border rounded-lg">
              Nenhum contato adicionado. Clique em &quot;Adicionar Contato&quot; para incluir pessoas de contato do cliente.
            </div>
          ) : (
            <div className="space-y-4">
              {contatos.map((_, index) => (
                <div key={index} className="p-4 border border-border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      Contato #{index + 1}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const current = form.getValues('contatos') || [];
                        form.setValue(
                          'contatos',
                          current.filter((_, i) => i !== index)
                        );
                      }}
                      disabled={isSubmitting}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>

                  <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name={`contatos.${index}.nome`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome *</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome completo" {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`contatos.${index}.cargo`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cargo</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: CTO, Product Owner" {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`contatos.${index}.email`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="email@exemplo.com" {...field} disabled={isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator className="bg-border/50" />

        {/* Informações de Contato Gerais */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-foreground">
            Informações de Contato (Gerais)
          </h4>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="contato@cliente.com.br" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(00) 00000-0000"
                      {...field}
                      disabled={isSubmitting}
                      onChange={(e) => {
                        const formatted = formatPhone(e.target.value);
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Informações Adicionais */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-foreground">
            Informações Adicionais
          </h4>
          <FormField
            control={form.control}
            name="documento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <Input
                    placeholder="00.000.000/0000-00"
                    {...field}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      const formatted = formatDocumento(e.target.value);
                      field.onChange(formatted);
                    }}
                  />
                </FormControl>
                <FormDescription>CNPJ do cliente (formatação automática)</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator className="bg-border/50" />

        {/* Endereço Detalhado */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-foreground">
            Endereço
          </h4>

          {/* CEP com busca */}
          <FormField
            control={form.control}
            name="cep"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      placeholder="00000-000"
                      {...field}
                      disabled={isSubmitting || isLoadingCEP}
                      onChange={(e) => {
                        const formatted = formatCEP(e.target.value);
                        field.onChange(formatted);
                      }}
                      maxLength={9}
                      className="flex-1"
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBuscarCEP}
                    disabled={isSubmitting || isLoadingCEP || !field.value || field.value.length < 8}
                    className="shrink-0"
                  >
                    {isLoadingCEP ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                    <span className="sr-only sm:not-sr-only sm:ml-2">Buscar</span>
                  </Button>
                </div>
                <FormDescription>Digite o CEP e clique em buscar para preencher automaticamente</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Logradouro e Número */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            <FormField
              control={form.control}
              name="logradouro"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Logradouro</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua, Avenida, etc." {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input placeholder="123" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Complemento e Bairro */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="complemento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input placeholder="Apto, Bloco, etc." {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bairro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do bairro" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Cidade e Estado */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="cidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da cidade" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado (UF)</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ESTADOS_BRASIL.map((uf) => (
                        <SelectItem key={uf} value={uf}>
                          {uf}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator className="bg-border/50" />

        {/* Observações */}
        <div className="space-y-4">
          <h4 className="text-base font-semibold text-foreground">
            Observações
          </h4>
          <FormField
            control={form.control}
            name="observacoes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Observações</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Observações sobre o cliente ou projeto..."
                    className="min-h-[100px]"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormDescription>Máximo de 1000 caracteres</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
  }
);

ClienteForm.displayName = 'ClienteForm';
