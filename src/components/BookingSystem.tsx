import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { COMPLEX_INFO, DISCIPLINES, COURTS_AND_SPACES } from '../data/complexData';
import { DisciplineType, Reservation, TimeSlot } from '../types';
import { createWhatsAppLink, generateBookingWhatsAppMessage } from '../utils/whatsapp';
import { 
  CalendarCheck, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  MessageCircle, 
  Copy, 
  Printer, 
  Repeat, 
  Trash2, 
  Check 
} from 'lucide-react';

interface BookingSystemProps {
  initialDiscipline?: string;
}

const disciplineIcons: Record<string, string> = {
  futbol: '⚽',
  boxeo: '🥊',
  pilates: '🧘',
  escuelita: '👦',
  cumpleanos: '🎂',
};

export const BookingSystem: React.FC<BookingSystemProps> = ({ initialDiscipline }) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<DisciplineType>('futbol');
  const [selectedCourt, setSelectedCourt] = useState<string>('cancha-1');
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [isFixedWeekly, setIsFixedWeekly] = useState<boolean>(false);
  
  // Customer form inputs
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [formError, setFormError] = useState('');

  // Active view: 'turnero' | 'mis-reservas'
  const [activeTab, setActiveTab] = useState<'turnero' | 'mis-reservas'>('turnero');
  const [lastConfirmedReservation, setLastConfirmedReservation] = useState<Reservation | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Local storage reservations
  const [storedReservations, setStoredReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('predio_norte_reservations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (initialDiscipline && DISCIPLINES.some(d => d.id === initialDiscipline)) {
      setSelectedDiscipline(initialDiscipline as DisciplineType);
      setSelectedTimeSlot(null);
    }
  }, [initialDiscipline]);

  useEffect(() => {
    try {
      localStorage.setItem('predio_norte_reservations', JSON.stringify(storedReservations));
    } catch (e) {
      console.error(e);
    }
  }, [storedReservations]);

  // Generate available time slots based on discipline and day of week
  const getTimeSlotsForSelection = (): TimeSlot[] => {
    const dateObj = new Date(selectedDate + 'T12:00:00');
    const dayOfWeek = dateObj.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    if (selectedDiscipline === 'futbol') {
      const slots: string[] = [];
      const startHour = dayOfWeek === 0 ? 13 : dayOfWeek === 6 ? 10 : 8;
      const endHour = 23;

      for (let h = startHour; h <= endHour; h++) {
        const hourFormatted = h.toString().padStart(2, '0') + ':00';
        slots.push(hourFormatted);
      }

      return slots.map((time, idx) => {
        const isOccupied = (idx % 4 === 1 && hOcc(time, selectedDate)) || (idx % 5 === 2 && hOcc(time, selectedDate));
        return {
          id: `slot-f-${time}`,
          time,
          available: !isOccupied,
          courtId: selectedCourt,
          price: 22000,
        };
      });
    }

    if (selectedDiscipline === 'boxeo') {
      let validTimes: string[] = [];
      if (dayOfWeek === 1) validTimes = ['08:00', '17:00', '18:00', '19:00'];
      else if (dayOfWeek === 3 || dayOfWeek === 5) validTimes = ['08:00', '16:00', '17:00', '18:00', '19:00'];
      else if (dayOfWeek === 2 || dayOfWeek === 4) validTimes = ['17:00', '18:00'];
      else if (dayOfWeek === 6) validTimes = ['11:00'];
      else validTimes = [];

      return validTimes.map(time => ({
        id: `slot-box-${time}`,
        time,
        available: true,
        courtId: 'sala-boxeo',
      }));
    }

    if (selectedDiscipline === 'pilates') {
      let times: string[] = [];
      if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
        times = ['08:00', '09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
      } else if (dayOfWeek === 2 || dayOfWeek === 4) {
        times = ['08:00', '09:00', '10:00', '11:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
      } else {
        times = [];
      }

      return times.map((time, idx) => ({
        id: `slot-pil-${time}`,
        time,
        available: idx % 6 !== 0,
        courtId: 'sala-pilates',
      }));
    }

    if (selectedDiscipline === 'escuelita') {
      let times: string[] = [];
      if (dayOfWeek === 2 || dayOfWeek === 4) {
        times = ['17:00 (Grupos 4-6 y 7-8 años)'];
      } else if (dayOfWeek === 1 || dayOfWeek === 5) {
        times = ['17:00 (Grupos 9-10 y 11-12 años)'];
      } else {
        times = [];
      }

      return times.map(time => ({
        id: `slot-esc-${time}`,
        time,
        available: true,
        courtId: 'cancha-escuelita',
      }));
    }

    if (selectedDiscipline === 'cumpleanos') {
      let times: string[] = [];
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        times = ['13:00 a 16:00', '17:30 a 20:30', '18:00 a 21:00'];
      } else {
        times = ['18:00 a 21:00 (Turno Especial Día de Semana)'];
      }

      return times.map(time => ({
        id: `slot-cumple-${time}`,
        time,
        available: true,
        courtId: 'salon-eventos',
      }));
    }

    return [];
  };

  function hOcc(hour: string, date: string): boolean {
    const charCode = (date + hour).split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return charCode % 3 === 0;
  }

  const getNextDays = () => {
    const days = [];
    const today = new Date();
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    for (let i = 0; i < 12; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      days.push({
        iso,
        dayName: i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : dayNames[d.getDay()],
        dayNumber: d.getDate(),
        month: monthNames[d.getMonth()],
      });
    }
    return days;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!selectedTimeSlot) {
      setFormError('Por favor selecciona un horario disponible.');
      return;
    }

    if (!customerName.trim()) {
      setFormError('Por favor ingresa tu nombre y apellido.');
      return;
    }

    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 6) {
      setFormError('Por favor ingresa un número de teléfono / WhatsApp válido.');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const prefixMap: Record<string, string> = {
      futbol: 'F5',
      boxeo: 'BOX',
      pilates: 'PIL',
      escuelita: 'ESC',
      cumpleanos: 'CMP',
    };
    const prefix = prefixMap[selectedDiscipline] || 'PR';
    const bookingCode = `PN-${prefix}-${randomSuffix}`;

    let courtName = 'Cancha 1 (Fútbol 5/6)';
    if (selectedDiscipline === 'futbol') {
      const match = COURTS_AND_SPACES.find(c => c.id === selectedCourt);
      courtName = match ? match.name : 'Cancha 1';
    } else if (selectedDiscipline === 'boxeo') {
      courtName = 'Espacio de Boxeo Everlast';
    } else if (selectedDiscipline === 'pilates') {
      courtName = 'Estudio Pilates Reformer';
    } else if (selectedDiscipline === 'escuelita') {
      courtName = 'Cancha Escuelita Infantil';
    } else if (selectedDiscipline === 'cumpleanos') {
      courtName = 'Salón Privado + Cancha (3hs)';
    }

    const newReservation: Reservation = {
      id: 'res_' + Date.now(),
      bookingCode,
      discipline: selectedDiscipline,
      courtOrSpace: courtName,
      date: selectedDate,
      time: selectedTimeSlot,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim() || undefined,
      isFixedWeekly,
      notes: customerNotes.trim() || undefined,
      status: 'confirmada',
      createdAt: new Date().toISOString(),
      estimatedPrice: selectedDiscipline === 'futbol' ? 22000 : undefined,
    };

    setStoredReservations(prev => [newReservation, ...prev]);
    setLastConfirmedReservation(newReservation);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#058343', '#e31f24', '#ffffff', '#10b981'],
      });
    } catch {
      // gracefully ignore
    }

    setCustomerNotes('');
  };

  const copyBookingDetails = (reservation: Reservation) => {
    const text = `Reserva Predio Norte: ${reservation.bookingCode} | ${reservation.courtOrSpace} | Fecha: ${reservation.date} ${reservation.time}hs | A nombre de: ${reservation.customerName}`;
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const deleteStoredReservation = (id: string) => {
    setStoredReservations(prev => prev.filter(r => r.id !== id));
  };

  const daysList = getNextDays();
  const availableSlots = getTimeSlotsForSelection();

  return (
    <section id="turnero" className="py-16 sm:py-20 bg-white border-t border-slate-200/80 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#058343] text-xs font-semibold uppercase tracking-wider mb-2">
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Turnero Online en Vivo</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
              Reservá tu <span className="text-[#058343]">Turno en Predio</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal max-w-3xl mt-1">
              Elegí la actividad, fecha y horario disponible. Te confirmamos el turno inmediatamente por WhatsApp y te generamos tu comprobante oficial.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl self-start sm:self-auto border border-slate-200/80">
            <button
              onClick={() => setActiveTab('turnero')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'turnero'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Nuevo Turno
            </button>
            <button
              onClick={() => setActiveTab('mis-reservas')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'mis-reservas'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Mis Reservas</span>
              {storedReservations.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#e31f24] text-white text-[11px] flex items-center justify-center font-bold">
                  {storedReservations.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Tab 1: TURNERO FORM FULL WIDTH & SEQUENTIAL STEPS */}
        {activeTab === 'turnero' && (
          <div className="space-y-6 w-full">
            
            {/* 1. Discipline Selector */}
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-5 sm:p-7 shadow-xs">
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>1. Seleccioná la Actividad</span>
                <span className="text-[11px] text-[#058343] font-medium">Disponible en predio</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {DISCIPLINES.map((d) => {
                  const isSelected = selectedDiscipline === d.id;
                  const icon = disciplineIcons[d.id] || '⚡';
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => {
                        setSelectedDiscipline(d.id);
                        setSelectedTimeSlot(null);
                      }}
                      className={`flex flex-col text-left p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                        isSelected
                          ? 'bg-white border-[#058343] shadow-xs ring-1 ring-[#058343]'
                          : 'bg-white/70 border-slate-200/80 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm flex items-center gap-1.5 font-bold text-slate-900">
                          <span>{icon}</span>
                          <span>{d.name.split(' ')[0]}</span>
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#058343]" />}
                      </div>
                      <span className="text-[11px] text-slate-500 line-clamp-1 leading-snug font-normal">
                        {d.tagline}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Sub-Court selector if Futbol */}
              {selectedDiscipline === 'futbol' && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Elegí Cancha de Fútbol Sintético:
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['cancha-1', 'cancha-2', 'cancha-3'].map((cId, idx) => (
                      <button
                        key={cId}
                        type="button"
                        onClick={() => setSelectedCourt(cId)}
                        className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all text-center ${
                          selectedCourt === cId
                            ? 'bg-[#058343] text-white border-[#058343] shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        Cancha {idx + 1} (F5 / F6 Sintético)
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Interactive Date Picker */}
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-5 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between mb-3.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#058343]" />
                  <span>2. Seleccioná el Día</span>
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTimeSlot(null);
                  }}
                  className="bg-white border border-slate-200 text-slate-800 text-xs px-3.5 py-2 rounded-xl focus:outline-none focus:border-[#058343] shadow-xs"
                />
              </div>

              {/* Days Grid spanning full width */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-14 gap-2">
                {daysList.map((d) => {
                  const isSelected = selectedDate === d.iso;
                  return (
                    <button
                      key={d.iso}
                      type="button"
                      onClick={() => {
                        setSelectedDate(d.iso);
                        setSelectedTimeSlot(null);
                      }}
                      className={`flex flex-col items-center py-2.5 px-2 rounded-2xl border transition-all text-center ${
                        isSelected
                          ? 'bg-[#058343] text-white border-[#058343] shadow-xs font-bold'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span className="text-[10px] uppercase tracking-wider opacity-80">
                        {d.dayName}
                      </span>
                      <span className="text-xl font-bold">
                        {d.dayNumber}
                      </span>
                      <span className="text-[10px] font-normal opacity-80">
                        {d.month}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Time Slots Selector */}
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-5 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between mb-3.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#058343]" />
                  <span>3. Horarios Disponibles</span>
                </label>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-normal">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#058343]" /> Libre
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-300" /> Ocupado
                  </span>
                </div>
              </div>

              {availableSlots.length === 0 ? (
                <div className="p-6 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 font-normal">
                  <AlertCircle className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">No hay clases programadas de esta disciplina para el día seleccionado.</p>
                  <p className="text-xs text-slate-500 mt-1">Probá cambiando de fecha o consultanos directamente por WhatsApp.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 max-h-80 overflow-y-auto pr-1">
                  {availableSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot.time;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        disabled={!slot.available}
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`p-3 rounded-2xl border text-sm font-semibold transition-all flex flex-col items-center justify-center gap-0.5 ${
                          !slot.available
                            ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                            : isSelected
                            ? 'bg-[#058343] text-white border-[#058343] shadow-xs'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-[#058343]/50'
                        }`}
                      >
                        <span className="tracking-tight text-base font-bold">{slot.time}</span>
                        <span className="text-[10px] font-normal opacity-80">
                          {slot.available ? 'Disponible' : 'Reservado'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 4. Customer Details Form & Confirmation (POSITIONED DIRECTLY BELOW STEP 3) */}
            <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-5 sm:p-8 shadow-xs">
              
              <div className="border-b border-slate-200 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold text-[#058343] uppercase tracking-wider">
                    Paso 4 • Confirmación
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                    Tus Datos de Reserva
                  </h3>
                </div>
                {!selectedTimeSlot && (
                  <span className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl font-medium">
                    ⚠️ Seleccioná un horario en el Paso 3 para completar
                  </span>
                )}
              </div>

              {formError && (
                <div className="mb-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleBookingSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column in Step 4: Summary Card */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-2 text-xs shadow-xs">
                      <h4 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-2 mb-2 flex items-center justify-between">
                        <span>Resumen del Turno</span>
                        <span className="text-[10px] bg-emerald-50 text-[#058343] px-2 py-0.5 rounded-md font-semibold">
                          En proceso
                        </span>
                      </h4>
                      <div className="flex justify-between items-center text-slate-600">
                        <span>Actividad:</span>
                        <span className="font-bold text-slate-900 capitalize">{selectedDiscipline}</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-600">
                        <span>Espacio:</span>
                        <span className="font-bold text-[#058343]">
                          {selectedDiscipline === 'futbol' ? `Cancha ${selectedCourt.replace('cancha-', '')}` : 'Sector Asignado'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-slate-600">
                        <span>Fecha:</span>
                        <span className="font-bold text-slate-900">{selectedDate}</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-600">
                        <span>Horario:</span>
                        <span className="font-bold text-slate-900">
                          {selectedTimeSlot ? `${selectedTimeSlot} hs` : 'Sin elegir'}
                        </span>
                      </div>
                      {selectedDiscipline === 'futbol' && (
                        <div className="flex justify-between items-center text-slate-600 pt-2 border-t border-slate-100 font-semibold">
                          <span>Precio Estimado Turno:</span>
                          <span className="text-[#058343] font-bold text-sm">$22.000</span>
                        </div>
                      )}
                    </div>

                    {/* Turno Fijo Option Card */}
                    <label className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300 transition-colors shadow-xs">
                      <input
                        type="checkbox"
                        checked={isFixedWeekly}
                        onChange={(e) => setIsFixedWeekly(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-[#058343] focus:ring-[#058343]"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 block">
                          Quiero solicitar Turno Fijo Semanal
                        </span>
                        <span className="text-slate-500 text-[11px] font-normal leading-snug">
                          Asegura este mismo horario todas las semanas con precio congelado.
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Right Column in Step 4: Form Inputs & Submit */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nombre y Apellido <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            placeholder="Ej: Martín Rodríguez"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl pl-10 pr-3 py-2.5 focus:outline-none focus:border-[#058343] transition-colors shadow-xs"
                          />
                        </div>
                      </div>

                      {/* WhatsApp Phone */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Teléfono / WhatsApp <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            placeholder="Ej: 221 555-1234"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl pl-10 pr-3 py-2.5 focus:outline-none focus:border-[#058343] transition-colors shadow-xs"
                          />
                        </div>
                      </div>

                      {/* Optional Email */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email (opcional)
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            placeholder="tuemail@ejemplo.com"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl pl-10 pr-3 py-2.5 focus:outline-none focus:border-[#058343] transition-colors shadow-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Notas u Observaciones (opcional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ej: Partido con amigos / Cumpleaños / Traemos pecheras..."
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        className="w-full bg-white border border-slate-200 text-slate-800 text-xs rounded-xl p-3 focus:outline-none focus:border-[#058343] transition-colors shadow-xs"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={!selectedTimeSlot}
                        className="w-full py-4 px-6 rounded-xl bg-[#058343] hover:bg-[#046c36] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm uppercase tracking-wider shadow-md shadow-[#058343]/20 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.01] active:scale-99"
                      >
                        <CalendarCheck className="w-5 h-5" />
                        <span>Confirmar y Agendar Turno</span>
                      </button>

                      <p className="text-[11px] text-center text-slate-400 font-normal mt-2">
                        Al confirmar, podrás enviar el mensaje oficial con un solo clic a nuestro WhatsApp ({COMPLEX_INFO.whatsappFormatted}).
                      </p>
                    </div>

                  </div>

                </div>
              </form>

            </div>

          </div>
        )}

        {/* Modal / Voucher View when Last Booking Confirmed */}
        {lastConfirmedReservation && (
          <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
              
              <div className="text-center mb-5">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-2 text-[#058343]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <span className="bg-[#058343] text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full tracking-wide">
                  Elegí Predio
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">
                  ¡Turno Agendado con Éxito!
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-normal">
                  Tu reserva ha sido registrada en nuestro sistema de turnos.
                </p>
              </div>

              {/* Voucher Card */}
              <div className="bg-[#F8FAFC] rounded-2xl p-4 sm:p-5 border border-slate-200 text-left space-y-2.5 mb-5 relative">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
                      Código de Turno
                    </span>
                    <span className="font-mono text-sm sm:text-base font-bold text-[#058343]">
                      {lastConfirmedReservation.bookingCode}
                    </span>
                  </div>
                  <span className="bg-emerald-50 text-[#058343] border border-emerald-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                    Confirmado
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Actividad</span>
                    <span className="font-bold text-slate-800 capitalize">{lastConfirmedReservation.discipline}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Espacio</span>
                    <span className="font-bold text-slate-800">{lastConfirmedReservation.courtOrSpace}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Fecha</span>
                    <span className="font-bold text-slate-800">{lastConfirmedReservation.date}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Horario</span>
                    <span className="font-bold text-slate-800">{lastConfirmedReservation.time} hs</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 text-[10px] block">Titular</span>
                    <span className="font-bold text-slate-800">{lastConfirmedReservation.customerName} ({lastConfirmedReservation.customerPhone})</span>
                  </div>
                </div>

                {lastConfirmedReservation.isFixedWeekly && (
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-[#058343] font-medium flex items-center gap-1.5">
                    <Repeat className="w-3.5 h-3.5 shrink-0" />
                    <span>Solicitud de Turno Fijo Semanal incluida.</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <a
                  href={createWhatsAppLink(generateBookingWhatsAppMessage(lastConfirmedReservation))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#058343] hover:bg-[#046c36] text-white font-semibold py-3.5 rounded-xl shadow-xs transition-all text-xs sm:text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Confirmación a WhatsApp ({COMPLEX_INFO.whatsappFormatted})</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => copyBookingDetails(lastConfirmedReservation)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-[#058343]" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedCode ? '¡Copiado!' : 'Copiar Comprobante'}</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimir Turno</span>
                  </button>
                </div>

                <button
                  onClick={() => setLastConfirmedReservation(null)}
                  className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Cerrar y volver al turnero
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Tab 2: MIS RESERVAS */}
        {activeTab === 'mis-reservas' && (
          <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Historial de Reservas Guardadas
                </h3>
                <p className="text-xs text-slate-500 font-normal">
                  Tus turnos reservados en este dispositivo.
                </p>
              </div>
              {storedReservations.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('¿Deseas vaciar el historial de turnos guardados?')) {
                      setStoredReservations([]);
                    }
                  }}
                  className="text-xs text-slate-500 hover:text-[#e31f24] flex items-center gap-1 font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Limpiar todo</span>
                </button>
              )}
            </div>

            {storedReservations.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">Aún no tienes turnos registrados</p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto mb-4 font-normal">
                  Cuando reserves una cancha, clase de boxeo, pilates o escuelita, aparecerá listada aquí para fácil acceso.
                </p>
                <button
                  onClick={() => setActiveTab('turnero')}
                  className="px-5 py-2.5 rounded-xl bg-[#058343] text-white font-semibold text-xs shadow-xs"
                >
                  Reservar mi primer turno
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {storedReservations.map((res) => (
                  <div
                    key={res.id}
                    className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all shadow-xs"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2.5">
                        <span className="font-mono text-xs font-bold text-[#058343] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          {res.bookingCode}
                        </span>
                        <span className="text-[10px] bg-[#e31f24] text-white font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {res.discipline}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900 mb-1">
                        {res.courtOrSpace}
                      </h4>

                      <div className="space-y-1 text-xs text-slate-600 my-2.5 font-normal">
                        <p className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{res.date}</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{res.time} hs</span>
                        </p>
                        <p className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          <span>{res.customerName}</span>
                        </p>
                      </div>

                      {res.isFixedWeekly && (
                        <div className="text-[10px] text-[#058343] font-semibold mb-2 flex items-center gap-1">
                          <Repeat className="w-3 h-3" />
                          <span>Turno Fijo Semanal</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <a
                        href={createWhatsAppLink(generateBookingWhatsAppMessage(res))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#058343] hover:bg-[#046c36] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Reenviar a WhatsApp</span>
                      </a>

                      <button
                        onClick={() => deleteStoredReservation(res.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-[#e31f24] hover:bg-slate-50 border border-slate-200 transition-colors"
                        title="Eliminar del historial"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};

