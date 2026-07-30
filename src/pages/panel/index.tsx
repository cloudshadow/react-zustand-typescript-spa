import { useDevice } from '@/hooks';
import { PanelDesktop } from './desktop';
import { PanelMobile } from './mobile';

/**
 * Desktop / mobile split.
 *
 * Unlike the SSR template, the UA check happens here in the browser -- there is
 * no server verdict to agree with, so no hydration risk. Both variants ship in
 * this chunk; if one grows large, wrap it in its own `lazy()`.
 */
export default function Panel() {
  const { isMobile } = useDevice();
  return isMobile ? <PanelMobile /> : <PanelDesktop />;
}
