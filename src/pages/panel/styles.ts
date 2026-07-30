import { styled } from '@linaria/react';
import { theme } from '@/styles';

/**
 * Linaria example covering the patterns this template relies on:
 * - CSS logical properties for RTL (D18 path a)
 * - `[dir='rtl'] &` overrides for what logical properties cannot express (path b)
 * - descendant selectors, needed to restyle CMS-injected markup (D3')
 */
export const Section = styled.section`
  margin-inline: auto;
  margin-block: ${theme.space(6)};
  padding-inline: ${theme.space(4)};
  max-width: 1400px;
  color: ${theme.color.text};

  /* RTL fallback for things logical properties do not cover. */
  [dir='rtl'] & .badge {
    transform: scaleX(-1);
  }

  /* Restyle markup injected by CMS content. */
  .cms-injected .banner img {
    margin-inline-end: ${theme.space(11)};
  }

  @media ${theme.breakpoint.mobile} {
    margin-block: ${theme.space(3)};
    padding-inline: ${theme.space(3)};
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-block-end: ${theme.space(3)};

  @media ${theme.breakpoint.mobile} {
    font-size: 18px;
  }
`;

export const List = styled.ul`
  display: grid;
  gap: ${theme.space(2)};
  list-style: none;
`;

export const Item = styled.li`
  border: 1px solid ${theme.color.border};
  border-radius: ${theme.radius.md};
  padding: ${theme.space(3)};
  background: ${theme.color.surface};
`;
