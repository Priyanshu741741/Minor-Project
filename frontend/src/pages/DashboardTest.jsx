import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUser } from '../lib/auth';

export function DashboardTest() {
  const navigate = useNavigate();
  const user = getUser();

  useEffect(() => {
    console.log('Test Dashboard mounted');
    console.log('Authenticated:', isAuthenticated());
    console.log('User:', user);
    
    if (!isAuthenticated()) {
      console.log('Redirecting to login');
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '32px', color: '#000' }}>Dashboard Test Page</h1>
      <p>If you see this, the dashboard is rendering!</p>
      <p>User: {user?.name || user?.email || 'No user'}</p>
      <p>Role: {user?.role || 'No role'}</p>
      <p>Authenticated: {isAuthenticated() ? 'Yes' : 'No'}</p>
    </div>
  );
}
