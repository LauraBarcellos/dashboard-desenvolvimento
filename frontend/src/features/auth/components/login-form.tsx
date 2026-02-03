'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, LogIn, Lock, Mail, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
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

import { loginFormSchema, type LoginFormData } from '../schemas';
import { validatePassword } from '../mocks/data';

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    setError(null);

    try {
      // PROTOTYPE MODE: Simula API call delay curto
      await new Promise((resolve) => setTimeout(resolve, 800));

      // PROTOTYPE MODE: Sempre valida com sucesso, sem checks
      const user = validatePassword(data.email || '', data.password || '');

      // PROTOTYPE MODE: Sempre sucesso, sem validações
      console.log('Login successful (PROTOTYPE MODE):', user);

      // Chama callback se fornecido
      if (onSuccess) {
        onSuccess();
      } else {
        // PROTOTYPE MODE: Redireciona automaticamente para /clientes
        router.push('/clientes');
      }
    } catch {
      // PROTOTYPE MODE: Mesmo com erro, passa
      console.log('Login successful (PROTOTYPE MODE - fallback)');

      // Chama callback se fornecido
      if (onSuccess) {
        onSuccess();
      } else {
        // PROTOTYPE MODE: Redireciona automaticamente para /clientes
        router.push('/clientes');
      }
    } finally {
      setIsLoading(false);
    }
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
            <CardDescription className="text-base text-muted-foreground">
              Acesse sua conta para continuar
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

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="••••••••"
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

              {/* Forgot Password Link */}
              <div className="text-right">
                <Link
                  href="/recuperacao-senha"
                  className="text-sm text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  tabIndex={isLoading ? -1 : 0}
                >
                  Esqueceu sua senha?
                </Link>
              </div>

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
                    <span className="sr-only">Autenticando...</span>
                    Autenticando...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Entrar
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
