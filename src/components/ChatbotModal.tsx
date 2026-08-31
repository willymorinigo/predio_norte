import React, { useState, useEffect, useRef } from 'react';
import { COMPLEX_INFO } from '../data/complexData';
import { getBotResponse, ChatMessage, INITIAL_SUGGESTIONS } from '../utils/chatbotEngine';
import { createWhatsAppLink, generateGeneralInquiryWhatsAppMessage } from '../utils/whatsapp';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  RotateCcw, 
  X, 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  MapPin, 
  Clock, 
  Smile, 
  Eye, 
  Phone,
  CheckCircle2,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const ChatbotModal: React.FC<ChatbotModalProps> = ({
  isOpen,
  onClose,
  onNavigateToSection,
}) => {
  const [activeTab, setActiveTab] = useState<'chatbot' | 'direct'>('chatbot');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: `👋 ¡Hola! Soy el **Asistente Virtual de Predio Norte**.\n\n¿En qué te puedo ayudar hoy? Podés escribir tu consulta o elegir una de las opciones frecuentes para guiarte y coordinar por WhatsApp:`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: INITIAL_SUGGESTIONS,
      action: {
        type: 'whatsapp',
        label: 'Chatear directo con Recepción',
        url: createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Consulta general desde la web')),
        icon: 'MessageCircle',
      }
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
      if (activeTab === 'chatbot') {
        inputRef.current?.focus();
      }
    }
  }, [isOpen, messages, isTyping, activeTab]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate natural response latency (400-800ms)
    setTimeout(() => {
      const responseData = getBotResponse(text);
      const botMsg: ChatMessage = {
        ...responseData,
        id: `bot-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: `👋 ¡Hola nuevamente! Soy el **Asistente Virtual de Predio Norte**.\n\nElegí un tema o escribime tu consulta sobre canchas de fútbol, escuelita, boxeo, pilates, o festejos de cumpleaños:`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: INITIAL_SUGGESTIONS,
        action: {
          type: 'whatsapp',
          label: 'Chatear directo con Recepción',
          url: createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Consulta general desde la web')),
          icon: 'MessageCircle',
        }
      },
    ]);
  };

  const handleActionClick = (action: ChatMessage['action']) => {
    if (!action) return;

    if (action.type === 'scroll' && action.targetId) {
      if (onNavigateToSection) {
        onNavigateToSection(action.targetId);
      } else {
        const element = document.getElementById(action.targetId);
        if (element) {
          const navHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - navHeight,
            behavior: 'smooth',
          });
        }
      }
      onClose();
    } else if (action.url) {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    }
  };

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }

          // Format bold markers like *text* or **text**
          const formattedParts = line.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, pIdx) => {
            if ((part.startsWith('**') && part.endsWith('**')) || (part.startsWith('*') && part.endsWith('*'))) {
              const clean = part.replace(/^\*+|\*+$/g, '');
              return <strong key={pIdx} className="font-bold text-slate-900">{clean}</strong>;
            }
            return part;
          });

          return (
            <p key={idx} className="m-0">
              {formattedParts}
            </p>
          );
        })}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="mb-3 w-[92vw] max-w-[390px] sm:w-[390px] bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px] sm:h-[550px] animate-in fade-in slide-in-from-bottom-5 duration-200 z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#058343] to-[#046c36] p-3.5 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#058343] rounded-full"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm leading-tight text-white">Asistente Predio Norte</h4>
              <span className="text-[10px] bg-white/20 text-emerald-100 px-1.5 py-0.5 rounded-full font-medium">IA</span>
            </div>
            <p className="text-[11px] text-emerald-100/90 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              En línea • Te guía y conecta por WhatsApp
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {activeTab === 'chatbot' && (
            <button
              onClick={handleResetChat}
              title="Reiniciar conversación"
              className="p-1.5 text-emerald-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            title="Cerrar"
            className="p-1.5 text-emerald-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 bg-slate-50/80 p-1 gap-1">
        <button
          onClick={() => setActiveTab('chatbot')}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'chatbot'
              ? 'bg-white text-[#058343] shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>Chatbot Asistente</span>
        </button>
        <button
          onClick={() => setActiveTab('direct')}
          className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'direct'
              ? 'bg-white text-[#058343] shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp Directo</span>
        </button>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'chatbot' ? (
        <div className="flex-1 flex flex-col bg-slate-50/50 min-h-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-200">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-lg bg-[#058343] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-[#058343] text-white rounded-br-none shadow-sm'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {renderFormattedText(msg.text)}
                    <span
                      className={`block text-[9px] mt-1.5 text-right font-medium ${
                        msg.sender === 'user' ? 'text-emerald-100/80' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Contextual WhatsApp & Navigation Action Buttons */}
                  {msg.action && (
                    <div className="space-y-1.5 pt-0.5">
                      <button
                        onClick={() => handleActionClick(msg.action)}
                        className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-[#058343] hover:bg-[#046c36] text-white rounded-xl text-xs font-semibold shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] group"
                      >
                        <span className="flex items-center gap-1.5">
                          {msg.action.type === 'whatsapp' ? (
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                          ) : msg.action.type === 'scroll' ? (
                            <Calendar className="w-3.5 h-3.5 text-emerald-200" />
                          ) : (
                            <ExternalLink className="w-3.5 h-3.5 text-emerald-200" />
                          )}
                          <span>{msg.action.label}</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-emerald-200 group-hover:translate-x-0.5 transition-transform" />
                      </button>

                      {msg.secondaryAction && (
                        <button
                          onClick={() => handleActionClick(msg.secondaryAction)}
                          className="w-full flex items-center justify-between gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 rounded-xl text-xs font-medium border border-slate-200 transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            {msg.secondaryAction.type === 'scroll' ? (
                              <Calendar className="w-3.5 h-3.5 text-slate-500" />
                            ) : (
                              <MessageCircle className="w-3.5 h-3.5 text-slate-500" />
                            )}
                            <span>{msg.secondaryAction.label}</span>
                          </span>
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Suggestion Chips */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {msg.suggestions.map((sug, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleSendMessage(sug)}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white hover:bg-emerald-50 text-slate-700 hover:text-[#058343] border border-slate-200/80 hover:border-emerald-300 transition-colors shadow-2xs"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center">
                <div className="w-6 h-6 rounded-lg bg-[#058343] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl rounded-bl-none px-3 py-2.5 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#058343] animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#058343] animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#058343] animate-bounce"></span>
                  <span className="text-[11px] text-slate-400 ml-1.5 font-medium">Predio Norte está respondiendo...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-2.5 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-1.5"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribí tu consulta (canchas, precios, cumple...)"
                className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#058343]/30 focus:border-[#058343] text-slate-800 placeholder-slate-400"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="p-2 rounded-xl bg-[#058343] hover:bg-[#046c36] disabled:bg-slate-200 disabled:text-slate-400 text-white shadow-sm transition-all active:scale-95 flex items-center justify-center flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 px-1">
              <span>Alimentado por la información de Predio Norte</span>
              <a
                href={createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Consulta directa'))}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#058343] font-semibold hover:underline flex items-center gap-0.5"
              >
                <span>WhatsApp</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* Direct WhatsApp Shortcut Options Tab */
        <div className="p-4 overflow-y-auto flex-1 space-y-3 bg-white">
          <p className="text-xs text-slate-600 font-normal">
            Elegí una opción para abrir directamente el chat de WhatsApp con un mensaje prearmado:
          </p>

          <div className="space-y-2">
            <a
              href={createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Reserva de canchas de fútbol 5 y 6'))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-800 border border-slate-200/80 hover:border-emerald-200 transition-all hover:scale-[1.01] group"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">⚽</span>
                <div>
                  <span className="block font-bold text-slate-900">Canchas de Fútbol 5 y 6</span>
                  <span className="text-[11px] text-slate-500 font-normal">Turnos simples o fijos semanales</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#058343] group-hover:translate-x-0.5 transition-all" />
            </a>

            <a
              href={createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Disponibilidad y presupuesto para Cumpleaños'))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-800 border border-slate-200/80 hover:border-emerald-200 transition-all hover:scale-[1.01] group"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🎂</span>
                <div>
                  <span className="block font-bold text-slate-900">Cumpleaños y Eventos</span>
                  <span className="text-[11px] text-slate-500 font-normal">3 hs con profesor + 3 y 6 cuotas</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#058343] group-hover:translate-x-0.5 transition-all" />
            </a>

            <a
              href={createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Inscripción y horarios Escuelita de Fútbol Infantil'))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-800 border border-slate-200/80 hover:border-emerald-200 transition-all hover:scale-[1.01] group"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">👦</span>
                <div>
                  <span className="block font-bold text-slate-900">Escuelita Infantil (4 a 12 años)</span>
                  <span className="text-[11px] text-slate-500 font-normal">Clase de prueba gratis y horarios</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#058343] group-hover:translate-x-0.5 transition-all" />
            </a>

            <a
              href={createWhatsAppLink(generateGeneralInquiryWhatsAppMessage('Boxeo Recreativo y Pilates Reformer'))}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-xs font-semibold text-slate-800 border border-slate-200/80 hover:border-emerald-200 transition-all hover:scale-[1.01] group"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🥊</span>
                <div>
                  <span className="block font-bold text-slate-900">Boxeo & Pilates Reformer</span>
                  <span className="text-[11px] text-slate-500 font-normal">Días, horarios y promo Mood Gym</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#058343] group-hover:translate-x-0.5 transition-all" />
            </a>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`tel:${COMPLEX_INFO.phone}`}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#058343]" />
              <span>Llamar al {COMPLEX_INFO.phoneFormatted}</span>
            </a>

            <a
              href={COMPLEX_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-slate-500 hover:text-slate-900 flex items-center justify-center gap-1 font-medium"
            >
              <MapPin className="w-3 h-3 text-[#058343]" />
              <span>Calle 41 N° 612 (e/ 7 y 8) - La Plata</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
