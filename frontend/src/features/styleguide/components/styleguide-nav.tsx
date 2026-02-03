"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/styleguide", label: "Overview", icon: Home },
  { href: "/styleguide/cores", label: "Cores", icon: Palette },
  { href: "/styleguide/tipografia", label: "Tipografia", icon: Type },
  { href: "/styleguide/espacamento", label: "Espaçamento", icon: RulerIcon },
  { href: "/styleguide/botoes", label: "Botões", icon: MousePointerClick },
  { href: "/styleguide/cards", label: "Cards", icon: LayoutGrid },
  { href: "/styleguide/badges", label: "Badges", icon: Tag },
  { href: "/styleguide/formularios", label: "Formulários", icon: FormInput },
  { href: "/styleguide/tabelas", label: "Tabelas", icon: TableIcon },
  { href: "/styleguide/feedback", label: "Feedback", icon: MessageSquare },
  { href: "/styleguide/navegacao", label: "Navegação", icon: Navigation },
  { href: "/styleguide/icones", label: "Ícones", icon: Smile },
  { href: "/styleguide/graficos", label: "Gráficos", icon: BarChart3 },
];

export function StyleguideNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <item.icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
