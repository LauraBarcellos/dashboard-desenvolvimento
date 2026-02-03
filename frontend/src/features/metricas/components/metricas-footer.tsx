import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function MetricasFooter() {
  const now = new Date();

  return (
    <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
      <span>Fonte: Mock Data — Portal Devio</span>
      <span>
        Última atualização: {format(now, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
      </span>
    </footer>
  );
}
