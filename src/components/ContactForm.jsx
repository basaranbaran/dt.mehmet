import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { clinicConfig } from '../config';
import FadeIn from './FadeIn';
import AnimatedBackground from './AnimatedBackground';

export default function ContactForm() {
  return (
    <section id="iletisim" className="py-20 bg-brand-light relative overflow-hidden">
      <AnimatedBackground section="contactForm" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <FadeIn delay={50} translate="translateY(20px)">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-bold text-brand-primary uppercase tracking-widest font-display">
              İletişim
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight font-display mt-2">
              İletişim Bilgilerimiz
            </h2>
            <div className="w-12 h-1 bg-brand-primary mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-brand-muted text-sm sm:text-base">
              Bize çalışma saatleri içerisinde telefon numaralarımızdan veya e-posta adresimizden doğrudan ulaşabilirsiniz. Klinik konumumuzu harita üzerinden inceleyebilirsiniz.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Contact info */}
          <div className="lg:col-span-5 text-left">
            <FadeIn delay={150} translate="translateX(-30px)" className="h-full flex flex-col justify-center space-y-4">
              <h3 className="text-2xl font-bold text-brand-dark font-display mb-2">
                Klinik İletişim Detayları
              </h3>
              
              {/* Phone */}
              <a
                href={`tel:${clinicConfig.contact.phoneClean}`}
                className="flex items-start space-x-4 p-5 rounded-2xl bg-brand-light/20 border border-brand-primary/10 hover:border-brand-primary/30 transition-all hover:shadow-md group"
              >
                <div className="p-3 bg-white rounded-xl text-brand-primary shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-secondary uppercase tracking-wider">Telefon</h4>
                  <p className="text-base font-bold text-brand-dark mt-0.5 group-hover:text-brand-primary transition-colors">
                    {clinicConfig.contact.phone}
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${clinicConfig.contact.email}`}
                className="flex items-start space-x-4 p-5 rounded-2xl bg-brand-light/20 border border-brand-primary/10 hover:border-brand-primary/30 transition-all hover:shadow-md group"
              >
                <div className="p-3 bg-white rounded-xl text-brand-primary shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-secondary uppercase tracking-wider">E-Posta</h4>
                  <p className="text-base font-bold text-brand-dark mt-0.5 group-hover:text-brand-primary transition-colors">
                    {clinicConfig.contact.email}
                  </p>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start space-x-4 p-5 rounded-2xl bg-brand-light/20 border border-brand-primary/10">
                <div className="p-3 bg-white rounded-xl text-brand-primary shadow-sm shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-secondary uppercase tracking-wider">Adres</h4>
                  <p className="text-sm font-semibold text-brand-dark mt-0.5 leading-relaxed">
                    {clinicConfig.contact.address}
                  </p>
                </div>
              </div>

              {/* Working hours */}
              <div className="flex items-start space-x-4 p-5 rounded-2xl bg-brand-light/20 border border-brand-primary/10">
                <div className="p-3 bg-white rounded-xl text-brand-primary shadow-sm shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <h4 className="text-xs font-bold text-brand-secondary uppercase tracking-wider mb-2">Çalışma Saatleri</h4>
                  <div className="space-y-1.5">
                    {clinicConfig.contact.workingHours.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-xs sm:text-sm font-medium text-brand-dark">
                        <span className="text-brand-muted">{item.days}</span>
                        <span className="font-bold">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Large Interactive Google Map */}
          <div className="lg:col-span-7 h-[400px] lg:h-auto min-h-[400px]">
            <FadeIn delay={250} translate="translateX(30px)" className="h-full">
              <div className="rounded-3xl overflow-hidden shadow-lg border border-brand-primary/10 h-full w-full relative min-h-[400px]">
                <iframe
                  title="Klinik Harita Konumu"
                  src={clinicConfig.contact.googleMapsEmbedUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
