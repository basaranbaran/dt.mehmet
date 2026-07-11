/**
 * DENTEMET - DİŞ HEKİMİ TANITIM SAYFASI YAPILANDIRMA DOSYASI
 * 
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  İÇERİK VERİLERİ (başlıklar, metinler, iletişim, tedaviler)   ║
 * ║  artık src/content/config.json dosyasından okunmaktadır.       ║
 * ║                                                                 ║
 * ║  Admin panelinden (dtmehmetyagci.com/admin) düzenlenebilir.    ║
 * ║                                                                 ║
 * ║  Bu dosyada yalnızca TEMA ve ANİMASYON ayarları bulunur.       ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

import contentData from './content/config.json';

// ==========================================
// TEMA RENKLERİ VE ARKA PLAN ANİMASYONLARI
// ==========================================
// Aktif renk paleti config.json'dan (admin panelinden) yönetilir.
// Paletler: "tealFresh", "oceanBlue", "sunsetGlow", "royalIndigo", "emeraldBio", "softModern", "premiumClinicTheme", "warmWoodenTheme", "softBeigeTheme"

const themePalettes = {
  tealFresh: {
    primaryColor: "#0d9488",    // Ana Tema Rengi (Teal-600) - Butonlar, linkler vb.
    secondaryColor: "#0f766e",  // İkincil Renk (Teal-700) - Hover durumları vb.
    accentColor: "#f59e0b",     // Vurgu Rengi (Amber-500) - Randevu Butonu vb.
    darkColor: "#111827",       // Koyu Metinler / Başlıklar (Gray-900)
    lightColor: "#ccfbf1",      // Hafif Arkaplanlar (Teal-100) - Kart arka planları vb.
    phoneColor: "#10b981",      // Telefon / İletişim Rengi (Emerald-500)
  },
  oceanBlue: {
    primaryColor: "#2563eb",    // Royal Mavi (Blue-600)
    secondaryColor: "#1d4ed8",  // Koyu Mavi (Blue-700)
    accentColor: "#06b6d4",     // Turkuaz/Cyan (Cyan-500)
    darkColor: "#0f172a",       // Koyu Gri/Mavi (Slate-900)
    lightColor: "#dbeafe",      // Açık Mavi Arka Plan (Blue-100 - Derinleştirildi)
    phoneColor: "#059669",      // Telefon / İletişim Rengi (Emerald-600)
  },
  sunsetGlow: {
    primaryColor: "#db2777",    // Pembe (Pink-600)
    secondaryColor: "#be185d",  // Koyu Pembe (Pink-700)
    accentColor: "#f97316",     // Turuncu (Orange-500)
    darkColor: "#18181b",       // Koyu Siyah (Zinc-900)
    lightColor: "#ffe4e6",      // Gül Arka Plan (Rose-100)
    phoneColor: "#10b981",      // Telefon / İletişim Rengi (Emerald-500)
  },
  royalIndigo: {
    primaryColor: "#4f46e5",    // İndigo (Indigo-600)
    secondaryColor: "#4338ca",  // Koyu İndigo (Indigo-700)
    accentColor: "#10b981",     // Zümrüt Yeşili (Emerald-500)
    darkColor: "#1e1b4b",       // Koyu Lacivert (Indigo-950)
    lightColor: "#e0e7ff",      // Violet Arka Plan (Indigo-100)
    phoneColor: "#10b981",      // Telefon / İletişim Rengi (Emerald-500)
  },
  emeraldBio: {
    primaryColor: "#059669",    // Zümrüt Yeşili (Emerald-600)
    secondaryColor: "#047857",  // Koyu Yeşil (Emerald-700)
    accentColor: "#f59e0b",     // Amber Vurgu (Amber-500)
    darkColor: "#064e3b",       // Koyu Orman Yeşili (Emerald-950)
    lightColor: "#d1fae5",      // Hafif Yeşil Arka Plan (Emerald-100)
    phoneColor: "#d97706",      // Telefon / İletişim Rengi (Amber-600)
  },
  softModern: {
    primaryColor: "#BEA792",    // Ana Renk (Yumuşak Ahşap - Masanın üstü ve sandalye tonu)
    secondaryColor: "#E8E2D9",  // İkincil Renk (Hafif Krem-Bej - Duvar rengi)
    accentColor: "#BCBCBC",     // Vurgu (Mat Gümüş/Gri - Diş ünitesinin metal aksamları)
    darkColor: "#575B5F",       // Koyu Renk (Koyu Gri/Antrasit - Jaluzi ve sandalye ayakları)
    lightColor: "#FBF9F7",      // Açık Renk (Krem-Beyaz Arka Plan - Duvarın en aydınlık hali)
    phoneColor: "#575B5F",      // Telefon / İletişim Rengi (Koyu Gri)
  },
  premiumClinicTheme: {
    primaryColor: "#6fb7ffb7",    // Gece Laciverti (Güven ve profesyonellik için ana gövde rengi)
    secondaryColor: "#3a312cff",  // Eskitme Ahşap (Detaylar, ikonlar ve yardımcı vurgular)
    accentColor: "#a7d1fcff",     // Altın Sarısı (Butonlar, önemli call-to-action'lar ve lüks detaylar)
    darkColor: "#111827ff",       // Derin Lacivert (Footer veya başlık alanı gibi koyu zeminler)
    lightColor: "#eee6db",        // Bej/Kum (Ana içerik alanı arka planı, okunabilirliği artırır)
    phoneColor: "#181e2b",      // Telefon / İletişim Rengi (Eskitme Ahşap)
  },
  warmWoodenTheme: {
    primaryColor: "#5D4037",    // Koyu Kahve (Ahşap detaylar ve güçlü vurgular için)
    secondaryColor: "#8D6E63",  // Orta Kahve (İkincil detaylar ve ikonlar)
    accentColor: "#D4AF37",     // Altın Sarısı (CTA ve dikkat çekici alanlar için)
    darkColor: "#3E2723",       // Çok Koyu Kahve (Footer veya metin ağırlıklı alanlar)
    lightColor: "#F5F0E6",
    phoneColor: "#D4AF37",      // Telefon / İletişim Rengi (Altın Sarısı)
  },
  softBeigeTheme: {
    primaryColor: "#A69584",    // Taupe/Bej (Ana kurumsal renk, yumuşak ve sofistike)
    secondaryColor: "#C9B9A6",  // Açık Bej/Kum (Detaylar, ikonlar ve yardımcı öğeler)
    accentColor: "#E0C9A6",     // Soluk Altın/Şampanya (Dikkat çekmesi istenen yumuşak vurgular)
    darkColor: "#5D5752",       // Koyu Gri-Kahve (Okunabilir metinler ve güçlü hatlar)
    lightColor: "#dbf0feff",
    phoneColor: "#5D5752",      // Telefon / İletişim Rengi (Koyu Gri-Kahve)
  }
};

// Her bölüm (section) için farklı, ayırt edici animasyonlu arka plan ayarları
const backgroundAnimations = {
  enabled: true,
  sections: {
    hero: {
      type: "gradientWave",    // "gradientWave", "blobDrift", "particleDrift", "movingGrid", "glowingRadial", "none"
      speed: "slow",          // "slow", "medium", "fast"
      opacity: 0.28,          // Görünürlük oranı (arttırıldı)
      color1: "primaryColor",
      color2: "accentColor"
    },
    features: {
      type: "none",
      speed: "slow",
      opacity: 0,
      color1: "primaryColor"
    },
    aboutDoctor: {
      type: "gradientWave",
      speed: "slow",
      opacity: 0.12,
      color1: "primaryColor",
      color2: "secondaryColor",
      color3: "accentColor"
    },
    treatments: {
      type: "particleDrift",
      speed: "slow",
      opacity: 0.25,
      particleCount: 30,
      color1: "primaryColor"
    },
    gallery: {
      type: "none",
      speed: "slow",
      opacity: 0,
      particleCount: 0,
      color1: "primaryColor"
    },
    contactForm: {
      type: "gradientWave",
      speed: "slow",
      opacity: 0.18,
      color1: "secondaryColor",
      color2: "accentColor"
    }
  }
};

// ==========================================
// BİRLEŞTİRİLMİŞ KLİNİK YAPILANDIRMASI
// ==========================================
// JSON'dan gelen içerik verileri + bu dosyadaki tema/animasyon ayarları
export const clinicConfig = {
  // JSON'dan gelen içerik verileri
  ...contentData,

  // Tema ayarları (activePalette contentData'dan geliyor)
  themePalettes,

  // Dinamik olarak seçili paleti döndüren getter (Geriye dönük uyumluluk için)
  get theme() {
    return this.themePalettes[this.activePalette] || this.themePalettes.tealFresh;
  },

  // Arka plan animasyon ayarları
  backgroundAnimations,
};
