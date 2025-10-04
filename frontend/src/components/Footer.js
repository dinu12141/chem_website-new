import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-16">
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Link to="/">
                <img 
                  src="/images/logo.png" 
                  alt="Nadeeka Warnakula Logo" 
                  className="h-10 w-auto"
                />
              </Link>
              <div className="text-2xl font-bold text-yellow-500">
                Nadeeka Warnakula
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Sri Lanka's Chemistry Brand - Chemistry නම් Chemistry
            </p>
            <p className="text-gray-400 text-sm">
              නදීක වර්ණකුල (NADEEKA Warnakula) - Advanced Level Chemistry Specialist
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/our-story" className="block text-gray-400 hover:text-yellow-500 transition-colors">
                Our Story
              </Link>
              <Link to="/classes" className="block text-gray-400 hover:text-yellow-500 transition-colors">
                Classes
              </Link>
              <Link to="/testimonials" className="block text-gray-400 hover:text-yellow-500 transition-colors">
                Testimonials
              </Link>
              <Link to="/telegram" className="block text-gray-400 hover:text-yellow-500 transition-colors">
                Telegram
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4 text-yellow-500" />
                <a 
                  href="https://maps.google.com/?q=Monaragala,Sri+Lanka" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-yellow-500 transition-colors"
                >
                  Monaragala
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-4 h-4 text-yellow-500" />
                <a 
                  href="mailto:nadeeka.warnakula@gmail.com" 
                  className="hover:text-yellow-500 transition-colors"
                >
                  nadeeka.warnakula@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-4 h-4 text-yellow-500" />
                <a 
                  href="tel:+94717462205" 
                  className="hover:text-yellow-500 transition-colors"
                >
                  +94 71 746 2205
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-center items-center">
          <div className="text-gray-400 text-sm">
          </div>
          <div className="text-gray-400 text-sm mt-4 md:mt-0">
            Designed by Dinusha M Rathnayake
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;