'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FolderKanban, Calendar, Loader2, Plus, Edit, Trash2, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import type { Projeto, FaseInicial, SituacaoProjeto } from '../types';
import { FASE_CONFIG, SITUACAO_CONFIG, FASES_INICIAIS, SITUACOES_PROJETO } from '../constants';
import type { Cliente } from '../types';
import { addProjetoMock, getProjetosByClienteId, deleteProjetoMock, updateProjetoMock } from '../mocks/projetos';

interface ClienteProjetosProps {
  clienteId: string;
  cliente?: Cliente;
}

/**
 * Buscar projetos do Azure DevOps
 * Em produção, isso seria uma chamada real à API do Azure
 */
async function fetchProjetosFromAzure(azureUrl?: string): Promise<Projeto[]> {
  if (!azureUrl) {
    return [];
  }

  // Simular chamada à API do Azure
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock: retornar projetos baseados no link do Azure
  // Em produção, isso seria: const response = await fetch(`${azureUrl}/_apis/projects?api-version=7.1`);
  return [
    {
      id: 'azure-proj-1',
      clienteId: '',
      nome: 'Sistema de Gestão Financeira',
      descricao: 'Plataforma completa para gestão financeira',
      fase: 'Desenvolvimento',
      situacao: 'No prazo',
      dataInicio: new Date('2024-01-15'),
      status: 'ativo',
      createdBy: 'azure-user',
      createdAt: new Date('2024-01-10T10:30:00'),
      updatedAt: new Date('2024-12-20T14:22:00'),
      azureUrl: azureUrl,
    },
    {
      id: 'azure-proj-2',
      clienteId: '',
      nome: 'Portal de Transparência',
      descricao: 'Portal público para transparência de dados',
      fase: 'Design',
      situacao: 'No prazo',
      dataInicio: new Date('2024-03-01'),
      status: 'ativo',
      createdBy: 'azure-user',
      createdAt: new Date('2024-02-25T09:00:00'),
      updatedAt: new Date('2024-12-18T11:30:00'),
      azureUrl: azureUrl,
    },
  ];
}

interface ProjetoFilters {
  busca?: string;
  fase?: FaseInicial;
  situacao?: SituacaoProjeto;
  status?: 'ativo' | 'pausado' | 'concluido' | 'cancelado';
}

export function ClienteProjetos({ clienteId, cliente }: ClienteProjetosProps) {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingProjeto, setEditingProjeto] = useState<Projeto | null>(null);
  const [filters, setFilters] = useState<ProjetoFilters>({});

  const [formData, setFormData] = useState<{
    nome: string;
    descricao: string;
    fase: FaseInicial;
    situacao: SituacaoProjeto;
    dataInicio: string;
    dataFim: string;
    status: 'ativo' | 'pausado' | 'concluido' | 'cancelado';
    azureUrl: string;
  }>({
    nome: '',
    descricao: '',
    fase: 'Planejamento',
    situacao: 'No prazo',
    dataInicio: '',
    dataFim: '',
    status: 'ativo',
    azureUrl: '',
  });

  // Buscar link do Azure Board do cliente
  const azureBoardUrl = cliente?.links?.find((link) => link.tipo === 'Board')?.url || 
                        cliente?.linkBoard;

  useEffect(() => {
    const loadProjetos = async () => {
      setIsLoading(true);
      try {
        // Buscar projetos vinculados manualmente (do mock/banco)
        const projetosVinculados = getProjetosByClienteId(clienteId);
        
        // Buscar projetos do Azure (se houver link configurado)
        let projetosAzure: Projeto[] = [];
        if (azureBoardUrl) {
          projetosAzure = await fetchProjetosFromAzure(azureBoardUrl);
        }
        
        // Combinar ambos os tipos de projetos
        const todosProjetos = [...projetosVinculados, ...projetosAzure];
        setProjetos(todosProjetos);
      } catch (error) {
        toast.error('Erro ao carregar projetos');
        console.error('Erro ao buscar projetos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjetos();
  }, [clienteId, azureBoardUrl]);

  const handleOpenDialog = () => {
    setEditingProjeto(null);
    setFormData({
      nome: '',
      descricao: '',
      fase: 'Planejamento',
      situacao: 'No prazo',
      dataInicio: '',
      dataFim: '',
      status: 'ativo',
      azureUrl: azureBoardUrl || '',
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProjeto(null);
    setFormData({
      nome: '',
      descricao: '',
      fase: 'Planejamento',
      situacao: 'No prazo',
      dataInicio: '',
      dataFim: '',
      status: 'ativo',
      azureUrl: '',
    });
  };

  const handleSave = async () => {
    if (!formData.nome.trim()) {
      toast.error('Nome é obrigatório');
      return;
    }

    if (!formData.azureUrl.trim()) {
      toast.error('URL do Azure DevOps é obrigatória');
      return;
    }

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (editingProjeto) {
        // Atualizar projeto existente
        const updated = await updateProjetoMock(editingProjeto.id, {
          nome: formData.nome,
          descricao: formData.descricao,
          fase: formData.fase,
          situacao: formData.situacao,
          dataInicio: formData.dataInicio ? new Date(formData.dataInicio) : new Date(),
          dataFim: formData.dataFim ? new Date(formData.dataFim) : undefined,
          status: formData.status,
        });

        const projetoComAzure = {
          ...updated,
          azureUrl: formData.azureUrl,
        };

        setProjetos((prev) => prev.map((p) => (p.id === updated.id ? projetoComAzure : p)));
        toast.success('Projeto atualizado com sucesso!');
      } else {
        // Buscar informações do projeto do Azure (mock)
        const projetoAzure = await fetchProjetosFromAzure(formData.azureUrl);
        
        // Se encontrou projeto no Azure, usar os dados dele, senão usar os dados do formulário
        const projetoData = projetoAzure[0] || {
          nome: formData.nome,
          descricao: formData.descricao,
          fase: formData.fase,
          situacao: formData.situacao,
          dataInicio: formData.dataInicio ? new Date(formData.dataInicio) : new Date(),
          dataFim: formData.dataFim ? new Date(formData.dataFim) : undefined,
          status: formData.status,
          azureUrl: formData.azureUrl,
        };

        const novo = await addProjetoMock({
          clienteId,
          nome: projetoData.nome,
          descricao: projetoData.descricao,
          fase: projetoData.fase,
          situacao: projetoData.situacao,
          dataInicio: projetoData.dataInicio,
          dataFim: projetoData.dataFim,
          status: projetoData.status,
          createdBy: 'user-1', // Mock user
        });

        // Adicionar azureUrl ao projeto
        const projetoComAzure = {
          ...novo,
          azureUrl: formData.azureUrl,
        };

        setProjetos((prev) => [...prev, projetoComAzure]);
        toast.success('Projeto vinculado com sucesso!');
      }
      handleCloseDialog();
    } catch {
      toast.error('Erro ao salvar projeto');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCardClick = (projeto: Projeto, e: React.MouseEvent) => {
    // Não abrir link se clicou em um botão
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    const url = projeto.azureUrl || azureBoardUrl;
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleEdit = (e: React.MouseEvent, projeto: Projeto) => {
    e.stopPropagation();
    setEditingProjeto(projeto);
    // Preencher formulário com dados do projeto
    setFormData({
      nome: projeto.nome,
      descricao: projeto.descricao || '',
      fase: projeto.fase,
      situacao: projeto.situacao,
      dataInicio: format(projeto.dataInicio, 'yyyy-MM-dd'),
      dataFim: projeto.dataFim ? format(projeto.dataFim, 'yyyy-MM-dd') : '',
      status: projeto.status,
      azureUrl: projeto.azureUrl || azureBoardUrl || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (e: React.MouseEvent, projetoId: string) => {
    e.stopPropagation();
    if (!confirm('Tem certeza que deseja excluir este projeto?')) {
      return;
    }

    try {
      await deleteProjetoMock(projetoId);
      setProjetos((prev) => prev.filter((p) => p.id !== projetoId));
      toast.success('Projeto excluído!');
    } catch {
      toast.error('Erro ao excluir projeto');
    }
  };

  // Filtrar projetos
  const filteredProjetos = projetos.filter((projeto) => {
    // Filtro de busca (nome ou descrição)
    if (filters.busca) {
      const buscaLower = filters.busca.toLowerCase();
      const matchesNome = projeto.nome.toLowerCase().includes(buscaLower);
      const matchesDescricao = projeto.descricao?.toLowerCase().includes(buscaLower);
      if (!matchesNome && !matchesDescricao) {
        return false;
      }
    }

    // Filtro de fase
    if (filters.fase && projeto.fase !== filters.fase) {
      return false;
    }

    // Filtro de situação
    if (filters.situacao && projeto.situacao !== filters.situacao) {
      return false;
    }

    // Filtro de status
    if (filters.status && projeto.status !== filters.status) {
      return false;
    }

    return true;
  });

  const hasActiveFilters = Boolean(
    filters.busca || filters.fase || filters.situacao || filters.status
  );

  const handleFilterChange = (key: keyof ProjetoFilters, value: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  const isEmpty = !isLoading && filteredProjetos.length === 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Projetos
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {isLoading 
              ? 'Carregando...' 
              : `${filteredProjetos.length} de ${projetos.length} ${projetos.length === 1 ? 'projeto' : 'projetos'}`}
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Projeto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProjeto ? 'Editar Projeto' : 'Vincular Projeto do Azure DevOps'}
              </DialogTitle>
              <DialogDescription>
                {editingProjeto 
                  ? 'Atualize as informações do projeto vinculado.'
                  : 'Adicione um projeto do Azure DevOps para este cliente. As informações serão sincronizadas automaticamente.'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="azureUrl">URL do Projeto no Azure DevOps *</Label>
                <Input
                  id="azureUrl"
                  type="url"
                  value={formData.azureUrl}
                  onChange={(e) => setFormData({ ...formData, azureUrl: e.target.value })}
                  placeholder="https://dev.azure.com/organization/project"
                />
                <p className="text-xs text-muted-foreground">
                  Cole a URL completa do projeto no Azure DevOps
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Projeto *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Sistema de Gestão"
                />
                <p className="text-xs text-muted-foreground">
                  O nome será sincronizado automaticamente do Azure se disponível
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descreva o projeto..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fase">Fase *</Label>
                  <Select
                    value={formData.fase}
                    onValueChange={(value) => setFormData({ ...formData, fase: value as FaseInicial })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FASES_INICIAIS.map((fase) => (
                        <SelectItem key={fase} value={fase}>
                          {fase}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="situacao">Situação *</Label>
                  <Select
                    value={formData.situacao}
                    onValueChange={(value) => setFormData({ ...formData, situacao: value as SituacaoProjeto })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SITUACOES_PROJETO.map((sit) => (
                        <SelectItem key={sit} value={sit}>
                          {sit}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dataInicio">Data de Início *</Label>
                  <Input
                    id="dataInicio"
                    type="date"
                    value={formData.dataInicio}
                    onChange={(e) => setFormData({ ...formData, dataInicio: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataFim">Data de Fim</Label>
                  <Input
                    id="dataFim"
                    type="date"
                    value={formData.dataFim}
                    onChange={(e) => setFormData({ ...formData, dataFim: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as Projeto['status'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="pausado">Pausado</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog} disabled={isSaving}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving 
                  ? (editingProjeto ? 'Salvando...' : 'Vinculando...') 
                  : (editingProjeto ? 'Salvar Alterações' : 'Vincular Projeto')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Separator />

      {/* Filtros */}
      <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Busca */}
              <div className="flex flex-col space-y-2 w-full">
                <Label htmlFor="busca-filter" className="text-sm font-medium text-foreground">
                  Buscar
                </Label>
                <Input
                  id="busca-filter"
                  placeholder="Nome ou descrição..."
                  value={filters.busca || ''}
                  onChange={(e) => handleFilterChange('busca', e.target.value || undefined)}
                  className="!h-11 w-full"
                />
              </div>

              {/* Fase */}
              <div className="flex flex-col space-y-2 w-full">
                <Label htmlFor="fase-filter" className="text-sm font-medium text-foreground">
                  Fase
                </Label>
                <Select
                  value={filters.fase || 'all'}
                  onValueChange={(value) => handleFilterChange('fase', value === 'all' ? undefined : value as FaseInicial)}
                >
                  <SelectTrigger id="fase-filter" className="!h-11 w-full" size="default">
                    <SelectValue placeholder="Todas as fases" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as fases</SelectItem>
                    {FASES_INICIAIS.map((fase) => (
                      <SelectItem key={fase} value={fase}>
                        {fase}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Situação */}
              <div className="flex flex-col space-y-2 w-full">
                <Label htmlFor="situacao-filter" className="text-sm font-medium text-foreground">
                  Situação
                </Label>
                <Select
                  value={filters.situacao || 'all'}
                  onValueChange={(value) => handleFilterChange('situacao', value === 'all' ? undefined : value as SituacaoProjeto)}
                >
                  <SelectTrigger id="situacao-filter" className="!h-11 w-full" size="default">
                    <SelectValue placeholder="Todas as situações" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as situações</SelectItem>
                    {SITUACOES_PROJETO.map((sit) => (
                      <SelectItem key={sit} value={sit}>
                        {sit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status */}
              <div className="flex flex-col space-y-2 w-full">
                <Label htmlFor="status-filter" className="text-sm font-medium text-foreground">
                  Status
                </Label>
                <Select
                  value={filters.status || 'all'}
                  onValueChange={(value) => handleFilterChange('status', value === 'all' ? undefined : value as Projeto['status'])}
                >
                  <SelectTrigger id="status-filter" className="!h-11 w-full" size="default">
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="pausado">Pausado</SelectItem>
                    <SelectItem value="concluido">Concluído</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

        {/* Filtros ativos */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-medium text-muted-foreground">Filtros ativos:</span>
            {filters.busca && (
              <Badge variant="secondary" className="gap-1.5">
                Busca: {filters.busca}
                <button
                  onClick={() => handleFilterChange('busca', undefined)}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.fase && (
              <Badge variant="secondary" className="gap-1.5">
                Fase: {filters.fase}
                <button
                  onClick={() => handleFilterChange('fase', undefined)}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.situacao && (
              <Badge variant="secondary" className="gap-1.5">
                Situação: {filters.situacao}
                <button
                  onClick={() => handleFilterChange('situacao', undefined)}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.status && (
              <Badge variant="secondary" className="gap-1.5">
                Status: {filters.status}
                <button
                  onClick={() => handleFilterChange('status', undefined)}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="h-7 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Limpar todos
            </Button>
          </div>
         )}
       </div>

      {/* Loading State */}
      {isLoading ? (
        <Card className="border-border bg-muted/30">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-sm text-muted-foreground">
              Carregando projetos do Azure DevOps...
            </p>
          </CardContent>
        </Card>
      ) : isEmpty ? (
        <Card className="border-dashed border-border bg-muted/30">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
              <FolderKanban className="h-8 w-8 text-primary" strokeWidth={2} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mb-4">
              {!azureBoardUrl 
                ? 'Configure o link do Azure DevOps Board nas informações do cliente ou adicione projetos manualmente.'
                : 'Não há projetos vinculados. Adicione um projeto do Azure DevOps.'}
            </p>
            <Button onClick={handleOpenDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Projeto
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredProjetos.map((projeto) => {
            const faseConfig = FASE_CONFIG[projeto.fase];
            const situacaoConfig = SITUACAO_CONFIG[projeto.situacao];
            return (
              <Card 
                key={projeto.id} 
                className="border-border bg-muted/30 hover:border-primary/40 transition-colors cursor-pointer group"
                onClick={(e) => handleCardClick(projeto, e)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                          <FolderKanban className="h-5 w-5 text-primary" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-semibold text-foreground mb-1">
                            {projeto.nome}
                          </h4>
                          {projeto.descricao && (
                            <p className="text-sm text-muted-foreground mb-3">
                              {projeto.descricao}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-3">
                            <Badge
                              variant="outline"
                              className={`${faseConfig.bgColor} ${faseConfig.color} border-0`}
                            >
                              {projeto.fase}
                            </Badge>
                            <Badge variant={situacaoConfig.variant}>
                              {projeto.situacao}
                            </Badge>
                            <Badge variant="secondary">
                              {projeto.status}
                            </Badge>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>
                                Início: {format(projeto.dataInicio, "dd/MM/yyyy", { locale: ptBR })}
                              </span>
                            </div>
                            {projeto.dataFim && (
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>
                                  Fim: {format(projeto.dataFim, "dd/MM/yyyy", { locale: ptBR })}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Botões de ação - aparecem apenas no hover */}
                    <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleEdit(e, projeto)}
                        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                        title="Editar projeto"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleDelete(e, projeto.id)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        title="Excluir projeto"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

