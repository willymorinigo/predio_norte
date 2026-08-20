import React from 'react';

interface FlaticonBadgeProps {
  icon: string;
  label: string;
  sublabel?: string;
  accentColor?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const FlaticonBadge: React.FC<FlaticonBadgeProps> = ({
  icon,
  label,
  sublabel,
  accentColor = '#058343',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'p-2 text-xs gap-2',
    md: 'p-3 text-sm gap-3',
    lg: 'p-4 text-base gap-4'
  }[size];

  const iconSizes = {
    sm: 'w-7 h-7 text-sm',
    md: 'w-10 h-10 text-xl',
    lg: 'w-12 h-12 text-2xl'
  }[size];

  return (
    <div className={`flex items-center rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-[#058343]/30 transition-all ${sizeClasses} ${className}`}>
      <div 
        className={`${iconSizes} rounded-xl flex items-center justify-center shrink-0 font-bold transition-transform group-hover:scale-105`}
        style={{ backgroundColor: `${accentColor}12`, color: accentColor }}
      >
        <span className="select-none">{icon}</span>
      </div>
      <div className="flex flex-col min-w-0">
        <span className="font-semibold text-slate-800 leading-snug truncate">
          {label}
        </span>
        {sublabel && (
          <span className="text-[11px] text-slate-500 font-normal leading-tight truncate">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
};

export const ServiceFlaticon: React.FC<{ type: string; className?: string }> = ({ type, className = 'w-6 h-6' }) => {
  switch (type) {
    case 'futbol':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="12 7 15.5 9.5 14 13.5 10 13.5 8.5 9.5" fill="currentColor" fillOpacity="0.2" />
          <line x1="12" y1="2" x2="12" y2="7" />
          <line x1="12" y1="17" x2="12" y2="22" />
          <line x1="2" y1="12" x2="6.5" y2="12" />
          <line x1="17.5" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="4.93" x2="8.5" y2="9.5" />
          <line x1="19.07" y1="4.93" x2="15.5" y2="9.5" />
          <line x1="14" y1="13.5" x2="17.5" y2="18.5" />
          <line x1="10" y1="13.5" x2="6.5" y2="18.5" />
        </svg>
      );
    case 'boxeo':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.66 0 3-1.34 3-3V7c0-1.66-1.34-3-3-3H9.5C6.46 4 4 6.46 4 9.5V11c0 2.21 1.79 4 4 4h1" />
          <path d="M5 14v4a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-4" />
          <path d="M14 8h5" />
          <path d="M14 11h3" />
        </svg>
      );
    case 'pilates':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="2" />
          <path d="M5 20l4-6 3 2 4-8 4 3" />
          <path d="M9 14l-4 6" />
          <path d="M12 16l4 4" />
        </svg>
      );
    case 'escuelita':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" />
          <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" />
        </svg>
      );
    case 'cumpleanos':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
          <path d="M4 16s2-1 4-1 4 1 4 1 2-1 4-1 4 1 4 1" />
          <path d="M2 21h20" />
          <line x1="7" y1="7" x2="7" y2="11" />
          <line x1="12" y1="7" x2="12" y2="11" />
          <line x1="17" y1="7" x2="17" y2="11" />
          <circle cx="7" cy="4" r="1" fill="currentColor" />
          <circle cx="12" cy="4" r="1" fill="currentColor" />
          <circle cx="17" cy="4" r="1" fill="currentColor" />
        </svg>
      );
    case 'gimnasio':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 5v14" />
          <path d="M18 5v14" />
          <path d="M2 9v6" />
          <path d="M22 9v6" />
          <path d="M6 12h12" />
          <path d="M2 12h4" />
          <path d="M18 12h4" />
        </svg>
      );
    case 'led':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v3" />
          <path d="M12 19v3" />
          <path d="M4.93 4.93l2.12 2.12" />
          <path d="M16.95 16.95l2.12 2.12" />
          <path d="M2 12h3" />
          <path d="M19 12h3" />
          <path d="M4.93 19.07l2.12-2.12" />
          <path d="M16.95 7.05l2.12-2.12" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case 'vestuarios':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <line x1="12" y1="4" x2="12" y2="20" />
          <circle cx="8" cy="12" r="1" fill="currentColor" />
          <circle cx="16" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    case 'cantina':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      );
    case 'ubicacion':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
  }
};
