import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookingSystem } from './components/BookingSystem';
import { DisciplinesSection } from './components/DisciplinesSection';
import { SchedulesSection } from './components/SchedulesSection';
import { BirthdaysSection } from './components/BirthdaysSection';
import { SoccerSchoolSection } from './components/SoccerSchoolSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { LocationAndContact } from './components/LocationAndContact';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

export default function App() {
  const [selectedDisciplineForBooking, setSelectedDisciplineForBooking] = useState<string>('futbol');
  const [activeSection, setActiveSection] = useState<string>('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'actividades', 'horarios', 'cumpleanos', 'escuelita', 'instalaciones', 'contacto'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBooking = (discipline: string = 'futbol') => {
    setSelectedDisciplineForBooking(discipline);
    const element = document.getElementById('turnero');
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-[#058343] selection:text-white flex flex-col">
      {/* Fixed Sticky Header */}
      <Navbar 
        onSelectBooking={handleOpenBooking} 
        activeSection={activeSection} 
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero 
          onOpenBooking={handleOpenBooking} 
        />

        {/* 2. Disciplines and Activities Breakdown */}
        <DisciplinesSection 
          onSelectDiscipline={handleOpenBooking} 
        />

        {/* 3. Interactive Booking Engine & Turnero */}
        <BookingSystem 
          initialDiscipline={selectedDisciplineForBooking} 
        />

        {/* 4. Complete Weekly Timetables & Schedules */}
        <SchedulesSection />

        {/* 5. Birthday Parties & Special Events with 3 & 6 Installments */}
        <BirthdaysSection 
          onBookBirthday={() => handleOpenBooking('cumpleanos')} 
        />

        {/* 6. Kids Soccer Academy / Escuelita de Fútbol */}
        <SoccerSchoolSection 
          onBookTrialClass={() => handleOpenBooking('escuelita')} 
        />

        {/* 7. Complex Facilities & Amenities */}
        <FacilitiesSection />

        {/* 8. Location, Maps & Contact */}
        <LocationAndContact />

        {/* 9. FAQs */}
        <FAQSection />
      </main>

      {/* 10. Footer */}
      <Footer 
        onOpenBooking={() => handleOpenBooking('futbol')} 
      />

      {/* 11. Floating WhatsApp Assistant */}
      <WhatsAppFloatingButton />
    </div>
  );
}
