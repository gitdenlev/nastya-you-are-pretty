import React, { useState } from 'react';
import { SearchLogo } from './SearchLogo';
import { GoogleMicIcon, GoogleLensIcon, SearchIcon } from './GoogleIcons';
import { PhotoCard } from './PhotoCard';
import { PhotoLightbox } from './PhotoLightbox';
import { PhotoItem } from '../types';
import { BookOpen } from 'lucide-react';

interface SearchResultsPageProps {
  onRestart: () => void;
  photos: PhotoItem[];
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  onRestart,
  photos,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white text-google-gray-900 selection:bg-google-blue selection:text-white pb-16">
      {/* Search Results Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-google-gray-200 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5">
          {/* Top Bar: Logo + Input */}
          {/* Top Bar: Logo + Input */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center">
              <SearchLogo
                size="sm"
                onClick={onRestart}
                className="cursor-pointer select-none"
              />
            </div>

            <div className="flex-1 max-w-2xl sm:ml-4">
              <div className="flex items-center w-full h-11 px-4 rounded-full border border-google-gray-200 hover:shadow-search focus-within:shadow-search transition-all bg-white">
                <input
                  type="text"
                  value="богиня"
                  readOnly
                  className="flex-1 bg-transparent text-sm sm:text-base text-google-gray-900 outline-none font-normal"
                />

                <div className="flex items-center space-x-2 pl-2 border-l border-google-gray-200 ml-2">
                  <button
                    type="button"
                    className="p-1 text-google-gray-500 hover:text-google-gray-700"
                    title="Пошук голосом"
                  >
                    <GoogleMicIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-1 text-google-gray-500 hover:text-google-gray-700"
                    title="Пошук за зображенням"
                  >
                    <GoogleLensIcon className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="p-1 text-google-blue"
                    title="Пошук"
                  >
                    <SearchIcon className="w-4 h-4 text-google-blue" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 w-full mt-4 flex-1">
        {/* Search Statistics */}
        <div className="text-xs sm:text-[13px] text-google-gray-600 mb-6 flex items-center justify-between">
          <p>
            Приблизно 1 результат (0.24 сек) • знайдено єдину у світі
          </p>
        </div>

        {/* Google Featured Dictionary / Definition Snippet Card */}
        <section className="mb-8 p-5 sm:p-6 rounded-2xl border border-google-gray-200 bg-google-gray-50/50 hover:bg-white transition-all duration-300 shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-semibold text-google-gray-500 uppercase tracking-wider mb-2">
            <BookOpen className="w-4 h-4 text-google-blue" />
            <span>Тлумачний словник</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3">
            <h1 className="text-2xl sm:text-3xl font-medium text-google-gray-900">
              богиня
            </h1>
            <span className="text-sm text-google-gray-500 italic">
              /бо•ги́•ня/ • іменник, жіночий рід
            </span>
          </div>

          <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-google-gray-800">
            <li className="pl-1 leading-relaxed">
              <span className="font-normal">
                Жінка надзвичайної краси, витонченості та щирого серця, яка освітлює все навколо своєю присутністю.
              </span>
            </li>
            <li className="pl-1 leading-relaxed text-google-gray-700">
              <span className="font-normal">
                Та, від чиєї усмішки перехоплює подих.
              </span>
            </li>
            <li className="pl-1 text-google-blue font-medium list-none pt-1">
              <span>Див. фотографічні докази нижче:</span>
            </li>
          </ol>
        </section>

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-google-gray-700">
            Картинки
          </h2>
          <span className="text-xs text-google-gray-500">
            {photos.length} фотографій
          </span>
        </div>

        {/* Photo Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {photos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              onSelect={(p) => setSelectedPhoto(p)}
            />
          ))}
        </div>
      </main>

      {/* Lightbox for zooming photos */}
      <PhotoLightbox
        photo={selectedPhoto}
        photos={photos}
        onClose={() => setSelectedPhoto(null)}
        onNavigate={(p) => setSelectedPhoto(p)}
      />
    </div>
  );
};
