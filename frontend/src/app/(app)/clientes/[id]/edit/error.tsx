'use client';

import { useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { ErrorState } from '@/components/ui/error-state';

/**
 * Error boundary for edit cliente page
 * Follows design system: uses PageHeader, consistent layout
 */
export default function EditClienteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Edit cliente page error:', error);
  }, [error]);

  return (
    <>
      <PageHeader
        title="Editar Cliente"
        description="Erro ao carregar formulário de edição"
        breadcrumbs={[
          { label: 'Clientes', href: '/clientes' },
          { label: 'Editar' },
        ]}
        showBackButton
      />

      <div className="p-4 sm:p-6 animate-in fade-in duration-500">
        <ErrorState
          title="Erro ao carregar formulário"
          error={error.message}
          retry={reset}
        />
      </div>
    </>
  );
}
