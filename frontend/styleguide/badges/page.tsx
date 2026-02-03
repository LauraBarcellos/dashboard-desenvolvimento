import { Badge } from "@/components/ui/badge";
import { ShowcaseSection } from "@/features/styleguide/components/showcase-section";
import { Check, AlertTriangle, X, Clock } from "lucide-react";

export default function BadgesPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Badges</h1>
        <p className="mt-1 text-muted-foreground">4 variantes. Pill shape (rounded-full).</p>
      </div>

      <ShowcaseSection title="Variantes">
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Com Ícone">
        <div className="flex flex-wrap gap-3">
          <Badge>
            <Check className="size-3" /> Ativo
          </Badge>
          <Badge variant="secondary">
            <Clock className="size-3" /> Pendente
          </Badge>
          <Badge variant="destructive">
            <X className="size-3" /> Inativo
          </Badge>
          <Badge variant="outline">
            <AlertTriangle className="size-3" /> Alerta
          </Badge>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Uso em Contexto"
        description="Como são usados em tabelas e cards do projeto"
      >
        <div className="flex flex-wrap gap-3">
          <Badge>Ativo</Badge>
          <Badge variant="destructive">Inativo</Badge>
          <Badge variant="secondary">No prazo</Badge>
          <Badge variant="outline">Planejamento</Badge>
          <Badge variant="outline">Design</Badge>
          <Badge variant="outline">Desenvolvimento</Badge>
        </div>
      </ShowcaseSection>
    </>
  );
}
