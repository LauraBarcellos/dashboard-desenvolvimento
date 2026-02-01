import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WorkItem } from "@/types/metrics";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DetailsModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  items: WorkItem[];
}

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "-";
  try {
    return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR });
  } catch {
    return "-";
  }
};

export const DetailsModal = ({ open, onClose, title, items }: DetailsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Início</TableHead>
              <TableHead>Conclusão</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-xs">{item.id}</TableCell>
                <TableCell className="max-w-[300px] truncate">{item.title}</TableCell>
                <TableCell className="capitalize">{item.type}</TableCell>
                <TableCell>{formatDate(item.startDate)}</TableCell>
                <TableCell>{formatDate(item.endDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};
