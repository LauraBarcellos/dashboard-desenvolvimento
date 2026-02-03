'use client';

import { ClienteForm } from '@/features/clientes/components/cliente-form';
import { PageHeader } from '@/components/page-header';

/**
 * Create new cliente page
 * Route: /clientes/new
 * The form now handles all submission logic internally
 */
export default function NewClientePage() {
  return (
    <>
      <PageHeader
        title="Novo Cliente"
        description="Preencha os dados cadastrais do cliente"
        breadcrumbs={[
          { label: 'Clientes', href: '/clientes' },
          { label: 'Novo Cliente' },
        ]}
        showBackButton
      />

      <div className="p-4 sm:p-6 animate-in fade-in duration-500">
        <ClienteForm mode="create" />
      </div>
    </>
  );
}
