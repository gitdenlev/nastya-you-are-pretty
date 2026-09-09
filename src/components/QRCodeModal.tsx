import React, { useState } from 'react';
import { X, QrCode, Copy, Check } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(
    currentUrl
  )}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl relative text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-google-gray-100 text-google-gray-500"
          aria-label="Закрити"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-full bg-blue-50 text-google-blue flex items-center justify-center mx-auto mb-3">
          <QrCode className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-medium text-google-gray-900 mb-1">
          QR-код для смартфона
        </h3>
        <p className="text-xs text-google-gray-500 mb-4">
          Наведіть камеру телефону, щоб відкрити цей романтичний сюрприз
        </p>

        {/* QR Code Image */}
        <div className="bg-white p-3 rounded-xl border border-google-gray-200 inline-block shadow-inner mb-4">
          <img
            src={qrCodeUrl}
            alt="QR Code"
            className="w-52 h-52 object-contain"
          />
        </div>

        {/* Copy Link Button */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-google-gray-300 hover:bg-google-gray-50 text-xs sm:text-sm font-medium text-google-gray-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Посилання скопійовано!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-google-gray-500" />
                <span>Скопіювати посилання</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
