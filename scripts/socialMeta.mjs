export const THUMBNAIL_PATH = '/og-thumbnail.jpg';

const IMAGE_TAG_PATTERNS = [
  /<meta\b[^>]*\b(?:property|name|itemprop)=["'](?:og:image|og:image:secure_url|twitter:image|thumbnail|image)["'][^>]*>/gi,
  /<link\b[^>]*\brel=["']image_src["'][^>]*>/gi,
];

const PAGE_URL_TAG_PATTERNS = [
  /<meta\b[^>]*\bproperty=["']og:url["'][^>]*>/gi,
  /<link\b[^>]*\brel=["']canonical["'][^>]*>/gi,
];

function escapeHtmlAttr(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function normalizeOrigin(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return '';
  const trimmed = rawUrl.trim().replace(/\/+$/, '');
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

/**
 * Resolves a public site origin during build time across major hosting platforms.
 */
export function resolveBuildSiteOrigin(env = process.env) {
  const candidates = [
    env.VITE_SITE_URL,
    env.SITE_URL,
    env.VERCEL_PROJECT_PRODUCTION_URL,
    env.URL,
    env.DEPLOY_PRIME_URL,
    env.CF_PAGES_URL,
    env.VERCEL_URL,
  ];
  for (const candidate of candidates) {
    const normalized = normalizeOrigin(candidate);
    if (normalized) return normalized;
  }
  return '';
}

/**
 * Resolves protocol + host from an incoming HTTP request (proxy-aware).
 */
export function resolveRequestOrigin(req) {
  const forwardedHost = req.headers?.['x-forwarded-host'];
  const hostHeader = Array.isArray(forwardedHost)
    ? forwardedHost[0]
    : forwardedHost || req.headers?.host || '';
  const host = String(hostHeader).split(',')[0].trim();
  if (!host) return '';

  const forwardedProto = req.headers?.['x-forwarded-proto'];
  let proto = Array.isArray(forwardedProto)
    ? forwardedProto[0]
    : forwardedProto || '';
  proto = String(proto).split(',')[0].trim().toLowerCase();

  if (!proto) {
    const isLocalHost = /^(localhost|127\.|\[::1\])/i.test(host);
    proto = req.socket?.encrypted || !isLocalHost ? 'https' : 'http';
  }

  return `${proto}://${host}`;
}

/**
 * Determines whether a request targets a renderable SPA route rather than a static asset or API call.
 */
export function isHtmlRouteRequest(req) {
  const method = (req.method || 'GET').toUpperCase();
  if (method !== 'GET' && method !== 'HEAD') return false;

  const rawUrl = req.url || '/';
  const pathname = rawUrl.split('?')[0].split('#')[0];

  if (
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/@') ||
    pathname.startsWith('/src/') ||
    pathname.startsWith('/node_modules/') ||
    pathname.startsWith('/api/') ||
    pathname === '/_redirects' ||
    pathname === '/_headers'
  ) {
    return false;
  }

  const extMatch = pathname.match(/\.([a-z0-9]+)$/i);
  if (extMatch) {
    const ext = extMatch[1].toLowerCase();
    return ext === 'html' || ext === 'htm';
  }

  return true;
}

/**
 * Rewrites Open Graph, Twitter, schema, and canonical attributes in HTML to absolute URLs.
 */
export function applySocialMetaUrls(html, origin, pageUrl = '/') {
  const cleanOrigin = normalizeOrigin(origin);
  if (!cleanOrigin) return html;

  const thumbnailAttr = escapeHtmlAttr(`${cleanOrigin}${THUMBNAIL_PATH}`);
  const normalizedPath = pageUrl.startsWith('/') ? pageUrl : `/${pageUrl}`;
  const pageUrlAttr = escapeHtmlAttr(`${cleanOrigin}${normalizedPath}`);

  let updated = html;

  for (const pattern of IMAGE_TAG_PATTERNS) {
    updated = updated.replace(pattern, (tag) =>
      tag.replace(/\b(content|href)=["'][^"']*["']/i, `$1="${thumbnailAttr}"`)
    );
  }

  for (const pattern of PAGE_URL_TAG_PATTERNS) {
    updated = updated.replace(pattern, (tag) =>
      tag.replace(/\b(content|href)=["'][^"']*["']/i, `$1="${pageUrlAttr}"`)
    );
  }

  return updated;
}

