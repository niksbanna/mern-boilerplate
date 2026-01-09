import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome to MERN Boilerplate</h1>
        <p style={styles.subtitle}>
          A production-ready MERN stack application with authentication, RBAC,
          and modern best practices
        </p>
        
        <div style={styles.features}>
          <h2 style={styles.featuresTitle}>Features</h2>
          <ul style={styles.featuresList}>
            <li>🔐 JWT Authentication with Refresh Tokens</li>
            <li>👥 Role-Based Access Control (RBAC)</li>
            <li>⚛️ React with TypeScript</li>
            <li>🔄 Redux Toolkit for State Management</li>
            <li>🎨 React Context API for Theme</li>
            <li>🛣️ Protected Routes</li>
            <li>🧪 Comprehensive Testing Setup</li>
            <li>🐳 Docker Configuration</li>
          </ul>
        </div>

        {isAuthenticated ? (
          <div style={styles.actions}>
            <p style={styles.welcomeText}>Welcome back, {user?.name}!</p>
            <Link to="/dashboard" style={styles.button}>
              Go to Dashboard
            </Link>
          </div>
        ) : (
          <div style={styles.actions}>
            <Link to="/login" style={styles.button}>
              Login
            </Link>
            <Link to="/register" style={styles.buttonSecondary}>
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 60px)',
    padding: '2rem',
    backgroundColor: 'var(--bg-primary, #f5f5f5)',
  },
  content: {
    maxWidth: '800px',
    textAlign: 'center' as const,
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: 'var(--text-primary, #333)',
  },
  subtitle: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    color: 'var(--text-secondary, #666)',
  },
  features: {
    backgroundColor: 'var(--bg-secondary, white)',
    padding: '2rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    textAlign: 'left' as const,
  },
  featuresTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: 'var(--text-primary, #333)',
  },
  featuresList: {
    listStylePosition: 'inside' as const,
    color: 'var(--text-primary, #333)',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column' as const,
  },
  welcomeText: {
    fontSize: '1.25rem',
    color: 'var(--text-primary, #333)',
  },
  button: {
    padding: '0.75rem 2rem',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  buttonSecondary: {
    padding: '0.75rem 2rem',
    backgroundColor: '#6c757d',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
  },
};

export default Home;
