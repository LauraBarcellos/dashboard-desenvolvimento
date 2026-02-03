"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function StyleguideHeader() {
  return (
    <header className="flex shrink-0 items-center justify-between border-b bg-card px-6 py-3">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href="/dashboard" aria-label="Voltar ao Portal">
            <ArrowLeft />
          </Link>
        </Button>
        <div>
          <h1 className="text-lg font-semibold">Portal Devio — Styleguide</h1>
          <p className="text-xs text-muted-foreground">Design System vivo do projeto</p>
        </div>
      </div>
      <ModeToggle />
    </header>
  );
}
