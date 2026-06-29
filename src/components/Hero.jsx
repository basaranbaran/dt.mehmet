import React from 'react';
import { clinicConfig } from '../config';
import FadeIn from './FadeIn';
import AnimatedBackground from './AnimatedBackground';
import ShapeDivider from './ShapeDivider';

export default function Hero() {
  const cards = [
    {
      title: clinicConfig.doctor.name,
      desc: clinicConfig.doctor.bio,
      link: "#hakkimizda",
      bgImage: clinicConfig.doctor.image,
      gridClass: "md:col-span-2 md:row-span-2 h-[380px] md:h-full",
      textClass: "justify-end items-start text-left p-6 sm:p-8 md:p-10",
      titleSize: "text-2xl sm:text-3xl lg:text-4xl"
    },
    {
      title: "TEDAVİLERİMİZ",
      desc: "Kliniğimizde uygulanan estetik, cerrahi ve koruyucu tüm diş tedavilerini detaylarıyla inceleyin.",
      link: "#tedaviler",
      bgImage: "/images/treatment-gulus.jpg",
      gridClass: "md:col-span-2 md:row-span-1 h-[240px] md:h-full",
      textClass: "justify-end items-end text-right p-6 sm:p-8",
      titleSize: "text-xl sm:text-2xl lg:text-3xl"
    },
    {
      title: "KLİNİĞİMİZ",
      desc: "Sizin konforunuz ve sağlığınız düşünülerek tasarlanmış modern kliniklerimiz.",
      link: "#galeri",
      bgImage: clinicConfig.gallery[0].image,
      gridClass: "md:col-span-1 md:row-span-1 h-[200px] md:h-full",
      textClass: "justify-center items-center text-center p-5 md:p-6",
      titleSize: "text-lg sm:text-xl lg:text-2xl"
    },
    {
      title: "İLETİŞİM BİLGİLERİ",
      desc: "Klinik adresimiz, çalışma saatlerimiz ve telefon numaralarımıza hızlıca ulaşın.",
      link: "#iletisim",
      bgImage: "/images/gallery-3.jpg",
      gridClass: "md:col-span-1 md:row-span-1 h-[200px] md:h-full",
      textClass: "justify-center items-center text-center p-5 md:p-6",
      titleSize: "text-lg sm:text-xl lg:text-2xl"
    }
  ];

  const handleScroll = (e, link) => {
    e.preventDefault();
    const id = link.replace('#', '');
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
    <section id="anasayfa" className="pt-24 pb-6 px-4 md:px-8 bg-white relative overflow-hidden flex flex-col justify-center md:h-[calc(100vh-16px)] min-h-[620px]">
      <AnimatedBackground section="hero" />
      <FadeIn delay={100} duration={900} translate="translateY(40px)" className="h-full w-full flex flex-col flex-grow">
        <div 
          id="banner-grid-wrapper" 
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 w-full h-auto md:h-full flex-grow rounded-3xl overflow-hidden shadow-lg border border-gray-100"
        >
        {cards.map((card, idx) => (
          <a
            key={idx}
            href={card.link}
            onClick={(e) => handleScroll(e, card.link)}
            className={`relative overflow-hidden group block ${card.gridClass}`}
          >
            {/* Background Image with Hover Zoom */}
            <img
              src={card.bgImage}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              fetchPriority={idx === 0 ? "high" : "auto"}
              loading={idx === 0 ? "eager" : "lazy"}
            />
            
            {/* Dark Overlay Gradient (Fades in slightly more on hover) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15 transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/50" />
            
            {/* Content Overlay */}
            <div className={`absolute inset-0 flex flex-col text-white z-10 ${card.textClass}`}>
              <h2 className={`${card.titleSize} font-bold tracking-wider font-display uppercase mb-2 drop-shadow-md`}>
                {card.title}
              </h2>
              {card.desc && (
                <p className="text-xs sm:text-sm text-gray-200/90 font-light leading-relaxed max-w-md drop-shadow-sm transition-colors duration-300 group-hover:text-white line-clamp-3">
                  {card.desc}
                </p>
              )}
            </div>
            
            {/* Border frame hover micro-animation */}
            <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 rounded-2xl transition-all duration-500 pointer-events-none" />
          </a>
        ))}
      </div>
      </FadeIn>
    </section>
  );
}
