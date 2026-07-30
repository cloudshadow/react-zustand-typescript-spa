import { useState } from 'react';
import { isMobileDevice, isNative } from '@/utils';

/**
 * Device flags.
 *
 * Lazy initialisers so the UA is parsed once. No hydration concern here -- this
 * template has no server render, which is exactly why the SSR template must
 * instead take `isMobile` from its root loader.
 */
export function useDevice() {
  const [mobile] = useState(isMobileDevice);
  const [native] = useState(isNative);
  return { isMobile: mobile, isNative: native };
}
