import { usePosts } from '@/queries';
import { Item, List, Section, Title } from './styles';

export function HomeMobile() {
  const { data, isPending } = usePosts();

  return (
    <Section data-variant="mobile">
      <Title>Latest Posts</Title>
      {isPending ? <p>Loading…</p> : null}
      <List>
        {data?.slice(0, 4).map((post) => (
          <Item key={post.id}>{post.title}</Item>
        ))}
      </List>
    </Section>
  );
}
