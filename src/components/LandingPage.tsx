// src/pages/LandingPage.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UnifiedHeader } from './UnifiedHeader';
import { 
  CloudRain, 
  Leaf, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  Globe,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const { t } = useLanguage(); 
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleLearnMore = () => {
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Features array with already translated title & description
  const features = [
    {
      icon: CloudRain,
      title: t('landing.features.weather.title'),
      description: t('landing.features.weather.desc')
    },
    {
      icon: Leaf,
      title: t('landing.features.crop.title'),
      description: t('landing.features.crop.desc')
    },
    {
      icon: Shield,
      title: t('landing.features.disease.title'),
      description: t('landing.features.disease.desc')
    },
    {
      icon: TrendingUp,
      title: t('landing.features.market.title'),
      description: t('landing.features.market.desc')
    },
    {
      icon: Smartphone,
      title: t('landing.features.mobile.title'),
      description: t('landing.features.mobile.desc')
    },
    {
      icon: Globe,
      title: t('landing.features.language.title'),
      description: t('landing.features.language.desc')
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/farm1.jpg')" }}
      ></div>

      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/50 z-0"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <UnifiedHeader
          showLanguageSelector={true}
          showVoiceAssistant={false}
          showDarkMode={true}
          showMobileMenu={true}
        />

        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                  {t('landing.hero.title')}
                  <span className="text-primary block">{t('landing.hero.titleHighlight')}</span>
                </h1>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                  {t('landing.hero.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    onClick={handleGetStarted}
                    className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 rounded-lg shadow-elevated"
                  >
                    {t('landing.hero.getStarted')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleLearnMore}
                    className="text-lg px-8 py-6 rounded-lg border-2 border-primary/20 hover:bg-primary/5 bg-white/10 text-white"
                  >
                    {t('landing.hero.learnMore')}
                  </Button>
                </div>
              </div>

              {/* Hero Illustration */}
              <div className="relative">
                <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-elevated">
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <img
                      src="/farm-iot.jpeg"
                      alt={t('landing.hero.iotImageAlt')}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features-section" className="py-20 bg-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {t('landing.features.title')}
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                {t('landing.features.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-elevated transition-shadow duration-300"
                  style={{ backgroundColor: '#DDE5B6' }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-black" />
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-2">{feature.title}</h3>
                    <p className="text-gray-800">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="mt-auto py-8 bg-black/60 backdrop-blur-md text-center text-gray-300">
          <p>{t('landing.footer.copyright')}</p>
          <p className="text-sm mt-2">{t('landing.footer.tagline')}</p>
        </footer>
      </div>
    </div>
  );
};
