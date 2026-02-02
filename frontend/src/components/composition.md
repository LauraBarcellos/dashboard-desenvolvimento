# Composition Rules

> Last updated: 2026-02-02
> Status: existing

## Layout System

### App Layout

| Context | Layout | Source |
|---------|--------|--------|
| Auth pages `(auth)/` | Centered single column, no sidebar, auth-page gradient background | existing |
| App pages `(app)/` | Sidebar (collapsible) + scrollable main content area | existing |
| Root layout | ThemeProvider wrapping all content, Geist font variables | existing |

### Grid

| Property | Value | Source |
|----------|-------|--------|
| Type | Flexbox + CSS Grid (responsive) | existing |
| Max width | None (full width within sidebar layout) | existing |
| Container padding | `px-4 sm:px-6` (16px mobile, 24px desktop) | existing |
| Gap between sections | `gap-4` to `gap-8` (16-32px) | existing |

### Page Layout Pattern

```
┌──────────────────────────────────────────────┐
│ Sidebar │ PageHeader (sticky, z-10)          │
│         │   Breadcrumbs                       │
│         │   ─────────────────                 │
│         │   Title          [Actions]          │
│         ├─────────────────────────────────────┤
│         │ Page Content                        │
│         │   Stats Cards (grid)                │
│         │   Filters                           │
│         │   Table / List                      │
│         │   Pagination                        │
└─────────┴─────────────────────────────────────┘
```

### Responsive Strategy

| Breakpoint | Behavior | Source |
|-----------|----------|--------|
| Mobile (`< sm`) | Sidebar hidden (sheet overlay), single column, stacked actions | existing |
| Tablet (`sm` - `lg`) | Sidebar collapsed (icons only), 1-2 column content | existing |
| Desktop (`> lg`) | Sidebar expanded, full layout, multi-column grids | existing |

## Component Composition

### Allowed Combinations

| Parent | Accepted Children | Notes |
|--------|------------------|-------|
| Card | CardHeader, CardContent, CardFooter | CardHeader always first, CardContent for body |
| CardHeader | CardTitle, CardDescription, CardAction | CardAction auto-positioned top-right |
| Form | FormField (repeated) | Each FormField wraps FormItem > FormLabel > FormControl > FormMessage |
| Dialog | DialogHeader, DialogContent, DialogFooter | DialogHeader required with DialogTitle |
| Sheet | SheetHeader, SheetContent, SheetFooter | Same pattern as Dialog |
| Tabs | TabsList + TabsContent (repeated) | TabsList contains TabsTrigger items |
| PageHeader | title + description + breadcrumbs + actions | All optional except title |
| Sidebar | SidebarHeader, SidebarContent, SidebarFooter | SidebarContent contains SidebarGroup > SidebarMenu |

### Spacing Between Components

| Context | Spacing | Value |
|---------|---------|-------|
| Within card content | `gap-2` to `gap-4` | 8-16px |
| Between form fields | `gap-4` to `gap-6` | 16-24px |
| Card padding (header) | `px-6 pt-6` | 24px |
| Card padding (content) | `px-6 pb-6` | 24px |
| Between stats cards | `gap-4` (grid) | 16px |
| Between page sections | `gap-6` to `gap-8` | 24-32px |
| Inline elements (icon + text) | `gap-2` | 8px |
| Button internal gap | `gap-2` | 8px |

### Stats Cards Grid

```tsx
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
  <Card>...</Card>
</div>
```

### Nesting Rules

- Cards should NOT contain cards
- Dialogs should NOT open dialogs (use multi-step within one dialog)
- Sheets should NOT open sheets
- Dropdowns should NOT contain dropdowns
- Max component nesting: 3 levels (Page > Card > Form/List)

## Content Hierarchy

### Visual Weight Order

1. Page title (H1, `text-xl sm:text-2xl font-semibold`)
2. Primary action (Button default variant — primary bg)
3. Stats cards (equal weight, grid layout)
4. Section content (tables, lists, forms)
5. Secondary actions (Button outline/ghost variants)
6. Metadata and captions (`text-sm text-muted-foreground`)

### Action Placement

| Context | Primary Action | Secondary Action |
|---------|---------------|-----------------|
| PageHeader | Top right (`actions` prop) | Left of primary |
| Card footer | Right-aligned | Left of primary |
| Dialog footer | Right-aligned | Left of primary (cancel) |
| Form | Bottom, right-aligned or full-width | Left of submit |
| Table row | Right column (actions dropdown) | — |
| Empty state | Centered CTA button | — |

## Iconography

| Property | Convention | Source |
|----------|-----------|--------|
| Library | Lucide React | existing |
| Default size | `size-4` (16px) via `[&_svg:not([class*='size-'])]:size-4` | existing |
| Stroke width | 2 (Lucide default) | existing |
| Color | `currentColor` (inherits text color) | existing |

### Icon Usage Rules

- Always pair icon-only buttons with `aria-label`
- Icons accompany text in buttons (`gap-2` automatic)
- Badge icons: `[&>svg]:size-3` (12px)
- Consistent outline style (Lucide default)

## Animation & Transitions

| Element | Property | Duration | Easing | Source |
|---------|----------|----------|--------|--------|
| Button hover | background-color | `transition-all` | default | existing |
| Color transitions | color, background | `transition-colors` | default | existing |
| Dialog enter/exit | opacity, scale | Radix defaults | ease | existing |
| Sheet enter/exit | transform (slide) | Radix defaults | ease | existing |
| Page transitions | opacity, transform | Framer Motion | spring | existing |
| Reduced motion | All disabled | `0.01ms` | — | existing |

### Motion Guidelines

- Use `transition-colors` for hover states
- Use `transition-all` for multi-property changes
- Framer Motion for entrance animations and page transitions
- Respect `prefers-reduced-motion` (global CSS rule already in place)
- Keep animations under 300ms for UI feedback
- Use spring physics for natural feel in Framer Motion animations
