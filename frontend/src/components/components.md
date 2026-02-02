# Component Catalog

> Last updated: 2026-02-02
> Total components: 32 existing + 4 shared

## Component Index

| Component | Category | Status | Variants | File Path |
|-----------|----------|--------|----------|-----------|
| Button | primitive | existing | default, destructive, outline, secondary, ghost, link × default, sm, lg, icon, icon-sm, icon-lg | `src/components/ui/button.tsx` |
| Badge | primitive | existing | default, secondary, destructive, outline | `src/components/ui/badge.tsx` |
| Card | composite | existing | Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter | `src/components/ui/card.tsx` |
| Input | primitive | existing | — | `src/components/ui/input.tsx` |
| Textarea | primitive | existing | — | `src/components/ui/textarea.tsx` |
| Label | primitive | existing | — | `src/components/ui/label.tsx` |
| Select | primitive | existing | — | `src/components/ui/select.tsx` |
| Switch | primitive | existing | — | `src/components/ui/switch.tsx` |
| Form | composite | existing | FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage | `src/components/ui/form.tsx` |
| Dialog | composite | existing | Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription | `src/components/ui/dialog.tsx` |
| Sheet | composite | existing | Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription | `src/components/ui/sheet.tsx` |
| DropdownMenu | composite | existing | DropdownMenu, Trigger, Content, Item, Separator, etc. | `src/components/ui/dropdown-menu.tsx` |
| Tabs | composite | existing | Tabs, TabsList, TabsTrigger, TabsContent | `src/components/ui/tabs.tsx` |
| Table | data-display | existing | Table, TableHeader, TableBody, TableRow, TableHead, TableCell | `src/components/ui/table.tsx` |
| Avatar | primitive | existing | Avatar, AvatarImage, AvatarFallback | `src/components/ui/avatar.tsx` |
| Tooltip | feedback | existing | Tooltip, TooltipTrigger, TooltipContent | `src/components/ui/tooltip.tsx` |
| Skeleton | feedback | existing | — | `src/components/ui/skeleton.tsx` |
| Separator | primitive | existing | — | `src/components/ui/separator.tsx` |
| Pagination | navigation | existing | — | `src/components/ui/pagination.tsx` |
| Sidebar | navigation | existing | SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarMenu, etc. | `src/components/ui/sidebar.tsx` |
| Collapsible | composite | existing | Collapsible, CollapsibleTrigger, CollapsibleContent | `src/components/ui/collapsible.tsx` |
| Sonner (Toast) | feedback | existing | — | `src/components/ui/sonner.tsx` |
| Timeline | data-display | existing | — | `src/components/ui/timeline.tsx` |
| EmptyState | feedback | existing | — | `src/components/ui/empty-state.tsx` |
| ErrorState | feedback | existing | — | `src/components/ui/error-state.tsx` |
| LoadingState | feedback | existing | — | `src/components/ui/loading-state.tsx` |
| InView | utility | existing | — | `src/components/ui/in-view.tsx` |
| StatCard | data-display | existing | — | `src/components/ui/stat-card.tsx` |
| Breadcrumb | navigation | existing | Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator | `src/components/ui/breadcrumb.tsx` |
| Chart | data-display | existing | ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent | `src/components/ui/chart.tsx` |
| Calendar | primitive | existing | Calendar (DayPicker wrapper, supports single/range/multiple modes) | `src/components/ui/calendar.tsx` |
| Popover | composite | existing | Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverHeader, PopoverTitle, PopoverDescription | `src/components/ui/popover.tsx` |

## Shared App Components

| Component | Category | File Path |
|-----------|----------|-----------|
| AppSidebar | navigation | `src/components/app-sidebar.tsx` |
| PageHeader | layout | `src/components/page-header.tsx` |
| ThemeProvider | utility | `src/components/theme-provider.tsx` |
| ModeToggle | utility | `src/components/mode-toggle.tsx` |

## Key Component Details

### Button

**Status:** existing
**Category:** primitive
**File:** `src/components/ui/button.tsx`
**Pattern:** CVA (class-variance-authority) + Radix Slot

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"default"` | Visual style |
| size | `"default" \| "sm" \| "lg" \| "icon" \| "icon-sm" \| "icon-lg"` | `"default"` | Button size |
| asChild | `boolean` | `false` | Render as child element (Slot) |

**Sizes:**
| Size | Height | Padding |
|------|--------|---------|
| default | `h-9` (36px) | `px-4 py-2` |
| sm | `h-8` (32px) | `px-3` |
| lg | `h-10` (40px) | `px-6` |
| icon | `size-9` (36px) | — |
| icon-sm | `size-8` (32px) | — |
| icon-lg | `size-10` (40px) | — |

**Accessibility:**
- Focus ring: `ring-ring/50` with `ring-[3px]`
- Disabled: `pointer-events-none opacity-50`
- Icon-only buttons: must include `aria-label`

---

### Card

**Status:** existing
**Category:** composite
**File:** `src/components/ui/card.tsx`

**Sub-components:** Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter

**Usage:** Cards use `rounded-xl border shadow-sm` with `bg-card text-card-foreground`. Padding is `px-6 pt-6` on header, `px-6 pb-6` on content.

---

### Badge

**Status:** existing
**Category:** primitive
**File:** `src/components/ui/badge.tsx`

**Variants:** default (primary bg), secondary, destructive, outline
**Shape:** `rounded-full` (pill)
**Size:** `px-2 py-0.5 text-xs`

---

### PageHeader

**Status:** existing
**Category:** layout
**File:** `src/components/page-header.tsx`

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | `string \| ReactNode` | — | Page title (H1) |
| description | `string \| ReactNode` | — | Subtitle |
| breadcrumbs | `BreadcrumbItem[]` | — | Navigation breadcrumbs |
| actions | `ReactNode` | — | Action buttons (top right) |
| showBackButton | `boolean` | `false` | Show back arrow |
| cliente | `Cliente` | — | Optional avatar display |

**Behavior:** Sticky at top (`sticky top-0 z-10`), full-width with `bg-card border-b`.

## Feature Component Patterns

Each feature follows consistent component naming:

| Pattern | Naming | Purpose |
|---------|--------|---------|
| Form | `*-form.tsx` | React Hook Form + Zod + Shadcn Form |
| Table/List | `*-table.tsx` / `*-list.tsx` | Data presentation |
| Item | `*-item.tsx` | Individual list/timeline items |
| Stats | `*-stats.tsx` | Summary statistics cards |
| Skeleton | `*-skeleton.tsx` | Loading placeholders |
| Empty State | `*-empty-state.tsx` | No-data states |
| Error State | `*-error-state.tsx` | Error displays |
| Filters | `*-filters.tsx` | Search/filter controls |

### Feature Components by Domain

**auth** (6 components): login-form, password-field, password-recovery-request-form, password-reset-form, password-reset-invalid-token, password-reset-success

**clientes** (13 components): cliente-avatar, cliente-details, cliente-documentos, cliente-empty-state, cliente-form, cliente-form-backup, cliente-observacoes, cliente-projeto-editable, cliente-projetos, cliente-skeleton, clientes-filters, clientes-stats, clientes-table

**timeline** (7 components): timeline-empty-state, timeline-event-form, timeline-event-item, timeline-event-list, timeline-filters, timeline-skeleton, timeline-stats

**tarefas** (4 components): tarefa-item, tarefa-list, tarefa-skeleton, tarefas-stats

**solicitacoes** (4 components): solicitacao-item, solicitacao-list, solicitacao-skeleton, solicitacoes-stats

**metricas** (4 components): metricas-kpi-cards, metricas-filters, metricas-bar-chart, metricas-footer
