import React, { useEffect, useState, useRef } from 'react';
import { SearchLogo } from './SearchLogo';
import { SearchIcon, GoogleMicIcon, GoogleLensIcon, GoogleAppsGridIcon } from './GoogleIcons';

interface InitialSearchPageProps {
  onSearch: () => void;
  targetWord?: string;
  isSearching: boolean;
}

export const InitialSearchPage: React.FC<InitialSearchPageProps> = ({
  onSearch,
  targetWord = 'богиня',
  isSearching,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const searchTriggeredRef = useRef(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let charIndex = 0;

    // Small initial delay (500ms) before typing begins to simulate natural arrival
    const startDelay = setTimeout(() => {
      const typeNextChar = () => {
        if (charIndex < targetWord.length) {
          charIndex++;
          setDisplayedText(targetWord.slice(0, charIndex));
          
          // Realistic slight variation between 110ms and 140ms per character
          const typingSpeed = 110 + Math.floor(Math.random() * 30);
          timeoutId = setTimeout(typeNextChar, typingSpeed);
        } else {
          // Word finished typing
          setIsTypingDone(true);

          // Wait ~700ms before triggering the search action
          timeoutId = setTimeout(() => {
            if (!searchTriggeredRef.current) {
              // Highlight the "Пошук" button as if clicked
              setIsButtonClicked(true);
              setTimeout(() => {
                searchTriggeredRef.current = true;
                onSearch();
              }, 250);
            }
          }, 700);
        }
      };

      typeNextChar();
    }, 500);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(timeoutId);
    };
  }, [targetWord, onSearch]);

  const handleManualSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTriggeredRef.current) {
      searchTriggeredRef.current = true;
      setIsButtonClicked(true);
      setTimeout(() => {
        onSearch();
      }, 150);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white select-none transition-opacity duration-500">
      {/* Top navigation */}
      <header className="w-full flex items-center justify-between px-6 py-4 text-[13px] text-google-gray-800">
        <div className="flex items-center space-x-4">
          <span className="text-google-gray-700 hover:underline cursor-pointer hidden sm:inline">
            Про сервіс
          </span>
          <span className="text-google-gray-700 hover:underline cursor-pointer hidden sm:inline">
            Магазин
          </span>
        </div>

        <div className="flex items-center space-x-4 ml-auto">
          <span className="text-google-gray-700 hover:underline cursor-pointer text-sm">
            Gmail
          </span>
          <span className="text-google-gray-700 hover:underline cursor-pointer text-sm">
            Зображення
          </span>
          <button
            type="button"
            className="p-2 rounded-full hover:bg-google-gray-100 transition-colors text-google-gray-600"
            aria-label="Google apps"
          >
            <GoogleAppsGridIcon className="w-5 h-5 text-google-gray-600" />
          </button>
        </div>
      </header>

      {/* Main search center interface */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 -mt-14 sm:-mt-20">
        {/* Custom colorful "search" logo */}
        <div className="mb-7 transform hover:scale-105 transition-transform duration-300">
          <SearchLogo size="lg" />
        </div>

        {/* Search input container */}
        <form
          onSubmit={handleManualSearch}
          className="w-full max-w-[584px] mx-auto relative group"
        >
          <div className="relative flex items-center w-full min-h-[46px] sm:min-h-[48px] px-4 rounded-full border border-google-gray-200 hover:border-transparent hover:shadow-search focus-within:shadow-search focus-within:border-transparent transition-all duration-200 bg-white">
            {/* Magnifying search icon */}
            <div className="mr-3 text-google-gray-500 flex items-center">
              <SearchIcon className="w-5 h-5 text-[#9aa0a6]" />
            </div>

            {/* Realistic typed input simulation */}
            <div className="flex-1 text-[16px] text-google-gray-900 font-normal tracking-normal flex items-center h-full py-2">
              <span>{displayedText}</span>
              {!isSearching && (
                <span
                  className={`animate-caret ${
                    isTypingDone ? 'opacity-70' : 'opacity-100'
                  }`}
                />
              )}
            </div>

            {/* Google-like icons right side */}
            <div className="flex items-center space-x-3 ml-2">
              <button
                type="button"
                className="p-1 rounded-full hover:bg-google-gray-100 transition-colors"
                title="Пошук голосом"
                aria-label="Voice search"
              >
                <GoogleMicIcon className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-1 rounded-full hover:bg-google-gray-100 transition-colors"
                title="Пошук за зображенням"
                aria-label="Search by image"
              >
                <GoogleLensIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search action buttons */}
          <div className="flex items-center justify-center space-x-3 mt-7">
            <button
              type="button"
              onClick={handleManualSearch}
              className={`px-4 py-2 text-sm text-[#3c4043] rounded bg-[#f8f9fa] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-xs focus:outline-none transition-all duration-150 ${
                isButtonClicked ? 'bg-[#e8eaed] scale-95 border-[#dadce0]' : ''
              }`}
            >
              Пошук
            </button>
            <button
              type="button"
              onClick={handleManualSearch}
              className="px-4 py-2 text-sm text-[#3c4043] rounded bg-[#f8f9fa] border border-[#f8f9fa] hover:border-[#dadce0] hover:shadow-xs focus:outline-none transition-all duration-150"
            >
              Мені пощастить
            </button>
          </div>
        </form>

        {/* Small Google language line */}
        <div className="mt-8 text-xs sm:text-[13px] text-google-gray-700 text-center">
          <span>Мова сервісу: </span>
          <span className="text-[#1a0dab] hover:underline cursor-pointer">
            Українська
          </span>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#f2f2f2] text-google-gray-600 text-[14px]">
        <div className="px-6 py-3 border-b border-[#dadce0] text-[15px] text-google-gray-700">
          Україна
        </div>
        <div className="px-6 py-3 flex flex-wrap items-center justify-between gap-y-2 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="hover:underline cursor-pointer">Про нас</span>
            <span className="hover:underline cursor-pointer">Реклама</span>
            <span className="hover:underline cursor-pointer">Для бізнесу</span>
            <span className="hover:underline cursor-pointer">Як працює пошук</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span className="hover:underline cursor-pointer">Конфіденційність</span>
            <span className="hover:underline cursor-pointer">Умови</span>
            <span className="hover:underline cursor-pointer">Налаштування</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
