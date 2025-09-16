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
  ArrowRight,
  CheckCircle
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
}

export const LandingPage = ({ onGetStarted, onLearnMore }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-earth">
      <AgrowHeader />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Smart Farming for
                <span className="text-primary block">Maharashtra</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
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
                  className="text-lg px-8 py-6 rounded-lg border-2 border-primary/20 hover:bg-primary/5"
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            {/* Hero Illustration */}
            <div className="relative">
              <div className="bg-gradient-sky rounded-3xl p-8 shadow-elevated">
                <div className="aspect-square bg-primary/10 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Leaf className="h-12 w-12 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">AI Assistant</h3>
                    <p className="text-muted-foreground">Helping farmers make smarter decisions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose Agrow AI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
              <Card key={index} className="hover:shadow-elevated transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-sky">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Trusted by Farmers Across Maharashtra
              </h2>
              <div className="space-y-4">
                {[
                  "Increase crop yields by up to 30%",
                  "Reduce farming risks with AI predictions",
                  "Save time with automated recommendations",
                  "Get support in your preferred language",
                  "Access expert advice 24/7"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-card rounded-2xl p-8 shadow-elevated">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-muted-foreground mb-6">Active Farmers</div>
                <div className="text-4xl font-bold text-success mb-2">₹2,50,000</div>
                <div className="text-muted-foreground mb-6">Average Annual Savings</div>
                <div className="text-4xl font-bold text-harvest mb-2">95%</div>
                <div className="text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Join thousands of farmers who are already benefiting from AI-powered farming insights.
          </p>
          <Button 
            onClick={onGetStarted}
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-6 rounded-lg shadow-elevated"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-primary-foreground mb-4">Agrow AI</h3>
              <p className="text-primary-foreground/80">
                Empowering Maharashtra farmers with AI-driven agricultural insights.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground">About Us</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground">Features</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground">Privacy Policy</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground">Terms of Service</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-primary-foreground">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-primary-foreground mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-primary-foreground/80">Email: support@agrow.ai</li>
                <li className="text-primary-foreground/80">Phone: +91 12345 67890</li>
                <li className="text-primary-foreground/80">Address: Pune, Maharashtra</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-primary-foreground/80">
              © 2024 Agrow AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};