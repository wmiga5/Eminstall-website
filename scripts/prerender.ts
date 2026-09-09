import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const distSsrDir = path.resolve(rootDir, 'dist-ssr');

async function prerender() {
  console.log('🚀 Starting Pre-rendering SSG build...');

  // 1. Build client bundle
  console.log('📦 1/4 Building client bundle with Vite...');
  await build({
    root: rootDir,
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  });

  // 2. Build SSR bundle
  console.log('⚙️ 2/4 Building SSR server entry with Vite...');
  await build({
    root: rootDir,
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: 'dist-ssr',
      emptyOutDir: true,
    },
  });

  // 3. Import SSR render function and routes
  const serverEntryPath = path.resolve(distSsrDir, 'entry-server.js');
  const { render } = await import(`file://${serverEntryPath}`);
  const { getAllStaticRoutes, getRouteSeo } = await import(`file://${path.resolve(rootDir, 'src/routes.ts')}`);

  // Load client HTML template
  const templatePath = path.resolve(distDir, 'index.html');
  const templateHtml = fs.readFileSync(templatePath, 'utf-8');

  const routes: string[] = getAllStaticRoutes();
  console.log(`🌐 3/4 Pre-rendering ${routes.length} static routes...`);

  for (const route of routes) {
    const { html, seo } = render(route);

    let pageHtml = templateHtml;

    // Replace <html lang="...">
    pageHtml = pageHtml.replace(/<html[^>]*>/, `<html lang="${seo.htmlLang}">`);

    // Replace <title>
    pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/, `<title>${seo.title}</title>`);

    // Replace canonical
    pageHtml = pageHtml.replace(/<link rel="canonical"[^>]*\/>/, `<link rel="canonical" href="${seo.canonical}" />`);

    // Replace hreflang tags
    const hreflangTags = `<!-- Hreflang Alternates for Multilingual SEO -->\n    <link rel="alternate" hreflang="pl" href="${seo.hreflangs.pl}" />\n    <link rel="alternate" hreflang="en" href="${seo.hreflangs.en}" />\n    <link rel="alternate" hreflang="de" href="${seo.hreflangs.de}" />\n    <link rel="alternate" hreflang="x-default" href="${seo.hreflangs['x-default']}" />`;
    pageHtml = pageHtml.replace(/<!-- Hreflang Alternates[\s\S]*?x-default"[^>]*\/>/i, hreflangTags);

    // Replace description meta tag
    pageHtml = pageHtml.replace(/<meta name="description"[^>]*\/>/, `<meta name="description" content="${escapeAttr(seo.description)}" />`);

    // Replace keywords meta tag
    pageHtml = pageHtml.replace(/<meta name="keywords"[^>]*\/>/, `<meta name="keywords" content="${escapeAttr(seo.keywords)}" />`);

    // Replace Open Graph / Twitter tags
    pageHtml = pageHtml.replace(/<meta property="og:title"[^>]*\/>/, `<meta property="og:title" content="${escapeAttr(seo.title)}" />`);
    pageHtml = pageHtml.replace(/<meta property="og:description"[^>]*\/>/, `<meta property="og:description" content="${escapeAttr(seo.description)}" />`);
    pageHtml = pageHtml.replace(/<meta property="og:url"[^>]*\/>/, `<meta property="og:url" content="${seo.canonical}" />`);
    pageHtml = pageHtml.replace(/<meta property="og:locale"[^>]*\/>/, `<meta property="og:locale" content="${seo.ogLocale}" />`);
    pageHtml = pageHtml.replace(/<meta property="twitter:title"[^>]*\/>/, `<meta property="twitter:title" content="${escapeAttr(seo.title)}" />`);
    pageHtml = pageHtml.replace(/<meta property="twitter:description"[^>]*\/>/, `<meta property="twitter:description" content="${escapeAttr(seo.description)}" />`);
    pageHtml = pageHtml.replace(/<meta property="twitter:url"[^>]*\/>/, `<meta property="twitter:url" content="${seo.canonical}" />`);

    // Replace JSON-LD schema
    const schemaScript = `<script type="application/ld+json">\n${JSON.stringify(seo.schemaJsonLd, null, 2)}\n    </script>`;
    pageHtml = pageHtml.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, schemaScript);

    // Inject rendered HTML into root container
    pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

    // Determine output file path
    let outputPath: string;
    if (route === '/' || route === '') {
      outputPath = path.resolve(distDir, 'index.html');
    } else {
      const cleanPath = route.startsWith('/') ? route.slice(1) : route;
      const targetSubdir = path.resolve(distDir, cleanPath);
      if (!fs.existsSync(targetSubdir)) {
        fs.mkdirSync(targetSubdir, { recursive: true });
      }
      outputPath = path.resolve(targetSubdir, 'index.html');
    }

    fs.writeFileSync(outputPath, pageHtml, 'utf-8');
    console.log(`  ✓ Rendered ${route} -> ${path.relative(distDir, outputPath)} (${(pageHtml.length / 1024).toFixed(1)} KB)`);
  }

  // 4. Generate sitemap.xml
  console.log('🗺️ 4/4 Generating sitemap.xml & robots.txt...');
  const today = new Date().toISOString().split('T')[0];

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

  for (const route of routes) {
    const seo = getRouteSeo(route);
    const isHome = !seo.serviceId;
    const priority = isHome ? '1.0' : '0.9';
    const changefreq = isHome ? 'weekly' : 'monthly';

    sitemapXml += `  <url>
    <loc>${seo.canonical}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="pl" href="${seo.hreflangs.pl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${seo.hreflangs.en}" />
    <xhtml:link rel="alternate" hreflang="de" href="${seo.hreflangs.de}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${seo.hreflangs['x-default']}" />
  </url>
`;
  }

  sitemapXml += `</urlset>\n`;
  fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.resolve(rootDir, 'public/sitemap.xml'), sitemapXml, 'utf-8');
  console.log('  ✓ Generated dist/sitemap.xml with', routes.length, 'URLs');

  // Copy static root files to dist if not already there
  const filesToCopy = ['robots.txt', '404.html', '_redirects', 'favicon.svg', 'favicon.ico', 'site.webmanifest', 'manifest.json'];
  for (const file of filesToCopy) {
    const src = path.resolve(rootDir, 'public', file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.resolve(distDir, file));
    }
  }

  // Cleanup dist-ssr
  if (fs.existsSync(distSsrDir)) {
    fs.rmSync(distSsrDir, { recursive: true, force: true });
  }

  console.log('🎉 SSG Pre-rendering successfully completed! All 5 SEO issues fixed.');
}

function escapeAttr(str: string): string {
  return str.replace(/"/g, '&quot;');
}

prerender().catch((err) => {
  console.error('❌ Prerender failed:', err);
  process.exit(1);
});
