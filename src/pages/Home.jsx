import { Link } from 'react-router-dom';

const Home = () => {
  const presentations = [
    {
      id: 'ai-panorama',
      title: 'Panorama de la IA Generativa',
      description: 'Explora el ecosistema completo de la IA generativa: tipos, proveedores, funcionamiento y simulaciones interactivas.',
      icon: '🤖',
      color: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
      tags: ['IA', 'Interactivo', 'LLM', 'Generativa'],
      path: '/ai-panorama'
    },
    {
      id: 'prompts-101',
      title: 'Prompts 101',
      description: 'Aprende a escribir prompts efectivos que realmente funcionan. Descubre por qué el contexto lo es TODO y cómo estructurar tus prompts.',
      icon: '✍️',
      color: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
      tags: ['Prompts', 'Educativo', 'Práctico', 'Guía'],
      path: '/prompts-101'
    },
    {
      id: 'custom-instructions',
      title: 'Custom Instructions',
      description: 'Aprende a configurar tu IA para que realmente entienda tu negocio. GPTs, Projects y cómo elegir la herramienta correcta.',
      icon: '🧠',
      color: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
      tags: ['GPTs', 'Projects', 'Productividad', 'Negocio'],
      path: '/custom-instructions'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 50%, #0a0a0f 100%)',
      color: '#fff',
      fontFamily: "'Inter', -apple-system, sans-serif",
      padding: '0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
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
          top: '20%',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'pulse 8s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '15%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'pulse 10s ease-in-out infinite 2s'
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', padding: '60px 24px' }}>
        
        {/* Header */}
        <header style={{ textAlign: 'center', marginBottom: '80px', animation: 'fadeIn 0.8s ease-out' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              fontSize: '64px',
              animation: 'float 3s ease-in-out infinite'
            }}>
              🎯
            </div>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(42px, 7vw, 72px)',
            fontWeight: 700,
            margin: '0 0 20px 0',
            fontFamily: "'Space Grotesk', sans-serif",
            background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.1
          }}>
            Presentify
          </h1>
          
          <p style={{
            fontSize: '20px',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Presentaciones interactivas y visuales para explicar conceptos complejos de forma simple
          </p>
        </header>

        {/* Presentations Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '24px',
          marginBottom: '60px'
        }}>
          {presentations.map((presentation, index) => (
            <Link
              key={presentation.id}
              to={presentation.path}
              style={{
                textDecoration: 'none',
                color: 'inherit'
              }}
            >
              <div
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '20px',
                  padding: '32px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: `fadeIn 0.8s ease-out ${index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.border = '1px solid rgba(139,92,246,0.4)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(139,92,246,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: presentation.color,
                  borderRadius: '20px 20px 0 0'
                }} />

                {/* Icon */}
                <div style={{
                  fontSize: '56px',
                  marginBottom: '20px',
                  display: 'inline-block'
                }}>
                  {presentation.icon}
                </div>

                {/* Title */}
                <h2 style={{
                  margin: '0 0 12px 0',
                  fontSize: '24px',
                  fontWeight: 600,
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: '#fff'
                }}>
                  {presentation.title}
                </h2>

                {/* Description */}
                <p style={{
                  margin: '0 0 20px 0',
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.6
                }}>
                  {presentation.description}
                </p>

                {/* Tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '20px'
                }}>
                  {presentation.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{
                        background: 'rgba(139,92,246,0.15)',
                        color: '#A78BFA',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 500,
                        border: '1px solid rgba(139,92,246,0.3)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#A78BFA',
                  fontSize: '14px',
                  fontWeight: 600
                }}>
                  Ver presentación
                  <span style={{ fontSize: '18px' }}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer info */}
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          borderTop: '1px solid rgba(255,255,255,0.05)'
        }}>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: 'rgba(255,255,255,0.4)'
          }}>
            Más presentaciones próximamente...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
