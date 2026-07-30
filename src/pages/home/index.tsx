import { useDevice } from '@/hooks';
import { HomeDesktop } from './desktop';
import { HomeMobile } from './mobile';

/**
 * Desktop / mobile split.
 *
 * Unlike the SSR template, the UA check happens here in the browser — there is
 * no server verdict to agree with, so no hydration risk.
 */
export default function Home() {
  const { isMobile } = useDevice();
  return isMobile ? <HomeMobile /> : <HomeDesktop />;
}
