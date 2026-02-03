import { ShowcaseSection } from "@/features/styleguide/components/showcase-section";
import { Separator } from "@/components/ui/separator";

export default function TipografiaPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Tipografia</h1>
        <p className="mt-1 text-muted-foreground">
          Geist Sans para UI, Geist Mono para código. Escala do Tailwind v4.
        </p>
      </div>

      <ShowcaseSection title="Escala de Tamanhos">
        <div className="space-y-4">
          <div className="flex items-baseline gap-4">
            <span className="w-20 shrink-0 text-xs text-muted-foreground">text-3xl</span>
            <span className="text-3xl">Heading Hero — 30px</span>
          </div>
          <Separator />
          <div className="flex items-baseline gap-4">
            <span className="w-20 shrink-0 text-xs text-muted-foreground">text-2xl</span>
            <span className="text-2xl">Page Title — 24px</span>
          </div>
          <Separator />
          <div className="flex items-baseline gap-4">
            <span className="w-20 shrink-0 text-xs text-muted-foreground">text-xl</span>
            <span className="text-xl">Section Title — 20px</span>
          </div>
          <Separator />
          <div className="flex items-baseline gap-4">
            <span className="w-20 shrink-0 text-xs text-muted-foreground">text-lg</span>
            <span className="text-lg">Large Body — 18px</span>
          </div>
          <Separator />
          <div className="flex items-baseline gap-4">
            <span className="w-20 shrink-0 text-xs text-muted-foreground">text-base</span>
            <span className="text-base">Body Text — 16px</span>
          </div>
          <Separator />
          <div className="flex items-baseline gap-4">
            <span className="w-20 shrink-0 text-xs text-muted-foreground">text-sm</span>
            <span className="text-sm">Secondary — 14px</span>
          </div>
          <Separator />
          <div className="flex items-baseline gap-4">
            <span className="w-20 shrink-0 text-xs text-muted-foreground">text-xs</span>
            <span className="text-xs">Caption — 12px</span>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Pesos">
        <div className="space-y-3">
          <p className="font-normal">font-normal (400) — Corpo de texto</p>
          <p className="font-medium">font-medium (500) — Botões, ênfase</p>
          <p className="font-semibold">font-semibold (600) — Títulos de cards, subtítulos</p>
          <p className="font-bold">font-bold (700) — Headings (uso raro)</p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Fontes">
        <div className="space-y-3">
          <p className="font-[family-name:var(--font-geist-sans)]">
            Geist Sans — Interface e corpo de texto
          </p>
          <p className="font-[family-name:var(--font-geist-mono)] font-mono">
            Geist Mono — Código e valores técnicos
          </p>
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Hierarquia de Texto" description="Combinações comuns no projeto">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold sm:text-2xl">Título de Página</h3>
            <p className="text-sm text-muted-foreground">Descrição da página em muted</p>
          </div>
          <Separator />
          <div>
            <h4 className="text-base font-semibold">Título de Card</h4>
            <p className="text-sm text-muted-foreground">Descrição do card</p>
          </div>
          <Separator />
          <div>
            <p className="text-sm font-medium">Label de formulário</p>
            <p className="text-xs text-muted-foreground">Texto de ajuda abaixo do campo</p>
          </div>
        </div>
      </ShowcaseSection>
    </>
  );
}
