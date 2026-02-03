import { Clock, Filter } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

/**
 * Premium timeline empty state
 * Uses standardized EmptyState component
 * Shown when there are no events
 */
export function TimelineEmptyState() {
  return (
    <EmptyState
      icon={Clock}
      title="Nenhum evento registrado"
      description="Ainda não há eventos na timeline deste cliente. Eventos serão adicionados automaticamente conforme você interage com o cliente."
      variant="default"
    />
  );
}

/**
 * Premium timeline filtered empty state
 * Uses standardized EmptyState component
 * Shown when filters return no results
 */
export function TimelineEmptyFilteredState() {
  return (
    <EmptyState
      icon={Filter}
      title="Nenhum evento encontrado"
      description="Não encontramos eventos que correspondam aos filtros aplicados. Tente ajustar os filtros para ver mais resultados."
      variant="filtered"
    />
  );
}
