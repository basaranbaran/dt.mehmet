import type { APIRoute } from 'astro';
import content from '../content/config.json';
import { buildLlmsTxt } from '../lib/geo';

// Yapay zeka arama motorları için Markdown özet (https://llmstxt.org).
// config.json'dan build sırasında üretilir; elle düzenlenmez.
export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('astro.config.mjs içinde "site" tanımlı olmalı (llms.txt mutlak URL ister).');
  return new Response(buildLlmsTxt(content, site), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
