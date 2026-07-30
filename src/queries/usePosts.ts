import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/api';
import { queryKeys } from './keys';

/** Example business-data query. Replace with your own. */
export function usePosts() {
  return useQuery({
    queryKey: queryKeys.posts(),
    queryFn: fetchPosts,
  });
}
