import { usePosts } from '@/queries';
import { Item, List, Section, Title } from './styles';

export function HomeDesktop() {
  const { data, isPending, isError } = usePosts();

  return (
    <Section data-variant="desktop">
      <Title>Latest Posts</Title>
      {isPending ? <p>Loading…</p> : null}
      {isError ? <p>Could not load posts.</p> : null}
      <List>
        {data?.map((post) => (
          <Item key={post.id}>
            <strong>#{post.id}</strong> — {post.title}
          </Item>
        ))}
      </List>
    </Section>
  );
}
