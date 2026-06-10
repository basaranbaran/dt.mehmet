import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { clinicConfig } from '../config';
import FadeIn from './FadeIn';
import AnimatedBackground from './AnimatedBackground';
import ShapeDivider from './ShapeDivider';

export default function ClinicGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? clinicConfig.gallery.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === clinicConfig.gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="galeri" className="pt-20 pb-40 md:pb-48 bg-white relative overflow-hidden">
      <AnimatedBackground section="gallery" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Heading */}
        <FadeIn delay={50} translate="translateY(20px)">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-bold text-brand-primary uppercase tracking-widest font-display">
              Kliniğimiz
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight font-display mt-2">
              Tedavi ve Teknoloji Alanlarımız
            </h2>
            <div className="w-12 h-1 bg-brand-primary mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-brand-muted text-sm sm:text-base">
              Sterilizasyon standartlarımızı, modern kliniklerimizi ve son teknoloji görüntüleme cihazlarımızı yakından inceleyin.
            </p>
          </div>
        </FadeIn>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clinicConfig.gallery.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 100} translate="translateY(25px)">
              <div
                onClick={() => openLightbox(idx)}
                className="relative aspect-square rounded-3xl overflow-hidden shadow-md group cursor-pointer border border-gray-150 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlapping Hover Info */}
                <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left">
                  <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl w-fit text-white mb-2 self-end">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-display leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
            aria-label="Kapat"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
            aria-label="Önceki Görsel"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50"
            aria-label="Sonraki Görsel"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Title Wrap */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={clinicConfig.gallery[lightboxIndex].image}
              alt={clinicConfig.gallery[lightboxIndex].title}
              className="max-h-[75vh] object-contain rounded-xl shadow-2xl"
            />
            <p className="text-white text-base sm:text-lg font-bold font-display tracking-wide">
              {clinicConfig.gallery[lightboxIndex].title}
            </p>
          </div>
        </div>
      )}
      <ShapeDivider type="animatedWaves" position="bottom" color="fill-brand-light" height="clamp(100px, 11vw, 160px)" />
    </section>
  );
}
