import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Phone, MapPin, Building, ArrowRight, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { UnifiedHeader } from './UnifiedHeader';

interface AuthPageProps {
  onLoginSuccess: () => void;
}

export const AuthPage = ({ onLoginSuccess }: AuthPageProps) => {
  const { t } = useLanguage();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    state: '',
    city: '',
    crop_preferences: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // States and cities
  const states = [
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Maharashtra', label: 'Maharashtra' }
  ];

  const cities = {
    Punjab: ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib', 'Firozpur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Mansa', 'Moga', 'Muktsar', 'Patiala', 'Rupnagar', 'Sangrur', 'Tarn Taran'],
    Maharashtra: ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal']
  };

  const cropOptions = ['wheat', 'rice', 'sugarcane', 'cotton', 'maize', 'soybean', 'bajra', 'jowar', 'groundnut', 'sunflower', 'mustard', 'barley'];

  // --- Input Handlers ---
  const handleLoginInputChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleRegisterInputChange = (field: string, value: string | string[]) => {
    setRegisterData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const toggleCropPreference = (crop: string) => {
    const current = registerData.crop_preferences;
    const updated = current.includes(crop)
      ? current.filter(c => c !== crop)
      : [...current, crop];
    handleRegisterInputChange('crop_preferences', updated);
  };

  // --- Form Validation ---
  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {};
    if (!loginData.username.trim()) newErrors.username = 'Username is required';
    if (!loginData.password.trim()) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = () => {
    const newErrors: Record<string, string> = {};
    const { username, email, password, confirmPassword, phone, state, city } = registerData;

    if (!username.trim()) newErrors.username = 'Username is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Confirm password is required';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\+?[\d\s-()]+$/.test(phone)) newErrors.phone = 'Phone number is invalid';
    if (!state) newErrors.state = 'State is required';
    if (!city) newErrors.city = 'City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Submit Handlers ---
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    if (validateLoginForm()) {
      try {
        await login(loginData.username.trim(), loginData.password.trim());
        onLoginSuccess();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Login failed. Please check your credentials.';
        setErrors({ general: errorMessage });
      }
    }
    setIsLoading(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    if (validateRegisterForm()) {
      try {
        const payload = {
          username: registerData.username.trim(),
          email: registerData.email.trim(),
          password: registerData.password,
          state: registerData.state || undefined,
          city: registerData.city || undefined,
          phone: registerData.phone.trim() || undefined,
          crop_preferences: registerData.crop_preferences
        };
        await register(payload);
        onLoginSuccess();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Registration failed. Please try again.';
        setErrors({ general: errorMessage });
      }
    }
    setIsLoading(false);
  };

  // --- Toggle Login/Register Mode ---
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setLoginData({ username: '', password: '' });
    setRegisterData({
      username: '', email: '', password: '', confirmPassword: '',
      phone: '', state: '', city: '', crop_preferences: []
    });
    setErrors({});
  };

  // --- JSX ---
  return (
    <div>
    <UnifiedHeader 
    showLanguageSelector={true}
    showVoiceAssistant={false}
    showDarkMode={true}
    showMobileMenu={true}
    variant="default"
  />
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isLogin ? 'Welcome Back' : 'Create Your Account'}
          </h1>
          <p className="text-xl text-gray-600">
            {isLogin ? 'Sign in to access your farming dashboard' : 'Join our farming community today'}
          </p>
          {!isLogin && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                Complete your registration to access personalized farming insights and recommendations.
              </p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                {isLogin
                  ? <><LogIn className="mr-3 h-6 w-6 text-green-600" />Sign In</>
                  : <><UserPlus className="mr-3 h-6 w-6 text-green-600" />Create Account</>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {errors.general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{errors.general}</p>
                </div>
              )}

              {isLogin ? (
                <div className="space-y-6">
                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="loginUsername" className="text-sm font-medium">Username *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="loginUsername"
                        type="text"
                        placeholder="Enter your username"
                        value={loginData.username}
                        onChange={e => handleLoginInputChange('username', e.target.value)}
                        className={`pl-10 ${errors.username ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="loginPassword" className="text-sm font-medium">Password *</Label>
                    <Input
                      id="loginPassword"
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={e => handleLoginInputChange('password', e.target.value)}
                      className={errors.password ? 'border-red-500' : ''}
                    />
                    {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                  </div>

                  <Button
                    onClick={handleLoginSubmit}
                    disabled={isLoading}
                    className="w-full h-12 text-lg bg-green-600 hover:bg-green-700"
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Registration Inputs */}
                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="registerUsername" className="text-sm font-medium">Username *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="registerUsername"
                        type="text"
                        placeholder="Choose a username"
                        value={registerData.username}
                        onChange={e => handleRegisterInputChange('username', e.target.value)}
                        className={`pl-10 ${errors.username ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="registerEmail" className="text-sm font-medium">Email *</Label>
                    <Input
                      id="registerEmail"
                      type="email"
                      placeholder="your.email@example.com"
                      value={registerData.email}
                      onChange={e => handleRegisterInputChange('email', e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="registerPhone" className="text-sm font-medium">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="registerPhone"
                        type="tel"
                        placeholder="+91 9876543210"
                        value={registerData.phone}
                        onChange={e => handleRegisterInputChange('phone', e.target.value)}
                        className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword" className="text-sm font-medium">Password *</Label>
                    <Input
                      id="registerPassword"
                      type="password"
                      placeholder="Create a password (min 6 characters)"
                      value={registerData.password}
                      onChange={e => handleRegisterInputChange('password', e.target.value)}
                      className={errors.password ? 'border-red-500' : ''}
                    />
                    {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={registerData.confirmPassword}
                      onChange={e => handleRegisterInputChange('confirmPassword', e.target.value)}
                      className={errors.confirmPassword ? 'border-red-500' : ''}
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>

                  {/* State Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="registerState" className="text-sm font-medium">State *</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                      <Select
                        value={registerData.state}
                        onValueChange={(value) => {
                          handleRegisterInputChange('state', value);
                          handleRegisterInputChange('city', '');
                        }}
                      >
                        <SelectTrigger className={`pl-10 ${errors.state ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.state && <p className="text-sm text-red-600">{errors.state}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerCity" className="text-sm font-medium">City *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                      <Select
                        value={registerData.city}
                        onValueChange={(value) => handleRegisterInputChange('city', value)}
                        disabled={!registerData.state}
                      >
                        <SelectTrigger className={`pl-10 ${errors.city ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                        <SelectContent>
                          {registerData.state && cities[registerData.state].map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
                  </div>
                {/* 
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Crop Preferences</Label>
                    <div className="flex flex-wrap gap-2">
                      {cropOptions.map(crop => (
                        <Button
                          key={crop}
                          variant={registerData.crop_preferences.includes(crop) ? 'default' : 'outline'}
                          onClick={() => toggleCropPreference(crop)}
                          className="text-sm"
                        >
                          {crop}
                        </Button>
                      ))}
                    </div>
                  </div> */}

                  <Button
                    onClick={handleRegisterSubmit}
                    disabled={isLoading}
                    className="w-full h-12 text-lg bg-green-600 hover:bg-green-700"
                  >
                    {isLoading ? 'Registering...' : 'Register'} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}

              {/* Toggle Mode */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
                <Button variant="link" onClick={toggleMode} className="text-green-600 hover:text-green-700">
                  {isLogin ? "Sign up here" : "Sign in here"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="shadow-lg bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
                {t('auth.info.title')}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {t('auth.info.personalized.title')}
                    </h4>
                    <p className="text-muted-foreground">
                      {t('auth.info.personalized.desc')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {t('auth.info.localized.title')}
                    </h4>
                    <p className="text-muted-foreground">
                      {t('auth.info.localized.desc')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {t('auth.info.regional.title')}
                    </h4>
                    <p className="text-muted-foreground">
                      {t('auth.info.regional.desc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  {t('auth.info.note')}
                </p>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
  );
};
