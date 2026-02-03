'use client';

import { useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { ErrorState } from '@/components/ui/error-state';

/**
 * Error boundary for cliente detail page
 * Follows design system: uses PageHeader, consistent layout
 */
export default function ClienteDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Cliente detail page error:', error);
  }, [error]);

  return (
    <>
      <PageHeader
        title="Detalhes do Cliente"
        description="Erro ao carregar informações do cliente"
        breadcrumbs={[
          { label: 'Clientes', href: '/clientes' },
          { label: 'Erro' },
        ]}
        showBackButton
      />

      <div className="p-4 sm:p-6 animate-in fade-in duration-500">
        <ErrorState
          title="Erro ao carregar cliente"
          error={error.message}
          retry={reset}
        />
      </div>
    </>
  );
}
