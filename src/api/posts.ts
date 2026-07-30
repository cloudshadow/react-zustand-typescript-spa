export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

/** Example fetch function — replace with your own API call. */
export async function fetchPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error(`${res.status}: ${res.url}`);
  return res.json() as Promise<Post[]>;
}
