import { useState } from 'react';
import { Link } from '@tanstack/react-router';

export default function About() {
  const [count, setCount] = useState(0);

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)',
      padding: '3rem 1rem',
    },
    container: {
      maxWidth: '42rem',
      margin: '0 auto',
    },
    backButton: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      backgroundColor: 'white',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      textDecoration: 'none',
      marginBottom: '2rem',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '1rem',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      padding: '2rem',
    },
    counterSection: {
      background: 'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
      borderRadius: '0.75rem',
      padding: '2rem',
      marginBottom: '2rem',
      textAlign: 'center' as const,
    },
    counterButton: {
      width: '3rem',
      height: '3rem',
      backgroundColor: 'white',
      color: '#6366f1',
      borderRadius: '50%',
      border: 'none',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    counterDisplay: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(8px)',
      borderRadius: '0.5rem',
      padding: '1rem 2rem',
      minWidth: '120px',
    },
    counterValue: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      color: 'white',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Botão Voltar */}
        <Link to="/" style={styles.backButton}>
          <svg 
            style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Voltar para Home
        </Link>

        {/* Card Principal */}
        <div style={styles.card}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
              Sobre Nós
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '28rem', margin: '0 auto' }}>
              Esta é uma página demonstrativa com React, TanStack Router e useState.
            </p>
          </div>

          {/* Seção do Contador */}
          <div style={styles.counterSection}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'white', marginBottom: '1.5rem' }}>
              Contador Interativo
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <button
                onClick={() => setCount(count - 1)}
                style={styles.counterButton}
              >
                -
              </button>
              
              <div style={styles.counterDisplay}>
                <span style={styles.counterValue}>
                  {count}
                </span>
              </div>
              
              <button
                onClick={() => setCount(count + 1)}
                style={styles.counterButton}
              >
                +
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button
                onClick={() => setCount(count + 5)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                +5
              </button>
              <button
                onClick={() => setCount(0)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Resetar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}