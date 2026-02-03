# Design Tokens

> Last updated: 2026-02-02
> Status: existing

## Colors

### Primary (Rosa Devio — Hue 340)

| Token | Light | Dark | Usage | Source |
|-------|-------|------|-------|--------|
| `--primary` | `oklch(0.530 0.270 340)` | `oklch(0.740 0.240 340)` | Brand color, CTAs, links | existing |
| `--primary-foreground` | `oklch(0.98 0.003 285)` | `oklch(0.14 0.005 285)` | Text on primary | existing |
| `--ring` | `oklch(0.530 0.270 340)` | `oklch(0.740 0.240 340)` | Focus rings | existing |

### Semantic

| Token | Light | Dark | Usage | Source |
|-------|-------|------|-------|--------|
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.477 0.214 27.325)` | Error/danger states | existing |
| `--destructive-foreground` | `oklch(0.98 0.003 285)` | `oklch(0.98 0.003 285)` | Text on destructive | existing |
| `--success` | `oklch(0.647 0.178 142.495)` | `oklch(0.647 0.178 142.495)` | Success states | existing |
| `--warning` | `oklch(0.768 0.171 75.609)` | `oklch(0.768 0.171 75.609)` | Warning states | existing |

### Surface & Background

| Token | Light | Dark | Usage | Source |
|-------|-------|------|-------|--------|
| `--background` | `oklch(0.98 0.001 0)` | `oklch(0.14 0.002 0)` | Page background | existing |
| `--foreground` | `oklch(0.14 0.005 285)` | `oklch(0.98 0.003 285)` | Default text | existing |
| `--card` | `oklch(0.995 0.002 285)` | `oklch(0.16 0.006 285)` | Card surfaces | existing |
| `--card-foreground` | `oklch(0.14 0.005 285)` | `oklch(0.98 0.003 285)` | Card text | existing |
| `--popover` | `oklch(1 0 0)` | `oklch(0.14 0.005 285)` | Popover surfaces | existing |
| `--popover-foreground` | `oklch(0.14 0.005 285)` | `oklch(0.98 0.003 285)` | Popover text | existing |
| `--muted` | `oklch(0.96 0.003 285)` | `oklch(0.25 0.012 285)` | Subdued backgrounds | existing |
| `--muted-foreground` | `oklch(0.51 0.015 285)` | `oklch(0.70 0.012 285)` | Secondary text | existing |
| `--accent` | `oklch(0.96 0.003 285)` | `oklch(0.25 0.012 285)` | Hover/active backgrounds | existing |
| `--accent-foreground` | `oklch(0.21 0.006 285)` | `oklch(0.98 0.003 285)` | Text on accent | existing |
| `--secondary` | `oklch(0.96 0.003 285)` | `oklch(0.25 0.012 285)` | Secondary elements | existing |
| `--secondary-foreground` | `oklch(0.21 0.006 285)` | `oklch(0.98 0.003 285)` | Text on secondary | existing |
| `--border` | `oklch(0.91 0.004 285)` | `oklch(0.25 0.012 285)` | Default borders | existing |
| `--input` | `oklch(0.91 0.004 285)` | `oklch(0.25 0.012 285)` | Input borders | existing |
| `--overlay` | `oklch(0.14 0.005 285 / 0.5)` | `oklch(0.14 0.005 285 / 0.6)` | Modal overlays | existing |

### Sidebar

| Token | Light | Dark | Usage | Source |
|-------|-------|------|-------|--------|
| `--sidebar` | `var(--card)` | `var(--card)` | Sidebar background | existing |
| `--sidebar-foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | Sidebar text | existing |
| `--sidebar-primary` | `var(--primary)` | `var(--primary)` | Sidebar active item | existing |
| `--sidebar-accent` | `oklch(0.530 0.270 340 / 0.1)` | `oklch(0.740 0.240 340 / 0.15)` | Sidebar hover | existing |
| `--sidebar-accent-foreground` | `var(--primary)` | `var(--primary)` | Sidebar hover text | existing |
| `--sidebar-border` | `oklch(0.922 0 0)` | `oklch(1 0 0 / 10%)` | Sidebar border | existing |

### Chart Colors

| Token | Light | Dark | Source |
|-------|-------|------|--------|
| `--chart-1` | `oklch(0.646 0.222 41.116)` | `oklch(0.488 0.243 264.376)` | existing |
| `--chart-2` | `oklch(0.6 0.118 184.704)` | `oklch(0.696 0.17 162.48)` | existing |
| `--chart-3` | `oklch(0.398 0.07 227.392)` | `oklch(0.769 0.188 70.08)` | existing |
| `--chart-4` | `oklch(0.828 0.189 84.429)` | `oklch(0.627 0.265 303.9)` | existing |
| `--chart-5` | `oklch(0.769 0.188 70.08)` | `oklch(0.645 0.246 16.439)` | existing |

## Typography

### Font Families

| Token | Value | Usage | Source |
|-------|-------|-------|--------|
| `--font-geist-sans` | `Geist, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` | Body text, UI | existing |
| `--font-geist-mono` | `Geist Mono, monospace` | Code blocks | existing |

### Font Sizes (Tailwind v4 defaults)

| Class | Value | Line Height | Usage | Source |
|-------|-------|-------------|-------|--------|
| `text-xs` | `0.75rem` (12px) | `1rem` | Captions, badges, labels | existing |
| `text-sm` | `0.875rem` (14px) | `1.25rem` | Secondary text, form labels | existing |
| `text-base` | `1rem` (16px) | `1.5rem` | Body text | existing |
| `text-lg` | `1.125rem` (18px) | `1.75rem` | Large body | existing |
| `text-xl` | `1.25rem` (20px) | `1.75rem` | Page titles (mobile) | existing |
| `text-2xl` | `1.5rem` (24px) | `2rem` | Page titles (desktop) | existing |
| `text-3xl` | `1.875rem` (30px) | `2.25rem` | Hero headings | existing |

### Font Weights

| Class | Value | Usage | Source |
|-------|-------|-------|--------|
| `font-normal` | `400` | Body text | existing |
| `font-medium` | `500` | Buttons, emphasis | existing |
| `font-semibold` | `600` | Card titles, subheadings | existing |
| `font-bold` | `700` | Page headings (rarely used) | existing |

## Spacing

Uses Tailwind v4 default spacing scale (1 unit = 0.25rem = 4px).

| Class | Value | Common Usage | Source |
|-------|-------|-------------|--------|
| `gap-1` / `p-1` | `0.25rem` (4px) | Tight inline gaps | existing |
| `gap-2` / `p-2` | `0.5rem` (8px) | Icon-text gaps, inline spacing | existing |
| `gap-3` / `p-3` | `0.75rem` (12px) | Compact padding | existing |
| `gap-4` / `p-4` | `1rem` (16px) | Default component padding | existing |
| `gap-6` / `p-6` | `1.5rem` (24px) | Card padding, section gaps | existing |
| `gap-8` / `p-8` | `2rem` (32px) | Large section spacing | existing |
| `gap-12` / `p-12` | `3rem` (48px) | Page section spacing | existing |

## Border Radius

| Token | Value | Usage | Source |
|-------|-------|-------|--------|
| `--radius` | `0.625rem` (10px) | Base radius | existing |
| `--radius-sm` | `calc(var(--radius) - 4px)` = 6px | Small elements (badges, buttons sm) | existing |
| `--radius-md` | `calc(var(--radius) - 2px)` = 8px | Buttons, inputs | existing |
| `--radius-lg` | `var(--radius)` = 10px | Cards, modals | existing |
| `--radius-xl` | `calc(var(--radius) + 4px)` = 14px | Large cards | existing |
| `--radius-2xl` | `calc(var(--radius) + 8px)` = 18px | Hero elements | existing |
| `--radius-3xl` | `calc(var(--radius) + 12px)` = 22px | Extra large | existing |
| `--radius-4xl` | `calc(var(--radius) + 16px)` = 26px | Maximum | existing |
| `rounded-full` | `9999px` | Avatars, pills, badges | existing |

## Shadows

| Token | Value | Usage | Source |
|-------|-------|-------|--------|
| `--shadow-sm` | `0 1px 2px 0 oklch(0.14 0.005 285 / 0.05)` | Subtle elevation, buttons | existing |
| `--shadow-md` | `0 4px 6px -1px oklch(…/0.08), 0 2px 4px -2px oklch(…/0.06)` | Cards, dropdowns | existing |
| `--shadow-lg` | `0 10px 15px -3px oklch(…/0.1), 0 4px 6px -4px oklch(…/0.08)` | Modals, popovers | existing |
| `--shadow-xl` | `0 20px 25px -5px oklch(…/0.12), 0 8px 10px -6px oklch(…/0.1)` | Elevated dialogs | existing |
| `--shadow-2xl` | `0 25px 50px -12px oklch(…/0.15)` | Maximum elevation | existing |
| `--shadow-inner` | `inset 0 2px 4px 0 oklch(…/0.06)` | Inset elements | existing |

## Breakpoints (Tailwind v4 defaults)

| Prefix | Value | Usage | Source |
|--------|-------|-------|--------|
| `sm` | `40rem` (640px) | Mobile landscape | existing |
| `md` | `48rem` (768px) | Tablet | existing |
| `lg` | `64rem` (1024px) | Desktop | existing |
| `xl` | `80rem` (1280px) | Large desktop | existing |
| `2xl` | `96rem` (1536px) | Extra large | existing |

## Z-Index Scale (Tailwind defaults + Radix UI)

| Usage | Value | Source |
|-------|-------|--------|
| Sticky headers (PageHeader) | `10` | existing |
| Dropdown menus | `50` (Radix default) | existing |
| Sheet/Drawer | `50` (Radix default) | existing |
| Dialog/Modal overlay | `50` (Radix default) | existing |
| Toast (Sonner) | `100` (Sonner default) | existing |
