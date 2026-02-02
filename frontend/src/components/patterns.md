# Architectural Patterns

> Last updated: 2026-02-02
> Status: existing

## Stack Overview

| Aspect | Technology | Version | Source |
|--------|-----------|---------|--------|
| Framework | Next.js (App Router) | 16.1.1 | existing |
| UI Library | Shadcn UI (New York style) | latest | existing |
| CSS Approach | Tailwind CSS v4 (CSS-first config) | 4.x | existing |
| State Management | React state + hooks (no global store) | — | existing |
| Language | TypeScript (strict) | 5.x | existing |
| Forms | React Hook Form + Zod | 7.69 + 4.2 | existing |
| Icons | Lucide React | 0.562 | existing |
| Animations | Framer Motion | 12.23 | existing |
| Toasts | Sonner | latest | existing |
| Dates | date-fns | 4.1 | existing |
| Fonts | Geist + Geist Mono (next/font) | — | existing |
| Theme | next-themes (dark default) | 0.4 | existing |

## Folder Structure

```
src/
├── app/
│   ├── (auth)/              # Unauthenticated routes
│   │   ├── login/
│   │   ├── recuperacao-senha/
│   │   └── redefinir-senha/
│   ├── (app)/               # Authenticated routes (sidebar layout)
│   │   ├── dashboard/
│   │   ├── clientes/
│   │   │   ├── new/
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   ├── tarefas/
│   │   └── solicitacoes/
│   ├── (styleguide)/        # Design system documentation
│   │   └── styleguide/
│   │       └── components/
│   ├── layout.tsx           # Root layout (ThemeProvider)
│   ├── globals.css          # Design tokens + Tailwind v4 config
│   └── page.tsx             # Redirects to /login
├── components/
│   ├── ui/                  # Shadcn primitives (DO NOT edit manually)
│   ├── app-sidebar.tsx      # Main navigation sidebar
│   ├── page-header.tsx      # Reusable page header with breadcrumbs
│   ├── theme-provider.tsx   # next-themes wrapper
│   └── mode-toggle.tsx      # Dark/light toggle
├── features/
│   └── [feature]/           # Domain-specific modules
│       ├── components/      # Feature UI components
│       ├── hooks/           # Feature hooks
│       ├── mocks/           # Mock data (prototype mode)
│       ├── types/           # TypeScript types
│       ├── constants.ts     # Feature constants
│       └── schemas.ts       # Zod validation schemas
├── hooks/
│   └── use-mobile.ts        # Global hooks
└── lib/
    └── utils.ts             # cn() utility
```

## Naming Conventions

| Element | Convention | Example | Source |
|---------|-----------|---------|--------|
| Components | PascalCase | `ClienteForm` | existing |
| Files | kebab-case | `cliente-form.tsx` | existing |
| Functions | camelCase | `getClientes` | existing |
| Constants | UPPER_SNAKE or camelCase | `STATUS_LABELS`, `clienteStatuses` | existing |
| CSS | Tailwind utility classes | `bg-primary text-sm` | existing |
| Types | PascalCase | `Cliente`, `TimelineEvent` | existing |
| Hooks | `use` prefix, camelCase | `useClienteFilters` | existing |
| Schemas | camelCase with `Schema` suffix | `clienteSchema` | existing |
| Mock functions | `mock` prefix or `get` prefix | `getClientes`, `mockUser` | existing |
| Route groups | `(name)` | `(auth)`, `(app)` | existing |

## Component Patterns

### Component Structure

```tsx
"use client"; // Only when needed (hooks, events, browser APIs)

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { FeatureType } from "../types";

interface ComponentNameProps {
  data: FeatureType;
  className?: string;
}

export function ComponentName({ data, className }: ComponentNameProps) {
  return (
    <div className={cn("base-classes", className)}>
      {/* content */}
    </div>
  );
}
```

### Props Pattern

- Props defined as interface directly above the component
- `className?: string` always accepted for composition
- `cn()` used to merge class names
- Destructured in function signature
- No default exports — always named exports

### Form Pattern

```tsx
const form = useForm<FormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: { ... },
});

function onSubmit(values: FormValues) {
  // handle submission
  toast.success("Mensagem de sucesso");
}

return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField control={form.control} name="fieldName" render={({ field }) => (
        <FormItem>
          <FormLabel>Label</FormLabel>
          <FormControl><Input {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </form>
  </Form>
);
```

### Data Fetching Pattern

Currently **mock-only** (prototype mode). Mock functions in `features/[feature]/mocks/data.ts` simulate API calls. Types and Zod schemas are ready for real API integration.

### State Management Pattern

- **Local state:** `useState` / `useReducer` within components
- **URL state:** Query params for filters (via custom hooks like `useClienteFilters`)
- **No global store:** No Redux, Zustand, or Context for shared state yet
- **Theme:** `next-themes` via ThemeProvider

## Error Handling

| Scenario | Pattern | Source |
|----------|---------|--------|
| Route errors | `error.tsx` error boundary per route | existing |
| Route loading | `loading.tsx` with skeleton components | existing |
| Form validation | Zod schema + FormMessage display | existing |
| Empty data | Feature-specific `*-empty-state.tsx` | existing |
| Data errors | Feature-specific `*-error-state.tsx` | existing |
| User feedback | `sonner` toast notifications | existing |

## Import Conventions

| Type | Convention | Source |
|------|-----------|--------|
| Path aliases | `@/*` → `./src/*` | existing |
| UI components | `@/components/ui/[name]` | existing |
| Feature components | `../components/[name]` or `@/features/[feature]/components/[name]` | existing |
| Types | `../types` or `@/features/[feature]/types` | existing |
| Utilities | `@/lib/utils` | existing |
| Import order | React → external libs → `@/` aliases → relative | existing |
| Barrel exports | Only in `types/index.ts` | existing |

## Testing Patterns

| Type | Tool | Status | Source |
|------|------|--------|--------|
| Unit | — | Not configured | — |
| Integration | — | Not configured | — |
| E2E | — | Not configured | — |

No test runner is configured yet. Validation is done via `npm run build` and `npm run type-check`.
