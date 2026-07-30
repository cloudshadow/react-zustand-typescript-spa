# StartKit-SPA

React Router 8 **Declarative Mode** template for pages that need **no** iHerb
header/footer and **no** SEO — in-app WebView panels, internal tools, pages
behind login that are never crawled.

> Need the iHerb global header/footer, or need the page to be crawlable? Use
> **StartKit-SSR** instead.

## Why this is a separate template

The two templates are not one codebase behind a flag. React Router's SPA mode
forbids route loaders and only runs the root loader at build time, so the SSR
template's data-loading architecture cannot be reused by toggling a switch.
Keeping them apart means neither carries compatibility shims — and this template
gets two concrete freedoms:

- **No SSR-safe rules.** Read `window` / `document` / `localStorage` wherever you
  like. There is no server render to keep in agreement.
- **No Node runtime.** The build output is static; nginx serves it.

## Stack

| Layer | Choice |
|---|---|
| Framework | React 19 + react-router 8 (Declarative Mode) |
| Build | Vite 7 |
| Styling | Linaria 8 (zero-runtime, build-time CSS extraction) |
| Server state | TanStack Query 5 |
| Client state | Zustand 5 |
| Tests | Vitest 3 + Testing Library + jsdom |
| Package manager | Bun |
| Serving | nginx (static) |

Note there is **no** `@react-router/dev` and **no** `@react-router/node` —
Declarative Mode is just the `react-router` package.

## Commands

```bash
bun install
bun run dev         # local dev server
bun run build       # typecheck + production build
bun run preview     # serve the build locally
bun run typecheck
bun run test        # Vitest
bun run lint
```

> **Do not run `bun test`.** That invokes Bun's own test runner, not Vitest.
> Always use `bun run test`.

## Directory layout

Organised **by type**. The eight business folders are identical to
StartKit-SSR's, so business code moves between the templates unchanged.

```
index.html                      # global reset + #app mount point
src/
├── main.tsx                    # bootstrap: resolve locale, mount React
├── App.tsx                     # BrowserRouter + Routes + providers
├── cmsKeys.ts                  # the CMS keys this app fetches
├── pages/                      # page components
├── api/                        # plain fetch functions, no framework deps
├── queries/                    # TanStack Query hooks + query keys
├── stores/                     # Zustand slices
├── hooks/                      # shared hooks
├── components/                 # shared components
├── styles/                     # Linaria design tokens
├── types/
└── utils/                      # pure helpers
conf/nginx.conf                 # static serving + SPA fallback + /healthz
```

## Data loading

**Everything goes through TanStack Query** — there are no loaders here. That
includes the CMS copy, which the SSR template loads server-side instead:

```tsx
const t = useCmsKeys();                    // CMS copy (via TanStack Query)
const { data } = useRecommendations();     // business data
```

`useDomains()` uses `staleTime: Infinity` plus `placeholderData`, so callers
always receive a usable domain table — the static fallback until discovery
resolves. Never hard-code a service host.

## Locale and RTL

Locale comes from the `iher-pref1` cookie, resolved **once in `main.tsx` before
the first render**, then shared via context. `<html lang>` / `<html dir>` are set
at that point, so there is no flash of the wrong text direction.

RTL is handled purely in the style layer — there is no `isRtl` flag in JS:

1. **Prefer CSS logical properties**: `margin-inline-start`, `padding-inline-end`,
   `border-inline-start`. Linaria autoprefixes them.
2. **Fall back to `[dir='rtl'] &`** for what logical properties cannot express.

## Desktop / mobile split

The UA check runs in the browser (`useDevice()`), which is safe here — unlike the
SSR template, there is no server verdict to agree with.

Both variants ship in the same chunk by default. If one grows large, wrap it in
its own `lazy()` — but **import the shared style module eagerly** (see
`src/App.tsx`). Linaria emits CSS as a side effect of the module declaring the
styles; keeping that import eager means the CSS is in the main chunk and cannot
arrive after the component paints.

## Deployment

`Dockerfile`: Bun builds, `nginx:alpine` serves `dist/`. `conf/nginx.conf`
provides the SPA fallback, a `/healthz` endpoint, gzip, immutable caching for
hashed assets, and `no-store` for `index.html`.

The deploy sub-path appears in **two** places that must stay in sync:
`base` in `vite.config.ts` and the `location` block in `conf/nginx.conf`.

## Using `@iherb/as-core-ui`

The shared UI library lives on the internal Harness registry and is **not**
installed by default:

1. `cp .npmrc.example .npmrc` and fill in the registry + token.
2. `bun add @iherb/as-core-ui`
3. `import '@iherb/as-core-ui/styles.css'` in `src/main.tsx`.

It uses Linaria too, so there is no second styling system, and it has no
`react-redux` dependency.

## Known quirks

- `vitest run` may print *"something prevents Vite server from exiting"* after a
  successful run. The exit code is still `0`.
- The `@` alias must be declared in **both** `tsconfig.json` and
  `vite.config.ts` — Vite 7 does not read `paths` from tsconfig.
