import React, { useState, useRef, useEffect } from 'react';
import { Background } from './components/Background';
import { ApiKeyDialog } from './components/ApiKeyDialog';
import { Notification } from './components/Notification';
import { analyzeUserPrompt, generateVariations } from './services/geminiService';
import { 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  User, 
  FileText, 
  Target, 
  Layout, 
  Ban,
  ArrowRight,
  Copy,
  RotateCw,
  Zap,
  LogOut
} from 'lucide-react';

// --- UI Components ---

const Card = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 ${className}`}
  >
    {children}
  </div>
);

const Button = ({ 
  children, 
  onClick, 
  disabled, 
  variant = 'primary', 
  className = '' 
}) => {
  const baseStyles = "flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5 border-0",
    secondary: "bg-white/10 border border-white/20 text-white hover:bg-white/20",
    ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const StatusIcon = ({ present }) => {
  return present ? (
    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 text-green-400">
      <CheckCircle2 size={18} />
    </div>
  ) : (
    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30 text-red-400">
      <AlertCircle size={18} />
    </div>
  );
};

const ElementCard = ({ 
  icon, 
  title, 
  present, 
  feedback,
  delay
}) => (
  <div 
    className="animate-fade-in" 
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`h-full p-5 rounded-xl border transition-colors duration-300 ${
      present 
        ? 'bg-green-500/5 border-green-500/20 hover:bg-green-500/10' 
        : 'bg-red-500/5 border-red-500/20 hover:bg-red-500/10'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/5 text-white/90">
            {icon}
          </div>
          <h4 className="font-['Space_Grotesk'] font-semibold text-lg">{title}</h4>
        </div>
        <StatusIcon present={present} />
      </div>
      <p className="text-sm text-white/70 leading-relaxed">{feedback}</p>
    </div>
  </div>
);

// --- Main Component ---

/**
 * PromptAlchemy Component
 * 
 * A self-contained prompt analysis and optimization tool powered by Google Gemini.
 * 
 * @param {Object} props
 * @param {string} [props.title] - Custom title for the component header
 * @param {string} [props.subtitle] - Custom subtitle/description
 * @param {boolean} [props.showBackground=true] - Whether to show the animated background
 * @param {string} [props.className] - Additional CSS classes for the container
 */
export function PromptAlchemy({ 
  title = "Transforma tus Prompts en Magia Pura",
  subtitle = "Deja de recibir respuestas genéricas. Utiliza esta fórmula científica (Rol + Contexto + Tarea + Formato + Restricciones) para obtener resultados profesionales de cualquier IA.",
  showBackground = true,
  className = ""
}) {
  const [prompt, setPrompt] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [optimization, setOptimization] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('input');
  
  // State for API Key management
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [apiKeyError, setApiKeyError] = useState(false);

  // State for Notification
  const [notification, setNotification] = useState(null);
  
  const resultsRef = useRef(null);

  // Load API Key from localStorage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      setShowApiKeyDialog(false);
    } else {
      setShowApiKeyDialog(true);
    }
  }, []);

  const handleApiKeySubmit = (key) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
    setShowApiKeyDialog(false);
    setApiKeyError(false);
  };

  const handleClearApiKey = () => {
    setApiKey('');
    localStorage.removeItem('gemini_api_key');
    setShowApiKeyDialog(true);
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleAnalyze = async () => {
    if (!prompt.trim()) return;
    if (!apiKey) {
      setShowApiKeyDialog(true);
      return;
    }
    
    setLoading(true);
    setStep('analyzing');
    setAnalysis(null);
    setOptimization(null);
    setApiKeyError(false);
    setNotification(null);

    try {
      const analysisResult = await analyzeUserPrompt(prompt, apiKey);
      setAnalysis(analysisResult);
      
      const optimizationResult = await generateVariations(prompt, analysisResult, apiKey);
      setOptimization(optimizationResult);
      
      setStep('results');
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (error) {
      console.error("Analysis failed:", error);
      const errorMessage = (error.message || error.toString()).toLowerCase();
      
      // Categorize common errors for better user feedback
      if (
        errorMessage.includes("api_key_invalid") || 
        errorMessage.includes("403") || 
        errorMessage.includes("permission denied")
      ) {
         setApiKeyError(true);
         setShowApiKeyDialog(true);
         localStorage.removeItem('gemini_api_key');
         setApiKey('');
         setStep('input');
         showNotification("La API Key no es válida o ha expirado. Por favor ingresa una nueva.", 'error');
      } else if (errorMessage.includes("fetch failed") || errorMessage.includes("network")) {
         showNotification("Error de conexión. Verifica tu internet o si tienes algún bloqueador activo.", 'error');
         setStep('input');
      } else if (errorMessage.includes("syntaxerror") || errorMessage.includes("json")) {
         // This is a model output error, sometimes retry helps
         showNotification("La IA tuvo un hipo y no pudo formatear la respuesta. Por favor intenta de nuevo.", 'error');
         setStep('input');
      } else if (errorMessage.includes("overloaded") || errorMessage.includes("503")) {
        showNotification("Los servidores de IA están saturados. Espera unos segundos e intenta de nuevo.", 'error');
        setStep('input');
      } else {
         showNotification(`Ocurrió un error inesperado. Inténtalo de nuevo más tarde.`, 'error');
         setStep('input');
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showNotification("Prompt copiado al portapapeles", 'success');
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 50) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <div className={`min-h-screen relative pb-20 bg-[#0a0118] text-white ${className}`}>
      {showBackground && <Background />}

      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}

      {showApiKeyDialog && (
        <ApiKeyDialog onSubmit={handleApiKeySubmit} error={apiKeyError} />
      )}
      
      {/* Header */}
      <header className="pt-12 pb-8 px-6 text-center max-w-4xl mx-auto relative">
        {apiKey && !showApiKeyDialog && (
          <button 
            onClick={handleClearApiKey}
            className="absolute top-6 right-6 p-2 text-white/30 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Cambiar API Key"
          >
            <LogOut size={20} />
          </button>
        )}

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-violet-200 mb-6 backdrop-blur-md">
          <Sparkles size={12} />
          <span>Presentify Prompt Engineer</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 leading-tight">
          {title.includes('<br') ? (
            <span dangerouslySetInnerHTML={{ __html: title }} />
          ) : (
            title
          )}
        </h1>
        
        <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </header>

      {/* Main Content */}
      <main className="px-6 max-w-6xl mx-auto">
        
        {/* Input Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-1 rounded-3xl border border-white/10 shadow-2xl">
            <div className="bg-[#0f0524] rounded-[22px] overflow-hidden p-6 md:p-8">
              <label className="block text-sm font-semibold text-violet-300 uppercase tracking-wider mb-3">
                Tu Prompt Actual
              </label>
              
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ej: Dame ideas de marketing para mi tienda..."
                className="w-full h-40 bg-transparent text-xl md:text-2xl text-white placeholder-white/30 resize-none focus:outline-none font-['Space_Grotesk'] leading-normal"
              />
              
              <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
                <div className="flex gap-4 text-sm text-white/50">
                   <div className="flex items-center gap-1.5"><RotateCw size={14}/> <span>AI-Powered</span></div>
                   <div className="flex items-center gap-1.5"><Zap size={14}/> <span>Análisis Instantáneo</span></div>
                </div>
                
                <Button 
                  onClick={handleAnalyze} 
                  disabled={loading || !prompt}
                  className="w-full md:w-auto min-w-[200px]"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Optimizando...
                    </>
                  ) : (
                    <>
                      Analizar y Optimizar <ArrowRight size={18} />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {step === 'results' && analysis && optimization && (
          <div ref={resultsRef} className="space-y-16 animate-fade-in">
            
            {/* Analysis Dashboard */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <h2 className="text-3xl font-bold text-center">Diagnóstico del Prompt</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Score Card */}
                <Card className="col-span-1 md:col-span-1 p-8 flex flex-col items-center justify-center text-center bg-gradient-to-br from-white/10 to-transparent">
                  <div className="text-sm font-medium text-white/60 mb-2 uppercase tracking-widest">Puntuación</div>
                  <div className={`text-7xl font-bold font-['Space_Grotesk'] mb-2 ${getScoreColor(analysis.score)}`}>
                    {analysis.score}
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs border border-white/20">
                    {analysis.score < 50 ? 'Necesita Mejorar' : analysis.score < 80 ? 'Buen Comienzo' : 'Excelente'}
                  </div>
                </Card>

                {/* Summary Card */}
                <Card className="col-span-1 md:col-span-2 p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Sparkles className="text-amber-400" size={20} />
                    Resumen del Experto
                  </h3>
                  <p className="text-lg text-white/80 leading-relaxed">
                    {analysis.summary}
                  </p>
                </Card>
              </div>

              {/* Elements Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <ElementCard 
                  icon={<User size={20} />} 
                  title="Rol" 
                  present={analysis.elements?.role?.present ?? false} 
                  feedback={analysis.elements?.role?.feedback ?? "No analizado"}
                  delay={100}
                />
                <ElementCard 
                  icon={<Layout size={20} />} 
                  title="Contexto" 
                  present={analysis.elements?.context?.present ?? false} 
                  feedback={analysis.elements?.context?.feedback ?? "No analizado"}
                  delay={200}
                />
                <ElementCard 
                  icon={<Target size={20} />} 
                  title="Tarea" 
                  present={analysis.elements?.task?.present ?? false} 
                  feedback={analysis.elements?.task?.feedback ?? "No analizado"}
                  delay={300}
                />
                <ElementCard 
                  icon={<FileText size={20} />} 
                  title="Formato" 
                  present={analysis.elements?.format?.present ?? false} 
                  feedback={analysis.elements?.format?.feedback ?? "No analizado"}
                  delay={400}
                />
                <ElementCard 
                  icon={<Ban size={20} />} 
                  title="Restricciones" 
                  present={analysis.elements?.restrictions?.present ?? false} 
                  feedback={analysis.elements?.restrictions?.feedback ?? "No analizado"}
                  delay={500}
                />
              </div>
            </section>

            {/* Variations Section */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <h2 className="text-3xl font-bold text-center">Versiones Optimizadas</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {optimization.variations.map((variant, idx) => (
                  <div key={idx} className="animate-fade-in" style={{ animationDelay: `${600 + (idx * 150)}ms` }}>
                    <Card className="h-full flex flex-col group border-white/10 hover:border-violet-500/50">
                      {/* Card Header */}
                      <div className="p-6 pb-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600/20 to-blue-600/20 flex items-center justify-center mb-4 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                          <span className="font-['Space_Grotesk'] font-bold text-xl text-white">
                            {idx + 1}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-violet-300 transition-colors">
                          {variant.title}
                        </h3>
                        <p className="text-sm text-white/50 min-h-[40px]">
                          {variant.explanation}
                        </p>
                      </div>

                      {/* Prompt Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex-1 bg-black/20 rounded-xl p-4 mb-4 border border-white/5 font-mono text-sm text-white/80 overflow-y-auto max-h-[300px] whitespace-pre-wrap shadow-inner custom-scrollbar">
                          {variant.content}
                        </div>
                        <Button 
                          variant="secondary" 
                          className="w-full text-sm py-2"
                          onClick={() => copyToClipboard(variant.content)}
                        >
                          <Copy size={14} /> Copiar Prompt
                        </Button>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 text-center">
                <p className="text-white/40 italic mb-6">
                  Tip: Rellena los detalles entre [corchetes] antes de usar estos prompts.
                </p>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setPrompt('');
                    setStep('input');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mx-auto border-white/10"
                >
                  <RotateCw size={16} /> Analizar otro prompt
                </Button>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
