import React, { useState } from 'react';
import { COMPLEX_INFO } from '../data/complexData';
import { createWhatsAppLink } from '../utils/whatsapp';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Instagram, 
  Facebook, 
  Clock, 
  Send, 
  CheckCircle2, 
  Navigation 
} from 'lucide-react';

export const LocationAndContact: React.FC = () => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formTopic, setFormTopic] = useState('Consulta general');
  const [formMessage, setFormMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `¡Hola Predio Norte! 👋 Mi nombre es ${formName} (Tel: ${formPhone}). Quiero consultar sobre: *${formTopic}*. Mensaje: ${formMessage}`;
    const url = createWhatsAppLink(text);
    window.open(url, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contacto" className="py-16 sm:py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#058343]" />
            <span>Ubicación & Contacto</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-3">
            Vení a Conocer <span className="text-[#058343]">Predio Norte</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            Estamos ubicados en pleno centro de La Plata, en <strong>Calle 41 e/ 7 y 8</strong>, con fácil acceso y comodidades para jugadores y familias.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info Cards & Map */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Address Card */}
              <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-5 shadow-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-xl flex items-center justify-center">
                    📍
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                      Dirección
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm">
                      {COMPLEX_INFO.address}
                    </h4>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2 font-normal">
                  La Plata, Buenos Aires, Argentina.
                </p>
                <a
                  href={COMPLEX_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#058343] hover:underline font-semibold mt-3"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Abrir en Google Maps</span>
                </a>
              </div>

              {/* Phone & WhatsApp Card */}
              <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-5 shadow-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-xl flex items-center justify-center">
                    📞
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                      Teléfonos
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm">
                      {COMPLEX_INFO.phoneFormatted}
                    </h4>
                  </div>
                </div>
                <div className="space-y-1 text-xs text-slate-500 mt-2 font-normal">
                  <p>WhatsApp 1: <strong className="text-slate-800">{COMPLEX_INFO.whatsappFormatted}</strong></p>
                  <p>WhatsApp 2: <strong className="text-slate-800">{COMPLEX_INFO.altWhatsappFormatted}</strong></p>
                </div>
              </div>

              {/* Opening Hours Card */}
              <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-5 shadow-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-xl flex items-center justify-center">
                    ⏰
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                      Horarios de Atención
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm">
                      Todos los días abierto
                    </h4>
                  </div>
                </div>
                <div className="text-xs text-slate-500 space-y-1 mt-2 font-normal">
                  <p>Lun a Vie: <strong className="text-slate-800">08:00 a 23:30 hs</strong></p>
                  <p>Sábados: <strong className="text-slate-800">10:00 a 23:30 hs</strong></p>
                  <p>Domingos: <strong className="text-slate-800">13:00 a 23:30 hs</strong></p>
                </div>
              </div>

              {/* Social Channels Card */}
              <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-5 shadow-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-red-50 text-xl flex items-center justify-center">
                    🌐
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                      Redes Sociales
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm">
                      @{COMPLEX_INFO.instagram}
                    </h4>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <a
                    href={COMPLEX_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white text-slate-700 hover:text-[#058343] border border-slate-200 transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-xs"
                  >
                    <Instagram className="w-4 h-4 text-pink-600" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={COMPLEX_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white text-slate-700 hover:text-blue-600 border border-slate-200 transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-xs"
                  >
                    <Facebook className="w-4 h-4 text-blue-600" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Map Display */}
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-6 relative overflow-hidden shadow-xs">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 tracking-tight">
                    Plano de Ubicación
                  </h4>
                  <p className="text-xs text-slate-500 font-normal">
                    Calle 41 e/ 7 y 8, Ciudad de La Plata
                  </p>
                </div>
                <a
                  href={COMPLEX_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#058343] hover:bg-[#046c36] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Cómo llegar</span>
                </a>
              </div>

              {/* Map Canvas */}
              <div className="w-full h-56 rounded-2xl bg-slate-100 border border-slate-200 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />
                
                <div className="absolute top-1/2 left-0 right-0 h-5 bg-white border-y border-slate-300 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-600 tracking-widest uppercase">CALLE 41</span>
                </div>
                <div className="absolute top-0 bottom-0 left-1/3 w-5 bg-white border-x border-slate-300 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-600 tracking-widest uppercase rotate-90">CALLE 7</span>
                </div>
                <div className="absolute top-0 bottom-0 right-1/3 w-5 bg-white border-x border-slate-300 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-600 tracking-widest uppercase rotate-90">CALLE 8</span>
                </div>

                {/* Location Marker Pin */}
                <div className="relative z-10 flex flex-col items-center animate-bounce">
                  <div className="px-3.5 py-1.5 rounded-xl bg-[#058343] text-white font-bold text-xs shadow-md border border-emerald-400 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>PREDIO NORTE</span>
                  </div>
                  <div className="w-3 h-3 bg-[#058343] rotate-45 -mt-1.5 shadow" />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Contact Form */}
          <div className="lg:col-span-5">
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
              
              <div className="border-b border-slate-200 pb-4 mb-5">
                <span className="bg-[#058343] text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full tracking-wide">
                  Elegí Predio
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                  Envianos tu Consulta
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  Escribinos tus dudas y te responderemos por WhatsApp al instante.
                </p>
              </div>

              {sent && (
                <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-slate-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#058343] shrink-0" />
                  <span>¡Mensaje preparado! Te redirigimos al WhatsApp oficial para enviarlo.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tu Nombre y Apellido
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Laura Gómez"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl p-3 focus:outline-none focus:border-[#058343] shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tu Número de Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej: 221 444-5555"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl p-3 focus:outline-none focus:border-[#058343] shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Motivo de Consulta
                  </label>
                  <select
                    value={formTopic}
                    onChange={(e) => setFormTopic(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl p-3 focus:outline-none focus:border-[#058343] shadow-xs"
                  >
                    <option value="Canchas de Fútbol 5 y 6">Canchas de Fútbol 5 y 6</option>
                    <option value="Turnos Fijos Semanales">Turnos Fijos Semanales</option>
                    <option value="Boxeo & Entrenamiento">Boxeo & Entrenamiento</option>
                    <option value="Pilates Reformer">Pilates Reformer</option>
                    <option value="Escuelita de Fútbol Infantil">Escuelita de Fútbol Infantil</option>
                    <option value="Festejo de Cumpleaños (3 y 6 Cuotas)">Festejo de Cumpleaños (3 y 6 Cuotas)</option>
                    <option value="Convenio Mood Gimnasio">Convenio Mood Gimnasio</option>
                    <option value="Consulta general">Otra consulta</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mensaje / Detalle
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Escribí aquí tu consulta sobre días, horarios o disponibilidad..."
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-800 text-xs rounded-xl p-3 focus:outline-none focus:border-[#058343] shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#058343] hover:bg-[#046c36] text-white font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Consulta a WhatsApp</span>
                </button>

                <p className="text-[11px] text-center text-slate-400 font-normal">
                  Respuesta directa de los encargados de Predio Norte ({COMPLEX_INFO.whatsappFormatted}).
                </p>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

