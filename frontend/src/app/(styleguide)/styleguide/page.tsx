import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Palette,
  Type,
  RulerIcon,
  MousePointerClick,
  LayoutGrid,
  Tag,
  FormInput,
  TableIcon,
  MessageSquare,
  Navigation,
  Smile,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

const sections = [
  { href: "/styleguide/cores", label: "Cores", icon: Palette, count: "16 tokens" },
  { href: "/styleguide/tipografia", label: "Tipografia", icon: Type, count: "7 tamanhos" },
  { href: "/styleguide/espacamento", label: "Espaçamento", icon: RulerIcon, count: "8 escalas" },
  { href: "/styleguide/botoes", label: "Botões", icon: MousePointerClick, count: "6 variantes" },
  {
    href: "/styleguide/cards",
    label: "Cards",
    icon: LayoutGrid,
    count: "Card + StatCard + StatsGrid",
  },
  { href: "/styleguide/badges", label: "Badges", icon: Tag, count: "4 variantes" },
  { href: "/styleguide/formularios", label: "Formulários", icon: FormInput, count: "Input, Select, Switch, Form" },
  { href: "/styleguide/tabelas", label: "Tabelas", icon: TableIcon, count: "6 sub-componentes" },
  {
    href: "/styleguide/feedback",
    label: "Feedback",
    icon: MessageSquare,
    count: "Dialog, Toast, EmptyState, ErrorState",
  },
  { href: "/styleguide/navegacao", label: "Navegação", icon: Navigation, count: "Tabs, Pagination, Separator" },
  { href: "/styleguide/icones", label: "Ícones", icon: Smile, count: "53 ícones Lucide" },
  { href: "/styleguide/graficos", label: "Gráficos", icon: BarChart3, count: "Chart, Calendar, Popover" },
];

export default function StyleguideOverviewPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Design System</h1>
        <p className="mt-1 text-muted-foreground">
          Documentação viva dos componentes, tokens e padrões do Portal Devio.
        </p>
        <div className="mt-3 flex gap-2">
          <Badge>Shadcn UI</Badge>
          <Badge variant="secondary">Tailwind v4</Badge>
          <Badge variant="secondary">OKLCH</Badge>
          <Badge variant="outline">Next.js 16</Badge>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => (
          <Link key={s.href} href={s.href}>
            <Card className="transition-colors hover:border-primary/50">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <s.icon className="size-5 text-primary" />
                  <CardTitle className="text-base">{s.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{s.count}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="rounded-lg border bg-muted/50 p-4">
        <h2 className="text-sm font-medium">Stack</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Next.js 16 &bull; React 19 &bull; TypeScript &bull; Tailwind CSS v4 &bull; Shadcn UI (New
          York) &bull; Radix UI &bull; Lucide Icons &bull; Framer Motion &bull; Geist Font &bull;
          react-hook-form + Zod
        </p>
      </div>
    </>
  );
}
