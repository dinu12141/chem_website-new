import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { BookOpen, Users, Award, MessageCircle } from 'lucide-react';
import ChemistryAnimations from '../components/ChemistryAnimations';
import ElementBadges from '../components/ElementBadges';
import axios from 'axios';
import Reveal from '../components/Reveal';
// Import the new Logo component
import Logo from '../components/Logo';
// Import components for each section
import OurStory from './OurStory';
import Classes from './Classes';
import Testimonials from './Testimonials';
import Telegram from './Telegram';
import Support from './Support';
import Announcements from './Announcements';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [stats, setStats] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [bgReady, setBgReady] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    // Staged hero load: background first, then content
    const bgTimer = setTimeout(() => setBgReady(true), 50);
    const heroTimer = setTimeout(() => setHeroReady(true), 700);
    
    const fetchData = async () => {
      try {
        const [statsRes, testimonialsRes, announcementsRes] = await Promise.all([
          axios.get(`${API}/stats`),
          axios.get(`${API}/testimonials/featured`),
          axios.get(`${API}/announcements`)
        ]);
        
        setStats(statsRes.data);
        setTestimonials(testimonialsRes.data.slice(0, 2));
        setAnnouncements(announcementsRes.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    return () => {
      clearTimeout(bgTimer);
      clearTimeout(heroTimer);
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with New Design */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-900">
        {/* Geometric Wireframe Background */}
        <div className={`absolute inset-0 z-0 ${bgReady ? 'hero-bg-in' : 'hero-bg-init'}`}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,165,0,0.05)_0%,rgba(0,0,0,0)_70%)]"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,165,0,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,165,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
          
          {/* Geometric polygons */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-yellow-900/20 rotate-45"></div>
          <div className="absolute top-1/3 right-1/3 w-48 h-48 border border-yellow-900/20 rotate-12"></div>
          <div className="absolute bottom-1/4 left-1/3 w-32 h-32 border border-yellow-900/20 rotate-45"></div>
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 border border-yellow-900/20 rotate-20"></div>
        </div>
        
        {/* Chemistry Animations Layer */}
        <ChemistryAnimations />
        
        {/* Animated Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/90 z-10"></div>
        
        <div className="relative z-20 px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left Side - Teacher Image Positioned to Left (Smaller) */}
            <div className={`w-full md:w-1/2 flex items-center justify-start ${heroReady ? 'load-in' : 'load-init'}`} style={{ transitionDelay: '200ms' }}>
              <div className="relative w-full max-w-xl ml-0">
                {/* Animated Orbs Around Teacher Image (Smaller) */}
                <div className="absolute -top-16 -left-16 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-16 left-16 w-40 h-40 bg-yellow-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/3 left-24 w-24 h-24 bg-yellow-400/30 rounded-full blur-2xl animate-ping delay-2000"></div>
                
                {/* Teacher Image Positioned to Left (Smaller) */}
                <div className="relative overflow-visible [perspective:800px]">
                  <img 
                    src="/images/background.png" 
                    alt="Teacher" 
                    className="w-full h-auto object-contain opacity-90 object-left"
                  />
                  <ElementBadges />
                </div>
              </div>
            </div>
            
            {/* Right Side - Logo, Name, and Buttons centered */}
            <div className={`w-full md:w-1/2 flex flex-col items-center justify-center py-16 ${heroReady ? 'load-in' : 'load-init'}`} style={{ transitionDelay: '400ms' }}>
              {/* Logo positioned above the name */}
              <div className="mb-8 flex justify-center">
                <Logo />
              </div>
              
              {/* Name text centered below the logo */}
              <div className="mb-12 text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 leading-tight">
                  Nadeeka{' '}
                  <span className="font-varella text-5xl md:text-7xl text-yellow-500" style={{ fontFamily: "'Varella Round', 'Segoe UI', sans-serif" }}>
                    වර්ණකුල
                  </span>
                </h1>
              </div>
              
              {/* CTA Buttons in Horizontal Row */}
              <div className="flex flex-row gap-4 justify-center w-full max-w-md">
                <Link to="/register">
                  <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 btn-enhanced flex-1">
                    Student Registration
                  </Button>
                </Link>
                <Link to="/classes">
                  <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-4 text-lg font-semibold transition-all duration-300 btn-enhanced flex-1">
                    View Classes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Stats Section */}
      {stats && (
        <section id="stats" className="py-16 bg-gray-800">
          <div className="px-4 sm:px-6 lg:px-8">
            <Reveal delay={0}>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Our Achievements
                </h2>
                <p className="text-gray-400 text-lg">
                  Building success through quality education
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <Reveal delay={200}>
                <div className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                  <Users className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-pulse" />
                  <div className="text-3xl font-bold text-white mb-2 counter-animation">250+</div>
                  <div className="text-gray-400">Active Students</div>
                </div>
              </Reveal>
              <Reveal delay={400}>
                <div className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                  <BookOpen className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-pulse" />
                  <div className="text-3xl font-bold text-white mb-2 counter-animation">12+</div>
                  <div className="text-gray-400">Available Courses</div>
                </div>
              </Reveal>
              <Reveal delay={600}>
                <div className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                  <Award className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-pulse" />
                  <div className="text-3xl font-bold text-white mb-2 counter-animation">7+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
              </Reveal>
              <Reveal delay={800}>
                <div className="bg-gray-900 rounded-lg p-6 hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                  <MessageCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-pulse" />
                  <div className="text-3xl font-bold text-white mb-2 counter-animation">3+</div>
                  <div className="text-gray-400">Recent Updates</div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* Recent Announcements */}
      {announcements.length > 0 && (
        <section id="announcements" className="py-16 bg-gray-800">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Latest Announcements
              </h2>
              <p className="text-gray-400 text-lg">
                Stay updated with the latest news and updates
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {announcements.map((announcement, idx) => (
                <Reveal key={announcement.id} delay={idx * 120}>
                  <Card className="bg-gray-900 border-gray-700 hover:border-yellow-500 transition-colors">
                    <CardContent className="p-6">
                    <div className="mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        announcement.type === 'urgent' ? 'bg-red-600 text-white' :
                        announcement.type === 'exam' ? 'bg-yellow-600 text-white' :
                        'bg-yellow-600 text-white'
                      }`}>
                        {announcement.type.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {announcement.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      {announcement.content.substring(0, 100)}...
                    </p>
                    <div className="text-xs text-gray-500">
                      {new Date(announcement.created_at).toLocaleDateString()}
                    </div>
                  </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link to="/announcements">
                <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white">
                  View All Announcements
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Testimonials */}
      {testimonials.length > 0 && (
        <section id="testimonials" className="py-16 bg-gray-900">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                See what our students say
              </h2>
              <p className="text-gray-400 text-lg">
                Real experiences from our successful students
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <Reveal key={testimonial.id} delay={index * 120}>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-500 text-xl">★</span>
                      ))}
                    </div>
                    <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                    <div className="text-sm">
                      <div className="text-white font-semibold">{testimonial.student_name}</div>
                      <div className="text-gray-400">{testimonial.school} - {testimonial.year}</div>
                    </div>
                  </CardContent>
                  </Card>
                </Reveal>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link to="/testimonials">
                <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white">
                  View All Testimonials
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Our Story Section */}
      <section id="our-story" className="py-16 bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
          </div>
          <div className="bg-gray-800 rounded-lg p-8">
            <OurStory />
          </div>
          <div className="text-center mt-8">
            <Link to="/our-story">
              <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white">
                View Full Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section id="classes" className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
          </div>
          <div className="bg-gray-900 rounded-lg p-8">
            <Classes />
          </div>
          <div className="text-center mt-8">
            <Link to="/classes">
              <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white">
                View All Classes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Telegram Section */}
      <section id="telegram" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
          </div>
          <div className="bg-gray-800 rounded-lg p-8">
            <Telegram />
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
          </div>
          <div className="bg-gray-900 rounded-lg p-8">
            <Support />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;