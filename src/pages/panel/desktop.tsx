import { useCmsKeys } from '@/hooks';
import { useRecommendations } from '@/queries';
import { Item, List, Section, Title } from './styles';

export function PanelDesktop() {
  const t = useCmsKeys();
  const { data, isPending, isError } = useRecommendations();

  return (
    <Section data-variant="desktop">
      <Title>{t('IDS_TXT_RECOMMENDED_FOR_YOU', 'Recommended for you')}</Title>
      {isPending ? <p>Loading…</p> : null}
      {isError ? <p>Could not load recommendations.</p> : null}
      <List>
        {data?.map((product) => (
          <Item key={product.id}>
            <strong>{product.brandName}</strong> — {product.name}
          </Item>
        ))}
      </List>
    </Section>
  );
}
