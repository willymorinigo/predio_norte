import React, { useState } from 'react';
import { COMPLEX_INFO } from '../data/complexData';
import { createWhatsAppLink, generateBirthdayInquiryMessage } from '../utils/whatsapp';
import { 
  Clock, 
  CreditCard, 
  CheckCircle2, 
  MessageCircle, 
  Calendar 
} from 'lucide-react';

interface BirthdaysSectionProps {
  onBookBirthday: () => void;
}

export const BirthdaysSection: React.FC<BirthdaysSectionProps> = ({ onBookBirthday }) => {
  const [selectedSlot, setSelectedSlot] = useState<string>('17:30 a 20:30 hs');

  const birthdaySlots = [
    { title: 'Franja Tarde 1', time: '13:00 a 16:00 hs', desc: 'Ideal para almorzar y jugar la tarde completa.' },
    { title: 'Franja Tarde 2', time: '17:30 a 20:30 hs', desc: 'El horario favorito para merienda y fútbol non-stop.' },
    { title: 'Franja Noche', time: '18:00 a 21:00 hs', desc: 'Con iluminación LED full y tercer tiempo extendido.' },
  ];

  const packageIncludes = [
    {
      title: '3 Horas Completas de Cancha',
      desc: 'Cancha de césped sintético exclusiva para partidos, penales y juegos guiados.',
      icon: '⚽',
    },
    {
      title: 'Profesor a Cargo del Evento',
      desc: 'Docente de educación física dedicado a organizar torneos y dinámicas recreativas.',
      icon: '👨‍🏫',
    },
    {
      title: 'Encargado de Asistencia',
      desc: 'Personal asignado para asistir a la familia durante todo el festejo.',
      icon: '🤝',
    },
    {
      title: 'Salón Privado & Climatizado',
      desc: 'Mesas, sillas, mantelería, heladera/freezer y vista panorámica a la cancha.',
      icon: '🏠',
    },
    {
      title: 'Atención Personalizada',
      desc: 'Cuidado y coordinación de inicio a fin para que disfrutes sin preocupaciones.',
      icon: '✨',
    },
    {
      title: 'Financiación en 3 y 6 Cuotas',
      desc: 'Facilidad de pago con tarjetas de crédito para congelar tu fecha con anticipación.',
      icon: '💳',
    },
  ];

  return (
    <section id="cumpleanos" className="py-16 sm:py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Pill & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#e31f24] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>🎂</span>
            <span>Festejos & Eventos Deportivos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            ¡Festejá tu Cumple <span className="text-[#058343]">en Predio!</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            Sábados, domingos y feriados. Viví una fiesta llena de deporte, amigos y diversión con todo el complejo a tu disposición.
          </p>
        </div>

        {/* Two Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: What is Included */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
              <span className="bg-[#e31f24] text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full tracking-wide">
                Elegí Predio
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 mb-2">
                Paquete Cumple Todo Incluido
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">
                Nos encargamos de la coordinación para que los chicos jueguen sin parar y los adultos disfruten cómodos en el salón.
              </p>

              {/* Grid of perks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6">
                {packageIncludes.map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-100 flex items-start gap-3 shadow-xs">
                    <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-slate-500 leading-snug block mt-0.5 font-normal">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Installments Pill */}
              <div className="mt-6 p-4 rounded-2xl bg-white border border-emerald-200/80 flex items-center justify-between flex-wrap gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-xl font-bold">
                    💳
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                      ¡Pagá tu cumple en 3 y 6 Cuotas!
                    </span>
                    <span className="text-xs text-slate-500 font-normal">
                      Aceptamos todas las tarjetas de crédito, débito y transferencias.
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Time Slots & Direct Booking Widget */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs">
              
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#058343]" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Franjas Horarias Disponibles
                  </span>
                </div>
                <span className="text-[10px] text-[#058343] font-bold bg-white border border-slate-200 px-2 py-0.5 rounded-lg">
                  Sáb, Dom y Feriados
                </span>
              </div>

              <div className="space-y-2.5">
                {birthdaySlots.map((slot) => {
                  const isSelected = selectedSlot === slot.time;
                  return (
                    <button
                      key={slot.title}
                      type="button"
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between ${
                        isSelected
                          ? 'bg-white border-[#058343] shadow-xs'
                          : 'bg-white/60 border-slate-200/80 hover:bg-white'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold text-[#058343] uppercase tracking-wide block">
                          {slot.title}
                        </span>
                        <span className="text-xl font-bold text-slate-900 mt-0.5 block">
                          {slot.time}
                        </span>
                        <span className="text-xs text-slate-500 block mt-0.5 font-normal">
                          {slot.desc}
                        </span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-5 h-5 text-[#058343] shrink-0 mt-1" />}
                    </button>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="mt-6 space-y-2.5">
                <a
                  href={createWhatsAppLink(generateBirthdayInquiryMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#058343] hover:bg-[#046c36] text-white font-semibold text-xs sm:text-sm py-3.5 rounded-xl shadow-xs transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Consultar Disponibilidad en WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    const el = document.querySelector('#turnero');
                    if (el) {
                      const navHeight = 76;
                      const pos = el.getBoundingClientRect().top + window.pageYOffset;
                      window.scrollTo({ top: pos - navHeight, behavior: 'smooth' });
                    }
                    onBookBirthday();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold py-3 rounded-xl border border-slate-200 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-[#058343]" />
                  <span>Ir al Turnero y Elegir Fecha</span>
                </button>
              </div>

              {/* Phone inquiry reminder */}
              <div className="mt-4 pt-3 border-t border-slate-200 text-center text-xs text-slate-500 font-normal">
                <span>O llamanos al: </span>
                <a href={`tel:${COMPLEX_INFO.phone}`} className="text-[#058343] font-bold hover:underline">
                  {COMPLEX_INFO.phoneFormatted}
                </a>
                <span> / </span>
                <a href={`tel:${COMPLEX_INFO.altWhatsapp}`} className="text-[#058343] font-bold hover:underline">
                  {COMPLEX_INFO.altWhatsappFormatted}
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

