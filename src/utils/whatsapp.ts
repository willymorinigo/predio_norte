import { COMPLEX_INFO } from '../data/complexData';
import { Reservation } from '../types';

export function createWhatsAppLink(message: string, phone: string = COMPLEX_INFO.whatsapp): string {
  const cleanPhone = phone.replace(/\D/g, '');
  // Ensure Argentina international code 549 if not present
  const fullNumber = cleanPhone.startsWith('549') ? cleanPhone : `549${cleanPhone}`;
  return `https://api.whatsapp.com/send?phone=${fullNumber}&text=${encodeURIComponent(message)}`;
}

export function generateBookingWhatsAppMessage(reservation: Reservation): string {
  const disciplineNames: Record<string, string> = {
    futbol: '⚽ Fútbol 5/6',
    boxeo: '🥊 Boxeo & Entrenamiento',
    pilates: '🧘‍♀️ Pilates Reformer',
    escuelita: '👦 Escuelita de Fútbol Infantil',
    cumpleanos: '🎉 Cumpleaños / Evento en Predio',
  };

  const discipline = disciplineNames[reservation.discipline] || reservation.discipline;
  const isFixed = reservation.isFixedWeekly ? '✅ SÍ (Turno Fijo Mensual)' : '❌ NO (Turno Ocasional/Simple)';

  const lines = [
    `👋 *¡Hola Predio Norte!* Quiero confirmar mi reserva de turno:`,
    ``,
    `📌 *Código de Reserva:* ${reservation.bookingCode}`,
    `🏆 *Actividad / Espacio:* ${discipline} - ${reservation.courtOrSpace}`,
    `📅 *Fecha:* ${reservation.date}`,
    `⏰ *Horario:* ${reservation.time} hs`,
    `👤 *A nombre de:* ${reservation.customerName}`,
    `📱 *Teléfono:* ${reservation.customerPhone}`,
    reservation.customerEmail ? `✉️ *Email:* ${reservation.customerEmail}` : null,
    `🔄 *Turno Fijo Semanal:* ${isFixed}`,
    reservation.notes ? `📝 *Detalles / Notas:* ${reservation.notes}` : null,
    ``,
    `Quedo a la espera de su confirmación. ¡Muchas gracias!`,
  ].filter(Boolean);

  return lines.join('\n');
}

export function generateGeneralInquiryWhatsAppMessage(topic: string = 'Consulta general'): string {
  return `¡Hola Predio Norte! 👋 Vengo desde la página web y quería hacer una consulta sobre: *${topic}*. ¿Me podrían brindar más información sobre días, horarios y disponibilidad? Muchas gracias.`;
}

export function generateBirthdayInquiryMessage(): string {
  return `¡Hola Predio Norte! 🎉⚽ Quiero consultar disponibilidad y presupuesto para festejar un *Cumpleaños en Predio*. ¿Me podrían pasar los detalles de las franjas horarias y opciones de pago en 3 y 6 cuotas?`;
}

export function generateSoccerSchoolInquiryMessage(): string {
  return `¡Hola Predio Norte! ⚽ Quería consultar información e inscripción para la *Escuelita de Fútbol Infantil* (días, horarios por edad y clase de prueba).`;
}
