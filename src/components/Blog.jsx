import React from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { clinicConfig } from '../config';

export default function Blog() {
  return (
    <section id="blog" className="py-20 bg-brand-light/30 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-brand-primary/7.5 blur-3xl animate-blob-slow pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-brand-secondary/6.5 blur-3xl animate-blob-reverse pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-bold text-brand-primary uppercase tracking-widest font-display">
            Ağız ve Diş Sağlığı
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight font-display mt-2">
            Merak Edilenler ve Sağlık Rehberi
          </h2>
          <div className="w-12 h-1 bg-brand-primary mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-brand-muted text-sm sm:text-base">
            Tedavi süreçleri, diş sağlığı bakımı ve ağız hijyeni hakkında en çok merak edilen konuları derledik.
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {clinicConfig.blog.map((post, idx) => (
            <article
              key={idx}
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col justify-between hover:shadow-xl hover:border-brand-primary/10 transform hover:-translate-y-0.5 transition-all duration-300 group"
            >
              
              {/* Image Frame */}
              <div className="h-56 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm py-1.5 px-3 rounded-full flex items-center shadow-md text-xs font-semibold text-brand-secondary border border-gray-100">
                  <Calendar className="w-3.5 h-3.5 mr-1" />
                  {post.date}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-3 mb-6">
                  <h3 className="text-lg font-bold text-brand-dark font-display leading-snug group-hover:text-brand-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-brand-muted leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="inline-flex items-center text-sm font-bold text-brand-primary group-hover:text-brand-secondary cursor-pointer">
                  Yazıyı Oku
                  <ArrowUpRight className="w-4.5 h-4.5 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
