import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

export const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-6 right-6 z-[60] flex items-start max-w-sm gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border animate-fade-in ${
      type === 'error' 
        ? 'bg-red-500/10 border-red-500/20 text-red-200' 
        : 'bg-green-500/10 border-green-500/20 text-green-200'
    }`}>
      <div className="mt-1 shrink-0">
        {type === 'error' ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
      </div>
      <p className="font-medium text-sm leading-relaxed">{message}</p>
      <button 
        onClick={onClose} 
        className="ml-2 mt-1 opacity-70 hover:opacity-100 transition-opacity shrink-0"
      >
        <X size={18} />
      </button>
    </div>
  );
};
