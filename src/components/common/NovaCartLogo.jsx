import React from 'react';

export default function NovaCartLogo({ size = 'default' }) {
  const isSmall = size === 'small';

  return (
    <div className="flex items-center gap-space-sm group select-none">
      {/* Precision Geometric Monogram Icon */}
      <div
        className={`rounded-lg bg-surface-container border border-primary-container/40 flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105 ${
          isSmall ? 'w-7 h-7' : 'w-8 h-8'
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className={`fill-none stroke-primary-container ${isSmall ? 'w-4 h-4' : 'w-5 h-5'}`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Stylized Hexagonal Precision N & Diamond */}
          <polygon points="12 2 21 7 21 17 12 22 3 17 3 7" strokeOpacity="0.3" />
          <polyline points="7 16 7 8 17 16 17 8" strokeWidth="2.2" />
        </svg>
      </div>

      <span
        className={`font-headline-sm text-text-primary font-bold tracking-tight uppercase transition-colors group-hover:text-primary-container ${
          isSmall ? 'text-[17px]' : 'text-headline-sm'
        }`}
      >
        NovaCart
      </span>
    </div>
  );
}
