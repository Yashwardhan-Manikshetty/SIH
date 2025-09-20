import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { UnifiedHeader } from './UnifiedHeader';
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
  Bell,
  Sun,
  Cloud,
  CloudRain as RainIcon
} from 'lucide-react';
import axios from 'axios';

// IMPORTANT: make sure WeatherCard exists at ./WeatherCard (the component I shared earlier)
import WeatherCard from './WeatherCard';

interface MainDashboardProps {
  selectedDistrict: string;
  selectedCrops: string[];
  onNavigate: (page: string) => void;
}

export const MainDashboard = ({ selectedDistrict, selectedCrops, onNavigate }: MainDashboardProps) => {
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [loadingWeather, setLoadingWeather] = useState(true);

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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-success/10 text-success border-success/20';
      case 'Medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'High': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  // Helper: map tomorrow.io daily item -> WeatherCard props
  const mapTomorrowDayToCard = (dayItem: any, index: number) => {
    const v = dayItem.values || {};

    // wind: many providers return m/s for metric — convert to km/h (m/s * 3.6)
    const rawWind = v.windSpeedAvg ?? null;
    const windKmH = rawWind != null ? Math.round(rawWind * 3.6 * 10) / 10 : null; // one decimal

    return {
      day:
        index === 0
          ? "Today"
          : index === 1
          ? "Tomorrow"
          : new Date(dayItem.time).toLocaleDateString(undefined, { weekday: "short" }),
      dateIso: dayItem.time,
      tempAvg: v.temperatureAvg ?? null,
      tempMin: v.temperatureMin ?? null,
      tempMax: v.temperatureMax ?? null,
      precipProb: (v.precipitationProbabilityAvg ?? v.precipitationProbabilityMax) ?? null,
      precipAccum: (v.rainAccumulationSum ?? v.rainAccumulationAvg) ?? null,
      cloudCover: v.cloudCoverAvg ?? null,
      humidity: v.humidityAvg ?? null,
      windSpeed: windKmH, // km/h
      weatherCode: v.weatherCodeMax ?? v.weatherCodeAvg ?? null,
      description:
        (v.precipitationProbabilityAvg ?? 0) > 60
          ? "Rain likely"
          : (v.cloudCoverAvg ?? 0) > 60
          ? "Cloudy"
          : "Clear",
      unit: "metric",
      compact: false
    };
  };

  // Fetch weather data from Tomorrow.io (or compatible) API
  useEffect(() => {
    const fetchWeather = async () => {
      setLoadingWeather(true);
      try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const LOCATION = selectedDistrict ?? '28.6139,77.209'; // default Delhi coords you shared
        if (!API_KEY) {
          console.warn('VITE_WEATHER_API_KEY not set in .env.local');
          setLoadingWeather(false);
          return;
        }

        const params = {
          location: LOCATION,
          timesteps: '1d',
          units: 'metric',
          fields: [
            'temperatureMin','temperatureMax','temperatureAvg',
            'humidityAvg',
            'precipitationProbabilityAvg','rainAccumulationSum',
            'cloudCoverAvg',
            'windSpeedAvg','windGustMax',
            'weatherCodeMax'
          ],
          apikey: API_KEY
        };

        // axios will stringify arrays in params, but Tomorrow.io expects comma-separated fields — build URL manually
        const fieldsParam = params.fields.join(',');
        const url = `https://api.tomorrow.io/v4/weather/forecast?location=${encodeURIComponent(params.location)}&timesteps=${params.timesteps}&fields=${encodeURIComponent(fieldsParam)}&units=${params.units}&apikey=${encodeURIComponent(params.apikey)}`;

        const response = await axios.get(url);
        const daily = response.data?.timelines?.daily ?? [];

        const mapped = daily.slice(0, 7).map((d: any, i: number) => mapTomorrowDayToCard(d, i));
        setWeatherData(mapped);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeatherData([]); // fallback
      } finally {
        setLoadingWeather(false);
      }
    };

    fetchWeather();
  }, []);

  // today's quick metrics fallback (uses first weather card if available)
  const todayCard = weatherData[0];
  const displayTemp = todayCard?.tempAvg ? `${Math.round(todayCard.tempAvg)}°C` : '32°C';
  const displayHumidity = todayCard?.humidity ? `${Math.round(todayCard.humidity)}%` : '68%';
  const displayWind = todayCard?.windSpeed ? `${todayCard.windSpeed} km/h` : '12 km/h';

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* <UnifiedHeader 
        showLanguageSelector={true}
        showVoiceAssistant={true}
        showDarkMode={true}
        showMobileMenu={true}
        variant="dashboard"
      /> */}

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
          
          {/* Weather Forecast Card (replaced by WeatherCard row) */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CloudRain className="mr-2 h-5 w-5 text-sky" />
                7-Day Weather Forecast
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingWeather ? (
                <p>Loading weather...</p>
              ) : (
                <div className="flex gap-2 overflow-x-auto py-2">
                  {weatherData.length > 0 ? (
                    weatherData.map((d, i) => (
                      <div key={d.dateIso ?? i} className="flex-shrink-0">
                        <WeatherCard {...d} />
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No weather data available</p>
                  )}
                </div>
              )}
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
                Diseases
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
