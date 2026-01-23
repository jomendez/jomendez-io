import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AIPanorama = () => {
  const navigate = useNavigate();
  const [activeProviders, setActiveProviders] = useState([]);
  const [viewMode, setViewMode] = useState('advanced');
  const [animatedStep, setAnimatedStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [expandedSections, setExpandedSections] = useState(['intro', 'howworks', 'types', 'hallucinations', 'providers', 'consumption', 'tokens', 'future']);
  const [selectedAITypes, setSelectedAITypes] = useState([]);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [highlightedCategory, setHighlightedCategory] = useState(null);
  const [presentationMode, setPresentationMode] = useState(true);
  const [expandedFutureItems, setExpandedFutureItems] = useState([]);
  const [tokenInput, setTokenInput] = useState('Explica de manera simple como la inteligencia artificial está transformando los negocios.');
  const [currentSection, setCurrentSection] = useState(0);
  const [showKeyboardHint, setShowKeyboardHint] = useState(true);

  const sections = ['header', 'intro', 'howworks', 'types', 'hallucinations', 'providers', 'consumption', 'tokens', 'future'];
  const sectionNames = {
    header: 'Inicio',
    intro: '¿Qué es la IA?',
    howworks: '¿Cómo funciona?',
    types: 'Tipos de IA',
    hallucinations: 'Alucinaciones',
    providers: 'Proveedores',
    consumption: 'Formas de Uso',
    tokens: 'Tokens',
    future: 'Futuro'
  };

  const transitionNotes = {
    header: "Comencemos explorando qué es realmente la inteligencia artificial...",
    intro: "Ahora que entendemos qué es la IA, veamos cómo funciona por dentro...",
    howworks: "Con esta base técnica, exploremos los diferentes tipos de IA que encontramos hoy...",
    types: "Pero no todo es perfecto. Los LLMs tienen una limitación importante: las alucinaciones...",
    hallucinations: "Conociendo las limitaciones, ahora veamos quiénes son los principales proveedores del mercado...",
    providers: "Con los proveedores claros, exploremos las dos formas principales de consumir estos servicios...",
    consumption: "Para usar estos servicios de IA, necesitamos entender cómo se cobran: los tokens...",
    tokens: "Finalmente, miremos hacia dónde se dirige todo esto..."
  };

  const scrollToSection = (index) => {
    const sectionId = sections[index];
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setCurrentSection(index);
    }
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      scrollToSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      scrollToSection(currentSection - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        nextSection();
        setShowKeyboardHint(false);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        prevSection();
        setShowKeyboardHint(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection]);

  // Hide keyboard hint after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowKeyboardHint(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Simulated tokenizer function
  const simulateTokenization = (text) => {
    if (!text) return [];
    const tokens = [];
    // Simple simulation: split by common patterns
    const pattern = /(\s+|[.,!?;:'"()\[\]{}]|\w+)/g;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const word = match[0];
      if (word.trim().length === 0) {
        tokens.push(' ');
      } else if (word.length > 6) {
        // Split longer words into subword tokens
        const mid = Math.ceil(word.length / 2);
        tokens.push(word.slice(0, mid));
        tokens.push(word.slice(mid));
      } else {
        tokens.push(word);
      }
    }
    return tokens;
  };

  const simulatedTokens = simulateTokenization(tokenInput);

  const tokenColors = [
    'rgba(16,163,127,0.6)',
    'rgba(217,119,6,0.6)',
    'rgba(66,133,244,0.6)',
    'rgba(139,92,246,0.6)',
    'rgba(236,72,153,0.6)',
    'rgba(34,197,94,0.6)',
    'rgba(249,115,22,0.6)',
    'rgba(99,102,241,0.6)'
  ];

  const pricingData = [
    // OpenAI
    { name: 'GPT-4o', provider: 'OpenAI', color: '#10A37F', input: 5.00, output: 15.00 },
    { name: 'GPT-4o mini', provider: 'OpenAI', color: '#10A37F', input: 0.15, output: 0.60 },
    { name: 'o1', provider: 'OpenAI', color: '#10A37F', input: 15.00, output: 60.00 },
    // Anthropic
    { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', color: '#D97706', input: 3.00, output: 15.00 },
    { name: 'Claude 3.5 Haiku', provider: 'Anthropic', color: '#D97706', input: 0.25, output: 1.25 },
    { name: 'Claude 3 Opus', provider: 'Anthropic', color: '#D97706', input: 15.00, output: 75.00 },
    // Google
    { name: 'Gemini 3 Pro', provider: 'Google', color: '#4285F4', input: 4.00, output: 12.00 },
    { name: 'Gemini 3 Flash', provider: 'Google', color: '#4285F4', input: 0.15, output: 0.50 },
    { name: 'Gemini 1.5 Pro', provider: 'Google', color: '#4285F4', input: 3.50, output: 10.50 },
    { name: 'Gemini 2.0 Flash', provider: 'Google', color: '#4285F4', input: 0.10, output: 0.40 },
    { name: 'Gemini 1.5 Flash', provider: 'Google', color: '#4285F4', input: 0.075, output: 0.30 }
  ];

  const toggleFutureItem = (index) => {
    setExpandedFutureItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleProvider = (id) => {
    setActiveProviders(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const toggleAIType = (type) => {
    setSelectedAITypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const startAnimation = () => {
    setIsAnimating(true);
    setAnimatedStep(0);
    const steps = [1, 2, 3, 4, 5];
    steps.forEach((step, index) => {
      setTimeout(() => {
        setAnimatedStep(step);
        if (index === steps.length - 1) {
          setTimeout(() => setIsAnimating(false), 1000);
        }
      }, index * 600);
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const providers = [
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      company: 'OpenAI',
      color: '#10A37F',
      gradient: 'linear-gradient(135deg, #10A37F 0%, #1A7F64 100%)',
      role: 'IA generalista + razonamiento',
      icon: '🟢',
      strengths: [
        'Pensamiento estructurado',
        'Excelente para explicar, human friendly',
        'Ecosistema grande (plugins, agentes, API)'
      ],
      ideal: ['Educación', 'Desarrollo de software', 'Brainstorming'],
      scores: { razonamiento: 5, textos: 4, multimodal: 4, codigo: 4, ux: 4 }
    },
    {
      id: 'claude',
      name: 'Claude',
      company: 'Anthropic',
      color: '#D97706',
      gradient: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
      role: 'IA reflexiva y analítica',
      icon: '🟠',
      strengths: [
        'Exelente para programar y razonar',
        'Respuestas largas y bien razonadas',
        'Excelente leyendo documentos largos',
        'Muy buena para análisis profundo'
      ],
      ideal: ['Legal, contratos, PDFs', 'Análisis estratégico', 'Escritura extensa'],
      scores: { razonamiento: 5, textos: 5, multimodal: 3, codigo: 5, ux: 5 }
    },
    {
      id: 'gemini',
      name: 'Gemini',
      company: 'Google',
      color: '#4285F4',
      gradient: 'linear-gradient(135deg, #4285F4 0%, #1967D2 100%)',
      role: 'IA multimodal conectada al mundo',
      icon: '🔵',
      strengths: [
        'Excelente con imágenes, video y contexto visual',
        'Integración con Google Workspace',
        'Buen entendimiento del mundo actual'
      ],
      ideal: ['Contenido visual', 'Investigación', 'Productividad empresarial'],
      scores: { razonamiento: 4, textos: 4, multimodal: 5, codigo: 4, ux: 4 }
    }
  ];

  const otherProviders = [
    { name: 'Meta AI', diferencial: 'Social + open models', icon: '🟣' },
    { name: 'Mistral', diferencial: 'Open-source y rápido', icon: '🔴' },
    { name: 'Perplexity', diferencial: 'Búsqueda + IA', icon: '⚪' }
  ];

  const aiTypes = [
    { type: 'LLM', icon: '🗣️', desc: 'Entiende y genera texto', example: 'ChatGPT, Claude', details: 'Los Large Language Models procesan y generan texto basándose en patrones aprendidos de millones de documentos.' },
    { type: 'Generativa', icon: '🎨', desc: 'Crea imágenes, audio, video', example: 'Gemini, DALL·E', details: 'IA que puede crear contenido nuevo: imágenes, música, videos, basándose en descripciones de texto.' },
    { type: 'Analítica', icon: '🧮', desc: 'Clasifica y predice', example: 'Scoring, fraude', details: 'Modelos especializados en analizar datos, detectar patrones y hacer predicciones sobre eventos futuros.' },
    { type: 'Agentes', icon: '🤖', desc: 'Ejecutan tareas encadenadas', example: 'Auto-GPT', details: 'Sistemas autónomos que pueden planificar y ejecutar múltiples tareas en secuencia para lograr un objetivo.' }
  ];

  const futureItems = [
    { 
      icon: '🤖', 
      gradient: 'linear-gradient(135deg, #4c3d8f 0%, #5b2a6e 100%)',
      title: '¡Tu IA hará el trabajo por ti!', 
      subtitle: 'De chatear a ejecutar',
      stat: '40%',
      statLabel: 'de apps tendrán agentes en 2026',
      description: 'Imagina esto: en lugar de preguntarle a la IA "¿cómo hago esto?", simplemente le dices "hazlo" y ella solita crea los tickets, mueve información entre tus apps, genera reportes y hasta envía emails. ¡Es como tener un asistente que realmente trabaja!',
      emoji: '🚀'
    },
    { 
      icon: '💎', 
      gradient: 'linear-gradient(135deg, #8b2a5c 0%, #a33a4a 100%)',
      title: 'Quien demuestre resultados, gana',
      subtitle: 'Se acabó el cuento',
      stat: '$$',
      statLabel: 'Las empresas exigen ver el retorno',
      description: 'Ya no basta con decir "tenemos IA". Las empresas que están ganando son las que pueden demostrar: "Gracias a la IA ahorramos X horas, aumentamos ventas en Y%, o redujimos costos en Z%". Los demás... pues están volviendo a lo tradicional.',
      emoji: '📈'
    },
    { 
      icon: '⚖️', 
      gradient: 'linear-gradient(135deg, #1e5a7a 0%, #0d6d6e 100%)',
      title: 'Europa pone las reglas del juego',
      subtitle: 'Regulación que importa',
      stat: 'Ago 2',
      statLabel: '2026: Fecha clave UE',
      description: 'Europa está diciendo: "Si quieres vender IA aquí, tienes que jugar limpio". Esto significa ser transparente, explicar cómo funciona tu IA, y asegurar que sea justa y segura. Es como las reglas de privacidad que cambiaron internet, pero ahora para IA.',
      emoji: '🛡️'
    },
    { 
      icon: '🎓', 
      gradient: 'linear-gradient(135deg, #9c4a5b 0%, #b85a2a 100%)',
      title: 'Las nuevas habilidades más buscadas',
      subtitle: 'Tu carrera está cambiando',
      stat: '🔥',
      statLabel: 'Explosión de demanda por skills de IA',
      description: 'No necesitas ser ingeniero, pero SÍ necesitas entender cómo usar IA en tu trabajo. Las personas que combinan su experiencia (ventas, marketing, finanzas, etc.) con habilidades de IA son las que están despegando. Es el momento perfecto para aprender.',
      emoji: '💪'
    },
    { 
      icon: '💰', 
      gradient: 'linear-gradient(135deg, #2a5a4a 0%, #3d6b5a 100%)',
      title: 'La carrera tecnológica se acelera',
      subtitle: 'Inversión sin freno',
      stat: '↗️',
      statLabel: 'Billones en infraestructura',
      description: 'Las grandes empresas están apostando TODO a la IA: construyendo centros de datos gigantes, comprando chips especializados, y buscando formas de hacerla más barata y rápida. Es una carrera por quién llega primero al siguiente nivel.',
      emoji: '⚡'
    },
    { 
      icon: '🎯', 
      gradient: 'linear-gradient(135deg, #6b4a2a 0%, #8b5a3a 100%)',
      title: 'Tu negocio + Tu data = Poder Real',
      subtitle: 'No es el modelo, son TUS datos',
      stat: '∞',
      statLabel: 'Valor multiplicado con TUS datos',
      description: 'Aquí está el secreto que las grandes empresas ya saben: la magia NO está en tener "el mejor modelo de IA". La magia está en conectar esa IA con TU información, TUS clientes, TUS procesos. Una IA que conoce tu negocio vale 100 veces más que una IA genérica.',
      emoji: '💫'
    }
  ];

  const categories = [
    { key: 'razonamiento', label: 'Razonamiento', icon: '🧠' },
    { key: 'textos', label: 'Textos largos', icon: '📄' },
    { key: 'multimodal', label: 'Multimodal', icon: '🎨' },
    { key: 'codigo', label: 'Código', icon: '💻' },
    { key: 'ux', label: 'UX', icon: '✨' }
  ];

  const StarRating = ({ score, color, highlighted }) => (
    <div style={{ 
      display: 'flex',
      justifyContent: 'center',
      gap: '2px',
      transform: highlighted ? 'scale(1.2)' : 'scale(1)',
      transition: 'transform 0.3s ease'
    }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ 
          color: i <= score ? color : 'rgba(255,255,255,0.2)',
          fontSize: '14px',
          textShadow: highlighted && i <= score ? `0 0 10px ${color}` : 'none'
        }}>★</span>
      ))}
    </div>
  );

  const SectionProgress = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'rgba(255,255,255,0.05)',
      zIndex: 1001
    }}>
      <div style={{
        height: '100%',
        width: `${((currentSection + 1) / sections.length) * 100}%`,
        background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)',
        transition: 'width 0.5s ease',
        boxShadow: '0 0 10px rgba(139,92,246,0.5)'
      }} />
    </div>
  );

  const KeyboardHint = () => (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(10px)',
      padding: '12px 24px',
      borderRadius: '30px',
      border: '1px solid rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      zIndex: 1000,
      opacity: showKeyboardHint ? 1 : 0,
      transition: 'opacity 0.5s ease',
      pointerEvents: showKeyboardHint ? 'auto' : 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <kbd style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontFamily: "'JetBrains Mono', monospace",
          border: '1px solid rgba(255,255,255,0.2)'
        }}>↑</kbd>
        <kbd style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontFamily: "'JetBrains Mono', monospace",
          border: '1px solid rgba(255,255,255,0.2)'
        }}>↓</kbd>
      </div>
      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
        para navegar entre secciones
      </span>
      <button
        onClick={() => setShowKeyboardHint(false)}
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(255,255,255,0.5)',
          cursor: 'pointer',
          padding: '0',
          fontSize: '16px',
          marginLeft: '8px'
        }}
      >
        ✕
      </button>
    </div>
  );

  const TransitionNote = React.useMemo(() => ({ text }) => (
    <div style={{
      marginTop: '40px',
      padding: '20px 30px',
      background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.15) 100%)',
      borderRadius: '16px',
      border: '1px solid rgba(139,92,246,0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      animation: 'fadeIn 0.5s ease-out'
    }}>
      <span style={{ fontSize: '24px' }}>💭</span>
      <p style={{ 
        margin: 0, 
        fontSize: '15px', 
        fontStyle: 'italic',
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 1.6
      }}>
        {text}
      </p>
      <span style={{ fontSize: '24px' }}>→</span>
    </div>
  ), []);

  const NavigationButtons = () => (
    <div className="nav-buttons" style={{
      position: 'fixed',
      right: '24px',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      zIndex: 1000
    }}>
      <button
        onClick={prevSection}
        disabled={currentSection === 0}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: currentSection === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: currentSection === 0 ? 'rgba(255,255,255,0.3)' : '#fff',
          cursor: currentSection === 0 ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)'
        }}
        onMouseEnter={(e) => {
          if (currentSection !== 0) {
            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }
        }}
        onMouseLeave={(e) => {
          if (currentSection !== 0) {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
      >
        ↑
      </button>
      
      {/* Section indicator dots */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '8px 0'
      }}>
        {sections.map((section, index) => (
          <div
            key={index}
            onClick={() => scrollToSection(index)}
            title={sectionNames[section]}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: currentSection === index ? '#8B5CF6' : 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              margin: '0 auto',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        ))}
      </div>

      <button
        onClick={nextSection}
        disabled={currentSection === sections.length - 1}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: currentSection === sections.length - 1 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: currentSection === sections.length - 1 ? 'rgba(255,255,255,0.3)' : '#fff',
          cursor: currentSection === sections.length - 1 ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)'
        }}
        onMouseEnter={(e) => {
          if (currentSection !== sections.length - 1) {
            e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }
        }}
        onMouseLeave={(e) => {
          if (currentSection !== sections.length - 1) {
            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
      >
        ↓
      </button>
    </div>
  );

  const SectionHeader = ({ icon, title, section, children }) => (
    <div 
      onClick={() => toggleSection(section)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        padding: '8px 0',
        marginBottom: expandedSections.includes(section) ? '24px' : '0'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '32px' }}>{icon}</span>
        <h2 style={{ 
          margin: 0, 
          fontSize: presentationMode ? '36px' : '28px', 
          fontWeight: 600,
          fontFamily: "'Space Grotesk', sans-serif",
          transition: 'font-size 0.3s ease'
        }}>{title}</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {children}
        <span style={{
          transform: expandedSections.includes(section) ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease',
          fontSize: '20px',
          color: 'rgba(255,255,255,0.5)'
        }}>▼</span>
      </div>
    </div>
  );

  // Interactive Demo Components
  const ConsumptionDemo = () => {
    const [activeMode, setActiveMode] = useState('chat'); // 'chat' or 'api'
    const [chatMessages, setChatMessages] = useState([
      { role: 'user', content: 'Explica qué es la fotosíntesis en términos simples' }
    ]);
    const [showResponse, setShowResponse] = useState(false);

    const assistantResponse = "La fotosíntesis es el proceso mediante el cual las plantas convierten la luz solar en energía química. Utilizan dióxido de carbono del aire y agua del suelo, produciendo glucosa (su alimento) y liberando oxígeno como subproducto. Es fundamental para la vida en la Tierra.";

    const apiExample = {
      request: `{
  "model": "gpt-4",
  "messages": [
    {
      "role": "user",
      "content": "Explica qué es la fotosíntesis en términos simples"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 150
}`,
      response: `{
  "id": "chatcmpl-123",
  "object": "chat.completion",
  "created": 1677652288,
  "model": "gpt-4",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "${assistantResponse}"
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 58,
    "total_tokens": 73
  }
}`
    };

    const generateResponse = () => {
      setShowResponse(true);
      if (activeMode === 'chat') {
        setTimeout(() => {
          setChatMessages([...chatMessages, { role: 'assistant', content: assistantResponse }]);
        }, 800);
      }
    };

    const resetDemo = () => {
      setShowResponse(false);
      setChatMessages([{ role: 'user', content: 'Explica qué es la fotosíntesis en términos simples' }]);
    };

    return (
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '16px',
        padding: '32px',
        marginTop: '24px'
      }}>
        <h4 style={{ 
          margin: '0 0 24px 0', 
          fontSize: '18px',
          color: '#A78BFA',
          fontFamily: "'Space Grotesk', sans-serif"
        }}>🔄 Comparación: Chat UI vs API</h4>

        {/* Mode selector */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            background: 'rgba(255,255,255,0.05)',
            padding: '6px',
            borderRadius: '12px',
            width: 'fit-content'
          }}>
            <button
              onClick={() => { setActiveMode('chat'); resetDemo(); }}
              style={{
                background: activeMode === 'chat' ? 'rgba(139,92,246,0.3)' : 'transparent',
                border: activeMode === 'chat' ? '2px solid rgba(139,92,246,0.5)' : '1px solid transparent',
                color: activeMode === 'chat' ? '#fff' : 'rgba(255,255,255,0.6)',
                padding: '10px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              💬 Chat UI
            </button>
            <button
              onClick={() => { setActiveMode('api'); resetDemo(); }}
              style={{
                background: activeMode === 'api' ? 'rgba(139,92,246,0.3)' : 'transparent',
                border: activeMode === 'api' ? '2px solid rgba(139,92,246,0.5)' : '1px solid transparent',
                color: activeMode === 'api' ? '#fff' : 'rgba(255,255,255,0.6)',
                padding: '10px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              🔧 API
            </button>
          </div>
        </div>

        {/* Chat UI Mode */}
        {activeMode === 'chat' && (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px',
              border: '2px solid rgba(139,92,246,0.2)',
              minHeight: '300px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Chat header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  🤖
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 600 }}>ChatGPT</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>En línea</div>
                </div>
              </div>

              {/* Messages */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {chatMessages.map((msg, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    animation: 'fadeIn 0.3s ease-out'
                  }}>
                    <div style={{
                      background: msg.role === 'user' 
                        ? 'linear-gradient(135deg, #8B5CF6, #6D28D9)' 
                        : 'rgba(255,255,255,0.08)',
                      padding: '12px 16px',
                      borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      maxWidth: '80%',
                      fontSize: '14px',
                      lineHeight: 1.6
                    }}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {!showResponse && (
              <button
                onClick={generateResponse}
                style={{
                  background: 'rgba(139,92,246,0.3)',
                  border: '1px solid rgba(139,92,246,0.5)',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  width: '100%'
                }}
              >
                ✨ Ver Respuesta
              </button>
            )}
          </div>
        )}

        {/* API Mode */}
        {activeMode === 'api' && (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            {/* Request */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '16px' }}>📤</span>
                <span style={{ 
                  fontSize: '13px', 
                  fontWeight: 600,
                  color: '#10B981',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontFamily: "'JetBrains Mono', monospace"
                }}>
                  REQUEST (POST /v1/chat/completions)
                </span>
              </div>
              <div style={{
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid rgba(16,185,129,0.3)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                lineHeight: 1.6,
                color: '#10B981',
                overflowX: 'auto'
              }}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{apiExample.request}</pre>
              </div>
            </div>

            {/* Response */}
            {showResponse && (
              <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '8px'
                }}>
                  <span style={{ fontSize: '16px' }}>📥</span>
                  <span style={{ 
                    fontSize: '13px', 
                    fontWeight: 600,
                    color: '#3B82F6',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>
                    RESPONSE
                  </span>
                </div>
                <div style={{
                  background: 'rgba(0,0,0,0.5)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid rgba(59,130,246,0.3)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  lineHeight: 1.6,
                  color: '#3B82F6',
                  overflowX: 'auto'
                }}>
                  <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{apiExample.response}</pre>
                </div>
              </div>
            )}

            {!showResponse && (
              <button
                onClick={generateResponse}
                style={{
                  background: 'rgba(139,92,246,0.3)',
                  border: '1px solid rgba(139,92,246,0.5)',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  width: '100%',
                  marginTop: '20px'
                }}
              >
                ✨ Ver Respuesta
              </button>
            )}
          </div>
        )}

        {/* Info box */}
        <div style={{
          marginTop: '20px',
          padding: '14px 16px',
          background: activeMode === 'chat' ? 'rgba(139,92,246,0.1)' : 'rgba(16,185,129,0.1)',
          borderRadius: '8px',
          border: `1px solid ${activeMode === 'chat' ? 'rgba(139,92,246,0.2)' : 'rgba(16,185,129,0.2)'}`,
          fontSize: '13px',
          color: 'rgba(255,255,255,0.8)',
          lineHeight: 1.6
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ fontSize: '18px', flexShrink: 0 }}>💡</span>
            <div>
              {activeMode === 'chat' ? (
                <>
                  <strong style={{ color: '#A78BFA' }}>Chat UI:</strong> Interfaz visual intuitiva, 
                  ideal para usuarios finales. Incluye historial, formato de mensajes y experiencia conversacional.
                  Usado en ChatGPT, Claude.ai, Bard.
                </>
              ) : (
                <>
                  <strong style={{ color: '#10B981' }}>API:</strong> Integración programática para desarrolladores. 
                  Permite automatización, integración en aplicaciones, procesamiento en lote y personalización completa. 
                  Usado en backends, automatizaciones, productos propios.
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HallucinationDemo = () => {
    const [selectedExample, setSelectedExample] = useState(0);
    const [showHallucination, setShowHallucination] = useState(false);
    const [confidence, setConfidence] = useState(0);

    const examples = [
      {
        prompt: "¿Quién ganó el premio Nobel de Literatura en 2089?",
        hallucination: "El premio Nobel de Literatura en 2089 fue otorgado a María González por su innovadora obra 'Ecos del Futuro', que revolucionó la narrativa digital interactiva.",
        reality: "⚠️ El año 2089 está en el futuro. Este evento no ha ocurrido aún.",
        why: "El modelo intenta completar la respuesta siguiendo el patrón de preguntas similares, inventando un nombre y obra plausibles."
      },
      {
        prompt: "Dame 3 datos sobre el elemento químico Vibranium",
        hallucination: "El Vibranium (símbolo: Vb) es un elemento descubierto en 1955 en Wakanda. Tiene número atómico 119 y es conocido por absorber vibraciones. Se usa principalmente en escudos de alta resistencia.",
        reality: "⚠️ El Vibranium es un elemento FICTICIO del universo Marvel, no existe en la realidad.",
        why: "El modelo reconoce el término de su entrenamiento (películas, cómics) y genera 'hechos' técnicos que suenan científicos."
      },
      {
        prompt: "¿Cuál es el récord mundial de salto de altura sin tecnología en la luna?",
        hallucination: "El récord actual es de 12.4 metros, establecido por el astronauta James Chen en 2018 durante la misión Artemis II. La baja gravedad lunar permite saltos 6 veces más altos que en la Tierra.",
        reality: "⚠️ No ha habido misiones tripuladas a la Luna desde 1972 (Apollo 17).",
        why: "Combina hechos reales (baja gravedad lunar) con información inventada (misión y récord falsos)."
      }
    ];

    const showHallucinationAnimation = () => {
      setShowHallucination(true);
      setConfidence(0);
      
      // Animate confidence meter
      const interval = setInterval(() => {
        setConfidence(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 5;
        });
      }, 50);
    };

    const resetDemo = () => {
      setShowHallucination(false);
      setConfidence(0);
    };

    const currentExample = examples[selectedExample];

    return (
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '16px',
        padding: '32px',
        marginTop: '24px'
      }}>
        <h4 style={{ 
          margin: '0 0 24px 0', 
          fontSize: '18px',
          color: '#F59E0B',
          fontFamily: "'Space Grotesk', sans-serif"
        }}>⚠️ Simulación: Alucinación en Acción</h4>

        {/* Example selector */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '13px', 
            color: 'rgba(255,255,255,0.5)', 
            marginBottom: '12px',
            fontFamily: "'JetBrains Mono', monospace"
          }}>
            Selecciona un ejemplo de pregunta problemática:
          </label>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {examples.map((ex, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedExample(i);
                  resetDemo();
                }}
                style={{
                  background: selectedExample === i ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.05)',
                  border: selectedExample === i ? '2px solid rgba(245,158,11,0.5)' : '1px solid rgba(255,255,255,0.1)',
                  color: selectedExample === i ? '#FCD34D' : 'rgba(255,255,255,0.7)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  transition: 'all 0.3s ease'
                }}
              >
                Ejemplo {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt display */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.1) 100%)',
            border: '2px solid rgba(139,92,246,0.3)',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '15px',
            color: 'rgba(255,255,255,0.9)',
            fontStyle: 'italic',
            lineHeight: 1.6
          }}>
            💬 "{currentExample.prompt}"
          </div>
        </div>

        {/* Generate button */}
        {!showHallucination && (
          <button
            onClick={showHallucinationAnimation}
            style={{
              background: 'rgba(239,68,68,0.3)',
              border: '1px solid rgba(239,68,68,0.5)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              width: '100%',
              marginBottom: '20px'
            }}
          >
            ⚡ Ver Respuesta del LLM
          </button>
        )}

        {/* Hallucinated response */}
        {showHallucination && (
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            {/* Confidence meter */}
            <div style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '16px',
              borderRadius: '12px',
              marginBottom: '16px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                  Nivel de confianza del modelo:
                </span>
                <span style={{ 
                  fontSize: '24px', 
                  fontWeight: 700, 
                  color: confidence > 80 ? '#10B981' : '#F59E0B',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}>
                  {confidence}%
                </span>
              </div>
              <div style={{
                height: '12px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  height: '100%',
                  width: `${confidence}%`,
                  background: 'linear-gradient(90deg, #F59E0B, #10B981)',
                  transition: 'width 0.3s ease',
                  boxShadow: '0 0 10px rgba(16,185,129,0.5)'
                }} />
              </div>
              <div style={{
                marginTop: '8px',
                fontSize: '11px',
                color: '#EF4444',
                fontWeight: 600
              }}>
                ⚠️ ALTA CONFIANZA... ¡pero la respuesta es FALSA!
              </div>
            </div>

            {/* Hallucinated answer */}
            <div style={{
              background: 'rgba(239,68,68,0.1)',
              border: '2px solid rgba(239,68,68,0.3)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '20px' }}>🤖</span>
                <span style={{ 
                  fontSize: '13px', 
                  fontWeight: 600,
                  color: '#EF4444',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Respuesta Alucinada
                </span>
              </div>
              <p style={{ 
                margin: 0, 
                fontSize: '15px', 
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.6
              }}>
                {currentExample.hallucination}
              </p>
            </div>

            {/* Reality check */}
            <div style={{
              background: 'rgba(16,185,129,0.1)',
              border: '2px solid rgba(16,185,129,0.3)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '20px' }}>✅</span>
                <span style={{ 
                  fontSize: '13px', 
                  fontWeight: 600,
                  color: '#10B981',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  La Realidad
                </span>
              </div>
              <p style={{ 
                margin: 0, 
                fontSize: '15px', 
                color: 'rgba(255,255,255,0.9)',
                lineHeight: 1.6,
                fontWeight: 600
              }}>
                {currentExample.reality}
              </p>
            </div>

            {/* Explanation */}
            <div style={{
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '16px' }}>🔍</span>
                <span style={{ 
                  fontSize: '12px', 
                  fontWeight: 600,
                  color: '#F59E0B',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  ¿Por qué alucinó?
                </span>
              </div>
              <p style={{ 
                margin: 0, 
                fontSize: '14px', 
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.6,
                fontStyle: 'italic'
              }}>
                {currentExample.why}
              </p>
            </div>

            <button
              onClick={resetDemo}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.7)',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                width: '100%'
              }}
            >
              🔄 Probar otro ejemplo
            </button>
          </div>
        )}

        <div style={{
          marginTop: '20px',
          padding: '12px',
          background: 'rgba(239,68,68,0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(239,68,68,0.2)',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.7)',
          lineHeight: 1.6
        }}>
          💡 <strong style={{ color: '#EF4444' }}>Nota crítica:</strong> El modelo responde con ALTA confianza 
          incluso cuando está inventando información. No confíes ciegamente en las respuestas de un LLM.
        </div>
      </div>
    );
  };

  const LLMDemo = () => {
    const [userPrompt] = useState('Describe el cielo en una noche estrellada');
    const [demoTokens, setDemoTokens] = useState(['El', 'cielo', 'nocturno']);
    const [tokensGenerated, setTokensGenerated] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);

    // Hard-coded sequence for illustration purposes
    const nextTokenOptions = [
      // First click
      [
        { word: 'brilla', prob: 0.65 },
        { word: 'resplandece', prob: 0.20 },
        { word: 'se extiende', prob: 0.10 },
        { word: 'muestra', prob: 0.05 }
      ],
      // Second click
      [
        { word: 'con', prob: 0.55 },
        { word: 'intensamente', prob: 0.25 },
        { word: 'hermosamente', prob: 0.12 },
        { word: 'suavemente', prob: 0.08 }
      ],
      // Third click
      [
        { word: 'miles', prob: 0.45 },
        { word: 'millones', prob: 0.35 },
        { word: 'innumerables', prob: 0.12 },
        { word: 'infinitas', prob: 0.08 }
      ],
      // Fourth click
      [
        { word: 'de', prob: 0.85 },
        { word: 'y', prob: 0.08 },
        { word: 'en', prob: 0.05 },
        { word: 'que', prob: 0.02 }
      ],
      // Fifth click
      [
        { word: 'estrellas', prob: 0.60 },
        { word: 'puntos luminosos', prob: 0.20 },
        { word: 'luces', prob: 0.12 },
        { word: 'destellos', prob: 0.08 }
      ],
      // Sixth click
      [
        { word: 'brillantes', prob: 0.40 },
        { word: 'titilantes', prob: 0.30 },
        { word: 'resplandecientes', prob: 0.18 },
        { word: 'luminosas', prob: 0.12 }
      ]
    ];

    const generateNextToken = () => {
      if (tokensGenerated >= 6) return;
      
      setIsGenerating(true);
      
      setTimeout(() => {
        const nextToken = nextTokenOptions[tokensGenerated][0].word;
        setDemoTokens([...demoTokens, nextToken]);
        setTokensGenerated(tokensGenerated + 1);
        setIsGenerating(false);
      }, 800);
    };

    const resetDemo = () => {
      setDemoTokens(['El', 'cielo', 'nocturno']);
      setTokensGenerated(0);
      setIsGenerating(false);
    };

    const currentOptions = tokensGenerated < 6 ? nextTokenOptions[tokensGenerated] : [];

    return (
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '16px',
        padding: '32px',
        marginTop: '24px'
      }}>
        <h4 style={{ 
          margin: '0 0 24px 0', 
          fontSize: '18px',
          color: '#A78BFA',
          fontFamily: "'Space Grotesk', sans-serif"
        }}>🗣️ Simulación LLM: Predicción de Siguiente Token</h4>

        {/* User Prompt */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '13px', 
            color: 'rgba(255,255,255,0.5)', 
            marginBottom: '8px',
            fontFamily: "'JetBrains Mono', monospace"
          }}>
            💬 Prompt del Usuario:
          </label>
          <div style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.1) 100%)',
            border: '2px solid rgba(139,92,246,0.3)',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '15px',
            color: 'rgba(255,255,255,0.9)',
            fontStyle: 'italic',
            lineHeight: 1.6
          }}>
            "{userPrompt}"
          </div>
        </div>

        {/* Current sequence */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '24px',
          border: '2px solid rgba(139,92,246,0.2)'
        }}>
          <div style={{ 
            fontSize: '13px', 
            color: 'rgba(255,255,255,0.5)', 
            marginBottom: '12px',
            fontFamily: "'JetBrains Mono', monospace"
          }}>
            Secuencia actual:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            {demoTokens.map((token, i) => (
              <span key={i} style={{
                background: 'rgba(139,92,246,0.3)',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 500,
                animation: i === demoTokens.length - 1 && isGenerating ? 'pulse 1s ease-in-out infinite' : 'fadeIn 0.3s ease-out'
              }}>
                {token}
              </span>
            ))}
            {isGenerating && (
              <span style={{
                background: 'rgba(139,92,246,0.3)',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '16px',
                animation: 'pulse 1s ease-in-out infinite'
              }}>
                ...
              </span>
            )}
          </div>
        </div>

        {/* Probability distribution */}
        {currentOptions.length > 0 && (
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '20px'
          }}>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
              Probabilidades para el siguiente token:
            </div>
            {currentOptions.map((option, i) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', fontFamily: "'JetBrains Mono', monospace" }}>{option.word}</span>
                  <span style={{ fontSize: '14px', color: '#A78BFA', fontWeight: 600 }}>
                    {(option.prob * 100).toFixed(0)}%
                  </span>
                </div>
                <div style={{
                  height: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${option.prob * 100}%`,
                    background: i === 0 ? 'linear-gradient(90deg, #8B5CF6, #A78BFA)' : 'rgba(139,92,246,0.5)',
                    transition: 'width 0.5s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={generateNextToken}
            disabled={isGenerating || tokensGenerated >= 6}
            style={{
              background: 'rgba(139,92,246,0.3)',
              border: '1px solid rgba(139,92,246,0.5)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: (isGenerating || tokensGenerated >= 6) ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              opacity: (isGenerating || tokensGenerated >= 6) ? 0.5 : 1
            }}
          >
            {isGenerating ? '⏳ Generando...' : `✨ Generar Siguiente Token (${tokensGenerated}/6)`}
          </button>
          <button
            onClick={resetDemo}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.7)',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🔄 Reiniciar
          </button>
        </div>

        <div style={{
          marginTop: '20px',
          padding: '12px',
          background: 'rgba(16,185,129,0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(16,185,129,0.2)',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.7)'
        }}>
          💡 El LLM analiza el contexto y predice la palabra más probable basándose en patrones aprendidos. 
          En esta simulación, siempre selecciona el token con mayor probabilidad.
        </div>
      </div>
    );
  };

  const GenerativeDemo = () => {
    const [generating, setGenerating] = useState(false);
    const [diffusionStep, setDiffusionStep] = useState(0);
    const [currentPrompt, setCurrentPrompt] = useState('Un gato astronauta en el espacio');
    const [showResult, setShowResult] = useState(false);

    const totalSteps = 20; // Typical diffusion models use 20-50 steps

    const startGeneration = () => {
      setGenerating(true);
      setDiffusionStep(0);
      setShowResult(false);
      
      // Simulate diffusion steps
      const interval = setInterval(() => {
        setDiffusionStep(prev => {
          if (prev >= totalSteps) {
            clearInterval(interval);
            setGenerating(false);
            setShowResult(true);
            return totalSteps;
          }
          return prev + 1;
        });
      }, 200);
    };

    const resetDemo = () => {
      setDiffusionStep(0);
      setShowResult(false);
      setGenerating(false);
    };

    // Calculate noise level (100% noise at start, 0% at end)
    const noiseLevel = Math.max(0, 100 - (diffusionStep / totalSteps) * 100);
    const clarity = (diffusionStep / totalSteps) * 100;

    return (
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '16px',
        padding: '32px',
        marginTop: '24px'
      }}>
        <h4 style={{ 
          margin: '0 0 24px 0', 
          fontSize: '18px',
          color: '#A78BFA',
          fontFamily: "'Space Grotesk', sans-serif"
        }}>🎨 Simulación IA Generativa: Proceso de Difusión</h4>

        {/* Input prompt */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '13px', 
            color: 'rgba(255,255,255,0.5)', 
            marginBottom: '8px',
            fontFamily: "'JetBrains Mono', monospace"
          }}>
            💬 Prompt de entrada:
          </label>
          <div style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.1) 100%)',
            border: '2px solid rgba(139,92,246,0.3)',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '15px',
            color: 'rgba(255,255,255,0.9)',
            fontStyle: 'italic',
            lineHeight: 1.6
          }}>
            "{currentPrompt}"
          </div>
        </div>

        {/* Diffusion Process Visualization */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          border: '2px solid rgba(139,92,246,0.2)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <span style={{ 
              fontSize: '13px', 
              color: 'rgba(255,255,255,0.5)',
              fontFamily: "'JetBrains Mono', monospace"
            }}>
              Paso de difusión: {diffusionStep}/{totalSteps}
            </span>
            <span style={{
              fontSize: '12px',
              color: diffusionStep === 0 ? '#EF4444' : diffusionStep === totalSteps ? '#10B981' : '#F59E0B',
              fontWeight: 600,
              padding: '4px 12px',
              background: diffusionStep === 0 ? 'rgba(239,68,68,0.1)' : diffusionStep === totalSteps ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
              borderRadius: '12px'
            }}>
              {diffusionStep === 0 ? '🔴 100% Ruido' : diffusionStep === totalSteps ? '🟢 Imagen Clara' : `🟡 ${clarity.toFixed(0)}% Claridad`}
            </span>
          </div>

          {/* Visual grid simulating diffusion */}
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            background: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(59,130,246,0.2) 100%)',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gridTemplateRows: 'repeat(6, 1fr)',
            gap: '2px',
            padding: '2px'
          }}>
            {Array.from({ length: 48 }).map((_, i) => {
              const rowProgress = Math.floor(i / 8) / 6;
              const colProgress = (i % 8) / 8;
              const cellProgress = (rowProgress + colProgress) / 2;
              
              // Calculate how "clear" this cell should be
              const cellClarity = Math.max(0, Math.min(1, (diffusionStep / totalSteps) - cellProgress + 0.5));
              
              // Random noise pattern
              const noiseIntensity = 1 - cellClarity;
              const randomShift = Math.sin(i * 12.345 + diffusionStep * 0.5) * 50 * noiseIntensity;
              
              return (
                <div
                  key={i}
                  style={{
                    background: `linear-gradient(${135 + randomShift}deg, 
                      rgba(139,92,246,${0.1 + cellClarity * 0.6}) 0%, 
                      rgba(59,130,246,${0.1 + cellClarity * 0.4}) 100%)`,
                    borderRadius: '4px',
                    transition: 'all 0.2s ease',
                    filter: `blur(${noiseIntensity * 8}px) brightness(${0.5 + cellClarity * 0.8})`,
                    transform: `scale(${0.9 + cellClarity * 0.1})`
                  }}
                />
              );
            })}
            
            {/* Final result overlay */}
            {showResult && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '120px',
                filter: 'drop-shadow(0 0 30px rgba(139,92,246,0.6))',
                animation: 'fadeIn 0.5s ease-out'
              }}>
                🐱‍🚀
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div style={{
            marginTop: '16px',
            height: '8px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${(diffusionStep / totalSteps) * 100}%`,
              background: 'linear-gradient(90deg, #EF4444, #F59E0B, #10B981)',
              transition: 'width 0.2s ease',
              boxShadow: '0 0 10px rgba(139,92,246,0.5)'
            }} />
          </div>
        </div>

        {/* Process explanation */}
        {(generating || showResult) && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            padding: '16px 20px',
            borderRadius: '12px',
            marginBottom: '20px',
            border: '1px solid rgba(255,255,255,0.1)',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <div style={{ 
              fontSize: '13px', 
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6
            }}>
              <strong style={{ color: '#A78BFA' }}>
                {diffusionStep === 0 && '🔴 Ruido puro inicial'}
                {diffusionStep > 0 && diffusionStep < totalSteps / 3 && '🟠 Eliminando ruido, formas básicas emergiendo'}
                {diffusionStep >= totalSteps / 3 && diffusionStep < (totalSteps * 2) / 3 && '🟡 Definiendo estructura y composición'}
                {diffusionStep >= (totalSteps * 2) / 3 && diffusionStep < totalSteps && '🟢 Refinando detalles finales'}
                {diffusionStep === totalSteps && '✅ Imagen completamente generada'}
              </strong>
            </div>
          </div>
        )}

        {/* Controls */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={startGeneration}
            disabled={generating}
            style={{
              background: generating ? 'rgba(255,255,255,0.05)' : 'rgba(139,92,246,0.3)',
              border: '1px solid rgba(139,92,246,0.5)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: generating ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              flex: 1,
              opacity: generating ? 0.5 : 1
            }}
          >
            {generating ? `⏳ Generando... (${diffusionStep}/${totalSteps})` : '✨ Iniciar Generación'}
          </button>
          
          {(showResult || diffusionStep > 0) && !generating && (
            <button
              onClick={resetDemo}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.7)',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              🔄 Reiniciar
            </button>
          )}
        </div>

        {/* Info box */}
        <div style={{
          marginTop: '20px',
          padding: '14px 16px',
          background: 'rgba(16,185,129,0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(16,185,129,0.2)',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.8)',
          lineHeight: 1.6
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <span style={{ fontSize: '18px', flexShrink: 0 }}>💡</span>
            <div>
              <strong style={{ color: '#10B981' }}>Proceso de Difusión:</strong> Los modelos como DALL-E o Stable Diffusion 
              comienzan con ruido puro y gradualmente lo "eliminan" en múltiples pasos, guiados por el texto, 
              hasta formar una imagen coherente. Cada paso refina más la imagen.
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AnalyticDemo = () => {
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [inputData, setInputData] = useState({
      amount: 5000,
      frequency: 'high',
      history: 'good'
    });

    const analyzeData = () => {
      setAnalyzing(true);
      setResult(null);
      
      setTimeout(() => {
        let score = 70;
        let risk = 'Medio';
        let confidence = 85;

        // Simple scoring logic
        if (inputData.amount > 10000) score -= 15;
        if (inputData.frequency === 'high') score -= 10;
        if (inputData.history === 'excellent') score += 20;
        if (inputData.history === 'poor') score -= 25;

        if (score >= 80) risk = 'Bajo';
        else if (score < 60) risk = 'Alto';

        setResult({ score, risk, confidence });
        setAnalyzing(false);
      }, 1500);
    };

    return (
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '16px',
        padding: '32px',
        marginTop: '24px'
      }}>
        <h4 style={{ 
          margin: '0 0 24px 0', 
          fontSize: '18px',
          color: '#A78BFA',
          fontFamily: "'Space Grotesk', sans-serif"
        }}>🧮 Simulación IA Analítica: Scoring de Riesgo</h4>

        {/* Input parameters */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '13px', 
              color: 'rgba(255,255,255,0.5)', 
              marginBottom: '8px' 
            }}>
              Monto de transacción:
            </label>
            <input
              type="range"
              min="1000"
              max="20000"
              step="1000"
              value={inputData.amount}
              onChange={(e) => setInputData({...inputData, amount: parseInt(e.target.value)})}
              style={{ width: '100%' }}
            />
            <div style={{ textAlign: 'center', marginTop: '4px', fontSize: '16px', fontWeight: 600, color: '#A78BFA' }}>
              ${inputData.amount.toLocaleString()}
            </div>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '13px', 
              color: 'rgba(255,255,255,0.5)', 
              marginBottom: '8px' 
            }}>
              Frecuencia de transacciones:
            </label>
            <select
              value={inputData.frequency}
              onChange={(e) => setInputData({...inputData, frequency: e.target.value})}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '2px solid rgba(139,92,246,0.3)',
                borderRadius: '8px',
                padding: '8px',
                color: '#fff',
                fontSize: '14px'
              }}
            >
              <option style={{ color: '#000' }} value="low">Baja</option>
              <option style={{ color: '#000' }} value="medium">Media</option>
              <option style={{ color: '#000' }} value="high">Alta</option>
            </select>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '13px', 
              color: 'rgba(255,255,255,0.5)', 
              marginBottom: '8px' 
            }}>
              Historial del cliente:
            </label>
            <select
              value={inputData.history}
              onChange={(e) => setInputData({...inputData, history: e.target.value})}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '2px solid rgba(139,92,246,0.3)',
                borderRadius: '8px',
                padding: '8px',
                color: '#fff',
                fontSize: '14px'
              }}
            >
              <option style={{ color: '#000' }} value="poor">Malo</option>
              <option style={{ color: '#000' }} value="fair">Regular</option>
              <option style={{ color: '#000' }} value="good">Bueno</option>
              <option style={{ color: '#000' }} value="excellent">Excelente</option>
            </select>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '20px',
            animation: 'fadeIn 0.5s ease-out'
          }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
              gap: '20px',
              marginBottom: '20px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                  Score de Riesgo
                </div>
                <div style={{ 
                  fontSize: '36px', 
                  fontWeight: 700, 
                  color: result.score >= 80 ? '#10B981' : result.score >= 60 ? '#F59E0B' : '#EF4444',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}>
                  {result.score}
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                  Nivel de Riesgo
                </div>
                <div style={{ 
                  fontSize: '20px', 
                  fontWeight: 600,
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: result.risk === 'Bajo' ? 'rgba(16,185,129,0.2)' : result.risk === 'Medio' ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)',
                  color: result.risk === 'Bajo' ? '#10B981' : result.risk === 'Medio' ? '#F59E0B' : '#EF4444',
                  display: 'inline-block'
                }}>
                  {result.risk}
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                  Confianza
                </div>
                <div style={{ fontSize: '36px', fontWeight: 700, color: '#A78BFA', fontFamily: "'Space Grotesk', sans-serif" }}>
                  {result.confidence}%
                </div>
              </div>
            </div>

            <div style={{
              padding: '12px 16px',
              background: result.risk === 'Bajo' ? 'rgba(16,185,129,0.1)' : result.risk === 'Medio' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
              borderRadius: '8px',
              border: `1px solid ${result.risk === 'Bajo' ? 'rgba(16,185,129,0.3)' : result.risk === 'Medio' ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)'}`,
              fontSize: '13px',
              color: 'rgba(255,255,255,0.8)'
            }}>
              <strong>Recomendación:</strong> {result.risk === 'Bajo' ? 'Aprobar transacción' : result.risk === 'Medio' ? 'Revisar manualmente' : 'Rechazar o investigar'}
            </div>
          </div>
        )}

        {analyzing && (
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            padding: '40px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔄</div>
            <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)' }}>
              Analizando datos y calculando riesgo...
            </div>
          </div>
        )}

        <button
          onClick={analyzeData}
          disabled={analyzing}
          style={{
            background: analyzing ? 'rgba(255,255,255,0.05)' : 'rgba(139,92,246,0.3)',
            border: '1px solid rgba(139,92,246,0.5)',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '8px',
            cursor: analyzing ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            width: '100%'
          }}
        >
          {analyzing ? '⏳ Analizando...' : '🧮 Analizar Riesgo'}
        </button>

        <div style={{
          marginTop: '20px',
          padding: '12px',
          background: 'rgba(16,185,129,0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(16,185,129,0.2)',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.7)'
        }}>
          💡 La IA analítica procesa múltiples variables para predecir resultados y clasificar datos.
        </div>
      </div>
    );
  };

  const AgentDemo = () => {
    const [running, setRunning] = useState(false);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const agentSteps = [
      { id: 1, name: 'Planificar tareas', icon: '📋', status: 'pending', description: 'Dividiendo objetivo en sub-tareas' },
      { id: 2, name: 'Buscar información', icon: '🔍', status: 'pending', description: 'Buscando datos sobre competidores' },
      { id: 3, name: 'Analizar datos', icon: '📊', status: 'pending', description: 'Procesando información recopilada' },
      { id: 4, name: 'Generar insights', icon: '💡', status: 'pending', description: 'Identificando patrones y tendencias' },
      { id: 5, name: 'Crear reporte', icon: '📄', status: 'pending', description: 'Compilando documento final' },
      { id: 6, name: 'Revisar calidad', icon: '✅', status: 'pending', description: 'Verificando completitud' }
    ];

    const runAgent = () => {
      setRunning(true);
      setShowResult(false);
      setSteps(agentSteps.map(s => ({...s, status: 'pending'})));
      setCurrentStep(0);

      agentSteps.forEach((step, index) => {
        setTimeout(() => {
          setCurrentStep(index);
          setSteps(prev => prev.map((s, i) => ({
            ...s,
            status: i < index ? 'completed' : i === index ? 'running' : 'pending'
          })));

          if (index === agentSteps.length - 1) {
            setTimeout(() => {
              setSteps(prev => prev.map(s => ({...s, status: 'completed'})));
              setRunning(false);
              setShowResult(true);
            }, 1000);
          }
        }, index * 1200);
      });
    };

    const resetAgent = () => {
      setSteps([]);
      setCurrentStep(0);
      setShowResult(false);
    };

    const isCompleted = steps.length > 0 && steps.every(s => s.status === 'completed');

    return (
      <div style={{
        background: 'rgba(0,0,0,0.4)',
        borderRadius: '16px',
        padding: '32px',
        marginTop: '24px'
      }}>
        <h4 style={{ 
          margin: '0 0 24px 0', 
          fontSize: '18px',
          color: '#A78BFA',
          fontFamily: "'Space Grotesk', sans-serif"
        }}>🤖 Simulación de Agente: Investigación Automatizada</h4>

        <div style={{
          background: 'rgba(255,255,255,0.05)',
          padding: '16px',
          borderRadius: '12px',
          marginBottom: '24px',
          border: '1px solid rgba(139,92,246,0.3)'
        }}>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
            Objetivo del Agente:
          </div>
          <div style={{ fontSize: '16px', color: '#fff', fontWeight: 500 }}>
            📝 "Investigar competencia en el mercado y crear un reporte ejecutivo"
          </div>
        </div>

        {/* Agent execution flow */}
        {steps.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: showResult ? '1fr 1fr' : '1fr',
            gap: '20px',
            marginBottom: '20px'
          }}>
            {/* Left side: Steps flow */}
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '12px',
              padding: '24px'
            }}>
              {steps.map((step, index) => (
                <div key={step.id} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  marginBottom: index < steps.length - 1 ? '20px' : '0',
                  position: 'relative'
                }}>
                  {/* Icon */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: step.status === 'completed' ? 'rgba(16,185,129,0.2)' : 
                                step.status === 'running' ? 'rgba(139,92,246,0.3)' : 
                                'rgba(255,255,255,0.05)',
                    border: `2px solid ${step.status === 'completed' ? '#10B981' : 
                                         step.status === 'running' ? '#8B5CF6' : 
                                         'rgba(255,255,255,0.1)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                    animation: step.status === 'running' ? 'pulse 1s ease-in-out infinite' : 'none'
                  }}>
                    {step.status === 'completed' ? '✓' : step.icon}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontSize: '15px', 
                      fontWeight: 600, 
                      color: step.status === 'completed' ? '#10B981' : 
                             step.status === 'running' ? '#A78BFA' : 
                             'rgba(255,255,255,0.5)',
                      marginBottom: '4px'
                    }}>
                      {step.name}
                    </div>
                    <div style={{ 
                      fontSize: '13px', 
                      color: 'rgba(255,255,255,0.6)',
                      fontStyle: 'italic'
                    }}>
                      {step.description}
                    </div>
                    {step.status === 'running' && (
                      <div style={{
                        marginTop: '8px',
                        height: '4px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '2px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          width: '100%',
                          background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)',
                          animation: 'flowRight 1.5s ease-in-out infinite'
                        }} />
                      </div>
                    )}
                  </div>

                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      left: '23px',
                      top: '48px',
                      width: '2px',
                      height: '20px',
                      background: step.status === 'completed' ? '#10B981' : 'rgba(255,255,255,0.1)'
                    }} />
                  )}
                </div>
              ))}
            </div>

            {/* Right side: Generated Report */}
            {showResult && isCompleted && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.05) 100%)',
                borderRadius: '12px',
                padding: '24px',
                border: '2px solid rgba(16,185,129,0.3)',
                animation: 'fadeIn 0.5s ease-out',
                maxHeight: '600px',
                overflowY: 'auto'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{ fontSize: '32px' }}>📊</div>
                  <div>
                    <h4 style={{ 
                      margin: 0, 
                      fontSize: '18px',
                      color: '#10B981',
                      fontFamily: "'Space Grotesk', sans-serif"
                    }}>Reporte Ejecutivo Generado</h4>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>
                      Análisis de Competencia 2024
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ 
                    margin: '0 0 12px 0', 
                    fontSize: '14px',
                    color: '#10B981',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>📋 Resumen Ejecutivo</h5>
                  <p style={{ 
                    margin: 0, 
                    fontSize: '13px', 
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6
                  }}>
                    Se identificaron 12 competidores principales en el mercado. El análisis revela una tendencia hacia la automatización y personalización de servicios.
                  </p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ 
                    margin: '0 0 12px 0', 
                    fontSize: '14px',
                    color: '#10B981',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>💡 Hallazgos Clave</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {[
                      'Precio promedio: $149/mes',
                      'Tiempo de respuesta: 2-4 horas',
                      'Satisfacción del cliente: 4.2/5',
                      'Tasa de retención: 78%'
                    ].map((item, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.8)'
                      }}>
                        <span style={{ color: '#10B981' }}>▸</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h5 style={{ 
                    margin: '0 0 12px 0', 
                    fontSize: '14px',
                    color: '#10B981',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>📈 Tendencias del Mercado</h5>
                  <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '8px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                      fontSize: '13px'
                    }}>
                      <span>IA & Automatización</span>
                      <span style={{ color: '#10B981', fontWeight: 600 }}>+45%</span>
                    </div>
                    <div style={{
                      height: '6px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: '85%',
                        background: 'linear-gradient(90deg, #10B981, #34D399)',
                        borderRadius: '3px'
                      }} />
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '8px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                      fontSize: '13px'
                    }}>
                      <span>Modelos Freemium</span>
                      <span style={{ color: '#F59E0B', fontWeight: 600 }}>+32%</span>
                    </div>
                    <div style={{
                      height: '6px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: '65%',
                        background: 'linear-gradient(90deg, #F59E0B, #FBBF24)',
                        borderRadius: '3px'
                      }} />
                    </div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(16,185,129,0.15)',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(16,185,129,0.3)'
                }}>
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontSize: '16px' }}>🎯</span>
                    <span style={{ 
                      fontSize: '13px', 
                      fontWeight: 600,
                      color: '#10B981'
                    }}>Recomendaciones</span>
                  </div>
                  <ul style={{ 
                    margin: 0, 
                    paddingLeft: '20px',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6
                  }}>
                    <li>Implementar IA en servicio al cliente</li>
                    <li>Optimizar pricing para competir mejor</li>
                    <li>Mejorar tiempo de respuesta</li>
                  </ul>
                </div>

                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '8px',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.5)',
                  textAlign: 'center',
                  fontFamily: "'JetBrains Mono', monospace"
                }}>
                  ✓ Reporte generado automáticamente por Agente IA
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={runAgent}
            disabled={running}
            style={{
              background: running ? 'rgba(255,255,255,0.05)' : 'rgba(139,92,246,0.3)',
              border: '1px solid rgba(139,92,246,0.5)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: running ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              flex: 1
            }}
          >
            {running ? '⏳ Ejecutando...' : '🚀 Ejecutar Agente'}
          </button>
          {steps.length > 0 && !running && (
            <button
              onClick={resetAgent}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.7)',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              🔄 Reiniciar
            </button>
          )}
        </div>

        <div style={{
          marginTop: '20px',
          padding: '12px',
          background: 'rgba(16,185,129,0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(16,185,129,0.2)',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.7)'
        }}>
          💡 Los agentes de IA pueden planificar y ejecutar secuencias complejas de tareas de forma autónoma.
        </div>
      </div>
    );
  };

  const ProviderCard = ({ provider, isSelected, onClick, isComparing }) => {
    const isHighlighted = isComparing && isSelected;
    
    return (
      <div
        onClick={onClick}
        style={{
          background: isSelected ? provider.gradient : 'rgba(255,255,255,0.03)',
          border: `2px solid ${isSelected ? provider.color : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '20px',
          padding: '24px',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isHighlighted ? 'scale(1.05)' : isSelected ? 'scale(1.02)' : 'scale(1)',
          boxShadow: isSelected ? `0 20px 60px ${provider.color}40` : 'none',
          position: 'relative',
          overflow: 'hidden',
          opacity: isComparing && !isSelected && activeProviders.length > 0 ? 0.4 : 1
        }}
      >
        {isSelected && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)',
            pointerEvents: 'none'
          }} />
        )}
        
        {/* Selection indicator */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: isSelected ? '#fff' : 'rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease'
        }}>
          {isSelected && <span style={{ color: provider.color, fontSize: '14px' }}>✓</span>}
        </div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <span style={{ fontSize: '28px' }}>{provider.icon}</span>
            <div>
              <h3 style={{ 
                margin: 0, 
                fontSize: '22px', 
                fontWeight: 700,
                color: isSelected ? '#fff' : 'rgba(255,255,255,0.9)',
                fontFamily: "'Space Grotesk', sans-serif"
              }}>{provider.name}</h3>
              <span style={{ 
                fontSize: '13px', 
                color: isSelected ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)',
                fontFamily: "'JetBrains Mono', monospace"
              }}>{provider.company}</span>
            </div>
          </div>
          <p style={{ 
            margin: '0 0 16px 0', 
            fontSize: '14px', 
            color: isSelected ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)',
            fontStyle: 'italic'
          }}>{provider.role}</p>
          
          {isSelected && (
            <div style={{ 
              animation: 'fadeIn 0.4s ease-out',
              marginTop: '16px'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <h4 style={{ 
                  margin: '0 0 8px 0', 
                  fontSize: '12px', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1px',
                  color: 'rgba(255,255,255,0.7)'
                }}>Fortalezas</h4>
                {provider.strengths.map((s, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '8px',
                    marginBottom: '6px',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.9)'
                  }}>
                    <span style={{ color: '#fff' }}>✓</span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <div>
                <h4 style={{ 
                  margin: '0 0 8px 0', 
                  fontSize: '12px', 
                  textTransform: 'uppercase', 
                  letterSpacing: '1px',
                  color: 'rgba(255,255,255,0.7)'
                }}>Ideal para</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {provider.ideal.map((item, i) => (
                    <span key={i} style={{
                      background: 'rgba(255,255,255,0.2)',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      color: '#fff'
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)',
      color: '#fff',
      fontFamily: "'Inter', -apple-system, sans-serif",
      padding: '0',
      position: 'relative',
      scrollBehavior: 'smooth'
    }}>
      <SectionProgress />
      <NavigationButtons />
      <KeyboardHint />
      
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'fixed',
          top: '24px',
          left: '24px',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          transition: 'all 0.3s ease',
          zIndex: 1000
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(139,92,246,0.3)';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        title="Volver al inicio"
      >
        ←
      </button>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        
        @keyframes shimmer {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes flowRight {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          25% { transform: translateY(-10px) scale(1.1); }
          50% { transform: translateY(0) scale(1.05); }
          75% { transform: translateY(-5px) scale(1.08); }
        }
        
        * {
          box-sizing: border-box;
        }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 3px;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        @media (max-width: 768px) {
          .nav-buttons {
            right: 12px !important;
          }
          .nav-buttons button {
            width: 40px !important;
            height: 40px !important;
            font-size: 16px !important;
          }
        }
      `}</style>

      {/* Background Effects */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(16,163,127,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'pulse 8s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '40%',
          right: '15%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(217,119,6,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'pulse 10s ease-in-out infinite 2s'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '30%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(66,133,244,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'pulse 12s ease-in-out infinite 4s'
        }} />
      </div>

      {/* Header Section */}
      <section 
        id="header" 
        style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative', 
          zIndex: 1,
          padding: '40px 24px',
          overflow: 'auto'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', padding: '20px 0' }}>
          <header style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(255,255,255,0.05)',
            padding: '8px 20px',
            borderRadius: '30px',
            marginBottom: '24px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <span style={{ fontSize: '24px' }}>🤖</span>
            <span style={{ 
              fontSize: '13px', 
              textTransform: 'uppercase', 
              letterSpacing: '2px',
              color: 'rgba(255,255,255,0.7)',
              fontFamily: "'JetBrains Mono', monospace"
            }}>Presentación Interactiva</span>
          </div>
          <h1 style={{
            fontSize: presentationMode ? 'clamp(40px, 8vw, 72px)' : 'clamp(32px, 6vw, 56px)',
            fontWeight: 700,
            margin: '0 0 16px 0',
            fontFamily: "'Space Grotesk', sans-serif",
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.1,
            transition: 'font-size 0.3s ease'
          }}>
            Panorama de la IA Generativa
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '600px',
            margin: '0 auto 32px',
            lineHeight: 1.6
          }}>
            Explora, compara e interactúa con el contenido
          </p>
          
          {/* Badges de Complejidad y Tiempo */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap'
          }}>
            {/* Badge de Complejidad */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(139,92,246,0.15)',
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid rgba(139,92,246,0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ fontSize: '16px' }}>📊</span>
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.9)',
                fontFamily: "'Inter', sans-serif"
              }}>
                Nivel: <span style={{ color: '#22C55E' }}>Básico</span>
              </span>
            </div>
            
            {/* Badge de Tiempo */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(59,130,246,0.15)',
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid rgba(59,130,246,0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <span style={{ fontSize: '16px' }}>⏱️</span>
              <span style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.9)',
                fontFamily: "'Inter', sans-serif"
              }}>
                Duración: <span style={{ color: '#3B82F6' }}>20-25 min</span>
              </span>
            </div>
          </div>
          
          {/* Hooks de Introducción */}
          <div style={{
            maxWidth: '900px',
            margin: '0 auto 40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '16px'
          }}>
            {[
              {
                emoji: '🤔',
                text: '¿Alguna vez te preguntaste por qué te cobran por usar ChatGPT y qué diablos son los "tokens"?',
                gradient: 'linear-gradient(135deg, #4c3d8f 0%, #5b2a6e 100%)'
              },
              {
                emoji: '🎭',
                text: '¿Sabías que los LLMs pueden "inventar" información con total confianza? Aca vas a descubrir cómo detectar alucinaciones.',
                gradient: 'linear-gradient(135deg, #8b2a5c 0%, #a33a4a 100%)'
              },
              {
                emoji: '⚔️',
                text: '¿OpenAI, Anthropic o Google? Compara precios y capacidades de los principales proveedores de IA.',
                gradient: 'linear-gradient(135deg, #1e5a7a 0%, #0d6d6e 100%)'
              },
              {
                emoji: '🚀',
                text: '¿Chat o API? Aprende las dos formas de integrar IA en tu negocio y cuál te conviene más.',
                gradient: 'linear-gradient(135deg, #2a5a4a 0%, #3d6b5a 100%)'
              }
            ].map((hook, i) => (
              <div
                key={i}
                style={{
                  background: hook.gradient,
                  borderRadius: '16px',
                  padding: '20px',
                  textAlign: 'left',
                  border: '1px solid rgba(255,255,255,0.15)',
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span style={{ fontSize: '28px', flexShrink: 0 }}>{hook.emoji}</span>
                <p style={{
                  margin: 0,
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.95)',
                  lineHeight: 1.5,
                  fontWeight: 500
                }}>
                  {hook.text}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection(1)}
            style={{
              padding: '16px 40px',
              fontSize: '18px',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontFamily: "'Inter', sans-serif",
              marginBottom: '32px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 10px 30px rgba(139,92,246,0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Comenzar la exploración →
          </button>

          {/* Active Selections Display */}
          {(activeProviders.length > 0 || selectedAITypes.length > 0) && (
            <div style={{
              marginTop: '24px',
              padding: '12px 20px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Seleccionados:</span>
              {activeProviders.map(id => {
                const p = providers.find(x => x.id === id);
                return (
                  <span key={id} style={{
                    background: p.color,
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    {p.name}
                    <span 
                      onClick={(e) => { e.stopPropagation(); toggleProvider(id); }}
                      style={{ cursor: 'pointer', opacity: 0.7 }}
                    >×</span>
                  </span>
                );
              })}
              {selectedAITypes.map(type => (
                <span key={type} style={{
                  background: 'rgba(255,255,255,0.15)',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {type}
                  <span 
                    onClick={(e) => { e.stopPropagation(); toggleAIType(type); }}
                    style={{ cursor: 'pointer', opacity: 0.7 }}
                  >×</span>
                </span>
              ))}
              <button
                onClick={() => { setActiveProviders([]); setSelectedAITypes([]); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Limpiar todo
              </button>
            </div>
          )}

          <TransitionNote text={transitionNotes.header} />
        </header>
        </div>
      </section>

      {/* Section: What is AI */}
      <section 
        id="intro" 
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          padding: '40px 24px'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '24px',
          padding: '24px 40px',
          marginBottom: '20px',
          border: '1px solid rgba(255,255,255,0.06)',
          transition: 'all 0.3s ease'
        }}>
          <SectionHeader icon="🧠" title="¿Qué es la Inteligencia Artificial?" section="intro" />
          
          {expandedSections.includes('intro') && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <p style={{ 
                fontSize: presentationMode ? '20px' : '17px', 
                lineHeight: 1.8, 
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '24px',
                maxWidth: '800px',
                transition: 'font-size 0.3s ease'
              }}>
                La Inteligencia Artificial (IA) es la capacidad de un sistema para <strong style={{ color: '#10A37F' }}>aprender patrones</strong>, <strong style={{ color: '#D97706' }}>razonar</strong>, y <strong style={{ color: '#4285F4' }}>tomar decisiones</strong> a partir de datos, imitando ciertas habilidades humanas.
              </p>

              <div style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px',
                borderLeft: '4px solid #D97706'
              }}>
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  fontSize: '16px',
                  color: '#D97706',
                  fontFamily: "'JetBrains Mono', monospace"
                }}>🧩 En simple:</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {['Aprende de ejemplos', 'Reconoce patrones', 'Genera respuestas, imágenes, código'].map((item, i) => (
                    <div key={i} style={{
                      background: 'rgba(217,119,6,0.1)',
                      padding: '10px 18px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ color: '#D97706' }}>▸</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 100%)',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <span style={{ fontSize: '20px' }}>💡</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                  No piensa como un humano: <strong style={{ color: '#fff' }}>predice la mejor respuesta basada en probabilidad</strong>
                </span>
              </div>
            </div>
          )}

          <TransitionNote text={transitionNotes.intro} />
        </div>
        </div>
      </section>

      {/* Section: How AI Works */}
      <section 
        id="howworks" 
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          padding: '40px 24px'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '24px',
          padding: '24px 40px',
          marginBottom: '20px',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <SectionHeader icon="🏗️" title="¿Cómo funciona la IA moderna?" section="howworks" />

          {expandedSections.includes('howworks') && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              {/* Animated Pipeline */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '32px',
                padding: '24px',
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {isAnimating && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    width: '100px',
                    height: '4px',
                    background: 'linear-gradient(90deg, transparent, #10A37F, transparent)',
                    animation: 'flowRight 3s ease-in-out infinite',
                    transform: 'translateY(-50%)',
                    borderRadius: '2px'
                  }} />
                )}
                
                {[
                  { icon: '📊', label: 'Datos', step: 1 },
                  { icon: '→', label: '', step: 0 },
                  { icon: '🎯', label: 'Entrenamiento', step: 2 },
                  { icon: '→', label: '', step: 0 },
                  { icon: '🧠', label: 'Modelo', step: 3 },
                  { icon: '→', label: '', step: 0 },
                  { icon: '💬', label: 'Prompt', step: 4 },
                  { icon: '→', label: '', step: 0 },
                  { icon: '✨', label: 'Respuesta', step: 5 }
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: item.step === 0 ? 0.5 : (animatedStep >= item.step ? 1 : 0.3),
                    transform: animatedStep >= item.step ? 'scale(1)' : 'scale(0.9)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}>
                    <span style={{ 
                      fontSize: item.label ? (presentationMode ? '36px' : '28px') : '20px',
                      filter: animatedStep >= item.step ? 'none' : 'grayscale(1)'
                    }}>{item.icon}</span>
                    {item.label && (
                      <span style={{ 
                        fontSize: '12px', 
                        color: 'rgba(255,255,255,0.7)',
                        fontFamily: "'JetBrains Mono', monospace"
                      }}>{item.label}</span>
                    )}
                  </div>
                ))}
                
                <button
                  onClick={startAnimation}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '16px',
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    color: '#fff',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  🔄 Replay
                </button>
              </div>

              {/* Example */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(16,163,127,0.1) 0%, rgba(16,163,127,0.05) 100%)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(16,163,127,0.2)'
              }}>
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: '#10A37F',
                  fontFamily: "'JetBrains Mono', monospace"
                }}>🔍 Ejemplo rápido</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {[
                    { label: 'Datos', text: 'Millones de textos, imágenes, código' },
                    { label: 'Prompt', text: '"Explícame IA como si tuviera 10 años"' },
                    { label: 'Output', text: 'Una explicación adaptada a ese contexto ✨' }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ 
                        background: 'rgba(16,163,127,0.2)', 
                        padding: '4px 10px', 
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontFamily: "'JetBrains Mono', monospace",
                        whiteSpace: 'nowrap'
                      }}>{item.label}</span>
                      <span style={{ 
                        color: 'rgba(255,255,255,0.8)', 
                        fontSize: '14px',
                        fontStyle: item.label === 'Prompt' ? 'italic' : 'normal'
                      }}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <TransitionNote text={transitionNotes.howworks} />
        </div>
        </div>
      </section>

      {/* Section: Types of AI */}
      <section 
        id="types" 
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          padding: '40px 24px'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '24px',
          padding: '24px 40px',
          marginBottom: '20px',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <SectionHeader icon="🧠" title="Tipos de IA que ves hoy" section="types">
            {selectedAITypes.length > 0 && (
              <span style={{
                background: 'rgba(139,92,246,0.3)',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                {selectedAITypes.length} seleccionados
              </span>
            )}
          </SectionHeader>

          {expandedSections.includes('types') && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <p style={{ 
                fontSize: '13px', 
                color: 'rgba(255,255,255,0.5)', 
                marginBottom: '16px',
                fontStyle: 'italic'
              }}>
                💡 Haz clic en las tarjetas para ver una simulación interactiva
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
                marginBottom: selectedAITypes.length > 0 ? '0' : '0'
              }}>
                {aiTypes.map((type, i) => {
                  const isSelected = selectedAITypes.includes(type.type);
                  return (
                    <div 
                      key={i} 
                      onClick={() => {
                        // Solo permitir uno seleccionado a la vez
                        if (isSelected) {
                          setSelectedAITypes([]);
                        } else {
                          setSelectedAITypes([type.type]);
                        }
                      }}
                      style={{
                        background: isSelected ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.03)',
                        borderRadius: '16px',
                        padding: '24px',
                        border: `2px solid ${isSelected ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.08)'}`,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        transform: isSelected ? 'scale(1.02)' : 'scale(1)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '36px', display: 'block', marginBottom: '12px' }}>{type.icon}</span>
                        {isSelected && (
                          <span style={{
                            background: 'rgba(139,92,246,0.3)',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px'
                          }}>✓</span>
                        )}
                      </div>
                      <h3 style={{ 
                        margin: '0 0 8px 0', 
                        fontSize: '18px',
                        fontWeight: 600,
                        fontFamily: "'Space Grotesk', sans-serif"
                      }}>{type.type}</h3>
                      <p style={{ 
                        margin: '0 0 12px 0', 
                        fontSize: '14px', 
                        color: 'rgba(255,255,255,0.7)',
                        lineHeight: 1.5
                      }}>{type.desc}</p>
                      <span style={{
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.5)',
                        fontFamily: "'JetBrains Mono', monospace"
                      }}>{type.example}</span>
                      
                      {isSelected && (
                        <div style={{
                          marginTop: '16px',
                          paddingTop: '16px',
                          borderTop: '1px solid rgba(255,255,255,0.1)',
                          animation: 'fadeIn 0.3s ease-out'
                        }}>
                          <p style={{
                            margin: 0,
                            fontSize: '13px',
                            color: 'rgba(255,255,255,0.8)',
                            lineHeight: 1.6
                          }}>{type.details}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Interactive Demos - Show below cards */}
              {selectedAITypes.includes('LLM') && <LLMDemo />}
              {selectedAITypes.includes('Generativa') && <GenerativeDemo />}
              {selectedAITypes.includes('Analítica') && <AnalyticDemo />}
              {selectedAITypes.includes('Agentes') && <AgentDemo />}
            </div>
          )}

          <TransitionNote text={transitionNotes.types} />
        </div>
        </div>
      </section>

      {/* Section: Hallucinations */}
      <section 
        id="hallucinations" 
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          padding: '40px 24px'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '24px',
          padding: '24px 40px',
          marginBottom: '20px',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <SectionHeader icon="⚠️" title="Alucinaciones en LLMs" section="hallucinations" />

          {expandedSections.includes('hallucinations') && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <p style={{ 
                fontSize: presentationMode ? '20px' : '17px', 
                lineHeight: 1.8, 
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '24px',
                maxWidth: '800px',
                transition: 'font-size 0.3s ease'
              }}>
                Las <strong style={{ color: '#F59E0B' }}>alucinaciones</strong> ocurren cuando un LLM genera información 
                que <strong style={{ color: '#EF4444' }}>parece correcta y convincente, pero es completamente falsa</strong>. 
                El modelo "inventa" datos con total confianza.
              </p>

              {/* Why it happens */}
              <div style={{
                background: 'rgba(239,68,68,0.1)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px',
                borderLeft: '4px solid #EF4444'
              }}>
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  fontSize: '16px',
                  color: '#EF4444',
                  fontFamily: "'JetBrains Mono', monospace"
                }}>⚠️ ¿Por qué sucede?</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    'El modelo NO busca información en internet en tiempo real',
                    'Solo conoce lo que vio durante su entrenamiento (hasta cierta fecha)',
                    'Intenta "completar" respuestas basándose en patrones, no en hechos',
                    'No tiene mecanismo interno para decir "no lo sé"'
                  ].map((item, i) => (
                    <div key={i} style={{
                      background: 'rgba(239,68,68,0.1)',
                      padding: '10px 18px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.9)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ color: '#EF4444' }}>●</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive hallucination demo */}
              <HallucinationDemo />

              {/* How to detect */}
              <div style={{
                background: 'rgba(16,185,129,0.1)',
                borderRadius: '16px',
                padding: '24px',
                marginTop: '24px',
                border: '1px solid rgba(16,185,129,0.2)'
              }}>
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  fontSize: '16px',
                  color: '#10B981',
                  fontFamily: "'JetBrains Mono', monospace"
                }}>✅ Cómo mitigar las alucinaciones:</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {[
                    { emoji: '📚', text: 'Usar RAG (Retrieval Augmented Generation) - buscar en bases de datos reales' },
                    { emoji: '🔍', text: 'Siempre verificar datos críticos (fechas, estadísticas, nombres)' },
                    { emoji: '🎯', text: 'Ser específico en los prompts y pedir fuentes' },
                    { emoji: '🔄', text: 'Usar múltiples modelos y comparar respuestas' },
                    { emoji: '⚙️', text: 'Ajustar temperatura (menor = más conservador)' }
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '20px' }}>{item.emoji}</span>
                      <span style={{ 
                        color: 'rgba(255,255,255,0.8)', 
                        fontSize: '14px',
                        lineHeight: 1.6
                      }}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                marginTop: '24px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 100%)',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <span style={{ fontSize: '20px' }}>💡</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                  <strong style={{ color: '#fff' }}>Importante:</strong> Los LLMs son increíblemente útiles, 
                  pero NO son bases de datos de hechos. Son modelos de lenguaje que predicen texto.
                </span>
              </div>
            </div>
          )}

          <TransitionNote text={transitionNotes.hallucinations} />
        </div>
        </div>
      </section>

      {/* Section: Providers Ecosystem */}
      <section 
        id="providers" 
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          padding: '40px 24px'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '24px',
          padding: '24px 40px',
          marginBottom: '20px',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <SectionHeader icon="🌍" title="Ecosistema de Proveedores" section="providers">
            {activeProviders.length > 0 && (
              <span style={{
                background: 'rgba(16,163,127,0.3)',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                {activeProviders.length} seleccionados
              </span>
            )}
          </SectionHeader>

          {expandedSections.includes('providers') && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <p style={{ 
                fontSize: '13px', 
                color: 'rgba(255,255,255,0.5)', 
                marginBottom: '16px',
                fontStyle: 'italic'
              }}>
                💡 Selecciona proveedores para comparar. {comparisonMode && 'Modo comparación activo.'}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '32px'
              }}>
                {providers.map(provider => (
                  <ProviderCard
                    key={provider.id}
                    provider={provider}
                    isSelected={activeProviders.includes(provider.id)}
                    onClick={() => toggleProvider(provider.id)}
                    isComparing={comparisonMode}
                  />
                ))}
              </div>

              {/* Comparison Table - Shows when comparing */}
              {comparisonMode && activeProviders.length >= 2 && (
                <div style={{
                  background: 'rgba(139,92,246,0.1)',
                  borderRadius: '16px',
                  padding: '24px',
                  marginBottom: '24px',
                  border: '1px solid rgba(139,92,246,0.2)',
                  animation: 'fadeIn 0.4s ease-out'
                }}>
                  <h3 style={{ 
                    margin: '0 0 20px 0', 
                    fontSize: '16px',
                    color: '#A78BFA',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>⚔️ Comparación directa</h3>
                  
                  <p style={{ 
                    fontSize: '13px', 
                    color: 'rgba(255,255,255,0.5)', 
                    marginBottom: '16px',
                    fontStyle: 'italic'
                  }}>
                    💡 Pasa el mouse sobre las categorías para destacar
                  </p>

                  <div style={{ overflowX: 'hidden' }}>
                    <table style={{ 
                      width: '100%', 
                      borderCollapse: 'separate',
                      borderSpacing: '0 8px'
                    }}>
                      <thead>
                        <tr>
                          <th style={{ 
                            textAlign: 'left', 
                            padding: '12px 16px',
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontFamily: "'JetBrains Mono', monospace"
                          }}>Característica</th>
                          {providers.filter(p => activeProviders.includes(p.id)).map(p => (
                            <th key={p.id} style={{ 
                              textAlign: 'center', 
                              padding: '12px 16px',
                              color: p.color,
                              fontSize: '14px',
                              fontWeight: 600
                            }}>{p.name}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map(cat => {
                          const selectedProviders = providers.filter(p => activeProviders.includes(p.id));
                          const scores = selectedProviders.map(p => p.scores[cat.key]);
                          const maxScore = Math.max(...scores);
                          
                          return (
                            <tr 
                              key={cat.key} 
                              style={{
                                background: highlightedCategory === cat.key 
                                  ? 'rgba(139,92,246,0.2)' 
                                  : 'rgba(255,255,255,0.03)',
                                borderRadius: '8px',
                                transition: 'background 0.3s ease'
                              }}
                              onMouseEnter={() => setHighlightedCategory(cat.key)}
                              onMouseLeave={() => setHighlightedCategory(null)}
                            >
                              <td style={{ 
                                padding: '16px',
                                borderRadius: '8px 0 0 8px',
                                color: 'rgba(255,255,255,0.8)',
                                fontSize: '14px'
                              }}>
                                <span style={{ marginRight: '8px' }}>{cat.icon}</span>
                                {cat.label}
                              </td>
                              {selectedProviders.map(p => (
                                <td key={p.id} style={{ 
                                  textAlign: 'center', 
                                  padding: '16px',
                                  background: p.scores[cat.key] === maxScore && highlightedCategory === cat.key
                                    ? `${p.color}30`
                                    : 'transparent',
                                  transition: 'background 0.3s ease'
                                }}>
                                  <StarRating 
                                    score={p.scores[cat.key]} 
                                    color={p.color}
                                    highlighted={highlightedCategory === cat.key && p.scores[cat.key] === maxScore}
                                  />
                                  {p.scores[cat.key] === maxScore && highlightedCategory === cat.key && (
                                    <div style={{
                                      fontSize: '10px',
                                      color: p.color,
                                      marginTop: '4px',
                                      fontWeight: 600
                                    }}>MEJOR</div>
                                  )}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Full Comparison Table in Advanced Mode */}
              {viewMode === 'advanced' && !comparisonMode && (
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '16px',
                  padding: '24px',
                  marginBottom: '24px',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}>
                  <h3 style={{ 
                    margin: '0 0 20px 0', 
                    fontSize: '16px',
                    color: 'rgba(255,255,255,0.7)',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>📊 Comparativa completa</h3>
                  
                  <div style={{ overflowX: 'hidden' }}>
                    <table style={{ 
                      width: '100%', 
                      borderCollapse: 'separate',
                      borderSpacing: '0 8px'
                    }}>
                      <thead>
                        <tr>
                          <th style={{ 
                            textAlign: 'left', 
                            padding: '12px 16px',
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontFamily: "'JetBrains Mono', monospace"
                          }}>Característica</th>
                          {providers.map(p => (
                            <th key={p.id} style={{ 
                              textAlign: 'center', 
                              padding: '12px 16px',
                              color: p.color,
                              fontSize: '14px',
                              fontWeight: 600
                            }}>{p.name}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {categories.map(cat => (
                          <tr 
                            key={cat.key} 
                            style={{
                              background: highlightedCategory === cat.key 
                                ? 'rgba(255,255,255,0.08)' 
                                : 'rgba(255,255,255,0.03)',
                              cursor: 'pointer'
                            }}
                            onMouseEnter={() => setHighlightedCategory(cat.key)}
                            onMouseLeave={() => setHighlightedCategory(null)}
                          >
                            <td style={{ 
                              padding: '16px',
                              borderRadius: '8px 0 0 8px',
                              color: 'rgba(255,255,255,0.8)',
                              fontSize: '14px'
                            }}>
                              <span style={{ marginRight: '8px' }}>{cat.icon}</span>
                              {cat.label}
                            </td>
                            {providers.map(p => (
                              <td key={p.id} style={{ 
                                textAlign: 'center', 
                                padding: '16px'
                              }}>
                                <StarRating 
                                  score={p.scores[cat.key]} 
                                  color={p.color}
                                  highlighted={highlightedCategory === cat.key}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Other Providers */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.06)'
              }}>
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily: "'JetBrains Mono', monospace"
                }}>🟡 Otros jugadores relevantes</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {otherProviders.map((p, i) => (
                    <div key={i} style={{
                      background: 'rgba(255,255,255,0.05)',
                      padding: '12px 20px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    >
                      <span>{p.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '14px' }}>{p.name}</div>
                        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{p.diferencial}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <TransitionNote text={transitionNotes.providers} />
        </div>
        </div>
      </section>

      {/* Section: Consumption Methods */}
      <section 
        id="consumption" 
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          padding: '40px 24px'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '24px',
          padding: '24px 40px',
          marginBottom: '20px',
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <SectionHeader icon="🔌" title="Formas de Consumir un LLM" section="consumption" />

          {expandedSections.includes('consumption') && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              <p style={{ 
                fontSize: presentationMode ? '20px' : '17px', 
                lineHeight: 1.8, 
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '24px',
                maxWidth: '800px',
                transition: 'font-size 0.3s ease'
              }}>
                Existen dos formas fundamentales de interactuar con los modelos de lenguaje: 
                mediante una <strong style={{ color: '#A78BFA' }}>interfaz de chat</strong> o 
                a través de una <strong style={{ color: '#10B981' }}>API programática</strong>.
              </p>

              {/* Comparison cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '32px'
              }}>
                {/* Chat UI Card */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(139,92,246,0.05) 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '2px solid rgba(139,92,246,0.3)'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
                  <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#A78BFA',
                    fontFamily: "'Space Grotesk', sans-serif"
                  }}>
                    Chat UI (Interfaz de Usuario)
                  </h3>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ 
                      fontSize: '13px', 
                      color: 'rgba(255,255,255,0.5)', 
                      marginBottom: '8px',
                      fontFamily: "'JetBrains Mono', monospace"
                    }}>
                      ✓ Características:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        'Interfaz visual intuitiva',
                        'Historial de conversaciones',
                        'Formato de mensajes claro',
                        'Sin conocimientos técnicos',
                        'Experiencia conversacional'
                      ].map((item, i) => (
                        <div key={i} style={{
                          fontSize: '14px',
                          color: 'rgba(255,255,255,0.8)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span style={{ color: '#A78BFA' }}>▸</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    background: 'rgba(139,92,246,0.1)',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.7)'
                  }}>
                    <strong style={{ color: '#A78BFA' }}>Ideal para:</strong> Usuarios finales, 
                    pruebas rápidas, brainstorming, soporte al cliente
                  </div>

                  <div style={{
                    marginTop: '12px',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>
                    Ejemplos: ChatGPT, Claude.ai, Gemini
                  </div>
                </div>

                {/* API Card */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0.05) 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '2px solid rgba(16,185,129,0.3)'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔧</div>
                  <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#10B981',
                    fontFamily: "'Space Grotesk', sans-serif"
                  }}>
                    API (Application Programming Interface)
                  </h3>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ 
                      fontSize: '13px', 
                      color: 'rgba(255,255,255,0.5)', 
                      marginBottom: '8px',
                      fontFamily: "'JetBrains Mono', monospace"
                    }}>
                      ✓ Características:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        'Integración programática',
                        'Automatización completa',
                        'Procesamiento en lote',
                        'Personalización total',
                        'Integrar en apps propias'
                      ].map((item, i) => (
                        <div key={i} style={{
                          fontSize: '14px',
                          color: 'rgba(255,255,255,0.8)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span style={{ color: '#10B981' }}>▸</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    background: 'rgba(16,185,129,0.1)',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.7)'
                  }}>
                    <strong style={{ color: '#10B981' }}>Ideal para:</strong> Desarrolladores, 
                    productos SaaS, automatizaciones, integraciones empresariales
                  </div>

                  <div style={{
                    marginTop: '12px',
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: "'JetBrains Mono', monospace"
                  }}>
                    Ejemplos: OpenAI API, Anthropic API
                  </div>
                </div>
              </div>

              {/* Interactive demo */}
              <ConsumptionDemo />

              {/* Use cases comparison */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '16px',
                padding: '24px',
                marginTop: '24px',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <h3 style={{ 
                  margin: '0 0 20px 0', 
                  fontSize: '16px',
                  color: 'rgba(255,255,255,0.7)',
                  fontFamily: "'JetBrains Mono', monospace"
                }}>📊 Casos de Uso</h3>
                
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr', gap: '16px', alignItems: 'center' }}>
                    <div style={{ 
                      fontSize: '12px', 
                      fontWeight: 600, 
                      color: 'rgba(255,255,255,0.5)',
                      textTransform: 'uppercase'
                    }}>
                      Caso de Uso
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      fontWeight: 600, 
                      color: '#A78BFA',
                      textAlign: 'center'
                    }}>
                      💬 Chat UI
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      fontWeight: 600, 
                      color: '#10B981',
                      textAlign: 'center'
                    }}>
                      🔧 API
                    </div>
                  </div>

                  {[
                    { use: 'Preguntas rápidas', chat: '✅ Ideal', api: '⚠️ Excesivo' },
                    { use: 'Análisis de 1000 docs', chat: '❌ Inviable', api: '✅ Perfecto' },
                    { use: 'Chatbot en tu web', chat: '⚠️ Limitado', api: '✅ Ideal' },
                    { use: 'Aprender sobre IA', chat: '✅ Perfecto', api: '⚠️ Complejo' },
                    { use: 'Generar reportes auto', chat: '❌ Manual', api: '✅ Automático' }
                  ].map((row, i) => (
                    <div key={i} style={{
                      display: 'grid',
                      gridTemplateColumns: '200px 1fr 1fr',
                      gap: '16px',
                      alignItems: 'center',
                      background: 'rgba(255,255,255,0.02)',
                      padding: '12px',
                      borderRadius: '8px'
                    }}>
                      <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                        {row.use}
                      </div>
                      <div style={{ fontSize: '13px', textAlign: 'center' }}>
                        {row.chat}
                      </div>
                      <div style={{ fontSize: '13px', textAlign: 'center' }}>
                        {row.api}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                marginTop: '24px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 100%)',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <span style={{ fontSize: '20px' }}>💡</span>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                  <strong style={{ color: '#fff' }}>Importante:</strong> Muchas empresas usan AMBAS formas: 
                  Chat UI para equipos internos y API para integrar IA en sus productos.
                </span>
              </div>
            </div>
          )}

          <TransitionNote text={transitionNotes.consumption} />
        </div>
        </div>
      </section>

      {/* Section: Tokens */}
      <section 
        id="tokens" 
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          padding: '40px 24px'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
          borderRadius: '24px',
          padding: '24px 40px',
          marginBottom: '20px',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <SectionHeader icon="🪙" title="¿Cómo funcionan los Tokens?" section="tokens" />

          {expandedSections.includes('tokens') && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              {/* Explanation */}
              <div style={{ marginBottom: '24px' }}>
                <p style={{ 
                  fontSize: '16px', 
                  lineHeight: 1.8, 
                  color: 'rgba(255,255,255,0.8)',
                  marginBottom: '16px'
                }}>
                  Los <strong style={{ color: '#A78BFA' }}>tokens</strong> son las unidades básicas que los modelos de IA usan para procesar texto. 
                  No son palabras completas — pueden ser palabras, partes de palabras, o caracteres especiales.
                </p>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  {[
                    { example: '"Hola"', tokens: '1 token', icon: '📝' },
                    { example: '"Inteligencia"', tokens: '~2-3 tokens', icon: '🧩' },
                    { example: '"ChatGPT"', tokens: '~2 tokens', icon: '🤖' },
                    { example: 'Espacios y puntuación', tokens: 'También cuentan', icon: '⚡' }
                  ].map((item, i) => (
                    <div key={i} style={{
                      background: 'rgba(167,139,250,0.1)',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid rgba(167,139,250,0.2)'
                    }}>
                      <span style={{ fontSize: '20px', marginRight: '8px' }}>{item.icon}</span>
                      <span style={{ color: '#A78BFA', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px' }}>{item.example}</span>
                      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginTop: '4px' }}>{item.tokens}</div>
                    </div>
                  ))}
                </div>

                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <span style={{ fontSize: '18px' }}>💡</span>
                  <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>
                    <strong style={{ color: '#fff' }}>Regla general:</strong> 1 token ≈ 4 caracteres en inglés, ≈ 3 caracteres en español
                  </span>
                </div>
              </div>

              {/* Interactive Tokenizer */}
              <div style={{
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: "'JetBrains Mono', monospace"
                }}>🔬 Tokenizador Interactivo</h3>
                
                <textarea
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  placeholder="Escribe algo aquí para ver cómo se tokeniza..."
                  style={{
                    width: '100%',
                    minHeight: '80px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '2px solid rgba(167,139,250,0.3)',
                    borderRadius: '12px',
                    padding: '16px',
                    color: '#fff',
                    fontSize: '15px',
                    fontFamily: "'Inter', sans-serif",
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(167,139,250,0.6)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(167,139,250,0.3)'}
                />

                {/* Token Stats */}
                <div style={{
                  display: 'flex',
                  gap: '16px',
                  marginTop: '16px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    background: 'rgba(167,139,250,0.2)',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '24px' }}>🪙</span>
                    <div>
                      <div style={{ fontSize: '24px', fontWeight: 700, color: '#A78BFA', fontFamily: "'Space Grotesk', sans-serif" }}>
                        ~{simulatedTokens.length}
                      </div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Tokens estimados</div>
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '24px' }}>📊</span>
                    <div>
                      <div style={{ fontSize: '24px', fontWeight: 700, color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>
                        {tokenInput.length}
                      </div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Caracteres</div>
                    </div>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '24px' }}>📝</span>
                    <div>
                      <div style={{ fontSize: '24px', fontWeight: 700, color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>
                        {tokenInput.split(/\s+/).filter(w => w.length > 0).length}
                      </div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>Palabras</div>
                    </div>
                  </div>
                </div>

                {/* Visualized Tokens */}
                {simulatedTokens.length > 0 && (
                  <div style={{ marginTop: '20px' }}>
                    <div style={{ 
                      fontSize: '12px', 
                      color: 'rgba(255,255,255,0.5)', 
                      marginBottom: '10px',
                      fontFamily: "'JetBrains Mono', monospace"
                    }}>
                      Tokens visualizados:
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '6px',
                      padding: '16px',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '10px',
                      maxHeight: '150px',
                      overflowY: 'auto'
                    }}>
                      {simulatedTokens.map((token, i) => (
                        <span 
                          key={i}
                          style={{
                            background: tokenColors[i % tokenColors.length],
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontFamily: "'JetBrains Mono', monospace",
                            color: '#fff',
                            whiteSpace: 'pre',
                            animation: 'fadeIn 0.2s ease-out',
                            animationDelay: `${i * 0.02}s`,
                            animationFillMode: 'both'
                          }}
                        >
                          {token === ' ' ? '␣' : token}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Pricing Table */}
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <h3 style={{ 
                  margin: '0 0 8px 0', 
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: "'JetBrains Mono', monospace"
                }}>💰 Pricing por 1M de Tokens (USD)</h3>
                <p style={{ 
                  fontSize: '12px', 
                  color: 'rgba(255,255,255,0.4)', 
                  marginBottom: '20px' 
                }}>
                  Precios de referencia - pueden variar. Actualizado Enero 2026.
                </p>

                <div style={{ overflowX: 'hidden' }}>
                  <table style={{ 
                    width: '100%', 
                    borderCollapse: 'separate',
                    borderSpacing: '0 6px',
                    minWidth: '500px'
                  }}>
                    <thead>
                      <tr>
                        <th style={{ 
                          textAlign: 'left', 
                          padding: '10px 14px',
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '11px',
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          fontFamily: "'JetBrains Mono', monospace"
                        }}>Modelo</th>
                        <th style={{ 
                          textAlign: 'center', 
                          padding: '10px 14px',
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '11px',
                          textTransform: 'uppercase'
                        }}>Input</th>
                        <th style={{ 
                          textAlign: 'center', 
                          padding: '10px 14px',
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '11px',
                          textTransform: 'uppercase'
                        }}>Output</th>
                        <th style={{ 
                          textAlign: 'center', 
                          padding: '10px 14px',
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '11px',
                          textTransform: 'uppercase'
                        }}>Tu texto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricingData.map((model, i) => {
                        const inputCost = (simulatedTokens.length / 1000000) * model.input;
                        return (
                          <tr key={i} style={{
                            background: 'rgba(255,255,255,0.03)'
                          }}>
                            <td style={{ 
                              padding: '14px',
                              borderRadius: '8px 0 0 8px'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{
                                  width: '10px',
                                  height: '10px',
                                  borderRadius: '50%',
                                  background: model.color
                                }} />
                                <div>
                                  <div style={{ fontWeight: 600, fontSize: '14px', color: model.color }}>{model.name}</div>
                                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{model.provider}</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ textAlign: 'center', padding: '14px' }}>
                              <span style={{ 
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '14px',
                                color: 'rgba(255,255,255,0.8)'
                              }}>${model.input.toFixed(2)}</span>
                            </td>
                            <td style={{ textAlign: 'center', padding: '14px' }}>
                              <span style={{ 
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '14px',
                                color: 'rgba(255,255,255,0.8)'
                              }}>${model.output.toFixed(2)}</span>
                            </td>
                            <td style={{ 
                              textAlign: 'center', 
                              padding: '14px',
                              borderRadius: '0 8px 8px 0'
                            }}>
                              <span style={{ 
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '14px',
                                color: inputCost > 0 ? '#10B981' : 'rgba(255,255,255,0.4)'
                              }}>
                                {inputCost > 0 ? `$${inputCost.toFixed(6)}` : '-'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  background: 'rgba(16,185,129,0.1)',
                  borderRadius: '10px',
                  border: '1px solid rgba(16,185,129,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <span style={{ fontSize: '18px' }}>💡</span>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
                    <strong style={{ color: '#10B981' }}>Input</strong> = lo que envías al modelo. <strong style={{ color: '#10B981' }}>Output</strong> = lo que el modelo genera.
                  </span>
                </div>
              </div>
            </div>
          )}

          <TransitionNote text={transitionNotes.tokens} />
        </div>
        </div>
      </section>

      {/* Section: Future */}
      <section 
        id="future" 
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
          padding: '40px 24px'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.1) 100%)',
          borderRadius: '24px',
          padding: '24px 40px',
          marginBottom: '20px',
          border: '1px solid rgba(139,92,246,0.2)'
        }}>
          <SectionHeader icon="🚀" title="¿Qué viene en 2026?" section="future" />

          {expandedSections.includes('future') && (
            <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
              {/* Intro Banner */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                borderRadius: '20px',
                padding: '32px',
                marginBottom: '32px',
                textAlign: 'center',
                border: '2px solid rgba(255,255,255,0.2)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-10%',
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  animation: 'pulse 3s ease-in-out infinite'
                }} />
                <h2 style={{
                  margin: '0 0 16px 0',
                  fontSize: '36px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative'
                }}>
                  ¿Qué viene en 2026? 🚀
                </h2>
                <p style={{
                  margin: 0,
                  fontSize: '18px',
                  color: 'rgba(255,255,255,0.8)',
                  lineHeight: 1.6,
                  position: 'relative'
                }}>
                  6 tendencias que van a cambiar la forma en que trabajamos (y vivimos)
                </p>
              </div>

              {/* Grid de tendencias */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '24px',
                marginBottom: '32px'
              }}>
                {futureItems.map((item, i) => {
                  const isExpanded = expandedFutureItems.includes(i);
                  return (
                    <div 
                      key={i} 
                      onClick={() => toggleFutureItem(i)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                      }}
                      style={{
                        background: item.gradient || 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(59,130,246,0.2) 100%)',
                        borderRadius: '24px',
                        padding: '28px',
                        cursor: 'pointer',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        border: isExpanded ? '2px solid rgba(255,255,255,0.4)' : '2px solid rgba(255,255,255,0.15)',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: isExpanded ? '0 20px 50px rgba(0,0,0,0.4)' : '0 10px 30px rgba(0,0,0,0.2)',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      {/* Decorative gradient overlay */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
                        pointerEvents: 'none'
                      }} />

                      {/* Icon Badge */}
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        background: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        marginBottom: '20px',
                        backdropFilter: 'blur(10px)',
                        border: '2px solid rgba(255,255,255,0.3)',
                        position: 'relative',
                        animation: isExpanded ? 'bounce 0.6s ease' : 'none'
                      }}>
                        {item.icon}
                      </div>

                      {/* Content */}
                      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{
                          margin: '0 0 8px 0',
                          fontSize: '22px',
                          fontWeight: '700',
                          color: '#fff',
                          lineHeight: 1.3
                        }}>
                          {item.title}
                        </h3>
                        
                        <p style={{
                          margin: '0 0 16px 0',
                          fontSize: '13px',
                          color: 'rgba(255,255,255,0.7)',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>
                          {item.subtitle}
                        </p>

                        {/* Stat Badge */}
                        {item.stat && (
                          <div style={{
                            background: 'rgba(255,255,255,0.25)',
                            borderRadius: '12px',
                            padding: '12px 16px',
                            marginBottom: '16px',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.3)'
                          }}>
                            <div style={{
                              fontSize: '28px',
                              fontWeight: '800',
                              color: '#fff',
                              marginBottom: '4px',
                              textAlign: 'center'
                            }}>
                              {item.stat}
                            </div>
                            <div style={{
                              fontSize: '11px',
                              color: 'rgba(255,255,255,0.9)',
                              textAlign: 'center',
                              fontWeight: '600'
                            }}>
                              {item.statLabel}
                            </div>
                          </div>
                        )}

                        {/* Description */}
                        <p style={{
                          margin: '0 0 16px 0',
                          fontSize: '15px',
                          color: 'rgba(255,255,255,0.95)',
                          lineHeight: 1.7,
                          flex: 1
                        }}>
                          {isExpanded 
                            ? item.description 
                            : item.description.length > 120 
                              ? item.description.substring(0, 120) + '...'
                              : item.description
                          }
                        </p>

                        {/* Footer with emoji and button */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: 'auto'
                        }}>
                          <span style={{ fontSize: '28px' }}>
                            {item.emoji}
                          </span>
                          <div style={{
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '20px',
                            padding: '8px 16px',
                            fontSize: '13px',
                            color: '#fff',
                            fontWeight: '600',
                            border: '1px solid rgba(255,255,255,0.3)'
                          }}>
                            {isExpanded ? '↑ Menos' : '↓ Leer más'}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Consensus Summary - Más impactante */}
              <div style={{
                marginTop: '48px',
                padding: '48px 40px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '32px',
                border: '3px solid rgba(255,255,255,0.3)',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(102,126,234,0.4)'
              }}>
                {/* Animated background */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  animation: 'rotate 20s linear infinite'
                }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    display: 'inline-block',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    padding: '16px 24px',
                    marginBottom: '24px',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255,255,255,0.3)'
                  }}>
                    <span style={{ fontSize: '48px' }}>🎯</span>
                  </div>
                  
                  <h3 style={{
                    margin: '0 0 24px 0',
                    fontSize: '32px',
                    fontWeight: '800',
                    color: '#fff',
                    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    letterSpacing: '0.5px'
                  }}>
                    En Resumen: El 2026 en IA
                  </h3>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    marginBottom: '32px'
                  }}>
                    <div style={{
                      background: 'rgba(255,255,255,0.15)',
                      borderRadius: '16px',
                      padding: '20px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚡</div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>
                        Más Operativa
                      </div>
                      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)' }}>
                        Agentes que ejecutan
                      </div>
                    </div>
                    
                    <div style={{
                      background: 'rgba(255,255,255,0.15)',
                      borderRadius: '16px',
                      padding: '20px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>📜</div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>
                        Más Regulada
                      </div>
                      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)' }}>
                        Reglas claras
                      </div>
                    </div>
                    
                    <div style={{
                      background: 'rgba(255,255,255,0.15)',
                      borderRadius: '16px',
                      padding: '20px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>💎</div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>
                        Más Resultados
                      </div>
                      <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.9)' }}>
                        ROI medible
                      </div>
                    </div>
                  </div>
                  
                  <p style={{
                    margin: '0 auto',
                    fontSize: '20px',
                    color: '#fff',
                    lineHeight: 1.7,
                    maxWidth: '800px',
                    fontWeight: '500',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    <strong style={{ fontSize: '24px' }}>🚀 La oportunidad está aquí</strong>
                    <br />
                    Este es el momento de aprender, adaptarse y aprovechar la IA antes de que sea "el estándar mínimo"
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <footer style={{
            textAlign: 'center',
            padding: '40px 20px 20px',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '13px',
            marginTop: '60px'
          }}>
            <p style={{ margin: 0 }}>
              Presentación Interactiva • Tu Negocio con IA
            </p>
            <p style={{ margin: '8px 0 0 0', fontSize: '11px' }}>
              Usa ↑↓ o las flechas laterales para navegar
            </p>
          </footer>
        </div>
        </div>
      </section>
    </div>
  );
};

export default AIPanorama;
