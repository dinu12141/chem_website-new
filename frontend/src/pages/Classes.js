import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  Users, 
  MapPin,
  Star,
  Filter
} from 'lucide-react';
import axios from 'axios';
import PageBackground from '../components/PageBackground';
import Reveal from '../components/Reveal';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Classes = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, selectedYear, selectedType]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API}/courses`);
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = courses;
    
    if (selectedYear !== 'all') {
      filtered = filtered.filter(course => course.year === selectedYear);
    }
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(course => course.type === selectedType);
    }
    
    setFilteredCourses(filtered);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Theory':
        return 'bg-blue-600 text-white';
      case 'Revision':
        return 'bg-green-600 text-white';
      case 'SPEEDY':
        return 'bg-red-600 text-white';
      default:
        return 'bg-orange-600 text-white';
    }
  };

  const physicalClassesInfo = [
    {
      location: "Kalutara Rasanayā",
      day: "Sunday",
      time: "8:00 AM - 12:00 PM"
    },
    {
      location: "Nugegoda Siyochem",
      day: "Saturday",
      time: "2:00 PM - 6:00 PM"
    },
    {
      location: "Galle Sadharan",
      day: "Sunday",
      time: "9:00 AM - 1:00 PM"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
        <PageBackground />
        <div className="text-white relative z-10">Loading courses...</div>
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Classes
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose from our comprehensive range of Chemistry classes designed for A/L success
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
                  <span className="text-white font-medium">Filter Classes:</span>
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
                    variant={selectedType === 'Theory' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType('Theory')}
                    className={selectedType === 'Theory' ? 'bg-orange-600 hover:bg-orange-700' : 'border-gray-600 text-gray-300'}
                  >
                    Theory
                  </Button>
                  <Button
                    variant={selectedType === 'Revision' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType('Revision')}
                    className={selectedType === 'Revision' ? 'bg-orange-600 hover:bg-orange-700' : 'border-gray-600 text-gray-300'}
                  >
                    Revision
                  </Button>
                  <Button
                    variant={selectedType === 'SPEEDY' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType('SPEEDY')}
                    className={selectedType === 'SPEEDY' ? 'bg-orange-600 hover:bg-orange-700' : 'border-gray-600 text-gray-300'}
                  >
                    SPEEDY
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="bg-gray-800 border-gray-700 hover:border-orange-500 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-white text-lg">{course.title}</CardTitle>
                  <Badge className={getTypeColor(course.type)}>
                    {course.type}
                  </Badge>
                </div>
                <p className="text-orange-500 font-medium">{course.title_sinhala}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">{course.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                    <span className="text-sm">Year: {course.year}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="w-4 h-4 mr-2 text-orange-500" />
                    <span className="text-sm">Duration: {course.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Users className="w-4 h-4 mr-2 text-orange-500" />
                    <span className="text-sm">Schedule: {course.schedule}</span>
                  </div>
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more courses.</p>
          </div>
        )}

        {/* Physical Classes Information */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Physical Class Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {physicalClassesInfo.map((classInfo, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{classInfo.location}</h3>
                  <p className="text-gray-400 mb-1">{classInfo.day}</p>
                  <p className="text-orange-500 font-medium">{classInfo.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-400 mb-4">
              New students must register at the institution during the first month
            </p>
            <p className="text-orange-500 font-medium">
              Contact: +94 71 746 2205 for more information
            </p>
          </div>
        </div>

        {/* Teacher Section */}
        <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-orange-500">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  නදීක වර්ණකුල – Online Classes (CHEMISTRY)
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-orange-100">
                    <Star className="w-5 h-5 mr-2" />
                    <span>B.SC. ENGINEERING (HON'S) UNIVERSITY OF MORATUWA</span>
                  </div>
                  <div className="flex items-center text-orange-100">
                    <BookOpen className="w-5 h-5 mr-2" />
                    <span>Advanced Level Chemistry Specialist</span>
                  </div>
                  <div className="flex items-center text-orange-100">
                    <Users className="w-5 h-5 mr-2" />
                    <span>8+ Years Teaching Experience</span>
                  </div>
                </div>
                <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
                  View Teacher Profile
                </Button>
              </div>
              
              <div className="text-center lg:text-right">
                <img 
                  src="/images/teacher-main.jpg" 
                  alt="NADEEKA Warnakula Sir" 
                  className="w-48 h-48 rounded-full object-cover mx-auto lg:ml-auto border-4 border-white/20"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Classes;