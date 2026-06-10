/**
 * DENTEMET - DİŞ HEKİMİ TANITIM SAYFASI YAPILANDIRMA DOSYASI
 * 
 * Bu dosyadan sitenin tüm başlıklarını, Google arama motoru meta verilerini (SEO), 
 * renkleri, iletişim bilgilerini, doktor bilgilerini, hizmetleri ve görselleri özelleştirebilirsiniz.
 * 
 * Görselleri değiştirmek için:
 * Kendi resimlerinizi 'public/images/' klasörünün altına yükleyip, aşağıdaki dosya yollarını
 * (örn: "/images/doctor.jpg") o resimlerin isimleriyle güncelleyebilirsiniz.
 */

export const clinicConfig = {

  // ==========================================
  // 1. GOOGLE METADATA & SEO AYARLARI
  // ==========================================
  metadata: {
    title: "Mehmet Yağcı Ağız ve Diş Sağlığı Polikliniği",
    description: "Modern diş kliniğimizde implant, zirkonyum kaplama, Hollywood smile gülüş tasarımı, ortodonti ve çocuk diş hekimliği. Randevunuzu hemen online oluşturun.",
    keywords: "diş hekimi, diş kliniği, implant tedavisi, izmir diş hekimi, gülüş tasarımı, zirkonyum kaplama, diş beyazlatma, ortodonti, telsiz diş tedavisi",
    author: "Dentemet Diş Polikliniği",
    ogType: "website",
    ogUrl: "https://dentemet.com",
    ogImage: "/images/og-image.jpg", // Sosyal medyada paylaşıldığında görünecek resim
  },

  // ==========================================
  // 2. MARKA & LOGO AYARLARI
  // ==========================================
  brand: {
    name: "Dt. Mehmet Yağcı",
    slogan: "Gülüşünüz Değerlidir",
    logoText: "Dt. Mehmet Yağcı",
    logoSubtext: "Ağız ve Diş Sağlığı",
  },

  // ==========================================
  // 3. TEMA RENKLERİ VE ARKA PLAN ANİMASYONLARI
  // ==========================================
  // Aktif renk paleti: "tealFresh", "oceanBlue", "sunsetGlow", "royalIndigo", "emeraldBio", "softModern", "premiumClinicTheme", "warmWoodenTheme", "softBeigeTheme"
  activePalette: "premiumClinicTheme",

  themePalettes: {
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
      phoneColor: "#575B5F",      // Telefon / İletişim Rengi (Ko yu Gri)
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
  },

  // Dinamik olarak seçili paleti döndüren getter (Geriye dönük uyumluluk için)
  get theme() {
    return this.themePalettes[this.activePalette] || this.themePalettes.tealFresh;
  },

  // Her bölüm (section) için farklı, ayırt edici animasyonlu arka plan ayarları
  backgroundAnimations: {
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
        type: "movingGrid",
        speed: "medium",
        opacity: 0.14,          // Görünürlük oranı (arttırıldı)
        color1: "primaryColor"
      },
      aboutDoctor: {
        type: "blobDrift",
        speed: "slow",
        opacity: 0.24,          // Görünürlük oranı (arttırıldı)
        blobCount: 4,           // Yüzen organik şekil sayısı
        color1: "primaryColor",
        color2: "secondaryColor",
        color3: "accentColor"
      },
      treatments: {
        type: "particleDrift",
        speed: "slow",
        opacity: 0.32,          // Görünürlük oranı (arttırıldı)
        particleCount: 50,      // Canvas üzerinde yüzecek parıltı sayısı
        color1: "primaryColor"
      },
      gallery: {
        type: "particleDrift",
        speed: "slow",
        opacity: 0.08,          // Temiz beyaz arka planı korumak için çok hafif parıltılar
        particleCount: 25,
        color1: "primaryColor"
      },
      contactForm: {
        type: "gradientWave",
        speed: "medium",
        opacity: 0.25,          // Görünürlük oranı (arttırıldı)
        color1: "secondaryColor",
        color2: "accentColor"
      }
    }
  },


  // ==========================================
  // 4. İLETİŞİM BİLGİLERİ & HARİTA
  // ==========================================
  contact: {
    phone: "+90 (232) 444 0 555",
    phoneClean: "+902324440555", // Arama yapılabilmesi için boşluksuz telefon no
    email: "info@dentemet.com",
    address: "Atatürk Caddesi No: 123, Kat: 2, Alsancak, Konak / İzmir",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d379.1168818719706!2d28.33702575105927!3d37.9204163614518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b8b8d067b2d347%3A0x2322eabff4ca8d69!2zWWXFn2lsLCA3MjcuIFNrLiBObzoyNiwgMDk4MDAgTmF6aWxsaS9BeWTEsW4!5e0!3m2!1str!2str!4v1781123725973!5m2!1str!2str",
    workingHours: [
      { days: "Pazartesi - Cuma", hours: "09:00 - 19:00" },
      { days: "Cumartesi", hours: "09:00 - 15:00" },
      { days: "Pazar", hours: "Kapalı (Yalnızca Acil)" }
    ]
  },

  // ==========================================
  // 5. SOSYAL MEDYA LİNKLERİ
  // ==========================================
  socials: {
    facebook: "https://facebook.com/dentemet",
    instagram: "https://instagram.com/dentemet",
    twitter: "https://twitter.com/dentemet",
    youtube: "https://youtube.com/dentemet",
  },

  // ==========================================
  // 6. HEKİM / DOKTOR BİLGİLERİ
  // ==========================================
  doctor: {
    name: "Dt. Mehmet Yağcı",
    title: "Kurucu / Diş Hekimi",
    image: "/images/doctor.jpg", // public/images/doctor.jpg dosyası
    experienceYear: "4+ Yıl",
    experienceBadgeText: "Mesleki Deneyim ve Uzmanlık",
    bio: "12 yılı aşkın mesleki birikimi ve dijital diş hekimliğindeki uzmanlığı ile hastalarına hizmet vermektedir. Ege Üniversitesi Diş Hekimliği Fakültesi mezunu olan Dt. Elif Temel, özellikle estetik gülüş tasarımı, zirkonyum restorasyonlar ve implant üstü protezler konusunda uzmanlaşmıştır.",
    education: [
      "Ege Üniversitesi Diş Hekimliği Fakültesi (Lisans, 2014)",
      "Uluslararası İmplantoloji Kongresi (ICOI) Aktif Katılımcısı",
      "Estetik Diş Hekimliği Akademisi Derneği (EDAD) Üyesi"
    ]
  },

  // ==========================================
  // 7. KLİNİK ÖZELLİKLERİ / AVANTAJLARI
  // ==========================================
  features: [
    {
      title: "Uzman ve Güler Yüzlü Hekimler",
      description: "Tüm tedavilerimizde yüksek hasta memnuniyeti odaklı, uzman ve güler yüzlü ekibimiz hizmet vermektedir.",
      icon: "UserCheck"
    },
    {
      title: "Son Teknoloji Ekipmanlar",
      description: "3D dental tomografi, dijital ağız içi tarayıcılar ve tamamen bilgisayarlı laboratuvar desteğiyle hata payını sıfıra indiriyoruz.",
      icon: "Cpu"
    },
    {
      title: "Avrupa Standartlarında Hijyen",
      description: "Kliniğimizde Class-B otoklav sterilizasyonu ve hastalar arası tek kullanımlık sarf malzemeler titizlikle uygulanır.",
      icon: "ShieldCheck"
    }
  ],

  // ==========================================
  // 8. TEDAVİLER / HİZMETLER KATALOĞU
  // ==========================================
  treatments: [
    {
      id: "implant",
      title: "İmplantoloji (Diş Ekimi)",
      shortDescription: "Eksik dişlerinizi ömür boyu kullanabileceğiniz, doğal diş hissi veren titanyum vidalarla tamamlıyoruz.",
      longDescription: "İmplant tedavisi, çene kemiğine yerleştirilen yapay diş kökleri sayesinde eksik dişlerin fonksiyon, konuşma ve estetik açıdan en doğal şekilde geri kazanılmasını sağlar. Kliniğimizde dikişsiz/cerrahi rehberli implant uygulamaları gerçekleştirilmektedir.",
      image: "/images/treatment-implant.jpg",
      icon: "Sparkles"
    },
    {
      id: "gulus-tasarimi",
      title: "Estetik Diş Hekimliği (Hollywood Smile)",
      shortDescription: "Yüz hatlarınız, dudak yapınız ve ten renginizle uyumlu, ışıltılı porselen lamina ve beyazlatma uygulamaları.",
      longDescription: "Hollywood Smile, dijital gülüş tasarımı programları ile hastanın ağız yapısına en uygun porselen yaprak laminalar (Lumineers/Veneers), zirkonyum kronlar ve diş eti estetiği (gingivoplasti) yapılarak ideal gülüşe ulaşma sürecidir.",
      image: "/images/treatment-gulus.jpg",
      icon: "Smile"
    },
    {
      id: "zirkonyum",
      title: "Zirkonyum Porselen Kaplama",
      shortDescription: "Işık geçirgenliği son derece yüksek, diş eti morarması yapmayan estetik ve sağlam kaplamalar.",
      longDescription: "Zirkonyum, doku dostu olması ve ışığı doğal diş gibi yansıtması sebebiyle metal desteksiz köprü ve kaplamalarda tercih edilir. Zamanla renk değiştirmez, diş eti çekilmesine veya gri renk yansımasına neden olmaz.",
      image: "/images/treatment-zirkonyum.jpg",
      icon: "Shield"
    },
    {
      id: "ortodonti",
      title: "Şeffaf Plaklarla Ortodonti (Invisalign)",
      shortDescription: "Diş telleri olmadan, dışarıdan belli olmayan şeffaf ve çıkarılabilir plaklarla çapraşıklık tedavisi.",
      longDescription: "Invisalign telsiz diş düzeltme teknolojisi, bilgisayar ortamında tasarlanan kişiye özel şeffaf plaklar yardımıyla dişleri ideal konumuna getirir. Plaklar yemek yerken veya fırçalarken çıkarılabildiği için maksimum konfor sunar.",
      image: "/images/treatment-orto.jpg",
      icon: "Layers"
    },
    {
      id: "pedodonti",
      title: "Çocuk Diş Hekimliği (Pedodonti)",
      shortDescription: "Çocuklarımızın süt dişlerinin sağlığını koruyucu uygulamalar ve korkuyu ortadan kaldıran özel yaklaşım.",
      longDescription: "Pedodonti uzmanlarımız, süt ve genç kalıcı dişlerin sağlığını korumak amacıyla florür vernikleri, fissür örtücüler ve süt dişi dolguları yapar. Çocukların hekim korkusu yaşamaması için özel oyunlu seanslar düzenlenir.",
      image: "/images/treatment-pedodonti.jpg",
      icon: "Heart"
    },
    {
      id: "dis-beyazlatma",
      title: "Klinik Tipi Diş Beyazlatma",
      shortDescription: "Hekim kontrolünde özel beyazlatma ışığı ile sadece 45 dakikada 3-4 tona kadar beyazlık elde edin.",
      longDescription: "Klinikte uygulanan ofis tipi beyazlatma (Power Bleaching), diş hekimi gözetiminde dişlerin üzerine sürülen beyazlatıcı jelin özel bir mavi ışık kaynağıyla aktive edilmesiyle yapılır. Çay, kahve ve sigara lekelerine karşı en etkili ve hızlı çözümdür.",
      image: "/images/treatment-beyazlatma.jpg",
      icon: "Zap"
    }
  ],

  // ==========================================
  // 9. KLİNİK GALERİ FOTOĞRAFLARI
  // ==========================================
  gallery: [
    { title: "Giriş ve Bekleme Alanı", image: "/images/gallery-1.jpg" },
    { title: "Modern Klinik Ünitesi (Oda 1)", image: "/images/gallery-2.jpg" },
    { title: "Çocuk Bölümü ve Oyun Alanı", image: "/images/gallery-3.jpg" },
    { title: "Sterilizasyon ve Cihaz Parkuru", image: "/images/gallery-4.jpg" }
  ]
};
