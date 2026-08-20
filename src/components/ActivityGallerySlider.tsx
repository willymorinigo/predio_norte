import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { FlaticonBadge } from './DisciplineIcons';

export interface SlideItem {
  id: string;
  disciplineId: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  badge: string;
  accent: string;
  icon: string;
  stats: string;
}

const SLIDES: SlideItem[] = [
  {
    id: 'futbol-slide',
    disciplineId: 'futbol5',
    title: 'Canchas de Fútbol 5 y 6 Sintético',
    category: 'Fútbol & Torneos',
    description: 'Césped sintético fibrilado de alta amortiguación con iluminación LED 400W para disfrutar de partidos diurnos y nocturnos.',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
    badge: '3 CANCHAS PRO',
    accent: '#058343',
    icon: '⚽',
    stats: 'Lunes a Domingo • 08:00 a 23:30 hs'
  },
  {
    id: 'boxeo-slide',
    disciplineId: 'boxeo',
    title: 'Boxeo & Acondicionamiento Físico',
    category: 'Deportes de Contacto',
    description: 'Bolsas pesadas Everlast originales, entrenamiento de guardia, técnica de golpes y circuitos de alta intensidad para todos los niveles.',
    imageUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1200&q=80',
    badge: 'BOLSAS EVERLAST',
    accent: '#e31f24',
    icon: '🥊',
    stats: 'Profesores con +10 años de experiencia'
  },
  {
    id: 'pilates-slide',
    disciplineId: 'pilates',
    title: 'Pilates Reformer de Precisión',
    category: 'Salud & Postura',
    description: 'Camas reformer completas, corrección postural, tonificación muscular profunda y flexibilidad con atención personalizada.',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    badge: 'CAMAS REFORMER',
    accent: '#058343',
    icon: '🧘‍♀️',
    stats: 'Grupos reducidos • Turnos mañana y tarde'
  },
  {
    id: 'escuelita-slide',
    disciplineId: 'escuelita',
    title: 'Escuelita de Fútbol Infantil',
    category: 'Iniciación Recreativa',
    description: 'Para chicos y chicas de 4 a 12 años. Metodología basada en la formación inclusiva, valores de equipo y disfrute sin presión.',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    badge: '4 A 12 AÑOS',
    accent: '#058343',
    icon: '👦',
    stats: 'Mar y Jue / Lun y Vie • 17:00 a 18:30 hs'
  },
  {
    id: 'cumple-slide',
    disciplineId: 'cumpleanos',
    title: 'Cumpleaños y Eventos Deportivos',
    category: 'Festejos & Eventos',
    description: '3 horas completas de cancha exclusiva, profesor a cargo de las actividades, salón privado climatizado y financiación en 3 y 6 cuotas.',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
    badge: '3 Y 6 CUOTAS',
    accent: '#e31f24',
    icon: '🎂',
    stats: 'Sábados, domingos y feriados disponibles'
  },
  {
    id: 'tercer-tiempo-slide',
    disciplineId: 'futbol6',
    title: 'Cantina, Quincho y Tercer Tiempo',
    category: 'Comodidades & Relax',
    description: 'Disfrutá del post partido con bebidas heladas, parrilla, snacks y pantalla para ver los mejores partidos de la fecha con tu equipo.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    badge: 'ESPACIO SOCIAL',
    accent: '#058343',
    icon: '🍻',
    stats: 'Vestuarios con agua caliente y lockers'
  }
];

interface ActivityGallerySliderProps {
  onSelectActivity?: (disciplineId: string) => void;
}

export const ActivityGallerySlider: React.FC<ActivityGallerySliderProps> = ({ onSelectActivity }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<any>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentIndex]);

  const currentSlide = SLIDES[currentIndex];

  const handleAction = (disciplineId: string) => {
    if (onSelectActivity) {
      onSelectActivity(disciplineId);
    } else {
      const el = document.querySelector('#turnero');
      if (el) {
        const navHeight = 80;
        const pos = el.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: pos - navHeight, behavior: 'smooth' });
      }
    }
  };

  return (
    <div 
      className="w-full relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Slide Card */}
      <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden shadow-xl bg-slate-900 border border-slate-200/80">
        {/* Background Image with Crossfade */}
        {SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-linear"
            />
            {/* Minimalist Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent hidden md:block" />
          </div>
        ))}

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 text-white">
          
          {/* Top Row: Category + Badge + Flaticon pill */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-[#058343] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                {currentSlide.icon} {currentSlide.category}
              </span>
              <span className="bg-[#e31f24] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                {currentSlide.badge}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white/90 border border-white/10 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{currentSlide.stats}</span>
            </div>
          </div>

          {/* Bottom Area: Title, Description & Action */}
          <div className="max-w-2xl">
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2 sm:mb-3 drop-shadow-md">
              {currentSlide.title}
            </h3>
            
            <p className="text-white/85 text-xs sm:text-base line-clamp-2 sm:line-clamp-3 mb-6 font-normal leading-relaxed max-w-xl">
              {currentSlide.description}
            </p>

            {/* CTAs and Slide Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleAction(currentSlide.disciplineId)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#058343] hover:bg-[#046c36] text-white text-sm font-semibold shadow-lg shadow-[#058343]/30 transition-all hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4" />
                <span>Reservar esta Actividad</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.querySelector('#disciplinas');
                  if (el) {
                    const navHeight = 80;
                    const pos = el.getBoundingClientRect().top + window.pageYOffset;
                    window.scrollTo({ top: pos - navHeight, behavior: 'smooth' });
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-medium border border-white/20 transition-colors"
              >
                Ver Ficha & Horarios
              </button>
            </div>
          </div>

        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Slide anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Slide siguiente"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnails / Pills Selector Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-3">
        {SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`p-2.5 rounded-2xl text-left border transition-all flex items-center gap-2.5 ${
                isActive 
                  ? 'bg-white border-[#058343] shadow-md shadow-[#058343]/10 ring-1 ring-[#058343]' 
                  : 'bg-white/70 hover:bg-white border-slate-200 text-slate-600'
              }`}
            >
              <span className="text-lg shrink-0">{slide.icon}</span>
              <div className="min-w-0 flex-1">
                <span className={`block text-xs font-semibold truncate ${isActive ? 'text-[#058343]' : 'text-slate-700'}`}>
                  {slide.category}
                </span>
                <span className="block text-[10px] text-slate-400 truncate">
                  {slide.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
