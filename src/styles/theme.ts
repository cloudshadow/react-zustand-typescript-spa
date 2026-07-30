/**
 * Design tokens shared by Linaria components.
 *
 * Plain constants rather than CSS variables so they are inlined at build time
 * and stay tree-shakeable.
 */
export const theme = {
  color: {
    text: 'rgb(25, 25, 25)',
    textMuted: 'rgb(110, 110, 110)',
    border: 'rgb(224, 224, 224)',
    surface: '#ffffff',
    surfaceAlt: '#f6f6f6',
    accent: '#00875a',
  },
  space: (n: number) => `${n * 4}px`,
  radius: { sm: '4px', md: '8px', lg: '16px' },
  breakpoint: { mobile: '(max-width: 767px)', desktop: '(min-width: 768px)' },
} as const;
