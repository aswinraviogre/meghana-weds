import type { IncomingMessage } from 'node:http';

export const THUMBNAIL_PATH: string;

export function resolveBuildSiteOrigin(env?: Record<string, string | undefined>): string;

export function resolveRequestOrigin(req: IncomingMessage): string;

export function isHtmlRouteRequest(req: IncomingMessage): boolean;

export function applySocialMetaUrls(html: string, origin: string, pageUrl?: string): string;
