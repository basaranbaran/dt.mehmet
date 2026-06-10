import React, { useState } from 'react';
import { 
  Sparkles, 
  Smile, 
  Shield, 
  Layers, 
  Heart, 
  Zap, 
  ArrowRight, 
  X, 
  CheckCircle, 
  HeartPulse 
} from 'lucide-react';
import { clinicConfig } from '../config';
import FadeIn from './FadeIn';
import AnimatedBackground from './AnimatedBackground';
import ShapeDivider from './ShapeDivider';

const iconMap = {
  Sparkles,
  Smile,
  Shield,
  Layers,
  Heart,
  Zap,
};

const TreatmentIcon = ({ name, className }) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return <HeartPulse className={className} />;
  return <IconComponent className={className} />;
};

export default function Treatments() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section id="tedaviler" className="pt-20 pb-40 md:pb-48 bg-brand-light relative overflow-hidden">
      <AnimatedBackground section="treatments" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Heading */}
        <FadeIn delay={50} translate="translateY(20px)">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-bold text-brand-primary uppercase tracking-widest font-display">
              Hizmetlerimiz
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight font-display mt-2">
              Ağız ve Diş Sağlığı Tedavileri
            </h2>
            <div className="w-12 h-1 bg-brand-primary mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-brand-muted text-sm sm:text-base">
              Kliniğimizde uygulanan diş estetiği, cerrahi operasyonlar ve çocuk diş hekimliği tedavilerini inceleyin.
            </p>
          </div>
        </FadeIn>

        {/* Treatments Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {clinicConfig.treatments.map((treatment, idx) => (
            <FadeIn key={treatment.id} delay={idx * 100} translate="translateY(30px)">
              <div
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col justify-between hover:shadow-2xl hover:border-brand-primary/20 transform hover:-translate-y-1 transition-all duration-300 group h-full"
              >
                
                {/* Card Image Frame */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating Icon */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-2xl shadow-md border border-gray-150 flex items-center justify-center text-brand-primary">
                    <TreatmentIcon name={treatment.icon} className="w-6 h-6" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between text-left">
                  <div className="space-y-3 mb-6">
                    <h3 className="text-xl font-bold text-brand-dark font-display group-hover:text-brand-primary transition-colors">
                      {treatment.title}
                    </h3>
                    <p className="text-sm text-brand-muted leading-relaxed line-clamp-3">
                      {treatment.shortDescription}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveModal(treatment)}
                    className="inline-flex items-center text-sm font-bold text-brand-primary group-hover:text-brand-secondary transition-colors cursor-pointer"
                  >
                    Detayları İncele
                    <ArrowRight className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </FadeIn>
          ))}
        </div>

      </div>

      {/* Interactive Detail Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl border border-gray-100 transform scale-100 transition-all"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Image */}
            <div className="h-60 sm:h-72 overflow-hidden relative">
              <img
                src={activeModal.image}
                alt={activeModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-2xl font-bold text-white font-display">
                  {activeModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 bg-black/45 hover:bg-black/70 text-white rounded-full transition-colors"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 text-left space-y-4">
              <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
                {activeModal.longDescription}
              </p>
              
              <div className="flex items-center space-x-2.5 p-3 rounded-2xl bg-brand-light/30 border border-brand-primary/10">
                <CheckCircle className="w-5 h-5 text-brand-primary shrink-0" />
                <span className="text-xs sm:text-sm text-brand-secondary font-medium">
                  Bu tedavi kliniğimizde uzman hekimimiz tarafından dijital protokollerle sunulmaktadır.
                </span>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-gray-100">
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-6 rounded-full text-center shadow-lg shadow-brand-primary/10 transition-colors text-sm font-display cursor-pointer"
                >
                  Kapat
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
      <ShapeDivider type="animatedWaves" position="bottom" color="fill-white" height="clamp(100px, 11vw, 160px)" />
    </section>
  );
}
