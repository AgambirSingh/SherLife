import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import LoadingSpinner from './LoadingSpinner';
import Login from './Login';
import ProfileSetup from './ProfileSetup';
import Layout from './Layout';
import Marketplace from './Marketplace';
import Confessions from './Confessions';
import Events from './Events';
import Resources from './Resources';
import Profile from './Profile';

function AppContent() {
  const { user, loading } = useUser();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Login />;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/marketplace" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/confessions" element={<Confessions />} />
        <Route path="/events" element={<Events />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Layout>
  );
}

export default AppContent; 