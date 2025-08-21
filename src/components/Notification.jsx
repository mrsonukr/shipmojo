import React, { useState, useEffect } from "react";
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";

export default function Notification({ message, type = "error", onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getIconAndColors = () => {
    switch (type) {
      case "success":
        return {
          icon: CheckCircle,
          bgColor: "bg-green-500",
          textColor: "text-green-800"
        };
      case "warning":
        return {
          icon: AlertTriangle,
          bgColor: "bg-yellow-500",
          textColor: "text-yellow-800"
        };
      case "info":
        return {
          icon: Info,
          bgColor: "bg-blue-500",
          textColor: "text-blue-800"
        };
      default: // error
        return {
          icon: X,
          bgColor: "bg-red-500",
          textColor: "text-red-800"
        };
    }
  };

  const { icon: Icon, bgColor, textColor } = getIconAndColors();

  return (
    <div 
      className={`flex items-center gap-2 bg-white rounded-lg shadow-md px-3 py-2 w-fit transition-all duration-300 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}
    >
      {/* Icon Circle */}
      <div className={`flex items-center justify-center w-6 h-6 rounded-full ${bgColor}`}>
        <Icon 
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
