import React from 'react';
import { COMPLEX_INFO, DISCIPLINES } from '../data/complexData';
import { createWhatsAppLink, generateGeneralInquiryWhatsAppMessage } from '../utils/whatsapp';
import { Logo } from './Logo';
import { 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  MessageCircle 
} from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const navHeight = 76;
      const pos = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: pos - navHeight, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Logo variant="light" height={40} />
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-normal">
              3 canchas de césped sintético con iluminación LED profesional, boxeo con bolsas Everlast, pilates reformer, escuelita infantil inclusiva y salón privado para cumpleaños y eventos deportivos.
            </p>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={COMPLEX_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-pink-400 border border-slate-700 flex items-center justify-center transition-colors"
                title="Instagram @predio_norte"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPLEX_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-blue-400 border border-slate-700 flex items-center justify-center transition-colors"
                title="Facebook Complejo Deportivo Predio Norte"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Consultas desde footer'))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-emerald-400 border border-slate-700 flex items-center justify-center transition-colors"
                title="WhatsApp Predio Norte"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Secciones
            </h4>
            <ul className="space-y-2 font-normal">
              {['#inicio', '#actividades', '#horarios', '#cumpleanos', '#escuelita', '#instalaciones', '#contacto'].map((href) => {
                const label = href.replace('#', '').charAt(0).toUpperCase() + href.replace('#', '').slice(1);
                return (
                  <li key={href}>
                    <button
                      onClick={() => scrollTo(href)}
                      className="hover:text-emerald-400 transition-colors capitalize text-left text-xs"
                    >
                      {label === 'Inicio' ? 'Inicio' : label === 'Cumpleanos' ? 'Cumpleaños' : label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 3: Disciplinas */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Disciplinas
            </h4>
            <ul className="space-y-2 font-normal">
              {DISCIPLINES.map((d) => (
                <li key={d.id}>
                  <button
                    onClick={() => {
                      scrollTo('#actividades');
                    }}
                    className="hover:text-emerald-400 transition-colors text-left text-xs"
                  >
                    {d.name}
                  </button>
                </li>
              ))}
              <li>
                <span className="text-slate-500 text-[11px] block mt-1">
                  Convenio con {COMPLEX_INFO.partnerGym}
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Contacto
            </h4>
            <div className="space-y-2 text-xs font-normal">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#058343] shrink-0 mt-0.5" />
                <span>{COMPLEX_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#058343] shrink-0" />
                <span>{COMPLEX_INFO.phoneFormatted}</span>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#058343] shrink-0" />
                <span>{COMPLEX_INFO.whatsappFormatted}</span>
              </p>
              <div className="pt-2 text-slate-500 text-[11px] leading-relaxed">
                <p><strong>Lun a Vie:</strong> 08:00 a 23:30 hs</p>
                <p><strong>Sábados:</strong> 10:00 a 23:30 hs</p>
                <p><strong>Domingos:</strong> 13:00 a 23:30 hs</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px] font-normal">
          <p>© {new Date().getFullYear()} Complejo Deportivo Predio Norte. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1 text-slate-400">
            <span>Calle 41 e/ 7 y 8 • La Plata, Buenos Aires</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

