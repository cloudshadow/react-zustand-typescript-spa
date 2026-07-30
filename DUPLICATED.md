# Duplicated code

This template shares **no** npm package with StartKit-SSR. They are scaffolds,
not a runtime library: each generated project evolves on its own, and a shared
package would trade that independence for cross-repo version coupling.

The cost is that the files below exist in both. When you change one, check the other.

| # | This template | StartKit-SSR | Notes |
|---|---|---|---|
| 1 | `src/api/domains.ts`, `src/utils/env.ts` | `app/api/domains.ts`, `app/utils/env.ts` | Identical |
| 2 | `src/utils/locale.ts` | `app/utils/locale.ts` | **Diverges**: this reads `document.cookie`; SSR parses the `Cookie` header |
| 4 | `src/utils/format.ts` | `app/utils/format.ts` | Identical |
| 5 | `src/styles/theme.ts` | `app/styles/theme.ts` | Identical |
| 6 | `src/api/http.ts` | `app/api/http.ts` | Identical |
| 7 | `src/api/cms.ts` | `app/api/cms.ts` | Identical |
| 8 | `src/types/index.ts` | `app/types/index.ts` | SSR adds `RequestContext` / `HostShellData` |
| 9 | `src/stores/uiStore.ts` | `app/stores/uiStore.ts` | Identical |
| 10 | `src/queries/queryClient.ts` | `app/queries/queryClient.ts` | **Diverges**: SSR needs a per-request client; here a module singleton is fine |
| 11 | `src/pages/panel/styles.ts` | `app/routes/home/styles.ts` | Example styles; each project rewrites these |

## Intentional divergences

- **SSR-safe guards.** Only the SSR template needs them; this one has no such rule.
- **CMS copy.** TanStack Query here; root loader (server-cached) in SSR.
- **Host shell.** SSR only. This template has no `layouts/` folder.
- **Device detection.** Browser UA here; server User-Agent header in SSR.

## Why the drift risk is lower than it looks

Most of the above becomes *project-owned* code as soon as a project is
generated — `cmsKeys.ts`, for instance, differs per page by design; the template
only ships the pattern plus one worked example. What genuinely needs syncing is
the template baseline, and baseline changes go through review anyway.

## Moving code between the templates

Both templates use the same `@/` path alias, so the files above can be copied
across verbatim. Only the two genuinely divergent ones (`utils/locale.ts` and
`queries/queryClient.ts`) need edits.
