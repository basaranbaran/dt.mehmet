import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dtmehmetyagci.com',
  base: '/',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/taslak') && !page.includes('/admin') && !page.includes('sitemap.xml') && !page.includes('llms.txt'),
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
    }),
  ],
  output: 'static',
});
