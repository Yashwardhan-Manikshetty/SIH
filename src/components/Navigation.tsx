import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { 
  Home, 
  MapPin, 
  Wheat, 
  LayoutDashboard, 
  Camera, 
  MessageCircle, 
  Settings, 
  TrendingUp 
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/region-selection', label: 'Region', icon: MapPin },
    { path: '/crop-selection', label: 'Crops', icon: Wheat },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/disease-detection', label: 'Disease Detection', icon: Camera },
    { path: '/chatbot', label: 'AI Assistant', icon: MessageCircle },
    { path: '/crop-prices', label: 'Market Prices', icon: TrendingUp },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-green-600">AgrowAI</h1>
        </div>
        
        <div className="flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={`flex items-center space-x-2 ${
                    isActive 
                      ? "bg-green-600 text-white" 
                      : "text-gray-600 hover:text-green-600"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
