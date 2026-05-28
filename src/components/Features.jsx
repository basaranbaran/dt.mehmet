import React from 'react';
import * as LucideIcons from 'lucide-react';
import { clinicConfig } from '../config';
import FadeIn from './FadeIn';

// Dynamic Icon rendering helper based on config string
const FeatureIcon = ({ name, className }) => {
  const IconComponent = LucideIcons[name];
  if (!IconComponent) return <LucideIcons.HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

export default function Features() {
  return (
    <section className="py-16 bg-gradient-to-r from-brand-light/30 to-white border-y border-brand-primary/5 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-brand-primary/6 blur-3xl animate-blob-slow pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-brand-secondary/5 blur-3xl animate-blob-reverse pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <FadeIn delay={50} translate="translateY(20px)">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-brand-dark tracking-tight font-display">
              Diş Kliniğimizin Farkı
            </h2>
            <div className="w-12 h-1 bg-brand-primary mx-auto mt-3 rounded-full"></div>
            <p className="mt-4 text-brand-muted text-sm sm:text-base">
              Dentemet'te her detayı konforunuz, güvenliğiniz ve en yüksek tedavi başarısı için tasarladık.
            </p>
          </div>
        </FadeIn>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {clinicConfig.features.map((feature, idx) => (
            <FadeIn key={idx} delay={idx * 150} translate="translateY(30px)">
              <div
                className="p-8 rounded-2xl bg-brand-light/20 border border-brand-primary/10 text-left hover:shadow-xl hover:border-brand-primary/30 transform hover:-translate-y-1 transition-all duration-350 group h-full"
              >
                {/* Icon Frame */}
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                  <FeatureIcon name={feature.icon} className="w-7 h-7" />
                </div>

                {/* Title & Desc */}
                <h3 className="text-xl font-bold text-brand-dark font-display mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
