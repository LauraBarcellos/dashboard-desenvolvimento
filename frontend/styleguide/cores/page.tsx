"use client";

import { ShowcaseSection } from "@/features/styleguide/components/showcase-section";
import { ColorSwatch } from "@/features/styleguide/components/color-swatch";

const primaryColors = [
  { name: "Primary", token: "--primary" },
  { name: "Primary FG", token: "--primary-foreground" },
  { name: "Ring", token: "--ring" },
];

const surfaceColors = [
  { name: "Background", token: "--background" },
  { name: "Foreground", token: "--foreground" },
  { name: "Card", token: "--card" },
  { name: "Card FG", token: "--card-foreground" },
  { name: "Popover", token: "--popover" },
  { name: "Muted", token: "--muted" },
  { name: "Muted FG", token: "--muted-foreground" },
  { name: "Accent", token: "--accent" },
  { name: "Secondary", token: "--secondary" },
  { name: "Border", token: "--border" },
  { name: "Input", token: "--input" },
];

const semanticColors = [
  { name: "Destructive", token: "--destructive" },
  { name: "Success", token: "--success" },
  { name: "Warning", token: "--warning" },
];

const chartColors = [
  { name: "Chart 1", token: "--chart-1" },
  { name: "Chart 2", token: "--chart-2" },
  { name: "Chart 3", token: "--chart-3" },
  { name: "Chart 4", token: "--chart-4" },
  { name: "Chart 5", token: "--chart-5" },
];

const sidebarColors = [
  { name: "Sidebar", token: "--sidebar" },
  { name: "Sidebar FG", token: "--sidebar-foreground" },
  { name: "Sidebar Accent", token: "--sidebar-accent" },
  { name: "Sidebar Border", token: "--sidebar-border" },
];

export default function CoresPage() {
  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Cores</h1>
        <p className="mt-1 text-muted-foreground">
          Tokens de cor em OKLCH. Troque o tema para visualizar ambos os modos.
        </p>
      </div>

      <ShowcaseSection title="Primary — Rosa Devio (Hue 340)" description="Cor da marca, CTAs e links">
        <div className="flex flex-wrap gap-6">
          {primaryColors.map((c) => (
            <ColorSwatch key={c.token} name={c.name} token={c.token} />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Superfícies" description="Backgrounds, cards, popovers e texto">
        <div className="flex flex-wrap gap-6">
          {surfaceColors.map((c) => (
            <ColorSwatch key={c.token} name={c.name} token={c.token} />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Semânticas" description="Estados de erro, sucesso e alerta">
        <div className="flex flex-wrap gap-6">
          {semanticColors.map((c) => (
            <ColorSwatch key={c.token} name={c.name} token={c.token} />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Charts">
        <div className="flex flex-wrap gap-6">
          {chartColors.map((c) => (
            <ColorSwatch key={c.token} name={c.name} token={c.token} />
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection title="Sidebar">
        <div className="flex flex-wrap gap-6">
          {sidebarColors.map((c) => (
            <ColorSwatch key={c.token} name={c.name} token={c.token} />
          ))}
        </div>
      </ShowcaseSection>
    </>
  );
}
