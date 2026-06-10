import React from 'react';
import { GraduationCap, Award, HeartHandshake } from 'lucide-react';
import { clinicConfig } from '../config';
import FadeIn from './FadeIn';
import AnimatedBackground from './AnimatedBackground';
import ShapeDivider from './ShapeDivider';

export default function AboutDoctor() {
  return (
    <section id="hakkimizda" className="pt-20 pb-40 md:pb-48 bg-white relative overflow-hidden">
      <AnimatedBackground section="aboutDoctor" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Doctor Portrait Image */}
          <div className="lg:col-span-5 relative">
            <FadeIn delay={100} translate="translateX(-30px)">
              <div className="relative mx-auto max-w-[360px] lg:max-w-full">
                {/* Decorative background shape */}
                <div className="absolute -inset-4 bg-brand-primary/10 rounded-[2.5rem] -rotate-3 z-0"></div>
                
                {/* Image Frame */}
                <div className="relative z-10 rounded-[2.2rem] overflow-hidden shadow-xl border-4 border-white bg-white aspect-[4/5]">
                  <img
                    src={clinicConfig.doctor.image}
                    alt={clinicConfig.doctor.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Float Experience Badge */}
                <div className="absolute -bottom-6 -right-6 bg-brand-accent text-white p-5 rounded-2xl shadow-xl z-20 max-w-[150px] text-left transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center space-x-2">
                    <Award className="w-6 h-6 shrink-0" />
                    <span className="text-xl font-bold font-display">{clinicConfig.doctor.experienceYear}</span>
                  </div>
                  <p className="text-[10px] uppercase font-bold tracking-wide mt-1 text-white/90">
                    {clinicConfig.doctor.experienceBadgeText}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Doctor Bio & Credentials */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <FadeIn delay={200} translate="translateX(30px)">
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-sm font-bold text-brand-primary uppercase tracking-widest font-display">
                    Hekimimizi Tanıyın
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark font-display">
                    {clinicConfig.doctor.name}
                  </h2>
                  <p className="text-lg font-medium text-brand-muted/90 italic">
                    {clinicConfig.doctor.title}
                  </p>
                  <div className="w-12 h-1 bg-brand-primary rounded-full mt-2"></div>
                </div>

                {/* Biography */}
                <p className="text-brand-muted leading-relaxed text-base">
                  {clinicConfig.doctor.bio}
                </p>

                {/* Value Proposition Statement */}
                <div className="p-5 rounded-2xl bg-white border border-gray-150 flex items-start space-x-4 shadow-sm">
                  <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary shrink-0">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-dark text-sm sm:text-base">Kişiselleştirilmiş Tedavi Felsefesi</h4>
                    <p className="text-xs sm:text-sm text-brand-muted mt-1">
                      Her hastanın gülüş tasarımı ve ağız yapısı kendine özgüdür. Kliniğimizde tedaviler hastalarımızın yüz hatlarına, beklentilerine ve konforuna göre özelleştirilir.
                    </p>
                  </div>
                </div>

                {/* Academic & Professional Credentials */}
                <div className="space-y-3">
                  <h4 className="font-bold text-brand-dark flex items-center text-base font-display">
                    <GraduationCap className="w-5.5 h-5.5 text-brand-primary mr-2" />
                    Eğitim ve Üyelikler
                  </h4>
                  <ul className="grid sm:grid-cols-1 gap-2.5">
                    {clinicConfig.doctor.education.map((edu, idx) => (
                      <li
                        key={idx}
                        className="flex items-start space-x-2.5 text-sm text-brand-muted"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-2 shrink-0"></span>
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
      <ShapeDivider type="animatedWaves" position="bottom" color="fill-brand-light" height="clamp(100px, 11vw, 160px)" />
    </section>
  );
}
