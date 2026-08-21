import React, { useState, useEffect, useRef } from 'react';
import { COMPLEX_INFO } from '../data/complexData';
import { createWhatsAppLink, generateGeneralInquiryWhatsAppMessage } from '../utils/whatsapp';
import { 
  CalendarCheck, 
  MessageCircle, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight
} from 'lucide-react';

export interface HeroSlide {
  id: string;
  disciplineId: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  imageUrl: string;
  badge: string;
  icon: string;
  scheduleText: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'futbol',
    disciplineId: 'futbol',
    title: 'Canchas de Fútbol 5 y 6 Sintético',
    subtitle: 'Césped Sintético Pro • Iluminación LED 400W',
    category: 'Fútbol Sintético',
    description: '3 canchas de fútbol 5 y 6 con césped sintético techado y protegido. Turnos diurnos y nocturnos, vestuarios completos y tercer tiempo.',
    imageUrl: '/futbol.jpeg',
    badge: '3 CANCHAS PRO',
    icon: '⚽',
    scheduleText: 'Lunes a Domingo de 08:00 a 23:30 hs'
  },
  {
    id: 'boxeo',
    disciplineId: 'boxeo',
    title: 'Boxeo Recreativo & Funcional',
    subtitle: 'Bolsas Everlast • Circuitos de Cardio y Técnica',
    category: 'Boxeo Recreativo',
    description: 'Entrenamiento recreativo y acondicionamiento físico para todos los niveles, enfocado en salud, coordinación y descarga de energía.',
    imageUrl: '/boxeo.jpeg',
    badge: 'BOLSAS EVERLAST',
    icon: '🥊',
    scheduleText: 'Lun, Mié y Vie: 08, 16, 17, 18, 19 hs • Mar y Jue: 17 y 18 hs'
  },
  {
    id: 'escuelita',
    disciplineId: 'escuelita',
    title: 'Iniciación Deportiva & Escuelita',
    subtitle: 'Chicos y Chicas de 4 a 12 Años • Juegos y Deportes',
    category: 'Iniciación Deportiva',
    description: 'Nenes y nenas aprendiendo deportes mediante juegos dinámicos, motricidad, compañerismo y diversión en un entorno seguro.',
    imageUrl: '/iniciacion.jpeg',
    badge: '4 A 12 AÑOS',
    icon: '👦',
    scheduleText: 'Mar y Jue (4-8 años) / Lun y Vie (9-12 años) • 17:00 a 18:30 hs'
  },
  {
    id: 'pilates',
    disciplineId: 'pilates',
    title: 'Pilates Reformer de Precisión',
    subtitle: 'Camas Reformer Completas • Grupos Reducidos',
    category: 'Pilates Reformer',
    description: 'Tonificación muscular profunda, corrección postural, flexibilidad y bienestar integral con atención personalizada.',
    imageUrl: '/pilates.jpeg',
    badge: 'CAMAS REFORMER',
    icon: '🧘‍♀️',
    scheduleText: 'Turnos mañana de 08:00 a 13:00 y tarde de 15:00 a 21:00 hs'
  },
  {
    id: 'cumpleanos',
    disciplineId: 'cumpleanos',
    title: 'Cumpleaños y Eventos Deportivos',
    subtitle: 'Cancha Exclusiva + Salón Privado y Pelotero',
    category: 'Cumpleaños & Festejos',
    description: 'Festejos infantiles y familiares inolvidables con profesor a cargo para coordinar partidos y juegos, pelotero y quincho.',
    imageUrl: '/cumple.jpeg',
    badge: 'SALÓN PRIVADO',
    icon: '🎂',
    scheduleText: 'Sábados, Domingos y Feriados disponibles'
  },
  {
    id: 'tercer-tiempo',
    disciplineId: 'futbol',
    title: 'Cantina, Parrilla y Tercer Tiempo',
    subtitle: 'El Lugar de Encuentro con Amigos Post-Partido',
    category: 'Tercer Tiempo',
    description: 'Bebidas heladas, minutas, parrilla y espacio social para disfrutar la pasión del deporte con amigos luego del partido.',
    imageUrl: '/tercer_tiempo.jpeg',
    badge: 'ESPACIO SOCIAL',
    icon: '🍻',
    scheduleText: 'Abierto todos los días de 08:00 a 23:30 hs'
  }
];

interface HeroProps {
  onOpenBooking: (discipline?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<any>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
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

  const currentSlide = HERO_SLIDES[currentIndex];

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const navHeight = 76;
      const pos = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: pos - navHeight, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="inicio" 
      className="relative w-full overflow-hidden bg-slate-950 select-none h-[100svh] min-h-[680px] flex flex-col"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* FULL WIDTH DYNAMIC SLIDER CONTAINER */}
      <div className="relative w-full flex-1">
        
        {/* Background Images with Smooth Crossfade */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-linear"
            />
            {/* Cinematic Gradient Overlays for Maximum Legibility & Brightness */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/35 to-transparent" />
          </div>
        ))}

        {/* Hero Overlay Content */}
        <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col pt-28 sm:pt-36 pb-6 sm:pb-8">
          
          {/* Center / Main Typography Area (Fixed height container with stacked crossfade) */}
          <div className="relative w-full max-w-3xl my-auto">
            
            {/* Slogan line (Fixed) */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#e31f24]">
                ELEGÍ EL PREDIO
              </span>
              <span className="text-white/40">•</span>
              <span className="text-xs sm:text-sm text-slate-300 font-medium">
                Complejo Deportivo • Calle 41 e/ 7 y 8, La Plata
              </span>
            </div>

            {/* STACKED SLIDE TEXTS - 100% Zero layout shift */}
            <div className="relative w-full h-[180px] sm:h-[200px] lg:h-[210px]">
              {HERO_SLIDES.map((slide, idx) => (
                <div
                  key={`text-${slide.id}`}
                  className={`absolute inset-0 flex flex-col justify-start transition-all duration-700 ease-out ${
                    idx === currentIndex 
                      ? 'opacity-100 translate-y-0 pointer-events-auto' 
                      : 'opacity-0 translate-y-3 pointer-events-none'
                  }`}
                >
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-2 sm:mb-2.5 drop-shadow-md">
                    {slide.title}
                  </h1>

                  <p className="text-emerald-400 text-sm sm:text-base lg:text-lg font-semibold mb-2">
                    {slide.subtitle}
                  </p>

                  <p className="text-slate-300 text-xs sm:text-sm lg:text-base line-clamp-2 font-normal leading-relaxed max-w-2xl">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Primary Action Button */}
            <div className="flex items-center pt-1">
              <button
                type="button"
                onClick={() => {
                  onOpenBooking(currentSlide.disciplineId);
                  scrollTo('#turnero');
                }}
                className="inline-flex items-center gap-2 bg-[#058343] hover:bg-[#046c36] text-white font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-[#058343]/30 transition-all hover:scale-[1.02] active:scale-98 shrink-0 whitespace-nowrap"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>RESERVAR TURNO ONLINE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Discipline Selector Buttons directly on Hero */}
          <div className="w-full pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`p-2.5 sm:p-3 rounded-2xl text-left border backdrop-blur-md transition-all duration-200 flex items-center gap-2.5 ${
                      isActive 
                        ? 'bg-black/60 border-[#058343] shadow-lg shadow-[#058343]/20 ring-1 ring-[#058343]' 
                        : 'bg-black/35 hover:bg-black/55 border-white/10 hover:border-white/20 text-slate-300'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl shrink-0">{slide.icon}</span>
                    <div className="min-w-0 flex-1">
                      <span className={`block text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>
                        {slide.category}
                      </span>
                      <span className={`block text-[10px] font-semibold truncate ${isActive ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                        {slide.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Side Navigation Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Slide anterior"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-[#058343] backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Slide siguiente"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/40 hover:bg-[#058343] backdrop-blur-md text-white border border-white/20 flex items-center justify-center transition-all hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

      </div>

    </section>
  );
};


