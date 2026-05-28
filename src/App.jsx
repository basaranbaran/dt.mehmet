import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import AboutDoctor from './components/AboutDoctor';
import Treatments from './components/Treatments';
import ClinicGallery from './components/ClinicGallery';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

import { clinicConfig } from './config';

export default function App() {
  // Dynamically apply configuration settings (Branding theme colors & SEO metadata)
  useEffect(() => {
    // 1. Inject custom theme colors into CSS variables for Tailwind CSS v4 mapping
    const root = document.documentElement;
    root.style.setProperty('--color-brand-primary', clinicConfig.theme.primaryColor);
    root.style.setProperty('--color-brand-secondary', clinicConfig.theme.secondaryColor);
    root.style.setProperty('--color-brand-accent', clinicConfig.theme.accentColor);
    root.style.setProperty('--color-brand-dark', clinicConfig.theme.darkColor);
    root.style.setProperty('--color-brand-light', clinicConfig.theme.lightColor);

    // 2. Dynamically set HTML Document Title (SEO)
    document.title = clinicConfig.metadata.title;

    // 3. Dynamically set/update Meta Tags for Search Engines & Social Shares
    const updateOrCreateMeta = (selector, attribute, value) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name')) {
          element.setAttribute('name', selector.match(/"([^"]+)"/)[1]);
        } else if (selector.startsWith('meta[property')) {
          element.setAttribute('property', selector.match(/"([^"]+)"/)[1]);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    // Google SEO Meta tags
    updateOrCreateMeta('meta[name="description"]', 'content', clinicConfig.metadata.description);
    updateOrCreateMeta('meta[name="keywords"]', 'content', clinicConfig.metadata.keywords);
    updateOrCreateMeta('meta[name="author"]', 'content', clinicConfig.metadata.author);

    // OpenGraph Social Share tags
    updateOrCreateMeta('meta[property="og:title"]', 'content', clinicConfig.metadata.title);
    updateOrCreateMeta('meta[property="og:description"]', 'content', clinicConfig.metadata.description);
    updateOrCreateMeta('meta[property="og:image"]', 'content', clinicConfig.metadata.ogImage);
    updateOrCreateMeta('meta[property="og:url"]', 'content', clinicConfig.metadata.ogUrl);
    updateOrCreateMeta('meta[property="og:type"]', 'content', clinicConfig.metadata.ogType);

    // Twitter Share tags
    updateOrCreateMeta('meta[name="twitter:title"]', 'content', clinicConfig.metadata.title);
    updateOrCreateMeta('meta[name="twitter:description"]', 'content', clinicConfig.metadata.description);
    updateOrCreateMeta('meta[name="twitter:image"]', 'content', clinicConfig.metadata.ogImage);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between selection:bg-brand-primary/20 selection:text-brand-secondary">
      {/* Sticky Header navigation */}
      <Navbar />

      <main className="flex-grow">
        {/* Hero Landing layout */}
        <Hero />

        {/* Section: Why Choose Us */}
        <Features />

        {/* Section: Doctor Portrait & Biography */}
        <AboutDoctor />

        {/* Section: Treatments list with dynamic detail modals */}
        <Treatments />

        {/* Section: Clinic Interior Photo Showcase with expand lightbox */}
        <ClinicGallery />

        {/* Section: Integrated Map, Work Hours, and Contact Form */}
        <ContactForm />
      </main>

      {/* Footer Branding & Social Media Links */}
      <Footer />
    </div>
  );
}
