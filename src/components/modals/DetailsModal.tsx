import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DataTable } from '@/components/data/DataTable';
import { WorkItem } from '@/types/metrics';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

interface DetailsModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  items: WorkItem[];
}

const typeLabels: Record<string, string> = {
  feature: 'Feature',
  bug: 'Bug',
  task: 'Task',
  improvement: 'Melhoria',
};

const statusLabels: Record<string, string> = {
  backlog: 'Backlog',
  active: 'Ativo',
  resolved: 'Resolvido',
  closed: 'Fechado',
};

const formatDate = (date: string | null) => {
  if (!date) return '-';
  return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR });
};

export const DetailsModal = ({ open, onClose, title, items }: DetailsModalProps) => {
  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'title', header: 'Título' },
    {
      key: 'type',
      header: 'Tipo',
      render: (item: WorkItem) => (
        <Badge variant="secondary">{typeLabels[item.type]}</Badge>
      ),
    },
    { key: 'project', header: 'Projeto' },
    {
      key: 'status',
      header: 'Status',
      render: (item: WorkItem) => statusLabels[item.status],
    },
    {
      key: 'createdDate',
      header: 'Criado',
      render: (item: WorkItem) => formatDate(item.createdDate),
    },
    {
      key: 'closedDate',
      header: 'Fechado',
      render: (item: WorkItem) => formatDate(item.closedDate),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-4">
          {items.length} {items.length === 1 ? 'item' : 'itens'}
        </p>
        <DataTable data={items} columns={columns} maxHeight="500px" />
      </DialogContent>
    </Dialog>
  );
};
