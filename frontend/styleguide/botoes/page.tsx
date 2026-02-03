import { Button } from "@/components/ui/button";
import { ShowcaseSection } from "@/features/styleguide/components/showcase-section";
import { Plus, Trash2, Settings, ChevronRight, Download } from "lucide-react";

export default function BotoesPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Botões</h1>
        <p className="mt-1 text-muted-foreground">
          6 variantes visuais e 6 tamanhos. CVA + Radix Slot.
        </p>
      </div>

      <ShowcaseSection title="Variantes">
        <div className="flex flex-wrap gap-3">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Tamanhos">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Configurações">
            <Settings />
          </Button>
          <Button size="icon-sm" aria-label="Configurações">
            <Settings />
          </Button>
          <Button size="icon-lg" aria-label="Configurações">
            <Settings />
          </Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Com Ícone">
        <div className="flex flex-wrap gap-3">
          <Button>
            <Plus /> Novo Cliente
          </Button>
          <Button variant="destructive">
            <Trash2 /> Excluir
          </Button>
          <Button variant="outline">
            <Download /> Exportar
          </Button>
          <Button variant="ghost">
            Próximo <ChevronRight />
          </Button>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Estados">
        <div className="flex flex-wrap gap-3">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
        </div>
      </ShowcaseSection>
    </>
  );
}
