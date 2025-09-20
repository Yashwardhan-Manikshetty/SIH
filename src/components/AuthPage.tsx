import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // Merged from ui_changes2
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// AgrowHeader from ui_changes2, assuming it's a desired global header
import { AgrowHeader } from './AgrowHeader'; 
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { User, Phone, MapPin, Building, ArrowRight, LogIn, UserPlus } from 'lucide-react';

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

  // --- Submit Handlers (from main, updated with translations) ---
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
          phone: registerData.phone.trim() || undefined,
          crop_preferences: registerData.crop_preferences
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

  // --- Toggle Login/Register Mode (from main) ---
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50"> {/* Retained main's gradient */}
      {/* AgrowHeader from ui_changes2 branch */}
      <AgrowHeader showLanguageSelector={true} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {isLogin ? t('auth.login.title') : t('auth.register.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {isLogin ? t('auth.login.subtitle') : t('auth.register.subtitle')}
          </p>
          {!isLogin && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                {t('auth.register.alertMessage')}
              </p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Card */}
          <Card className="shadow-lg"> {/* From main's styling */}
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                {isLogin
                  ? <><LogIn className="mr-3 h-6 w-6 text-green-600" />{t('auth.login.formTitle')}</>
                  : <><UserPlus className="mr-3 h-6 w-6 text-green-600" />{t('auth.register.formTitle')}</>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {errors.general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{errors.general}</p>
                </div>
              )}

              {isLogin ? (
                <form onSubmit={handleLoginSubmit} className="space-y-6"> {/* Wrapped in form */}
                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="loginUsername" className="text-sm font-medium">{t('auth.fields.username')} *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="loginUsername"
                        type="text"
                        placeholder={t('auth.login.placeholders.username')}
                        value={loginData.username}
                        onChange={e => handleLoginInputChange('username', e.target.value)}
                        className={`pl-10 ${errors.username ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="loginPassword" className="text-sm font-medium">{t('auth.fields.password')} *</Label>
                    <Input
                      id="loginPassword"
                      type="password"
                      placeholder={t('auth.login.placeholders.password')}
                      value={loginData.password}
                      onChange={e => handleLoginInputChange('password', e.target.value)}
                      className={errors.password ? 'border-red-500' : ''}
                    />
                    {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                  </div>

                  <Button
                    type="submit" // Added type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-lg bg-green-600 hover:bg-green-700"
                  >
                    {isLoading ? t('auth.general.signingIn') : t('auth.login.button')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-6"> {/* Wrapped in form */}
                  {/* Registration Inputs */}
                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="registerUsername" className="text-sm font-medium">{t('auth.fields.username')} *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="registerUsername"
                        type="text"
                        placeholder={t('auth.register.placeholders.username')}
                        value={registerData.username}
                        onChange={e => handleRegisterInputChange('username', e.target.value)}
                        className={`pl-10 ${errors.username ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="registerEmail" className="text-sm font-medium">{t('auth.fields.email')} *</Label>
                    <Input
                      id="registerEmail"
                      type="email"
                      placeholder={t('auth.register.placeholders.email')}
                      value={registerData.email}
                      onChange={e => handleRegisterInputChange('email', e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="registerPhone" className="text-sm font-medium">{t('auth.fields.phone')} *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="registerPhone"
                        type="tel"
                        placeholder={t('auth.register.placeholders.phone')}
                        value={registerData.phone}
                        onChange={e => handleRegisterInputChange('phone', e.target.value)}
                        className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword" className="text-sm font-medium">{t('auth.fields.password')} *</Label>
                    <Input
                      id="registerPassword"
                      type="password"
                      placeholder={t('auth.register.placeholders.password')}
                      value={registerData.password}
                      onChange={e => handleRegisterInputChange('password', e.target.value)}
                      className={errors.password ? 'border-red-500' : ''}
                    />
                    {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">{t('auth.fields.confirmPassword')} *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder={t('auth.register.placeholders.confirmPassword')}
                      value={registerData.confirmPassword}
                      onChange={e => handleRegisterInputChange('confirmPassword', e.target.value)}
                      className={errors.confirmPassword ? 'border-red-500' : ''}
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>

                  {/* State Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="registerState" className="text-sm font-medium">{t('auth.fields.state')} *</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                      <Select
                        value={registerData.state}
                        onValueChange={(value) => {
                          handleRegisterInputChange('state', value);
                          handleRegisterInputChange('city', ''); // Reset city when state changes
                        }}
                      >
                        <SelectTrigger className={`pl-10 ${errors.state ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder={t('auth.register.placeholders.state')} />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.state && <p className="text-sm text-red-600">{errors.state}</p>}
                  </div>
                  {/* City Selection (from main) */}
                  <div className="space-y-2">
                    <Label htmlFor="registerCity" className="text-sm font-medium">{t('auth.fields.city')} *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
                      <Select
                        value={registerData.city}
                        onValueChange={(value) => handleRegisterInputChange('city', value)}
                        disabled={!registerData.state}
                      >
                        <SelectTrigger className={`pl-10 ${errors.city ? 'border-red-500' : ''}`}>
                          <SelectValue placeholder={registerData.state ? t('auth.register.placeholders.city') : t('auth.register.placeholders.selectStateFirst')} />
                        </SelectTrigger>
                        <SelectContent>
                          {registerData.state && cities[registerData.state as keyof typeof cities]?.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.city && <p className="text-sm text-red-600">{errors.city}</p>}
                  </div>

                  {/* Crop Preferences (from main, uncommented) */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">{t('auth.fields.cropPreferences')}</Label>
                    <div className="flex flex-wrap gap-2">
                      {cropOptions.map(crop => (
                        <Button
                          key={crop}
                          type="button" // Important for buttons not to trigger form submit
                          variant={registerData.crop_preferences.includes(crop) ? 'default' : 'outline'}
                          onClick={() => toggleCropPreference(crop)}
                          className="text-sm"
                        >
                          {crop}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit" // Added type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-lg bg-green-600 hover:bg-green-700"
                  >
                    {isLoading ? t('auth.general.registering') : t('auth.register.button')} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              )}

              {/* Toggle Mode */}
              <div className="mt-6 text-center">
                <p className="text-gray-600">{isLogin ? t('auth.login.switchText') : t('auth.register.switchText')}</p>
                <Button variant="link" onClick={toggleMode} className="text-green-600 hover:text-green-700">
                  {isLogin ? t('auth.register.link') : t('auth.login.link')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info Card (from main, updated with translations) */}
          <Card className="shadow-lg bg-gradient-to-br from-green-50 to-green-100"> {/* From main's styling */}
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                {t('auth.info.title')}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0"> {/* Adjusted color to match new gradient */}
                    <User className="h-6 w-6 text-green-600" /> {/* Adjusted color */}
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
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-green-600" />
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
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building className="h-6 w-6 text-green-600" />
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

              <div className="mt-8 p-4 bg-green-100 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  {t('auth.info.note')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};