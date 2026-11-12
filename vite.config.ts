import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import {
  applySocialMetaUrls,
  isHtmlRouteRequest,
  resolveBuildSiteOrigin,
  resolveRequestOrigin,
} from './scripts/socialMeta.mjs';

function socialThumbnailMetaPlugin(): Plugin {
  const buildOrigin = resolveBuildSiteOrigin();

  return {
    name: 'social-thumbnail-meta',

    transformIndexHtml(html) {
      return buildOrigin ? applySocialMetaUrls(html, buildOrigin, '/') : html;
    },

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!isHtmlRouteRequest(req)) {
          next();
          return;
        }
        try {
          const url = req.url || '/';
          const sourceHtml = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf8');
          const transformed = await server.transformIndexHtml(url, sourceHtml);
          const origin = resolveRequestOrigin(req);
          const html = applySocialMetaUrls(transformed, origin, url);

          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(html);
        } catch (err) {
          next(err);
        }
      });
    },

    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!isHtmlRouteRequest(req)) {
          next();
          return;
        }
        try {
          const distHtmlPath = path.resolve(process.cwd(), 'dist', 'index.html');
          if (!fs.existsSync(distHtmlPath)) {
            next();
            return;
          }
          const url = req.url || '/';
          const rawHtml = fs.readFileSync(distHtmlPath, 'utf8');
          const origin = resolveRequestOrigin(req);
          const html = applySocialMetaUrls(rawHtml, origin, url);

          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(html);
        } catch (err) {
          next(err);
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), socialThumbnailMetaPlugin()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
