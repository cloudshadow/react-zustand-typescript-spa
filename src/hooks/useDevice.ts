import { useState } from 'react';
import { isMobileDevice } from '@/utils';

/**
 * Device flags resolved once from the UA.
 *
 * This template has no server render, so there is no hydration mismatch risk.
 * The SSR template must instead take isMobile from its root loader.
 */
export function useDevice() {
  const [isMobile] = useState(isMobileDevice);
  return { isMobile };
}
