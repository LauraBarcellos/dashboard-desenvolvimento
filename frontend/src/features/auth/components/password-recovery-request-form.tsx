'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InView } from '@/components/ui/in-view';

import { passwordRecoveryRequestSchema, type PasswordRecoveryRequestData } from '../schemas';
import { AUTH_SUCCESS } from '../constants';

export function PasswordRecoveryRequestForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<PasswordRecoveryRequestData>({
    resolver: zodResolver(passwordRecoveryRequestSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: PasswordRecoveryRequestData) {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // PROTOTYPE MODE: Simula API call delay curto
      await new Promise((resolve) => setTimeout(resolve, 800));

      // PROTOTYPE MODE: Sempre sucesso, sem validações
      console.log('Recovery email sent (PROTOTYPE MODE) to:', data.email || '(empty)');
      setSuccess(true);
    } catch {
      // PROTOTYPE MODE: Mesmo com erro, passa
      console.log('Recovery email sent (PROTOTYPE MODE - fallback)');
      setSuccess(true);
    } finally {
      setIsLoading(false);
    }
  }

  if (success) {
    return (
      <InView
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        viewOptions={{ margin: '0px 0px -100px 0px' }}
      >
        <Card className="w-full max-w-md border-0 shadow-2xl backdrop-blur-sm bg-card/95 dark:bg-card/90">
          <CardHeader className="space-y-4 text-center pb-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-success/20 via-success/10 to-success/5 ring-2 ring-success/20">
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold">E-mail Enviado!</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                {AUTH_SUCCESS.RECOVERY_EMAIL_SENT}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.
                O link expira em 1 hora.
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para Login
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </InView>
    );
  }

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
              Recuperar Senha
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Informe seu e-mail para receber instruções
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

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="seu@email.com"
                          className="pl-9"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="sr-only">Enviando...</span>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Enviar Link de Recuperação
                  </>
                )}
              </Button>

              {/* Back to Login */}
              <div className="pt-2">
                <Button asChild variant="ghost" className="w-full" disabled={isLoading}>
                  <Link href="/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para Login
                  </Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </InView>
  );
}
