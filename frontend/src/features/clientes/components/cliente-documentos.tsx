'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { FileText, Plus, Download, Trash2, Eye, Upload, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import type { Documento } from '../types';
import { getDocumentosByClienteId, addDocumentoMock, deleteDocumentoMock, formatFileSize } from '../mocks/documentos';

interface ClienteDocumentosProps {
  clienteId: string;
}

const TIPOS_DOCUMENTO = [
  'Contrato',
  'Proposta',
  'Ata de Reunião',
  'Documentação Técnica',
  'Especificação',
  'Relatório',
  'Outro',
];

interface DocumentoFilters {
  busca?: string;
  tipo?: string;
  dataInicio?: string;
  dataFim?: string;
}

export function ClienteDocumentos({ clienteId }: ClienteDocumentosProps) {
  const [documentos, setDocumentos] = useState(() => getDocumentosByClienteId(clienteId));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filters, setFilters] = useState<DocumentoFilters>({});

  const [formData, setFormData] = useState({
    nome: '',
    tipo: 'Contrato',
    descricao: '',
  });

  const handleOpenDialog = () => {
    setFormData({
      nome: '',
      tipo: 'Contrato',
      descricao: '',
    });
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setFormData({
      nome: '',
      tipo: 'Contrato',
      descricao: '',
    });
    setSelectedFile(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamanho (máx 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Arquivo muito grande', {
          description: 'O arquivo deve ter no máximo 10MB.',
        });
        return;
      }
      setSelectedFile(file);
      if (!formData.nome) {
        setFormData({ ...formData, nome: file.name });
      }
    }
  };

  const handleSave = async () => {
    if (!formData.nome.trim()) {
      toast.error('Nome é obrigatório');
      return;
    }

    if (!selectedFile) {
      toast.error('Selecione um arquivo');
      return;
    }

    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Simular upload - em produção, isso seria uma chamada à API
      const url = URL.createObjectURL(selectedFile);
      const extensao = selectedFile.name.split('.').pop()?.toLowerCase() || '';

      const novo = await addDocumentoMock({
        clienteId,
        nome: formData.nome,
        tipo: formData.tipo,
        descricao: formData.descricao || undefined,
        url,
        tamanho: selectedFile.size,
        extensao,
        uploadedBy: 'user-1', // Mock user
      });

      setDocumentos((prev) => [...prev, novo]);
      toast.success('Documento adicionado!');
      handleCloseDialog();
    } catch {
      toast.error('Erro ao adicionar documento');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (documentoId: string) => {
    if (!confirm('Tem certeza que deseja excluir este documento?')) {
      return;
    }

    try {
      await deleteDocumentoMock(documentoId);
      setDocumentos((prev) => prev.filter((d) => d.id !== documentoId));
      toast.success('Documento excluído!');
    } catch {
      toast.error('Erro ao excluir documento');
    }
  };

  const handleDownload = (documento: Documento) => {
    // Em produção, isso seria uma chamada à API para baixar o arquivo
    toast.info('Download iniciado', {
      description: `Baixando ${documento.nome}...`,
    });
    // Simular download
    const link = document.createElement('a');
    link.href = documento.url;
    link.download = documento.nome;
    link.click();
  };

  const handleView = (documento: Documento) => {
    // Em produção, isso abriria o documento em uma nova aba ou modal
    window.open(documento.url, '_blank');
  };

  // Filtrar documentos
  const filteredDocumentos = documentos.filter((documento) => {
    // Filtro de busca (nome ou descrição)
    if (filters.busca) {
      const buscaLower = filters.busca.toLowerCase();
      const matchesNome = documento.nome.toLowerCase().includes(buscaLower);
      const matchesDescricao = documento.descricao?.toLowerCase().includes(buscaLower);
      if (!matchesNome && !matchesDescricao) {
        return false;
      }
    }

    // Filtro de tipo
    if (filters.tipo && documento.tipo !== filters.tipo) {
      return false;
    }

    // Filtro de data início
    if (filters.dataInicio) {
      const startDate = new Date(filters.dataInicio);
      startDate.setHours(0, 0, 0, 0);
      if (documento.createdAt < startDate) {
        return false;
      }
    }

    // Filtro de data fim
    if (filters.dataFim) {
      const endDate = new Date(filters.dataFim);
      endDate.setHours(23, 59, 59, 999);
      if (documento.createdAt > endDate) {
        return false;
      }
    }

    return true;
  });

  const hasActiveFilters = Boolean(
    filters.busca || filters.tipo || filters.dataInicio || filters.dataFim
  );

  const handleFilterChange = (key: keyof DocumentoFilters, value: string | undefined) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  const isEmpty = filteredDocumentos.length === 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Documentos
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredDocumentos.length} de {documentos.length} {documentos.length === 1 ? 'documento' : 'documentos'}
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Documento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Adicionar Documento</DialogTitle>
              <DialogDescription>
                Faça upload de um documento para este cliente
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="file">Arquivo *</Label>
                <div className="flex items-center gap-4">
                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('file')?.click()}
                    className="w-full sm:w-auto"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {selectedFile ? 'Alterar Arquivo' : 'Selecionar Arquivo'}
                  </Button>
                  {selectedFile && (
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nome">Nome do Documento *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  placeholder="Ex: Contrato de Prestação de Serviços"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo *</Label>
                <Select
                  value={formData.tipo}
                  onValueChange={(value) => setFormData({ ...formData, tipo: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TIPOS_DOCUMENTO.map((tipo) => (
                      <SelectItem key={tipo} value={tipo}>
                        {tipo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descreva o documento..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseDialog} disabled={isSaving}>
                Cancelar
              </Button>
              <Button onClick={handleSave} disabled={isSaving || !selectedFile}>
                {isSaving ? 'Enviando...' : 'Adicionar Documento'}
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

          {/* Tipo */}
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="tipo-filter" className="text-sm font-medium text-foreground">
              Tipo
            </Label>
            <Select
              value={filters.tipo || 'all'}
              onValueChange={(value) => handleFilterChange('tipo', value === 'all' ? undefined : value)}
            >
              <SelectTrigger id="tipo-filter" className="!h-11 w-full" size="default">
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                {TIPOS_DOCUMENTO.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Data Início */}
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="data-inicio-filter" className="text-sm font-medium text-foreground">
              Data Início
            </Label>
            <Input
              id="data-inicio-filter"
              type="date"
              value={filters.dataInicio || ''}
              onChange={(e) => handleFilterChange('dataInicio', e.target.value || undefined)}
              className="!h-11 w-full"
            />
          </div>

          {/* Data Fim */}
          <div className="flex flex-col space-y-2 w-full">
            <Label htmlFor="data-fim-filter" className="text-sm font-medium text-foreground">
              Data Fim
            </Label>
            <Input
              id="data-fim-filter"
              type="date"
              value={filters.dataFim || ''}
              onChange={(e) => handleFilterChange('dataFim', e.target.value || undefined)}
              className="!h-11 w-full"
            />
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
            {filters.tipo && (
              <Badge variant="secondary" className="gap-1.5">
                Tipo: {filters.tipo}
                <button
                  onClick={() => handleFilterChange('tipo', undefined)}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.dataInicio && (
              <Badge variant="secondary" className="gap-1.5">
                Início: {format(new Date(filters.dataInicio), "dd/MM/yyyy", { locale: ptBR })}
                <button
                  onClick={() => handleFilterChange('dataInicio', undefined)}
                  className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {filters.dataFim && (
              <Badge variant="secondary" className="gap-1.5">
                Fim: {format(new Date(filters.dataFim), "dd/MM/yyyy", { locale: ptBR })}
                <button
                  onClick={() => handleFilterChange('dataFim', undefined)}
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

      {/* Empty State */}
      {isEmpty ? (
        <Card className="border-dashed border-border bg-muted/30">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
              <FileText className="h-8 w-8 text-primary" strokeWidth={2} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum documento cadastrado
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mb-4">
              Comece adicionando o primeiro documento para este cliente.
            </p>
            <Button onClick={handleOpenDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Documento
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredDocumentos.map((documento) => {
            const extensao = documento.extensao?.toUpperCase() || 'FILE';

            return (
              <Card key={documento.id} className="border-border bg-muted/30 hover:border-primary/40 transition-colors group">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                          <FileText className="h-5 w-5 text-primary" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-base font-semibold text-foreground">
                              {documento.nome}
                            </h4>
                            <Badge variant="outline" className="shrink-0">
                              {extensao}
                            </Badge>
                          </div>
                          {documento.descricao && (
                            <p className="text-sm text-muted-foreground mb-2">
                              {documento.descricao}
                            </p>
                          )}
                          <div className="flex flex-wrap items-center gap-3">
                            <Badge variant="secondary">
                              {documento.tipo}
                            </Badge>
                            {documento.tamanho && (
                              <span className="text-xs text-muted-foreground">
                                {formatFileSize(documento.tamanho)}
                              </span>
                            )}
                            <span className="text-xs text-muted-foreground">
                              Adicionado em {format(documento.createdAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Botões de ação - aparecem apenas no hover */}
                    <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(documento)}
                        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                        title="Visualizar"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownload(documento)}
                        className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                        title="Baixar"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(documento.id)}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        title="Excluir"
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

