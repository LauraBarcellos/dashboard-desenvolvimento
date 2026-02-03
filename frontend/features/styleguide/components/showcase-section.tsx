"use client";

import { cn } from "@/lib/utils";

interface ShowcaseSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function ShowcaseSection({ title, description, children, className }: ShowcaseSectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="rounded-lg border bg-card p-6">{children}</div>
    </section>
  );
}
