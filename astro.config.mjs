import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://basaranbaran.github.io',
  base: '/dt.mehmet',
  integrations: [tailwind()],
  output: 'static',
});
