import React from 'react';

interface SearchProgressBarProps {
  isLoading: boolean;
}

export const SearchProgressBar: React.FC<SearchProgressBarProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent overflow-hidden">
      {/* Google-like animated multi-phase loading bar */}
      <div className="relative w-full h-full bg-google-gray-100">
        <div className="absolute top-0 bottom-0 bg-[#4285F4] google-bar-1" />
        <div className="absolute top-0 bottom-0 bg-[#EA4335] google-bar-2" />
      </div>
    </div>
  );
};
