// src/pages/LandingPage.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UnifiedHeader } from './UnifiedHeader'; // Assuming UnifiedHeader is in the same directory
import {
  CloudRain,
  Leaf,
  TrendingUp,
  Shield,
  Smartphone,
  Globe,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext'; // Import useLanguage
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Remove props interface as the component will handle its own navigation
// interface LandingPageProps {
//   onGetStarted: () => void;
//   onLearnMore: () => void;
// }

// Update component signature - no props needed now
export const LandingPage = () => {
  const { t, language, setLanguage } = useLanguage(); // Access the translation function
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to the authentication page or region selection after getting started
    navigate('/auth');
  };

  const handleLearnMore = () => {
    // Scroll to the features section for "Learn More"
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/farm1.jpg')" }}
      ></div>

      {/* Dark overlay applied globally */}
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
                  {t('landing.hero.titlePart1')}
                  <span className="text-primary block">{t('landing.hero.titlePart2')}</span>
                </h1>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                  {t('landing.hero.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    onClick={handleGetStarted}
                    className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 rounded-lg shadow-elevated"
                  >
                    {t('landing.hero.getStartedButton')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleLearnMore}
                    className="text-lg px-8 py-6 rounded-lg border-2 border-primary/20 hover:bg-primary/5 bg-white/10 text-white"
                  >
                    {t('landing.hero.learnMoreButton')}
                  </Button>
                </div>
              </div>

              {/* Hero Illustration with ONLY IoT Farming Image */}
              <div className="relative">
                <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-elevated">
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <img
                      src="/farm-iot.jpeg"
                      alt={t('landing.hero.iotImageAlt')} // Translate alt text
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
              {[
                {
                  icon: CloudRain,
                  titleKey: "landing.features.weather.title",
                  descriptionKey: "landing.features.weather.desc"
                },
                {
                  icon: Leaf,
                  titleKey: "landing.features.cropRec.title",
                  descriptionKey: "landing.features.cropRec.desc"
                },
                {
                  icon: Shield,
                  titleKey: "landing.features.diseaseDet.title",
                  descriptionKey: "landing.features.diseaseDet.desc"
                },
                {
                  icon: TrendingUp,
                  titleKey: "landing.features.marketPrices.title",
                  descriptionKey: "landing.features.marketPrices.desc"
                },
                {
                  icon: Smartphone,
                  titleKey: "landing.features.mobileFriendly.title",
                  descriptionKey: "landing.features.mobileFriendly.desc"
                },
                {
                  icon: Globe,
                  titleKey: "landing.features.localLang.title",
                  descriptionKey: "landing.features.localLang.desc"
                }
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="hover:shadow-elevated transition-shadow duration-300"
                  style={{ backgroundColor: '#DDE5B6' }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-black" />
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-2">{t(feature.titleKey)}</h3>
                    <p className="text-gray-800">{t(feature.descriptionKey)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="mt-auto py-8 bg-black/60 backdrop-blur-md text-center text-gray-300">
          <p>{t('landing.footer.copyright', { year: new Date().getFullYear() })}</p> {/* Pass current year as an option */}
          <p className="text-sm mt-2">{t('landing.footer.moto')}</p>
        </footer>
      </div>
    </div>
  );
};