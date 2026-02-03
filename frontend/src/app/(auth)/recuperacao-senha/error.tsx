'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ErrorState } from '@/components/ui/error-state';
import { Card } from '@/components/ui/card';

/**
 * Error boundary for password recovery page
 * Follows design system: centered layout for auth pages, standardized error component
 */
export default function PasswordRecoveryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Password recovery page error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <div className="p-6">
            <ErrorState
              title="Erro ao Carregar"
              message={error.message || 'Ocorreu um erro ao carregar a página de recuperação de senha.'}
              retry={reset}
            />
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/login">Voltar para Login</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
