/**
 * GSAP ScrollTrigger Animasyonları
 * 
 * Tüm scroll animasyonları bu dosyada merkezi olarak yönetilir.
 * GSAP sadece transform ve opacity değiştirir → GPU compositor katmanı → 60fps
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// =============================================
// GSAP Global Ayarları
// =============================================
gsap.config({
  nullTargetWarn: false,  // Eksik elementlerde hata vermez
  force3D: true,          // GPU hızlandırmayı zorla
});

// =============================================
// NAVBAR — Scroll sonrası glass efekti
// =============================================
function initNavbar() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  ScrollTrigger.create({
    start: 'top -60',
    onEnter: () => nav.classList.add('glass-nav', 'shadow-md'),
    onLeaveBack: () => nav.classList.remove('glass-nav', 'shadow-md'),
  });
}

// =============================================
// HERO SECTION — Kartlar sırayla belirir
// =============================================
function initHero() {
  const heroCards = gsap.utils.toArray('.hero-card');
  if (!heroCards.length) return;

  gsap.from(heroCards, {
    opacity: 0,
    y: 50,
    scale: 0.96,
    duration: 0.85,
    ease: 'power3.out',
    stagger: 0.12,
    clearProps: 'all',
  });

  // Doktor fotoğrafı parallax
  const doctorImg = document.querySelector('.doctor-parallax');
  if (doctorImg) {
    gsap.to(doctorImg, {
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hakkimizda',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
  }
}

// =============================================
// FEATURES SECTION — Kartlar alttan süzülür
// =============================================
function initFeatures() {
  const featureCards = gsap.utils.toArray('.feature-card');
  if (!featureCards.length) return;

  gsap.from(featureCards, {
    opacity: 0,
    y: 55,
    duration: 0.75,
    ease: 'power2.out',
    stagger: 0.15,
    scrollTrigger: {
      trigger: '.features-grid',
      start: 'top 82%',
      toggleActions: 'play none none none',
    },
    clearProps: 'all',
  });

  const featuresHeading = document.querySelector('.features-heading');
  if (featuresHeading) {
    gsap.from(featuresHeading, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: featuresHeading,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      clearProps: 'all',
    });
  }
}

// =============================================
// ABOUT DOCTOR — Sol/Sağ split slide-in
// =============================================
function initAboutDoctor() {
  const photoCol = document.querySelector('.doctor-photo-col');
  const bioCol = document.querySelector('.doctor-bio-col');

  if (photoCol) {
    gsap.from(photoCol, {
      opacity: 0,
      x: -60,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#hakkimizda',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      clearProps: 'all',
    });
  }

  if (bioCol) {
    gsap.from(bioCol, {
      opacity: 0,
      x: 60,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.15,
      scrollTrigger: {
        trigger: '#hakkimizda',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      clearProps: 'all',
    });
  }
}

// =============================================
// TREATMENTS — Kartlar cascade
// =============================================
function initTreatments() {
  const treatmentCards = gsap.utils.toArray('.treatment-card');
  if (!treatmentCards.length) return;

  gsap.from(treatmentCards, {
    opacity: 0,
    y: 60,
    scale: 0.95,
    duration: 0.7,
    ease: 'power2.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.treatments-grid',
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    clearProps: 'all',
  });

  const treatmentsHeading = document.querySelector('.treatments-heading');
  if (treatmentsHeading) {
    gsap.from(treatmentsHeading, {
      opacity: 0,
      y: 30,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: treatmentsHeading,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      clearProps: 'all',
    });
  }
}

// =============================================
// GALLERY — Scale up + fade
// =============================================
function initGallery() {
  const galleryItems = gsap.utils.toArray('.gallery-item');
  if (!galleryItems.length) return;

  gsap.from(galleryItems, {
    opacity: 0,
    scale: 0.88,
    duration: 0.65,
    ease: 'back.out(1.4)',
    stagger: 0.08,
    scrollTrigger: {
      trigger: '.gallery-grid',
      start: 'top 82%',
      toggleActions: 'play none none none',
    },
    clearProps: 'all',
  });
}

// =============================================
// CONTACT — Slide-in sağ/sol
// =============================================
function initContact() {
  const contactInfo = document.querySelector('.contact-info-col');
  const contactForm = document.querySelector('.contact-form-col');

  if (contactInfo) {
    gsap.from(contactInfo, {
      opacity: 0,
      x: -50,
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#iletisim',
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
      clearProps: 'all',
    });
  }

  if (contactForm) {
    gsap.from(contactForm, {
      opacity: 0,
      x: 50,
      duration: 0.85,
      ease: 'power2.out',
      delay: 0.2,
      scrollTrigger: {
        trigger: '#iletisim',
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
      clearProps: 'all',
    });
  }
}

// =============================================
// SECTION HEADİNGS — Genel başlıklar
// =============================================
function initSectionHeadings() {
  const headings = gsap.utils.toArray('.section-heading');
  headings.forEach((heading) => {
    gsap.from(heading, {
      opacity: 0,
      y: 30,
      duration: 0.65,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: heading,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      clearProps: 'all',
    });
  });
}

// =============================================
// FOOTER
// =============================================
function initFooter() {
  const footerCols = gsap.utils.toArray('.footer-col');
  if (!footerCols.length) return;

  gsap.from(footerCols, {
    opacity: 0,
    y: 35,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.12,
    scrollTrigger: {
      trigger: 'footer',
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
    clearProps: 'all',
  });
}

// =============================================
// BAŞLAT — DOM hazır olunca çalıştır
// =============================================
export function initAnimations() {
  // ScrollTrigger refresh after page load
  ScrollTrigger.refresh();

  initNavbar();
  initHero();
  initFeatures();
  initAboutDoctor();
  initTreatments();
  initGallery();
  initContact();
  initSectionHeadings();
  initFooter();
}
