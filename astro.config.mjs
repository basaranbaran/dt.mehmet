import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://dtmehmetyagci.com',
  base: '/',
  integrations: [tailwind()],
  output: 'static',
});
