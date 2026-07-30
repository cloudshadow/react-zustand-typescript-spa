# Duplicated code

This template shares **no** npm package with StartKit-SSR. They are scaffolds,
not a runtime library: each generated project evolves on its own, and a shared
package would trade that independence for cross-repo version coupling.

The cost is that the files below exist in both. When you change one, check the other.

| # | This template | StartKit-SSR | Notes |
|---|---|---|---|
| 1 | `src/utils/env.ts` | `app/utils/env.ts` | Identical |
| 2 | `src/utils/locale.ts` | `app/utils/locale.ts` | **Diverges**: SPA reads `navigator.language`; SSR reads the `Accept-Language` header |
| 3 | `src/utils/format.ts` | `app/utils/format.ts` | Identical |
| 4 | `src/styles/theme.ts` | `app/styles/theme.ts` | Identical |
| 5 | `src/types/index.ts` | `app/types/index.ts` | SSR adds `RequestContext` |
| 6 | `src/queries/queryClient.ts` | `app/queries/queryClient.ts` | **Diverges**: SSR needs a per-request client; here a module singleton is fine |
| 7 | `src/pages/home/styles.ts` | `app/routes/home/styles.ts` | Example styles; each project rewrites these |

## Intentional divergences

- **SSR-safe guards.** Only the SSR template needs them; this one has no such rule.
- **Locale source.** SPA uses `navigator.language`; SSR uses the `Accept-Language` request header.
- **Device detection.** Browser UA here; server User-Agent header in SSR.

## Moving code between the templates

Both templates use the same `@/` path alias, so the files above can be copied
across verbatim. Only the genuinely divergent ones (`utils/locale.ts` and
`queries/queryClient.ts`) need edits after copying.
