import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhotoItem } from '../types';

interface PhotoCardProps {
  photo: PhotoItem;
  index: number;
  onSelect: (photo: PhotoItem) => void;
  reducedMotion?: boolean;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  index,
  onSelect,
  reducedMotion = false,
}) => {
  const [imgSrc, setImgSrc] = useState(photo.url);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (photo.fallbackUrl && imgSrc !== photo.fallbackUrl) {
      setImgSrc(photo.fallbackUrl);
    } else {
      setHasError(true);
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : 25,
      scale: reducedMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: reducedMotion ? 0.05 : 0.65,
        delay: reducedMotion ? 0 : index * 0.35,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="group relative overflow-hidden rounded-2xl bg-white border border-google-gray-200 hover:border-google-gray-300 hover:shadow-card-hover transition-all duration-300 cursor-pointer shadow-sm"
      onClick={() => onSelect(photo)}
    >
      {/* Image container */}
      <div className="relative w-full aspect-[4/5] bg-google-gray-100 overflow-hidden">
        {/* Shimmer placeholder while loading */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 shimmer-bg" />
        )}

        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 to-indigo-50 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-white/80 shadow-sm flex items-center justify-center text-rose-500 mb-2 text-xl font-serif">
              ✦
            </div>
            <p className="text-sm font-medium text-google-gray-800">
              Анастасія
            </p>
          </div>
        ) : (
          <img
            src={imgSrc}
            alt={photo.alt || 'Анастасія'}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
            onError={handleImageError}
            className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03] ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>
    </motion.article>
  );
};
