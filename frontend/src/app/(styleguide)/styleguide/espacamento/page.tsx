import { ShowcaseSection } from "@/features/styleguide/components/showcase-section";

const spacingScale = [
  { class: "1", px: "4px" },
  { class: "2", px: "8px" },
  { class: "3", px: "12px" },
  { class: "4", px: "16px" },
  { class: "6", px: "24px" },
  { class: "8", px: "32px" },
  { class: "12", px: "48px" },
  { class: "16", px: "64px" },
];

const radiusScale = [
  { name: "sm", value: "6px", class: "rounded-sm" },
  { name: "md", value: "8px", class: "rounded-md" },
  { name: "lg", value: "10px", class: "rounded-lg" },
  { name: "xl", value: "14px", class: "rounded-xl" },
  { name: "2xl", value: "18px", class: "rounded-2xl" },
  { name: "full", value: "9999px", class: "rounded-full" },
];

const shadowScale = [
  { name: "shadow-sm", class: "shadow-sm" },
  { name: "shadow-md", class: "shadow-md" },
  { name: "shadow-lg", class: "shadow-lg" },
  { name: "shadow-xl", class: "shadow-xl" },
  { name: "shadow-2xl", class: "shadow-2xl" },
];

export default function EspacamentoPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Espaçamento</h1>
        <p className="mt-1 text-muted-foreground">Spacing, border-radius e shadows.</p>
      </div>

      <ShowcaseSection title="Escala de Espaçamento" description="Base: 1 unit = 4px (0.25rem)">
        <div className="space-y-3">
          {spacingScale.map((s) => (
            <div key={s.class} className="flex items-center gap-4">
              <span className="w-16 shrink-0 text-xs text-muted-foreground">gap-{s.class}</span>
              <div className="h-4 rounded bg-primary" style={{ width: s.px }} />
              <span className="text-xs text-muted-foreground">{s.px}</span>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Border Radius" description="Base: --radius = 0.625rem (10px)">
        <div className="flex flex-wrap gap-6">
          {radiusScale.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div className={`size-16 border-2 border-primary bg-primary/10 ${r.class}`} />
              <p className="text-xs font-medium">{r.name}</p>
              <p className="text-[10px] text-muted-foreground">{r.value}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Shadows">
        <div className="flex flex-wrap gap-6">
          {shadowScale.map((s) => (
            <div key={s.name} className="flex flex-col items-center gap-2">
              <div className={`size-20 rounded-lg border bg-card ${s.class}`} />
              <p className="text-xs font-medium">{s.name}</p>
            </div>
          ))}
        </div>
      </ShowcaseSection>
    </>
  );
}
