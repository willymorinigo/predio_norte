import React, { useState, useEffect } from 'react';
import { COMPLEX_INFO } from '../data/complexData';
import { createWhatsAppLink, generateGeneralInquiryWhatsAppMessage } from '../utils/whatsapp';
import { Logo } from './Logo';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  CalendarCheck, 
  MessageCircle 
} from 'lucide-react';

interface NavbarProps {
  onSelectBooking: (discipline?: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectBooking, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Actividades', href: '#actividades' },
    { name: 'Horarios', href: '#horarios' },
    { name: 'Cumpleaños', href: '#cumpleanos' },
    { name: 'Escuelita', href: '#escuelita' },
    { name: 'Instalaciones', href: '#instalaciones' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navHeight = 76;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar Announcement */}
      <div className="bg-slate-900 text-xs text-slate-300 hidden md:block py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-[#058343]" />
              <span className="font-medium">{COMPLEX_INFO.address}</span>
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-[#058343]" />
              <span>Lun a Vie: 08:00 a 23:30 hs • Sáb 10:00 - 23:30 • Dom 13:00 - 23:30</span>
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <a 
              href={`tel:${COMPLEX_INFO.phone}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{COMPLEX_INFO.phoneFormatted}</span>
            </a>
            <a
              href={createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Consultas generales'))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-400/20" />
              <span>WhatsApp: {COMPLEX_INFO.whatsappFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5' 
          : 'bg-white/80 backdrop-blur-md border-b border-slate-100 py-3'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Official Brand Logo */}
          <a 
            href="#inicio" 
            onClick={(e) => scrollToSection(e, '#inicio')}
            className="flex items-center group cursor-pointer"
          >
            <Logo height={38} showText={true} />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? 'text-[#058343] bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Consultas de turnos y eventos'))}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl text-slate-500 hover:text-[#058343] hover:bg-emerald-50 border border-slate-200 transition-all duration-200"
              title="Escribinos por WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-[#058343]" />
            </a>

            <button
              onClick={() => {
                const element = document.querySelector('#turnero');
                if (element) {
                  const navHeight = 76;
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                  window.scrollTo({ top: elementPosition - navHeight, behavior: 'smooth' });
                }
                onSelectBooking();
              }}
              className="bg-[#058343] hover:bg-[#046c36] text-white font-semibold px-4 py-2 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all duration-200 active:scale-95 flex items-center gap-1.5"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>RESERVAR TURNO</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => {
                const element = document.querySelector('#turnero');
                if (element) {
                  const navHeight = 76;
                  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                  window.scrollTo({ top: elementPosition - navHeight, behavior: 'smooth' });
                }
                onSelectBooking();
              }}
              className="sm:hidden flex items-center gap-1.5 bg-[#058343] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Turnos</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menú"
              className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#e31f24]" /> : <Menu className="w-5 h-5 text-slate-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-5 mt-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="block px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-[#058343] hover:bg-emerald-50 transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  const element = document.querySelector('#turnero');
                  if (element) {
                    const navHeight = 76;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: elementPosition - navHeight, behavior: 'smooth' });
                  }
                  onSelectBooking();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#058343] hover:bg-[#046c36] text-white font-semibold py-2.5 rounded-xl shadow-sm text-sm transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>RESERVAR TURNO ONLINE</span>
              </button>

              <a
                href={createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Consultas'))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-800 font-medium py-2 rounded-xl border border-slate-200 text-xs transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#058343]" />
                <span>WhatsApp ({COMPLEX_INFO.whatsappFormatted})</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

