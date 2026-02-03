'use client';

import { useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { ErrorState } from '@/components/ui/error-state';

/**
 * Error boundary for clientes page
 * Follows design system: uses PageHeader, consistent layout
 */
export default function ClientesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Clientes page error:', error);
  }, [error]);

  return (
    <>
      <PageHeader
        title="Clientes"
        description="Gerencie todos os clientes do sistema com segurança e precisão"
      />

      <div className="w-full max-w-full p-4 sm:p-6 animate-in fade-in duration-500 overflow-x-hidden">
        <ErrorState
          title="Erro ao carregar clientes"
          error={error.message}
          retry={reset}
        />
      </div>
    </>
  );
}
