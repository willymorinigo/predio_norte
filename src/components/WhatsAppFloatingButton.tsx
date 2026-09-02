import React, { useState } from 'react';
import { ChatbotModal } from './ChatbotModal';
import { MessageCircle, Bot, X } from 'lucide-react';

interface WhatsAppFloatingButtonProps {
  onNavigateToSection?: (sectionId: string) => void;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  onNavigateToSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3">
      {/* Interactive Chatbot & WhatsApp Modal */}
      <ChatbotModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onNavigateToSection={onNavigateToSection}
      />

      {/* Helper Tooltip Badge (auto-dismissible on click) */}
      {!isOpen && showTooltip && (
        <div 
          onClick={() => {
            setIsOpen(true);
            setShowTooltip(false);
          }}
          className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-slate-200/90 text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-2xl shadow-lg cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition-all hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-2 duration-300 group"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <div className="flex items-center gap-1.5">
            <Bot className="w-3.5 h-3.5 text-[#058343]" />
            <span>¿Dudas? Chateá con nuestro <strong>Asistente</strong></span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded ml-1"
            title="Cerrar aviso"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
          aria-label={isOpen ? "Cerrar asistente" : "Abrir asistente de WhatsApp y Chatbot"}
          className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#058343] hover:bg-[#046c36] text-white shadow-xl shadow-[#058343]/30 hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
          </span>
          {isOpen ? (
            <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <Bot className="w-7 h-7" />
          )}
        </button>
    </div>
  );
};
