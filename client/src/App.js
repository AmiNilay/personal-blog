import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import TagResultsPage from './pages/TagResultsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // <-- IMPORT IS ADDED

// This component protects routes that only admins should see
const PrivateRoute = ({ isAdmin, children }) => {
  return isAdmin ? children : <Navigate to="/login" />;
};

const AnimatedPage = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the user is already logged in when the app loads
  useEffect(() => {
    const profile = localStorage.getItem('profile');
    if (profile) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
        <main className="container">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
            <Route path="/post/:id" element={<AnimatedPage><PostPage /></AnimatedPage>} />
            <Route path="/tag/:tagName" element={<AnimatedPage><TagResultsPage /></AnimatedPage>} />
            <Route path="/login" element={<AnimatedPage><LoginPage setIsAdmin={setIsAdmin} /></AnimatedPage>} />

            {/* --- TEMPORARY ROUTE FOR ADMIN REGISTRATION --- */}
            <Route path="/register-admin" element={<AnimatedPage><RegisterPage setIsAdmin={setIsAdmin} /></AnimatedPage>} />

            {/* Private Routes */}
            <Route path="/admin" element={<PrivateRoute isAdmin={isAdmin}><AnimatedPage><CreatePostPage /></AnimatedPage></PrivateRoute>} />
            <Route path="/edit/post/:id" element={<PrivateRoute isAdmin={isAdmin}><AnimatedPage><EditPostPage /></AnimatedPage></PrivateRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;