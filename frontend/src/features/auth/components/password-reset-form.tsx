'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Loader2, Lock, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { InView } from '@/components/ui/in-view';

import { passwordResetSchema, type PasswordResetFormData } from '../schemas';
import { PASSWORD_REQUIREMENTS } from '../constants';
import { PasswordResetSuccess } from './password-reset-success';
import { PasswordResetInvalidToken } from './password-reset-invalid-token';
import { PasswordField } from './password-field';

export function PasswordResetForm() {
  const searchParams = useSearchParams();
  const token = searchParams?.get('token') || '';

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  const form = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      token,
      password: '',
      confirmPassword: '',
    },
  });

  // Validate token on mount - PROTOTYPE MODE: Sempre válido
  useEffect(() => {
    // PROTOTYPE MODE: Sempre considera token válido
    setTokenValid(true);
  }, [token]);

  async function onSubmit(data: PasswordResetFormData) {
    setIsLoading(true);
    setError(null);

    try {
      // PROTOTYPE MODE: Simula API call delay curto
      await new Promise((resolve) => setTimeout(resolve, 800));

      // PROTOTYPE MODE: Sempre sucesso, sem validações
      console.log('Password reset (PROTOTYPE MODE) for token:', data.token || '(empty)');
      setSuccess(true);
    } catch {
      // PROTOTYPE MODE: Mesmo com erro, passa
      console.log('Password reset (PROTOTYPE MODE - fallback)');
      setSuccess(true);
    } finally {
      setIsLoading(false);
    }
  }

  // Success State
  if (success) {
    return <PasswordResetSuccess />;
  }

  // Invalid Token State
  if (tokenValid === false) {
    return <PasswordResetInvalidToken error={error} />;
  }

  // Form State
  return (
    <InView
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      viewOptions={{ margin: '0px 0px -100px 0px' }}
    >
      <Card className="w-full max-w-md border-0 shadow-2xl backdrop-blur-sm bg-card/95 dark:bg-card/90">
        <CardHeader className="space-y-4 text-center pb-6">
          <div className="mx-auto relative h-20 w-48">
            <Image
              src="/devio/logo_white.svg"
              alt="Devio Logo"
              fill
              className="dark:block hidden object-contain"
              priority
            />
            <Image
              src="/devio/logo_black.svg"
              alt="Devio Logo"
              fill
              className="dark:hidden block object-contain"
              priority
            />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold">
              Nova Senha
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Defina uma nova senha segura para sua conta
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Error Alert */}
              {error && (
                <div
                  className="flex items-center gap-3 rounded-md border border-destructive/50 bg-destructive/10 p-3"
                  role="alert"
                >
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Password Field */}
              <PasswordField
                control={form.control}
                name="password"
                label="Nova Senha"
                disabled={isLoading}
                description={`Mínimo ${PASSWORD_REQUIREMENTS.minLength} caracteres com maiúsculas, minúsculas e números`}
              />

              {/* Confirm Password Field */}
              <PasswordField
                control={form.control}
                name="confirmPassword"
                label="Confirmar Senha"
                disabled={isLoading}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading || !tokenValid}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="sr-only">Salvando...</span>
                    Salvando...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Redefinir Senha
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </InView>
  );
}
