# StartKit-SPA — conventions

React Router 8 **Declarative Mode** app for pages that need **no** iHerb
header/footer and **no** SEO: in-app WebView panels, internal tools, pages behind
login that are never crawled.

> A page that needs the iHerb global header/footer, or needs to be crawlable,
> belongs in **StartKit-SSR**, not here.

Declarative Mode means the plain `react-router` package only — there is **no**
`@react-router/dev`, **no** `@react-router/node`, and **no** loaders.

## Where things live

| Path | Responsibility |
|---|---|
| `index.html` | Global reset + `#app` mount point. Earliest place for global CSS |
| `src/main.tsx` | Bootstrap: resolve locale, set `<html lang/dir>`, mount React |
| `src/App.tsx` | `BrowserRouter` + `Routes` + providers |
| `src/pages/` | Page components |
| `src/api/` | Plain `fetch` functions. **No framework imports** — must stay unit-testable |
| `src/queries/` | TanStack Query hooks + `queryKeys` registry |
| `src/stores/` | Zustand slices. Client-only UI state |
| `src/hooks/` | Shared hooks |
| `src/components/` | Shared components |
| `src/styles/` | Linaria design tokens (`theme.ts`) |
| `src/types/` | Shared types |
| `src/utils/` | Pure helpers |
| `src/cmsKeys.ts` | The CMS keys this app fetches |
| `conf/nginx.conf` | Static serving, SPA fallback, `/healthz`, caching |

## Naming rule (please follow — it is what makes a domain greppable)

Layering is **by type**, so one feature is spread across several folders. Use the
**same word stem** in every layer so `grep -ril <stem> src/` finds the whole
feature in one pass:

| Layer | File |
|---|---|
| `src/api/` | `recommendation.ts` |
| `src/queries/` | `useRecommendations.ts` |
| `src/stores/` | `recommendationStore.ts` |
| `src/components/` | `RecommendationCard.tsx` |

Do **not** rename mid-stack (`api/reco.ts` + `queries/useTopProducts.ts` for the
same feature) — it makes the feature undiscoverable without reading everything.

## The three rules

### 1. All data goes through TanStack Query

There are no loaders here — including for CMS copy, which StartKit-SSR loads
server-side instead. Fetching copy after mount is fine for this template: the
native app controls its own loading state and these pages are not crawled.

`useDomains()` uses `staleTime: Infinity` + `placeholderData`, so callers always
get a usable domain table (the static fallback until discovery resolves).
**Never hard-code a service host.**

### 2. No SSR-safe restriction — that is deliberate

Read `window` / `document` / `localStorage` wherever convenient. There is no
server render to keep in agreement. This freedom is one of the reasons the two
templates are separate; do not copy the SSR template's ESLint restriction here.

### 3. Locale and RTL

Locale comes from the `iher-pref1` cookie, resolved **once in `main.tsx` before
the first render**, then shared via `LocaleContext`. `<html lang/dir>` is set at
that point, so there is no flash of the wrong text direction.

RTL lives purely in the style layer — no `isRtl` flag in JS. Prefer CSS logical
properties (`margin-inline-start`, …); fall back to `[dir='rtl'] &`.

The desktop/mobile UA check runs in the browser (`useDevice()`), which is safe
here. Both variants ship in one chunk by default; if one grows large wrap it in
`lazy()`, but **keep the shared style module imported eagerly** (see `src/App.tsx`)
so its Linaria CSS cannot arrive after the component paints.

## Two places that must stay in sync

1. **Deploy sub-path** — `base` in `vite.config.ts` *and* the `location` block in
   `conf/nginx.conf`. Getting one wrong yields a 404 that only shows up in
   deployment.
2. **Path alias `@`** — `tsconfig.json` (`paths`) *and* `vite.config.ts`
   (`resolve.alias`). Vite 7 does not read `paths` from tsconfig.

## Commands

```bash
bun install
bun run dev / build / preview / typecheck / test / lint
```

**Never `bun test`** — that runs Bun's own runner, not Vitest. Use `bun run test`.

## Gotchas

- `@iherb/as-core-ui` is on the internal Harness registry and is **not**
  installed by default. See README for the three-step setup.
- `vitest run` may warn *"something prevents Vite server from exiting"*. Exit
  code is still `0`.
- Build output is fully static (`dist/`). There is no Node runtime — do not add
  server-side code here; if you need it, the page belongs in StartKit-SSR.
