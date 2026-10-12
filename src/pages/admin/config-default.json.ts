import type { APIRoute } from 'astro';
import draft from '../../content/config-draft.json';

// Panel, GitHub token'ı olmayan cihazlarda veriyi buradan okur. Elle tutulan bir kopya
// zamanla eskiyordu (eski hekim fotoğrafı, eksik galeri) ve o ekrandan yapılan yayın canlı
// veriyi geri alıyordu. Build sırasında token'lı yolun okuduğu dosyadan üretilir.
export const GET: APIRoute = () =>
  new Response(JSON.stringify(draft, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
