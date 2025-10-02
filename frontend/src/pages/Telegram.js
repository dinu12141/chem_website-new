import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  MessageCircle, 
  Users, 
  BookOpen, 
  FileText, 
  Video,
  Download,
  Bell,
  ExternalLink
} from 'lucide-react';
import PageBackground from '../components/PageBackground';
import Reveal from '../components/Reveal';

const Telegram = () => {
  const telegramChannels = [
    {
      id: 1,
      title: '2025 Theory',
      titleSinhala: '2025 න්‍යාය',
      description: 'Complete theory lessons and study materials for 2025 A/L Chemistry',
      memberCount: '1,500+',
      features: ['Video Lessons', 'Notes', 'Practice Questions', 'Live Q&A'],
      link: 'https://t.me/smartchem2025theory',
      image: '/images/classroom1.jpg',
      active: true
    },
    {
      id: 2,
      title: '2025 Revision',
      titleSinhala: '2025 පුනරාවර්තන',
      description: 'Intensive revision materials and past papers for 2025 batch',
      memberCount: '1,200+',
      features: ['Past Papers', 'Model Answers', 'Quick Notes', 'Tips & Tricks'],
      link: 'https://t.me/smartchem2025revision',
      image: '/images/classroom2.jpg',
      active: true
    },
    {
      id: 3,
      title: '2025 Paper',
      titleSinhala: '2025 ප්‍රශ්න පත්‍ර',
      description: 'Question papers, marking schemes and exam preparations',
      memberCount: '900+',
      features: ['Question Papers', 'Marking Schemes', 'Exam Tips', 'Time Management'],
      link: 'https://t.me/smartchem2025papers',
      image: '/images/classroom3.jpg',
      active: true
    },
    {
      id: 4,
      title: '2025 SPEEDY',
      titleSinhala: '2025 වේගවත්',
      description: 'Fast-track revision and last minute preparations',
      memberCount: '800+',
      features: ['Quick Revision', 'Important Points', 'Last Minute Tips', 'Speed Tests'],
      link: 'https://t.me/smartchem2025speedy',
      image: '/images/teacher-main.jpg',
      active: true
    },
    {
      id: 5,
      title: '2026 Theory',
      titleSinhala: '2026 න්‍යාය',
      description: 'Theory classes and materials for 2026 A/L batch',
      memberCount: '2,000+',
      features: ['Foundation Theory', 'Basic Concepts', 'Practice Sets', 'Doubt Clearing'],
      link: 'https://t.me/smartchem2026theory',
      image: '/images/classroom1.jpg',
      active: true
    },
    {
      id: 6,
      title: '2027 Theory',
      titleSinhala: '2027 න්‍යාය',
      description: 'Early preparation materials for 2027 A/L students',
      memberCount: '1,800+',
      features: ['Early Start', 'Foundation Building', 'Concept Clarity', 'Long-term Planning'],
      link: 'https://t.me/smartchem2027theory',
      image: '/images/classroom2.jpg',
      active: true
    }
  ];

  const benefits = [
    {
      icon: <Video className="w-6 h-6" />,
      title: 'Video Lessons',
      description: 'High-quality recorded lessons from Nadeeka Sir'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Study Materials',
      description: 'Comprehensive notes and practice questions'
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: 'Downloadable Content',
      description: 'All materials available for offline study'
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Instant Updates',
      description: 'Get notified about new content and announcements'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-16 relative overflow-hidden">
      <PageBackground />
      <div className="px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <Reveal>
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-4">
              <MessageCircle className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Telegram Channels
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join our Telegram channels for instant access to study materials, video lessons, and direct communication with Nadeeka Sir
          </p>
        </div>
        </Reveal>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 text-center">
              <CardContent className="p-6">
                <div className="text-orange-500 mb-4 flex justify-center">
                  {benefit.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Telegram Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {telegramChannels.map((channel) => (
            <Card key={channel.id} className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={channel.image} 
                  alt={channel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 text-white">
                    <Users className="w-3 h-3 mr-1" />
                    {channel.memberCount}
                  </Badge>
                </div>
                {channel.active && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-green-600 text-white">
                      <Bell className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div>
                    <h3 className="text-lg">{channel.title}</h3>
                    <p className="text-orange-500 text-base font-normal">{channel.titleSinhala}</p>
                  </div>
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-400 mb-4">{channel.description}</p>
                
                <div className="space-y-2 mb-6">
                  <p className="text-sm font-medium text-white">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {channel.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <a href={channel.link} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Join Channel
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How to Join Section */}
        <Card className="bg-gray-800 border-gray-700 mb-16">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl">
              How to Join Our Telegram Channels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-orange-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Download Telegram</h3>
                <p className="text-gray-400 text-sm">
                  Install Telegram app on your phone or computer from official app stores
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Click Join Channel</h3>
                <p className="text-gray-400 text-sm">
                  Click on the "Join Channel" button for your A/L year group
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="text-white font-semibold mb-2">Start Learning</h3>
                <p className="text-gray-400 text-sm">
                  Access study materials, video lessons, and interact with other students
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-orange-500">
          <CardContent className="p-8 text-center">
            <MessageCircle className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Need Help Joining?
            </h2>
            <p className="text-orange-100 text-lg mb-6">
              If you need assistance joining our Telegram channels, contact us directly
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+94717462205">
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
                  Call: +94 71 746 2205
                </Button>
              </a>
              <a href="mailto:smartchem@gmail.com">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                  Email: smartchem@gmail.com
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Telegram;