import React from 'react';
import { COMPLEX_INFO } from '../data/complexData';
import { Clock, Calendar, ShieldCheck } from 'lucide-react';

export const SchedulesSection: React.FC = () => {
  const scheduleCards = [
    {
      id: 'boxeo',
      category: 'boxeo',
      title: 'Horarios de Boxeo',
      badge: 'BOLSAS EVERLAST & TÉCNICA',
      icon: '🥊',
      items: [
        { label: 'Lunes', value: '08:00, 17:00, 18:00 y 19:00 hs' },
        { label: 'Miércoles y Viernes', value: '08:00, 16:00, 17:00, 18:00 y 19:00 hs' },
        { label: 'Martes y Jueves', value: '17:00 y 18:00 hs' },
        { label: 'Sábados', value: '11:00 hs' },
      ],
      note: 'Profesores con más de 10 años de experiencia.',
    },
    {
      id: 'pilates',
      category: 'pilates',
      title: 'Horarios de Pilates Reformer',
      badge: 'CAMAS REFORMER & MAT',
      icon: '🧘‍♀️',
      items: [
        { label: 'Lunes, Miércoles y Viernes', value: '08:00 a 13:00 y 15:00 a 21:00 hs' },
        { label: 'Martes y Jueves', value: '08:00 a 12:00 y 15:00 a 21:00 hs' },
      ],
      note: 'Atención personalizada en grupos reducidos.',
    },
    {
      id: 'escuelita',
      category: 'escuelita',
      title: 'Escuelita de Fútbol Infantil',
      badge: '4 A 12 AÑOS • FORMATIVA',
      icon: '👦',
      items: [
        { label: 'Grupos 4-5 y 7-8 años (Mar y Jue)', value: '17:00 a 18:30 hs' },
        { label: 'Grupos 9-10 y 11-12 años (Lun y Vie)', value: '17:00 a 18:30 hs' },
      ],
      note: 'Filosofía formativa no competitiva. Cupos abiertos.',
    },
    {
      id: 'cumpleanos',
      category: 'cumpleanos',
      title: 'Cumpleaños y Eventos',
      badge: 'SÁBADOS, DOMINGOS Y FERIADOS',
      icon: '🎂',
      items: [
        { label: 'Franja Tarde 1', value: '13:00 a 16:00 hs' },
        { label: 'Franja Tarde 2', value: '17:30 a 20:30 hs' },
        { label: 'Franja Noche', value: '18:00 a 21:00 hs' },
      ],
      note: 'Incluye 3 horas de cancha, profesor, salón y 3 o 6 cuotas.',
    },
  ];

  return (
    <section id="horarios" className="py-16 sm:py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Clock className="w-3.5 h-3.5 text-[#058343]" />
            <span>Horarios Oficiales</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            Grilla Semanal de <span className="text-[#058343]">Predio Norte</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-normal">
            Consultá los días y horarios exactos de cada disciplina para organizar tu semana.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {scheduleCards.map((card) => (
            <div
              key={card.id}
              className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-6 flex flex-col justify-between shadow-xs hover:border-[#058343]/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-xs">
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-md bg-[#058343] text-white tracking-wide">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">
                  {card.title}
                </h3>

                <div className="space-y-2.5">
                  {card.items.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-3 border border-slate-100 flex flex-col shadow-xs">
                      <span className="text-[11px] font-bold text-[#058343] uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-slate-800 mt-0.5">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200/80 text-xs text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#058343] shrink-0" />
                <span>{card.note}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

