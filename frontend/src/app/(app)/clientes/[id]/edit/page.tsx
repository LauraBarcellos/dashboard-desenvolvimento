'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/page-header';
import { ClienteForm } from '@/features/clientes/components/cliente-form';
import { ErrorState } from '@/components/ui/error-state';
import { MOCK_CLIENTES } from '@/features/clientes/mocks/data';

interface EditClientePageProps {
  params: Promise<{ id: string }>;
}

/**
 * Edit cliente page
 * Route: /clientes/[id]/edit
 * The form now handles all submission logic internally
 */
export default function EditClientePage({ params }: EditClientePageProps) {
  const router = useRouter();
  const { id } = use(params);

  // Find cliente by ID
  const cliente = MOCK_CLIENTES.find((c) => c.id === id);

  if (!cliente) {
    return (
      <>
        <PageHeader
          title="Cliente Não Encontrado"
          description="O cliente solicitado não foi encontrado no sistema"
          breadcrumbs={[
            { label: 'Clientes', href: '/clientes' },
            { label: 'Editar' },
          ]}
          showBackButton
        />
        <div className="p-6">
          <ErrorState
            title="Algo deu errado"
            message="O cliente solicitado não foi encontrado."
            retry={() => router.push('/clientes')}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Editar Cliente"
        description={`Atualize as informações cadastrais de ${cliente.nome}`}
        breadcrumbs={[
          { label: 'Clientes', href: '/clientes' },
          { label: cliente.nome, href: `/clientes/${id}` },
          { label: 'Editar' },
        ]}
        showBackButton
      />

      <div className="p-4 sm:p-6 animate-in fade-in duration-500">
        <ClienteForm mode="edit" cliente={cliente} />
      </div>
    </>
  );
}
