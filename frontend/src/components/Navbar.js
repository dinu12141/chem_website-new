import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/announcements', label: 'Announcements', id: 'announcements' },
    { path: '/our-story', label: 'Our Story', id: 'our-story' },
    { path: '/testimonials', label: 'Testimonials', id: 'testimonials' },
    { path: '/classes', label: 'Classes', id: 'classes' },
    { path: '/telegram', label: 'Telegram', id: 'telegram' },
    { path: '/support', label: 'Support', id: 'support' }
  ];

  // Function to scroll to section (Home only)
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (isOpen) setIsOpen(false);
    }
  };

  const handleNavClick = (item) => {
    // Always open the full page for Announcements
    if (item.path === '/announcements') {
      navigate('/announcements');
      if (isOpen) setIsOpen(false);
      return;
    }
    // If not on the home route, navigate to the page route
    if (location.pathname !== '/') {
      navigate(item.path);
      if (isOpen) setIsOpen(false);
      return;
    }
    // On home, smooth scroll to the section
    scrollToSection(item.id);
  };

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Desktop pill: logo + nav + auth inside one container */}
          <div className="hidden md:block w-full">
            <div className="rounded-full bg-gray-500/40 backdrop-blur-md border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-4 py-2 md:px-6 md:py-3">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                  <img 
                    src="/images/logo.png" 
                    alt="Logo" 
                    className="h-12 w-auto smartchem-logo"
                  />
                </Link>

                {/* Right group: Nav + Auth */}
                <div className="ml-auto flex items-center gap-3">
                  {/* Nav */}
                  <ul className="flex items-center gap-0">
                    {navItems.map((item) => (
                      <li key={item.path}>
                        <button
                          onClick={() => handleNavClick(item)}
                        className={`px-4 h-12 flex items-center justify-center font-bold text-[1.1rem] transition-all duration-300 ease-out transform rounded-full ${
                            isActive(item.path)
                            ? 'text-[#F7941D] -translate-y-0.5'
                            : 'text-white hover:text-[#F7941D] hover:-translate-y-0.5'
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Auth */}
                  {isAuthenticated ? (
                    <div className="flex items-center space-x-3">
                      <Link to="/dashboard">
                      <Button variant="ghost" size="sm" className="text-white hover:text-[#F7941D]">
                          Dashboard
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={handleLogout}
                      className="text-white hover:text-red-500"
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Link to="/login">
                    <Button className="bg-[#F7941D] hover:bg-[#dc7f12] text-white px-5 py-2 rounded-full">
                        Student Login
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu button (right aligned) */}
          <div className="md:hidden flex w-full justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.path}
onClick={() => handleNavClick(item)}
                className={`block w-full text-left px-3 py-2 rounded-md text-[1.05rem] font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-[#F7941D]'
                    : 'text-white hover:text-[#F7941D]'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-gray-700">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-white hover:text-yellow-500"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block px-3 py-2 text-white hover:text-red-500 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 bg-yellow-600 text-white text-center rounded-md"
                >
                  Student Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;