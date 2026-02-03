'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ErrorState } from '@/components/ui/error-state';
import { Card } from '@/components/ui/card';

/**
 * Error boundary for password reset page
 * Follows design system: centered layout for auth pages, standardized error component
 */
export default function PasswordResetError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Password reset page error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <div className="p-6">
            <ErrorState
              title="Erro ao Carregar"
              message={error.message || 'Ocorreu um erro ao carregar a página de redefinição de senha.'}
              retry={reset}
            />
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/recuperacao-senha">Solicitar Novo Link</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
