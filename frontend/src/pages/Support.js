import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  HelpCircle,
  BookOpen,
  UserCheck,
  Video,
  CheckCircle,
  Send
} from 'lucide-react';
import PageBackground from '../components/PageBackground';
import Reveal from '../components/Reveal';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send message to backend
      await axios.post(`${API}/support/messages`, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message
      });
      
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      // Show error message to user
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: "How to Login to LMS?",
      answer: "Use your register number (format: SC2025XXX) and password to login. If you forgot your password, contact support."
    },
    {
      question: "How to make Payments?",
      answer: "Payments can be made through bank transfer or mobile payment. Contact us for payment details and confirmation."
    },
    {
      question: "How to join a Classroom and view Documents?",
      answer: "After registration, access your dashboard to view available classes. Click 'Enroll' to join and access study materials."
    },
    {
      question: "How to watch Video classes?",
      answer: "Video classes are available through our Telegram channels and student dashboard. Join the relevant channel for your A/L year."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-16 relative overflow-hidden">
      <PageBackground />
      <div className="px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <Reveal>
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Support
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're here to help! Get assistance with classes, technical support, or any questions about Nadeeka Warnakula
          </p>
        </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-orange-500" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-600 rounded-full p-2">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Address</h3>
                    <p className="text-gray-400">Monaragala, Sri Lanka</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-600 rounded-full p-2">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <a href="mailto:nadeeka.warnakula@gmail.com" className="text-orange-500 hover:text-orange-400">
                      nadeeka.warnakula@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-600 rounded-full p-2">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Phone</h3>
                    <a href="tel:+94717462205" className="text-orange-500 hover:text-orange-400">
                      +94 71 746 2205
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-orange-600 rounded-full p-2">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Support Hours</h3>
                    <p className="text-gray-400">Monday - Sunday: 8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Support Options */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <a href="tel:+94717462205">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now: +94 71 746 2205
                  </Button>
                </a>
                
                <a href="mailto:nadeeka.warnakula@gmail.com">
                  <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </a>

                <a href="/telegram">
                  <Button variant="outline" className="w-full border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Join Telegram Channels
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {submitSuccess && (
                  <Alert className="mb-6 border-green-500 bg-green-500/10">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <AlertDescription className="text-green-500">
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What can we help you with?"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe your question or issue in detail..."
                      rows={5}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3 mb-3">
                    <HelpCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <h3 className="text-white font-semibold">{faq.question}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Help Desk */}
        <Card className="mt-16 bg-gradient-to-r from-orange-600 to-orange-700 border-orange-500">
          <CardContent className="p-8 text-center">
            <UserCheck className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Immediate Help?
            </h2>
            <p className="text-orange-100 text-lg mb-6">
              Our help desk is available to assist you with any urgent issues
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+94717462205">
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Help Desk
                </Button>
              </a>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                <BookOpen className="w-5 h-5 mr-2" />
                Privacy Policy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Support;