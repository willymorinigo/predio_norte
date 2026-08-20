export type DisciplineType = 'futbol' | 'boxeo' | 'pilates' | 'escuelita' | 'cumpleanos';

export interface DisciplineInfo {
  id: DisciplineType;
  name: string;
  shortDescription: string;
  badge: string;
  tagline: string;
  color: string;
  accentColor: string;
  iconName: string;
  features: string[];
  scheduleDetails: {
    days: string;
    hours: string;
  }[];
  priceNote?: string;
  targetAudience: string;
}

export interface CourtOrSpace {
  id: string;
  name: string;
  type: 'cancha_futbol' | 'boxeo_ring' | 'pilates_studio' | 'salon_eventos';
  capacity: string;
  surface: string;
  lighting: string;
  description: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  courtId?: string;
  courtName?: string;
  price?: number;
}

export interface Reservation {
  id: string;
  bookingCode: string;
  discipline: DisciplineType;
  courtOrSpace: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  isFixedWeekly: boolean;
  notes?: string;
  status: 'confirmada' | 'pendiente';
  createdAt: string;
  estimatedPrice?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'canchas' | 'actividades' | 'cumpleanos' | 'pagos';
}
