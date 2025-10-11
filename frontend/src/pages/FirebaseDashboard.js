import React, { useEffect, useState } from 'react';
import { useFirebaseAuth } from '../contexts/FirebaseAuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  CreditCard, 
  School, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  Bell,
  TrendingUp,
  Target,
  Clock,
  Award,
  FileText,
  Download,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import PageBackground from '../components/PageBackground';
import Reveal from '../components/Reveal';

const FirebaseDashboard = () => {
  const { user, isAuthenticated } = useFirebaseAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState({
    completedLessons: 12,
    totalLessons: 24,
    upcomingExams: 3,
    studyHours: 28
  });
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchDashboardData();
    }
  }, [isAuthenticated, user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch user data from Firestore
      const usersSnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', user.email)));
      if (!usersSnapshot.empty) {
        const userData = { id: usersSnapshot.docs[0].id, ...usersSnapshot.docs[0].data() };
        setUserData(userData);
        
        // Fetch announcements for user's A/L year
        const announcementsSnapshot = await getDocs(
          query(
            collection(db, 'announcements'), 
            where('target_year', '==', userData.al_year),
            where('is_active', '==', true)
          )
        );
        const announcementsData = announcementsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAnnouncements(announcementsData.slice(0, 5));
        
        // Fetch courses
        const coursesSnapshot = await getDocs(
          query(
            collection(db, 'courses'), 
            where('year', '==', userData.al_year),
            where('is_active', '==', true)
          )
        );
        const coursesData = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourses(coursesData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
        <PageBackground />
        <div className="text-white relative z-10">Loading...</div>
      </div>
    );
  }

  // Calculate progress percentage
  const progressPercentage = Math.round((progressData.completedLessons / progressData.totalLessons) * 100);

  return (
    <div className="min-h-screen bg-gray-900 py-8 relative overflow-hidden">
      <PageBackground />
      <div className="px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Welcome Header */}
        <Reveal>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome, {userData?.full_name}!
          </h1>
          <p className="text-gray-400">
            Your Nadeeka Warnakula Dashboard - Track your progress and stay updated
          </p>
        </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Student Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800 border-gray-700 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="w-5 h-5 mr-2 text-orange-500" />
                  Student Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{userData?.full_name}</h3>
                  <p className="text-orange-500 font-mono text-lg">{userData?.register_number}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Mail className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-sm">{userData?.email}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <Phone className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-sm">{userData?.phone_number}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <CreditCard className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-sm">{userData?.id_number}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <School className="w-4 h-4 mr-3 text-gray-400" />
                    <span className="text-sm">{userData?.school_name}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <GraduationCap className="w-4 h-4 mr-3 text-gray-400" />
                    <Badge variant="secondary" className="bg-orange-600 text-white">
                      A/L {userData?.al_year}
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-500">
                    Member since: {userData?.created_at ? new Date(userData.created_at.toDate()).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-orange-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Courses
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 flex items-center justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Download Materials
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 flex items-center justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Class Schedule
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 flex items-center justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  My Achievements
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Completed Lessons</p>
                      <p className="text-2xl font-bold text-white">{progressData.completedLessons}/{progressData.totalLessons}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{progressPercentage}% Complete</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Study Hours</p>
                      <p className="text-2xl font-bold text-white">{progressData.studyHours}</p>
                    </div>
                    <Clock className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Upcoming Exams</p>
                      <p className="text-2xl font-bold text-white">{progressData.upcomingExams}</p>
                    </div>
                    <XCircle className="w-8 h-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Your Year</p>
                      <p className="text-2xl font-bold text-white">{userData?.al_year}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Available Courses */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-orange-500" />
                  Available Courses for A/L {userData?.al_year}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <div 
                        key={course.id} 
                        className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-semibold">{course.title}</h4>
                          <Badge 
                            variant="outline" 
                            className={`${
                              course.type === 'Theory' ? 'border-blue-500 text-blue-400' :
                              course.type === 'Revision' ? 'border-green-500 text-green-400' :
                              course.type === 'SPEEDY' ? 'border-red-500 text-red-400' :
                              'border-orange-500 text-orange-400'
                            }`}
                          >
                            {course.type}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{course.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            {course.duration} • {course.schedule}
                          </span>
                          <Button size="sm" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                            Enroll
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400">No courses available for your year yet.</p>
                      <p className="text-gray-500 text-sm">Check back later for updates!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Announcements */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-orange-500" />
                  Recent Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {announcements.length > 0 ? (
                    announcements.map((announcement) => (
                      <div 
                        key={announcement.id} 
                        className="border-l-4 border-orange-500 bg-gray-700 pl-4 py-3 rounded-r-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium">{announcement.title}</h4>
                          <Badge 
                            variant="outline" 
                            className={`${
                              announcement.type === 'urgent' ? 'border-red-500 text-red-400' :
                              announcement.type === 'exam' ? 'border-yellow-500 text-yellow-400' :
                              'border-orange-500 text-orange-400'
                            } text-xs`}
                          >
                            {announcement.type.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">{announcement.content}</p>
                        <p className="text-gray-500 text-xs">
                          {announcement.created_at ? new Date(announcement.created_at.toDate()).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400">No recent announcements.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseDashboard;