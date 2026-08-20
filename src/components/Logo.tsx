import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'badge' | 'light' | 'mono';
  height?: number | string;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  variant = 'full', 
  height = 42,
  showText = true 
}) => {
  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img 
        src="/logo.svg" 
        alt="Predio Norte"
        style={{ height: typeof height === 'number' ? `${height}px` : height, width: 'auto' }}
        className="drop-shadow-sm transition-transform duration-200 hover:scale-[1.02]"
      />
    </div>
  );
};
