import fs from 'fs';
import { glob } from 'glob';

async function generateSitemap() {
  const pages = await glob('src/app/**/page.js', {
    ignore: ['src/app/api/**', 'src/app/blog/[slug]/page.js'],
  });
  const posts = await glob('content/blog/*.mdx');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map((page) => {
      const path = page
        .replace('src/app', '')
        .replace('/page.js', '')
        .replace(/\/$/, '');
      return `
    <url>
      <loc>${process.env.NEXT_PUBLIC_SITE_URL}${path}</loc>
    </url>
      `;
    })
    .join('')}
  ${posts
    .map((post) => {
      const path = post.replace('content', '').replace('.mdx', '');
      return `
    <url>
      <loc>${process.env.NEXT_PUBLIC_SITE_URL}${path}</loc>
    </url>
      `;
    })
    .join('')}
</urlset>
  `;

  fs.writeFileSync('public/sitemap.xml', sitemap);
}

generateSitemap();
