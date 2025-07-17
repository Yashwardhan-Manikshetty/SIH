import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sun, Moon, Mic, Menu } from 'lucide-react';
import { useTheme } from 'next-themes';

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
  const [language, setLanguage] = useState('en');
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="bg-gradient-primary border-b border-border/20 shadow-card">
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
                <h1 className="text-xl font-bold text-primary-foreground">Agrow AI</h1>
                <p className="text-xs text-primary-foreground/80 hidden sm:block">
                  AI-powered Smart Farming for Maharashtra Farmers
                </p>
              </div>
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {showLanguageSelector && (
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-32 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
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
                className="text-primary-foreground hover:bg-primary/80"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            )}

            {showVoiceAssistant && (
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary/80"
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