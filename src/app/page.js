'use client';
import React from "react";

export default function DisconnectedPage() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white text-center p-6">
      <h1 className="text-4xl font-bold">This site is offline due to non-payment</h1>
      <p className="mt-4 text-lg">The content you are looking for is unavailable at the moment.</p>
    </div>
  );
}
