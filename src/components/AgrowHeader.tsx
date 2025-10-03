import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sun, Moon, Mic, Menu, LogOut, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface AgrowHeaderProps {
  showLanguageSelector?: boolean;
  showVoiceAssistant?: boolean;
  showDarkMode?: boolean;
  showMenu?: boolean;
  onMenuClick?: () => void;
}

export const AgrowHeader = ({ 
  showLanguageSelector = true, 
  showVoiceAssistant = false,
  showDarkMode = false,
  showMenu = false,
  onMenuClick
}: AgrowHeaderProps) => {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="bg-[#ECF39E] border-b border-border/20 shadow-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            {showMenu && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
                className="text-primary-foreground hover:bg-primary/80 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-foreground rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary">Agrow AI</h1>
                <p className="text-xs text-primary/80 hidden sm:block">
                  AI-powered Smart Farming for Maharashtra Farmers
                </p>
              </div>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Home and Login */}
            <div className="flex items-center space-x-3">
              <Button variant="default" className="flex items-center space-x-2">
                <span className="material-icons">home</span>
                <span>Home</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2">
                <span className="material-icons">person</span>
                <span>Login</span>
              </Button>
            </div>

            {showLanguageSelector && (
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-32 bg-primary-foreground/10 border-primary-foreground/20 text-primary">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="mr">मराठी</SelectItem>
                  <SelectItem value="hi">हिंदी</SelectItem>
                </SelectContent>
              </Select>
            )}

            {isAuthenticated && user && (
              <div className="flex items-center space-x-2 text-primary-foreground">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm hidden sm:block">{user.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="text-primary-foreground hover:bg-primary/80"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            )}

            {showDarkMode && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-primary hover:bg-primary/80"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}

            {showVoiceAssistant && (
              <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:bg-primary/80"
              >
                <Mic className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
