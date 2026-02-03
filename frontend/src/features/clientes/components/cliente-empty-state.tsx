import { EmptyState } from '@/components/ui/empty-state';
import { Users, Search } from 'lucide-react';

/**
 * Premium empty state component for Cliente list
 * Uses standardized EmptyState component
 * Displayed when no clientes are found
 */
export function ClienteEmptyState() {
  return (
    <EmptyState
      icon={Users}
      title="Nenhum cliente encontrado"
      description="Comece criando seu primeiro cliente para gerenciar operações e acompanhar a timeline de interações."
      action={{
        label: 'Criar Primeiro Cliente',
        href: '/clientes/new',
      }}
      variant="default"
    />
  );
}

/**
 * Premium empty state for filtered results
 * Uses standardized EmptyState component
 */
export function ClienteEmptyFilteredState() {
  return (
    <EmptyState
      icon={Search}
      title="Nenhum resultado encontrado"
      description="Não encontramos clientes que correspondam aos filtros aplicados. Tente ajustar os filtros ou termos de busca."
      variant="filtered"
    />
  );
}
