'use client';

import { useState } from 'react';
// date-fns removed - unused
import { Users, Link as LinkIcon, ExternalLink, Edit, X, Plus, Trash2, Save, FolderKanban } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import type { Cliente, ContatoCliente, LinkProjeto } from '../types';
import {
  MODELOS_CONTRATO,
  MOCK_USERS,
} from '../constants';

interface ClienteProjetoEditableProps {
  cliente: Cliente;
  onUpdate?: (data: Partial<Cliente>) => Promise<void>;
}

const TIPOS_LINK = ['Board', 'Chat', 'Homologação', 'Repositório', 'Documentação', 'Outro'] as const;

interface EditState {
  modeloContrato?: string;
  pm?: string;
  po?: string;
  techLead?: string;
  links?: Omit<LinkProjeto, 'id'>[];
  contatos?: Omit<ContatoCliente, 'id'>[];
}

/**
 * Componente editável para informações dinâmicas do projeto
 * Segue design philosophy: cards com padding generoso, badges coloridos, estados hover
 * Arrays dinâmicos para links e contatos com add/remove
 */
export function ClienteProjetoEditable({ cliente, onUpdate }: ClienteProjetoEditableProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editState, setEditState] = useState<EditState>({});

  const pmUser = cliente.pm ? MOCK_USERS.find(u => u.id === cliente.pm) : null;
  const poUser = cliente.po ? MOCK_USERS.find(u => u.id === cliente.po) : null;
  const techLeadUser = cliente.techLead ? MOCK_USERS.find(u => u.id === cliente.techLead) : null;

  const handleStartEdit = () => {
    setEditState({
      modeloContrato: cliente.modeloContrato || 'none',
      pm: cliente.pm || 'none',
      po: cliente.po || 'none',
      techLead: cliente.techLead || 'none',
      links: cliente.links || [],
      contatos: cliente.contatos || [],
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditState({});
  };

  const handleSave = async () => {
    if (!onUpdate) {
      toast.error('Erro', {
        description: 'Função de atualização não disponível.',
      });
      return;
    }

    setIsSaving(true);
    try {
      const updateData: Partial<Cliente> = {
        modeloContrato: editState.modeloContrato && editState.modeloContrato !== 'none' ? editState.modeloContrato : undefined,
        pm: editState.pm && editState.pm !== 'none' ? editState.pm : undefined,
        po: editState.po && editState.po !== 'none' ? editState.po : undefined,
        techLead: editState.techLead && editState.techLead !== 'none' ? editState.techLead : undefined,
        links: editState.links?.map((link, i) => ({
          ...link,
          id: cliente.links?.[i]?.id || `link-${Date.now()}-${i}`,
        })),
        contatos: editState.contatos?.map((c, i) => ({
          ...c,
          id: cliente.contatos?.[i]?.id || `contato-${Date.now()}-${i}`,
        })),
      };

      await onUpdate(updateData);

      toast.success('Sucesso!', {
        description: 'Informações gerais atualizadas.',
      });

      setIsEditing(false);
      setEditState({});
    } catch {
      toast.error('Erro ao salvar', {
        description: 'Não foi possível atualizar as informações.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Link handlers
  const handleAddLink = () => {
    setEditState((prev) => ({
      ...prev,
      links: [...(prev.links || []), { tipo: 'Outro', nome: '', url: '' }],
    }));
  };

  const handleRemoveLink = (index: number) => {
    setEditState((prev) => ({
      ...prev,
      links: prev.links?.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateLink = (index: number, field: keyof Omit<LinkProjeto, 'id'>, value: string) => {
    setEditState((prev) => ({
      ...prev,
      links: prev.links?.map((link, i) => (i === index ? { ...link, [field]: value } : link)),
    }));
  };

  // Contato handlers
  const handleAddContato = () => {
    setEditState((prev) => ({
      ...prev,
      contatos: [...(prev.contatos || []), { nome: '', cargo: '', email: '' }],
    }));
  };

  const handleRemoveContato = (index: number) => {
    setEditState((prev) => ({
      ...prev,
      contatos: prev.contatos?.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateContato = (index: number, field: keyof Omit<ContatoCliente, 'id'>, value: string) => {
    setEditState((prev) => ({
      ...prev,
      contatos: prev.contatos?.map((c, i) => (i === index ? { ...c, [field]: value } : c)),
    }));
  };

  return (
    <Card className="border-border bg-muted/30 shadow-sm">
      <CardContent className="pt-6 space-y-6">
        {/* Header - aplicando design philosophy */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <FolderKanban className="h-4 w-4 text-primary" strokeWidth={2} />
            </div>
            <h4 className="text-base font-semibold text-foreground">Informações Gerais</h4>
          </div>
          {!isEditing ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleStartEdit}
              className="gap-2 bg-primary/10 hover:!bg-primary/20 hover:!text-primary text-primary border-0"
            >
              <Edit className="h-4 w-4" />
              Editar
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelEdit}
                disabled={isSaving}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Cancelar
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Salvar
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Modelo de Contrato */}
        <div className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/40 transition-all duration-200">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Modelo de Contrato</p>
          {!isEditing ? (
            <p className="text-sm text-foreground font-medium">
              {cliente.modeloContrato || <span className="text-muted-foreground">Não definido</span>}
            </p>
          ) : (
            <Select
              value={editState.modeloContrato || 'none'}
              onValueChange={(value) => setEditState({ ...editState, modeloContrato: value })}
            >
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Selecione o modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nenhum</SelectItem>
                {MODELOS_CONTRATO.map((modelo) => (
                  <SelectItem key={modelo} value={modelo}>
                    {modelo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Equipe Devio - Seção com ícone */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" strokeWidth={2} />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Equipe Devio</p>
          </div>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            {/* PM */}
            <div className="p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/40 transition-all duration-200">
              <p className="text-xs text-muted-foreground mb-2">Project Manager</p>
              {!isEditing ? (
                <p className="text-sm text-foreground font-medium">
                  {pmUser?.name || <span className="text-muted-foreground">Não definido</span>}
                </p>
              ) : (
                <Select
                  value={editState.pm || 'none'}
                  onValueChange={(value) => setEditState({ ...editState, pm: value })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum</SelectItem>
                    {MOCK_USERS.filter(u => u.role === 'PM').map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* PO */}
            <div className="p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/40 transition-all duration-200">
              <p className="text-xs text-muted-foreground mb-2">Product Owner</p>
              {!isEditing ? (
                <p className="text-sm text-foreground font-medium">
                  {poUser?.name || <span className="text-muted-foreground">Não definido</span>}
                </p>
              ) : (
                <Select
                  value={editState.po || 'none'}
                  onValueChange={(value) => setEditState({ ...editState, po: value })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum</SelectItem>
                    {MOCK_USERS.filter(u => u.role === 'PO').map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Tech Lead */}
            <div className="p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/40 transition-all duration-200">
              <p className="text-xs text-muted-foreground mb-2">Tech Lead</p>
              {!isEditing ? (
                <p className="text-sm text-foreground font-medium">
                  {techLeadUser?.name || <span className="text-muted-foreground">Não definido</span>}
                </p>
              ) : (
                <Select
                  value={editState.techLead || 'none'}
                  onValueChange={(value) => setEditState({ ...editState, techLead: value })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum</SelectItem>
                    {MOCK_USERS.filter(u => u.role === 'Tech Lead').map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>

        {/* Links do Projeto - Array dinâmico */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-primary" strokeWidth={2} />
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Links do Projeto</p>
            </div>
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddLink}
                className="gap-2 h-8"
              >
                <Plus className="h-3 w-3" />
                Adicionar Link
              </Button>
            )}
          </div>

          {!isEditing ? (
            // Modo visualização
            cliente.links && cliente.links.length > 0 ? (
              <div className="space-y-2">
                {cliente.links.map((link) => (
                  <div key={link.id} className="p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/40 transition-all duration-200">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs shrink-0">
                            {link.tipo}
                          </Badge>
                          <span className="text-xs text-muted-foreground truncate">{link.nome}</span>
                        </div>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-2 truncate"
                        >
                          <span className="truncate">{link.url}</span>
                          <ExternalLink className="h-3 w-3 shrink-0" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-sm text-muted-foreground border-2 border-dashed border-border rounded-lg">
                Nenhum link cadastrado
              </div>
            )
          ) : (
            // Modo edição
            <div className="space-y-3">
              {editState.links && editState.links.length > 0 ? (
                editState.links.map((link, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/30 border border-border space-y-2">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-medium text-muted-foreground">Link #{index + 1}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveLink(index)}
                        className="h-7 w-7"
                      >
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                      <div className="space-y-1">
                        <Label htmlFor={`link-tipo-${index}`} className="text-xs">Tipo</Label>
                        <Select
                          value={link.tipo}
                          onValueChange={(value) => handleUpdateLink(index, 'tipo', value)}
                        >
                          <SelectTrigger id={`link-tipo-${index}`} className="h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TIPOS_LINK.map((tipo) => (
                              <SelectItem key={tipo} value={tipo}>
                                {tipo}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor={`link-nome-${index}`} className="text-xs">Nome</Label>
                        <Input
                          id={`link-nome-${index}`}
                          placeholder="ex: Azure DevOps Principal"
                          value={link.nome}
                          onChange={(e) => handleUpdateLink(index, 'nome', e.target.value)}
                          className="h-9"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`link-url-${index}`} className="text-xs">URL</Label>
                      <Input
                        id={`link-url-${index}`}
                        type="url"
                        placeholder="https://..."
                        value={link.url}
                        onChange={(e) => handleUpdateLink(index, 'url', e.target.value)}
                        className="h-9"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-sm text-muted-foreground border-2 border-dashed border-border rounded-lg">
                  Nenhum link. Clique em &quot;Adicionar Link&quot; para incluir.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Contatos do Cliente - Array dinâmico */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" strokeWidth={2} />
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Contatos do Cliente</p>
            </div>
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddContato}
                className="gap-2 h-8"
              >
                <Plus className="h-3 w-3" />
                Adicionar Contato
              </Button>
            )}
          </div>

          {!isEditing ? (
            // Modo visualização
            cliente.contatos && cliente.contatos.length > 0 ? (
              <div className="space-y-2">
                {cliente.contatos.map((contato) => (
                  <div key={contato.id} className="p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/40 transition-all duration-200">
                    <p className="text-sm text-foreground font-medium truncate">{contato.nome}</p>
                    {contato.cargo && (
                      <p className="text-xs text-muted-foreground mt-0.5">{contato.cargo}</p>
                    )}
                    <a
                      href={`mailto:${contato.email}`}
                      className="text-xs text-primary hover:underline mt-1 block truncate"
                    >
                      {contato.email}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-sm text-muted-foreground border-2 border-dashed border-border rounded-lg">
                Nenhum contato cadastrado
              </div>
            )
          ) : (
            // Modo edição
            <div className="space-y-3">
              {editState.contatos && editState.contatos.length > 0 ? (
                editState.contatos.map((contato, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/30 border border-border space-y-2">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-medium text-muted-foreground">Contato #{index + 1}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveContato(index)}
                        className="h-7 w-7"
                      >
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`contato-nome-${index}`} className="text-xs">Nome completo</Label>
                      <Input
                        id={`contato-nome-${index}`}
                        placeholder="Nome completo"
                        value={contato.nome}
                        onChange={(e) => handleUpdateContato(index, 'nome', e.target.value)}
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`contato-cargo-${index}`} className="text-xs">Cargo (opcional)</Label>
                      <Input
                        id={`contato-cargo-${index}`}
                        placeholder="ex: CTO, Product Owner"
                        value={contato.cargo || ''}
                        onChange={(e) => handleUpdateContato(index, 'cargo', e.target.value)}
                        className="h-9"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`contato-email-${index}`} className="text-xs">E-mail</Label>
                      <Input
                        id={`contato-email-${index}`}
                        type="email"
                        placeholder="email@exemplo.com"
                        value={contato.email}
                        onChange={(e) => handleUpdateContato(index, 'email', e.target.value)}
                        className="h-9"
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-sm text-muted-foreground border-2 border-dashed border-border rounded-lg">
                  Nenhum contato. Clique em &quot;Adicionar Contato&quot; para incluir.
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
