import { Metadata } from 'next';
import { Suspense } from 'react';
import { PasswordResetForm } from '@/features/auth/components/password-reset-form';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Redefinir Senha | Portal Devio',
  description: 'Defina uma nova senha para sua conta',
};

function PasswordResetFormSkeleton() {
  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2 text-center">
          <Skeleton className="h-12 w-12 mx-auto rounded-full" />
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Skeleton className="h-11 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function PasswordResetPage() {
  return (
    <div className="auth-page flex min-h-screen items-center justify-center px-4 py-12">
      <div className="relative z-10 w-full max-w-md">
        <Suspense fallback={<PasswordResetFormSkeleton />}>
          <PasswordResetForm />
        </Suspense>
      </div>
    </div>
  );
}
