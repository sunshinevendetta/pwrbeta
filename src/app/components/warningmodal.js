'use client';
import React, { useState, useEffect } from 'react';

export default function WarningModal() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const hasSeenWarning = localStorage.getItem('hasSeenWarning');
    if (hasSeenWarning) {
      setIsOpen(false);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDoNotRemind = () => {
    localStorage.setItem('hasSeenWarning', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-90">
      <div className="bg-black p-6 rounded shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-white">Epilepsy Warning</h2>
        <p className="mb-4 text-white">
          This site contains flashing lights which may not be suitable for
          people with photosensitive epilepsy or other conditions.
        </p>
        <p className="mb-4 text-white">
          Viewer discretion is advised.
        </p>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleDoNotRemind}
            className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Do Not Remind Me Again
          </button>
          <button
            onClick={handleClose}
            className="py-2 px-4 rounded text-white hover-gradient-amber-4"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
