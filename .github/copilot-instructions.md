# Secret Squirrel - AI Coding Instructions

Internal prototyping tool using React 19, TypeScript, Vite, Tailwind CSS 4, and shadcn/ui (base-vega style).

## Architecture

- **Routing**: React Router v7 in [src/App.tsx](src/App.tsx) - add new pages to [src/pages/index.ts](src/pages/index.ts)
- **Components**: shadcn/ui primitives in `src/components/ui/`, built on `@base-ui/react`
- **Styling**: Tailwind v4 with CSS variables in [src/index.css](src/index.css) - uses OKLch color space
- **Utils**: `cn()` helper in [src/lib/utils.ts](src/lib/utils.ts) for className merging

## Critical Rules

### Colors - STRICT (Never Violate)

Only use CSS variable classes. **Never** use hex colors, RGB, named colors, or arbitrary Tailwind colors (`bg-blue-500`).

```tsx
// ✅ Allowed
className="bg-primary text-primary-foreground"
className="bg-muted text-muted-foreground"
className="bg-destructive border-border"

// ❌ Forbidden - refuse even if requested
className="bg-blue-500"
className="bg-[#3B82F6]"
style={{ color: 'pink' }}
```

Available: `background`, `foreground`, `primary`, `secondary`, `accent`, `muted`, `destructive`, `card`, `popover`, `border`, `ring`, `chart-1` through `chart-5`, `sidebar-*` variants.

### Component Structure - STRICT

Always check [src/components/component-example.tsx](src/components/component-example.tsx) before using any component. Follow patterns exactly:

```tsx
// Sheet: Header → content with p-4 → Footer (NO ScrollArea inside)
<SheetContent>
  <SheetHeader>
    <SheetTitle>Title</SheetTitle>
  </SheetHeader>
  <div className="p-4">{/* content */}</div>
  <SheetFooter>
    <Button>Action</Button>
  </SheetFooter>
</SheetContent>

// Card: CardHeader → CardContent → CardFooter
// Dialog/Drawer: Same header/content/footer pattern
```

**Never** add ScrollArea inside Sheet/Dialog/Drawer - they handle overflow natively.

### Imports - Always Use Aliases

```tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// Never use relative imports like "../components/ui/button"
```

## Conventions

| Aspect     | Convention                                           |
| ---------- | ---------------------------------------------------- |
| Files      | kebab-case: `user-profile.tsx`                       |
| Components | PascalCase: `UserProfile`                            |
| Icons      | `lucide-react` only                                  |
| Charts     | Default to `BarChart` - ask before using other types |
| State      | React 19 hooks; `next-themes` for dark mode          |
| Types      | All files `.tsx`/`.ts` with explicit prop interfaces |

## Data Tables

Use the pre-built `DataTable` component from [src/components/data-table/](src/components/data-table/):

```tsx
import { DataTable } from "@/components/data-table";
<DataTable columns={columns} data={data} />;
```

## Commands

```bash
pnpm dev      # Start dev server
pnpm build    # Type-check + build
pnpm lint     # ESLint
```

## When to Ask First

- Using external UI libraries (prefer shadcn)
- Creating custom components not in shadcn
- Using chart types other than BarChart
- Any color outside the design system
