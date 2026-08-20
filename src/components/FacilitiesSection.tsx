import React from 'react';
import { COURTS_AND_SPACES } from '../data/complexData';
import { 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';

export const FacilitiesSection: React.FC = () => {
  const facilityHighlights = [
    {
      title: '3 Canchas de Fútbol Sintético',
      desc: 'Césped sintético fibrilado y monofilamento de alta densidad para juego fluido, amortiguación óptima y menor impacto articular.',
      badge: 'FÚTBOL 5 Y 6',
      icon: '⚽',
      color: '#058343',
    },
    {
      title: 'Iluminación LED Profesional',
      desc: 'Luminarias LED de alta potencia que aseguran visibilidad total y uniforme en los turnos nocturnos, sin puntos ciegos ni reflejos molestos.',
      badge: 'VISIBILIDAD TOTAL',
      icon: '💡',
      color: '#058343',
    },
    {
      title: 'Vestuarios Completos',
      desc: 'Duchas con agua caliente continua, sanitarios limpios y lockers para mayor comodidad antes y después de cada partido o clase.',
      badge: 'CONFORT & HIGIENE',
      icon: '🚿',
      color: '#058343',
    },
    {
      title: 'Cantina & Tercer Tiempo',
      desc: 'Bebidas frías, snacks, mesas al aire libre e interiores, TV para ver fútbol en vivo y sector de parrilla para asados de equipo.',
      badge: 'QUINCHO & PARRILLA',
      icon: '🍔',
      color: '#058343',
    },
    {
      title: 'Espacio de Boxeo Everlast',
      desc: 'Sector equipado con bolsas pesadas Everlast, cuerdas, peras y piso de alto impacto para circuitos de entrenamiento y técnica.',
      badge: 'ALTO RENDIMIENTO',
      icon: '🥊',
      color: '#e31f24',
    },
    {
      title: 'Salón Privado Climatizado',
      desc: 'Salón cerrado con mesas, sillas, refrigeración y vista directa a las canchas para cumpleaños y eventos deportivos familiares.',
      badge: 'EVENTOS PRIVADOS',
      icon: '🎂',
      color: '#e31f24',
    },
  ];

  return (
    <section id="instalaciones" className="py-16 sm:py-20 bg-[#F8FAFC] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#058343]" />
            <span>Infraestructura & Comodidades</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            Nuestras <span className="text-[#058343]">Instalaciones</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-normal">
            Diseñadas para que vivas la mejor experiencia deportiva en la ciudad de La Plata.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {facilityHighlights.map((fac, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-[#058343]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shadow-xs">
                    {fac.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg tracking-wide">
                    {fac.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">
                  {fac.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {fac.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#058343]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Disponible en Predio Norte</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Courts List */}
        <div className="mt-10 sm:mt-12 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="text-2xl">⚽</span>
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Desglose de Espacios Deportivos
              </h4>
              <p className="text-xs text-slate-500 font-normal">Dimensiones, tipo de suelo y capacidades</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COURTS_AND_SPACES.slice(0, 3).map((court) => (
              <div key={court.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-bold text-sm text-slate-800">{court.name}</span>
                  <span className="text-[10px] text-[#058343] bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md font-bold">
                    {court.capacity}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-600 block mb-2">{court.surface}</span>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">{court.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

