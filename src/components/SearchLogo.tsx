import React from 'react';

interface SearchLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export const SearchLogo: React.FC<SearchLogoProps> = ({
  size = 'lg',
  className = '',
  onClick,
}) => {
  // Letters: s - e - a - r - c - h
  // Colors: Google Blue, Red, Yellow, Blue, Green, Red
  const letters = [
    { char: 'G', color: '#4285F4' }, // Google Blue
    { char: 'o', color: '#EA4335' }, // Google Red
    { char: 'o', color: '#FBBC05' }, // Google Yellow
    { char: 'g', color: '#4285F4' }, // Google Blue
    { char: 'l', color: '#34A853' }, // Google Green
    { char: 'e', color: '#EA4335' }, // Google Red
  ];

  const sizeClasses = {
    sm: 'text-2xl sm:text-3xl tracking-tight font-medium',
    md: 'text-4xl sm:text-5xl tracking-tight font-medium',
    lg: 'text-6xl sm:text-7xl md:text-8xl tracking-tight font-medium',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center select-none font-['Plus_Jakarta_Sans',sans-serif] ${sizeClasses[size]} ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      role={onClick ? 'button' : 'banner'}
      aria-label="search logo"
    >
      {letters.map((item, index) => (
        <span
          key={index}
          style={{ color: item.color }}
          className="transition-transform duration-200 hover:-translate-y-0.5 inline-block"
        >
          {item.char}
        </span>
      ))}
    </div>
  );
};
