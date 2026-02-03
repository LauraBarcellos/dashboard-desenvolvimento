'use client';

import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InView } from '@/components/ui/in-view';

import { AUTH_SUCCESS } from '../constants';

export function PasswordResetSuccess() {
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
            <CardTitle className="text-3xl font-bold">Senha Redefinida!</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              {AUTH_SUCCESS.PASSWORD_RESET_SUCCESS}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full" size="lg">
            <Link href="/login">Fazer Login</Link>
          </Button>
        </CardContent>
      </Card>
    </InView>
  );
}



