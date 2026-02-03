'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ErrorState } from '@/components/ui/error-state';
import { Card } from '@/components/ui/card';

/**
 * Error boundary for login page
 * Follows design system: centered layout for auth pages, standardized error component
 */
export default function LoginError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Login page error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <div className="p-6">
            <ErrorState
              title="Erro ao Carregar"
              message={error.message || 'Ocorreu um erro ao carregar a página de login.'}
              retry={reset}
            />
            <div className="mt-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Voltar para Início
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
