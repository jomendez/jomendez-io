import React from 'react';

export const Background = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      zIndex: -1,
      overflow: 'hidden'
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
  );
};
