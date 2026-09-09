import React from 'react';

export const GoogleMicIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"
      fill="#4285F4"
    />
    <path
      d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
      fill="#34A853"
    />
    <path
      d="M10 19.92V21h4v-1.08c1.7-.25 3.25-1.09 4.41-2.33l-1.42-1.42C16.14 17.06 14.93 17.65 13.5 17.85v.07h-3v-.07c-1.43-.2-2.64-.79-3.49-1.68l-1.42 1.42c1.16 1.24 2.71 2.08 4.41 2.33z"
      fill="#FBBC05"
    />
    <path
      d="M19 11h-2c0 .69-.14 1.35-.4 1.94l1.45 1.45C18.66 13.38 19 12.23 19 11z"
      fill="#EA4335"
    />
  </svg>
);

export const GoogleLensIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 15a3 3 0 100-6 3 3 0 000 6z"
      fill="#4285F4"
    />
    <path
      d="M19.5 6.5h-2.17l-.84-1.85C16.15 3.96 15.44 3.5 14.67 3.5h-5.34c-.77 0-1.48.46-1.82 1.15L6.67 6.5H4.5C3.12 6.5 2 7.62 2 9v9c0 1.38 1.12 2.5 2.5 2.5h15c1.38 0 2.5-1.12 2.5-2.5V9c0-1.38-1.12-2.5-2.5-2.5zM12 17a5 5 0 110-10 5 5 0 010 10z"
      fill="#EA4335"
    />
    <circle cx="12" cy="12" r="3.5" fill="#FBBC05" fillOpacity="0.8" />
    <path
      d="M18.5 9.5a1 1 0 100-2 1 1 0 000 2z"
      fill="#34A853"
    />
  </svg>
);

export const SearchIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5 text-gray-400" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export const GoogleAppsGridIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6 text-gray-600" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="6" cy="6" r="2" />
    <circle cx="12" cy="6" r="2" />
    <circle cx="18" cy="6" r="2" />
    <circle cx="6" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="18" cy="12" r="2" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="12" cy="18" r="2" />
    <circle cx="18" cy="18" r="2" />
  </svg>
);
