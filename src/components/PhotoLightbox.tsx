import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PhotoItem } from '../types';

interface PhotoLightboxProps {
  photo: PhotoItem | null;
  photos: PhotoItem[];
  onClose: () => void;
  onNavigate: (photo: PhotoItem) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  photos,
  onClose,
  onNavigate,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, photos]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    onNavigate(photos[prevIndex]);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIndex = (currentIndex + 1) % photos.length;
    onNavigate(photos[nextIndex]);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Закрити"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Previous Button */}
        {photos.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors hidden sm:flex items-center justify-center"
            aria-label="Попереднє фото"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {photos.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors hidden sm:flex items-center justify-center"
            aria-label="Наступне фото"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Main Content Modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl max-h-[90vh] flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-transparent shadow-2xl"
        >
          <div className="relative max-h-[85vh] w-auto overflow-hidden rounded-2xl flex items-center justify-center">
            <img
              src={photo.url}
              alt={photo.alt || 'Анастасія'}
              onError={(e) => {
                if (photo.fallbackUrl && e.currentTarget.src !== photo.fallbackUrl) {
                  e.currentTarget.src = photo.fallbackUrl;
                }
              }}
              className="max-h-[85vh] w-auto max-w-full object-contain rounded-2xl select-none"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
