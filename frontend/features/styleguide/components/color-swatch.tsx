"use client";

import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  name: string;
  token: string;
  className?: string;
}

export function ColorSwatch({ name, token, className }: ColorSwatchProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className="size-16 rounded-lg border shadow-sm"
        style={{ backgroundColor: `var(${token})` }}
      />
      <div className="text-center">
        <p className="text-xs font-medium">{name}</p>
        <p className="text-[10px] text-muted-foreground">{token}</p>
      </div>
    </div>
  );
}
