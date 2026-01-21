# 📐 Presentify - Especificación de Diseño y Desarrollo

> Guía completa para crear presentaciones interactivas consistentes con el sistema de diseño Presentify

**Versión:** 1.0  
**Última actualización:** Enero 2026  
**Basado en:** AIPanorama.jsx

---

## 📋 Tabla de Contenidos

1. [Filosofía de Diseño](#filosofía-de-diseño)
2. [Sistema de Colores](#sistema-de-colores)
3. [Tipografía](#tipografía)
4. [Componentes Reutilizables](#componentes-reutilizables)
5. [Patrones de Layout](#patrones-de-layout)
6. [Animaciones y Transiciones](#animaciones-y-transiciones)
7. [Estructura de Secciones](#estructura-de-secciones)
8. [Demos Interactivos](#demos-interactivos)
9. [Sistema de Navegación](#sistema-de-navegación)
10. [Guía para Crear Nueva Presentación](#guía-para-crear-nueva-presentación)

---

## 🎨 Filosofía de Diseño

### Principios Fundamentales

1. **Engagement Visual** - Cada sección debe ser visualmente atractiva y capturar la atención
2. **Lenguaje Accesible** - Evitar tecnicismos innecesarios, hablar como a personas no técnicas
3. **Interactividad Educativa** - Los demos deben enseñar conceptos de forma visual e intuitiva
4. **Fluidez de Navegación** - La experiencia debe sentirse como una presentación de slides moderna
5. **Consistencia de Marca** - Todos los elementos deben sentirse parte del mismo sistema

### Tono y Voz

- **Entusiasta pero profesional** - Generar hype sin perder credibilidad
- **Educativo sin ser condescendiente** - Explicar sin asumir ignorancia
- **Directo y claro** - Frases cortas, mensajes concretos
- **Motivador** - Inspirar acción y aprendizaje

---

## 🎨 Sistema de Colores

### Paleta Principal

```javascript
// Colores de fondo oscuro
const darkBackground = '#0a0118'; // Fondo principal
const sectionBackground = 'rgba(139,92,246,0.1)'; // Fondo de secciones

// Gradientes de marca
const primaryGradient = 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)';
const accentGradient = 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.15) 100%)';
```

### Colores por Proveedor/Marca

```javascript
const brandColors = {
  openai: '#10A37F',    // Verde OpenAI
  anthropic: '#D97706', // Ámbar Anthropic
  google: '#4285F4',    // Azul Google
};
```

### Gradientes para Cards (Uso en secciones tipo "Futuro")

**IMPORTANTE:** Los gradientes deben ser oscuros para garantizar legibilidad del texto blanco.

```javascript
const cardGradients = {
  purple: 'linear-gradient(135deg, #4c3d8f 0%, #5b2a6e 100%)',     // Púrpura profundo
  magenta: 'linear-gradient(135deg, #8b2a5c 0%, #a33a4a 100%)',    // Magenta/Carmesí
  teal: 'linear-gradient(135deg, #1e5a7a 0%, #0d6d6e 100%)',       // Teal profundo
  terracotta: 'linear-gradient(135deg, #9c4a5b 0%, #b85a2a 100%)', // Terracota
  forest: 'linear-gradient(135deg, #2a5a4a 0%, #3d6b5a 100%)',     // Verde bosque
  copper: 'linear-gradient(135deg, #6b4a2a 0%, #8b5a3a 100%)',     // Cobre/Marrón
};
```

### Tokens de Color (Para demos de tokenización)

```javascript
const tokenColors = [
  'rgba(16,163,127,0.6)',  // Verde esmeralda
  'rgba(217,119,6,0.6)',   // Naranja
  'rgba(66,133,244,0.6)',  // Azul
  'rgba(139,92,246,0.6)',  // Púrpura
  'rgba(236,72,153,0.6)',  // Rosa
  'rgba(34,197,94,0.6)',   // Verde lima
  'rgba(249,115,22,0.6)',  // Naranja brillante
  'rgba(99,102,241,0.6)',  // Índigo
];
```

### Colores de Texto

```javascript
const textColors = {
  primary: '#fff',                      // Texto principal
  secondary: 'rgba(255,255,255,0.9)',   // Texto secundario
  muted: 'rgba(255,255,255,0.7)',       // Texto atenuado
  hint: 'rgba(255,255,255,0.5)',        // Hints y ayudas
  disabled: 'rgba(255,255,255,0.4)',    // Deshabilitado
};
```

### Transparencias para Elementos UI

```javascript
const uiOpacity = {
  cardBg: 'rgba(255,255,255,0.05)',           // Fondo de card normal
  cardBgHover: 'rgba(255,255,255,0.08)',      // Fondo de card hover
  cardBgActive: 'rgba(255,255,255,0.12)',     // Fondo de card activo
  glassBg: 'rgba(255,255,255,0.2)',           // Glassmorphism
  border: 'rgba(255,255,255,0.1)',            // Bordes suaves
  borderActive: 'rgba(255,255,255,0.3)',      // Bordes activos
};
```

---

## ✍️ Tipografía

### Familias de Fuentes

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
```

```javascript
const fontFamilies = {
  display: "'Space Grotesk', sans-serif",  // Títulos y headings
  body: "'Inter', sans-serif",             // Texto del cuerpo
  mono: "'JetBrains Mono', monospace",     // Código y datos técnicos
};
```

### Escala Tipográfica

```javascript
const typography = {
  // Headings
  h1: { fontSize: '48px', fontWeight: 700, lineHeight: 1.2 },
  h2: { fontSize: '36px', fontWeight: 700, lineHeight: 1.3 },
  h3: { fontSize: '28px', fontWeight: 600, lineHeight: 1.3 },
  h4: { fontSize: '22px', fontWeight: 600, lineHeight: 1.4 },
  h5: { fontSize: '18px', fontWeight: 600, lineHeight: 1.4 },
  
  // Body
  bodyLarge: { fontSize: '18px', fontWeight: 400, lineHeight: 1.6 },
  body: { fontSize: '15px', fontWeight: 400, lineHeight: 1.6 },
  bodySmall: { fontSize: '13px', fontWeight: 400, lineHeight: 1.5 },
  
  // Special
  caption: { fontSize: '12px', fontWeight: 500, lineHeight: 1.4 },
  button: { fontSize: '14px', fontWeight: 600, lineHeight: 1 },
  code: { fontSize: '14px', fontWeight: 400, fontFamily: fontFamilies.mono },
};
```

### Uso de Tipografía

- **Títulos de sección**: h2 con Space Grotesk
- **Subtítulos**: h4 con Space Grotesk
- **Texto descriptivo**: body con Inter
- **Labels y badges**: bodySmall/caption con Inter
- **Código y datos técnicos**: JetBrains Mono

---

## 🧩 Componentes Reutilizables

### 1. SectionHeader

Componente estándar para encabezados de sección con funcionalidad de expandir/colapsar.

```jsx
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
        fontSize: '28px', 
        fontWeight: 600,
        fontFamily: "'Space Grotesk', sans-serif"
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
```

**Uso:**
```jsx
<SectionHeader icon="🚀" title="Título de Sección" section="sectionId" />
```

### 2. TransitionNote

Notas de transición entre secciones para mantener la narrativa fluida.

```jsx
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
```

### 3. Card Base

Card base para contenido clickeable o expandible.

```jsx
const Card = ({ 
  gradient, 
  icon, 
  title, 
  subtitle, 
  children, 
  onClick, 
  isActive = false 
}) => (
  <div
    onClick={onClick}
    style={{
      background: gradient || 'rgba(255,255,255,0.05)',
      borderRadius: '24px',
      padding: '28px',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      border: isActive 
        ? '2px solid rgba(255,255,255,0.4)' 
        : '2px solid rgba(255,255,255,0.15)',
      boxShadow: isActive 
        ? '0 20px 50px rgba(0,0,0,0.4)' 
        : '0 10px 30px rgba(0,0,0,0.2)',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    {/* Icon Badge */}
    {icon && (
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
        {icon}
      </div>
    )}
    
    {/* Title */}
    {title && (
      <h3 style={{
        margin: '0 0 8px 0',
        fontSize: '22px',
        fontWeight: '700',
        color: '#fff'
      }}>
        {title}
      </h3>
    )}
    
    {/* Subtitle */}
    {subtitle && (
      <p style={{
        margin: '0 0 16px 0',
        fontSize: '13px',
        color: 'rgba(255,255,255,0.7)',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '1px'
      }}>
        {subtitle}
      </p>
    )}
    
    {children}
  </div>
);
```

### 4. Stat Badge

Badge para mostrar estadísticas o datos destacados.

```jsx
const StatBadge = ({ stat, label }) => (
  <div style={{
    background: 'rgba(255,255,255,0.25)',
    borderRadius: '12px',
    padding: '12px 16px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.3)',
    textAlign: 'center'
  }}>
    <div style={{
      fontSize: '28px',
      fontWeight: '800',
      color: '#fff',
      marginBottom: '4px'
    }}>
      {stat}
    </div>
    <div style={{
      fontSize: '11px',
      color: 'rgba(255,255,255,0.9)',
      fontWeight: '600'
    }}>
      {label}
    </div>
  </div>
);
```

### 5. Button Estándar

Botones consistentes para acciones.

```jsx
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium' 
}) => {
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
      color: '#fff',
      border: 'none'
    },
    secondary: {
      background: 'rgba(255,255,255,0.1)',
      color: '#fff',
      border: '2px solid rgba(255,255,255,0.2)'
    },
    ghost: {
      background: 'transparent',
      color: 'rgba(255,255,255,0.8)',
      border: '1px solid rgba(255,255,255,0.2)'
    }
  };
  
  const sizes = {
    small: { padding: '8px 16px', fontSize: '13px' },
    medium: { padding: '12px 24px', fontSize: '14px' },
    large: { padding: '16px 32px', fontSize: '16px' }
  };
  
  return (
    <button
      onClick={onClick}
      style={{
        ...variants[variant],
        ...sizes[size],
        borderRadius: '12px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {children}
    </button>
  );
};
```

---

## 📐 Patrones de Layout

### Full-Screen Section

Cada sección debe ocupar al menos el alto completo de la pantalla.

```jsx
<section 
  id="section-id" 
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
    {/* Contenedor de sección con fondo */}
    <div style={{
      background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.1) 100%)',
      borderRadius: '24px',
      padding: '24px 40px',
      marginBottom: '20px',
      border: '1px solid rgba(139,92,246,0.2)'
    }}>
      {/* Contenido aquí */}
    </div>
  </div>
</section>
```

### Grid Responsivo

Para cards o elementos en grilla.

```jsx
<div style={{ 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '24px'
}}>
  {items.map(item => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

### Sección con Banner Introductorio

Para secciones que necesitan contexto inicial.

```jsx
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
  {/* Efecto de fondo animado */}
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
    color: '#fff',
    position: 'relative'
  }}>
    Título del Banner
  </h2>
  
  <p style={{
    margin: 0,
    fontSize: '18px',
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 1.6,
    position: 'relative'
  }}>
    Descripción o contexto
  </p>
</div>
```

---

## 🎬 Animaciones y Transiciones

### Keyframes CSS Estándar

```css
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
```

### Transiciones Estándar

```javascript
const transitions = {
  fast: 'all 0.2s ease',
  normal: 'all 0.3s ease',
  slow: 'all 0.5s ease',
  bounce: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  smooth: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
};
```

### Efectos de Hover Estándar

```javascript
// Para cards
onMouseEnter={(e) => {
  e.currentTarget.style.transform = 'translateY(-8px)';
  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = 'translateY(0)';
  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
}}
```

---

## 📦 Estructura de Secciones

### Anatomía de una Sección Típica

```jsx
<section id="section-id" style={{ /* full-screen styles */ }}>
  <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
    <div style={{ /* section background container */ }}>
      
      {/* 1. Header */}
      <SectionHeader 
        icon="🎯" 
        title="Título de la Sección" 
        section="section-id" 
      />

      {/* 2. Contenido Principal (Solo si la sección está expandida) */}
      {expandedSections.includes('section-id') && (
        <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
          
          {/* 2.1 Banner Introductorio (Opcional) */}
          <div style={{ /* intro banner styles */ }}>
            <h2>Contexto de la sección</h2>
            <p>Descripción breve</p>
          </div>

          {/* 2.2 Contenido Interactivo */}
          <div style={{ /* grid or content layout */ }}>
            {/* Cards, demos, visualizaciones */}
          </div>

          {/* 2.3 Resumen o Conclusión (Opcional) */}
          <div style={{ /* summary box */ }}>
            <p>Mensaje clave para llevar</p>
          </div>

        </div>
      )}

      {/* 3. Nota de Transición */}
      <TransitionNote text={transitionNotes['section-id']} />
      
    </div>
  </div>
</section>
```

### Secciones Especiales

#### Header/Hero Section

```jsx
<section id="header" style={{ /* full-screen */ }}>
  {/* Logo o título principal */}
  <h1 style={{ 
    fontSize: '64px', 
    fontWeight: 700,
    background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.6) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }}>
    Título Principal
  </h1>
  
  {/* Subtítulo */}
  <p style={{ fontSize: '24px', color: 'rgba(255,255,255,0.8)' }}>
    Descripción breve de la presentación
  </p>
  
  {/* CTA */}
  <Button variant="primary" size="large">
    Comenzar →
  </Button>
</section>
```

---

## 🎮 Demos Interactivos

### Patrones para Simulaciones

#### 1. Simulación por Pasos

Para demos que avanzan paso a paso (ej: cómo funciona un LLM).

```jsx
const [currentStep, setCurrentStep] = useState(0);
const [isRunning, setIsRunning] = useState(false);

const steps = [
  { label: 'Paso 1', description: 'Descripción del paso', visual: '🔄' },
  { label: 'Paso 2', description: 'Descripción del paso', visual: '⚙️' },
  { label: 'Paso 3', description: 'Descripción del paso', visual: '✅' },
];

const runSimulation = () => {
  setIsRunning(true);
  setCurrentStep(0);
  
  const interval = setInterval(() => {
    setCurrentStep(prev => {
      if (prev >= steps.length - 1) {
        clearInterval(interval);
        setIsRunning(false);
        return prev;
      }
      return prev + 1;
    });
  }, 1500);
};

// Renderizado
<div style={{ /* demo container */ }}>
  {/* Indicador de pasos */}
  <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
    {steps.map((step, i) => (
      <div key={i} style={{
        flex: 1,
        padding: '16px',
        background: i === currentStep 
          ? 'rgba(139,92,246,0.3)' 
          : 'rgba(255,255,255,0.05)',
        borderRadius: '12px',
        border: i === currentStep 
          ? '2px solid #8B5CF6' 
          : '2px solid transparent',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ fontSize: '32px', marginBottom: '8px' }}>
          {step.visual}
        </div>
        <div style={{ fontSize: '14px', fontWeight: 600 }}>
          {step.label}
        </div>
      </div>
    ))}
  </div>
  
  {/* Descripción del paso actual */}
  <p style={{ fontSize: '16px', marginBottom: '24px' }}>
    {steps[currentStep].description}
  </p>
  
  {/* Control */}
  <Button onClick={runSimulation} disabled={isRunning}>
    {isRunning ? 'Ejecutando...' : 'Iniciar Simulación'}
  </Button>
</div>
```

#### 2. Demo Interactivo Click-to-Reveal

Para demos donde el usuario revela información al hacer clic.

```jsx
const [revealed, setRevealed] = useState([]);

const revealNext = () => {
  if (revealed.length < maxItems) {
    setRevealed([...revealed, items[revealed.length]]);
  }
};

// Renderizado
<div>
  {revealed.map((item, i) => (
    <div 
      key={i} 
      style={{ 
        animation: 'fadeIn 0.5s ease-out',
        marginBottom: '12px'
      }}
    >
      {item}
    </div>
  ))}
  
  {revealed.length < maxItems && (
    <Button onClick={revealNext}>
      Generar Siguiente
    </Button>
  )}
</div>
```

#### 3. Visualización de Datos Animada

Para mostrar cambios en datos en tiempo real.

```jsx
const [data, setData] = useState(initialData);
const [isAnimating, setIsAnimating] = useState(false);

const animateData = () => {
  setIsAnimating(true);
  
  // Simular cambios progresivos
  let frame = 0;
  const frames = 30;
  
  const interval = setInterval(() => {
    frame++;
    const progress = frame / frames;
    
    setData(interpolateData(initialData, targetData, progress));
    
    if (frame >= frames) {
      clearInterval(interval);
      setIsAnimating(false);
    }
  }, 50);
};

// Renderizado
<div style={{ /* visualization container */ }}>
  {/* Visualización que responde a `data` */}
  <DataVisualization data={data} />
  
  <Button onClick={animateData} disabled={isAnimating}>
    Animar
  </Button>
</div>
```

### Mejores Prácticas para Demos

1. **Feedback Visual Inmediato** - El usuario debe ver que algo está pasando
2. **Estados de Carga** - Mostrar "Procesando..." o similares
3. **Resultados Claros** - El output debe ser obvio y bien formateado
4. **Reseteable** - Permitir volver a ejecutar el demo
5. **No Bloqueante** - No congelar la UI durante la simulación

---

## 🧭 Sistema de Navegación

### Navegación por Teclado

```javascript
// Setup en useEffect
useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      nextSection();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      prevSection();
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [currentSection]);
```

### Botones de Navegación

```jsx
{/* Botones flotantes de navegación */}
<div className="nav-buttons" style={{
  position: 'fixed',
  bottom: '32px',
  right: '32px',
  display: 'flex',
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
      background: 'rgba(255,255,255,0.1)',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(255,255,255,0.2)',
      color: '#fff',
      fontSize: '20px',
      cursor: currentSection === 0 ? 'not-allowed' : 'pointer',
      opacity: currentSection === 0 ? 0.3 : 1,
      transition: 'all 0.3s ease'
    }}
  >
    ↑
  </button>
  
  <button
    onClick={nextSection}
    disabled={currentSection === sections.length - 1}
    style={{ /* similar pero para siguiente */ }}
  >
    ↓
  </button>
</div>
```

### Indicador de Progreso

```jsx
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
```

### Hint de Navegación

```jsx
{showKeyboardHint && (
  <div style={{
    position: 'fixed',
    bottom: '100px',
    right: '32px',
    background: 'rgba(0,0,0,0.8)',
    backdropFilter: 'blur(10px)',
    padding: '12px 20px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.2)',
    animation: 'fadeIn 0.5s ease-out',
    zIndex: 999
  }}>
    <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.9)' }}>
      💡 Usa ↑ ↓ o PgUp/PgDn para navegar
    </p>
  </div>
)}
```

---

## 🎨 Efectos de Fondo

### Orbes de Gradiente Animados

```jsx
{/* Background Effects - Fijo en toda la presentación */}
<div style={{
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  zIndex: 0
}}>
  {/* Orbe 1 - Verde */}
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
  
  {/* Orbe 2 - Púrpura */}
  <div style={{
    position: 'absolute',
    top: '40%',
    right: '15%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
    filter: 'blur(70px)',
    animation: 'pulse 10s ease-in-out infinite 2s'
  }} />
  
  {/* Orbe 3 - Azul */}
  <div style={{
    position: 'absolute',
    bottom: '10%',
    left: '20%',
    width: '450px',
    height: '450px',
    background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
    filter: 'blur(65px)',
    animation: 'pulse 12s ease-in-out infinite 4s'
  }} />
</div>
```

---

## 📱 Responsividad

### Breakpoints Estándar

```css
/* Mobile */
@media (max-width: 768px) {
  .nav-buttons {
    right: 12px !important;
  }
  .nav-buttons button {
    width: 40px !important;
    height: 40px !important;
    font-size: 16px !important;
  }
  
  /* Ajustes de tipografía */
  h1 { font-size: 36px !important; }
  h2 { font-size: 28px !important; }
  h3 { font-size: 22px !important; }
  
  /* Grid ajustado */
  .grid {
    grid-template-columns: 1fr !important;
  }
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  .grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}
```

---

## 🚀 Guía para Crear Nueva Presentación

### Paso 1: Estructura Base

```jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MiNuevaPresentacion = () => {
  const navigate = useNavigate();
  
  // Estados esenciales
  const [currentSection, setCurrentSection] = useState(0);
  const [expandedSections, setExpandedSections] = useState(['intro']);
  const [showKeyboardHint, setShowKeyboardHint] = useState(true);
  
  // Define tus secciones
  const sections = ['header', 'intro', 'seccion1', 'seccion2', 'conclusion'];
  
  const sectionNames = {
    header: 'Inicio',
    intro: 'Introducción',
    seccion1: 'Primera Sección',
    seccion2: 'Segunda Sección',
    conclusion: 'Conclusión'
  };
  
  const transitionNotes = {
    header: "Nota de transición al intro...",
    intro: "Nota de transición a sección 1...",
    seccion1: "Nota de transición a sección 2...",
    seccion2: "Nota de transición a conclusión..."
  };
  
  // Funciones de navegación (copiar del AIPanorama)
  const scrollToSection = (index) => { /* ... */ };
  const nextSection = () => { /* ... */ };
  const prevSection = () => { /* ... */ };
  
  // Keyboard navigation (copiar del AIPanorama)
  useEffect(() => { /* ... */ }, [currentSection]);
  
  return (
    <div style={{ /* estilos del contenedor principal */ }}>
      {/* Efectos de fondo */}
      {/* ... */}
      
      {/* Header Section */}
      <section id="header" style={{ /* full-screen */ }}>
        {/* Hero content */}
      </section>
      
      {/* Demás secciones */}
      {/* ... */}
      
      {/* Navegación */}
      {/* ... */}
      
      {/* Estilos globales */}
      <style>{/* CSS animations */}</style>
    </div>
  );
};

export default MiNuevaPresentacion;
```

### Paso 2: Definir el Contenido

1. **Tema y Objetivo**: ¿Qué estás enseñando/presentando?
2. **Secciones Principales**: 5-8 secciones típicamente
3. **Narrativa**: Cómo fluye de una sección a otra
4. **Demos**: ¿Qué conceptos necesitan demostración visual?

### Paso 3: Crear Componentes Específicos

Para cada tipo de contenido único en tu presentación, crea componentes específicos siguiendo los patrones base.

```jsx
// Ejemplo: Componente de comparación
const ComparisonCard = ({ itemA, itemB }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px'
  }}>
    <Card gradient={cardGradients.purple} {...itemA} />
    <Card gradient={cardGradients.teal} {...itemB} />
  </div>
);
```

### Paso 4: Implementar Demos Interactivos

Usa los patrones de demos descritos anteriormente, adaptándolos a tu contenido específico.

### Paso 5: Probar Navegación

- ✅ Navegación con teclado funciona
- ✅ Botones de navegación funcionan
- ✅ Transiciones son suaves
- ✅ Todas las secciones son accesibles

### Paso 6: Pulir Estilo

- ✅ Consistencia de colores con el sistema
- ✅ Tipografía apropiada
- ✅ Animaciones no excesivas
- ✅ Responsive en móvil/tablet

---

## ✅ Checklist de Calidad

Antes de considerar completa una presentación, verifica:

### Visual
- [ ] Paleta de colores consistente
- [ ] Tipografía de Space Grotesk para títulos
- [ ] Fondo oscuro (#0a0118)
- [ ] Orbes de gradiente en fondo
- [ ] Cards con gradientes oscuros para legibilidad
- [ ] Espaciado consistente (múltiplos de 4/8px)

### Funcionalidad
- [ ] Navegación por teclado (↑ ↓ PgUp PgDn)
- [ ] Botones de navegación flotantes
- [ ] Indicador de progreso en top
- [ ] Secciones expandibles/colapsables
- [ ] Transiciones suaves entre secciones
- [ ] Demos interactivos funcionan correctamente

### Contenido
- [ ] Lenguaje accesible para no técnicos
- [ ] Notas de transición entre secciones
- [ ] Cada sección ocupa full-screen
- [ ] Información bien estructurada
- [ ] Emojis apropiados como iconos

### UX
- [ ] Loading states en demos
- [ ] Feedback visual en interacciones
- [ ] Botones con estados hover/disabled
- [ ] Hints de navegación para nuevos usuarios
- [ ] Responsive en móvil

### Performance
- [ ] No animaciones costosas continuas
- [ ] Cleanup de event listeners
- [ ] Imágenes optimizadas (si hay)
- [ ] No re-renders innecesarios

---

## 🎯 Ejemplos de Uso por Tipo de Contenido

### Presentación Educativa (como AIPanorama)
- **Estructura**: Intro → Conceptos → Tipos → Proveedores → Futuro
- **Demos**: Simulaciones paso a paso, comparaciones visuales
- **Tono**: Educativo y entusiasta

### Presentación de Producto
- **Estructura**: Hero → Problema → Solución → Features → Pricing → CTA
- **Demos**: Product tours, comparaciones con competencia
- **Tono**: Profesional y convincente

### Presentación de Resultados
- **Estructura**: Resumen → Métricas → Desglose → Insights → Próximos Pasos
- **Demos**: Gráficas animadas, drill-downs interactivos
- **Tono**: Analítico y orientado a datos

---

## 📚 Recursos de Referencia

### Fuentes de Inspiración
- Linear.app (animaciones suaves)
- Stripe.com (gradientes y glassmorphism)
- Apple.com (tipografía y espaciado)
- Vercel.com (dark mode y efectos de fondo)

### Herramientas Útiles
- **Gradientes**: https://cssgradient.io/
- **Paletas**: https://coolors.co/
- **Animaciones**: https://animista.net/
- **Iconos**: Unicode emojis nativos

---

## 🔄 Versionado

**v1.0** - Enero 2026
- Especificación inicial basada en AIPanorama.jsx
- Sistema de colores, tipografía y componentes base
- Patrones de demos interactivos
- Sistema de navegación completo

---

**Fin del documento de especificaciones**

Para dudas o adiciones, referirse al código de `AIPanorama.jsx` como implementación de referencia.
