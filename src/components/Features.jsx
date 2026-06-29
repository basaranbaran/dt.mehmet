import React from 'react';
import { UserCheck, Cpu, ShieldCheck, HelpCircle } from 'lucide-react';
import { clinicConfig } from '../config';
import FadeIn from './FadeIn';
import AnimatedBackground from './AnimatedBackground';
import ShapeDivider from './ShapeDivider';

const iconMap = {
  UserCheck,
  Cpu,
  ShieldCheck,
};

// Dynamic Icon rendering helper based on config string
const FeatureIcon = ({ name, className }) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return <HelpCircle className={className} />;
  return <IconComponent className={className} />;
};

export default function Features() {
  return (
    <section className="pt-16 pb-36 md:pb-44 bg-gradient-to-r from-brand-light/30 to-white border-y border-brand-primary/5 relative overflow-hidden">
      <AnimatedBackground section="features" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Heading with depth decoration */}
        <FadeIn delay={50} translate="translateY(20px)">
          <div className="text-center max-w-2xl mx-auto mb-16 relative">
            {/* Glowing Backdrop Orb - blur kaldırıldı, native gradient kullanıldı */}
            <div className="absolute top-[10%] left-[50%] -translate-x-[50%] w-72 h-72 rounded-full -z-10 pointer-events-none" style={{background: 'radial-gradient(ellipse at center, var(--color-brand-primary, #6fb7ff) 0%, transparent 70%)', opacity: 0.15}} />
            
            <span className="text-xs font-bold text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-4 py-1.5 rounded-full mb-3.5 inline-block">
              Neden Dentemet?
            </span>
            <h2 className="text-3.5xl font-extrabold text-brand-dark tracking-tight font-display">
              Diş Kliniğimizin Farkı
            </h2>
            <div className="w-14 h-1 bg-brand-primary mx-auto mt-3 rounded-full shadow-sm"></div>
            <p className="mt-4 text-brand-muted text-sm sm:text-base leading-relaxed">
              Dentemet'te her detayı konforunuz, güvenliğiniz ve en yüksek tedavi başarısı için tasarladık.
            </p>
          </div>
        </FadeIn>

        {/* Feature Cards Grid with depth shadows */}
        <div className="grid md:grid-cols-3 gap-8">
          {clinicConfig.features.map((feature, idx) => (
            <FadeIn key={idx} delay={idx * 150} translate="translateY(30px)">
              <div
                className="p-8 rounded-3xl bg-white/80 border border-white/60 text-left shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.09)] hover:border-brand-primary/25 hover:bg-white transform hover:-translate-y-2.5 transition-all duration-500 backdrop-blur-md group h-full relative overflow-hidden"
              >
                {/* Decorative bottom corner highlight */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-brand-primary/0 to-brand-primary/5 rounded-tl-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-500" />

                {/* Icon Frame - Spins and scales on card hover */}
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500 group-hover:scale-105 group-hover:rotate-[360deg]">
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
      <ShapeDivider type="animatedWaves" position="bottom" color="fill-white" height="clamp(80px, 9vw, 140px)" />
    </section>
  );
}
