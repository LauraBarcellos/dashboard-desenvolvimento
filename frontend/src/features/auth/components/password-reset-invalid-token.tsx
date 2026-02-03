'use client';

import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InView } from '@/components/ui/in-view';

interface PasswordResetInvalidTokenProps {
  error: string | null;
}

export function PasswordResetInvalidToken({ error }: PasswordResetInvalidTokenProps) {
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
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-destructive/20 via-destructive/10 to-destructive/5 ring-2 ring-destructive/20">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold">Link Inválido</CardTitle>
            <CardDescription className="text-base text-muted-foreground">{error}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground text-center">
            O link pode ter expirado ou já foi utilizado. Solicite um novo link de recuperação.
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/recuperacao-senha">Solicitar Novo Link</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/login">Voltar para Login</Link>
          </Button>
        </CardContent>
      </Card>
    </InView>
  );
}



