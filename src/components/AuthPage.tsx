import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AgrowHeader } from './AgrowHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { User, Phone, MapPin, Building, ArrowRight, LogIn, UserPlus } from 'lucide-react';

interface AuthPageProps {
  onLoginSuccess: () => void;
}

export const AuthPage = ({ onLoginSuccess }: AuthPageProps) => {
  const { t } = useLanguage();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('auth.errors.nameRequired');
    }

    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = t('auth.errors.mobileRequired');
    } else if (!/^\d{10}$/.test(formData.mobileNo)) {
      newErrors.mobileNo = t('auth.errors.mobileInvalid');
    }

    if (!formData.address.trim()) {
      newErrors.address = t('auth.errors.addressRequired');
    }

    if (!formData.state) {
      newErrors.state = t('auth.errors.stateRequired');
    }

    if (!formData.district) {
      newErrors.district = t('auth.errors.districtRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      login(formData);
      onLoginSuccess();
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      mobileNo: '',
      address: '',
      state: '',
      district: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <AgrowHeader showLanguageSelector={true} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {isLogin ? t('auth.login.title') : t('auth.register.title')}
          </h1>
          <p className="text-xl text-muted-foreground">
            {isLogin ? t('auth.login.subtitle') : t('auth.register.subtitle')}
          </p>
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
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    {t('auth.fields.name')} *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder={t('auth.placeholders.name')}
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`pl-10 ${errors.name ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                {/* Mobile Number Field */}
                <div className="space-y-2">
                  <Label htmlFor="mobileNo" className="text-sm font-medium">
                    {t('auth.fields.mobileNo')} *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="mobileNo"
                      type="tel"
                      placeholder={t('auth.placeholders.mobileNo')}
                      value={formData.mobileNo}
                      onChange={(e) => handleInputChange('mobileNo', e.target.value)}
                      className={`pl-10 ${errors.mobileNo ? 'border-destructive' : ''}`}
                      maxLength={10}
                    />
                  </div>
                  {errors.mobileNo && (
                    <p className="text-sm text-destructive">{errors.mobileNo}</p>
                  )}
                </div>

                {/* Address Field */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    {t('auth.fields.address')} *
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="address"
                      placeholder={t('auth.placeholders.address')}
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={`pl-10 min-h-[80px] ${errors.address ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-sm text-destructive">{errors.address}</p>
                  )}
                </div>

                {/* State Selection */}
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-sm font-medium">
                    {t('auth.fields.state')} *
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Select
                      value={formData.state}
                      onValueChange={(value) => {
                        handleInputChange('state', value);
                        handleInputChange('district', ''); // Reset district when state changes
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
                  <Label htmlFor="district" className="text-sm font-medium">
                    {t('auth.fields.district')} *
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Select
                      value={formData.district}
                      onValueChange={(value) => handleInputChange('district', value)}
                      disabled={!formData.state}
                    >
                      <SelectTrigger className={`pl-10 ${errors.district ? 'border-destructive' : ''}`}>
                        <SelectValue placeholder={formData.state ? t('auth.placeholders.district') : t('auth.placeholders.selectStateFirst')} />
                      </SelectTrigger>
                      <SelectContent>
                        {formData.state && districts[formData.state as keyof typeof districts]?.map((district) => (
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
                  className="w-full h-12 text-lg bg-gradient-primary hover:opacity-90"
                >
                  {isLogin ? t('auth.login.button') : t('auth.register.button')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>

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
