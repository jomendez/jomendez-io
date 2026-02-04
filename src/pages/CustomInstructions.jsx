import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomInstructions = () => {
  const navigate = useNavigate();
  
  // Estados esenciales
  const [currentSection, setCurrentSection] = useState(0);
  const [expandedSections, setExpandedSections] = useState(['intro', 'gpts', 'projects', 'comparison', 'framework', 'examples', 'monetization', 'demo']);
  const [showKeyboardHint, setShowKeyboardHint] = useState(true);
  
  // Estados para demos interactivos
  const [highlightedTool, setHighlightedTool] = useState(null);
  const [currentDimension, setCurrentDimension] = useState(0);
  const [answers, setAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);
  const [activeCategory, setActiveCategory] = useState('dinero');
  const [viabilityAnswers, setViabilityAnswers] = useState({});
  const [businessProfile, setBusinessProfile] = useState({
    industria: '',
    audiencia: '',
    problemasPrincipales: '',
    tono: '',
    restricciones: ''
  });
  const [generatedInstructions, setGeneratedInstructions] = useState('');
  const [activeInstructionTab, setActiveInstructionTab] = useState('gpt');
  const [copied, setCopied] = useState(false);
  
  // Define secciones
  const sections = ['header', 'intro', 'gpts', 'projects', 'comparison', 'framework', 'examples', 'monetization', 'demo'];
  
  const sectionNames = {
    header: 'Inicio',
    intro: 'Por Qué Importa',
    gpts: 'Custom GPTs',
    projects: 'Claude Projects',
    comparison: 'GPT vs Project',
    framework: 'Cómo Decidir',
    examples: 'Ejemplos Reales',
    monetization: 'Monetización',
    demo: 'Práctica'
  };
  
  const transitionNotes = {
    header: "Primero, entendamos por qué necesitas que la IA conozca tu negocio...",
    intro: "Veamos la primera herramienta: los Custom GPTs de ChatGPT...",
    gpts: "Ahora exploremos los Projects de Claude, un enfoque diferente...",
    projects: "Con ambas herramientas claras, comparémoslas directamente...",
    comparison: "Necesitas un framework para decidir cuál usar en cada caso...",
    framework: "Veamos ejemplos reales de GPTs que la gente usa y paga...",
    examples: "Ahora, cómo convertir un GPT en producto o lead magnet...",
    monetization: "Finalmente, vamos a configurar instrucciones para tu negocio..."
  };

  // Gradientes para cards (de spec.md)
  const cardGradients = {
    purple: 'linear-gradient(135deg, #4c3d8f 0%, #5b2a6e 100%)',
    magenta: 'linear-gradient(135deg, #8b2a5c 0%, #a33a4a 100%)',
    teal: 'linear-gradient(135deg, #1e5a7a 0%, #0d6d6e 100%)',
    terracotta: 'linear-gradient(135deg, #9c4a5b 0%, #b85a2a 100%)',
    forest: 'linear-gradient(135deg, #2a5a4a 0%, #3d6b5a 100%)',
    copper: 'linear-gradient(135deg, #6b4a2a 0%, #8b5a3a 100%)',
  };

  // Colores de marca
  const brandColors = {
    openai: '#10A37F',
    anthropic: '#D97706',
  };

  // Datos para ejemplos de GPTs por categoría
  const gptCategories = {
    dinero: {
      icon: '💸',
      name: 'Dinero / Carrera',
      examples: [
        'Resume & Cover Letter Optimizer',
        'LinkedIn Profile Rewriter',
        'Salary Negotiation Coach',
        'ATS Scanner'
      ],
      whyPay: 'Mejoran probabilidades reales, ahorran horas, evitan errores caros',
      pricing: '$5–$29 one-time / $10–$20 mensual'
    },
    marketing: {
      icon: '📈',
      name: 'Marketing & Ventas',
      examples: [
        'Landing Page Copywriter',
        'Email Cold Outreach Generator',
        'Ad Copy for Meta / Google',
        'Hook Generator para Reels'
      ],
      whyPay: 'Cada mejora = más ventas, reemplaza freelancers caros',
      pricing: '$19–$49 mensual'
    },
    creators: {
      icon: '🎨',
      name: 'Creators / Social Media',
      examples: [
        'Viral Hook Generator',
        'YouTube Script Writer',
        'TikTok Content Planner',
        'Carousel Content Generator'
      ],
      whyPay: 'Bloqueo creativo, necesitan volumen, consistencia de estilo',
      pricing: '$9–$29 mensual'
    },
    startups: {
      icon: '🚀',
      name: 'Startups / Indie Hackers',
      examples: [
        'Startup Idea Validator',
        'MVP Scope Generator',
        'SaaS Pricing Strategist',
        'Product Hunt Launch Assistant'
      ],
      whyPay: 'Evita construir basura, ahorra semanas, reduce riesgo',
      pricing: '$19–$49 one-time'
    },
    legal: {
      icon: '⚖️',
      name: 'Legal / Compliance',
      examples: [
        'LLC Setup Assistant',
        'Contract Analyzer',
        'Privacy Policy Generator',
        'Business Compliance Checklist'
      ],
      whyPay: 'Alto valor percibido, evita errores legales costosos',
      pricing: '$29–$99 one-time'
    },
    productividad: {
      icon: '📋',
      name: 'Productividad',
      examples: [
        'Notion Workspace Builder',
        'SOP Generator',
        'Meeting Notes → Action Items',
        'Weekly Planning Assistant'
      ],
      whyPay: 'Menos fricción mental, uso diario, se integra a workflows',
      pricing: '$10–$20 mensual'
    },
    educacion: {
      icon: '📚',
      name: 'Educación',
      examples: [
        'Learn X in 30 Days',
        'Study Plan Generator',
        'Explain Like I\'m 12',
        'Flashcards Generator'
      ],
      whyPay: 'Explícamelo con mis datos, aprendizaje personalizado',
      pricing: '$5–$15'
    }
  };

  // Dimensiones del framework
  const dimensions = [
    {
      id: 'naturaleza',
      title: 'Naturaleza del trabajo',
      icon: '🎯',
      question: '¿Qué tipo de trabajo es?',
      options: [
        { label: 'Siempre del mismo tipo, preguntas similares', value: 'gpt' },
        { label: 'Evoluciona, hay decisiones encadenadas', value: 'project' }
      ]
    },
    {
      id: 'repeticion',
      title: 'Repetición vs Exploración',
      icon: '🔄',
      question: '¿Con qué frecuencia harás esto?',
      options: [
        { label: 'Muchas veces, mismo tipo de input/output', value: 'gpt' },
        { label: 'El input cambia cada día, estoy descubriendo', value: 'project' }
      ]
    },
    {
      id: 'memoria',
      title: 'Memoria necesaria',
      icon: '🧠',
      question: '¿Necesitas que recuerde decisiones pasadas?',
      options: [
        { label: 'No, cada conversación puede empezar en frío', value: 'gpt' },
        { label: 'Sí, las decisiones de hoy dependen de ayer', value: 'project' }
      ]
    },
    {
      id: 'producto',
      title: 'Producto vs Workspace',
      icon: '📦',
      question: '¿Esto podría convertirse en algo que otros usen?',
      options: [
        { label: 'Sí, lo puedo compartir o vender', value: 'gpt' },
        { label: 'No, vive solo para mí', value: 'project' }
      ]
    },
    {
      id: 'tiempo',
      title: 'Tiempo de vida',
      icon: '⏱️',
      question: '¿Cuánto tiempo durará este trabajo?',
      options: [
        { label: 'Minutos o sesiones repetidas', value: 'gpt' },
        { label: 'Días o semanas de trabajo continuo', value: 'project' }
      ]
    }
  ];

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

  // Calcular recomendación del framework
  const calculateRecommendation = () => {
    const values = Object.values(answers);
    const gptCount = values.filter(v => v === 'gpt').length;
    const projectCount = values.filter(v => v === 'project').length;
    const total = gptCount + projectCount;
    
    if (total === 0) return null;
    
    const gptPercentage = Math.round((gptCount / total) * 100);
    const projectPercentage = 100 - gptPercentage;
    
    return {
      recommendation: gptPercentage >= 50 ? 'gpt' : 'project',
      gptPercentage,
      projectPercentage
    };
  };

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      setRecommendation(calculateRecommendation());
    }
  }, [answers]);

  // Generar instrucciones personalizadas
  const generateInstructions = () => {
    const { industria, audiencia, problemasPrincipales, tono, restricciones } = businessProfile;
    
    if (!industria || !audiencia || !problemasPrincipales) {
      return;
    }

    const gptInstructions = `# Custom GPT Instructions

## Rol
Eres un experto consultor especializado en ${industria}. Tu audiencia principal son ${audiencia}.

## Contexto
Ayudas a resolver los siguientes problemas:
${problemasPrincipales}

## Tono y Estilo
${tono || 'Profesional pero accesible, claro y directo.'}

## Restricciones
${restricciones || 'Evita jerga técnica innecesaria. Sé conciso y práctico.'}

## Formato de Respuestas
- Usa listas cuando sea apropiado
- Incluye ejemplos prácticos
- Ofrece pasos accionables`;

    const claudeInstructions = `# Claude Project Instructions

## Sobre Este Proyecto
Este es un espacio de trabajo para ${industria}, enfocado en ${audiencia}.

## Objetivos del Proyecto
${problemasPrincipales}

## Cómo Quiero Que Respondas
- Tono: ${tono || 'Profesional pero accesible'}
- ${restricciones || 'Evita jerga técnica innecesaria'}
- Recuerda decisiones y contexto de conversaciones anteriores
- Mantén consistencia a lo largo del proyecto

## Archivos de Contexto
[Sube aquí documentos relevantes sobre tu negocio, audiencia, o proyectos anteriores]`;

    setGeneratedInstructions(activeInstructionTab === 'gpt' ? gptInstructions : claudeInstructions);
  };

  useEffect(() => {
    if (businessProfile.industria || businessProfile.audiencia || businessProfile.problemasPrincipales) {
      generateInstructions();
    }
  }, [businessProfile, activeInstructionTab]);

  // Copiar al clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedInstructions);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Calcular viabilidad
  const calculateViability = () => {
    const yesCount = Object.values(viabilityAnswers).filter(v => v === true).length;
    return yesCount;
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
        background: 'linear-gradient(90deg, #10B981, #3B82F6)',
        transition: 'width 0.5s ease',
        boxShadow: '0 0 10px rgba(16,185,129,0.5)'
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
              background: currentSection === index ? '#10B981' : 'rgba(255,255,255,0.3)',
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16,185,129,0.3); }
          50% { box-shadow: 0 0 30px rgba(16,185,129,0.6); }
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
          background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(217,119,6,0.1) 0%, transparent 70%)',
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
          🧠
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
          Custom Instructions
        </h1>
        
        <p style={{
          fontSize: '24px',
          color: 'rgba(255,255,255,0.8)',
          maxWidth: '800px',
          margin: '0 0 32px 0',
          lineHeight: 1.6
        }}>
          Tu IA Que Conoce Tu Negocio
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
              emoji: '🎯',
              text: 'Claude tiene "Projects", ChatGPT tiene "Custom GPTs" y memoria. Aprende a usarlos para tu negocio.',
              gradient: cardGradients.purple
            },
            {
              emoji: '🔧',
              text: 'Crea un "perfil de negocio" que la IA recuerde siempre. No más explicar contexto cada vez.',
              gradient: cardGradients.magenta
            },
            {
              emoji: '⚡',
              text: 'Descubre cuándo usar GPTs (expertos) vs Projects (procesos). Framework de decisión incluido.',
              gradient: cardGradients.teal
            },
            {
              emoji: '💰',
              text: 'Ve ejemplos reales de GPTs que la gente paga. Aprende a convertirlos en productos.',
              gradient: cardGradients.forest
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
            background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
            border: 'none',
            borderRadius: '12px',
            color: '#fff',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: "'Inter', sans-serif"
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 10px 30px rgba(16,185,129,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Comenzar →
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
            background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(59,130,246,0.1) 100%)',
            borderRadius: '24px',
            padding: '24px 40px',
            marginBottom: '20px',
            border: '1px solid rgba(16,185,129,0.2)'
          }}>
            <SectionHeader icon="💡" title="Por Qué Importan los Custom Instructions" section="intro" />

            {expandedSections.includes('intro') && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                
                {/* Intro Banner */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(239,68,68,0.1) 100%)',
                  borderRadius: '20px',
                  padding: '32px',
                  marginBottom: '32px',
                  textAlign: 'center',
                  border: '2px solid rgba(239,68,68,0.3)'
                }}>
                  <h3 style={{
                    margin: '0 0 16px 0',
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#fff'
                  }}>
                    El Problema: La IA Te Da Respuestas Genéricas
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6
                  }}>
                    Porque no conoce tu negocio, tu audiencia, ni tu contexto. Cada vez empiezas de cero.
                  </p>
                </div>

                {/* Benefits Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '24px',
                  marginBottom: '32px'
                }}>
                  {[
                    {
                      icon: '🎯',
                      title: 'Consistencia en Respuestas',
                      description: 'La IA mantiene el mismo tono, estilo y enfoque que necesitas. No más respuestas que parecen de otro planeta.',
                      gradient: cardGradients.purple
                    },
                    {
                      icon: '⚡',
                      title: 'No Explicar Contexto Cada Vez',
                      description: 'Tu negocio, audiencia y restricciones ya están cargados. Pregunta directo y obtén respuestas relevantes.',
                      gradient: cardGradients.teal
                    },
                    {
                      icon: '🤖',
                      title: 'Asistentes Especializados',
                      description: 'Crea expertos para cada área: marketing, legal, producto. Cada uno sabe exactamente qué hacer.',
                      gradient: cardGradients.forest
                    }
                  ].map((benefit, i) => (
                    <div
                      key={i}
                      style={{
                        background: benefit.gradient,
                        borderRadius: '20px',
                        padding: '28px',
                        border: '2px solid rgba(255,255,255,0.15)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-8px)';
                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
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
                        border: '2px solid rgba(255,255,255,0.3)'
                      }}>
                        {benefit.icon}
                      </div>
                      <h3 style={{
                        margin: '0 0 12px 0',
                        fontSize: '20px',
                        fontWeight: 700,
                        color: '#fff'
                      }}>
                        {benefit.title}
                      </h3>
                      <p style={{
                        margin: 0,
                        fontSize: '15px',
                        color: 'rgba(255,255,255,0.85)',
                        lineHeight: 1.6
                      }}>
                        {benefit.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Two Tools Teaser */}
                <div style={{
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '20px',
                  padding: '32px',
                  border: '2px solid rgba(255,255,255,0.1)',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    margin: '0 0 24px 0',
                    fontSize: '22px',
                    fontWeight: 600,
                    color: '#fff'
                  }}>
                    Dos Herramientas Principales
                  </h3>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '40px',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '20px',
                        background: `linear-gradient(135deg, ${brandColors.openai}33 0%, ${brandColors.openai}11 100%)`,
                        border: `2px solid ${brandColors.openai}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '36px',
                        margin: '0 auto 12px'
                      }}>
                        🤖
                      </div>
                      <p style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: brandColors.openai }}>
                        Custom GPTs
                      </p>
                      <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                        ChatGPT / OpenAI
                      </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '20px',
                        background: `linear-gradient(135deg, ${brandColors.anthropic}33 0%, ${brandColors.anthropic}11 100%)`,
                        border: `2px solid ${brandColors.anthropic}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '36px',
                        margin: '0 auto 12px'
                      }}>
                        📂
                      </div>
                      <p style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: brandColors.anthropic }}>
                        Projects
                      </p>
                      <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                        Claude / Anthropic
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            <TransitionNote text={transitionNotes.intro} />
          </div>
        </div>
      </section>

      {/* GPTS SECTION */}
      <section 
        id="gpts" 
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
            background: `linear-gradient(135deg, ${brandColors.openai}15 0%, ${brandColors.openai}05 100%)`,
            borderRadius: '24px',
            padding: '24px 40px',
            marginBottom: '20px',
            border: `1px solid ${brandColors.openai}40`
          }}>
            <SectionHeader icon="🤖" title="Custom GPTs" section="gpts" />

            {expandedSections.includes('gpts') && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                
                {/* Banner */}
                <div style={{
                  background: `linear-gradient(135deg, ${brandColors.openai}30 0%, ${brandColors.openai}15 100%)`,
                  borderRadius: '20px',
                  padding: '32px',
                  marginBottom: '32px',
                  textAlign: 'center',
                  border: `2px solid ${brandColors.openai}50`
                }}>
                  <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#fff'
                  }}>
                    Un GPT es un "Experto Empaquetado"
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6
                  }}>
                    Un asistente especializado que se comporta igual siempre, no importa quién lo use o cuándo.
                  </p>
                </div>

                {/* Características */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                  marginBottom: '32px'
                }}>
                  {[
                    { icon: '👤', text: 'Rol claro y permanente' },
                    { icon: '📋', text: 'Instrucciones fijas' },
                    { icon: '📚', text: 'Conocimiento cargado (docs, PDFs)' },
                    { icon: '🔧', text: 'Herramientas habilitadas' }
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}
                    >
                      <span style={{ fontSize: '24px' }}>{item.icon}</span>
                      <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)' }}>{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Ejemplos Hot */}
                <h4 style={{
                  margin: '0 0 16px 0',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.9)'
                }}>
                  🔥 Ejemplos de GPTs "hot" ahora mismo
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '16px',
                  marginBottom: '32px'
                }}>
                  {[
                    'Resume & Cover Letter Optimizer',
                    'Landing Page Copywriter',
                    'Startup Idea Validator',
                    'Legal Assistant (LLC, Contratos)',
                    'Hook Generator para Reels',
                    'Product Manager para SaaS',
                    'Copywriter estilo Alex Hormozi',
                    'Notion Setup Expert'
                  ].map((example, i) => (
                    <div
                      key={i}
                      style={{
                        background: cardGradients.purple,
                        borderRadius: '12px',
                        padding: '16px 20px',
                        border: '1px solid rgba(255,255,255,0.15)',
                        transition: 'all 0.3s ease',
                        cursor: 'default'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(8px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <span style={{ fontSize: '15px', color: '#fff', fontWeight: 500 }}>
                        ✅ {example}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Cuándo usar */}
                <div style={{
                  background: `linear-gradient(135deg, ${brandColors.openai}20 0%, ${brandColors.openai}10 100%)`,
                  borderRadius: '16px',
                  padding: '24px',
                  border: `2px solid ${brandColors.openai}40`
                }}>
                  <h4 style={{
                    margin: '0 0 16px 0',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#fff'
                  }}>
                    📌 Cuándo usar GPTs
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '12px'
                  }}>
                    {[
                      'Quieres repetir el mismo tipo de ayuda',
                      'Necesitas consistencia en las respuestas',
                      'No quieres explicar contexto cada vez',
                      'Estás creando una herramienta escalable'
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: brandColors.openai, fontSize: '18px' }}>✓</span>
                        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{
                    margin: '16px 0 0',
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.7)',
                    fontStyle: 'italic'
                  }}>
                    📦 Mentalidad producto: Un GPT es algo que "configuras una vez y usas muchas".
                  </p>
                </div>

              </div>
            )}

            <TransitionNote text={transitionNotes.gpts} />
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section 
        id="projects" 
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
            background: `linear-gradient(135deg, ${brandColors.anthropic}15 0%, ${brandColors.anthropic}05 100%)`,
            borderRadius: '24px',
            padding: '24px 40px',
            marginBottom: '20px',
            border: `1px solid ${brandColors.anthropic}40`
          }}>
            <SectionHeader icon="📂" title="Claude Projects" section="projects" />

            {expandedSections.includes('projects') && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                
                {/* Banner */}
                <div style={{
                  background: `linear-gradient(135deg, ${brandColors.anthropic}30 0%, ${brandColors.anthropic}15 100%)`,
                  borderRadius: '20px',
                  padding: '32px',
                  marginBottom: '32px',
                  textAlign: 'center',
                  border: `2px solid ${brandColors.anthropic}50`
                }}>
                  <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#fff'
                  }}>
                    Un Project es un "Espacio de Trabajo con Memoria"
                  </h3>
                  <p style={{
                    margin: 0,
                    fontSize: '18px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6
                  }}>
                    No define un rol, define un objetivo. El contexto se acumula con el tiempo.
                  </p>
                </div>

                {/* Características */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                  marginBottom: '32px'
                }}>
                  {[
                    { icon: '💬', text: 'Varias conversaciones juntas' },
                    { icon: '🧠', text: 'Contexto acumulado' },
                    { icon: '📎', text: 'Archivos relacionados' },
                    { icon: '✅', text: 'Decisiones persistentes' }
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        padding: '16px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}
                    >
                      <span style={{ fontSize: '24px' }}>{item.icon}</span>
                      <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)' }}>{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Ejemplos Hot */}
                <h4 style={{
                  margin: '0 0 16px 0',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.9)'
                }}>
                  🔥 Ejemplos de Projects "hot" ahora mismo
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '16px',
                  marginBottom: '32px'
                }}>
                  {[
                    'Build in Public: AI SaaS MVP',
                    'YouTube Automation Channel',
                    'Launch en Product Hunt',
                    'Skool Community Setup',
                    'Indie Hacker Bootstrapped App',
                    'Curso online con IA',
                    'Side Hustle de 0 a $1k MRR',
                    'Estrategia de contenido'
                  ].map((example, i) => (
                    <div
                      key={i}
                      style={{
                        background: cardGradients.copper,
                        borderRadius: '12px',
                        padding: '16px 20px',
                        border: '1px solid rgba(255,255,255,0.15)',
                        transition: 'all 0.3s ease',
                        cursor: 'default'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(8px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <span style={{ fontSize: '15px', color: '#fff', fontWeight: 500 }}>
                        📁 {example}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Cuándo usar */}
                <div style={{
                  background: `linear-gradient(135deg, ${brandColors.anthropic}20 0%, ${brandColors.anthropic}10 100%)`,
                  borderRadius: '16px',
                  padding: '24px',
                  border: `2px solid ${brandColors.anthropic}40`
                }}>
                  <h4 style={{
                    margin: '0 0 16px 0',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#fff'
                  }}>
                    📌 Cuándo usar Projects
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '12px'
                  }}>
                    {[
                      'Estás construyendo algo paso a paso',
                      'Vas a volver durante días o semanas',
                      'Mezclas ideas, decisiones, código, feedback',
                      'Necesitas que el contexto no se resetee'
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: brandColors.anthropic, fontSize: '18px' }}>✓</span>
                        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{
                    margin: '16px 0 0',
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.7)',
                    fontStyle: 'italic'
                  }}>
                    🧠 Mentalidad proceso: Un Project es "donde pasa el trabajo".
                  </p>
                </div>

              </div>
            )}

            <TransitionNote text={transitionNotes.projects} />
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
        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.1) 100%)',
            borderRadius: '24px',
            padding: '24px 40px',
            marginBottom: '20px',
            border: '1px solid rgba(139,92,246,0.2)'
          }}>
            <SectionHeader icon="⚖️" title="GPT vs Project - Comparación Directa" section="comparison" />

            {expandedSections.includes('comparison') && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                
                {/* Toggle Buttons */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '16px',
                  marginBottom: '32px'
                }}>
                  <button
                    onClick={() => setHighlightedTool(highlightedTool === 'gpt' ? null : 'gpt')}
                    style={{
                      padding: '12px 24px',
                      borderRadius: '12px',
                      background: highlightedTool === 'gpt' ? brandColors.openai : 'rgba(255,255,255,0.1)',
                      border: `2px solid ${highlightedTool === 'gpt' ? brandColors.openai : 'rgba(255,255,255,0.2)'}`,
                      color: '#fff',
                      fontSize: '15px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    🤖 Custom GPTs
                  </button>
                  <button
                    onClick={() => setHighlightedTool(highlightedTool === 'project' ? null : 'project')}
                    style={{
                      padding: '12px 24px',
                      borderRadius: '12px',
                      background: highlightedTool === 'project' ? brandColors.anthropic : 'rgba(255,255,255,0.1)',
                      border: `2px solid ${highlightedTool === 'project' ? brandColors.anthropic : 'rgba(255,255,255,0.2)'}`,
                      color: '#fff',
                      fontSize: '15px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    📂 Projects
                  </button>
                </div>

                {/* Comparison Table */}
                <div style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.1)',
                  marginBottom: '32px'
                }}>
                  {/* Header Row */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    background: 'rgba(255,255,255,0.05)'
                  }}>
                    <div style={{ padding: '16px 20px', fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
                      Característica
                    </div>
                    <div style={{
                      padding: '16px 20px',
                      fontWeight: 600,
                      textAlign: 'center',
                      color: highlightedTool === 'gpt' ? brandColors.openai : 'rgba(255,255,255,0.9)',
                      background: highlightedTool === 'gpt' ? `${brandColors.openai}20` : 'transparent',
                      transition: 'all 0.3s ease'
                    }}>
                      🤖 GPTs
                    </div>
                    <div style={{
                      padding: '16px 20px',
                      fontWeight: 600,
                      textAlign: 'center',
                      color: highlightedTool === 'project' ? brandColors.anthropic : 'rgba(255,255,255,0.9)',
                      background: highlightedTool === 'project' ? `${brandColors.anthropic}20` : 'transparent',
                      transition: 'all 0.3s ease'
                    }}>
                      📂 Projects
                    </div>
                  </div>

                  {/* Data Rows */}
                  {[
                    { label: 'Qué es', gpt: 'Asistente especializado', project: 'Espacio de trabajo' },
                    { label: 'Rol / personalidad fija', gpt: '✅ Sí', project: '❌ No' },
                    { label: 'Memoria larga', gpt: '❌ Limitada', project: '✅ Persistente' },
                    { label: 'Reutilizable', gpt: '✅ Mucho', project: '❌ No' },
                    { label: 'Compartible', gpt: '✅ Sí', project: '❌ No' },
                    { label: 'Ideal para', gpt: 'Expertos, herramientas, productos', project: 'Construcción, ejecución' }
                  ].map((row, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        borderTop: '1px solid rgba(255,255,255,0.05)'
                      }}
                    >
                      <div style={{
                        padding: '16px 20px',
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.7)'
                      }}>
                        {row.label}
                      </div>
                      <div style={{
                        padding: '16px 20px',
                        fontSize: '14px',
                        textAlign: 'center',
                        color: highlightedTool === 'gpt' ? '#fff' : 'rgba(255,255,255,0.9)',
                        background: highlightedTool === 'gpt' ? `${brandColors.openai}15` : 'transparent',
                        transition: 'all 0.3s ease'
                      }}>
                        {row.gpt}
                      </div>
                      <div style={{
                        padding: '16px 20px',
                        fontSize: '14px',
                        textAlign: 'center',
                        color: highlightedTool === 'project' ? '#fff' : 'rgba(255,255,255,0.9)',
                        background: highlightedTool === 'project' ? `${brandColors.anthropic}15` : 'transparent',
                        transition: 'all 0.3s ease'
                      }}>
                        {row.project}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Combinación Poderosa */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(59,130,246,0.2) 100%)',
                  borderRadius: '20px',
                  padding: '32px',
                  border: '2px solid rgba(139,92,246,0.3)'
                }}>
                  <h4 style={{
                    margin: '0 0 20px 0',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#fff',
                    textAlign: 'center'
                  }}>
                    💡 La Combinación Poderosa (lo que usan los builders)
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '24px',
                    marginBottom: '24px'
                  }}>
                    <div style={{
                      background: `${brandColors.anthropic}30`,
                      borderRadius: '12px',
                      padding: '20px',
                      textAlign: 'center',
                      border: `2px solid ${brandColors.anthropic}`
                    }}>
                      <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>📂</span>
                      <p style={{ margin: 0, fontSize: '14px', color: '#fff', fontWeight: 600 }}>
                        Project = el trabajo en curso
                      </p>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}>
                      +
                    </div>
                    <div style={{
                      background: `${brandColors.openai}30`,
                      borderRadius: '12px',
                      padding: '20px',
                      textAlign: 'center',
                      border: `2px solid ${brandColors.openai}`
                    }}>
                      <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>🤖</span>
                      <p style={{ margin: 0, fontSize: '14px', color: '#fff', fontWeight: 600 }}>
                        GPT = experto que llamas cuando lo necesitas
                      </p>
                    </div>
                  </div>
                  <p style={{
                    margin: 0,
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.8)',
                    textAlign: 'center',
                    lineHeight: 1.6
                  }}>
                    <strong>Ejemplo:</strong> Project "AI SaaS Launch" + GPTs: Strategy, Legal, Marketing, Tech Architect
                    <br />
                    <em>Esto ya no es "chatear con IA". Es orquestar asistentes.</em>
                  </p>
                </div>

              </div>
            )}

            <TransitionNote text={transitionNotes.comparison} />
          </div>
        </div>
      </section>

      {/* FRAMEWORK SECTION */}
      <section 
        id="framework" 
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
            <SectionHeader icon="🧭" title="Framework de Decisión: GPT vs Project" section="framework" />

            {expandedSections.includes('framework') && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                
                {/* Regla 0 */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(249,115,22,0.1) 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  marginBottom: '32px',
                  border: '2px solid rgba(249,115,22,0.3)',
                  textAlign: 'center'
                }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: 700, color: '#F97316' }}>
                    ⚠️ Regla 0 (la más importante)
                  </h4>
                  <p style={{ margin: 0, fontSize: '16px', color: 'rgba(255,255,255,0.9)' }}>
                    Si no tienes claro el objetivo → <strong>empieza con un Project</strong>
                    <br />
                    Si el objetivo está claro y se repite → <strong>crea un GPT</strong>
                  </p>
                </div>

                {/* Decision Wizard */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '32px'
                }}>
                  {/* Left: Questions */}
                  <div>
                    <h4 style={{
                      margin: '0 0 20px 0',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#fff'
                    }}>
                      Responde estas 5 preguntas:
                    </h4>
                    
                    {dimensions.map((dim, i) => (
                      <div
                        key={dim.id}
                        style={{
                          background: answers[dim.id] ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)',
                          borderRadius: '16px',
                          padding: '20px',
                          marginBottom: '16px',
                          border: currentDimension === i 
                            ? '2px solid #8B5CF6' 
                            : answers[dim.id] 
                              ? '2px solid rgba(16,185,129,0.3)' 
                              : '2px solid rgba(255,255,255,0.1)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '12px'
                        }}>
                          <span style={{ fontSize: '24px' }}>{dim.icon}</span>
                          <span style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>
                            {dim.title}
                          </span>
                          {answers[dim.id] && (
                            <span style={{
                              marginLeft: 'auto',
                              background: answers[dim.id] === 'gpt' ? brandColors.openai : brandColors.anthropic,
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '12px',
                              fontWeight: 600
                            }}>
                              {answers[dim.id] === 'gpt' ? 'GPT' : 'Project'}
                            </span>
                          )}
                        </div>
                        <p style={{
                          margin: '0 0 12px 0',
                          fontSize: '14px',
                          color: 'rgba(255,255,255,0.7)'
                        }}>
                          {dim.question}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {dim.options.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => {
                                setAnswers(prev => ({ ...prev, [dim.id]: opt.value }));
                                if (i < dimensions.length - 1) {
                                  setCurrentDimension(i + 1);
                                }
                              }}
                              style={{
                                padding: '12px 16px',
                                borderRadius: '8px',
                                background: answers[dim.id] === opt.value 
                                  ? (opt.value === 'gpt' ? `${brandColors.openai}30` : `${brandColors.anthropic}30`)
                                  : 'rgba(255,255,255,0.05)',
                                border: answers[dim.id] === opt.value 
                                  ? `2px solid ${opt.value === 'gpt' ? brandColors.openai : brandColors.anthropic}`
                                  : '2px solid rgba(255,255,255,0.1)',
                                color: '#fff',
                                fontSize: '13px',
                                textAlign: 'left',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                              }}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right: Result */}
                  <div>
                    <h4 style={{
                      margin: '0 0 20px 0',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#fff'
                    }}>
                      Tu Recomendación:
                    </h4>
                    
                    {recommendation ? (
                      <div style={{
                        background: recommendation.recommendation === 'gpt' 
                          ? `linear-gradient(135deg, ${brandColors.openai}30 0%, ${brandColors.openai}15 100%)`
                          : `linear-gradient(135deg, ${brandColors.anthropic}30 0%, ${brandColors.anthropic}15 100%)`,
                        borderRadius: '20px',
                        padding: '32px',
                        textAlign: 'center',
                        border: `2px solid ${recommendation.recommendation === 'gpt' ? brandColors.openai : brandColors.anthropic}`,
                        marginBottom: '24px'
                      }}>
                        <span style={{ fontSize: '64px', display: 'block', marginBottom: '16px' }}>
                          {recommendation.recommendation === 'gpt' ? '🤖' : '📂'}
                        </span>
                        <h3 style={{
                          margin: '0 0 8px 0',
                          fontSize: '28px',
                          fontWeight: 700,
                          color: '#fff'
                        }}>
                          {recommendation.recommendation === 'gpt' ? 'Custom GPT' : 'Claude Project'}
                        </h3>
                        <p style={{
                          margin: '0 0 24px 0',
                          fontSize: '18px',
                          color: 'rgba(255,255,255,0.8)'
                        }}>
                          {recommendation.recommendation === 'gpt' 
                            ? `${recommendation.gptPercentage}% de tus respuestas apuntan a GPT`
                            : `${recommendation.projectPercentage}% de tus respuestas apuntan a Project`
                          }
                        </p>
                        
                        {/* Progress Bar */}
                        <div style={{
                          display: 'flex',
                          height: '12px',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          background: 'rgba(255,255,255,0.1)'
                        }}>
                          <div style={{
                            width: `${recommendation.gptPercentage}%`,
                            background: brandColors.openai,
                            transition: 'width 0.5s ease'
                          }} />
                          <div style={{
                            width: `${recommendation.projectPercentage}%`,
                            background: brandColors.anthropic,
                            transition: 'width 0.5s ease'
                          }} />
                        </div>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginTop: '8px',
                          fontSize: '12px'
                        }}>
                          <span style={{ color: brandColors.openai }}>GPT {recommendation.gptPercentage}%</span>
                          <span style={{ color: brandColors.anthropic }}>Project {recommendation.projectPercentage}%</span>
                        </div>
                      </div>
                    ) : (
                      <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '20px',
                        padding: '48px 32px',
                        textAlign: 'center',
                        border: '2px dashed rgba(255,255,255,0.2)',
                        marginBottom: '24px'
                      }}>
                        <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px', opacity: 0.5 }}>🤔</span>
                        <p style={{
                          margin: 0,
                          fontSize: '16px',
                          color: 'rgba(255,255,255,0.5)'
                        }}>
                          Responde las preguntas para ver tu recomendación
                        </p>
                      </div>
                    )}

                    {/* Reset Button */}
                    {Object.keys(answers).length > 0 && (
                      <button
                        onClick={() => {
                          setAnswers({});
                          setRecommendation(null);
                          setCurrentDimension(0);
                        }}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '8px',
                          background: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.2)',
                          color: '#fff',
                          fontSize: '14px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          marginBottom: '24px'
                        }}
                      >
                        🔄 Empezar de nuevo
                      </button>
                    )}

                    {/* Quick Test */}
                    <div style={{
                      background: 'rgba(139,92,246,0.1)',
                      borderRadius: '16px',
                      padding: '24px',
                      border: '2px solid rgba(139,92,246,0.2)'
                    }}>
                      <h4 style={{
                        margin: '0 0 16px 0',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#fff'
                      }}>
                        🧪 Test Rápido (di en voz alta)
                      </h4>
                      <div style={{
                        background: `${brandColors.openai}20`,
                        borderRadius: '8px',
                        padding: '12px 16px',
                        marginBottom: '12px',
                        borderLeft: `4px solid ${brandColors.openai}`
                      }}>
                        <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>
                          "Quiero que este asistente siempre actúe como..." → <strong style={{ color: brandColors.openai }}>GPT</strong>
                        </p>
                      </div>
                      <div style={{
                        background: `${brandColors.anthropic}20`,
                        borderRadius: '8px',
                        padding: '12px 16px',
                        borderLeft: `4px solid ${brandColors.anthropic}`
                      }}>
                        <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>
                          "Quiero un lugar donde podamos ir resolviendo esto poco a poco" → <strong style={{ color: brandColors.anthropic }}>Project</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            <TransitionNote text={transitionNotes.framework} />
          </div>
        </div>
      </section>

      {/* EXAMPLES SECTION */}
      <section 
        id="examples" 
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
            <SectionHeader icon="💸" title="GPTs Que La Gente Usa y Paga" section="examples" />

            {expandedSections.includes('examples') && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                
                {/* Category Tabs */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '24px',
                  justifyContent: 'center'
                }}>
                  {Object.entries(gptCategories).map(([key, cat]) => (
                    <button
                      key={key}
                      onClick={() => setActiveCategory(key)}
                      style={{
                        padding: '10px 16px',
                        borderRadius: '20px',
                        background: activeCategory === key ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.05)',
                        border: activeCategory === key ? '2px solid #8B5CF6' : '2px solid rgba(255,255,255,0.1)',
                        color: activeCategory === key ? '#fff' : 'rgba(255,255,255,0.7)',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>

                {/* Category Content */}
                <div style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '20px',
                  padding: '32px',
                  border: '2px solid rgba(255,255,255,0.1)',
                  marginBottom: '32px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '24px'
                  }}>
                    <span style={{ fontSize: '48px' }}>{gptCategories[activeCategory].icon}</span>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#fff' }}>
                        {gptCategories[activeCategory].name}
                      </h3>
                      <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                        Monetización típica: <strong style={{ color: '#10B981' }}>{gptCategories[activeCategory].pricing}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Examples Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px',
                    marginBottom: '24px'
                  }}>
                    {gptCategories[activeCategory].examples.map((example, i) => (
                      <div
                        key={i}
                        style={{
                          background: cardGradients.purple,
                          borderRadius: '12px',
                          padding: '16px',
                          border: '1px solid rgba(255,255,255,0.15)'
                        }}
                      >
                        <span style={{ fontSize: '14px', color: '#fff', fontWeight: 500 }}>
                          {example}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Why They Pay */}
                  <div style={{
                    background: 'rgba(16,185,129,0.1)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    border: '1px solid rgba(16,185,129,0.3)'
                  }}>
                    <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>
                      <strong style={{ color: '#10B981' }}>💰 Por qué pagan:</strong> {gptCategories[activeCategory].whyPay}
                    </p>
                  </div>
                </div>

                {/* Pattern Box */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '24px'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(239,68,68,0.1) 100%)',
                    borderRadius: '16px',
                    padding: '24px',
                    border: '2px solid rgba(239,68,68,0.3)'
                  }}>
                    <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: '#EF4444' }}>
                      ❌ GPTs que NO se pagan
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.8 }}>
                      <li>"GPT que sabe mucho de X"</li>
                      <li>"GPT creativo general"</li>
                      <li>"GPT experto en todo"</li>
                    </ul>
                  </div>
                  <div style={{
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.1) 100%)',
                    borderRadius: '16px',
                    padding: '24px',
                    border: '2px solid rgba(16,185,129,0.3)'
                  }}>
                    <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: '#10B981' }}>
                      ✅ GPTs que SÍ se pagan
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.8 }}>
                      <li>Resuelven una tarea concreta</li>
                      <li>Reducen tiempo, estrés o errores</li>
                      <li>Tienen output claro y usable</li>
                      <li>Se usan más de una vez</li>
                    </ul>
                  </div>
                </div>

              </div>
            )}

            <TransitionNote text={transitionNotes.examples} />
          </div>
        </div>
      </section>

      {/* MONETIZATION SECTION */}
      <section 
        id="monetization" 
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
            <SectionHeader icon="💰" title="Convertir GPT en Producto" section="monetization" />

            {expandedSections.includes('monetization') && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                
                {/* Key Insight */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(59,130,246,0.2) 100%)',
                  borderRadius: '16px',
                  padding: '24px',
                  marginBottom: '32px',
                  textAlign: 'center',
                  border: '2px solid rgba(139,92,246,0.3)'
                }}>
                  <p style={{ margin: 0, fontSize: '18px', color: '#fff', fontWeight: 600 }}>
                    Un GPT NO es el producto. El producto es el <span style={{ color: '#8B5CF6' }}>RESULTADO</span> que el GPT entrega.
                  </p>
                </div>

                {/* Two Options Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                  gap: '24px',
                  marginBottom: '32px'
                }}>
                  {/* Lead Magnet */}
                  <div style={{
                    background: cardGradients.teal,
                    borderRadius: '20px',
                    padding: '28px',
                    border: '2px solid rgba(255,255,255,0.15)'
                  }}>
                    <h4 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 700, color: '#fff' }}>
                      🧲 GPT como Lead Magnet
                    </h4>
                    <p style={{ margin: '0 0 16px', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                      El GPT atrae usuarios y emails. El dinero viene después.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        { icon: '🔍', title: 'GPT Diagnóstico', desc: 'Analiza y evalúa, pero NO da solución completa' },
                        { icon: '⏳', title: 'GPT con Límite', desc: '1 análisis por día, solo feedback sin ejecución' },
                        { icon: '🪜', title: 'GPT Primer Paso', desc: 'Outline sin desarrollo, score sin roadmap' }
                      ].map((item, i) => (
                        <div key={i} style={{
                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          padding: '14px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '20px' }}>{item.icon}</span>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{item.title}</span>
                          </div>
                          <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.7)', paddingLeft: '30px' }}>
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p style={{
                      margin: '16px 0 0',
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.7)',
                      fontStyle: 'italic',
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                      paddingTop: '16px'
                    }}>
                      💡 Regla de oro: El GPT debe generar claridad, no cerrar el ciclo.
                    </p>
                  </div>

                  {/* Paid Product */}
                  <div style={{
                    background: cardGradients.magenta,
                    borderRadius: '20px',
                    padding: '28px',
                    border: '2px solid rgba(255,255,255,0.15)'
                  }}>
                    <h4 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: 700, color: '#fff' }}>
                      💸 GPT como Producto Pago
                    </h4>
                    <p style={{ margin: '0 0 16px', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                      El GPT resuelve algo específico. El dinero viene directo.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        { icon: '🎯', title: 'Job to Be Done', desc: 'Vende una tarea completa, no "un GPT"' },
                        { icon: '📦', title: 'Empaquetado', desc: 'Sistema, Asistente, Copilot, Toolkit' },
                        { icon: '➕', title: 'Capa Extra', desc: 'Templates, checklists, frameworks, guías PDF' }
                      ].map((item, i) => (
                        <div key={i} style={{
                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          padding: '14px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '20px' }}>{item.icon}</span>
                            <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{item.title}</span>
                          </div>
                          <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.7)', paddingLeft: '30px' }}>
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p style={{
                      margin: '16px 0 0',
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.7)',
                      fontStyle: 'italic',
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                      paddingTop: '16px'
                    }}>
                      💡 GPT solo → difícil cobrar. GPT + material → 💰
                    </p>
                  </div>
                </div>

                {/* Pricing Models */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  marginBottom: '32px'
                }}>
                  {[
                    { model: 'One-time', price: '$9–$49', ideal: 'Audits, launch helpers, generators' },
                    { model: 'Suscripción', price: '$10–$29/mes', ideal: 'Creators, marketing, productividad' },
                    { model: 'Bundle', price: '$29–$99', ideal: 'Packs temáticos (Creator Pack, Job Seeker Pack)' }
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '16px',
                        padding: '20px',
                        textAlign: 'center',
                        border: '2px solid rgba(255,255,255,0.1)'
                      }}
                    >
                      <h5 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 600, color: '#fff' }}>
                        {item.model}
                      </h5>
                      <p style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: 700, color: '#10B981' }}>
                        {item.price}
                      </p>
                      <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                        {item.ideal}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Viability Test */}
                <div style={{
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '20px',
                  padding: '28px',
                  border: '2px solid rgba(255,255,255,0.1)'
                }}>
                  <h4 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: 600, color: '#fff' }}>
                    🧪 Test Rápido de Viabilidad
                  </h4>
                  <p style={{ margin: '0 0 20px', fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                    Antes de crear un GPT, responde estas 4 preguntas:
                  </p>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '12px',
                    marginBottom: '20px'
                  }}>
                    {[
                      '¿Alguien ya paga a un humano por esto?',
                      '¿Esto duele lo suficiente como para pagar $10?',
                      '¿El output ahorra tiempo inmediato?',
                      '¿Se puede usar mínimo 3 veces?'
                    ].map((q, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          background: 'rgba(255,255,255,0.05)',
                          borderRadius: '12px',
                          padding: '14px 16px',
                          border: viabilityAnswers[i] !== undefined 
                            ? `2px solid ${viabilityAnswers[i] ? '#10B981' : '#EF4444'}`
                            : '2px solid rgba(255,255,255,0.1)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onClick={() => {
                          setViabilityAnswers(prev => ({
                            ...prev,
                            [i]: prev[i] === undefined ? true : !prev[i]
                          }));
                        }}
                      >
                        <span style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '6px',
                          background: viabilityAnswers[i] !== undefined
                            ? (viabilityAnswers[i] ? '#10B981' : '#EF4444')
                            : 'rgba(255,255,255,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '14px',
                          flexShrink: 0
                        }}>
                          {viabilityAnswers[i] !== undefined ? (viabilityAnswers[i] ? '✓' : '✗') : ''}
                        </span>
                        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>{q}</span>
                      </div>
                    ))}
                  </div>
                  
                  {Object.keys(viabilityAnswers).length === 4 && (
                    <div style={{
                      background: calculateViability() >= 3 
                        ? 'rgba(16,185,129,0.2)' 
                        : 'rgba(249,115,22,0.2)',
                      borderRadius: '12px',
                      padding: '16px',
                      textAlign: 'center',
                      border: `2px solid ${calculateViability() >= 3 ? '#10B981' : '#F97316'}`
                    }}>
                      <span style={{ fontSize: '32px' }}>
                        {calculateViability() >= 3 ? '✅' : '⚠️'}
                      </span>
                      <p style={{ margin: '8px 0 0', fontSize: '16px', fontWeight: 600, color: '#fff' }}>
                        {calculateViability()}/4 respuestas positivas
                        {calculateViability() >= 3 
                          ? ' — ¡Vale la pena crearlo!' 
                          : ' — Considera refinar la idea'}
                      </p>
                    </div>
                  )}
                </div>

              </div>
            )}

            <TransitionNote text={transitionNotes.monetization} />
          </div>
        </div>
      </section>

      {/* DEMO SECTION */}
      <section 
        id="demo" 
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
            background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(59,130,246,0.1) 100%)',
            borderRadius: '24px',
            padding: '24px 40px',
            marginBottom: '20px',
            border: '1px solid rgba(16,185,129,0.2)'
          }}>
            <SectionHeader icon="🛠️" title="Configura Instrucciones Para Tu Negocio" section="demo" />

            {expandedSections.includes('demo') && (
              <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '32px'
                }}>
                  {/* Left: Form */}
                  <div>
                    <h4 style={{
                      margin: '0 0 20px 0',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#fff'
                    }}>
                      Describe tu negocio:
                    </h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {[
                        { key: 'industria', label: 'Industria / Nicho', placeholder: 'Ej: Marketing digital para e-commerce' },
                        { key: 'audiencia', label: 'Audiencia objetivo', placeholder: 'Ej: Emprendedores que venden en Shopify' },
                        { key: 'problemasPrincipales', label: 'Problemas que resuelves', placeholder: 'Ej: Ayudo a crear campañas de ads efectivas, optimizar conversion rates...' },
                        { key: 'tono', label: 'Tono de comunicación', placeholder: 'Ej: Profesional pero cercano, con ejemplos prácticos' },
                        { key: 'restricciones', label: 'Restricciones / Cosas que evitar', placeholder: 'Ej: No sugerir herramientas de pago, evitar jerga muy técnica' }
                      ].map((field) => (
                        <div key={field.key}>
                          <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: 'rgba(255,255,255,0.8)',
                            marginBottom: '8px'
                          }}>
                            {field.label}
                          </label>
                          {field.key === 'problemasPrincipales' ? (
                            <textarea
                              value={businessProfile[field.key]}
                              onChange={(e) => setBusinessProfile(prev => ({ ...prev, [field.key]: e.target.value }))}
                              placeholder={field.placeholder}
                              style={{
                                width: '100%',
                                minHeight: '80px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '2px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                padding: '12px 16px',
                                color: '#fff',
                                fontSize: '14px',
                                fontFamily: "'Inter', sans-serif",
                                resize: 'vertical',
                                outline: 'none',
                                transition: 'border-color 0.3s ease'
                              }}
                              onFocus={(e) => e.target.style.borderColor = 'rgba(16,185,129,0.5)'}
                              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                          ) : (
                            <input
                              type="text"
                              value={businessProfile[field.key]}
                              onChange={(e) => setBusinessProfile(prev => ({ ...prev, [field.key]: e.target.value }))}
                              placeholder={field.placeholder}
                              style={{
                                width: '100%',
                                background: 'rgba(255,255,255,0.05)',
                                border: '2px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                padding: '12px 16px',
                                color: '#fff',
                                fontSize: '14px',
                                fontFamily: "'Inter', sans-serif",
                                outline: 'none',
                                transition: 'border-color 0.3s ease'
                              }}
                              onFocus={(e) => e.target.style.borderColor = 'rgba(16,185,129,0.5)'}
                              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Generated Instructions */}
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '20px'
                    }}>
                      <h4 style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#fff'
                      }}>
                        Instrucciones generadas:
                      </h4>
                      
                      {/* Tab Switcher */}
                      <div style={{
                        display: 'flex',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '8px',
                        padding: '4px'
                      }}>
                        <button
                          onClick={() => setActiveInstructionTab('gpt')}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '6px',
                            background: activeInstructionTab === 'gpt' ? brandColors.openai : 'transparent',
                            border: 'none',
                            color: '#fff',
                            fontSize: '13px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          🤖 GPT
                        </button>
                        <button
                          onClick={() => setActiveInstructionTab('claude')}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '6px',
                            background: activeInstructionTab === 'claude' ? brandColors.anthropic : 'transparent',
                            border: 'none',
                            color: '#fff',
                            fontSize: '13px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          📂 Claude
                        </button>
                      </div>
                    </div>
                    
                    <div style={{
                      background: 'rgba(0,0,0,0.4)',
                      borderRadius: '16px',
                      padding: '20px',
                      border: `2px solid ${activeInstructionTab === 'gpt' ? brandColors.openai : brandColors.anthropic}40`,
                      minHeight: '400px',
                      position: 'relative'
                    }}>
                      {generatedInstructions ? (
                        <>
                          <pre style={{
                            margin: 0,
                            fontSize: '13px',
                            color: 'rgba(255,255,255,0.9)',
                            fontFamily: "'JetBrains Mono', monospace",
                            whiteSpace: 'pre-wrap',
                            lineHeight: 1.6
                          }}>
                            {generatedInstructions}
                          </pre>
                          
                          <button
                            onClick={copyToClipboard}
                            style={{
                              position: 'absolute',
                              top: '16px',
                              right: '16px',
                              padding: '8px 16px',
                              borderRadius: '8px',
                              background: copied ? '#10B981' : 'rgba(255,255,255,0.1)',
                              border: '1px solid rgba(255,255,255,0.2)',
                              color: '#fff',
                              fontSize: '13px',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            {copied ? '✓ Copiado' : '📋 Copiar'}
                          </button>
                        </>
                      ) : (
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                          minHeight: '360px',
                          color: 'rgba(255,255,255,0.4)'
                        }}>
                          <span style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📝</span>
                          <p style={{ margin: 0, fontSize: '14px', textAlign: 'center' }}>
                            Completa el formulario para generar<br />las instrucciones personalizadas
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div style={{
                  marginTop: '32px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '16px'
                }}>
                  {[
                    { icon: '🎯', tip: 'Sé específico con tu audiencia. "Emprendedores" es muy amplio, "Dueños de tiendas Shopify con <$10k/mes" es mejor.' },
                    { icon: '💡', tip: 'Los problemas que resuelves definen el valor. Lista 3-5 problemas concretos que tu negocio soluciona.' },
                    { icon: '🔧', tip: 'Copia estas instrucciones en tu Custom GPT o Claude Project. Ajusta según la experiencia.' }
                  ].map((item, i) => (
                    <div
                      key={i}
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '12px',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}
                    >
                      <span style={{ fontSize: '24px' }}>{item.icon}</span>
                      <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
                        {item.tip}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default CustomInstructions;
