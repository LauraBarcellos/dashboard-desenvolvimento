import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsGrid } from "@/components/ui/stat-card";
import { ShowcaseSection } from "@/features/styleguide/components/showcase-section";
import { Users, TrendingUp, MoreVertical, Clock, CheckCircle2 } from "lucide-react";
import type { StatItem } from "@/components/ui/stat-card";

const demoStats: StatItem[] = [
  {
    id: "total",
    label: "Total de Clientes",
    value: 245,
    icon: Users,
    trend: "+3 esta semana",
    trendColor: "text-success",
  },
  {
    id: "ativos",
    label: "Clientes Ativos",
    value: 198,
    icon: TrendingUp,
    trend: "81% do total",
    trendColor: "text-success",
  },
  {
    id: "pendentes",
    label: "Pendentes",
    value: 12,
    icon: Clock,
    trend: "2 atrasadas",
    trendColor: "text-destructive",
  },
  {
    id: "concluidas",
    label: "Concluídas",
    value: 35,
    icon: CheckCircle2,
    iconBg: "bg-success/10",
    iconColor: "text-success",
    trend: "74% do total",
    trendColor: "text-muted-foreground",
  },
];

export default function CardsPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Cards</h1>
        <p className="mt-1 text-muted-foreground">
          Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter,
          StatCard, StatsGrid.
        </p>
      </div>

      <ShowcaseSection title="Card Básico">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Título do Card</CardTitle>
            <CardDescription>Descrição breve do conteúdo</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Conteúdo do card com informações relevantes.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">
              Cancelar
            </Button>
            <Button size="sm">Salvar</Button>
          </CardFooter>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection title="Card com Action">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Clientes Ativos</CardTitle>
            <CardDescription>Últimos 30 dias</CardDescription>
            <CardAction>
              <Button variant="ghost" size="icon-sm" aria-label="Opções">
                <MoreVertical />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">142</span>
              <Badge variant="secondary">
                <TrendingUp className="size-3" /> +12%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        title="StatsGrid + StatCard"
        description="Componente compartilhado usado em dashboards (ClientesStats, TarefasStats, SolicitacoesStats)"
      >
        <StatsGrid stats={demoStats} columns={4} />
      </ShowcaseSection>

      <ShowcaseSection title="StatsGrid — 3 colunas">
        <StatsGrid stats={demoStats.slice(0, 3)} columns={3} />
      </ShowcaseSection>

      <ShowcaseSection title="StatsGrid — 2 colunas">
        <StatsGrid stats={demoStats.slice(0, 2)} columns={2} />
      </ShowcaseSection>
    </>
  );
}
