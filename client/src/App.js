import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Landing from './components/screens/Landing';
import Profile from './components/screens/Profile';
import ViewProfile from './components/screens/ViewProfile';
import Navbar from './components/Layout/Navbar';
import Home from './components/screens/Home'; // Import Home component
import CssBaseline from '@mui/material/CssBaseline';

const App = () => {
  const { user, loading } = useSelector(state => state.auth);

  // Show a loading indicator while fetching user data
  if (loading) return <div>Loading...</div>;

  return (
    <>
    <CssBaseline />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/landing" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/landing" />} />

        {/* Protected Routes */}
        <Route path="/landing" element={user ? <Landing /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/viewProfile" element={user ? <ViewProfile /> : <Navigate to="/login" />} />

        {/* Home Route */}
        <Route path="/home" element={<Home />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to={user ? "/landing" : "/login"} />} />
      </Routes>
    </>
  );
};

export default App;
