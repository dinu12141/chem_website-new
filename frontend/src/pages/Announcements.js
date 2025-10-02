import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  Bell, 
  Calendar, 
  Filter, 
  AlertTriangle,
  BookOpen,
  Users,
  Clock
} from 'lucide-react';
import axios from 'axios';
import PageBackground from '../components/PageBackground';
import Reveal from '../components/Reveal';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = BACKEND_URL ? `${BACKEND_URL}/api` : null;

// Demo announcements (fallback when backend isn't configured)
const demoAnnouncements = [
  {
    id: 1,
    type: 'urgent',
    title: 'Power Cut Notice – Saturday Classes Rescheduled',
    content: 'Due to a scheduled power outage, Saturday evening theory class shifted to 7:30 PM via Telegram Live. Please be ready with your notes.',
    created_at: new Date().toISOString(),
    target_year: '2025',
  },
  {
    id: 2,
    type: 'exam',
    title: 'Monthly Paper – Section C Special',
    content: 'This month’s paper focuses on Organic Chemistry mechanisms with structured answers. Download pack and submit by Sunday.',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    target_year: '2024',
  },
  {
    id: 3,
    type: 'class',
    title: 'New Revision Batch Enrollment Open',
    content: 'Fast-track revision batch (SPEEDY) opens next week. Limited seats. Join to master past paper patterns and timing.',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    target_year: '2025',
  },
  {
    id: 4,
    type: 'general',
    title: 'Notes Update – Thermochemistry',
    content: 'Updated Thermochemistry short notes are available in the dashboard. Includes extra MCQ bank with explanations.',
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    target_year: null,
  },
];

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    filterAnnouncements();
  }, [announcements, selectedType, selectedYear]);

  const fetchAnnouncements = async () => {
    try {
      if (!API) {
        setAnnouncements(demoAnnouncements);
        return;
      }
      const response = await axios.get(`${API}/announcements`);
      setAnnouncements(response.data && response.data.length ? response.data : demoAnnouncements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setAnnouncements(demoAnnouncements);
    } finally {
      setLoading(false);
    }
  };

  const filterAnnouncements = () => {
    let filtered = announcements;
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(announcement => announcement.type === selectedType);
    }
    
    if (selectedYear !== 'all') {
      filtered = filtered.filter(announcement => 
        announcement.target_year === selectedYear || announcement.target_year === null
      );
    }
    
    setFilteredAnnouncements(filtered);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="w-4 h-4" />;
      case 'exam':
        return <BookOpen className="w-4 h-4" />;
      case 'class':
        return <Users className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-600 text-white';
      case 'exam':
        return 'bg-yellow-600 text-white';
      case 'class':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-orange-600 text-white';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
        <PageBackground />
        <div className="text-white relative z-10">Loading announcements...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-16 relative overflow-hidden">
      <PageBackground />
      <div className="px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <Reveal>
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-orange-600 rounded-full p-4">
              <Bell className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Announcements
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Stay updated with the latest news, class schedules, and important information from SMARTCHEM
          </p>
        </div>
        </Reveal>

        {/* Filters */}
        <div className="mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-orange-500" />
                  <span className="text-white font-medium">Filter Announcements:</span>
                </div>
                
                {/* Type Filter */}
                <div className="flex space-x-2">
                  <Button
                    variant={selectedType === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType('all')}
                    className={selectedType === 'all' ? 'bg-orange-600 hover:bg-orange-700' : 'border-gray-600 text-gray-300'}
                  >
                    All Types
                  </Button>
                  <Button
                    variant={selectedType === 'general' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType('general')}
                    className={selectedType === 'general' ? 'bg-orange-600 hover:bg-orange-700' : 'border-gray-600 text-gray-300'}
                  >
                    General
                  </Button>
                  <Button
                    variant={selectedType === 'urgent' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType('urgent')}
                    className={selectedType === 'urgent' ? 'bg-orange-600 hover:bg-orange-700' : 'border-gray-600 text-gray-300'}
                  >
                    Urgent
                  </Button>
                  <Button
                    variant={selectedType === 'exam' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType('exam')}
                    className={selectedType === 'exam' ? 'bg-orange-600 hover:bg-orange-700' : 'border-gray-600 text-gray-300'}
                  >
                    Exam
                  </Button>
                  <Button
                    variant={selectedType === 'class' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType('class')}
                    className={selectedType === 'class' ? 'bg-orange-600 hover:bg-orange-700' : 'border-gray-600 text-gray-300'}
                  >
                    Class
                  </Button>
                </div>

                {/* Year Filter */}
                <div className="flex space-x-2">
                  <Button
                    variant={selectedYear === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedYear('all')}
                    className={selectedYear === 'all' ? 'bg-orange-600 hover:bg-orange-700' : 'border-gray-600 text-gray-300'}
                  >
                    All Years
                  </Button>
                  <Button
                    variant={selectedYear === '2024' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedYear('2024')}
                    className={selectedYear === '2024' ? 'bg-orange-600 hover:bg-orange-700' : 'border-gray-600 text-gray-300'}
                  >
                    2024
                  </Button>
                  <Button
                    variant={selectedYear === '2025' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedYear('2025')}
                    className={selectedYear === '2025' ? 'bg-orange-600 hover:bg-orange-700' : 'border-gray-600 text-gray-300'}
                  >
                    2025
                  </Button>
                  <Button
                    variant={selectedYear === '2026' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedYear('2026')}
                    className={selectedYear === '2026' ? 'bg-orange-600 hover:bg-orange-700' : 'border-gray-600 text-gray-300'}
                  >
                    2026
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnnouncements.length > 0 ? (
            filteredAnnouncements.map((announcement, idx) => (
              <Reveal key={announcement.id} delay={idx * 120}>
                <Card className="bg-gray-800 border-gray-700 hover:border-orange-500 transition-colors h-full">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={`${getTypeColor(announcement.type)} flex items-center gap-1`}>
                        {getTypeIcon(announcement.type)}
                        {announcement.type.toUpperCase()}
                      </Badge>
                      {announcement.target_year && (
                        <Badge variant="outline" className="border-orange-500 text-orange-500">
                          A/L {announcement.target_year}
                        </Badge>
                      )}
                    </div>

                    <h2 className="text-xl font-bold text-white mb-2">
                      {announcement.title}
                    </h2>
                    {announcement.title_sinhala && (
                      <h3 className="text-lg text-orange-500 mb-3">
                        {announcement.title_sinhala}
                      </h3>
                    )}

                    <p className="text-gray-300 mb-4 leading-relaxed flex-1">
                      {announcement.content}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDate(announcement.created_at)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No announcements found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more announcements.</p>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-orange-500">
            <CardContent className="p-8">
              <Bell className="w-16 h-16 text-white mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Never Miss an Update
              </h2>
              <p className="text-orange-100 text-lg mb-6">
                Join our Telegram channels to get instant notifications for all announcements
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/telegram">
                  <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
                    Join Telegram Channels
                  </Button>
                </a>
                <a href="/register">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
                    Register as Student
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Announcements;