import { Metadata } from 'next';
import { PasswordRecoveryRequestForm } from '@/features/auth/components/password-recovery-request-form';

export const metadata: Metadata = {
  title: 'Recuperar Senha | Portal Devio',
  description: 'Solicite a recuperação da sua senha',
};

export default function PasswordRecoveryPage() {
  return (
    <div className="auth-page flex min-h-screen items-center justify-center px-4 py-12">
      <div className="relative z-10 w-full max-w-md">
        <PasswordRecoveryRequestForm />
      </div>
    </div>
  );
}
