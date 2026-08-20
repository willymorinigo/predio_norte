import React, { useState } from 'react';
import { COMPLEX_INFO } from '../data/complexData';
import { createWhatsAppLink, generateGeneralInquiryWhatsAppMessage, generateBirthdayInquiryMessage, generateSoccerSchoolInquiryMessage } from '../utils/whatsapp';
import { MessageCircle, X, Phone } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Mini Popup Dialog */}
      {isOpen && (
        <div className="mb-3 bg-white border border-slate-200 rounded-3xl p-4 shadow-xl w-72 sm:w-80 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#058343] flex items-center justify-center text-white">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h5 className="font-bold text-slate-900 text-xs">Atención Predio Norte</h5>
                <span className="text-[10px] text-[#058343] font-semibold">● En línea ahora</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 mb-3 font-normal">
            ¡Hola! ¿En qué te podemos ayudar? Elegí una opción para chatear directo:
          </p>

          <div className="space-y-1.5">
            <a
              href={createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Reserva de canchas de fútbol 5 y 6'))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-800 border border-slate-200/70 hover:border-emerald-200 transition-colors"
            >
              <span className="text-base">⚽</span>
              <span>Reserva de Canchas de Fútbol</span>
            </a>

            <a
              href={createWhatsAppLink(generateBirthdayInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-800 border border-slate-200/70 hover:border-emerald-200 transition-colors"
            >
              <span className="text-base">🎂</span>
              <span>Festejo de Cumpleaños (Cuotas)</span>
            </a>

            <a
              href={createWhatsAppLink(generateSoccerSchoolInquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-800 border border-slate-200/70 hover:border-emerald-200 transition-colors"
            >
              <span className="text-base">👦</span>
              <span>Escuelita de Fútbol (4 a 12 años)</span>
            </a>

            <a
              href={createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Boxeo y Pilates'))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-800 border border-slate-200/70 hover:border-emerald-200 transition-colors"
            >
              <span className="text-base">🥊</span>
              <span>Boxeo / Pilates / Mood Gym</span>
            </a>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 text-center">
            <a
              href={`tel:${COMPLEX_INFO.phone}`}
              className="text-[11px] text-slate-500 hover:text-slate-900 flex items-center justify-center gap-1.5 font-medium"
            >
              <Phone className="w-3 h-3 text-[#058343]" />
              <span>Llamar al {COMPLEX_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir chat de WhatsApp"
        className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#058343] hover:bg-[#046c36] text-white shadow-xl shadow-[#058343]/30 hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>
        <MessageCircle className="w-7 h-7" />
      </button>
    </div>
  );
};

