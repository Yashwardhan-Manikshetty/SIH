import { useState, useEffect } from 'react'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';  
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CloudRain, 
  Leaf, 
  AlertTriangle,
  Camera,
  MessageSquare,
  Settings,
  Bell,
  Activity
} from 'lucide-react';
import axios from 'axios';

// IMPORTANT: make sure WeatherCard exists at ./WeatherCard
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
    { crop: 'Rice', disease: 'Blast', risk: 'High', action: 'Spray immediately' },
    { crop: 'Cotton', disease: 'Bollworm', risk: 'Medium', action: 'Monitor closely' },
    { crop: 'Soybean', disease: 'Rust', risk: 'Low', action: 'Preventive care' }
  ];

  const marketPrices = [
    { crop: 'Soybean', price: '₹4,200 / quintal', change: '+3% from last week' },
    { crop: 'Cotton', price: '₹6,000 / quintal', change: 'Stable' },
    { crop: 'Tur', price: '₹7,800 / quintal', change: '-2% from last week' }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-success/10 text-success border-success/20';
      case 'Medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'High': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const mapTomorrowDayToCard = (dayItem: any, index: number) => {
    const v = dayItem.values || {};
    const rawWind = v.windSpeedAvg ?? null;
    const windKmH = rawWind != null ? Math.round(rawWind * 3.6 * 10) / 10 : null;

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
      windSpeed: windKmH,
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

  useEffect(() => {
    const fetchWeather = async () => {
      setLoadingWeather(true);
      try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const LOCATION = selectedDistrict ?? '28.6139,77.209';
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

        const fieldsParam = params.fields.join(',');
        const url = `https://api.tomorrow.io/v4/weather/forecast?location=${encodeURIComponent(params.location)}&timesteps=${params.timesteps}&fields=${encodeURIComponent(fieldsParam)}&units=${params.units}&apikey=${encodeURIComponent(params.apikey)}`;

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
  }, [selectedDistrict]);

  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/mainfarmbg.jpeg')" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">

        {/* Dashboard Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-1">
            Welcome to Your Farm Dashboard
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white text-muted-foreground">
            {selectedDistrict} • {selectedCrops.length} crops selected
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Button 
            variant="outline" 
            className="h-16 sm:h-20 flex-col space-y-1 sm:space-y-2 text-xs sm:text-sm"
            onClick={() => onNavigate('disease-detection')}
          >
            <Camera className="h-5 w-5 sm:h-6 sm:w-6" />
            <span>Disease Detection</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 sm:h-20 flex-col space-y-1 sm:space-y-2 text-xs sm:text-sm"
            onClick={() => onNavigate('chatbot')}
          >
            <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
            <span>AI Assistant</span>
          </Button>
          <Button variant="outline" className="h-16 sm:h-20 flex-col space-y-1 sm:space-y-2 text-xs sm:text-sm">
            <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
            <span>Alerts</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-16 sm:h-20 flex-col space-y-1 sm:space-y-2 text-xs sm:text-sm"
            onClick={() => onNavigate('settings')}
          >
            <Settings className="h-5 w-5 sm:h-6 sm:w-6" />
            <span>Settings</span>
          </Button>
        </div>

        {/* Main Dashboard Grid (Responsive) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">

          {/* Weather Forecast Card - full width */}
          <Card className="shadow-card col-span-1 sm:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-sm sm:text-base md:text-lg">
                <CloudRain className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-sky" />
                7-Day Weather Forecast
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2 sm:py-4">
              {loadingWeather ? (
                <p className="text-sm sm:text-base">Loading weather...</p>
              ) : (
                <div className="flex gap-2 sm:gap-3 overflow-x-auto py-2">
                  {weatherData.length > 0 ? (
                    weatherData.map((d, i) => (
                      <div key={d.dateIso ?? i} className="flex-shrink-0">
                        <WeatherCard {...d} />
                      </div>
                    ))
                  ) : (
                    <p className="text-sm sm:text-base text-muted-foreground">No weather data available</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seasonal Outlook */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center text-sm sm:text-base md:text-lg">
                <CloudRain className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-success" />
                Monsoon Outlook
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="text-center p-3 sm:p-4 bg-gradient-to-r from-white-400 to-sky-500 rounded-lg">
                <div className="text-lg sm:text-2xl font-bold text-foreground mb-1">Normal</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Monsoon Prediction</div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                <div>
                  <div className="flex justify-between text-xs sm:text-sm mb-1">
                    <span>Rainfall Progress</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-xs sm:text-sm mb-1">
                    <span>Soil Moisture</span>
                    <span>82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                <p>Expected rainfall: 85% of normal</p>
                <p>Best time for sowing: Next 2 weeks</p>
              </div>
            </CardContent>
          </Card>

          {/* Crop Recommendations */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center text-sm sm:text-base md:text-lg">
                <Leaf className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-success" />
                Crop Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {cropRecommendations.map((crop, index) => (
                <div key={index} className="border rounded-lg p-2 sm:p-3">
                  <div className="flex justify-between items-start mb-1 sm:mb-2">
                    <div className="font-medium text-foreground text-sm sm:text-base">{crop.crop}</div>
                    <Badge className={getRiskColor(crop.risk)} text-sm>
                      {crop.risk} Risk
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center mb-1 sm:mb-2 text-xs sm:text-sm">
                    <span>Suitability Score</span>
                    <span className="font-semibold text-foreground">{crop.score}%</span>
                  </div>
                  <Progress value={crop.score} className="h-2 mb-1" />
                  <div className="text-xs sm:text-sm text-muted-foreground">{crop.reason}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Disease Risk Alerts */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center text-sm sm:text-base md:text-lg">
                <AlertTriangle className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-harvest" />
                Disease Risk Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {diseaseAlerts.map((alert, index) => (
                <div key={index} className="border rounded-lg p-2 sm:p-3">
                  <div className="flex justify-between items-start mb-1 sm:mb-2">
                    <div className="font-medium text-foreground text-sm sm:text-base">{alert.crop}</div>
                    <Badge className={getRiskColor(alert.risk)}>
                      {alert.risk}
                    </Badge>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground mb-1">{alert.disease}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Action: {alert.action}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Current Market Prices */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center text-sm sm:text-base md:text-lg">
                <Activity className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                Current Market Prices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {marketPrices.map((mp, i) => (
                <div key={i} className="border rounded-lg p-2 sm:p-3">
                  <div className="flex justify-between items-start mb-1 sm:mb-2 text-sm sm:text-base">
                    <div className="font-medium text-foreground">{mp.crop}</div>
                    <div className="font-semibold text-foreground">{mp.price}</div>
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{mp.change}</div>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Floating AI Assistant */}
      <Button 
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-primary shadow-elevated hover:scale-105 transition-transform"
        onClick={() => onNavigate('chatbot')}
      >
        <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7" />
      </Button>
    </div>
  );
};
