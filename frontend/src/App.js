import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import Classes from './pages/Classes';
import Testimonials from './pages/Testimonials';
import Telegram from './pages/Telegram';
import Support from './pages/Support';
import Login from './pages/Login';
import StudentLogin from './pages/StudentLogin';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Announcements from './pages/Announcements';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminRoute from './components/AdminRoute';
import { Toaster } from './components/ui/toaster';
import './App.css';

const AnimatedRoutes = () => {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="page-transition"
        timeout={500}
        nodeRef={nodeRef}
      >
        <div className="page-transition-wrapper" ref={nodeRef}>
          <main className="min-h-screen w-full max-w-full pt-16">
            <div className="container mx-auto px-4 w-full max-w-full">
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/our-story" element={<OurStory />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/telegram" element={<Telegram />} />
                <Route path="/support" element={<Support />} />
                <Route path="/login" element={<Login />} />
                <Route path="/student/login" element={<StudentLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
            </Routes>
            </div>
          </main>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen bg-gray-900 text-white">
          <Navbar />
          <AnimatedRoutes />
          <Footer />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;