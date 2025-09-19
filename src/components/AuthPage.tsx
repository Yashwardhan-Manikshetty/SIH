import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UnifiedHeader } from './UnifiedHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { User, Phone, MapPin, Building, ArrowRight, LogIn, UserPlus } from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: () => void;
}

export const AuthPage = ({ onLoginSuccess }: AuthPageProps) => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(false); // Default to registration mode
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    mobileNo: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    mobileNo: '',
    password: '',
    confirmPassword: '',
    address: '',
    state: '',
    district: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // State and district data
  const states = [
    { value: 'punjab', label: 'Punjab' },
    { value: 'maharashtra', label: 'Maharashtra' }
  ];

  const districts = {
    punjab: [
      'Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib',
      'Firozpur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala',
      'Ludhiana', 'Mansa', 'Moga', 'Muktsar', 'Patiala', 'Rupnagar',
      'Sahibzada Ajit Singh Nagar', 'Sangrur', 'Tarn Taran'
    ],
    maharashtra: [
      'Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed', 'Bhandara',
      'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli',
      'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Mumbai City', 'Mumbai Suburban',
      'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Palghar',
      'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara',
      'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'
    ]
  };

  const handleLoginInputChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRegisterInputChange = (field: string, value: string) => {
    setRegisterData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {};

    if (!loginData.mobileNo.trim()) {
      newErrors.mobileNo = t('auth.errors.mobileRequired');
    } else if (!/^\d{10}$/.test(loginData.mobileNo)) {
      newErrors.mobileNo = t('auth.errors.mobileInvalid');
    }

    if (!loginData.password.trim()) {
      newErrors.password = t('auth.errors.passwordRequired');
    } else if (loginData.password.length < 6) {
      newErrors.password = t('auth.errors.passwordTooShort');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = () => {
    const newErrors: Record<string, string> = {};

    if (!registerData.name.trim()) {
      newErrors.name = t('auth.errors.nameRequired');
    }

    if (!registerData.mobileNo.trim()) {
      newErrors.mobileNo = t('auth.errors.mobileRequired');
    } else if (!/^\d{10}$/.test(registerData.mobileNo)) {
      newErrors.mobileNo = t('auth.errors.mobileInvalid');
    }

    if (!registerData.password.trim()) {
      newErrors.password = t('auth.errors.passwordRequired');
    } else if (registerData.password.length < 6) {
      newErrors.password = t('auth.errors.passwordTooShort');
    }

    if (!registerData.confirmPassword.trim()) {
      newErrors.confirmPassword = t('auth.errors.confirmPasswordRequired');
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = t('auth.errors.passwordsDoNotMatch');
    }

    if (!registerData.address.trim()) {
      newErrors.address = t('auth.errors.addressRequired');
    }

    if (!registerData.state) {
      newErrors.state = t('auth.errors.stateRequired');
    }

    if (!registerData.district) {
      newErrors.district = t('auth.errors.districtRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (validateLoginForm()) {
      try {
        // For now, simulate login with mobile number
        // In a real app, you'd call your backend API here
        const mockUser = {
          id: 1,
          username: loginData.mobileNo,
          email: `${loginData.mobileNo}@example.com`,
          is_active: true,
          state: 'Maharashtra', // Default state
          city: 'Pune', // Default city
          phone: loginData.mobileNo,
          crop_preferences: []
        };

        const mockToken = 'mock-jwt-token-' + Date.now();
        
        // Store in localStorage
        localStorage.setItem('auth_token', mockToken);
        localStorage.setItem('auth_user', JSON.stringify(mockUser));
        
        await login(mockUser);
        onLoginSuccess();
      } catch (error) {
        console.error('Login failed:', error);
        setErrors({ general: 'Login failed. Please try again.' });
      }
    }
    setIsLoading(false);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (validateRegisterForm()) {
      try {
        await login(registerData);
        onLoginSuccess();
      } catch (error) {
        console.error('Registration failed:', error);
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    }
    setIsLoading(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setLoginData({
      mobileNo: '',
      password: ''
    });
    setRegisterData({
      name: '',
      mobileNo: '',
      password: '',
      confirmPassword: '',
      address: '',
      state: '',
      district: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <UnifiedHeader 
        showLanguageSelector={true}
        showVoiceAssistant={false}
        showDarkMode={true}
        showMobileMenu={true}
        variant="dashboard"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {isLogin ? t('auth.login.title') : t('auth.register.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {isLogin ? t('auth.login.subtitle') : t('auth.register.subtitle')}
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
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                {isLogin ? (
                  <>
                    <LogIn className="mr-3 h-6 w-6 text-primary" />
                    {t('auth.login.formTitle')}
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-3 h-6 w-6 text-primary" />
                    {t('auth.register.formTitle')}
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* General Error Message */}
              {errors.general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">{errors.general}</p>
                </div>
              )}

              {isLogin ? (
                // Login Form
                <form onSubmit={handleLoginSubmit} className="space-y-6">
                  {/* Mobile Number Field */}
                  <div className="space-y-2">
                    <Label htmlFor="loginMobileNo" className="text-sm font-medium">
                      {t('auth.fields.mobileNo')} *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="loginMobileNo"
                        type="tel"
                        placeholder={t('auth.placeholders.mobileNo')}
                        value={loginData.mobileNo}
                        onChange={(e) => handleLoginInputChange('mobileNo', e.target.value)}
                        className={`pl-10 ${errors.mobileNo ? 'border-destructive' : ''}`}
                        maxLength={10}
                      />
                    </div>
                    {errors.mobileNo && (
                      <p className="text-sm text-destructive">{errors.mobileNo}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="loginPassword" className="text-sm font-medium">
                      Password *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="loginPassword"
                        type="password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => handleLoginInputChange('password', e.target.value)}
                        className={`pl-10 ${errors.password ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-lg bg-gradient-primary hover:opacity-90"
                  >
                    {isLoading ? 'Signing In...' : t('auth.login.button')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              ) : (
                // Registration Form
                <form onSubmit={handleRegisterSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="registerName" className="text-sm font-medium">
                      {t('auth.fields.name')} *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="registerName"
                        type="text"
                        placeholder={t('auth.placeholders.name')}
                        value={registerData.name}
                        onChange={(e) => handleRegisterInputChange('name', e.target.value)}
                        className={`pl-10 ${errors.name ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  {/* Mobile Number Field */}
                  <div className="space-y-2">
                    <Label htmlFor="registerMobileNo" className="text-sm font-medium">
                      {t('auth.fields.mobileNo')} *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="registerMobileNo"
                        type="tel"
                        placeholder={t('auth.placeholders.mobileNo')}
                        value={registerData.mobileNo}
                        onChange={(e) => handleRegisterInputChange('mobileNo', e.target.value)}
                        className={`pl-10 ${errors.mobileNo ? 'border-destructive' : ''}`}
                        maxLength={10}
                      />
                    </div>
                    {errors.mobileNo && (
                      <p className="text-sm text-destructive">{errors.mobileNo}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword" className="text-sm font-medium">
                      Password *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="registerPassword"
                        type="password"
                        placeholder="Create a password (min 6 characters)"
                        value={registerData.password}
                        onChange={(e) => handleRegisterInputChange('password', e.target.value)}
                        className={`pl-10 ${errors.password ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm Password *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={registerData.confirmPassword}
                        onChange={(e) => handleRegisterInputChange('confirmPassword', e.target.value)}
                        className={`pl-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                    )}
                  </div>

                  {/* Address Field */}
                  <div className="space-y-2">
                    <Label htmlFor="registerAddress" className="text-sm font-medium">
                      {t('auth.fields.address')} *
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="registerAddress"
                        placeholder={t('auth.placeholders.address')}
                        value={registerData.address}
                        onChange={(e) => handleRegisterInputChange('address', e.target.value)}
                        className={`pl-10 min-h-[80px] ${errors.address ? 'border-destructive' : ''}`}
                      />
                    </div>
                    {errors.address && (
                      <p className="text-sm text-destructive">{errors.address}</p>
                    )}
                  </div>

                  {/* State Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="registerState" className="text-sm font-medium">
                      {t('auth.fields.state')} *
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                      <Select
                        value={registerData.state}
                        onValueChange={(value) => {
                          handleRegisterInputChange('state', value);
                          handleRegisterInputChange('district', ''); // Reset district when state changes
                        }}
                      >
                        <SelectTrigger className={`pl-10 ${errors.state ? 'border-destructive' : ''}`}>
                          <SelectValue placeholder={t('auth.placeholders.state')} />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state.value} value={state.value}>
                              {state.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.state && (
                      <p className="text-sm text-destructive">{errors.state}</p>
                    )}
                  </div>

                  {/* District Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="registerDistrict" className="text-sm font-medium">
                      {t('auth.fields.district')} *
                    </Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                      <Select
                        value={registerData.district}
                        onValueChange={(value) => handleRegisterInputChange('district', value)}
                        disabled={!registerData.state}
                      >
                        <SelectTrigger className={`pl-10 ${errors.district ? 'border-destructive' : ''}`}>
                          <SelectValue placeholder={registerData.state ? t('auth.placeholders.district') : t('auth.placeholders.selectStateFirst')} />
                        </SelectTrigger>
                        <SelectContent>
                          {registerData.state && districts[registerData.state as keyof typeof districts]?.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {errors.district && (
                      <p className="text-sm text-destructive">{errors.district}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 text-lg bg-gradient-primary hover:opacity-90"
                  >
                    {isLoading ? 'Creating Account...' : t('auth.register.button')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              )}

              {/* Toggle Mode */}
              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  {isLogin ? t('auth.login.switchText') : t('auth.register.switchText')}
                </p>
                <Button
                  variant="link"
                  onClick={toggleMode}
                  className="text-primary hover:text-primary/80"
                >
                  {isLogin ? t('auth.register.link') : t('auth.login.link')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="shadow-elevated bg-gradient-to-br from-primary/5 to-primary/10">
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
  );
};
