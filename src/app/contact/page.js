'use client';
import React from 'react';

export default function WarningModal() {
  return (
    <div className="bg-black p-6 rounded shadow-lg max-w-md w-full text-center">
      <h2 className="text-2xl font-bold mb-4 text-white">Warning</h2>
      <p className="mb-4 text-white">
        This site is sun setting for lack of payment.
      </p>
    </div>
  );
}
