/**
 * Panelden gelen metni HTML olarak basmadan önce güvenli hâle getirir.
 * innerHTML / set:html kullanan her yer bu modülden geçmelidir.
 */

const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function escapeHtml(text: string | undefined): string {
  return String(text ?? '').replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

/** **kalın**, *italik* ve satır sonlarını destekler; geri kalan her şey düz metin olarak kalır. */
export function formatRichText(text: string | undefined): string {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\r?\n/g, '<br />');
}
