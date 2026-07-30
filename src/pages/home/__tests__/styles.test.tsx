import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Item, Section, Title } from '../styles';

/** Guards the Linaria + Vitest integration. */
describe('Linaria styled components under Vitest', () => {
  it('renders with a generated class name', () => {
    const { container } = render(
      <Section>
        <Title>hello</Title>
        <Item>item</Item>
      </Section>,
    );
    const section = container.firstChild as HTMLElement;
    expect(section.tagName).toBe('SECTION');
    expect(section.className).toBeTruthy();
  });
});
