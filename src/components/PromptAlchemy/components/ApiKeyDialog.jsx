import React, { useState } from 'react';
import { Key, ChevronRight, ExternalLink } from 'lucide-react';

export const ApiKeyDialog = ({ onSubmit, error }) => {
  const [inputKey, setInputKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputKey.trim()) {
      onSubmit(inputKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-[#0f0524] border border-white/10 rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center flex flex-col items-center relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 via-blue-500 to-violet-600" />
        <div className="absolute -top-[100px] -right-[100px] w-[200px] h-[200px] bg-violet-600/20 blur-[60px] rounded-full pointer-events-none" />
        
        <div className="bg-violet-600/20 p-4 rounded-full mb-6 border border-violet-500/30">
          <Key className="w-8 h-8 text-violet-300" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-['Space_Grotesk']">
          Configurar API Key
        </h2>
        
        <p className="text-white/70 mb-6 leading-relaxed">
          Para usar esta aplicación, necesitas tu propia API Key de Google Gemini.
          <br />
          <span className="text-xs text-white/50">La clave se guarda localmente en tu navegador.</span>
        </p>

        {error && (
          <div className="w-full bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6 text-sm text-red-300">
            La API Key anterior no funcionó. Por favor intenta con una nueva.
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6 relative">
             <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="Pega tu API Key aquí (AIza...)"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all text-center font-mono"
              autoFocus
            />
          </div>
        
          <button
            type="submit"
            disabled={!inputKey.trim()}
            className="w-full px-6 py-4 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Comenzar
            <ChevronRight size={18} />
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 w-full">
          <a 
            href="https://aistudio.google.com/app/apikey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
          >
            Obtener API Key Gratis <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};
