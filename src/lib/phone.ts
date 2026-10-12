/**
 * Telefon yardımcıları — tel: ve WhatsApp linkleri panelde görünen numaradan türetilir.
 * Ayrı bir "temiz numara" alanı tutulmaz; numara değişince linkler de değişir.
 */

/** Herhangi bir TR telefon yazımını "905305084484" biçimine çevirir. */
export function normalizePhone(raw: string | undefined): string {
  const d = String(raw || '').replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('90')) return d;
  if (d.length === 11 && d.startsWith('0')) return '90' + d.slice(1);
  if (d.length === 10) return '90' + d;
  return d;
}

/** "+90 530 508 44 84" */
export function formatPhoneIntl(raw: string | undefined): string {
  const d = normalizePhone(raw);
  if (d.length !== 12) return d ? `+${d}` : '';
  return `+${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8, 10)} ${d.slice(10)}`;
}

/** 05xx hatlar mobildir (WhatsApp olabilir); 02xx/03xx/04xx sabit hattır (WhatsApp yok). */
export function isMobilePhone(raw: string | undefined): boolean {
  return normalizePhone(raw).charAt(2) === '5';
}

export function telHref(raw: string | undefined): string {
  const d = normalizePhone(raw);
  return d ? `tel:+${d}` : '';
}

/** wa.me yalnızca rakam kabul eder ("+" veya boşluk olmadan). */
export function whatsappHref(raw: string | undefined, message?: string): string {
  const d = normalizePhone(raw);
  if (!d) return '';
  return `https://wa.me/${d}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}
