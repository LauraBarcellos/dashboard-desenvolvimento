import { Metadata } from 'next';
import { LoginForm } from '@/features/auth/components/login-form';

export const metadata: Metadata = {
  title: 'Login | Portal Devio',
  description: 'Acesse sua conta do Portal Devio',
};

export default function LoginPage() {
  return (
    <div className="auth-page flex min-h-screen items-center justify-center px-4 py-12">
      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
