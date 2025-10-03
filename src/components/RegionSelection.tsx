import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AgrowHeader } from './AgrowHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { UnifiedHeader } from './UnifiedHeader';
import { MapPin, ArrowRight, CheckCircle, Settings } from 'lucide-react';
import * as React from "react";

interface RegionSelectionProps {
  onRegionSelected: (district: string) => void;
  onNavigate: (path: string) => void;
}

export const RegionSelection = ({ onRegionSelected, onNavigate }: RegionSelectionProps) => {
  const { t } = useLanguage();
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const districts = [
    'Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Solapur', 'Kolhapur', 
    'Sangli', 'Satara', 'Jalgaon', 
  ];

  const handleConfirmRegion = () => {
    if (selectedDistrict) {
      onRegionSelected(selectedDistrict);
    }
  };

  return (
    <div 
      className="relative min-h-screen" 
      style={{
        backgroundImage: "url('/crop.jpeg')", 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Page content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Select Your Region
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Choose your district to get personalized agricultural insights and recommendations for your area.
          </p>
        </div>

        {/* Grid for cards */}
        <div className="grid lg:grid-cols-1 gap-8">
          {/* District Selection Card */}
          <Card className="shadow-elevated">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">{t('region.districtLabel')}</h2>
                  <p className="text-muted-foreground">{t('region.districtPlaceholder')}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('region.districtLabel')}
                  </label>
                  <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                    <SelectTrigger className="w-full h-14 text-lg">
                      <SelectValue placeholder={t('region.districtPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {districts.map((district) => (
                        <SelectItem key={district} value={district} className="text-lg py-3">
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedDistrict && (
                  <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="h-5 w-5 text-success mr-2" />
                      <span className="font-medium text-success">Region Selected</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You've selected {selectedDistrict}. You'll get personalized recommendations for this region.
                    </p>
                  </div>
                )}

                <Button 
                  onClick={handleConfirmRegion}
                  disabled={!selectedDistrict}
                  className="w-full h-14 text-lg bg-gradient-primary hover:opacity-90 disabled:opacity-50"
                >
                  {t('region.confirmButton')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="text-lg text-white font-semibold text-foreground mb-2">
                Why do we need your location?
              </h3>
              <p className="text-lg text-white font-semibold text-foreground mb-2">
                Your location helps us provide accurate weather data, suitable crop recommendations, 
                and region-specific agricultural insights tailored to your local conditions and climate patterns.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
