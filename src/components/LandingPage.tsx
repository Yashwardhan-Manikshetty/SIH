import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AgrowHeader } from './AgrowHeader';
import { 
  CloudRain, 
  Leaf, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  Globe,
  ArrowRight
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
}

export const LandingPage = ({ onGetStarted, onLearnMore }: LandingPageProps) => {
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
        <AgrowHeader />
        
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Smart Farming for
                  <span className="text-primary block">Maharashtra</span>
                </h1>
                <p className="text-xl text-gray-200 mb-8 max-w-2xl">
                  AI-powered insights for crop selection, disease diagnosis, and yield optimization based on real-time weather, soil health, and climate data.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    onClick={onGetStarted}
                    className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 rounded-lg shadow-elevated"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={onLearnMore}
                    className="text-lg px-8 py-6 rounded-lg border-2 border-primary/20 hover:bg-primary/5 bg-white/10 text-white"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              
              {/* Hero Illustration */}
              <div className="relative">
                <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 shadow-elevated">
                  <div className="aspect-square bg-primary/10 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Leaf className="h-12 w-12 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">AI Assistant</h3>
                      <p className="text-gray-200">Helping farmers make smarter decisions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Why Choose Agrow AI?
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Comprehensive AI-powered farming solutions designed specifically for Maharashtra's diverse agricultural landscape.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: CloudRain,
                  title: "Weather Intelligence",
                  description: "7-day forecasts with monsoon predictions and climate insights"
                },
                {
                  icon: Leaf,
                  title: "Crop Recommendations",
                  description: "AI-powered suggestions for optimal crop selection based on your region"
                },
                {
                  icon: Shield,
                  title: "Disease Detection",
                  description: "Early identification of crop diseases with treatment recommendations"
                },
                {
                  icon: TrendingUp,
                  title: "Yield Optimization",
                  description: "Maximize your harvest with data-driven farming strategies"
                },
                {
                  icon: Smartphone,
                  title: "Mobile Friendly",
                  description: "Access insights anywhere, even with limited internet connectivity"
                },
                {
                  icon: Globe,
                  title: "Local Language Support",
                  description: "Available in Marathi, Hindi, and English for better accessibility"
                }
              ].map((feature, index) => (
                <Card key={index} className="hover:shadow-elevated transition-shadow duration-300 bg-white/10 backdrop-blur-md">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-200">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="mt-auto py-8 bg-black/60 backdrop-blur-md text-center text-gray-300">
          <p>© {new Date().getFullYear()} Agrow AI. All rights reserved.</p>
          <p className="text-sm mt-2">Empowering Maharashtra farmers with AI-powered solutions</p>
        </footer>
      </div>
    </div>
  );
};
