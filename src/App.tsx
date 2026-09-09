import React, { useState, useCallback, useEffect } from 'react';
import { InitialSearchPage } from './components/InitialSearchPage';
import { SearchResultsPage } from './components/SearchResultsPage';
import { SearchProgressBar } from './components/SearchProgressBar';
import { getActivePhotos } from './data/photos';
import { PhotoItem } from './types';

export const App: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [photos] = useState<PhotoItem[]>(getActivePhotos);
  const [resetKey, setResetKey] = useState(0);

  // Preload photos in background so they render immediately when search completes
  useEffect(() => {
    photos.forEach((photo) => {
      const img = new Image();
      img.src = photo.url;
      if (photo.fallbackUrl) {
        const fallbackImg = new Image();
        fallbackImg.src = photo.fallbackUrl;
      }
    });
  }, [photos]);

  const handleStartSearch = useCallback(() => {
    setIsSearching(true);

    // Search transition lasts ~950ms (between 800-1200ms as requested)
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 950);
  }, []);

  const handleRestart = useCallback(() => {
    setHasSearched(false);
    setIsSearching(false);
    // Increment resetKey to force re-mounting and clean restart of the typing animation
    setResetKey((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-full bg-white text-google-gray-900 selection:bg-google-blue selection:text-white">
      {/* Top Google progress loading bar during search transition */}
      <SearchProgressBar isLoading={isSearching} />

      {!hasSearched ? (
        <InitialSearchPage
          key={resetKey}
          onSearch={handleStartSearch}
          isSearching={isSearching}
          targetWord="богиня"
        />
      ) : (
        <SearchResultsPage
          key={resetKey}
          onRestart={handleRestart}
          photos={photos}
        />
      )}
    </div>
  );
};

export default App;
