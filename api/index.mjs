import fs from 'node:fs';
import path from 'node:path';
import { applySocialMetaUrls, resolveRequestOrigin } from '../scripts/socialMeta.mjs';

const DIST_HTML_PATH = path.resolve(process.cwd(), 'dist', 'index.html');

export default function handler(req, res) {
  const rawHtml = fs.readFileSync(DIST_HTML_PATH, 'utf8');
  const origin = resolveRequestOrigin(req);
  const pagePath = req.url || '/';
  const html = applySocialMetaUrls(rawHtml, origin, pagePath);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.end(html);
}

