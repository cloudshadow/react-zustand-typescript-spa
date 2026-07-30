/**
 * The CMS keys this app needs.
 *
 * Keep this list tight: every key here is fetched on the server and serialised
 * into the SSR HTML, so it adds to page weight. Read values via `useCmsKeys()`.
 */
export const CMS_KEYS = [
  'IDS_LBL_AUTOSHIP',
  'IDS_META_AUTOSHIP',
  'IDS_TXT_RECOMMENDED_FOR_YOU',
] as const;

export type CmsKey = (typeof CMS_KEYS)[number];
