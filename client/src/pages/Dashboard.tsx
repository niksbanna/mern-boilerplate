import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { RoleBasedComponent } from '../components';

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Dashboard</h1>
        
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>User Information</h2>
          <div style={styles.info}>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
            <p><strong>Member Since:</strong> {new Date(user?.createdAt || '').toLocaleDateString()}</p>
          </div>
        </div>

        <RoleBasedComponent roles={['admin', 'moderator']}>
          <div style={{ ...styles.card, ...styles.adminCard }}>
            <h2 style={styles.cardTitle}>Admin/Moderator Panel</h2>
            <p>This section is only visible to admins and moderators.</p>
            <p>You have elevated privileges in this application.</p>
          </div>
        </RoleBasedComponent>

        <RoleBasedComponent 
          roles={['admin']}
          fallback={
            <div style={styles.card}>
              <p>Some features are restricted to admin users only.</p>
            </div>
          }
        >
          <div style={{ ...styles.card, ...styles.adminOnlyCard }}>
            <h2 style={styles.cardTitle}>Admin Only Panel</h2>
            <p>This section is exclusively for administrators.</p>
            <p>You have full control over the application.</p>
          </div>
        </RoleBasedComponent>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: 'var(--bg-primary, #f5f5f5)',
    minHeight: 'calc(100vh - 60px)',
  },
  content: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: 'var(--text-primary, #333)',
  },
  card: {
    backgroundColor: 'var(--bg-secondary, white)',
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  adminCard: {
    borderLeft: '4px solid #ffc107',
  },
  adminOnlyCard: {
    borderLeft: '4px solid #dc3545',
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: 'var(--text-primary, #333)',
  },
  info: {
    color: 'var(--text-primary, #333)',
  },
};

export default Dashboard;
