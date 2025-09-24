import React from 'react';
import { Shirt } from 'lucide-react';

export default function LaundryLoader() {
  return (
    <div className="relative w-24 h-24">
      {/* Washing machine body with white background and rounded corners */}
      <div className="absolute inset-0 rounded-3xl bg-white shadow-md border border-gray-300" />

      {/* Glass door */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gray-100/50 border-4 border-gray-300 backdrop-blur-sm flex items-center justify-center">
        {/* Spinning clothes inside */}
        <div
          className="w-full h-full flex items-center justify-center animate-spin"
          style={{ animationDuration: '1.5s' }}
        >
          <Shirt className="w-8 h-8 text-gray-600 -rotate-45" />
        </div>
      </div>

      {/* Control panel lights */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-gray-500 rounded-full shadow-lg" />
      <div className="absolute top-2 right-5 w-2 h-2 bg-gray-400 rounded-full" />
    </div>
  );
}
