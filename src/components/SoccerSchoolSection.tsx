import React from 'react';
import { COMPLEX_INFO } from '../data/complexData';
import { createWhatsAppLink, generateSoccerSchoolInquiryMessage } from '../utils/whatsapp';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MessageCircle, 
  ShieldCheck 
} from 'lucide-react';

interface SoccerSchoolSectionProps {
  onBookTrialClass: () => void;
}

export const SoccerSchoolSection: React.FC<SoccerSchoolSectionProps> = ({ onBookTrialClass }) => {
  const ageGroups = [
    {
      ages: '4, 5 y 6 Años',
      badge: 'INICIACIÓN & JUEGO',
      schedule: 'Martes y Jueves • 17:00 a 18:30 hs',
      icon: '⚽',
      objectives: [
        'Desarrollo de la técnica de pase y recepción del balón',
        'Conducción del balón con ambos perfiles',
        'Técnica básica de definición frente al arquero',
        'Juegos de coordinación motriz y compañerismo',
      ],
    },
    {
      ages: '7 y 8 Años',
      badge: 'COORDINACIÓN & TÁCTICA',
      schedule: 'Martes y Jueves • 17:00 a 18:30 hs',
      icon: '🏃‍♂️',
      objectives: [
        'Identificar las posiciones de campo (ataque y defensa)',
        'Desarrollo y estimulación de la coordinación espacial',
        'Perfeccionar pase, recepción orientada y conducción rápida',
        'Definición frente al arquero y toma de decisiones',
      ],
    },
    {
      ages: '9, 10 y 11, 12 Años',
      badge: 'PERFECCIONAMIENTO',
      schedule: 'Lunes y Viernes • 17:00 a 18:30 hs',
      icon: '🏅',
      objectives: [
        'Perfeccionar contenidos adquiridos mediante entrenamiento dinámico',
        'Incorporación de transiciones ataque-defensa y repliegues',
        'Concepto de relevos, apoyos y juego colectivo en equipo',
        'Preparación física adaptada y partidos reducidos',
      ],
    },
  ];

  return (
    <section id="escuelita" className="py-16 sm:py-20 bg-[#F8FAFC] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#058343]" />
            <span>Formación Recreativa & Inclusiva</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            Escuelita de <span className="text-[#058343]">Fútbol Infantil</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            Una actividad recreativa para chicos de 4 a 12 años que apunta a formar en el deporte con una filosofía <strong>inclusiva y no competitiva</strong>.
          </p>
        </div>

        {/* Philosophy Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 flex items-start gap-3.5 shadow-xs">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-2xl flex items-center justify-center shrink-0">
              🤝
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">Filosofía Inclusiva</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Priorizamos la diversión, el compañerismo y el amor por el deporte por sobre la presión del resultado.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 flex items-start gap-3.5 shadow-xs">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-2xl flex items-center justify-center shrink-0">
              👥
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">Grupos por Edades</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Contenidos pedagógicos adaptados a cada etapa del desarrollo motriz y social de cada niño y niña.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-3xl p-5 flex items-start gap-3.5 shadow-xs">
            <div className="w-11 h-11 rounded-2xl bg-red-50 text-2xl flex items-center justify-center shrink-0">
              🎓
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-1">Profesores Capacitados</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">
                Docentes de educación física con más de 10 años de experiencia en iniciación y formación deportiva.
              </p>
            </div>
          </div>
        </div>

        {/* Age Categories Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 mb-10 sm:mb-12">
          {ageGroups.map((group, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[#058343]/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase text-white px-2.5 py-0.5 rounded-full bg-[#058343] tracking-wide">
                    {group.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Predio Norte</span>
                </div>

                <div className="flex items-center gap-2.5 mb-3">
                  <span className="text-2xl">{group.icon}</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {group.ages}
                  </h3>
                </div>

                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 mb-4 flex items-center gap-2 text-xs font-semibold text-[#058343]">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{group.schedule}</span>
                </div>

                <div className="space-y-2 mb-6">
                  <span className="text-[11px] uppercase font-bold text-slate-600 tracking-wider block">
                    Objetivos de aprendizaje:
                  </span>
                  {group.objectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-[#058343] shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-[11px] text-slate-500 block mb-3 font-medium">
                  ¡Cupos abiertos para sumarse todo el año!
                </span>
                <button
                  onClick={() => {
                    const el = document.querySelector('#turnero');
                    if (el) {
                      const navHeight = 76;
                      const pos = el.getBoundingClientRect().top + window.pageYOffset;
                      window.scrollTo({ top: pos - navHeight, behavior: 'smooth' });
                    }
                    onBookTrialClass();
                  }}
                  className="w-full py-3 rounded-xl bg-[#058343] hover:bg-[#046c36] text-white font-semibold text-xs transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Anotar para Clase de Prueba</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <span className="bg-[#e31f24] text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full tracking-wide mb-2 inline-block">
              Elegí Predio
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              ¿Querés que tus chicos vengan a probar?
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-xl font-normal">
              Comunicate con nosotros por WhatsApp para coordinar una primera clase de prueba sin compromiso y conocer a los profes y el grupo.
            </p>
          </div>

          <a
            href={createWhatsAppLink(generateSoccerSchoolInquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-[#058343] font-semibold text-xs sm:text-sm px-5 py-3 rounded-xl border border-emerald-200 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};

