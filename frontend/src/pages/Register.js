import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Loader2, User, Mail, Phone, CreditCard, GraduationCap, School, Lock, CheckCircle, Send, Eye, EyeOff } from 'lucide-react';
import PageBackground from '../components/PageBackground';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    whatsappNumber: '',
    idNumber: '',
    alYear: '',
    schoolName: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation - Check if all fields are filled
    if (!formData.fullName) {
      setError('Please enter your full name');
      setLoading(false);
      return;
    }

    if (!formData.email) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    if (!formData.phoneNumber) {
      setError('Please enter your phone number');
      setLoading(false);
      return;
    }

    if (!formData.whatsappNumber) {
      setError('Please enter your WhatsApp number');
      setLoading(false);
      return;
    }

    if (!formData.idNumber) {
      setError('Please enter your ID number');
      setLoading(false);
      return;
    }

    if (!formData.alYear) {
      setError('Please select your A/L year');
      setLoading(false);
      return;
    }

    if (!formData.schoolName) {
      setError('Please enter your school name');
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError('Please enter a password');
      setLoading(false);
      return;
    }

    if (!formData.confirmPassword) {
      setError('Please confirm your password');
      setLoading(false);
      return;
    }

    // Additional validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // Map frontend field names to backend expected field names
    const registrationData = {
      full_name: formData.fullName,
      email: formData.email,
      phone_number: formData.phoneNumber,
      whatsapp_number: formData.whatsappNumber,
      id_number: formData.idNumber,
      al_year: formData.alYear,
      school_name: formData.schoolName,
      password: formData.password
    };
    
    const result = await register(registrationData);
    
    if (result.success) {
      setSuccess(result.data);
      setStep(2);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      alYear: value
    });
  };

  if (step === 2 && success) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <PageBackground />
        <div className="relative z-10">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              
              <h2 className="text-2xl font-bold text-white mb-4">
                Registration Successful!
              </h2>
              
              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-gray-300 mb-2">Welcome to Nadeeka Warnakula,</p>
                <p className="text-xl font-semibold text-orange-500 mb-3">
                  {success.student_name}
                </p>
                <p className="text-gray-300 mb-2">Your Register Number:</p>
                <p className="text-2xl font-bold text-white bg-gray-900 rounded px-4 py-2">
                  {success.register_number}
                </p>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-400 text-sm">
                  Please save your register number. You'll need it to login.
                </p>
                
                <div className="space-y-2">
                  <Button
                    onClick={() => navigate('/login')}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    Go to Login
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => navigate('/dashboard')}
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Continue to Dashboard
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <PageBackground />
      <div className="relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <Link to="/">
            <img 
              src="/images/logo.png" 
              alt="Nadeeka Warnakula Logo" 
              className="h-16 w-auto mx-auto mb-4 cursor-pointer"
            />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Sign Up</h1>
          <p className="text-gray-400">Create your student account</p>
          <p className="text-sm text-gray-500 mt-2">
            Use 8 or more characters with a mix of letters, numbers & symbols.
          </p>
        </div>

        <Card className="bg-gray-800 border-gray-700 max-w-2xl mx-auto relative overflow-visible">
          {/* Lighting effects around the box */}
          <div className="absolute -inset-1 bg-yellow-500/20 rounded-xl blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -inset-1 bg-orange-500/10 rounded-xl blur-2xl opacity-50"></div>
          <div className="absolute -inset-0.5 bg-yellow-400/30 rounded-xl blur-lg opacity-40"></div>
          <div className="relative bg-gray-800 border-gray-700 rounded-xl">
            <CardHeader>
              <CardTitle className="text-white text-center">Student Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert className="border-red-500 bg-red-500/10">
                    <AlertDescription className="text-red-500">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-white">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Number */}
                  <div className="space-y-2">
                    <Label htmlFor="whatsappNumber" className="text-white">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="whatsappNumber"
                        name="whatsappNumber"
                        type="tel"
                        required
                        value={formData.whatsappNumber}
                        onChange={handleChange}
                        placeholder="Enter your WhatsApp number"
                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* ID Number */}
                  <div className="space-y-2">
                    <Label htmlFor="idNumber" className="text-white">
                      National ID Number <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="idNumber"
                        name="idNumber"
                        type="text"
                        required
                        value={formData.idNumber}
                        onChange={handleChange}
                        placeholder="Enter your ID number"
                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* A/L Year */}
                  <div className="space-y-2">
                    <Label htmlFor="alYear" className="text-white">
                      A/L Year <span className="text-red-500">*</span>
                    </Label>
                    <Select onValueChange={handleSelectChange} required value={formData.alYear || ""}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <div className="flex items-center">
                          <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                          <SelectValue placeholder="Select your A/L year" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="2024" className="text-white hover:bg-gray-600">2024</SelectItem>
                        <SelectItem value="2025" className="text-white hover:bg-gray-600">2025</SelectItem>
                        <SelectItem value="2026" className="text-white hover:bg-gray-600">2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* School Name */}
                  <div className="space-y-2">
                    <Label htmlFor="schoolName" className="text-white">
                      School Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="schoolName"
                        name="schoolName"
                        type="text"
                        required
                        value={formData.schoolName}
                        onChange={handleChange}
                        placeholder="Enter your school name"
                        className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white">
                      Confirm Password <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading || !formData.fullName || !formData.email || !formData.phoneNumber || !formData.whatsappNumber || !formData.idNumber || !formData.alYear || !formData.schoolName || !formData.password || !formData.confirmPassword}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-gray-400">
                <span>Already have an Account? </span>
                <Link 
                  to="/login" 
                  className="text-orange-500 hover:text-orange-400 font-medium"
                >
                  Sign in
                </Link>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;