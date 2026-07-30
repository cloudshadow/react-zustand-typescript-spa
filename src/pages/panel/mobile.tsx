import { useCmsKeys } from '@/hooks';
import { useRecommendations } from '@/queries';
import { Item, List, Section, Title } from './styles';

export function PanelMobile() {
  const t = useCmsKeys();
  const { data, isPending } = useRecommendations();

  return (
    <Section data-variant="mobile">
      <Title>{t('IDS_TXT_RECOMMENDED_FOR_YOU', 'Recommended for you')}</Title>
      {isPending ? <p>Loading…</p> : null}
      <List>
        {data?.slice(0, 4).map((product) => (
          <Item key={product.id}>{product.name}</Item>
        ))}
      </List>
    </Section>
  );
}
