import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Star, Quote, Award, TrendingUp } from 'lucide-react';
import axios from 'axios';
import PageBackground from '../components/PageBackground';
import Reveal from '../components/Reveal';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${API}/testimonials`);
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`w-5 h-5 ${
          i < rating ? 'text-orange-500 fill-current' : 'text-gray-400'
        }`} 
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
        <PageBackground />
        <div className="text-white relative z-10">Loading testimonials...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-16 relative overflow-hidden">
      <PageBackground />
      <div className="px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <Reveal>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Testimonials
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            See what our students say about their success journey with Nadeeka Warnakula
          </p>
          <div className="flex justify-center items-center space-x-6 text-orange-500">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Best Results</p>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">District Champions</p>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 mx-auto mb-2 fill-current" />
              <p className="font-semibold">5-Star Rating</p>
            </div>
          </div>
        </div>
        </Reveal>

        {/* Hero Testimonial */}
        {testimonials.length > 0 && testimonials[0] && (
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-orange-500">
              <CardContent className="p-8 md:p-12 text-center">
                <Quote className="w-12 h-12 text-white/80 mx-auto mb-6" />
                <blockquote className="text-2xl md:text-3xl font-medium text-white mb-6 italic">
                  "{testimonials[0].content}"
                </blockquote>
                <div className="flex justify-center mb-4">
                  {renderStars(testimonials[0].rating)}
                </div>
                <div className="text-orange-100">
                  <p className="text-lg font-semibold">{testimonials[0].student_name}</p>
                  <p className="text-orange-200">{testimonials[0].school} - {testimonials[0].year}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Success Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Reveal delay={0}>
          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-500 mb-2">100+</div>
              <div className="text-gray-400">Happy Students</div>
            </CardContent>
          </Card>
          </Reveal>
          <Reveal delay={100}>
          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-500 mb-2">95%</div>
              <div className="text-gray-400">Success Rate</div>
            </CardContent>
          </Card>
          </Reveal>
          <Reveal delay={200}>
          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
              <div className="text-gray-400">District Champions</div>
            </CardContent>
          </Card>
          </Reveal>
          <Reveal delay={300}>
          <Card className="bg-gray-800 border-gray-700 text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-orange-500 mb-2">8+</div>
              <div className="text-gray-400">Years Experience</div>
            </CardContent>
          </Card>
          </Reveal>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(1).map((testimonial, index) => (
            <Reveal key={testimonial.id} delay={index * 120}>
              <Card className="bg-gray-800 border-gray-700 hover:border-orange-500 transition-colors">
                <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex">
                    {renderStars(testimonial.rating)}
                  </div>
                  {testimonial.is_featured && (
                    <Award className="w-5 h-5 text-orange-500" />
                  )}
                </div>
                
                <blockquote className="text-gray-300 mb-4 italic leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="border-t border-gray-700 pt-4">
                  <p className="text-white font-semibold">{testimonial.student_name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.school}</p>
                  <p className="text-orange-500 text-sm font-medium">A/L {testimonial.year}</p>
                </div>
              </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Empty State */}
        {testimonials.length === 0 && (
          <div className="text-center py-12">
            <Quote className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No testimonials yet</h3>
            <p className="text-gray-500">Check back later for student success stories!</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Want to Share Your Success Story?
              </h2>
              <p className="text-gray-400 mb-6">
                If you're a Nadeeka Warnakula student who achieved great results, we'd love to hear from you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:nadeeka.warnakula@gmail.com" 
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Share Your Story
                </a>
                <a 
                  href="/register" 
                  className="border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Join Nadeeka Warnakula
                </a>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classroom Images */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Our Learning Environment
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="/images/classroom1.jpg" 
                alt="Chemistry Classroom 1" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end">
                <p className="text-white p-4 font-medium">Interactive Learning Sessions</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="/images/classroom2.jpg" 
                alt="Chemistry Classroom 2" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end">
                <p className="text-white p-4 font-medium">Focused Study Environment</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="/images/classroom3.jpg" 
                alt="Chemistry Classroom 3" 
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end">
                <p className="text-white p-4 font-medium">Examination Preparation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;