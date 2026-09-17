# Ajan Kuralları — mehmet-dishekimi

> Genel kurallar: `../AGENTS.md` · Hatalı desen kataloğu: `../site-templateleri/KOPYALAMA-YASAKLARI.md`

Astro 5 + Tailwind + GitHub Pages. Statik HTML build sırasında üretildiği için içerik/SEO senkron sorunu yok — ama aşağıdakiler düzeltilmeli.

| # | Dosya | Hata |
|:--|:--|:--|
| 1 | `public/admin/admin.js:134` | Arka kapı parolası: `pass === 'admin' \|\| pass === 'admin123' \|\| hash === targetHash` → tek koşula indir, 5 denemede kilit ekle |
| 2 | `public/admin/admin.js:10` | Yorum satırında parola ipucu (`SHA-256("dt-admin:" + "admin123")`) → kaldır |
| 3 | `src/content/config.json` | Veri dosyası adı ve şeması standarttan farklı → `SCHEMA-STANDARDI.md` v3'e göç edilmeli (ortak panel/şablon ancak böyle mümkün) |
| 4 | `public/` | `robots.txt` yok; `dist/admin/` yayına çıkıyor → admin dizini için `noindex` ve `Disallow` eklenmeli |
| 5 | `src/styles/global.css` | `prefers-reduced-motion` bloğu yok (GSAP animasyonları var) |

Kimlik doğrulama için referans alma; `KOPYALAMA-YASAKLARI.md` K1-K3'teki ✅ sürümünü uygula.
