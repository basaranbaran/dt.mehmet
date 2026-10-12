/** config.json'daki görsel yolunu ("images/x.webp" ya da "/images/x.webp") kök-göreli yola çevirir. */
export function publicPath(src: string | undefined): string {
  if (!src) return '';
  if (/^(https?:|data:|\/\/)/.test(src)) return src;
  return '/' + src.replace(/^\/+/, '');
}
