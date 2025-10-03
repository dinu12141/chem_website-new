import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { 
  Mail, 
  Phone, 
  User, 
  Clock, 
  CheckCircle, 
  XCircle,
  Trash2,
  RefreshCw,
  BookOpen,
  MessageCircle,
  Video,
  Plus,
  Edit,
  Save,
  X,
  Users,
  LogOut
} from 'lucide-react';
import axios from 'axios';
import PageBackground from '../components/PageBackground';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [courses, setCourses] = useState([]);
  const [telegramChannels, setTelegramChannels] = useState([]);
  const [videoLessons, setVideoLessons] = useState([]);
  const [users, setUsers] = useState([]); // Add users state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form states
  const [newCourse, setNewCourse] = useState({
    title: '', title_sinhala: '', description: '', year: '2025', type: 'Theory', 
    teacher_id: '', duration: '', schedule: ''
  });
  const [newTelegramChannel, setNewTelegramChannel] = useState({
    title: '', title_sinhala: '', description: '', member_count: '', 
    features: [], link: '', image: '', is_active: true
  });
  const [newVideoLesson, setNewVideoLesson] = useState({
    title: '', title_sinhala: '', description: '', video_url: '', 
    thumbnail: '', duration: '', course_id: '', is_published: true
  });
  
  // Edit states
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingTelegramChannel, setEditingTelegramChannel] = useState(null);
  const [editingVideoLesson, setEditingVideoLesson] = useState(null);

  // Add admin info state
  const [adminInfo, setAdminInfo] = useState(null);

  useEffect(() => {
    fetchData();
    fetchAdminInfo();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      switch (activeTab) {
        case 'messages':
          const messagesRes = await axios.get(`${API}/support/messages`);
          setMessages(messagesRes.data);
          break;
        case 'classes':
          const coursesRes = await axios.get(`${API}/courses`);
          setCourses(coursesRes.data);
          break;
        case 'telegram':
          const telegramRes = await axios.get(`${API}/telegram/channels`);
          setTelegramChannels(telegramRes.data);
          break;
        case 'videos':
          const videosRes = await axios.get(`${API}/video-lessons`);
          setVideoLessons(videosRes.data);
          break;
        case 'users': // Add users case
          const usersRes = await axios.get(`${API}/admin/users`);
          setUsers(usersRes.data);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error fetching ${activeTab}:`, error);
      setError(`Failed to fetch ${activeTab}`);
    } finally {
      setLoading(false);
    }
  };

  // Add function to fetch admin info
  const fetchAdminInfo = async () => {
    try {
      const adminToken = sessionStorage.getItem('adminToken');
      if (!adminToken) {
        navigate('/admin/login');
        return;
      }

      const response = await fetch(`${API}/auth/admin/me`, {
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
      });

      if (!response.ok) {
        sessionStorage.removeItem('adminToken');
        sessionStorage.removeItem('isAdmin');
        navigate('/admin/login');
        return;
      }

      const data = await response.json();
      setAdminInfo(data);
    } catch (error) {
      console.error('Error fetching admin info:', error);
      sessionStorage.removeItem('adminToken');
      sessionStorage.removeItem('isAdmin');
      navigate('/admin/login');
    }
  };

  // Support Message Functions
  const resolveMessage = async (messageId) => {
    try {
      await axios.put(`${API}/support/messages/${messageId}/resolve`);
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, is_resolved: !msg.is_resolved } : msg
      ));
    } catch (error) {
      console.error('Error resolving message:', error);
      alert('Failed to resolve message');
    }
  };

  const deleteMessage = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }
    
    try {
      await axios.delete(`${API}/support/messages/${messageId}`);
      setMessages(messages.filter(msg => msg.id !== messageId));
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message');
    }
  };

  // Course Functions
  const createCourse = async () => {
    try {
      const response = await axios.post(`${API}/courses`, newCourse);
      setCourses([...courses, response.data]);
      setNewCourse({
        title: '', title_sinhala: '', description: '', year: '2025', type: 'Theory', 
        teacher_id: '', duration: '', schedule: ''
      });
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course');
    }
  };

  const updateCourse = async () => {
    try {
      const response = await axios.put(`${API}/courses/${editingCourse.id}`, editingCourse);
      setCourses(courses.map(course => 
        course.id === editingCourse.id ? response.data : course
      ));
      setEditingCourse(null);
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to update course');
    }
  };

  const deleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }
    
    try {
      await axios.delete(`${API}/courses/${courseId}`);
      setCourses(courses.filter(course => course.id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course');
    }
  };

  // Telegram Channel Functions
  const createTelegramChannel = async () => {
    try {
      const response = await axios.post(`${API}/telegram/channels`, newTelegramChannel);
      setTelegramChannels([...telegramChannels, response.data]);
      setNewTelegramChannel({
        title: '', title_sinhala: '', description: '', member_count: '', 
        features: [], link: '', image: '', is_active: true
      });
    } catch (error) {
      console.error('Error creating Telegram channel:', error);
      alert('Failed to create Telegram channel');
    }
  };

  const updateTelegramChannel = async () => {
    try {
      const response = await axios.put(`${API}/telegram/channels/${editingTelegramChannel.id}`, editingTelegramChannel);
      setTelegramChannels(telegramChannels.map(channel => 
        channel.id === editingTelegramChannel.id ? response.data : channel
      ));
      setEditingTelegramChannel(null);
    } catch (error) {
      console.error('Error updating Telegram channel:', error);
      alert('Failed to update Telegram channel');
    }
  };

  const deleteTelegramChannel = async (channelId) => {
    if (!window.confirm('Are you sure you want to delete this Telegram channel?')) {
      return;
    }
    
    try {
      await axios.delete(`${API}/telegram/channels/${channelId}`);
      setTelegramChannels(telegramChannels.filter(channel => channel.id !== channelId));
    } catch (error) {
      console.error('Error deleting Telegram channel:', error);
      alert('Failed to delete Telegram channel');
    }
  };

  // Video Lesson Functions
  const createVideoLesson = async () => {
    try {
      const response = await axios.post(`${API}/video-lessons`, newVideoLesson);
      setVideoLessons([...videoLessons, response.data]);
      setNewVideoLesson({
        title: '', title_sinhala: '', description: '', video_url: '', 
        thumbnail: '', duration: '', course_id: '', is_published: true
      });
    } catch (error) {
      console.error('Error creating video lesson:', error);
      alert('Failed to create video lesson');
    }
  };

  const updateVideoLesson = async () => {
    try {
      const response = await axios.put(`${API}/video-lessons/${editingVideoLesson.id}`, editingVideoLesson);
      setVideoLessons(videoLessons.map(lesson => 
        lesson.id === editingVideoLesson.id ? response.data : lesson
      ));
      setEditingVideoLesson(null);
    } catch (error) {
      console.error('Error updating video lesson:', error);
      alert('Failed to update video lesson');
    }
  };

  const deleteVideoLesson = async (lessonId) => {
    if (!window.confirm('Are you sure you want to delete this video lesson?')) {
      return;
    }
    
    try {
      await axios.delete(`${API}/video-lessons/${lessonId}`);
      setVideoLessons(videoLessons.filter(lesson => lesson.id !== lessonId));
    } catch (error) {
      console.error('Error deleting video lesson:', error);
      alert('Failed to delete video lesson');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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

  // Update admin logout function
  const handleAdminLogout = async () => {
    try {
      const adminToken = sessionStorage.getItem('adminToken');
      if (adminToken) {
        // Optionally call backend logout endpoint
        await fetch(`${API}/auth/admin/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
          },
        }).catch(() => {
          // Ignore errors during logout
        });
      }
    } finally {
      // Clear admin session storage
      sessionStorage.removeItem('isAdmin');
      sessionStorage.removeItem('adminToken');
      // Navigate to admin login page
      navigate('/admin/login');
    }
  };

  if (loading && activeTab === 'messages') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden">
        <PageBackground />
        <div className="text-white relative z-10">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 relative">
      <PageBackground />
      <div className="relative z-10 p-4 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            {adminInfo && (
              <p className="text-gray-400 mt-1">
                Welcome, {adminInfo.username} ({adminInfo.email})
              </p>
            )}
          </div>
          <Button 
            onClick={handleAdminLogout}
            variant="outline"
            className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
        
        <div className="max-w-7xl mx-auto">
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-700">
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === 'messages'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Support Messages
            </button>
            <button
              onClick={() => setActiveTab('classes')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === 'classes'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <BookOpen className="w-4 h-4 inline mr-2" />
              Classes
            </button>
            <button
              onClick={() => setActiveTab('telegram')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === 'telegram'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Telegram Channels
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === 'videos'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Video className="w-4 h-4 inline mr-2" />
              Video Lessons
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === 'users'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Users
            </button>
          </div>

          {/* Refresh Button */}
          <div className="mb-6 flex justify-end">
            <Button
              onClick={fetchData}
              disabled={loading}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-6">
              <p className="text-red-500">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <RefreshCw className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
          ) : (
            <>
              {/* Users Tab */}
              {activeTab === 'users' && (
                <div className="space-y-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Registered Users
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-gray-300">
                          <thead className="text-xs uppercase bg-gray-700">
                            <tr>
                              <th className="px-4 py-3">Register Number</th>
                              <th className="px-4 py-3">Full Name</th>
                              <th className="px-4 py-3">Email</th>
                              <th className="px-4 py-3">Phone</th>
                              <th className="px-4 py-3">WhatsApp</th>
                              <th className="px-4 py-3">ID Number</th>
                              <th className="px-4 py-3">A/L Year</th>
                              <th className="px-4 py-3">School</th>
                              <th className="px-4 py-3">Registered</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((user) => (
                              <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-750">
                                <td className="px-4 py-3 font-medium text-white">{user.register_number}</td>
                                <td className="px-4 py-3">{user.full_name}</td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3">{user.phone_number}</td>
                                <td className="px-4 py-3">{user.whatsapp_number || 'N/A'}</td>
                                <td className="px-4 py-3">{user.id_number}</td>
                                <td className="px-4 py-3">{user.al_year}</td>
                                <td className="px-4 py-3">{user.school_name}</td>
                                <td className="px-4 py-3">
                                  {new Date(user.created_at).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {users.length === 0 && (
                        <div className="text-center py-8 text-gray-400">
                          No users registered yet
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Messages Tab */}
              {activeTab === 'messages' && (
                <div>
                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-sm">Total Messages</p>
                            <p className="text-2xl font-bold text-white">{messages.length}</p>
                          </div>
                          <Mail className="w-8 h-8 text-yellow-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-sm">Pending</p>
                            <p className="text-2xl font-bold text-white">
                              {messages.filter(msg => !msg.is_resolved).length}
                            </p>
                          </div>
                          <Clock className="w-8 h-8 text-yellow-500" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-400 text-sm">Resolved</p>
                            <p className="text-2xl font-bold text-white">
                              {messages.filter(msg => msg.is_resolved).length}
                            </p>
                          </div>
                          <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Messages List */}
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white">Customer Messages</h2>
                    
                    {messages.length === 0 ? (
                      <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-8 text-center">
                          <Mail className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-gray-400 mb-2">No messages yet</h3>
                          <p className="text-gray-500">Customer messages will appear here when they are sent.</p>
                        </CardContent>
                      </Card>
                    ) : (
                      messages.map((message) => (
                        <Card 
                          key={message.id} 
                          className={`bg-gray-800 border-gray-700 ${message.is_resolved ? 'opacity-75' : ''}`}
                        >
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="text-white flex items-center">
                                  <Mail className="w-5 h-5 mr-2 text-yellow-500" />
                                  {message.subject}
                                  {message.is_resolved && (
                                    <Badge variant="secondary" className="ml-3 bg-green-600 text-white">
                                      Resolved
                                    </Badge>
                                  )}
                                </CardTitle>
                                <p className="text-gray-400 text-sm mt-1">
                                  From {message.name} • {formatDate(message.created_at)}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                {!message.is_resolved ? (
                                  <Button
                                    onClick={() => resolveMessage(message.id)}
                                    variant="outline"
                                    size="sm"
                                    className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Resolve
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() => resolveMessage(message.id)}
                                    variant="outline"
                                    size="sm"
                                    className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                                  >
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Reopen
                                  </Button>
                                )}
                                <Button
                                  onClick={() => deleteMessage(message.id)}
                                  variant="outline"
                                  size="sm"
                                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center text-gray-300">
                                <User className="w-4 h-4 mr-2 text-gray-400" />
                                <span>{message.name}</span>
                              </div>
                              <div className="flex items-center text-gray-300">
                                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                <a 
                                  href={`mailto:${message.email}`} 
                                  className="text-yellow-500 hover:text-yellow-400"
                                >
                                  {message.email}
                                </a>
                              </div>
                              {message.phone && (
                                <div className="flex items-center text-gray-300">
                                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                  <a 
                                    href={`tel:${message.phone}`} 
                                    className="text-yellow-500 hover:text-yellow-400"
                                  >
                                    {message.phone}
                                  </a>
                                </div>
                              )}
                            </div>
                            
                            <div className="bg-gray-900 rounded-lg p-4">
                              <p className="text-gray-300 whitespace-pre-wrap">{message.message}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Classes Tab */}
              {activeTab === 'classes' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Manage Classes</h2>
                    <Button 
                      onClick={() => setNewCourse({
                        title: '', title_sinhala: '', description: '', year: '2025', type: 'Theory', 
                        teacher_id: '', duration: '', schedule: ''
                      })}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Class
                    </Button>
                  </div>

                  {/* Add/Edit Course Form */}
                  {(Object.values(newCourse).some(val => val !== '') || editingCourse) && (
                    <Card className="bg-gray-800 border-gray-700 mb-6">
                      <CardHeader>
                        <CardTitle className="text-white">
                          {editingCourse ? 'Edit Class' : 'Add New Class'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            placeholder="Title"
                            value={editingCourse ? editingCourse.title : newCourse.title}
                            onChange={(e) => editingCourse 
                              ? setEditingCourse({...editingCourse, title: e.target.value})
                              : setNewCourse({...newCourse, title: e.target.value})
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          <Input
                            placeholder="Title (Sinhala)"
                            value={editingCourse ? editingCourse.title_sinhala : newCourse.title_sinhala}
                            onChange={(e) => editingCourse 
                              ? setEditingCourse({...editingCourse, title_sinhala: e.target.value})
                              : setNewCourse({...newCourse, title_sinhala: e.target.value})
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          <Input
                            placeholder="Year"
                            value={editingCourse ? editingCourse.year : newCourse.year}
                            onChange={(e) => editingCourse 
                              ? setEditingCourse({...editingCourse, year: e.target.value})
                              : setNewCourse({...newCourse, year: e.target.value})
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          <Input
                            placeholder="Type"
                            value={editingCourse ? editingCourse.type : newCourse.type}
                            onChange={(e) => editingCourse 
                              ? setEditingCourse({...editingCourse, type: e.target.value})
                              : setNewCourse({...newCourse, type: e.target.value})
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          <Input
                            placeholder="Teacher ID"
                            value={editingCourse ? editingCourse.teacher_id : newCourse.teacher_id}
                            onChange={(e) => editingCourse 
                              ? setEditingCourse({...editingCourse, teacher_id: e.target.value})
                              : setNewCourse({...newCourse, teacher_id: e.target.value})
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          <Input
                            placeholder="Duration"
                            value={editingCourse ? editingCourse.duration : newCourse.duration}
                            onChange={(e) => editingCourse 
                              ? setEditingCourse({...editingCourse, duration: e.target.value})
                              : setNewCourse({...newCourse, duration: e.target.value})
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          <Input
                            placeholder="Schedule"
                            value={editingCourse ? editingCourse.schedule : newCourse.schedule}
                            onChange={(e) => editingCourse 
                              ? setEditingCourse({...editingCourse, schedule: e.target.value})
                              : setNewCourse({...newCourse, schedule: e.target.value})
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <Textarea
                          placeholder="Description"
                          value={editingCourse ? editingCourse.description : newCourse.description}
                          onChange={(e) => editingCourse 
                            ? setEditingCourse({...editingCourse, description: e.target.value})
                            : setNewCourse({...newCourse, description: e.target.value})
                          }
                          className="mt-4 bg-gray-700 border-gray-600 text-white"
                        />
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setEditingCourse(null);
                              setNewCourse({
                                title: '', title_sinhala: '', description: '', year: '2025', type: 'Theory', 
                                teacher_id: '', duration: '', schedule: ''
                              });
                            }}
                            className="border-gray-600 text-gray-300"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                          <Button
                            onClick={editingCourse ? updateCourse : createCourse}
                            className="bg-yellow-600 hover:bg-yellow-700"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            {editingCourse ? 'Update' : 'Create'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Courses List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <Card key={course.id} className="bg-gray-800 border-gray-700">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-white text-lg">{course.title}</CardTitle>
                            <Badge className={getTypeColor(course.type)}>
                              {course.type}
                            </Badge>
                          </div>
                          <p className="text-yellow-500 font-medium">{course.title_sinhala}</p>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Year:</span>
                              <span className="text-white">{course.year}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Duration:</span>
                              <span className="text-white">{course.duration}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Schedule:</span>
                              <span className="text-white">{course.schedule}</span>
                            </div>
                          </div>

                          <div className="flex justify-end space-x-2 mt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingCourse(course)}
                              className="border-gray-600 text-gray-300"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteCourse(course.id)}
                              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Telegram Tab */}
              {activeTab === 'telegram' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Manage Telegram Channels</h2>
                    <Button 
                      onClick={() => setNewTelegramChannel({
                        title: '', title_sinhala: '', description: '', member_count: '', 
                        features: [], link: '', image: '', is_active: true
                      })}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Channel
                    </Button>
                  </div>

                  {/* Add/Edit Telegram Channel Form */}
                  {(Object.values(newTelegramChannel).some(val => val !== '') || editingTelegramChannel) && (
                    <Card className="bg-gray-800 border-gray-700 mb-6">
                      <CardHeader>
                        <CardTitle className="text-white">
                          {editingTelegramChannel ? 'Edit Telegram Channel' : 'Add New Telegram Channel'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            placeholder="Title"
                            value={editingTelegramChannel ? editingTelegramChannel.title : newTelegramChannel.title}
                            onChange={(e) => editingTelegramChannel 
                              ? setEditingTelegramChannel({...editingTelegramChannel, title: e.target.value})
                              : setNewTelegramChannel({...newTelegramChannel, title: e.target.value})
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          <Input
                            placeholder="Title (Sinhala)"
                            value={editingTelegramChannel ? editingTelegramChannel.title_sinhala : newTelegramChannel.title_sinhala}
                            onChange={(e) => editingTelegramChannel 
                              ? setEditingTelegramChannel({...editingTelegramChannel, title_sinhala: e.target.value})
                              : setNewTelegramChannel({...newTelegramChannel, title_sinhala: e.target.value})
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          <Input
                            placeholder="Member Count"
                            value={editingTelegramChannel ? editingTelegramChannel.member_count : newTelegramChannel.member_count}
                            onChange={(e) => editingTelegramChannel 
                              ? setEditingTelegramChannel({...editingTelegramChannel, member_count: e.target.value})
                              : setNewTelegramChannel({...newTelegramChannel, member_count: e.target.value})
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          <Input
                            placeholder="Link"
                            value={editingTelegramChannel ? editingTelegramChannel.link : newTelegramChannel.link}
                            onChange={(e) => editingTelegramChannel 
                              ? setEditingTelegramChannel({...editingTelegramChannel, link: e.target.value})
                              : setNewTelegramChannel({...newTelegramChannel, link: e.target.value})
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          <Input
                            placeholder="Image URL"
                            value={editingTelegramChannel ? editingTelegramChannel.image : newTelegramChannel.image}
                            onChange={(e) => editingTelegramChannel 
                              ? setEditingTelegramChannel({...editingTelegramChannel, image: e.target.value})
                              : setNewTelegramChannel({...newTelegramChannel, image: e.target.value})
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <Textarea
                          placeholder="Description"
                          value={editingTelegramChannel ? editingTelegramChannel.description : newTelegramChannel.description}
                          onChange={(e) => editingTelegramChannel 
                            ? setEditingTelegramChannel({...editingTelegramChannel, description: e.target.value})
                            : setNewTelegramChannel({...newTelegramChannel, description: e.target.value})
                          }
                          className="mt-4 bg-gray-700 border-gray-600 text-white"
                        />
                        <div className="flex items-center space-x-2 mt-4">
                          <input
                            type="checkbox"
                            id="is_active"
                            checked={editingTelegramChannel ? editingTelegramChannel.is_active : newTelegramChannel.is_active}
                            onChange={(e) => editingTelegramChannel 
                              ? setEditingTelegramChannel({...editingTelegramChannel, is_active: e.target.checked})
                              : setNewTelegramChannel({...newTelegramChannel, is_active: e.target.checked})
                            }
                            className="rounded bg-gray-700 border-gray-600 text-yellow-600"
                          />
                          <label htmlFor="is_active" className="text-white">Active</label>
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setEditingTelegramChannel(null);
                              setNewTelegramChannel({
                                title: '', title_sinhala: '', description: '', member_count: '', 
                                features: [], link: '', image: '', is_active: true
                              });
                            }}
                            className="border-gray-600 text-gray-300"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                          <Button
                            onClick={editingTelegramChannel ? updateTelegramChannel : createTelegramChannel}
                            className="bg-yellow-600 hover:bg-yellow-700"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            {editingTelegramChannel ? 'Update' : 'Create'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Telegram Channels List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {telegramChannels.map((channel) => (
                      <Card key={channel.id} className="bg-gray-800 border-gray-700">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-white text-lg">{channel.title}</CardTitle>
                            <Badge variant={channel.is_active ? 'default' : 'secondary'} className={channel.is_active ? 'bg-green-600' : 'bg-gray-600'}>
                              {channel.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <p className="text-yellow-500 font-medium">{channel.title_sinhala}</p>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{channel.description}</p>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Members:</span>
                              <span className="text-white">{channel.member_count}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Link:</span>
                              <a href={channel.link} target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 truncate">
                                {channel.link}
                              </a>
                            </div>
                          </div>

                          <div className="flex justify-end space-x-2 mt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingTelegramChannel(channel)}
                              className="border-gray-600 text-gray-300"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteTelegramChannel(channel.id)}
                              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Video Lessons Tab */}
              {activeTab === 'videos' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Manage Video Lessons</h2>
                    <Button 
                      onClick={() => setNewVideoLesson({
                        title: '', title_sinhala: '', description: '', video_url: '', 
                        thumbnail: '', duration: '', course_id: '', is_published: true
                      })}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Video
                    </Button>
                  </div>

                  {/* Add/Edit Video Lesson Form */}
                  {(Object.values(newVideoLesson).some(val => val !== '') || editingVideoLesson) && (
                    <Card className="bg-gray-800 border-gray-700 mb-6">
                      <CardHeader>
                        <CardTitle className="text-white">
                          {editingVideoLesson ? 'Edit Video Lesson' : 'Add New Video Lesson'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            placeholder="Title"
                            value={editingVideoLesson ? editingVideoLesson.title : newVideoLesson.title}
                            onChange={(e) => editingVideoLesson 
                              ? setEditingVideoLesson({...editingVideoLesson, title: e.target.value})
                              : setNewVideoLesson({...newVideoLesson, title: e.target.value})
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          <Input
                            placeholder="Title (Sinhala)"
                            value={editingVideoLesson ? editingVideoLesson.title_sinhala : newVideoLesson.title_sinhala}
                            onChange={(e) => editingVideoLesson 
                              ? setEditingVideoLesson({...editingVideoLesson, title_sinhala: e.target.value})
                              : setNewVideoLesson({...newVideoLesson, title_sinhala: e.target.value})
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          <Input
                            placeholder="Video URL"
                            value={editingVideoLesson ? editingVideoLesson.video_url : newVideoLesson.video_url}
                            onChange={(e) => editingVideoLesson 
                              ? setEditingVideoLesson({...editingVideoLesson, video_url: e.target.value})
                              : setNewVideoLesson({...newVideoLesson, video_url: e.target.value})
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          <Input
                            placeholder="Thumbnail URL"
                            value={editingVideoLesson ? editingVideoLesson.thumbnail : newVideoLesson.thumbnail}
                            onChange={(e) => editingVideoLesson 
                              ? setEditingVideoLesson({...editingVideoLesson, thumbnail: e.target.value})
                              : setNewVideoLesson({...newVideoLesson, thumbnail: e.target.value})
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          <Input
                            placeholder="Duration"
                            value={editingVideoLesson ? editingVideoLesson.duration : newVideoLesson.duration}
                            onChange={(e) => editingVideoLesson 
                              ? setEditingVideoLesson({...editingVideoLesson, duration: e.target.value})
                              : setNewVideoLesson({...newVideoLesson, duration: e.target.value})
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                          <Input
                            placeholder="Course ID"
                            value={editingVideoLesson ? editingVideoLesson.course_id : newVideoLesson.course_id}
                            onChange={(e) => editingVideoLesson 
                              ? setEditingVideoLesson({...editingVideoLesson, course_id: e.target.value})
                              : setNewVideoLesson({...newVideoLesson, course_id: e.target.value})
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <Textarea
                          placeholder="Description"
                          value={editingVideoLesson ? editingVideoLesson.description : newVideoLesson.description}
                          onChange={(e) => editingVideoLesson 
                            ? setEditingVideoLesson({...editingVideoLesson, description: e.target.value})
                            : setNewVideoLesson({...newVideoLesson, description: e.target.value})
                          }
                          className="mt-4 bg-gray-700 border-gray-600 text-white"
                        />
                        <div className="flex items-center space-x-2 mt-4">
                          <input
                            type="checkbox"
                            id="is_published"
                            checked={editingVideoLesson ? editingVideoLesson.is_published : newVideoLesson.is_published}
                            onChange={(e) => editingVideoLesson 
                              ? setEditingVideoLesson({...editingVideoLesson, is_published: e.target.checked})
                              : setNewVideoLesson({...newVideoLesson, is_published: e.target.checked})
                            }
                            className="rounded bg-gray-700 border-gray-600 text-yellow-600"
                          />
                          <label htmlFor="is_published" className="text-white">Published</label>
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setEditingVideoLesson(null);
                              setNewVideoLesson({
                                title: '', title_sinhala: '', description: '', video_url: '', 
                                thumbnail: '', duration: '', course_id: '', is_published: true
                              });
                            }}
                            className="border-gray-600 text-gray-300"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                          <Button
                            onClick={editingVideoLesson ? updateVideoLesson : createVideoLesson}
                            className="bg-yellow-600 hover:bg-yellow-700"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            {editingVideoLesson ? 'Update' : 'Create'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Video Lessons List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videoLessons.map((lesson) => (
                      <Card key={lesson.id} className="bg-gray-800 border-gray-700">
                        <div className="relative h-40">
                          <img 
                            src={lesson.thumbnail || '/images/placeholder-video.jpg'} 
                            alt={lesson.title}
                            className="w-full h-full object-cover rounded-t-lg"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {lesson.duration}
                          </div>
                        </div>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-white text-lg">{lesson.title}</CardTitle>
                            <Badge variant={lesson.is_published ? 'default' : 'secondary'} className={lesson.is_published ? 'bg-green-600' : 'bg-gray-600'}>
                              {lesson.is_published ? 'Published' : 'Draft'}
                            </Badge>
                          </div>
                          <p className="text-yellow-500 font-medium">{lesson.title_sinhala}</p>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{lesson.description}</p>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Course ID:</span>
                              <span className="text-white truncate max-w-[100px]">{lesson.course_id}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Video:</span>
                              <a href={lesson.video_url} target="_blank" rel="noopener noreferrer" className="text-yellow-500 hover:text-yellow-400 truncate max-w-[100px]">
                                View
                              </a>
                            </div>
                          </div>

                          <div className="flex justify-end space-x-2 mt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingVideoLesson(lesson)}
                              className="border-gray-600 text-gray-300"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteVideoLesson(lesson.id)}
                              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;