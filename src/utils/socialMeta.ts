const THUMBNAIL_PATH = '/og-thumbnail.jpg';

function updateMetaAttr(selector: string, attr: 'content' | 'href', value: string): void {
  const el = document.querySelector(selector);
  if (el) {
    el.setAttribute(attr, value);
  }
}

/**
 * Ensures social share and canonical tags always point to the current origin and full URL.
 */
export function syncSocialMetaTags(): void {
  if (typeof window === 'undefined') return;

  const { origin, href } = window.location;
  const thumbnailUrl = `${origin}${THUMBNAIL_PATH}`;

  updateMetaAttr('meta[property="og:url"]', 'content', href);
  updateMetaAttr('link[rel="canonical"]', 'href', href);

  updateMetaAttr('meta[property="og:image"]', 'content', thumbnailUrl);
  updateMetaAttr('meta[property="og:image:secure_url"]', 'content', thumbnailUrl);
  updateMetaAttr('meta[name="twitter:image"]', 'content', thumbnailUrl);
  updateMetaAttr('meta[itemprop="image"]', 'content', thumbnailUrl);
  updateMetaAttr('meta[name="thumbnail"]', 'content', thumbnailUrl);
  updateMetaAttr('link[rel="image_src"]', 'href', thumbnailUrl);
}

