import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { 
  Home, 
  MapPin, 
  Wheat, 
  LayoutDashboard, 
  Camera, 
  MessageCircle, 
  Settings, 
  TrendingUp,
  Sun, 
  Moon, 
  Mic, 
  Menu,
  LogOut,
  User
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/contexts/AuthContext';

interface UnifiedHeaderProps {
  showLanguageSelector?: boolean;
  showVoiceAssistant?: boolean;
  showDarkMode?: boolean;
  showMobileMenu?: boolean;
  variant?: 'default' | 'dashboard';
  isLoggedIn?: boolean;
}

export const UnifiedHeader = ({ 
  showLanguageSelector = true, 
  showVoiceAssistant = false,
  showDarkMode = true,
  showMobileMenu = true,
  variant = 'default',
  isLoggedIn = false
}: UnifiedHeaderProps) => {
  const [language, setLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const homeItem = isAuthenticated 
    ? { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }
    : { path: '/', label: 'Home', icon: Home };

  const navItems = [
    homeItem,
    { path: '/disease-detection', label: 'Disease Detection', icon: Camera },
    { path: '/chatbot', label: 'AI Assistant', icon: MessageCircle },
    { path: '/crop-prices', label: 'Market Prices', icon: TrendingUp },
  ];

  // Add authentication-specific items
  const authItems = isAuthenticated 
    ? [
        { path: '/region-selection', label: 'Region', icon: MapPin },
        { path: '/crop-selection', label: 'Crops', icon: Wheat },
        { path: '/settings', label: 'Settings', icon: Settings },
      ]
    : [
        { path: '/auth', label: 'Login', icon: User },
      ];

  // Mobile Navigation Drawer Component
  const MobileNavigationDrawer = () => (
    <div className="space-y-4">
      {/* Main Navigation Items */}
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link 
            key={item.path} 
            to={item.path}
            onClick={() => setIsMenuOpen(false)}
          >
            <Button
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start ${
                isActive 
                  ? "bg-green-600 text-white" 
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              <Icon className="h-4 w-4 mr-3" />
              {item.label}
            </Button>
          </Link>
        );
      })}
      
      {/* Authentication Items */}
      {authItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link 
            key={item.path} 
            to={item.path}
            onClick={() => setIsMenuOpen(false)}
          >
            <Button
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start ${
                isActive 
                  ? "bg-green-600 text-white" 
                  : "text-gray-600 hover:text-green-600"
              }`}
            >
              <Icon className="h-4 w-4 mr-3" />
              {item.label}
            </Button>
          </Link>
        );
      })}
      
      {/* Logout Button for Authenticated Users */}
      {isAuthenticated && (
        <Button
          variant="ghost"
          onClick={() => {
            logout();
            setIsMenuOpen(false);
          }}
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      )}
    </div>
  );

  // Choose styling based on variant
  const headerClasses = variant === 'dashboard' 
    ? "bg-gradient-primary border-b border-border/20 shadow-card"
    : "bg-white border-b border-gray-200 shadow-sm";

  const logoClasses = variant === 'dashboard'
    ? "text-primary-foreground"
    : "text-green-600";

  const textClasses = variant === 'dashboard'
    ? "text-primary-foreground"
    : "text-gray-900";

  const subtitleClasses = variant === 'dashboard'
    ? "text-primary-foreground/80"
    : "text-gray-600";

  return (
    <>
      <header className={headerClasses}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              {showMobileMenu && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(true)}
                  className={`hover:bg-opacity-80 md:hidden ${
                    variant === 'dashboard' 
                      ? "text-primary-foreground hover:bg-primary/80" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  variant === 'dashboard' 
                    ? "bg-primary-foreground" 
                    : "bg-green-100"
                }`}>
                  <span className={`font-bold text-lg ${
                    variant === 'dashboard' 
                      ? "text-primary" 
                      : "text-green-600"
                  }`}>A</span>
                </div>
                <div>
                  <h1 className={`text-xl font-bold ${logoClasses}`}>AgrowAI</h1>
                  {variant === 'dashboard' && (
                    <p className={`text-xs ${subtitleClasses} hidden sm:block`}>
                      AI-powered Smart Farming for Maharashtra Farmers
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
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
                          : variant === 'dashboard'
                            ? "text-primary-foreground hover:text-green-400"
                            : "text-gray-600 hover:text-green-600"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
              
              {/* Authentication Items */}
              {authItems.map((item) => {
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
                          : variant === 'dashboard'
                            ? "text-primary-foreground hover:text-green-400"
                            : "text-gray-600 hover:text-green-600"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-3">
              {/* User Info for Authenticated Users */}
              {isAuthenticated && user && (
                <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-lg bg-green-50">
                  <User className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    {user.username}
                  </span>
                </div>
              )}

              {showLanguageSelector && (
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className={`w-32 ${
                    variant === 'dashboard'
                      ? "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}>
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="mr">मराठी</SelectItem>
                    <SelectItem value="hi">हिंदी</SelectItem>
                  </SelectContent>
                </Select>
              )}

              {showDarkMode && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className={`hover:bg-opacity-80 ${
                    variant === 'dashboard'
                      ? "text-primary-foreground hover:bg-primary/80"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              )}

              {showVoiceAssistant && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={`hover:bg-opacity-80 ${
                    variant === 'dashboard'
                      ? "text-primary-foreground hover:bg-primary/80"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Mic className="h-5 w-5" />
                </Button>
              )}

              {/* Logout Button for Authenticated Users */}
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className={`hover:bg-opacity-80 ${
                    variant === 'dashboard'
                      ? "text-primary-foreground hover:bg-red-500/20"
                      : "text-red-600 hover:bg-red-50"
                  }`}
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer - Temporarily disabled due to TypeScript issues */}
      {/* {showMobileMenu && (
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <MobileNavigationDrawer />
            </div>
          </SheetContent>
        </Sheet>
      )} */}
    </>
  );
};
