import React from 'react';
import { ArrowUp } from 'lucide-react';
import { clinicConfig } from '../config';

const FacebookIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

export default function Footer() {
  const socialIcons = {
    facebook: <FacebookIcon className="w-5 h-5" />,
    instagram: <InstagramIcon className="w-5 h-5" />,
    twitter: <TwitterIcon className="w-5 h-5" />,
    youtube: <YoutubeIcon className="w-5 h-5" />,
  };


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 60;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 relative">
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute top-[-24px] left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-brand-primary hover:bg-brand-secondary text-white shadow-xl flex items-center justify-center border-4 border-white transition-colors cursor-pointer"
        aria-label="Sayfanın Başına Git"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 text-left border-b border-gray-800 pb-12">
          
          {/* Logo & Slogan Column */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-wider uppercase font-display text-brand-primary">
                {clinicConfig.brand.logoText}
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-gray-400 -mt-1">
                {clinicConfig.brand.logoSubtext}
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Alsancak'ta modern teknolojiler, tecrübeli hekim kadrosu ve üstün hijyen standartlarıyla ağız ve diş sağlığınız için en iyi çözümleri üretiyoruz.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="text-base font-bold uppercase tracking-wider font-display text-white">
              Hızlı Erişim
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
              <a href="#anasayfa" onClick={(e) => handleScrollClick(e, '#anasayfa')} className="hover:text-brand-primary transition-colors py-1">Anasayfa</a>
              <a href="#hakkimizda" onClick={(e) => handleScrollClick(e, '#hakkimizda')} className="hover:text-brand-primary transition-colors py-1">Hakkımızda</a>
              <a href="#tedaviler" onClick={(e) => handleScrollClick(e, '#tedaviler')} className="hover:text-brand-primary transition-colors py-1">Tedaviler</a>
              <a href="#galeri" onClick={(e) => handleScrollClick(e, '#galeri')} className="hover:text-brand-primary transition-colors py-1">Kliniğimiz</a>
              <a href="#iletisim" onClick={(e) => handleScrollClick(e, '#iletisim')} className="hover:text-brand-primary transition-colors py-1">İletişim</a>
            </div>
          </div>

          {/* Socials & Work Hours Column */}
          <div className="space-y-4">
            <h4 className="text-base font-bold uppercase tracking-wider font-display text-white">
              Bizi Takip Edin
            </h4>
            
            {/* Social Icons Row */}
            <div className="flex space-x-4">
              {Object.entries(clinicConfig.socials).map(([key, value]) => {
                if (!value) return null;
                return (
                  <a
                    key={key}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-900 hover:bg-brand-primary text-gray-400 hover:text-white rounded-xl shadow-inner transition-all transform hover:-translate-y-0.5"
                    aria-label={`Bizi ${key}'de takip edin`}
                  >
                    {socialIcons[key]}
                  </a>
                );
              })}
            </div>

            {/* Sub-note */}
            <p className="text-xs text-gray-500 pt-2 leading-relaxed">
              Sosyal medya hesaplarımız üzerinden güncel vaka görsellerini, klinik içi duyuruları ve diş sağlığı ipuçlarını takip edebilirsiniz.
            </p>
          </div>

        </div>

        {/* Footer Bottom Credentials */}
        <div className="pt-8 text-center text-xs text-gray-500 border-t border-gray-800/50 mt-4">
          <p>© {new Date().getFullYear()} {clinicConfig.brand.name} Diş Polikliniği. Tüm Hakları Saklıdır.</p>
        </div>

      </div>
    </footer>
  );
}
