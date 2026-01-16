// Configuration constants
export const NEWS_CONFIG = {
  ITEMS_PER_PAGE: 8,
  CACHE_TTL_MS: 5 * 60 * 1000, // 5 minutes
  REVALIDATE_SECONDS: 120,
  API_CACHE_SECONDS: 60,
  API_STALE_WHILE_REVALIDATE: 120,
} as const;

export const INTERSECTION_CONFIG = {
  PREFETCH_ROOT_MARGIN: "400px",
  LOAD_MORE_ROOT_MARGIN: "200px",
  SKELETON_COUNT: 4,
} as const;

export const IMAGE_CONFIG = {
  QUALITY: 75,
  SIZES: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
} as const;

export const CARD_SIZES = {
  large: {
    containerClass: "w-full lg:col-span-2",
    imageHeight: "h-[199px] lg:h-[404px]",
    showSummary: false,
  },
  medium: {
    containerClass: "w-full",
    imageHeight: "h-[199px]",
    showSummary: false,
  },
  small: {
    containerClass: "w-full",
    imageHeight: "h-[199px]",
    showSummary: false,
  },
} as const;

export type CardSize = keyof typeof CARD_SIZES;
