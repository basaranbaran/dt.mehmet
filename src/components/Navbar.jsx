import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { clinicConfig } from '../config';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Anasayfa', href: '#anasayfa' },
    { name: 'Hakkımızda', href: '#hakkimizda' },
    { name: 'Tedaviler', href: '#tedaviler' },
    { name: 'Kliniğimiz', href: '#galeri' },
    { name: 'İletişim', href: '#iletisim' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      // Calculate dynamic header offset
      const headerOffset = isScrolled ? 60 : 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass-nav py-1.5 shadow-md' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Branding */}
          <a
            href="#anasayfa"
            onClick={(e) => handleNavClick(e, '#anasayfa')}
            className="flex flex-col group"
          >
            <span className="text-2xl font-bold tracking-wider text-brand-dark group-hover:text-brand-primary transition-colors uppercase font-display">
              {clinicConfig.brand.logoText}
            </span>
            <span className="text-[10px] tracking-widest text-brand-muted uppercase font-sans -mt-1 font-medium">
              {clinicConfig.brand.logoSubtext}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-semibold text-brand-dark/85 hover:text-brand-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-primary after:transition-all hover:after:w-full"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center">
            <a
              href={`tel:${clinicConfig.contact.phoneClean}`}
              className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2.5 px-6 rounded-full shadow-lg shadow-brand-primary/20 hover:shadow-brand-secondary/30 transform hover:-translate-y-0.5 transition-all text-sm font-display flex items-center"
            >
              <Phone className="w-4 h-4 mr-2 animate-pulse" />
              {clinicConfig.contact.phone}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-dark hover:text-brand-primary focus:outline-none p-2 rounded-md transition-colors"
              aria-label="Menüyü Aç"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-screen border-b border-gray-200 bg-white' : 'max-h-0'
      }`}>
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 shadow-inner">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                setIsOpen(false);
                handleNavClick(e, item.href);
              }}
              className="block px-3 py-3 rounded-md text-base font-semibold text-brand-dark hover:bg-brand-light hover:text-brand-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-4 pb-2 border-t border-gray-100 flex flex-col px-3">
            <a
              href={`tel:${clinicConfig.contact.phoneClean}`}
              onClick={() => setIsOpen(false)}
              className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-3 px-6 rounded-full text-center shadow-md transform hover:-translate-y-0.5 transition-all text-sm font-display flex items-center justify-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              {clinicConfig.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
