'use client';

import { useTransition, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, Save, X, Building2, Mail, MapPin, FileText, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// Separator removed - unused
import { toast } from 'sonner';
import type { Cliente } from '../types';
import { ESTADOS_BRASIL } from '../constants';
import { addClienteMock } from '../mocks/data';

interface ClienteFormProps {
  cliente?: Cliente;
  mode: 'create' | 'edit';
}

/**
 * Schema para dados cadastrais constantes apenas
 * Removidos: fase, situação, equipe, links, contatos (são dinâmicos e editados no perfil)
 */
const clienteFormSchema = z.object({
  // Informações Básicas - OBRIGATÓRIAS
  nome: z
    .string()
    .min(2, 'Nome deve ter no mínimo 2 caracteres')
    .max(200, 'Nome deve ter no máximo 200 caracteres'),

  status: z.enum(['ativo', 'inativo']),

  // Contato - OPCIONAIS
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  telefone: z.string().optional(),
  documento: z.string().optional(), // CPF ou CNPJ

  // Endereço - OPCIONAIS
  cep: z.string().optional(),
  logradouro: z.string().optional(),
  numero: z.string().optional(),
  complemento: z.string().optional(),
  bairro: z.string().optional(),
  cidade: z.string().optional(),
  estado: z.string().optional(),

  // Outros
  observacoes: z.string().optional(),
  fotoPerfil: z.instanceof(File).optional().or(z.literal('')),
});

type FormData = z.infer<typeof clienteFormSchema>;

/**
 * Formulário de Cliente - APENAS DADOS CADASTRAIS
 * Aplica design philosophy: cards bem organizados, sections com títulos, spacing generoso
 * Dados dinâmicos do projeto (fase, equipe, links) são editados no perfil
 */
export function ClienteForm({ cliente, mode }: ClienteFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [fotoPreview, setFotoPreview] = useState<string | null>(cliente?.fotoPerfil || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(clienteFormSchema),
    defaultValues: {
      nome: cliente?.nome || '',
      status: cliente?.status || 'ativo',
      email: cliente?.email || '',
      telefone: cliente?.telefone || '',
      documento: cliente?.documento || '',
      cep: cliente?.cep || '',
      logradouro: cliente?.logradouro || '',
      numero: cliente?.numero || '',
      complemento: cliente?.complemento || '',
      bairro: cliente?.bairro || '',
      cidade: cliente?.cidade || '',
      estado: cliente?.estado || '',
      observacoes: cliente?.observacoes || '',
      fotoPerfil: undefined,
    },
  });

  // Atualizar valores do formulário quando o cliente mudar (modo edição)
  useEffect(() => {
    if (cliente && mode === 'edit') {
      form.reset({
        nome: cliente.nome || '',
        status: cliente.status || 'ativo',
        email: cliente.email || '',
        telefone: cliente.telefone || '',
        documento: cliente.documento || '',
        cep: cliente.cep || '',
        logradouro: cliente.logradouro || '',
        numero: cliente.numero || '',
        complemento: cliente.complemento || '',
        bairro: cliente.bairro || '',
        cidade: cliente.cidade || '',
        estado: cliente.estado || '',
        observacoes: cliente.observacoes || '',
        fotoPerfil: undefined,
      });
    }
  }, [cliente, mode, form]);

  async function onSubmit(data: FormData) {
    startTransition(async () => {
      try {
        // Simular API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (mode === 'create') {
          // Criar novo cliente
          const novoCliente = await addClienteMock({
            nome: data.nome,
            status: data.status,
            email: data.email || undefined,
            telefone: data.telefone || undefined,
            documento: data.documento || undefined,
            cep: data.cep || undefined,
            logradouro: data.logradouro || undefined,
            numero: data.numero || undefined,
            complemento: data.complemento || undefined,
            bairro: data.bairro || undefined,
            cidade: data.cidade || undefined,
            estado: data.estado || undefined,
            observacoes: data.observacoes || undefined,
            fotoPerfil: data.fotoPerfil ? URL.createObjectURL(data.fotoPerfil) : undefined,
            // Campos obrigatórios com valores padrão
            faseInicial: 'Planejamento',
            situacao: 'No prazo',
            dataInicio: new Date(),
            createdBy: 'user-1', // Mock user
          });

          toast.success('Cliente criado!', {
            description: `${data.nome} foi criado com sucesso.`,
          });

          // Redirect para o perfil do cliente criado
          router.push(`/clientes/${novoCliente.id}`);
        } else {
          // Atualizar cliente existente (mock - em produção seria uma chamada à API)
          toast.success('Cliente atualizado!', {
            description: `${data.nome} foi atualizado com sucesso.`,
          });

          // Redirect para lista
          router.push('/clientes');
        }
      } catch {
        toast.error('Erro', {
          description: 'Não foi possível salvar o cliente.',
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Card: Informações Básicas */}
        <Card className="border-border bg-muted/30 shadow-sm">
          <CardContent className="pt-6 space-y-6">
            <div className="flex items-center gap-2 pb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <Building2 className="h-4 w-4 text-primary" strokeWidth={2} />
              </div>
              <h4 className="text-base font-semibold text-foreground">
                Informações Básicas
              </h4>
            </div>
            <div className="space-y-6">
              {/* Nome e Status na mesma linha */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Nome do Cliente - ocupa todo o espaço */}
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Nome do Cliente *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Banco Central do Brasil"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status - apenas tamanho do toggle */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-auto">
                      <FormLabel>Status *</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-3 h-11">
                          <Switch
                            checked={field.value === 'ativo'}
                            onCheckedChange={(checked) => {
                              field.onChange(checked ? 'ativo' : 'inativo');
                            }}
                          />
                          <span className="text-sm font-medium text-foreground whitespace-nowrap">
                            {field.value === 'ativo' ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Foto de Perfil */}
              <FormField
                control={form.control}
                name="fotoPerfil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto de Perfil</FormLabel>
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
                            disabled={isPending}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              fileInputRef.current?.click();
                            }}
                            disabled={isPending}
                            className="w-full sm:w-auto"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            {fotoPreview ? 'Alterar Foto' : 'Upload Foto'}
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
            </div>
          </CardContent>
        </Card>

        {/* Card: Contato */}
        <Card className="border-border bg-muted/30 shadow-sm">
          <CardContent className="pt-6 space-y-6">
            <div className="flex items-center gap-2 pb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <Mail className="h-4 w-4 text-primary" strokeWidth={2} />
              </div>
              <h4 className="text-base font-semibold text-foreground">
                Informações de Contato
              </h4>
            </div>
            <div>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {/* E-mail */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@exemplo.com"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        E-mail principal do cliente
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Telefone */}
                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="(11) 98765-4321"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        Telefone para contato
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Documento */}
                <FormField
                  control={form.control}
                  name="documento"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>CPF/CNPJ</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="00.000.000/0000-00"
                          {...field}
                          className="h-11"
                        />
                      </FormControl>
                      <FormDescription>
                        Documento de identificação (CPF ou CNPJ)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card: Endereço */}
        <Card className="border-border bg-muted/30 shadow-sm">
          <CardContent className="pt-6 space-y-6">
            <div className="flex items-center gap-2 pb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <MapPin className="h-4 w-4 text-primary" strokeWidth={2} />
              </div>
              <h4 className="text-base font-semibold text-foreground">
                Endereço
              </h4>
            </div>
            <div>
              <div className="space-y-6">
                {/* Linha 1: CEP + Logradouro */}
                <div className="grid gap-6 grid-cols-1 md:grid-cols-12">
                  {/* CEP - menor, padrão e-commerce */}
                  <FormField
                    control={form.control}
                    name="cep"
                    render={({ field }) => (
                      <FormItem className="md:col-span-3">
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="00000-000"
                            {...field}
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Logradouro - ocupa o restante */}
                  <FormField
                    control={form.control}
                    name="logradouro"
                    render={({ field }) => (
                      <FormItem className="md:col-span-9">
                        <FormLabel>Logradouro</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Av. Paulista"
                            {...field}
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Linha 2: Número + Complemento */}
                <div className="grid gap-6 grid-cols-1 md:grid-cols-12">
                  {/* Número */}
                  <FormField
                    control={form.control}
                    name="numero"
                    render={({ field }) => (
                      <FormItem className="md:col-span-3">
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="1000"
                            {...field}
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Complemento */}
                  <FormField
                    control={form.control}
                    name="complemento"
                    render={({ field }) => (
                      <FormItem className="md:col-span-9">
                        <FormLabel>Complemento</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Sala 101"
                            {...field}
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Linha 3: Bairro + Cidade + Estado */}
                <div className="grid gap-6 grid-cols-1 md:grid-cols-12">
                  {/* Bairro */}
                  <FormField
                    control={form.control}
                    name="bairro"
                    render={({ field }) => (
                      <FormItem className="md:col-span-4">
                        <FormLabel>Bairro</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Bela Vista"
                            {...field}
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Cidade */}
                  <FormField
                    control={form.control}
                    name="cidade"
                    render={({ field }) => (
                      <FormItem className="md:col-span-5">
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="São Paulo"
                            {...field}
                            className="h-11"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Estado */}
                  <FormField
                    control={form.control}
                    name="estado"
                    render={({ field }) => (
                      <FormItem className="md:col-span-3">
                        <FormLabel>Estado</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value || undefined}
                        >
                          <FormControl>
                            <SelectTrigger className="!h-11 w-full">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ESTADOS_BRASIL.map((estado: string) => (
                              <SelectItem key={estado} value={estado}>
                                {estado}
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
            </div>
          </CardContent>
        </Card>

        {/* Card: Informações Adicionais */}
        <Card className="border-border bg-muted/30 shadow-sm">
          <CardContent className="pt-6 space-y-6">
            <div className="flex items-center gap-2 pb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <FileText className="h-4 w-4 text-primary" strokeWidth={2} />
              </div>
              <h4 className="text-base font-semibold text-foreground">
                Informações Adicionais
              </h4>
            </div>
            <div>
              <div className="space-y-6">
                {/* Observações */}
                <FormField
                  control={form.control}
                  name="observacoes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Adicione observações sobre o cliente..."
                          className="resize-none min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Informações relevantes sobre o cliente
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ações do Formulário */}
        <Card className="border-border bg-card shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                {mode === 'create'
                  ? 'Após criar o cliente, você poderá configurar informações do projeto (fase, equipe, links) no perfil.'
                  : 'Dados do projeto (fase, equipe, links) são editados no perfil do cliente.'
                }
              </p>
              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isPending}
                  className="gap-2 flex-1 sm:flex-initial"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="gap-2 flex-1 sm:flex-initial"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      {mode === 'create' ? 'Criar Cliente' : 'Salvar Alterações'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
