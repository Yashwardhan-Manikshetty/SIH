import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Merged from ui_changes2
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
// AgrowHeader from ui_changes2, assuming it's a desired global header
import { AgrowHeader } from './AgrowHeader'; 
import { useLanguage } from '@/contexts/LanguageContext';
import { UnifiedHeader } from './UnifiedHeader';
import { User, Phone, MapPin, Building, ArrowRight } from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: () => void;
}

export const AuthPage = ({ onLoginSuccess }: AuthPageProps) => {
  const { t } = useLanguage();
  const { login, register } = useAuth(); // Merged: both login and register from main
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // From main

  // State for login form (from main)
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  // State for registration form (from main)
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    state: '',
    city: ''
    city: '', // Changed from district in ui_changes2 to city in main
    crop_preferences: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // State and city data (using main's city structure)
  const states = [
    { value: 'Punjab', label: 'Punjab' },
    { value: 'Maharashtra', label: 'Maharashtra' }
  ];

  const cities = { // Using main's more comprehensive city list
    Punjab: [
      'Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib',
      'Firozpur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala',
      'Ludhiana', 'Mansa', 'Moga', 'Muktsar', 'Patiala', 'Rupnagar',
      'Sahibzada Ajit Singh Nagar', 'Sangrur', 'Tarn Taran' // Added SAS Nagar from ui_changes2 for completeness
    ],
    Maharashtra: [
      'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara',
      'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli',
      'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban',
      'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar',
      'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara',
      'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'
    ]
  };

  const cropOptions = ['wheat', 'rice', 'sugarcane', 'cotton', 'maize', 'soybean', 'bajra', 'jowar', 'groundnut', 'sunflower', 'mustard', 'barley'];

  // --- Input Handlers (from main) ---
  const handleLoginInputChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleRegisterInputChange = (field: string, value: string) => {
    setRegisterData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };


  // --- Form Validation (from main, updated with translations) ---
  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {};
    if (!loginData.username.trim()) newErrors.username = t('auth.login.errors.usernameRequired');
    if (!loginData.password.trim()) newErrors.password = t('auth.login.errors.passwordRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = () => {
    const newErrors: Record<string, string> = {};
    const { username, email, password, confirmPassword, phone, state, city } = registerData;

    if (!username.trim()) newErrors.username = t('auth.register.errors.usernameRequired');
    if (!email.trim()) newErrors.email = t('auth.register.errors.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = t('auth.register.errors.emailInvalid');
    if (!password.trim()) newErrors.password = t('auth.register.errors.passwordRequired');
    else if (password.length < 6) newErrors.password = t('auth.register.errors.passwordMinLength');
    if (!confirmPassword.trim()) newErrors.confirmPassword = t('auth.register.errors.confirmPasswordRequired');
    else if (password !== confirmPassword) newErrors.confirmPassword = t('auth.register.errors.passwordsMismatch');
    if (!phone.trim()) newErrors.phone = t('auth.register.errors.phoneRequired');
    else if (!/^\+?[\d\s-()]+$/.test(phone)) newErrors.phone = t('auth.register.errors.phoneInvalid');
    if (!state) newErrors.state = t('auth.register.errors.stateRequired');
    if (!city) newErrors.city = t('auth.register.errors.cityRequired');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});
    if (validateLoginForm()) {
      try {
        await login(loginData.username.trim(), loginData.password.trim());
        onLoginSuccess();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : t('auth.general.loginFailed');
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
          phone: registerData.phone.trim() || undefined
        };
        await register(payload);
        onLoginSuccess();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : t('auth.general.registrationFailed');
        setErrors({ general: errorMessage });
      }
    }
    setIsLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setLoginData({ username: '', password: '' });
    setRegisterData({
      username: '', email: '', password: '', confirmPassword: '',
      phone: '', state: '', city: ''
    });
    setErrors({});
  };

  return (
    <div>
      <UnifiedHeader
        showLanguageSelector={true}
        showVoiceAssistant={false}
        showDarkMode={true}
        showMobileMenu={true}
        variant="default"
      />

      <div
        className="min-h-screen relative bg-cover bg-center"
        style={{
          backgroundImage: "url('Farmmm.jpeg')",
        }}
      >
        {/* darker overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-100 mb-4">
              {isLogin ? 'Welcome Back' : 'Create Your Account'}
            </h1>
            <p className="text-xl text-gray-200">
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
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  {isLogin
                    ? <><LogIn className="mr-3 h-6 w-6 text-green-600" />Sign In</>
                    : <><UserPlus className="mr-3 h-6 w-6 text-green-600" />Create Account</>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLogin ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={loginData.username}
                        onChange={(e) => handleLoginInputChange('username', e.target.value)}
                      />
                      {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => handleLoginInputChange('password', e.target.value)}
                      />
                      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                    <p className="text-sm text-gray-600 mt-2">
                      Don't have an account?{' '}
                      <button type="button" className="text-green-600 hover:underline" onClick={toggleMode}>
                        Register
                      </button>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={registerData.username}
                        onChange={(e) => handleRegisterInputChange('username', e.target.value)}
                      />
                      {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={registerData.email}
                        onChange={(e) => handleRegisterInputChange('email', e.target.value)}
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={registerData.password}
                        onChange={(e) => handleRegisterInputChange('password', e.target.value)}
                      />
                      {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={(e) => handleRegisterInputChange('confirmPassword', e.target.value)}
                      />
                      {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={registerData.phone}
                        onChange={(e) => handleRegisterInputChange('phone', e.target.value)}
                      />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Select
                          onValueChange={(value) => handleRegisterInputChange('state', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((s) => (
                              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Select
                          onValueChange={(value) => handleRegisterInputChange('city', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {registerData.state &&
                              cities[registerData.state as keyof typeof cities].map((city) => (
                                <SelectItem key={city} value={city}>{city}</SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                      </div>
                    </div>
                    {errors.general && <p className="text-red-500 text-sm">{errors.general}</p>}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                    <p className="text-sm text-gray-600 mt-2">
                      Already have an account?{' '}
                      <button type="button" className="text-green-600 hover:underline" onClick={toggleMode}>
                        Sign In
                      </button>
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  {t('auth.info.title')}
                </h3>
                <ul className="space-y-4 text-gray-700">
                  <li>🌱 Personalized crop recommendations</li>
                  <li>📊 Real-time weather updates</li>
                  <li>💡 Expert tips for sustainable farming</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};