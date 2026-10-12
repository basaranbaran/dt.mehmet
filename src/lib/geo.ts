/**
 * GEO (Generative Engine Optimization) üreticileri.
 *
 * ChatGPT Search, Perplexity, Google AI Overviews, Copilot ve Claude gibi yapay zeka
 * arama motorları siteyi JS çalıştırmadan okur. Bu modül config.json'dan build
 * sırasında iki çıktı üretir:
 *   - buildJsonLd()  → <script type="application/ld+json"> (schema.org @graph)
 *   - buildLlmsTxt() → /llms.txt (llmstxt.org biçiminde Markdown özet)
 *
 * Hiçbir işletme verisi burada sabit yazılmaz; admin panelinden yapılan değişiklik
 * bir sonraki build'de iki çıktıya da yansır.
 */

import { formatPhoneIntl, isMobilePhone } from './phone';
import { parseWorkingHours, SCHEMA_DAY_NAMES, type WorkingHoursRow } from './working-hours';

interface Treatment {
  id: string;
  title: string;
  shortDescription?: string;
  longDescription?: string;
  image?: string;
}

export interface ClinicContent {
  metadata: { title: string; description: string; ogImage?: string };
  brand: { name: string; logoSubtext?: string; logoImage?: string; description?: string };
  doctor?: { name: string; title?: string; image?: string; bio?: string; education?: string[] };
  contact: {
    phone?: string;
    landlinePhone?: string;
    email?: string;
    address?: string;
    addressNote?: string;
    googleMapsDirectionsUrl?: string;
    googleMapsShareUrl?: string;
    workingHours?: WorkingHoursRow[];
  };
  socials?: Record<string, string>;
  features?: { title: string; description: string }[];
  treatments?: Treatment[];
  gallery?: { title: string; image: string }[];
}

type Json = string | number | boolean | null | undefined | Json[] | { [key: string]: Json };

/* ---------- Türetilmiş alanlar ---------- */

export function absoluteUrl(path: string | undefined, site: URL): string {
  if (!path) return '';
  if (/^https?:\/\//.test(path)) return path;
  return new URL(path.replace(/^\/+/, ''), site).href;
}

/** "…, Nazilli / Aydın" → { locality: "Nazilli", region: "Aydın" } */
function parseLocality(addressNote: string | undefined): { locality?: string; region?: string } {
  const last = String(addressNote || '').split(',').pop() || '';
  const [locality, region] = last.split('/').map((s) => s.trim());
  return region ? { locality, region } : {};
}

/** Sondaki tarif parantezini atar: "727. Sokak No:24 (Hastane Karşısı)" → "727. Sokak No:24" */
function streetOnly(address: string | undefined): string {
  return String(address || '').replace(/\s*\([^)]*\)\s*$/, '').trim();
}

function splitHonorific(name: string): { prefix?: string; plain: string } {
  const m = name.match(/^((?:Prof\.|Doç\.|Uzm\.|Dr\.|Dt\.)(?:\s+(?:Dr\.|Dt\.))?)\s+(.+)$/);
  return m ? { prefix: m[1], plain: m[2] } : { plain: name };
}

function clinicName(c: ClinicContent): string {
  return [c.brand.name, c.brand.logoSubtext].filter(Boolean).join(' ') || c.metadata.title;
}

function directionsUrl(c: ClinicContent): string {
  const raw = c.contact.googleMapsDirectionsUrl || c.contact.googleMapsShareUrl || '';
  return raw.includes('share.google') ? '' : raw;
}

function socialLinks(c: ClinicContent): string[] {
  return Object.values(c.socials || {}).filter((u) => /^https?:\/\//.test(u || ''));
}

/** Boş metin, boş dizi ve undefined alanları ağaçtan temizler. */
function compact(value: Json): Json {
  if (Array.isArray(value)) {
    const arr = value.map(compact).filter((v) => v !== undefined);
    return arr.length ? arr : undefined;
  }
  if (value && typeof value === 'object') {
    const entries = Object.entries(value)
      .map(([k, v]) => [k, compact(v)] as const)
      .filter(([, v]) => v !== undefined);
    return entries.length ? Object.fromEntries(entries) : undefined;
  }
  return value === '' || value === null ? undefined : value;
}

/* ---------- JSON-LD ---------- */

export function buildJsonLd(c: ClinicContent, site: URL): Json {
  const url = site.href;
  const ids = {
    website: `${url}#website`,
    webpage: `${url}#webpage`,
    clinic: `${url}#clinic`,
    doctor: `${url}#doctor`,
  };
  const name = clinicName(c);
  const { locality, region } = parseLocality(c.contact.addressNote);
  const ogImage = absoluteUrl(c.metadata.ogImage, site);
  const treatments = c.treatments || [];

  const hoursSpec = new Map<string, { opens: string; closes: string; days: string[] }>();
  for (const s of parseWorkingHours(c.contact.workingHours)) {
    if (s.closed) continue;
    const key = `${s.opens}-${s.closes}`;
    const entry = hoursSpec.get(key) || { opens: s.opens, closes: s.closes, days: [] };
    entry.days.push(...s.days.map((d) => SCHEMA_DAY_NAMES[d]));
    hoursSpec.set(key, entry);
  }

  const contactPoints: Json[] = [];
  if (c.contact.phone) {
    contactPoints.push({
      '@type': 'ContactPoint',
      telephone: formatPhoneIntl(c.contact.phone),
      contactType: 'reservations',
      availableLanguage: 'Turkish',
    });
  }
  if (c.contact.landlinePhone) {
    contactPoints.push({
      '@type': 'ContactPoint',
      telephone: formatPhoneIntl(c.contact.landlinePhone),
      contactType: 'customer service',
      availableLanguage: 'Turkish',
    });
  }

  const doctor = c.doctor;
  const doctorName = doctor?.name ? splitHonorific(doctor.name) : undefined;
  const education = doctor?.education || [];
  const isSchool = (s: string) => /üniversite|fakülte/i.test(s);

  const graph: Json[] = [
    {
      '@type': 'WebSite',
      '@id': ids.website,
      url,
      name,
      inLanguage: 'tr-TR',
      publisher: { '@id': ids.clinic },
    },
    {
      '@type': 'WebPage',
      '@id': ids.webpage,
      url,
      name: c.metadata.title,
      description: c.metadata.description,
      inLanguage: 'tr-TR',
      isPartOf: { '@id': ids.website },
      about: { '@id': ids.clinic },
      primaryImageOfPage: ogImage,
    },
    {
      '@type': ['Dentist', 'MedicalClinic'],
      '@id': ids.clinic,
      name,
      alternateName: [...new Set([c.brand.name, c.metadata.title])].filter((n) => n && n !== name),
      description: c.brand.description,
      url,
      logo: absoluteUrl(c.brand.logoImage, site),
      image: [ogImage, ...(c.gallery || []).map((g) => absoluteUrl(g.image, site))],
      telephone: formatPhoneIntl(c.contact.phone || c.contact.landlinePhone),
      email: c.contact.email,
      contactPoint: contactPoints,
      address: {
        '@type': 'PostalAddress',
        streetAddress: streetOnly(c.contact.address),
        addressLocality: locality,
        addressRegion: region,
        addressCountry: 'TR',
      },
      areaServed: locality ? { '@type': 'City', name: locality } : undefined,
      hasMap: directionsUrl(c),
      openingHoursSpecification: [...hoursSpec.values()].map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
      medicalSpecialty: 'Dentistry',
      availableService: treatments.map((t) => ({
        '@type': 'MedicalProcedure',
        name: t.title,
        description: t.longDescription || t.shortDescription,
      })),
      founder: doctor ? { '@id': ids.doctor } : undefined,
      employee: doctor ? { '@id': ids.doctor } : undefined,
      sameAs: socialLinks(c),
    },
    doctor && doctorName
      ? {
          '@type': 'Person',
          '@id': ids.doctor,
          name: doctorName.plain,
          honorificPrefix: doctorName.prefix,
          jobTitle: doctor.title,
          image: absoluteUrl(doctor.image, site),
          description: doctor.bio?.replace(/\s*\n+\s*/g, ' '),
          worksFor: { '@id': ids.clinic },
          alumniOf: education.filter(isSchool).map((n) => ({ '@type': 'CollegeOrUniversity', name: n })),
          memberOf: education
            .filter((s) => !isSchool(s))
            .flatMap((s) => s.split(','))
            .map((n) => ({ '@type': 'Organization', name: n.trim() })),
          knowsAbout: treatments.map((t) => t.title),
        }
      : undefined,
  ];

  return compact({ '@context': 'https://schema.org', '@graph': graph });
}

/** <script> içine güvenle gömülebilir JSON ("</script>" kaçışı). */
export function serializeJsonLd(data: Json): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/* ---------- llms.txt ---------- */

function oneLine(text: string | undefined): string {
  return String(text || '').replace(/\s*\n+\s*/g, ' ').trim();
}

export function buildLlmsTxt(c: ClinicContent, site: URL): string {
  const url = site.href;
  const name = clinicName(c);
  const { locality, region } = parseLocality(c.contact.addressNote);
  const place = [locality, region].filter(Boolean).join(' / ');
  const mobile = c.contact.phone;
  const landline = c.contact.landlinePhone;
  const mobileHasWhatsapp = isMobilePhone(mobile);
  const maps = directionsUrl(c);
  const lines: string[] = [];
  const push = (...l: string[]) => lines.push(...l);

  push(`# ${name}`, '');
  if (c.brand.description) push(`> ${oneLine(c.brand.description)}`, '');
  push(
    `Bu dosya, yapay zeka asistanlarının kliniği doğru tanıtabilmesi için ${url} adresindeki bilgilerin özetidir. ` +
      'Fiyatlar sitede yayımlanmaz; güncel fiyat ve randevu bilgisi için klinikle iletişime geçilmelidir.',
    '',
  );

  push('## Klinik bilgileri', '');
  push(`- Klinik adı: ${name}`);
  if (c.doctor?.name) push(`- Hekim: ${c.doctor.name}${c.doctor.title ? ` (${c.doctor.title})` : ''}`);
  if (place) push(`- Konum: ${place}, Türkiye`);
  if (c.contact.address) push(`- Adres: ${oneLine(c.contact.address)}${place ? `, ${place}` : ''}`);
  if (mobile) push(`- Cep telefonu${mobileHasWhatsapp ? ' (arama ve WhatsApp)' : ''}: ${formatPhoneIntl(mobile)}`);
  if (landline) push(`- Sabit hat: ${formatPhoneIntl(landline)}`);
  if (c.contact.email) push(`- E-posta: ${c.contact.email}`);
  if (maps) push(`- Yol tarifi: [Google Haritalar](${maps})`);
  push('');

  const hours = c.contact.workingHours || [];
  if (hours.length) {
    push('## Çalışma saatleri', '');
    for (const row of hours) push(`- ${oneLine(row.days)}: ${oneLine(row.hours)}`);
    push('');
  }

  const appointment: string[] = [];
  if (mobile) appointment.push(`cep hattını (${formatPhoneIntl(mobile)}) arayarak${mobileHasWhatsapp ? ' veya WhatsApp üzerinden yazarak' : ''}`);
  if (landline) appointment.push(`sabit hattı (${formatPhoneIntl(landline)}) arayarak`);
  if (appointment.length) {
    push('## Randevu', '');
    push(`Randevu ${appointment.join(' ya da ')} alınabilir.`, '');
  }

  const treatments = c.treatments || [];
  if (treatments.length) {
    push('## Tedaviler', '');
    for (const t of treatments) push(`- **${t.title}**: ${oneLine(t.longDescription || t.shortDescription)}`);
    push('');
  }

  if (c.doctor?.name) {
    push(`## Hekim: ${c.doctor.name}`, '');
    if (c.doctor.bio) push(oneLine(c.doctor.bio), '');
    if (c.doctor.education?.length) {
      push('Eğitim ve mesleki üyelikler:', '');
      for (const e of c.doctor.education) push(`- ${oneLine(e)}`);
      push('');
    }
  }

  const features = c.features || [];
  if (features.length) {
    push('## Klinik olanakları', '');
    for (const f of features) push(`- **${f.title}**: ${oneLine(f.description)}`);
    push('');
  }

  push('## Bağlantılar', '');
  push(`- [Web sitesi](${url}): Klinik tanıtımı, tedaviler, galeri ve iletişim`);
  if (treatments.length) push(`- [Tedaviler](${url}#tedaviler): Uygulanan tedavilerin açıklamaları`);
  if (c.doctor?.name) push(`- [Hekim hakkında](${url}#hakkimizda): ${c.doctor.name} özgeçmişi`);
  push(`- [İletişim](${url}#iletisim): Telefon, adres, harita ve çalışma saatleri`);
  for (const [key, link] of Object.entries(c.socials || {})) {
    if (/^https?:\/\//.test(link || '')) push(`- [${key.charAt(0).toUpperCase()}${key.slice(1)}](${link})`);
  }

  return lines.join('\n').trimEnd() + '\n';
}
