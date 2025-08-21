import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ErrorMessage({ message }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div 
      className={`flex items-center gap-2 bg-white rounded-lg shadow-md px-3 py-2 w-fit transition-all duration-300 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}
    >
      {/* Red Circle with X */}
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500">
        <X 
          size={14} 
          className={`text-white transition-all duration-500 delay-200 transform ${
            isVisible ? 'scale-100' : 'scale-0'
          }`}
        />
      </div>

      {/* Message Text */}
      <p className="text-sm text-gray-800 m-0">{message}</p>
    </div>
  );
}
