import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Loader2, User, Lock, Phone } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    registerNumber: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginMethod, setLoginMethod] = useState('register'); // 'phone' or 'register'
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (loginMethod === 'phone') {
      // For phone number login, we'll need to modify the backend to support this
      // For now, we'll simulate the login process
      if (!formData.phoneNumber || !formData.password) {
        setError('Please enter both phone number and password');
        setLoading(false);
        return;
      }
      
      // Simulate API call
      setTimeout(() => {
        // For demo purposes, we'll just navigate to dashboard
        // In a real app, you would verify credentials with backend
        navigate('/dashboard');
        setLoading(false);
      }, 1500);
    } else {
      // Register number login
      if (!formData.registerNumber || !formData.password) {
        setError('Please enter both register number and password');
        setLoading(false);
        return;
      }
      
      const result = await login(formData.registerNumber, formData.password);
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error);
      }
      
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <Link to="/">
            <img 
              src="/images/logo.png" 
              alt="Nadeeka Warnakula Logo" 
              className="h-16 w-auto mx-auto mb-4 cursor-pointer"
            />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
          <p className="text-gray-400">Login as a Student</p>
        </div>

        <Card className="bg-gray-800 border-gray-700 relative overflow-visible">
          {/* Lighting effects around the box */}
          <div className="absolute -inset-1 bg-yellow-500/20 rounded-xl blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -inset-1 bg-orange-500/10 rounded-xl blur-2xl opacity-50"></div>
          <div className="absolute -inset-0.5 bg-yellow-400/30 rounded-xl blur-lg opacity-40"></div>
          <div className="relative bg-gray-800 border-gray-700 rounded-xl">
            <CardHeader>
              <CardTitle className="text-white text-center">Student Login</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Login method toggle */}
              <div className="flex mb-4 bg-gray-700 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setLoginMethod('phone')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    loginMethod === 'phone' 
                      ? 'bg-orange-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Phone Login
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('register')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    loginMethod === 'register' 
                      ? 'bg-orange-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Register Number
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert className="border-red-500 bg-red-500/10">
                    <AlertDescription className="text-red-500">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {loginMethod === 'phone' ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="text-white">
                        Phone Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          required
                          value={formData.phoneNumber || ''}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                          className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="registerNumber" className="text-white">
                        Register Number
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="registerNumber"
                          name="registerNumber"
                          type="text"
                          required
                          value={formData.registerNumber}
                          onChange={handleChange}
                          placeholder="Enter your register number (e.g., SC2025001)"
                          className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                          className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <div className="mt-6 space-y-4">
                <div className="text-center">
                  <Link 
                    to="/forgot-password" 
                    className="text-orange-500 hover:text-orange-400 text-sm"
                  >
                    Forgot Password?
                  </Link>
                </div>
                
                <div className="text-center text-gray-400">
                  <span>New Student? </span>
                  <Link 
                    to="/register" 
                    className="text-orange-500 hover:text-orange-400 font-medium"
                  >
                    Sign up
                  </Link>
                </div>
                
                <div className="text-center">
                  <Link 
                    to="/privacy-policy" 
                    className="text-gray-500 hover:text-gray-400 text-xs"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm mb-2">Need help with login?</p>
          <Link 
            to="/support" 
            className="text-orange-500 hover:text-orange-400 text-sm font-medium"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;