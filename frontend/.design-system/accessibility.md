# Accessibility Guidelines

> Last updated: 2026-02-02
> Target compliance: WCAG 2.1 AA
> Current compliance: Partial AA (good foundation via Radix UI primitives)

## Color Contrast

### Requirements (WCAG AA)

| Context | Minimum Ratio | Standard |
|---------|--------------|----------|
| Normal text (< 18px bold, < 24px) | 4.5:1 | WCAG AA |
| Large text (18px+ bold, 24px+) | 3:1 | WCAG AA |
| UI components & icons | 3:1 | WCAG AA |

### Key Combinations (OKLCH)

| Foreground | Background | Mode | Estimated Status |
|------------|-----------|------|-----------------|
| `--foreground` on `--background` | `oklch(0.14)` on `oklch(0.98)` | Light | Pass (high contrast) |
| `--foreground` on `--background` | `oklch(0.98)` on `oklch(0.14)` | Dark | Pass (high contrast) |
| `--primary-foreground` on `--primary` | `oklch(0.98)` on `oklch(0.53)` | Light | Pass |
| `--primary-foreground` on `--primary` | `oklch(0.14)` on `oklch(0.74)` | Dark | Pass |
| `--muted-foreground` on `--background` | `oklch(0.51)` on `oklch(0.98)` | Light | Verify — borderline |
| `--muted-foreground` on `--card` | `oklch(0.70)` on `oklch(0.16)` | Dark | Verify — borderline |

### Flagged Concerns

| Combination | Context | Recommendation |
|-------------|---------|----------------|
| `--muted-foreground` on light surfaces | Secondary text, descriptions | Verify 4.5:1 ratio. Consider darkening to `oklch(0.46)` if failing |
| `--muted-foreground` on dark surfaces | Secondary text in dark mode | Verify 4.5:1 ratio. Consider lightening to `oklch(0.73)` if failing |

## Keyboard Navigation

### Global

| Key | Action |
|-----|--------|
| `Tab` | Move focus forward |
| `Shift+Tab` | Move focus backward |
| `Escape` | Close modal/dropdown/popover/sheet |
| `Enter` / `Space` | Activate focused element |

### Component-Specific (via Radix UI)

| Component | Key | Action |
|-----------|-----|--------|
| DropdownMenu | `Arrow Down/Up` | Navigate items |
| DropdownMenu | `Enter/Space` | Select item |
| Select | `Arrow Down/Up` | Navigate options |
| Tabs | `Arrow Left/Right` | Switch tabs |
| Dialog/Sheet | `Tab` trapped | Focus stays within overlay |
| Collapsible | `Enter/Space` | Toggle content |
| Tooltip | Focus on trigger | Shows tooltip |

## Focus Management

**Focus indicator style:**
- Ring: `ring-ring/50` with `ring-[3px]`
- Token: `--ring` = `oklch(0.530 0.270 340)` (light) / `oklch(0.740 0.240 340)` (dark)
- Applied via: `focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]`

**Focus trap:**
- Required for: Dialog, Sheet (handled by Radix UI)
- Implementation: Radix `Dialog` and `Sheet` components automatically trap focus

**Focus order:**
- Follows DOM order (no `tabindex` manipulation needed)
- PageHeader breadcrumbs → actions → main content

## Semantic HTML

### Current Implementation

| Context | Element Used | Source |
|---------|-------------|--------|
| Page header | `<h1>` in PageHeader | existing |
| Navigation | `<nav aria-label="Breadcrumb">` | existing |
| Sidebar | `<nav>` via Shadcn Sidebar | existing |
| Breadcrumb list | `<ol>` | existing |
| Buttons | `<button>` (or Slot) | existing |
| Links | `<Link>` (Next.js) | existing |
| Forms | `<form>` with `<label>` | existing |
| Tables | `<table>` with `<th>` | existing |

### Guidelines

- One `<h1>` per page (handled by PageHeader `title`)
- No skipping heading levels
- Use `<section>` with heading for distinct content areas
- Use `<main>` in layout for primary content
- Interactive elements must be `<button>` or `<a>`, never `<div onClick>`

## ARIA Patterns

### Required by Component

| Component | ARIA Attributes | Notes |
|-----------|----------------|-------|
| Icon-only Button | `aria-label="Descrição"` | Always required. Example: `aria-label="Voltar"` |
| Dialog | `role="dialog"`, `aria-modal`, `aria-labelledby` | Handled by Radix |
| Toast (Sonner) | `role="alert"`, `aria-live="polite"` | Handled by Sonner |
| Form fields | `aria-invalid`, `aria-describedby` | Handled by Shadcn Form |
| Loading skeleton | `aria-busy="true"` | Add to parent container |
| Empty state | Informational, no special ARIA needed | — |
| Breadcrumb | `aria-label="Breadcrumb"` on `<nav>` | existing |

## Images & Media

- Avatar images: Use `<Avatar>` with `<AvatarFallback>` (initials) as alt-text alternative
- Decorative images: `alt=""`
- Remote images configured: api.dicebear.com, gravatar.com, logo.clearbit.com

## Motion & Animation

**Reduced motion support:** existing

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Framer Motion:** Used for page transitions and component animations. Should respect `prefers-reduced-motion` via Framer's `useReducedMotion` hook when adding new animations.

## Screen Reader Checklist

- [x] Interactive elements announced with role and state (via Radix UI)
- [x] Form errors announced via `aria-describedby` (Shadcn Form)
- [x] Page title set via Next.js `metadata.title`
- [ ] Dynamic content updates should use `aria-live` (verify toast notifications)
- [x] Tables use proper `<th>` headers
- [x] Back button has `aria-label="Voltar"`
- [ ] Loading states should announce `aria-busy` on container
- [x] Breadcrumbs use semantic `<nav>` + `<ol>`

## Language

- HTML `lang="pt-BR"` set on `<html>` element
- All UI text is in Brazilian Portuguese
- Screen readers will use Portuguese pronunciation
