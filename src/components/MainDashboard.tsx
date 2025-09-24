import { useState, useEffect } from 'react'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';  
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  CloudRain, 
  Leaf, 
  AlertTriangle,
  Camera,
  MessageSquare,
  Settings,
  Bell,
} from 'lucide-react';
import axios from 'axios';

// Make sure WeatherCard exists
import WeatherCard from './WeatherCard';

interface MainDashboardProps {
  selectedDistrict: string;
  selectedCrops: string[];
  onNavigate: (page: string) => void;
}

export const MainDashboard = ({ selectedDistrict, selectedCrops, onNavigate }: MainDashboardProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [loadingWeather, setLoadingWeather] = useState(true);

  const cropRecommendations = [
    { crop: 'Soybean', score: 92, risk: 'Low', reason: 'Ideal monsoon conditions' },
    { crop: 'Cotton', score: 87, risk: 'Medium', reason: 'Good soil moisture' },
    { crop: 'Tur', score: 85, risk: 'Low', reason: 'Perfect temperature range' }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-success/10 text-success border-success/20';
      case 'Medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'High': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  // Map tomorrow.io daily item -> WeatherCard props
  const mapTomorrowDayToCard = (dayItem: any, index: number) => {
    const v = dayItem.values || {};

    const rawWind = v.windSpeedAvg ?? null;
    const windKmH = rawWind != null ? Math.round(rawWind * 3.6 * 10) / 10 : null;

    return {
      day:
        index === 0
          ? t('common.today')
          : index === 1
          ? t('common.tomorrow')
          : new Date(dayItem.time).toLocaleDateString(undefined, { weekday: "short" }),
      dateIso: dayItem.time,
      tempAvg: v.temperatureAvg ?? null,
      tempMin: v.temperatureMin ?? null,
      tempMax: v.temperatureMax ?? null,
      precipProb: (v.precipitationProbabilityAvg ?? v.precipitationProbabilityMax) ?? null,
      precipAccum: (v.rainAccumulationSum ?? v.rainAccumulationAvg) ?? null,
      cloudCover: v.cloudCoverAvg ?? null,
      humidity: v.humidityAvg ?? null,
      windSpeed: windKmH,
      weatherCode: v.weatherCodeMax ?? v.weatherCodeAvg ?? null,
      description:
        (v.precipitationProbabilityAvg ?? 0) > 60
          ? t('common.rainLikely')
          : (v.cloudCoverAvg ?? 0) > 60
          ? t('common.cloudy')
          : t('common.clear'),
      unit: "metric",
      compact: false
    };
  };

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      setLoadingWeather(true);
      try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const LOCATION = selectedDistrict || user?.district || '28.6139,77.209';
        if (!API_KEY) {
          console.warn('VITE_WEATHER_API_KEY not set in .env.local');
          setLoadingWeather(false);
          return;
        }

        const fields = [
          'temperatureMin','temperatureMax','temperatureAvg',
          'humidityAvg',
          'precipitationProbabilityAvg','rainAccumulationSum',
          'cloudCoverAvg',
          'windSpeedAvg','windGustMax',
          'weatherCodeMax'
        ];

        const url = `https://api.tomorrow.io/v4/weather/forecast?location=${encodeURIComponent(LOCATION)}&timesteps=1d&fields=${encodeURIComponent(fields.join(','))}&units=metric&apikey=${encodeURIComponent(API_KEY)}`;

        const response = await axios.get(url);
        const daily = response.data?.timelines?.daily ?? [];

        const mapped = daily.slice(0, 7).map((d: any, i: number) => mapTomorrowDayToCard(d, i));
        setWeatherData(mapped);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeatherData([]);
      } finally {
        setLoadingWeather(false);
      }
    };

    fetchWeather();
  }, []); 

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* Offline Banner */}
      <div className="bg-warning/20 border-b border-warning/30 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <AlertTriangle className="h-4 w-4 text-warning mr-2" />
          <span className="text-warning text-sm">
            {t('dashboard.offline.banner')}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t('dashboard.welcome')}, {user?.name || 'Farmer'}!
          </h1>
          <p className="text-muted-foreground">
            {selectedDistrict || user?.district} • {selectedCrops.length} {t('common.cropsSelected')}
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
            <span className="text-sm">{t('dashboard.quickActions.disease')}</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col space-y-2"
            onClick={() => onNavigate('chatbot')}
          >
            <MessageSquare className="h-6 w-6" />
            <span className="text-sm">{t('dashboard.quickActions.assistant')}</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2">
            <Bell className="h-6 w-6" />
            <span className="text-sm">{t('dashboard.quickActions.alerts')}</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex-col space-y-2"
            onClick={() => onNavigate('settings')}
          >
            <Settings className="h-6 w-6" />
            <span className="text-sm">{t('dashboard.quickActions.settings')}</span>
          </Button>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Weather Forecast */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CloudRain className="mr-2 h-5 w-5 text-sky" />
                {t('dashboard.weather.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingWeather ? (
                <p>{t('dashboard.weather.loading')}</p>
              ) : (
                <div className="flex gap-2 overflow-x-auto py-2">
                  {weatherData.length > 0 ? (
                    weatherData.map((d, i) => (
                      <div key={d.dateIso ?? i} className="flex-shrink-0">
                        <WeatherCard {...d} />
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">{t('dashboard.weather.noData')}</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seasonal Outlook */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CloudRain className="mr-2 h-5 w-5 text-success" />
                {t('dashboard.monsoon.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-sky rounded-lg">
                  <div className="text-2xl font-bold text-foreground mb-1">{t('dashboard.monsoon.normal')}</div>
                  <div className="text-sm text-muted-foreground">{t('dashboard.monsoon.prediction')}</div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t('dashboard.monsoon.rainfallProgress')}</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t('dashboard.monsoon.soilMoisture')}</span>
                      <span>82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>{t('dashboard.monsoon.expectedRainfall')}</p>
                  <p>{t('dashboard.monsoon.bestTimeSowing')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Crop Recommendations */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Leaf className="mr-2 h-5 w-5 text-success" />
                {t('dashboard.crops.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cropRecommendations.map((crop, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium text-foreground">{crop.crop}</div>
                      <Badge className={getRiskColor(crop.risk)}>
                        {t(`common.${crop.risk.toLowerCase()}`)} {t('dashboard.crops.risk')}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">{t('dashboard.crops.suitabilityScore')}</span>
                      <span className="font-semibold text-foreground">{crop.score}%</span>
                    </div>
                    <Progress value={crop.score} className="h-2 mb-2" />
                    <div className="text-xs text-muted-foreground">{crop.reason}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* NOTE: Disease Alerts and Yield Prediction cards were commented out
              because nested JSX comments caused syntax errors. 
              You can re-enable them later, but remove `{/* ... */}` inside `/* ... */`. */}
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
