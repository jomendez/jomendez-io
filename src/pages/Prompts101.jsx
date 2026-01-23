import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PromptAlchemy } from '../components/PromptAlchemy';

const Prompts101 = () => {
  const navigate = useNavigate();
  
  // Estados esenciales
  const [currentSection, setCurrentSection] = useState(0);
  const [expandedSections, setExpandedSections] = useState(['intro', 'anatomy', 'error', 'context', 'comparison', 'practice', 'playground', 'tips']);
  const [showKeyboardHint, setShowKeyboardHint] = useState(true);
  
  // Estados para demos interactivos
  const [selectedPart, setSelectedPart] = useState(null);
  const [comparisonActive, setComparisonActive] = useState(null);
  const [buildingPrompt, setBuildingPrompt] = useState({
    rol: '',
    contexto: '',
    tarea: '',
    formato: '',
    restricciones: ''
  });
  const [showBuiltPrompt, setShowBuiltPrompt] = useState(false);
  
  // Estados para la sección de práctica
  const [practicePrompt, setPracticePrompt] = useState('');
  const [promptAnalysis, setPromptAnalysis] = useState({
    rol: { found: false, text: '', score: 0 },
    contexto: { found: false, text: '', score: 0 },
    tarea: { found: false, text: '', score: 0 },
    formato: { found: false, text: '', score: 0 },
    restricciones: { found: false, text: '', score: 0 }
  });
  
  // Define secciones
  const sections = ['header', 'intro', 'anatomy', 'error', 'context', 'comparison', 'practice', 'playground', 'tips'];
  
  const sectionNames = {
    header: 'Inicio',
    intro: 'El Problema',
    anatomy: 'Anatomía del Prompt',
    error: 'Error #1',
    context: 'Contexto es Rey',
    comparison: 'Comparación',
    practice: 'Practica',
    playground: 'AI Playground',
    tips: 'Tips Finales'
  };
  
  const transitionNotes = {
    header: "Primero, entendamos por qué la mayoría de los prompts no funcionan...",
    intro: "Ahora veamos qué es exactamente un prompt efectivo...",
    anatomy: "El error más común es simple pero crítico...",
    error: "Entonces, ¿cómo damos el contexto correcto?",
    context: "Veamos la diferencia en acción con ejemplos reales...",
    comparison: "Ahora es tu turno de practicar...",
    practice: "Prueba tus prompts en un entorno real con Google AI Studio...",
    playground: "Para terminar, algunos tips prácticos que puedes usar hoy mismo..."
  };
  
  // Partes del prompt con colores del spec
  const promptParts = [
    {
      id: 'rol',
      name: 'Rol',
      icon: '👤',
      color: '#4c3d8f',
      gradient: 'linear-gradient(135deg, #4c3d8f 0%, #5b2a6e 100%)',
      description: 'Define QUIÉN quieres que sea la IA. ¿Un experto? ¿Un profesor? ¿Un consultor?',
      example: 'Eres un experto en marketing digital con 10 años de experiencia...',
      why: 'La IA ajusta su tono, vocabulario y enfoque según el rol que le des.'
    },
    {
      id: 'contexto',
      name: 'Contexto',
      icon: '📋',
      color: '#8b2a5c',
      gradient: 'linear-gradient(135deg, #8b2a5c 0%, #a33a4a 100%)',
      description: 'Proporciona la INFORMACIÓN de fondo que la IA necesita saber.',
      example: 'Tengo una tienda de ropa online que vende a millennials urbanos...',
      why: 'Sin contexto, la IA adivina. Con contexto, la IA personaliza.'
    },
    {
      id: 'tarea',
      name: 'Tarea',
      icon: '🎯',
      color: '#1e5a7a',
      gradient: 'linear-gradient(135deg, #1e5a7a 0%, #0d6d6e 100%)',
      description: 'Especifica QUÉ quieres que haga exactamente.',
      example: 'Crea 5 ideas de posts para Instagram que generen engagement...',
      why: 'Una tarea clara = resultados precisos. Una tarea vaga = basura.'
    },
    {
      id: 'formato',
      name: 'Formato',
      icon: '📝',
      color: '#9c4a5b',
      gradient: 'linear-gradient(135deg, #9c4a5b 0%, #b85a2a 100%)',
      description: 'Define CÓMO quieres recibir la respuesta.',
      example: 'Responde en formato de lista numerada, máximo 50 palabras por idea...',
      why: 'El formato correcto hace que la respuesta sea inmediatamente útil.'
    },
    {
      id: 'restricciones',
      name: 'Restricciones',
      icon: '⚠️',
      color: '#2a5a4a',
      gradient: 'linear-gradient(135deg, #2a5a4a 0%, #3d6b5a 100%)',
      description: 'Establece LÍMITES y reglas que debe seguir.',
      example: 'No uses jerga técnica. Mantén un tono casual y amigable...',
      why: 'Las restricciones evitan que la IA se desvíe o haga suposiciones incorrectas.'
    }
  ];
  
  const badPrompts = [
    {
      prompt: "Dame ideas de marketing",
      problems: ["¿Para qué producto?", "¿Qué tipo de marketing?", "¿Para qué audiencia?", "¿En qué formato?"],
      output: "Aquí hay algunas ideas generales de marketing: redes sociales, email marketing, publicidad pagada..."
    },
    {
      prompt: "Escribe un email",
      problems: ["¿A quién?", "¿Sobre qué?", "¿Qué tono?", "¿Cuál es el objetivo?"],
      output: "Estimado cliente, Espero que este correo le encuentre bien. Le escribo para..."
    },
    {
      prompt: "Ayúdame con mi negocio",
      problems: ["¿Qué tipo de negocio?", "¿Qué problema específico?", "¿Qué has intentado?", "¿Qué recursos tienes?"],
      output: "Para ayudarte con tu negocio, podrías considerar mejorar tu presencia en línea..."
    }
  ];
  
  const goodPrompt = {
    rol: "Eres un consultor de marketing digital especializado en e-commerce de moda",
    contexto: "Tengo una tienda online de ropa streetwear dirigida a hombres de 18-30 años en México. Actualmente tengo 5,000 seguidores en Instagram pero bajo engagement (1.5%). Mi competencia principal tiene 50k seguidores con 8% de engagement.",
    tarea: "Crea 5 ideas específicas de contenido para Instagram que aumenten mi engagement y atraigan a mi audiencia objetivo",
    formato: "Lista numerada. Para cada idea incluye: 1) Tipo de post, 2) Copy sugerido (máx 50 palabras), 3) Por qué funcionará",
    restricciones: "No sugieras colaboraciones con influencers (no tengo presupuesto). Enfócate en contenido orgánico que pueda crear yo mismo. Mantén el tono casual y urbano acorde a mi marca."
  };
  
  // Funciones de navegación
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

  const toggleSection = (section) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
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

  const buildFullPrompt = () => {
    const parts = [];
    if (buildingPrompt.rol) parts.push(buildingPrompt.rol);
    if (buildingPrompt.contexto) parts.push(buildingPrompt.contexto);
    if (buildingPrompt.tarea) parts.push(buildingPrompt.tarea);
    if (buildingPrompt.formato) parts.push(buildingPrompt.formato);
    if (buildingPrompt.restricciones) parts.push(buildingPrompt.restricciones);
    return parts.join('\n\n');
  };

  // Función para analizar el prompt en tiempo real
  const analyzePrompt = (text) => {
    const lowerText = text.toLowerCase();
    
    // Patrones para detectar cada elemento
    const patterns = {
      rol: {
        keywords: ['eres', 'actúa como', 'actua como', 'imagina que eres', 'serás', 'seras', 'como experto', 'como un', 'como una', 'experto en', 'especialista', 'profesional', 'consultor', 'tu rol'],
        score: 0,
        found: false,
        text: ''
      },
      contexto: {
        keywords: ['tengo', 'mi negocio', 'mi empresa', 'mi cliente', 'el contexto es', 'la situación', 'la situacion', 'actualmente', 'estoy trabajando', 'mi proyecto', 'nuestro', 'nuestra', 'audiencia', 'target', 'mercado', 'dirigido a', 'sector'],
        score: 0,
        found: false,
        text: ''
      },
      tarea: {
        keywords: ['crea', 'genera', 'escribe', 'desarrolla', 'diseña', 'dame', 'necesito que', 'quiero que', 'ayúdame a', 'ayudame a', 'elabora', 'redacta', 'produce', 'haz', 'prepara', 'construye'],
        score: 0,
        found: false,
        text: ''
      },
      formato: {
        keywords: ['formato', 'lista', 'tabla', 'bullet', 'numerado', 'estructura', 'párrafos', 'parrafos', 'máximo', 'maximo', 'mínimo', 'minimo', 'palabras', 'caracteres', 'secciones', 'puntos', 'pasos', 'incluye'],
        score: 0,
        found: false,
        text: ''
      },
      restricciones: {
        keywords: ['no uses', 'no incluyas', 'evita', 'sin', 'no menciones', 'restricción', 'restriccion', 'limitación', 'limitacion', 'no hagas', 'mantén', 'manten', 'asegúrate', 'asegurate', 'tono', 'estilo', 'idioma', 'lenguaje'],
        score: 0,
        found: false,
        text: ''
      }
    };

    // Analizar cada patrón
    Object.keys(patterns).forEach(key => {
      const pattern = patterns[key];
      let matches = 0;
      
      pattern.keywords.forEach(keyword => {
        if (lowerText.includes(keyword)) {
          matches++;
          pattern.found = true;
        }
      });
      
      // Calcular score basado en coincidencias
      pattern.score = Math.min(100, matches * 25);
    });

    // Calcular longitud del texto como factor adicional
    const length = text.length;
    if (length > 50) patterns.contexto.score = Math.min(100, patterns.contexto.score + 20);
    if (length > 100) patterns.contexto.score = Math.min(100, patterns.contexto.score + 20);
    if (length > 200) patterns.tarea.score = Math.min(100, patterns.tarea.score + 15);

    setPromptAnalysis({
      rol: patterns.rol,
      contexto: patterns.contexto,
      tarea: patterns.tarea,
      formato: patterns.formato,
      restricciones: patterns.restricciones
    });
  };

  // Efecto para analizar el prompt cuando cambia
  useEffect(() => {
    if (practicePrompt) {
      analyzePrompt(practicePrompt);
    } else {
      setPromptAnalysis({
        rol: { found: false, text: '', score: 0 },
        contexto: { found: false, text: '', score: 0 },
        tarea: { found: false, text: '', score: 0 },
        formato: { found: false, text: '', score: 0 },
        restricciones: { found: false, text: '', score: 0 }
      });
    }
  }, [practicePrompt]);

  // Calcular puntuación total
  const getTotalScore = () => {
    const scores = [
      promptAnalysis.rol.score,
      promptAnalysis.contexto.score,
      promptAnalysis.tarea.score,
      promptAnalysis.formato.score,
      promptAnalysis.restricciones.score
    ];
    return Math.round(scores.reduce((a, b) => a + b, 0) / 5);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#10B981';
    if (score >= 50) return '#F59E0B';
    if (score >= 25) return '#F97316';
    return '#EF4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return '¡Excelente!';
    if (score >= 50) return 'Bueno';
    if (score >= 25) return 'Puede mejorar';
    return 'Necesita trabajo';
  };

  // Componentes auxiliares
  const SectionHeader = ({ icon, title, section }) => (
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
          fontSize: '28px', 
          fontWeight: 600,
          fontFamily: "'Space Grotesk', sans-serif"
        }}>{title}</h2>
      </div>
      <span style={{
        transform: expandedSections.includes(section) ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease',
        fontSize: '20px',
        color: 'rgba(255,255,255,0.5)'
      }}>▼</span>
    </div>
  );

  const TransitionNote = ({ text }) => (
    <div style={{
      marginTop: '32px',
      padding: '16px 24px',
      background: 'rgba(139,92,246,0.1)',
      borderLeft: '4px solid #8B5CF6',
      borderRadius: '8px'
    }}>
      <p style={{
        margin: 0,
        fontSize: '14px',
        fontStyle: 'italic',
        color: 'rgba(255,255,255,0.8)',
        lineHeight: 1.6
      }}>
        💡 {text}
      </p>
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

  const KeyboardHint = () => (
    showKeyboardHint && (
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(10px)',
        padding: '12px 24px',
        borderRadius: '30px',
        border: '1px solid rgba(255,255,255,0.15)',
        zIndex: 999,
        animation: 'fadeIn 0.5s ease-out'
      }}>
        <p style={{ 
          margin: 0, 
          fontSize: '13px', 
          color: 'rgba(255,255,255,0.9)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ opacity: 0.6 }}>Navega con</span>
          <span style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '4px 8px', 
            borderRadius: '4px',
            fontFamily: "'JetBrains Mono', monospace"
          }}>↑</span>
          <span style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '4px 8px', 
            borderRadius: '4px',
            fontFamily: "'JetBrains Mono', monospace"
          }}>↓</span>
          <span style={{ opacity: 0.6 }}>o</span>
          <span style={{ 
            background: 'rgba(255,255,255,0.1)', 
            padding: '4px 8px', 
            borderRadius: '4px',
            fontFamily: "'JetBrains Mono', monospace"
          }}>PgUp/PgDn</span>
        </p>
      </div>
    )
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0118',
      color: '#fff',
      fontFamily: "'Inter', sans-serif",
      position: 'relative',
      overflow: 'hidden'
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
          e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
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
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139,92,246,0.3); }
          50% { box-shadow: 0 0 30px rgba(139,92,246,0.6); }
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
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'pulse 8s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '40%',
          right: '15%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          filter: 'blur(70px)',
          animation: 'pulse 10s ease-in-out infinite 2s'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '20%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
          filter: 'blur(65px)',
          animation: 'pulse 12s ease-in-out infinite 4s'
        }} />
      </div>

      {/* HEADER SECTION */}
      <section 
        id="header" 
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          padding: '40px 24px',
          textAlign: 'center'
        }}
      >
        <div style={{
          fontSize: '80px',
          marginBottom: '24px',
          animation: 'pulse 3s ease-in-out infinite'
        }}>
          ✍️
        </div>
        
        <h1 style={{
          fontSize: '64px',
          fontWeight: 700,
          margin: '0 0 24px 0',
          fontFamily: "'Space Grotesk', sans-serif",
          background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.2
        }}>
          Prompts 101
        </h1>
        
        <p style={{
          fontSize: '24px',
          color: 'rgba(255,255,255,0.8)',
          maxWidth: '800px',
          margin: '0 0 32px 0',
          lineHeight: 1.6
        }}>
          Por qué la mayoría escribe prompts como búsquedas de Google (y por qué eso no funciona)
        </p>
        
        {/* Badges de Complejidad y Tiempo */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          {/* Badge de Complejidad */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(34,197,94,0.15)',
            padding: '8px 16px',
            borderRadius: '20px',
            border: '1px solid rgba(34,197,94,0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{ fontSize: '16px' }}>🌱</span>
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
              Duración: <span style={{ color: '#3B82F6' }}>15-20 min</span>
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
              emoji: '🔮',
              text: '¿Por qué la IA te da respuestas genéricas que podrían servir para cualquiera? Aprende a cambiar eso.',
              gradient: 'linear-gradient(135deg, #4c3d8f 0%, #5b2a6e 100%)'
            },
            {
              emoji: '🧬',
              text: 'Descubre la fórmula de 5 elementos que usan los expertos: Rol + Contexto + Tarea + Formato + Restricciones.',
              gradient: 'linear-gradient(135deg, #8b2a5c 0%, #a33a4a 100%)'
            },
            {
              emoji: '⚡',
              text: 'Ve la diferencia dramática entre un prompt malo y uno bueno con ejemplos reales lado a lado.',
              gradient: 'linear-gradient(135deg, #1e5a7a 0%, #0d6d6e 100%)'
            },
            {
              emoji: '🎯',
              text: 'Practica en tiempo real: escribe tu prompt y mira cómo el sistema te dice qué le falta.',
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
            fontFamily: "'Inter', sans-serif"
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
          Aprender la fórmula →
        </button>
      </section>

      {/* INTRO SECTION */}
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
            background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.1) 100%)',
            borderRadius: '24px',
            padding: '24px 40px',
            marginBottom: '20px',
            border: '1px solid rgba(139,92,246,0.2)'
          }}>
            <SectionHeader icon="❌" title="El Problema" section="intro" />

            {expandedSections.includes('intro') && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                
                {/* Intro Banner */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                  borderRadius: '20px',
                  padding: '40px',
                  marginBottom: '32px',
                  textAlign: 'center',
                  border: '2px solid rgba(255,255,255,0.2)'
                }}>
                  <h3 style={{
                    margin: '0 0 16px 0',
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#fff'
                  }}>
                    "Dame ideas de marketing"
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.7)',
                    lineHeight: 1.6
                  }}>
                    ☝️ Así es como el 90% de las personas usa la IA
                  </p>
                </div>

                {/* El problema explicado */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '24px',
                  marginBottom: '32px'
                }}>
                  <div style={{
                    background: 'rgba(236,72,153,0.1)',
                    borderRadius: '16px',
                    padding: '28px',
                    border: '2px solid rgba(236,72,153,0.2)'
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 600 }}>
                      Mentalidad de Google
                    </h4>
                    <p style={{ margin: 0, fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                      Google busca información que YA existe. La IA CREA información nueva basándose en lo que le digas.
                    </p>
                  </div>

                  <div style={{
                    background: 'rgba(236,72,153,0.1)',
                    borderRadius: '16px',
                    padding: '28px',
                    border: '2px solid rgba(236,72,153,0.2)'
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎲</div>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 600 }}>
                      Resultados Genéricos
                    </h4>
                    <p style={{ margin: 0, fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                      Sin contexto, la IA adivina. Y cuando adivina, te da respuestas que podrían servir para cualquiera (es decir, para nadie).
                    </p>
                  </div>

                  <div style={{
                    background: 'rgba(236,72,153,0.1)',
                    borderRadius: '16px',
                    padding: '28px',
                    border: '2px solid rgba(236,72,153,0.2)'
                  }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏰</div>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 600 }}>
                      Pérdida de Tiempo
                    </h4>
                    <p style={{ margin: 0, fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                      Terminas en un ciclo de "eso no es lo que quería" y vuelves a intentar. Y otra vez. Y otra vez...
                    </p>
                  </div>
                </div>

                {/* Call out */}
                <div style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                  borderRadius: '20px',
                  padding: '32px',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    margin: '0 0 16px 0',
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#fff'
                  }}>
                    La buena noticia
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.95)',
                    lineHeight: 1.6,
                    maxWidth: '700px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}>
                    Existe una fórmula simple para escribir prompts que <strong>SÍ funcionan</strong>. Y lo mejor: una vez que la aprendes, nunca más vuelves a los prompts vagos.
                  </p>
                </div>

              </div>
            )}

            <TransitionNote text={transitionNotes.intro} />
          </div>
        </div>
      </section>

      {/* ANATOMY SECTION */}
      <section 
        id="anatomy" 
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
            <SectionHeader icon="🧬" title="Anatomía de un Prompt Efectivo" section="anatomy" />

            {expandedSections.includes('anatomy') && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                
                {/* Intro Banner */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                  borderRadius: '20px',
                  padding: '32px',
                  marginBottom: '32px',
                  textAlign: 'center',
                  border: '2px solid rgba(255,255,255,0.2)'
                }}>
                  <h3 style={{
                    margin: '0 0 16px 0',
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#fff'
                  }}>
                    5 Elementos Clave
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6
                  }}>
                    Haz clic en cada elemento para ver por qué es importante
                  </p>
                </div>

                {/* Interactive Parts */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '20px',
                  marginBottom: '40px'
                }}>
                  {promptParts.map((part, i) => {
                    const isSelected = selectedPart === part.id;
                    return (
                      <div
                        key={part.id}
                        onClick={() => setSelectedPart(isSelected ? null : part.id)}
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            e.currentTarget.style.transform = 'translateY(0)';
                          }
                        }}
                        style={{
                          background: part.gradient,
                          borderRadius: '20px',
                          padding: '24px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          border: isSelected ? '3px solid rgba(255,255,255,0.6)' : '2px solid rgba(255,255,255,0.2)',
                          transform: isSelected ? 'translateY(-8px)' : 'translateY(0)',
                          boxShadow: isSelected ? '0 20px 40px rgba(0,0,0,0.4)' : '0 10px 20px rgba(0,0,0,0.2)',
                          animation: isSelected ? 'glow 2s ease-in-out infinite' : 'none'
                        }}
                      >
                        <div style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '12px',
                          background: 'rgba(255,255,255,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '28px',
                          marginBottom: '16px',
                          backdropFilter: 'blur(10px)',
                          border: '2px solid rgba(255,255,255,0.3)'
                        }}>
                          {part.icon}
                        </div>
                        
                        <h4 style={{
                          margin: '0 0 8px 0',
                          fontSize: '20px',
                          fontWeight: '700',
                          color: '#fff'
                        }}>
                          {part.name}
                        </h4>
                        
                        <p style={{
                          margin: '0',
                          fontSize: '14px',
                          color: 'rgba(255,255,255,0.9)',
                          lineHeight: 1.5
                        }}>
                          {part.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Part Detail */}
                {selectedPart && (
                  <div style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '20px',
                    padding: '32px',
                    marginBottom: '32px',
                    border: '2px solid rgba(255,255,255,0.2)',
                    animation: 'slideIn 0.4s ease-out'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      marginBottom: '24px'
                    }}>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '12px',
                        background: promptParts.find(p => p.id === selectedPart).gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        border: '2px solid rgba(255,255,255,0.3)'
                      }}>
                        {promptParts.find(p => p.id === selectedPart).icon}
                      </div>
                      <h3 style={{
                        margin: 0,
                        fontSize: '28px',
                        fontWeight: '700'
                      }}>
                        {promptParts.find(p => p.id === selectedPart).name}
                      </h3>
                    </div>

                    <div style={{
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '12px',
                      padding: '20px',
                      marginBottom: '20px',
                      borderLeft: `4px solid ${promptParts.find(p => p.id === selectedPart).color}`
                    }}>
                      <p style={{
                        margin: '0 0 8px 0',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.6)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        Ejemplo:
                      </p>
                      <p style={{
                        margin: 0,
                        fontSize: '16px',
                        color: 'rgba(255,255,255,0.95)',
                        lineHeight: 1.6,
                        fontStyle: 'italic'
                      }}>
                        "{promptParts.find(p => p.id === selectedPart).example}"
                      </p>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px'
                    }}>
                      <div style={{
                        fontSize: '24px',
                        marginTop: '4px'
                      }}>
                        💡
                      </div>
                      <div>
                        <p style={{
                          margin: '0 0 4px 0',
                          fontSize: '14px',
                          fontWeight: 600,
                          color: 'rgba(255,255,255,0.9)'
                        }}>
                          Por qué importa:
                        </p>
                        <p style={{
                          margin: 0,
                          fontSize: '15px',
                          color: 'rgba(255,255,255,0.8)',
                          lineHeight: 1.6
                        }}>
                          {promptParts.find(p => p.id === selectedPart).why}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Formula Visual */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(59,130,246,0.2) 100%)',
                  borderRadius: '20px',
                  padding: '32px',
                  textAlign: 'center',
                  border: '2px solid rgba(139,92,246,0.3)'
                }}>
                  <h3 style={{
                    margin: '0 0 20px 0',
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#fff'
                  }}>
                    La Fórmula
                  </h3>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.95)',
                    fontFamily: "'JetBrains Mono', monospace",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}>
                    <span style={{ color: '#8B5CF6' }}>Rol</span>
                    <span>+</span>
                    <span style={{ color: '#EC4899' }}>Contexto</span>
                    <span>+</span>
                    <span style={{ color: '#3B82F6' }}>Tarea</span>
                    <span>+</span>
                    <span style={{ color: '#F59E0B' }}>Formato</span>
                    <span>+</span>
                    <span style={{ color: '#10B981' }}>Restricciones</span>
                    <span>=</span>
                    <span style={{ color: '#fff', fontSize: '24px' }}>✨ Prompt Perfecto</span>
                  </div>
                </div>

              </div>
            )}

            <TransitionNote text={transitionNotes.anatomy} />
          </div>
        </div>
      </section>

      {/* ERROR #1 SECTION */}
      <section 
        id="error" 
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
            <SectionHeader icon="🚫" title="Error #1: Prompts Sin Contexto" section="error" />

            {expandedSections.includes('error') && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                
                {/* Intro */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(236,72,153,0.2) 0%, rgba(220,38,38,0.2) 100%)',
                  borderRadius: '20px',
                  padding: '32px',
                  marginBottom: '32px',
                  textAlign: 'center',
                  border: '2px solid rgba(236,72,153,0.3)'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '16px' }}>⚠️</div>
                  <h3 style={{
                    margin: '0 0 16px 0',
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#fff'
                  }}>
                    El error más común (y más costoso)
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.9)',
                    lineHeight: 1.6,
                    maxWidth: '700px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}>
                    No darle a la IA el CONTEXTO que necesita para darte una respuesta útil
                  </p>
                </div>

                {/* Ejemplos de prompts malos */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '24px',
                  marginBottom: '32px'
                }}>
                  {badPrompts.map((bad, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '16px',
                        padding: '24px',
                        border: '2px solid rgba(236,72,153,0.3)',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <div style={{
                        background: 'rgba(236,72,153,0.2)',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '16px',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '14px',
                        color: '#fff'
                      }}>
                        "{bad.prompt}"
                      </div>

                      <p style={{
                        margin: '0 0 12px 0',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.7)',
                        textTransform: 'uppercase'
                      }}>
                        ❌ Problemas:
                      </p>

                      <ul style={{
                        margin: '0 0 16px 0',
                        padding: '0 0 0 20px',
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.8)',
                        lineHeight: 1.8
                      }}>
                        {bad.problems.map((problem, j) => (
                          <li key={j}>{problem}</li>
                        ))}
                      </ul>

                      <div style={{
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: '8px',
                        padding: '12px',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.7)',
                        fontStyle: 'italic',
                        borderLeft: '3px solid rgba(236,72,153,0.5)'
                      }}>
                        Respuesta genérica: "{bad.output}"
                      </div>
                    </div>
                  ))}
                </div>

                {/* Call to action */}
                <div style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                  borderRadius: '20px',
                  padding: '32px',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    margin: '0 0 16px 0',
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#fff'
                  }}>
                    La solución es simple
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.95)',
                    lineHeight: 1.6,
                    maxWidth: '700px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}>
                    Dale a la IA toda la información que tú darías a un humano para que hiciera el trabajo perfectamente
                  </p>
                </div>

              </div>
            )}

            <TransitionNote text={transitionNotes.error} />
          </div>
        </div>
      </section>

      {/* CONTEXT SECTION */}
      <section 
        id="context" 
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
            <SectionHeader icon="👑" title="El Contexto es Rey" section="context" />

            {expandedSections.includes('context') && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                
                {/* Intro Banner */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                  borderRadius: '20px',
                  padding: '32px',
                  marginBottom: '32px',
                  textAlign: 'center',
                  border: '2px solid rgba(255,255,255,0.2)'
                }}>
                  <h3 style={{
                    margin: '0 0 16px 0',
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#fff'
                  }}>
                    ¿Qué contexto deberías dar?
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6
                  }}>
                    Piensa: "¿Qué necesitaría saber una persona para hacer esto perfectamente?"
                  </p>
                </div>

                {/* Context categories */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '20px',
                  marginBottom: '32px'
                }}>
                  {[
                    {
                      icon: '🎯',
                      title: 'Tu objetivo',
                      examples: ['¿Qué quieres lograr?', '¿Por qué lo necesitas?', '¿Cuál es el resultado ideal?'],
                      color: '#4c3d8f'
                    },
                    {
                      icon: '👥',
                      title: 'Tu audiencia',
                      examples: ['¿Para quién es?', '¿Qué saben ya?', '¿Qué les importa?'],
                      color: '#8b2a5c'
                    },
                    {
                      icon: '📊',
                      title: 'Tu situación',
                      examples: ['¿Dónde estás ahora?', '¿Qué has probado?', '¿Qué recursos tienes?'],
                      color: '#1e5a7a'
                    },
                    {
                      icon: '🚫',
                      title: 'Tus limitaciones',
                      examples: ['¿Qué NO puedes hacer?', '¿Qué evitar?', '¿Qué restricciones hay?'],
                      color: '#2a5a4a'
                    }
                  ].map((cat, i) => (
                    <div
                      key={i}
                      style={{
                        background: `${cat.color}33`,
                        borderRadius: '16px',
                        padding: '24px',
                        border: `2px solid ${cat.color}66`
                      }}
                    >
                      <div style={{ fontSize: '40px', marginBottom: '12px' }}>{cat.icon}</div>
                      <h4 style={{
                        margin: '0 0 16px 0',
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#fff'
                      }}>
                        {cat.title}
                      </h4>
                      <ul style={{
                        margin: 0,
                        padding: '0 0 0 20px',
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.9)',
                        lineHeight: 1.8
                      }}>
                        {cat.examples.map((ex, j) => (
                          <li key={j}>{ex}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Pro tip */}
                <div style={{
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  borderRadius: '20px',
                  padding: '32px',
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start'
                }}>
                  <div style={{ fontSize: '48px' }}>💡</div>
                  <div>
                    <h3 style={{
                      margin: '0 0 12px 0',
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#fff'
                    }}>
                      Pro Tip
                    </h3>
                    <p style={{
                      margin: 0,
                      fontSize: '16px',
                      color: 'rgba(255,255,255,0.95)',
                      lineHeight: 1.7
                    }}>
                      Imagina que le estás pidiendo esto a un <strong>freelancer experto</strong> que nunca ha trabajado contigo. ¿Qué le dirías en el brief? Eso mismo dile a la IA.
                    </p>
                  </div>
                </div>

              </div>
            )}

            <TransitionNote text={transitionNotes.context} />
          </div>
        </div>
      </section>

      {/* COMPARISON SECTION */}
      <section 
        id="comparison" 
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
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.1) 100%)',
            borderRadius: '24px',
            padding: '24px 40px',
            marginBottom: '20px',
            border: '1px solid rgba(139,92,246,0.2)'
          }}>
            <SectionHeader icon="⚔️" title="Malo vs Bueno: Comparación Real" section="comparison" />

            {expandedSections.includes('comparison') && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                
                {/* Intro Banner */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                  borderRadius: '20px',
                  padding: '32px',
                  marginBottom: '32px',
                  textAlign: 'center',
                  border: '2px solid rgba(255,255,255,0.2)'
                }}>
                  <h3 style={{
                    margin: '0 0 16px 0',
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#fff'
                  }}>
                    La Diferencia es Dramática
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6
                  }}>
                    Mismo objetivo, resultados completamente diferentes
                  </p>
                </div>

                {/* Side by side comparison */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth > 900 ? '1fr 1fr' : '1fr',
                  gap: '24px',
                  marginBottom: '32px'
                }}>
                  {/* BAD PROMPT */}
                  <div style={{
                    background: 'rgba(236,72,153,0.1)',
                    borderRadius: '20px',
                    padding: '28px',
                    border: '3px solid rgba(236,72,153,0.3)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '20px'
                    }}>
                      <div style={{ fontSize: '32px' }}>❌</div>
                      <h4 style={{
                        margin: 0,
                        fontSize: '24px',
                        fontWeight: 700,
                        color: '#EC4899'
                      }}>
                        Prompt Malo
                      </h4>
                    </div>

                    <div style={{
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '12px',
                      padding: '20px',
                      marginBottom: '20px',
                      borderLeft: '4px solid #EC4899'
                    }}>
                      <p style={{
                        margin: 0,
                        fontSize: '16px',
                        fontFamily: "'JetBrains Mono', monospace",
                        color: 'rgba(255,255,255,0.95)',
                        lineHeight: 1.6
                      }}>
                        "Dame ideas de contenido para Instagram"
                      </p>
                    </div>

                    <p style={{
                      margin: '0 0 12px 0',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.7)',
                      textTransform: 'uppercase'
                    }}>
                      Resultado:
                    </p>

                    <div style={{
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '12px',
                      padding: '16px',
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.8)',
                      lineHeight: 1.7
                    }}>
                      <p style={{ margin: '0 0 8px 0' }}>"Aquí hay algunas ideas para Instagram:</p>
                      <ol style={{ margin: '0 0 0 20px', padding: 0 }}>
                        <li>Publica fotos de productos</li>
                        <li>Comparte testimonios</li>
                        <li>Usa stories</li>
                        <li>Haz sorteos</li>
                        <li>Publica memes relacionados..."</li>
                      </ol>
                    </div>

                    <div style={{
                      marginTop: '16px',
                      padding: '12px',
                      background: 'rgba(236,72,153,0.2)',
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.9)'
                    }}>
                      😕 Genérico. Podría ser para cualquier negocio.
                    </div>
                  </div>

                  {/* GOOD PROMPT */}
                  <div style={{
                    background: 'rgba(16,185,129,0.1)',
                    borderRadius: '20px',
                    padding: '28px',
                    border: '3px solid rgba(16,185,129,0.3)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '20px'
                    }}>
                      <div style={{ fontSize: '32px' }}>✅</div>
                      <h4 style={{
                        margin: 0,
                        fontSize: '24px',
                        fontWeight: 700,
                        color: '#10B981'
                      }}>
                        Prompt Bueno
                      </h4>
                    </div>

                    <div style={{
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '12px',
                      padding: '20px',
                      marginBottom: '20px',
                      borderLeft: '4px solid #10B981',
                      maxHeight: '300px',
                      overflowY: 'auto'
                    }}>
                      <p style={{
                        margin: 0,
                        fontSize: '14px',
                        fontFamily: "'JetBrains Mono', monospace",
                        color: 'rgba(255,255,255,0.95)',
                        lineHeight: 1.8
                      }}>
                        <span style={{ color: '#8B5CF6', fontWeight: 600 }}>ROL:</span> {goodPrompt.rol}
                        <br /><br />
                        <span style={{ color: '#EC4899', fontWeight: 600 }}>CONTEXTO:</span> {goodPrompt.contexto}
                        <br /><br />
                        <span style={{ color: '#3B82F6', fontWeight: 600 }}>TAREA:</span> {goodPrompt.tarea}
                        <br /><br />
                        <span style={{ color: '#F59E0B', fontWeight: 600 }}>FORMATO:</span> {goodPrompt.formato}
                        <br /><br />
                        <span style={{ color: '#10B981', fontWeight: 600 }}>RESTRICCIONES:</span> {goodPrompt.restricciones}
                      </p>
                    </div>

                    <p style={{
                      margin: '0 0 12px 0',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.7)',
                      textTransform: 'uppercase'
                    }}>
                      Resultado:
                    </p>

                    <div style={{
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: '12px',
                      padding: '16px',
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.8)',
                      lineHeight: 1.7,
                      maxHeight: '250px',
                      overflowY: 'auto'
                    }}>
                      <p style={{ margin: '0 0 8px 0', fontWeight: 600 }}>Ideas específicas para tu tienda streetwear:</p>
                      <p style={{ margin: '8px 0', padding: '8px', background: 'rgba(16,185,129,0.1)', borderRadius: '6px' }}>
                        <strong>1. "Outfit of the Week" Challenge</strong><br />
                        <span style={{ fontSize: '13px' }}>Copy: "¿Cómo combinarías estas piezas? 🔥 Comenta tu fit favorito 👇"</span><br />
                        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Por qué: Genera conversación, muestra productos en acción, tu audiencia ama participar</span>
                      </p>
                      <p style={{ margin: '8px 0', padding: '8px', background: 'rgba(16,185,129,0.1)', borderRadius: '6px' }}>
                        <strong>2. "Behind the Drop" Stories</strong><br />
                        <span style={{ fontSize: '13px' }}>Copy: "Así llegaron las nuevas piezas desde el warehouse 📦 ¿Cuál quieres ver primero?"</span><br />
                        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Por qué: Crea anticipación, humaniza tu marca, genera hype para lanzamientos</span>
                      </p>
                      <p style={{ fontSize: '13px', fontStyle: 'italic', marginTop: '8px' }}>...+ 3 ideas más específicas</p>
                    </div>

                    <div style={{
                      marginTop: '16px',
                      padding: '12px',
                      background: 'rgba(16,185,129,0.2)',
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.9)'
                    }}>
                      🎯 Específico, accionable, y perfecto para TU negocio.
                    </div>
                  </div>
                </div>

                {/* Impact summary */}
                <div style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
                  borderRadius: '20px',
                  padding: '40px',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    margin: '0 0 24px 0',
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#fff'
                  }}>
                    El Impacto
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '24px',
                    maxWidth: '900px',
                    margin: '0 auto'
                  }}>
                    {[
                      { stat: '10x', label: 'Más específico' },
                      { stat: '5x', label: 'Más útil' },
                      { stat: '100%', label: 'Accionable' },
                      { stat: '0', label: 'Vueltas extra' }
                    ].map((item, i) => (
                      <div key={i}>
                        <div style={{
                          fontSize: '48px',
                          fontWeight: 800,
                          color: '#fff',
                          marginBottom: '8px'
                        }}>
                          {item.stat}
                        </div>
                        <div style={{
                          fontSize: '16px',
                          color: 'rgba(255,255,255,0.9)'
                        }}>
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            <TransitionNote text={transitionNotes.comparison} />
          </div>
        </div>
      </section>

      {/* PRACTICE SECTION */}
      <section 
        id="practice" 
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
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.1) 100%)',
            borderRadius: '24px',
            padding: '24px 40px',
            marginBottom: '20px',
            border: '1px solid rgba(139,92,246,0.2)'
          }}>
            <SectionHeader icon="🎯" title="Practica tu Prompt" section="practice" />

            {expandedSections.includes('practice') && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                
                {/* Intro Banner */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                  borderRadius: '20px',
                  padding: '32px',
                  marginBottom: '32px',
                  textAlign: 'center',
                  border: '2px solid rgba(255,255,255,0.2)'
                }}>
                  <h3 style={{
                    margin: '0 0 16px 0',
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#fff'
                  }}>
                    Escribe tu Prompt y Ve el Análisis en Tiempo Real
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6
                  }}>
                    El sistema detecta automáticamente qué elementos incluye tu prompt
                  </p>
                </div>

                {/* Main Practice Area */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth > 1000 ? '1.2fr 1fr' : '1fr',
                  gap: '32px'
                }}>
                  {/* Left: Input Area */}
                  <div>
                    <div style={{
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '20px',
                      padding: '24px',
                      border: '2px solid rgba(255,255,255,0.1)'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '16px'
                      }}>
                        <h4 style={{
                          margin: 0,
                          fontSize: '18px',
                          fontWeight: 600,
                          color: '#fff'
                        }}>
                          Tu Prompt
                        </h4>
                        <div style={{
                          background: `${getScoreColor(getTotalScore())}22`,
                          border: `2px solid ${getScoreColor(getTotalScore())}`,
                          borderRadius: '20px',
                          padding: '8px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span style={{
                            fontSize: '24px',
                            fontWeight: 800,
                            color: getScoreColor(getTotalScore())
                          }}>
                            {getTotalScore()}%
                          </span>
                          <span style={{
                            fontSize: '13px',
                            color: 'rgba(255,255,255,0.8)',
                            fontWeight: 600
                          }}>
                            {getScoreLabel(getTotalScore())}
                          </span>
                        </div>
                      </div>

                      <textarea
                        value={practicePrompt}
                        onChange={(e) => setPracticePrompt(e.target.value)}
                        placeholder="Escribe tu prompt aquí... Por ejemplo: 'Eres un experto en marketing digital. Tengo una tienda online de ropa. Crea 5 ideas de posts para Instagram. En formato de lista numerada. No uses jerga técnica.'"
                        style={{
                          width: '100%',
                          minHeight: '250px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '2px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          padding: '20px',
                          color: '#fff',
                          fontSize: '16px',
                          fontFamily: "'Inter', sans-serif",
                          lineHeight: 1.7,
                          resize: 'vertical',
                          outline: 'none',
                          transition: 'border-color 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'rgba(139,92,246,0.5)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                        }}
                      />

                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '16px'
                      }}>
                        <span style={{
                          fontSize: '13px',
                          color: 'rgba(255,255,255,0.5)'
                        }}>
                          {practicePrompt.length} caracteres
                        </span>
                        <button
                          onClick={() => setPracticePrompt('')}
                          style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            color: '#fff',
                            fontSize: '13px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(255,255,255,0.2)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255,255,255,0.1)';
                          }}
                        >
                          Limpiar
                        </button>
                      </div>
                    </div>

                    {/* Quick Examples */}
                    <div style={{ marginTop: '24px' }}>
                      <p style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.6)',
                        fontWeight: 600
                      }}>
                        Prueba con estos ejemplos:
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        <button
                          onClick={() => setPracticePrompt('Hazme un resumen')}
                          style={{
                            background: 'rgba(236,72,153,0.2)',
                            border: '1px solid rgba(236,72,153,0.3)',
                            borderRadius: '20px',
                            padding: '8px 16px',
                            color: '#EC4899',
                            fontSize: '13px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          ❌ Prompt malo
                        </button>
                        <button
                          onClick={() => setPracticePrompt('Eres un consultor de marketing digital especializado en e-commerce de moda para millennials.\n\nTengo una tienda online de ropa streetwear dirigida a hombres jóvenes en México. Actualmente tengo 5,000 seguidores en Instagram pero mi engagement está bajo.\n\nNecesito que me generes 5 ideas de contenido para Instagram que ayuden a mejorar mi engagement con mi audiencia target.\n\nResponde en formato de lista numerada con máximo 3 secciones por idea. Incluye el tipo de post y un ejemplo de copy.\n\nEvita sugerir colaboraciones pagadas. No uses jerga muy técnica. Mantén un tono casual y urbano acorde a la marca streetwear.')}
                          style={{
                            background: 'rgba(16,185,129,0.2)',
                            border: '1px solid rgba(16,185,129,0.3)',
                            borderRadius: '20px',
                            padding: '8px 16px',
                            color: '#10B981',
                            fontSize: '13px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          ✅ Prompt completo
                        </button>
                        <button
                          onClick={() => setPracticePrompt('Tengo una tienda de ropa online y mi audiencia son jóvenes de 20-30 años.\n\nCrea 5 ideas de posts para Instagram que generen más engagement.\n\nResponde en formato de lista con bullet points.')}
                          style={{
                            background: 'rgba(249,115,22,0.2)',
                            border: '1px solid rgba(249,115,22,0.3)',
                            borderRadius: '20px',
                            padding: '8px 16px',
                            color: '#F97316',
                            fontSize: '13px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          😐 Prompt incompleto
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Analysis Panel */}
                  <div>
                    <div style={{
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '20px',
                      padding: '24px',
                      border: '2px solid rgba(255,255,255,0.1)'
                    }}>
                      <h4 style={{
                        margin: '0 0 20px 0',
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#fff'
                      }}>
                        Análisis del Prompt
                      </h4>

                      {/* Analysis Items */}
                      {promptParts.map((part) => {
                        const analysis = promptAnalysis[part.id];
                        const isFound = analysis.score > 0;
                        
                        return (
                          <div
                            key={part.id}
                            style={{
                              background: isFound 
                                ? `${part.color}33`
                                : 'rgba(255,255,255,0.03)',
                              borderRadius: '12px',
                              padding: '16px',
                              marginBottom: '12px',
                              border: `2px solid ${isFound ? part.color : 'rgba(255,255,255,0.1)'}`,
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginBottom: '8px'
                            }}>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px'
                              }}>
                                <span style={{ fontSize: '24px' }}>{part.icon}</span>
                                <span style={{
                                  fontSize: '16px',
                                  fontWeight: 600,
                                  color: isFound ? '#fff' : 'rgba(255,255,255,0.5)'
                                }}>
                                  {part.name}
                                </span>
                              </div>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                              }}>
                                <span style={{
                                  fontSize: '24px'
                                }}>
                                  {isFound ? '✅' : '❌'}
                                </span>
                              </div>
                            </div>
                            
                            {/* Progress bar */}
                            <div style={{
                              height: '6px',
                              background: 'rgba(255,255,255,0.1)',
                              borderRadius: '3px',
                              overflow: 'hidden'
                            }}>
                              <div style={{
                                height: '100%',
                                width: `${analysis.score}%`,
                                background: part.gradient,
                                borderRadius: '3px',
                                transition: 'width 0.5s ease'
                              }} />
                            </div>

                            {/* Hint when not found */}
                            {!isFound && (
                              <p style={{
                                margin: '8px 0 0 0',
                                fontSize: '12px',
                                color: 'rgba(255,255,255,0.5)',
                                fontStyle: 'italic'
                              }}>
                                💡 {part.description}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Overall Score Card */}
                    <div style={{
                      marginTop: '24px',
                      background: practicePrompt.length > 0 
                        ? `linear-gradient(135deg, ${getScoreColor(getTotalScore())}22 0%, ${getScoreColor(getTotalScore())}11 100%)`
                        : 'rgba(255,255,255,0.05)',
                      borderRadius: '20px',
                      padding: '24px',
                      border: `2px solid ${practicePrompt.length > 0 ? getScoreColor(getTotalScore()) : 'rgba(255,255,255,0.1)'}`,
                      textAlign: 'center',
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{
                        fontSize: '48px',
                        fontWeight: 800,
                        color: practicePrompt.length > 0 ? getScoreColor(getTotalScore()) : 'rgba(255,255,255,0.3)',
                        marginBottom: '8px'
                      }}>
                        {getTotalScore()}%
                      </div>
                      <p style={{
                        margin: 0,
                        fontSize: '16px',
                        color: practicePrompt.length > 0 ? '#fff' : 'rgba(255,255,255,0.5)',
                        fontWeight: 600
                      }}>
                        {practicePrompt.length > 0 
                          ? getScoreLabel(getTotalScore())
                          : 'Escribe algo para comenzar'
                        }
                      </p>
                      {practicePrompt.length > 0 && getTotalScore() < 80 && (
                        <p style={{
                          margin: '12px 0 0 0',
                          fontSize: '13px',
                          color: 'rgba(255,255,255,0.7)',
                          lineHeight: 1.5
                        }}>
                          Intenta agregar: {
                            [
                              !promptAnalysis.rol.found && 'Rol (ej: "Eres un experto...")',
                              !promptAnalysis.contexto.found && 'Contexto (tu situación)',
                              !promptAnalysis.tarea.found && 'Tarea clara (qué quieres)',
                              !promptAnalysis.formato.found && 'Formato de respuesta',
                              !promptAnalysis.restricciones.found && 'Restricciones'
                            ].filter(Boolean).slice(0, 2).join(', ')
                          }
                        </p>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            )}

            <TransitionNote text={transitionNotes.practice} />
          </div>
        </div>
      </section>

      {/* PLAYGROUND SECTION - Google AI Studio */}
      <section 
        id="playground" 
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
        <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.1) 100%)',
            borderRadius: '24px',
            padding: '24px 40px',
            marginBottom: '20px',
            border: '1px solid rgba(139,92,246,0.2)'
          }}>
            <SectionHeader icon="🚀" title="AI Playground" section="playground" />

            {expandedSections.includes('playground') && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                
                {/* Intro Banner */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(66,133,244,0.2) 0%, rgba(139,92,246,0.2) 100%)',
                  borderRadius: '20px',
                  padding: '32px',
                  marginBottom: '32px',
                  textAlign: 'center',
                  border: '2px solid rgba(66,133,244,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '20px',
                  flexWrap: 'wrap'
                }}>
                  <div style={{ fontSize: '48px' }}>
                    <img 
                      src="https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" 
                      alt="Gemini"
                      style={{ width: '48px', height: '48px' }}
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                    />
                    <span style={{ display: 'none' }}>🤖</span>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <h3 style={{
                      margin: '0 0 8px 0',
                      fontSize: '28px',
                      fontWeight: '700',
                      color: '#fff'
                    }}>
                      Prueba tus Prompts en Tiempo Real
                    </h3>
                    <p style={{
                      margin: 0,
                      fontSize: '16px',
                      color: 'rgba(255,255,255,0.8)',
                      lineHeight: 1.6
                    }}>
                      Usa Gemini para probar los prompts que aprendiste
                    </p>
                  </div>
                </div>

                {/* iframe Container */}
                <div style={{
                  background: 'rgba(0,0,0,0.4)',
                  borderRadius: '20px',
                  padding: '4px',
                  border: '2px solid rgba(255,255,255,0.1)',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
                }}>
                  <PromptAlchemy />
                </div>

                {/* Tips for using */}
                <div style={{
                  marginTop: '24px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '16px'
                }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>💡</div>
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.8)',
                      lineHeight: 1.6
                    }}>
                      <strong>Tip:</strong> Aplica la fórmula que aprendiste: Rol + Contexto + Tarea + Formato + Restricciones
                    </p>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔄</div>
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.8)',
                      lineHeight: 1.6
                    }}>
                      <strong>Itera:</strong> Si no te gusta la respuesta, ajusta tu prompt y vuelve a intentar
                    </p>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>📝</div>
                    <p style={{
                      margin: 0,
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.8)',
                      lineHeight: 1.6
                    }}>
                      <strong>Guarda:</strong> Cuando tengas un prompt que funciona, guárdalo como plantilla
                    </p>
                  </div>
                </div>

              </div>
            )}

            <TransitionNote text={transitionNotes.playground} />
          </div>
        </div>
      </section>

      {/* TIPS SECTION */}
      <section 
        id="tips" 
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
            <SectionHeader icon="💫" title="Tips Prácticos" section="tips" />

            {expandedSections.includes('tips') && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                
                {/* Intro Banner */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                  borderRadius: '20px',
                  padding: '32px',
                  marginBottom: '32px',
                  textAlign: 'center',
                  border: '2px solid rgba(255,255,255,0.2)'
                }}>
                  <h3 style={{
                    margin: '0 0 16px 0',
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#fff'
                  }}>
                    Para Empezar Hoy Mismo
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6
                  }}>
                    Tips que puedes aplicar inmediatamente
                  </p>
                </div>

                {/* Quick tips */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '20px',
                  marginBottom: '32px'
                }}>
                  {[
                    {
                      icon: '📝',
                      title: 'Guarda tus plantillas',
                      tip: 'Una vez que tengas un prompt que funciona, guárdalo como plantilla y solo cambia los detalles específicos.',
                      gradient: 'linear-gradient(135deg, #4c3d8f 0%, #5b2a6e 100%)'
                    },
                    {
                      icon: '🔄',
                      title: 'Itera sin miedo',
                      tip: 'Si la primera respuesta no es perfecta, pídele que ajuste. "Hazlo más casual" o "Enfócate más en X".',
                      gradient: 'linear-gradient(135deg, #8b2a5c 0%, #a33a4a 100%)'
                    },
                    {
                      icon: '🎯',
                      title: 'Sé súper específico',
                      tip: 'Entre más detalles, mejor. "Como si" y "en estilo de" son tus amigos. "Escribe como si fueras Steve Jobs presentando un producto".',
                      gradient: 'linear-gradient(135deg, #1e5a7a 0%, #0d6d6e 100%)'
                    },
                    {
                      icon: '📊',
                      title: 'Pide ejemplos',
                      tip: 'No solo pidas la solución final. Pide "3 opciones diferentes" o "variaciones con distintos tonos". Más opciones = mejor resultado.',
                      gradient: 'linear-gradient(135deg, #9c4a5b 0%, #b85a2a 100%)'
                    },
                    {
                      icon: '🧪',
                      title: 'Experimenta con roles',
                      tip: 'Cambiar el rol puede cambiar completamente el resultado. Prueba "experto", "profesor", "consultor", "crítico", etc.',
                      gradient: 'linear-gradient(135deg, #2a5a4a 0%, #3d6b5a 100%)'
                    },
                    {
                      icon: '⚡',
                      title: 'Usa "paso a paso"',
                      tip: 'Para tareas complejas, pide "explica paso a paso" o "divide esto en subtareas". La IA es mejor siguiendo un proceso.',
                      gradient: 'linear-gradient(135deg, #6b4a2a 0%, #8b5a3a 100%)'
                    }
                  ].map((tip, i) => (
                    <div
                      key={i}
                      style={{
                        background: tip.gradient,
                        borderRadius: '20px',
                        padding: '28px',
                        border: '2px solid rgba(255,255,255,0.2)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{
                        fontSize: '48px',
                        marginBottom: '16px'
                      }}>
                        {tip.icon}
                      </div>
                      <h4 style={{
                        margin: '0 0 12px 0',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#fff'
                      }}>
                        {tip.title}
                      </h4>
                      <p style={{
                        margin: 0,
                        fontSize: '15px',
                        color: 'rgba(255,255,255,0.95)',
                        lineHeight: 1.7
                      }}>
                        {tip.tip}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Final message */}
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '32px',
                  padding: '48px',
                  textAlign: 'center',
                  border: '3px solid rgba(255,255,255,0.3)',
                  boxShadow: '0 20px 60px rgba(102,126,234,0.4)'
                }}>
                  <div style={{ fontSize: '64px', marginBottom: '24px' }}>🚀</div>
                  <h3 style={{
                    margin: '0 0 20px 0',
                    fontSize: '36px',
                    fontWeight: '800',
                    color: '#fff'
                  }}>
                    Ahora es tu turno
                  </h3>
                  <p style={{
                    margin: '0 auto 32px auto',
                    fontSize: '20px',
                    color: 'rgba(255,255,255,0.95)',
                    lineHeight: 1.7,
                    maxWidth: '800px'
                  }}>
                    La diferencia entre prompts malos y buenos es simplemente <strong>darle contexto</strong> a la IA. Ahora que sabes la fórmula, nunca más vas a recibir respuestas genéricas.
                  </p>
                  <div style={{
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '16px',
                    padding: '24px',
                    fontSize: '18px',
                    fontFamily: "'JetBrains Mono', monospace",
                    color: '#fff',
                    fontWeight: 600,
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255,255,255,0.3)'
                  }}>
                    Rol + Contexto + Tarea + Formato + Restricciones = ✨ Magia
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </section>
      
    </div>
  );
};

export default Prompts101;
