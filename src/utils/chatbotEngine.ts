import { COMPLEX_INFO, DISCIPLINES, COURTS_AND_SPACES, FAQS } from '../data/complexData';
import { createWhatsAppLink, generateGeneralInquiryWhatsAppMessage, generateBirthdayInquiryMessage, generateSoccerSchoolInquiryMessage } from './whatsapp';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  action?: {
    type: 'whatsapp' | 'scroll' | 'link';
    label: string;
    url?: string;
    targetId?: string;
    icon?: string;
  };
  secondaryAction?: {
    type: 'whatsapp' | 'scroll' | 'link';
    label: string;
    url?: string;
    targetId?: string;
    icon?: string;
  };
  suggestions?: string[];
}

export const INITIAL_SUGGESTIONS = [
  '⚽ Reservar Cancha de Fútbol',
  '🎂 Cumpleaños y Fiestas (Cuotas)',
  '👦 Escuelita de Fútbol (4 a 12 años)',
  '🥊 Horarios de Boxeo',
  '🧘‍♀️ Pilates Reformer',
  '💰 Precios y Medios de Pago',
  '📍 Ubicación y Horarios del Predio',
];

export function getBotResponse(userMessage: string): Omit<ChatMessage, 'id' | 'timestamp'> {
  const query = userMessage.toLowerCase().trim();

  // 1. FUTBOL / CANCHAS / TURNOS
  if (
    query.includes('futbol') || 
    query.includes('fútbol') || 
    query.includes('cancha') || 
    query.includes('partido') || 
    query.includes('sintetico') || 
    query.includes('sintético') || 
    query.includes('turno') ||
    query.includes('pelota') ||
    query.includes('pechera') ||
    query.includes('luz') ||
    query.includes('led')
  ) {
    const isPrice = query.includes('precio') || query.includes('cuanto') || query.includes('cuánto') || query.includes('cuesta') || query.includes('valor') || query.includes('tarifa');
    const isFixed = query.includes('fijo') || query.includes('mensual') || query.includes('semanal');

    if (isFixed) {
      return {
        sender: 'bot',
        text: `⚽ *Turnos Fijos Semanales en Predio Norte:*\n\n• Te aseguramos el mismo día y horario todas las semanas del mes.\n• Mantenés la tarifa congelada con prioridad absoluta y no tenés que estar reservando cada semana.\n• Contamos con 3 canchas de fútbol 5 y 6 con césped sintético y luces LED 400W.\n• Incluye vestuarios con duchas y cantina para el tercer tiempo.\n\n¿Querés consultar disponibilidad para tu turno fijo?`,
        action: {
          type: 'whatsapp',
          label: 'Consultar Turno Fijo por WhatsApp',
          url: createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Disponibilidad de Turno Fijo Semanal de Fútbol')),
          icon: 'MessageCircle',
        },
        secondaryAction: {
          type: 'scroll',
          label: 'Ver Turnero Online',
          targetId: 'turnero',
          icon: 'Calendar',
        },
        suggestions: ['💰 Precios de canchas', '🍻 Tercer tiempo y quincho', '🎂 Cumpleaños en Predio'],
      };
    }

    return {
      sender: 'bot',
      text: `⚽ *Canchas de Fútbol 5 y 6 en Predio Norte:*\n\n• 3 canchas de césped sintético de alta densidad.\n• Iluminación LED profesional de 400W.\n• Vestuarios completos con duchas de agua caliente.\n• Pelotas y pecheras disponibles sin cargo.\n• Quincho, TV y cantina para el tercer tiempo.\n\n${isPrice ? '💵 *Valores orientativos:* Turnos simples desde $22.000 / hora (consultá descuentos especiales por abono fijo mensual).' : '⏰ *Horarios:* Lun a Vie de 08:00 a 23:30 hs, Sáb de 10:00 a 23:30 hs, Dom de 13:00 a 23:30 hs.'}\n\nPodés consultar disponibilidad inmediata por WhatsApp o reservar desde el turnero web:`,
      action: {
        type: 'whatsapp',
        label: 'Reservar Cancha por WhatsApp',
        url: createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Reserva de cancha de fútbol')),
        icon: 'MessageCircle',
      },
      secondaryAction: {
        type: 'scroll',
        label: 'Ir al Turnero Online',
        targetId: 'turnero',
        icon: 'Calendar',
      },
      suggestions: ['¿Cómo funciona el Turno Fijo?', '🍺 Tercer tiempo y quincho', '📍 ¿Dónde queda el predio?'],
    };
  }

  // 2. CUMPLEAÑOS / EVENTOS / FIESTAS
  if (
    query.includes('cumple') || 
    query.includes('cumpleaños') || 
    query.includes('evento') || 
    query.includes('fiesta') || 
    query.includes('festejo') || 
    query.includes('salon') || 
    query.includes('salón') || 
    query.includes('quincho')
  ) {
    return {
      sender: 'bot',
      text: `🎂 *Festejos de Cumpleaños y Eventos en Predio Norte:*\n\n¡El cumple más divertido con todo resuelto!\n\n✨ *El paquete incluye:*\n• *3 horas completas* de cancha exclusiva para juegos y partidos.\n• *Profesor/a especializado* a cargo de coordinar dinámicas deportivas.\n• *Encargado del predio* dedicado durante todo tu evento.\n• *Salón privado* ambientado con mesas, sillas, heladeras y freezer.\n• *💳 Facilidades de pago:* ¡Podés abonar en 3 y 6 cuotas con tarjeta!\n\n⏰ *Turnos disponibles:* Sábados, Domingos y Feriados (13:00 a 16:00 hs / 17:30 a 20:30 hs / 18:00 a 21:00 hs).`,
      action: {
        type: 'whatsapp',
        label: 'Presupuestar Cumpleaños por WhatsApp',
        url: createWhatsAppLink(generateBirthdayInquiryMessage()),
        icon: 'MessageCircle',
      },
      secondaryAction: {
        type: 'scroll',
        label: 'Ver Sección de Cumpleaños',
        targetId: 'cumpleanos',
        icon: 'Sparkles',
      },
      suggestions: ['💳 ¿Cómo es el pago en cuotas?', '👦 Escuelita de Fútbol', '⚽ Reservar Cancha'],
    };
  }

  // 3. ESCUELITA DE FÚTBOL INFANTIL
  if (
    query.includes('escuelita') || 
    query.includes('chicos') || 
    query.includes('nene') || 
    query.includes('nena') || 
    query.includes('niño') || 
    query.includes('infantil') || 
    query.includes('4 a 12') ||
    query.includes('edad')
  ) {
    return {
      sender: 'bot',
      text: `👦 *Escuelita de Fútbol Infantil (4 a 12 años):*\n\nNuestra escuelita tiene un enfoque formativo, inclusivo y no competitivo: ¡aprender jugando, con técnica y valores!\n\n🗓️ *Grupos y Horarios:*\n• *4 a 8 años:* Martes y Jueves de 17:00 a 18:30 hs.\n• *9 a 12 años:* Lunes y Viernes de 17:00 a 18:30 hs.\n\n⭐ *Profesores de educación física dedicados.*\n🎁 *¡La primera clase es de prueba sin compromiso para que conozca el predio!*\n\n¿Querés anotar a tu hijo/a o consultar cupos disponibles?`,
      action: {
        type: 'whatsapp',
        label: 'Consultar por Escuelita en WhatsApp',
        url: createWhatsAppLink(generateSoccerSchoolInquiryMessage()),
        icon: 'MessageCircle',
      },
      secondaryAction: {
        type: 'scroll',
        label: 'Ver Info de Escuelita',
        targetId: 'escuelita',
        icon: 'Smile',
      },
      suggestions: ['🎂 Cumpleaños infantiles', '⚽ Canchas de fútbol', '📍 ¿Dónde queda Predio?'],
    };
  }

  // 4. BOXEO / ENTRENAMIENTO FUNCIONAL
  if (
    query.includes('boxeo') || 
    query.includes('box') || 
    query.includes('guante') || 
    query.includes('bolsa') || 
    query.includes('everlast') || 
    query.includes('funcional') || 
    query.includes('cardio')
  ) {
    return {
      sender: 'bot',
      text: `🥊 *Boxeo Recreativo & Entrenamiento Funcional:*\n\nEntrenamiento técnico y acondicionamiento físico de alto impacto para mujeres y hombres de todos los niveles.\n\n🥊 *Equipamiento:* Bolsas Everlast pesadas, guantes, sogas y circuito funcional con profesores de más de 10 años de trayectoria.\n\n⏰ *Horarios:*\n• *Lunes:* 08:00, 17:00, 18:00 y 19:00 hs.\n• *Miércoles y Viernes:* 08:00, 16:00, 17:00, 18:00 y 19:00 hs.\n• *Martes y Jueves:* 17:00 y 18:00 hs.\n• *Sábados:* 11:00 hs.\n\n💪 *Convenio especial:* Descuento combinando con @moodgimnasio para sala de musculación.`,
      action: {
        type: 'whatsapp',
        label: 'Consultar Boxeo por WhatsApp',
        url: createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Boxeo Recreativo y Funcional')),
        icon: 'MessageCircle',
      },
      secondaryAction: {
        type: 'scroll',
        label: 'Ver Horarios Completos',
        targetId: 'horarios',
        icon: 'Clock',
      },
      suggestions: ['🧘‍♀️ Pilates Reformer', '💪 Convenio con Mood Gimnasio', '💰 Precios y formas de pago'],
    };
  }

  // 5. PILATES REFORMER
  if (
    query.includes('pilate') || 
    query.includes('pilates') || 
    query.includes('reformer') || 
    query.includes('cama') || 
    query.includes('postura') || 
    query.includes('elongacion') || 
    query.includes('elongación')
  ) {
    return {
      sender: 'bot',
      text: `🧘‍♀️ *Pilates Reformer & Bienestar Postural:*\n\nClases dinámicas en camas reformer para tonificar, elongar, mejorar la postura y aliviar dolores lumbares y cervicales.\n\n🌿 *Características:*\n• Grupos reducidos con atención súper personalizada.\n• Camas reformer de alta precisión y ambiente climatizado.\n• Instructores certificados.\n\n⏰ *Horarios:*\n• *Lun, Mié y Vie:* 08:00 a 13:00 y 15:00 a 21:00 hs.\n• *Mar y Jue:* 08:00 a 12:00 y 15:00 a 21:00 hs.\n\nContamos con planes de 2 y 3 veces por semana. ¿Querés coordinar tu turno?`,
      action: {
        type: 'whatsapp',
        label: 'Consultar Pilates por WhatsApp',
        url: createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Pilates Reformer')),
        icon: 'MessageCircle',
      },
      secondaryAction: {
        type: 'scroll',
        label: 'Ver Todos los Horarios',
        targetId: 'horarios',
        icon: 'Clock',
      },
      suggestions: ['🥊 Boxeo y Funcional', '💪 Convenio con Gimnasio Mood', '📍 Dirección del predio'],
    };
  }

  // 6. PRECIOS / TARIFAS / FORMAS DE PAGO / CUOTAS
  if (
    query.includes('precio') || 
    query.includes('cuanto') || 
    query.includes('cuánto') || 
    query.includes('cuesta') || 
    query.includes('tarifa') || 
    query.includes('pago') || 
    query.includes('tarjeta') || 
    query.includes('cuota') || 
    query.includes('transferencia') || 
    query.includes('mercado pago') ||
    query.includes('mercadopago')
  ) {
    return {
      sender: 'bot',
      text: `💳 *Precios y Medios de Pago en Predio Norte:*\n\n• *Canchas de Fútbol:* Turnos simples desde $22.000/hora. Contamos con descuentos especiales contratando Turnos Fijos Mensuales.\n• *Cumpleaños & Fiestas:* Paquetes de 3 horas todo incluido, con opción de financiar en *3 y 6 cuotas con tarjeta*.\n• *Escuelita de Fútbol:* Cuota mensual accesible, con primera clase de prueba gratuita.\n• *Boxeo y Pilates:* Pases mensuales (2 o 3 veces por semana o libre) con descuentos por multi-actividad y convenio @moodgimnasio.\n\n💵 *Medios de pago:* Efectivo, Transferencia / Mercado Pago, Tarjetas de Débito y Crédito.`,
      action: {
        type: 'whatsapp',
        label: 'Pedir Presupuesto Exacto por WhatsApp',
        url: createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Consulta de Tarifas y Medios de Pago')),
        icon: 'MessageCircle',
      },
      secondaryAction: {
        type: 'scroll',
        label: 'Ver Turnero Online',
        targetId: 'turnero',
        icon: 'Calendar',
      },
      suggestions: ['⚽ Reservar Cancha de Fútbol', '🎂 Presupuesto de Cumpleaños', '🥊 Horarios de Boxeo'],
    };
  }

  // 7. UBICACIÓN / DIRECCIÓN / DÓNDE QUEDA / MAPA / CÓMO LLEGAR
  if (
    query.includes('ubicacion') || 
    query.includes('ubicación') || 
    query.includes('donde') || 
    query.includes('dónde') || 
    query.includes('direccion') || 
    query.includes('dirección') || 
    query.includes('calle') || 
    query.includes('la plata') || 
    query.includes('llegar') || 
    query.includes('estacionamiento') || 
    query.includes('mapa')
  ) {
    return {
      sender: 'bot',
      text: `📍 *Ubicación de Predio Norte:*\n\n🏢 *Dirección:* Calle 41 N° 612 (entre 7 y 8), La Plata, Buenos Aires.\n\n🚗 *Ubicación estratégica:* Pleno centro norte de La Plata, a pocas cuadras de Plaza Olazábal y Plaza Italia, con fácil acceso y parada de colectivos cercanas.\n\n📞 *Teléfono Fijo:* (0221) 427-7475\n💬 *WhatsApp:* 221 595-7475\n\n⏰ *Horarios del Complejo:*\n• Lun a Vie: 08:00 a 23:30 hs\n• Sábados: 10:00 a 23:30 hs\n• Domingos: 13:00 a 23:30 hs`,
      action: {
        type: 'link',
        label: 'Abrir en Google Maps',
        url: COMPLEX_INFO.googleMapsUrl,
        icon: 'MapPin',
      },
      secondaryAction: {
        type: 'whatsapp',
        label: 'Enviar Mensaje a Recepción',
        url: createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Ubicación y cómo llegar')),
        icon: 'MessageCircle',
      },
      suggestions: ['⚽ Reservar Cancha de Fútbol', '🥊 Horarios de Boxeo', '🎂 Cumpleaños'],
    };
  }

  // 8. HORARIOS GENERALES / CUÁNDO ABREN
  if (
    query.includes('horario') || 
    query.includes('hora') || 
    query.includes('abierto') || 
    query.includes('abre') || 
    query.includes('cierra') || 
    query.includes('domingo') || 
    query.includes('sabado') || 
    query.includes('sábado') || 
    query.includes('feriado')
  ) {
    return {
      sender: 'bot',
      text: `⏰ *Horarios Generales de Predio Norte:*\n\n• *Lunes a Viernes:* 08:00 a 23:30 hs\n• *Sábados:* 10:00 a 23:30 hs\n• *Domingos y Feriados:* 13:00 a 23:30 hs\n\n🏟️ *Actividades:*\n• *Fútbol 5/6:* Turnos diurnos y nocturnos todos los días.\n• *Boxeo:* Lun a Vie mañana y tarde, Sáb 11 hs.\n• *Pilates:* Lun a Vie continuado mañana y tarde.\n• *Escuelita:* Lun a Vie de 17:00 a 18:30 hs.\n• *Cumpleaños:* Sábados, domingos y feriados por la tarde/noche.`,
      action: {
        type: 'scroll',
        label: 'Ver Grilla de Horarios Completa',
        targetId: 'horarios',
        icon: 'Clock',
      },
      secondaryAction: {
        type: 'whatsapp',
        label: 'Consultar Horario en WhatsApp',
        url: createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Consulta de horarios disponibles')),
        icon: 'MessageCircle',
      },
      suggestions: ['⚽ Reservar Fútbol', '🥊 Boxeo Recreativo', '🧘‍♀️ Pilates Reformer'],
    };
  }

  // 9. INSTALACIONES / VESTUARIOS / CANTINA / QUINCHO / TERCER TIEMPO
  if (
    query.includes('instalacion') || 
    query.includes('instalación') || 
    query.includes('vestuario') || 
    query.includes('ducha') || 
    query.includes('cantina') || 
    query.includes('buffet') || 
    query.includes('parrilla') || 
    query.includes('tercer tiempo') ||
    query.includes('agua caliente')
  ) {
    return {
      sender: 'bot',
      text: `🏟️ *Instalaciones y Servicios de Predio Norte:*\n\n• *3 Canchas de Fútbol 5 y 6:* Césped sintético de alta durabilidad e iluminación LED 400W.\n• *Vestuarios completos:* Espacios amplios con duchas de agua caliente y lockers.\n• *Quincho & Cantina Social:* Mesas, TV para ver partidos, bebidas frías, minutas y parrilla para el tercer tiempo.\n• *Sala de Boxeo:* Piso de alto impacto y bolsas Everlast.\n• *Estudio de Pilates:* Camas reformer y climatización frío/calor.\n• *Salón Privado de Cumpleaños:* Con vajilla, heladeras y privacidad.`,
      action: {
        type: 'whatsapp',
        label: 'Consultar Disponibilidad por WhatsApp',
        url: createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Instalaciones y tercer tiempo')),
        icon: 'MessageCircle',
      },
      secondaryAction: {
        type: 'scroll',
        label: 'Ver Fotos de Instalaciones',
        targetId: 'instalaciones',
        icon: 'Eye',
      },
      suggestions: ['⚽ Reservar Cancha', '🎂 Cumpleaños y Eventos', '📍 ¿Dónde queda?'],
    };
  }

  // 10. CONVENIO GIMNASIO / MOOD GIMNASIO
  if (
    query.includes('gym') || 
    query.includes('gimnasio') || 
    query.includes('mood') || 
    query.includes('musculacion') || 
    query.includes('musculación') || 
    query.includes('pesas')
  ) {
    return {
      sender: 'bot',
      text: `💪 *Convenio Exclusivo con Mood Gimnasio (@moodgimnasio):*\n\nSi realizás cualquier actividad en Predio Norte (Fútbol, Boxeo o Pilates), tenés acceso a una tarifa preferencial con descuento para entrenar sala de musculación y pesas en Mood Gimnasio.\n\n¡La combinación perfecta para potenciar tu entrenamiento físico!`,
      action: {
        type: 'whatsapp',
        label: 'Consultar Promo Predio + Mood',
        url: createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Promo combinada Predio Norte + Mood Gimnasio')),
        icon: 'MessageCircle',
      },
      suggestions: ['🥊 Boxeo y Funcional', '🧘‍♀️ Pilates Reformer', '⚽ Canchas de Fútbol'],
    };
  }

  // 11. GREETINGS / HOLA / BUENOS DIAS
  if (
    query === 'hola' || 
    query.startsWith('hola') || 
    query.includes('buen dia') || 
    query.includes('buenos dias') || 
    query.includes('buenas tardes') || 
    query.includes('buenas noches') || 
    query.includes('que tal') || 
    query.includes('hola!')
  ) {
    return {
      sender: 'bot',
      text: `👋 ¡Hola! Soy el *Asistente Virtual de Predio Norte*.\n\nEstoy acá para ayudarte con:\n• ⚽ Reserva y tarifas de Canchas de Fútbol 5 y 6\n• 🎂 Organización de Cumpleaños (¡en 3 y 6 cuotas!)\n• 👦 Escuelita de Fútbol Infantil (4 a 12 años)\n• 🥊 Horarios de Boxeo Recreativo & Funcional\n• 🧘‍♀️ Clases de Pilates Reformer\n• 📍 Ubicación, horarios y medios de pago\n\n¿Qué te gustaría consultar hoy?`,
      action: {
        type: 'whatsapp',
        label: 'Chatear directo por WhatsApp',
        url: createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Hola, quería hacer una consulta general')),
        icon: 'MessageCircle',
      },
      suggestions: [
        '⚽ Reservar Cancha de Fútbol',
        '🎂 Cumpleaños y Eventos',
        '👦 Escuelita de Fútbol',
        '🥊 Horarios de Boxeo',
        '🧘‍♀️ Pilates Reformer',
      ],
    };
  }

  // 12. HUMANO / ASESOR / WHATSAPP / CONTACTO DIRECTO
  if (
    query.includes('humano') || 
    query.includes('persona') || 
    query.includes('asesor') || 
    query.includes('atencion') || 
    query.includes('atención') || 
    query.includes('whatsapp') || 
    query.includes('telefono') || 
    query.includes('teléfono') || 
    query.includes('hablar')
  ) {
    return {
      sender: 'bot',
      text: `📱 *¡Por supuesto! Podés hablar directamente con el equipo de recepción de Predio Norte:*\n\n• *WhatsApp Oficial:* 221 595-7475\n• *Teléfono Fijo:* (0221) 427-7475\n• *Horario de atención:* Lun a Dom de 08:00 a 23:30 hs.\n\nHacé clic abajo para abrir el chat de WhatsApp con un mensaje personalizado:`,
      action: {
        type: 'whatsapp',
        label: 'Abrir Chat de WhatsApp Directo',
        url: createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Hola! Quería comunicarme con un asesor de recepción')),
        icon: 'MessageCircle',
      },
      suggestions: ['⚽ Reservar Fútbol', '🎂 Cumpleaños en Cuotas', '📍 Dónde queda'],
    };
  }

  // 13. FALLBACK INTELIGENTE CON INFORMACIÓN CLAVE Y CTA A WHATSAPP
  return {
    sender: 'bot',
    text: `¡Entendido! Puedo ayudarte con información de *Fútbol 5 y 6, Boxeo, Pilates Reformer, Escuelita Infantil o Cumpleaños en Predio Norte*.\n\nTambién podés escribirnos directamente a nuestro WhatsApp oficial para que te atienda nuestro equipo de recepción:`,
    action: {
      type: 'whatsapp',
      label: `Consultar "${userMessage.slice(0, 30)}..." por WhatsApp`,
      url: createWhatsAppLink(generateGeneralInquiryWhatsAppMessage(userMessage)),
      icon: 'MessageCircle',
    },
    secondaryAction: {
      type: 'scroll',
      label: 'Ver Turnero Online',
      targetId: 'turnero',
      icon: 'Calendar',
    },
    suggestions: [
      '⚽ Reservar Cancha de Fútbol',
      '🎂 Cumpleaños y Eventos',
      '👦 Escuelita de Fútbol (4 a 12 años)',
      '🥊 Horarios de Boxeo',
      '🧘‍♀️ Pilates Reformer',
      '📍 ¿Dónde queda Predio Norte?',
    ],
  };
}
