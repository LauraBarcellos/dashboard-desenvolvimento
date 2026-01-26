import { Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Filters } from '@/types/metrics';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface FiltersPanelProps {
  filters: Filters;
  projects: string[];
  types: string[];
  onFilterChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  onClear: () => void;
}

const statusOptions = [
  { value: 'backlog', label: 'Backlog' },
  { value: 'active', label: 'Ativo' },
  { value: 'resolved', label: 'Resolvido' },
  { value: 'closed', label: 'Fechado' },
];

const typeLabels: Record<string, string> = {
  feature: 'Feature',
  bug: 'Bug',
  task: 'Task',
  improvement: 'Melhoria',
};

export const FiltersPanel = ({
  filters,
  projects,
  types,
  onFilterChange,
  onClear,
}: FiltersPanelProps) => {
  const hasActiveFilters = Object.values(filters).some((v) => v !== null);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <Calendar className="mr-2 h-4 w-4" />
            {filters.startDate
              ? format(filters.startDate, 'dd/MM/yyyy', { locale: ptBR })
              : 'Data início'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={filters.startDate || undefined}
            onSelect={(date) => onFilterChange('startDate', date || null)}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <Calendar className="mr-2 h-4 w-4" />
            {filters.endDate
              ? format(filters.endDate, 'dd/MM/yyyy', { locale: ptBR })
              : 'Data fim'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <CalendarComponent
            mode="single"
            selected={filters.endDate || undefined}
            onSelect={(date) => onFilterChange('endDate', date || null)}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Select
        value={filters.project || ''}
        onValueChange={(value) => onFilterChange('project', value || null)}
      >
        <SelectTrigger className="h-9 w-[160px]">
          <SelectValue placeholder="Projeto" />
        </SelectTrigger>
        <SelectContent>
          {projects.map((project) => (
            <SelectItem key={project} value={project}>
              {project}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.type || ''}
        onValueChange={(value) => onFilterChange('type', value || null)}
      >
        <SelectTrigger className="h-9 w-[140px]">
          <SelectValue placeholder="Tipo" />
        </SelectTrigger>
        <SelectContent>
          {types.map((type) => (
            <SelectItem key={type} value={type}>
              {typeLabels[type] || type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.status || ''}
        onValueChange={(value) => onFilterChange('status', value || null)}
      >
        <SelectTrigger className="h-9 w-[140px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={onClear} className="h-9">
          <X className="mr-1 h-4 w-4" />
          Limpar
        </Button>
      )}
    </div>
  );
};
