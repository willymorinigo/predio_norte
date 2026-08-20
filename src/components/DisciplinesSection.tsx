import React, { useState } from 'react';
import { DISCIPLINES, COMPLEX_INFO } from '../data/complexData';
import { createWhatsAppLink, generateGeneralInquiryWhatsAppMessage } from '../utils/whatsapp';
import { 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  CalendarCheck, 
  Dumbbell, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

interface DisciplinesSectionProps {
  onSelectDiscipline: (disciplineId: string) => void;
}

export const DisciplinesSection: React.FC<DisciplinesSectionProps> = ({ onSelectDiscipline }) => {
  const [activeDisciplineId, setActiveDisciplineId] = useState<string>(DISCIPLINES[0].id);

  const getFlaticon = (id: string) => {
    switch (id) {
      case 'futbol':
        return '⚽';
      case 'boxeo':
        return '🥊';
      case 'pilates':
        return '🧘‍♀️';
      case 'escuelita':
        return '👦';
      case 'cumpleanos':
        return '🎂';
      default:
        return '🏆';
    }
  };

  const selectedDiscipline = DISCIPLINES.find(d => d.id === activeDisciplineId) || DISCIPLINES[0];

  return (
    <section id="actividades" className="py-16 sm:py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#058343]" />
            <span>Nuestras Disciplinas & Fichas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3">
            Actividades y <span className="text-[#058343]">Deportes</span> en Predio
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-normal leading-relaxed">
            Una amplia variedad de actividades pensadas para quienes buscan entrenar, divertirse y complementar su salud con profesionales capacitados.
          </p>
        </div>

        {/* Disciplines Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {DISCIPLINES.map((d) => {
            const isActive = activeDisciplineId === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setActiveDisciplineId(d.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#058343] text-white shadow-md shadow-[#058343]/20 scale-102'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <span className="text-base">{getFlaticon(d.id)}</span>
                <span>{d.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Discipline Detailed Card */}
        <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#058343] text-white text-[11px] font-bold uppercase px-3 py-1 rounded-full shadow-xs">
                  {selectedDiscipline.badge}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {selectedDiscipline.targetAudience}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl p-2.5 bg-white rounded-2xl border border-slate-200 shadow-xs">
                  {getFlaticon(selectedDiscipline.id)}
                </span>
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                    {selectedDiscipline.name}
                  </h3>
                  <p className="text-[#058343] font-medium text-sm sm:text-base mt-0.5">
                    "{selectedDiscipline.tagline}"
                  </p>
                </div>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                {selectedDiscipline.shortDescription}
              </p>

              {/* Features checklist */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Qué incluye & características:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedDiscipline.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-[#058343] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    const el = document.querySelector('#turnero');
                    if (el) {
                      const navHeight = 76;
                      const pos = el.getBoundingClientRect().top + window.pageYOffset;
                      window.scrollTo({ top: pos - navHeight, behavior: 'smooth' });
                    }
                    onSelectDiscipline(selectedDiscipline.id);
                  }}
                  className="flex items-center gap-2 bg-[#058343] hover:bg-[#046c36] text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-sm transition-all"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Reservar en {selectedDiscipline.name.split(' ')[0]}</span>
                </button>

                <a
                  href={createWhatsAppLink(generateGeneralInquiryWhatsAppMessage(`Actividad: ${selectedDiscipline.name}`))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl border border-slate-200 shadow-xs transition-all"
                >
                  <span>Consultar por WhatsApp</span>
                  <ArrowRight className="w-4 h-4 text-[#058343]" />
                </a>
              </div>

            </div>

            {/* Right Schedules & Highlights Box */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                  <Clock className="w-4 h-4 text-[#058343]" />
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Días y Horarios Oficiales
                  </span>
                </div>

                <div className="space-y-2.5">
                  {selectedDiscipline.scheduleDetails.map((sch, i) => (
                    <div key={i} className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
                      <span className="text-xs font-bold text-[#058343] block mb-0.5">
                        {sch.days}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-slate-700">
                        {sch.hours}
                      </span>
                    </div>
                  ))}
                </div>

                {selectedDiscipline.priceNote && (
                  <div className="mt-4 p-3 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs text-slate-600">
                    💡 <strong className="text-slate-800">Nota:</strong> {selectedDiscipline.priceNote}
                  </div>
                )}
              </div>

              {/* Gym Partner Highlight */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-4 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#e31f24] flex items-center justify-center font-bold text-lg shrink-0">
                    🏋️‍♂️
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Convenio con {COMPLEX_INFO.partnerGym} ({COMPLEX_INFO.partnerGymHandle})
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Descuentos especiales combinando con musculación.
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

