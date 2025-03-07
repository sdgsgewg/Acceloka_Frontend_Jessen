"use client";
import React from "react";

interface GlobalErrorProps {
  error: string;
  onClose: () => void;
}

const GlobalError: React.FC<GlobalErrorProps> = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
      <span>{error}</span>
      <button
        onClick={onClose}
        className="ml-auto text-white hover:text-gray-200"
      >
        ✕
      </button>
    </div>
  );
};

export default GlobalError;
