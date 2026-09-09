import React, { useState } from 'react';
import { X, Upload, Trash2, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { PhotoItem } from '../types';
import { DEFAULT_PHOTOS } from '../data/photos';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotosUpdated: (photos: PhotoItem[]) => void;
  currentPhotos: PhotoItem[];
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  onPhotosUpdated,
  currentPhotos,
}) => {
  const [photosList, setPhotosList] = useState<PhotoItem[]>(currentPhotos);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: PhotoItem[] = [];
    const fileArray = Array.from(files).slice(0, 8); // allow up to 8 images

    let processed = 0;
    fileArray.forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        newItems.push({
          id: `custom-${Date.now()}-${idx}`,
          url: base64,
          alt: 'Анастасія',
          caption: photosList[idx]?.caption || 'Та сама неперевершена усмішка',
          tag: 'Богиня',
        });
        processed++;

        if (processed === fileArray.length) {
          const updated = [...newItems];
          setPhotosList(updated);
          localStorage.setItem('anastasia_custom_photos', JSON.stringify(updated));
          onPhotosUpdated(updated);
          setSuccessMsg('Фотографії успішно завантажено та збережено!');
          setTimeout(() => setSuccessMsg(''), 3500);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleReset = () => {
    localStorage.removeItem('anastasia_custom_photos');
    setPhotosList(DEFAULT_PHOTOS);
    onPhotosUpdated(DEFAULT_PHOTOS);
    setSuccessMsg('Скинуто до початкових налаштувань');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-google-gray-100 text-google-gray-500"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-medium text-google-gray-900 mb-2 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-google-blue" />
          Керування фотографіями
        </h3>

        <p className="text-sm text-google-gray-600 mb-4">
          Ви можете швидко замінити фотографії для сюрпризу двома способами:
        </p>

        {/* Option 1: File drop in project */}
        <div className="bg-google-gray-50 border border-google-gray-200 rounded-xl p-4 mb-4 text-xs sm:text-sm text-google-gray-700 space-y-1.5">
          <div className="font-semibold text-google-gray-900">
            Спосіб 1: Постійні файли в проекті (для деплою)
          </div>
          <p>
            Скопіюйте реальні фотографії Анастасії у папку проекту:
          </p>
          <code className="block bg-white p-2 rounded border border-google-gray-300 text-google-gray-800 font-mono text-xs">
            public/photos/photo1.jpg<br />
            public/photos/photo2.jpg<br />
            public/photos/photo3.jpg<br />
            ...
          </code>
        </div>

        {/* Option 2: Browser upload */}
        <div className="border border-dashed border-google-gray-300 rounded-xl p-5 text-center hover:border-google-blue transition-colors mb-4 bg-white">
          <Upload className="w-8 h-8 text-google-blue mx-auto mb-2" />
          <p className="text-sm font-medium text-google-gray-800 mb-1">
            Спосіб 2: Миттєве завантаження у браузері
          </p>
          <p className="text-xs text-google-gray-500 mb-3">
            Виберіть фотографії з комп'ютера або телефону, щоб одразу побачити їх
          </p>
          <label className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-google-blue hover:bg-blue-600 text-white text-xs sm:text-sm font-medium cursor-pointer shadow-sm">
            <span>Обрати фотографії</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {successMsg && (
          <div className="flex items-center space-x-2 p-3 bg-emerald-50 text-emerald-800 rounded-lg text-sm mb-4">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-google-gray-200">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center space-x-1.5 text-xs text-rose-600 hover:text-rose-700 font-medium py-1 px-2 rounded hover:bg-rose-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Скинути до стандартних</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-white bg-google-gray-900 hover:bg-google-gray-800 rounded-lg"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
};
