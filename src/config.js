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
  // 3. TEMA RENKLERİ (HEX Kodları)
  // ==========================================
  theme: {
    primaryColor: "#0d9488",    // Ana Tema Rengi (Teal-600) - Butonlar, linkler vb.
    secondaryColor: "#0f766e",  // İkincil Renk (Teal-700) - Hover durumları vb.
    accentColor: "#f59e0b",     // Vurgu Rengi (Amber-500) - Randevu Butonu vb.
    darkColor: "#111827",       // Koyu Metinler / Başlıklar (Gray-900)
    lightColor: "#f0fdfa",      // Hafif Arkaplanlar (Teal-50) - Kart arka planları vb.
  },

  // ==========================================
  // 4. İLETİŞİM BİLGİLERİ & HARİTA
  // ==========================================
  contact: {
    phone: "+90 (232) 444 0 555",
    phoneClean: "+902324440555", // Arama yapılabilmesi için boşluksuz telefon no
    email: "info@dentemet.com",
    address: "Atatürk Caddesi No: 123, Kat: 2, Alsancak, Konak / İzmir",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3125.044158498263!2d27.1384024!3d38.4404092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd85d77344f6f%3A0xe4431e7cc44aa4df!2sAlsancak%2C%20Konak%2F%C4%B0zmir!5e0!3m2!1str!2str!4v1716422400000!5m2!1str!2str",
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
