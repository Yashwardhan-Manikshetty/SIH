import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { UnifiedHeader } from './UnifiedHeader';
import { 
  ArrowLeft, 
  Globe, 
  Moon, 
  Bell, 
  MapPin, 
  Leaf, 
  Smartphone, 
  Save,
  User,
  Shield,
  HelpCircle
} from 'lucide-react';

interface SettingsPageProps {
  onNavigate: (page: string) => void;
}

export const SettingsPage = ({ onNavigate }: SettingsPageProps) => {
  const [language, setLanguage] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    weather: true,
    disease: true,
    crop: false,
    price: true
  });
  const [selectedDistrict, setSelectedDistrict] = useState('Pune');
  const [selectedCrops, setSelectedCrops] = useState(['Rice', 'Cotton', 'Soybean']);

  const districts = [
    'Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur', 'Amravati',
    'Sangli', 'Satara', 'Ahmednagar', 'Latur', 'Dhule', 'Jalgaon', 'Akola', 'Yavatmal'
  ];

  const crops = [
    'Rice', 'Wheat', 'Jowar', 'Soybean', 'Cotton', 'Groundnut', 'Tur', 'Moong', 
    'Chana', 'Sugarcane', 'Onion', 'Tomato', 'Grapes', 'Bajra', 'Maize'
  ];

  const handleNotificationChange = (type: string, enabled: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [type]: enabled
    }));
  };

  const handleSaveSettings = () => {
    // Save settings logic would go here
    console.log('Settings saved:', { language, darkMode, notifications, selectedDistrict, selectedCrops });
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
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              onClick={() => onNavigate('dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground">Customize your Agrow AI experience</p>
            </div>
          </div>
          
          <Button 
            onClick={handleSaveSettings}
            className="bg-gradient-primary hover:opacity-90"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="space-y-6">
          {/* Language & Region Settings */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-primary" />
                Language & Region
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Language
                  </label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                      <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    District
                  </label>
                  <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map(district => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Moon className="mr-2 h-5 w-5 text-primary" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Dark Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark themes
                  </p>
                </div>
                <Switch 
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Crop Preferences */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Leaf className="mr-2 h-5 w-5 text-success" />
                Crop Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Selected Crops
                  </label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedCrops.map(crop => (
                      <Badge key={crop} variant="secondary" className="px-3 py-1">
                        {crop}
                        <button 
                          onClick={() => setSelectedCrops(prev => prev.filter(c => c !== crop))}
                          className="ml-2 text-muted-foreground hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                  
                  <Select 
                    onValueChange={(value) => {
                      if (!selectedCrops.includes(value)) {
                        setSelectedCrops(prev => [...prev, value]);
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Add more crops" />
                    </SelectTrigger>
                    <SelectContent>
                      {crops.filter(crop => !selectedCrops.includes(crop)).map(crop => (
                        <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-warning" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Weather Alerts</h3>
                    <p className="text-sm text-muted-foreground">
                      Get notified about weather changes and forecasts
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.weather}
                    onCheckedChange={(checked) => handleNotificationChange('weather', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Disease Alerts</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts about crop diseases and pests
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.disease}
                    onCheckedChange={(checked) => handleNotificationChange('disease', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Crop Recommendations</h3>
                    <p className="text-sm text-muted-foreground">
                      Get suggestions for optimal crop selection
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.crop}
                    onCheckedChange={(checked) => handleNotificationChange('crop', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Price Updates</h3>
                    <p className="text-sm text-muted-foreground">
                      Stay updated on market prices for your crops
                    </p>
                  </div>
                  <Switch 
                    checked={notifications.price}
                    onCheckedChange={(checked) => handleNotificationChange('price', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account & Privacy */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" />
                Account & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Privacy Settings
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Smartphone className="mr-2 h-4 w-4" />
                  App Permissions
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* App Information */}
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Agrow AI</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Version 1.0.0 • AI-powered Smart Farming for Maharashtra
                </p>
                <div className="flex justify-center space-x-4 text-sm">
                  <a href="#" className="text-primary hover:underline">Terms of Service</a>
                  <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  <a href="#" className="text-primary hover:underline">About</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};