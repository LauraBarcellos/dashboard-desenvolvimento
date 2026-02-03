'use client';

import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useCurrentUser } from '@/features/auth/hooks/use-current-user';
import { getTarefasByUserId } from '@/features/tarefas/mocks/data';
import { TarefaList } from '@/features/tarefas/components/tarefa-list';
import { TarefasStats } from '@/features/tarefas/components/tarefas-stats';
import { getSolicitacoesByUserId } from '@/features/solicitacoes/mocks/data';
import { SolicitacaoList } from '@/features/solicitacoes/components/solicitacao-list';
import { SolicitacoesStats } from '@/features/solicitacoes/components/solicitacoes-stats';

export default function DashboardPage() {
  // Get current logged-in user
  const currentUser = useCurrentUser();

  // Filter data by current user - CRITICAL: Only user's own data
  const userTarefas = useMemo(() => getTarefasByUserId(currentUser.id), [currentUser.id]);
  const userSolicitacoes = useMemo(() => getSolicitacoesByUserId(currentUser.id), [currentUser.id]);

  // Get recent items for display
  const recentTarefas = useMemo(
    () => userTarefas.slice(0, 5).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
    [userTarefas]
  );
  const recentSolicitacoes = useMemo(
    () => userSolicitacoes.slice(0, 3).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
    [userSolicitacoes]
  );

  return (
    <>
      <PageHeader
        title={`Olá, ${currentUser.name}`}
        description="Bem-vindo ao Portal Devio - sua central de operações pessoal"
      />

      <div className="p-6 space-y-8">
        {/* Tarefas Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Suas Tarefas</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Acompanhe suas tarefas e responsabilidades
              </p>
            </div>
          </div>

          {/* Tarefas Stats */}
          <TarefasStats tarefas={userTarefas} />

          {/* Recent Tarefas */}
          <Card className="border-border bg-background">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Tarefas Recentes</CardTitle>
                  <CardDescription>Suas últimas 5 tarefas</CardDescription>
                </div>
                {userTarefas.length > 5 && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#" className="gap-2">
                      Ver todas
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <TarefaList
                tarefas={recentTarefas}
                emptyMessage="Você não tem tarefas"
              />
            </CardContent>
          </Card>
        </section>

        {/* Solicitações Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Suas Solicitações</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Acompanhe o status das suas solicitações
              </p>
            </div>
          </div>

          {/* Solicitações Stats */}
          <SolicitacoesStats solicitacoes={userSolicitacoes} />

          {/* Recent Solicitações */}
          <Card className="border-border bg-background">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Solicitações Recentes</CardTitle>
                  <CardDescription>Suas últimas 3 solicitações</CardDescription>
                </div>
                {userSolicitacoes.length > 3 && (
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="#" className="gap-2">
                      Ver todas
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <SolicitacaoList
                solicitacoes={recentSolicitacoes}
                emptyMessage="Você não tem solicitações"
              />
            </CardContent>
          </Card>
        </section>

        {/* Quick Actions */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Acesso Rápido</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Atalhos para áreas principais do sistema
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border bg-muted/30 hover:border-primary/40 transition-all duration-200">
              <CardHeader>
                <CardTitle>Clientes</CardTitle>
                <CardDescription>Gerencie seus clientes</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/clientes">Acessar Clientes</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-muted/30 hover:border-primary/40 transition-all duration-200">
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
                <CardDescription>Acompanhe eventos dos clientes</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full" variant="secondary">
                  <Link href="/clientes">Ver Timeline</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
