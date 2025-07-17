import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FarmWiseHeader } from './FarmWiseHeader';
import { 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind, 
  Leaf, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  Camera,
  MessageSquare,
  Settings,
  Menu,
  Bell,
  Sun,
  Cloud,
  CloudRain as RainIcon
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface MainDashboardProps {
  selectedDistrict: string;
  selectedCrops: string[];
  onNavigate: (page: string) => void;
}

export const MainDashboard = ({ selectedDistrict, selectedCrops, onNavigate }: MainDashboardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const weatherData = [
    { day: 'Today', icon: Sun, temp: '32°C', rain: '10%', desc: 'Sunny' },
    { day: 'Tomorrow', icon: Cloud, temp: '29°C', rain: '20%', desc: 'Partly Cloudy' },
    { day: 'Wed', icon: RainIcon, temp: '27°C', rain: '80%', desc: 'Rainy' },
    { day: 'Thu', icon: Cloud, temp: '28°C', rain: '30%', desc: 'Cloudy' },
    { day: 'Fri', icon: Sun, temp: '31°C', rain: '5%', desc: 'Sunny' },
    { day: 'Sat', icon: RainIcon, temp: '26°C', rain: '90%', desc: 'Heavy Rain' },
    { day: 'Sun', icon: Cloud, temp: '30°C', rain: '15%', desc: 'Partly Cloudy' }
  ];

  const cropRecommendations = [
    { crop: 'Soybean', score: 92, risk: 'Low', reason: 'Ideal monsoon conditions' },
    { crop: 'Cotton', score: 87, risk: 'Medium', reason: 'Good soil moisture' },
    { crop: 'Tur', score: 85, risk: 'Low', reason: 'Perfect temperature range' }
  ];

  const diseaseAlerts = [
    { crop: 'Rice', disease: 'Blast', severity: 'High', action: 'Spray immediately' },
    { crop: 'Cotton', disease: 'Bollworm', severity: 'Medium', action: 'Monitor closely' },
    { crop: 'Soybean', disease: 'Rust', severity: 'Low', action: 'Preventive care' }
  ];

  const NavigationItems = [
    { icon: TrendingUp, label: 'Dashboard', active: true },
    { icon: Camera, label: 'Disease Detection', action: () => onNavigate('disease-detection') },
    { icon: MessageSquare, label: 'AI Assistant', action: () => onNavigate('chatbot') },
    { icon: Settings, label: 'Settings', action: () => onNavigate('settings') }
  ];

  const NavigationDrawer = () => (
    <div className="space-y-2">
      {NavigationItems.map((item, index) => (
        <Button
          key={index}
          variant={item.active ? "secondary" : "ghost"}
          className="w-full justify-start"
          onClick={item.action}
        >
          <item.icon className="mr-3 h-4 w-4" />
          {item.label}
        </Button>
      ))}
    </div>
  );

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-success/10 text-success border-success/20';
      case 'Medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'High': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <FarmWiseHeader 
        showLanguageSelector={true}
        showVoiceAssistant={true}
        showDarkMode={true}
        showMenu={true}
        onMenuClick={() => setIsMenuOpen(true)}
      />
      
      {/* Navigation Drawer */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="left" className="w-64">
          <div className="py-4">
            <h2 className="text-lg font-semibold mb-4">Navigation</h2>
            <NavigationDrawer />
          </div>
        </SheetContent>
      </Sheet>

      {/* Offline Banner */}
      <div className="bg-warning/20 border-b border-warning/30 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <AlertTriangle className="h-4 w-4 text-warning mr-2" />
          <span className="text-warning text-sm">
            You are offline. Showing last saved advisories.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Your Farm Dashboard
          </h1>
          <p className="text-muted-foreground">
            {selectedDistrict} • {selectedCrops.length} crops selected
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button 
            variant="outline" 
            className="h-20 flex-col space-y-2"
            onClick={() => onNavigate('disease-detection')}
          >
            <Camera className="h-6 w-6" />
            <span className="text-sm">Disease Detection</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col space-y-2"
            onClick={() => onNavigate('chatbot')}
          >
            <MessageSquare className="h-6 w-6" />
            <span className="text-sm">AI Assistant</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Bell className="h-6 w-6" />
            <span className="text-sm">Alerts</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col space-y-2"
            onClick={() => onNavigate('settings')}
          >
            <Settings className="h-6 w-6" />
            <span className="text-sm">Settings</span>
          </Button>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Weather Forecast Card */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CloudRain className="mr-2 h-5 w-5 text-sky" />
                7-Day Weather Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weatherData.map((day, index) => (
                  <div key={index} className="text-center p-2 rounded-lg hover:bg-accent/5">
                    <div className="text-xs font-medium text-muted-foreground mb-1">{day.day}</div>
                    <day.icon className="h-6 w-6 mx-auto mb-1 text-sky" />
                    <div className="text-sm font-semibold text-foreground">{day.temp}</div>
                    <div className="text-xs text-muted-foreground">{day.rain}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-sky/10 rounded-lg">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Thermometer className="h-5 w-5 mx-auto mb-1 text-warning" />
                    <div className="text-sm font-medium">Temperature</div>
                    <div className="text-lg font-bold text-foreground">32°C</div>
                  </div>
                  <div className="text-center">
                    <Droplets className="h-5 w-5 mx-auto mb-1 text-sky" />
                    <div className="text-sm font-medium">Humidity</div>
                    <div className="text-lg font-bold text-foreground">68%</div>
                  </div>
                  <div className="text-center">
                    <Wind className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                    <div className="text-sm font-medium">Wind Speed</div>
                    <div className="text-lg font-bold text-foreground">12 km/h</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seasonal Outlook Card */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CloudRain className="mr-2 h-5 w-5 text-success" />
                Monsoon Outlook
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-sky rounded-lg">
                  <div className="text-2xl font-bold text-foreground mb-1">Normal</div>
                  <div className="text-sm text-muted-foreground">Monsoon Prediction</div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Rainfall Progress</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Soil Moisture</span>
                      <span>82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Expected rainfall: 85% of normal</p>
                  <p>Best time for sowing: Next 2 weeks</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Crop Recommendations */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Leaf className="mr-2 h-5 w-5 text-success" />
                Crop Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cropRecommendations.map((crop, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-foreground">{crop.crop}</div>
                      <Badge className={getRiskColor(crop.risk)}>
                        {crop.risk} Risk
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Suitability Score</span>
                      <span className="font-semibold text-foreground">{crop.score}%</span>
                    </div>
                    <Progress value={crop.score} className="h-2 mb-2" />
                    <div className="text-xs text-muted-foreground">{crop.reason}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Disease Risk Alerts */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-warning" />
                Disease Risk Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {diseaseAlerts.map((alert, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium text-foreground">{alert.crop}</div>
                        <div className="text-sm text-muted-foreground">{alert.disease}</div>
                      </div>
                      <Badge className={getRiskColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      Action: {alert.action}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Yield Prediction */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-harvest" />
                Yield Prediction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedCrops.slice(0, 3).map((crop, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="font-medium text-foreground mb-2">{crop}</div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-xs text-muted-foreground">Min</div>
                        <div className="font-semibold text-foreground">2.5t</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Likely</div>
                        <div className="font-semibold text-success">3.2t</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Max</div>
                        <div className="font-semibold text-foreground">3.8t</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating AI Assistant */}
      <Button 
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-primary shadow-elevated hover:scale-105 transition-transform"
        onClick={() => onNavigate('chatbot')}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </div>
  );
};