import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AgrowHeader } from './AgrowHeader';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, ArrowRight, CheckCircle, Settings } from 'lucide-react';
import * as React from "react";

interface RegionSelectionProps {
  onRegionSelected: (district: string) => void;
  onNavigate: (path: string) => void; // added navigation prop
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
    <div className="min-h-screen bg-gradient-earth">
      <AgrowHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('region.title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('region.subtitle')}
          </p>
        </div>

        {/* Grid for 3 cards */}
        <div className="grid lg:grid-cols-3 gap-8">
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

          {/* Maharashtra Map Card */}
          <Card className="shadow-elevated">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">{t('region.mapTitle')}</h2>
   
              {/* Image-based Maharashtra Map */}
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/mapp.jpeg"   // ✅ put your second image in /public with this name
                  alt="Maharashtra Map"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-xl font-semibold text-foreground mt-4 text-center">
                Maharashtra
              </h3>
              <p className="text-muted-foreground text-center">
                {selectedDistrict ? `${t('region.selected')}: ${selectedDistrict}` : t('region.selectDistrict')}
              </p>

              <div className="mt-6 space-y-3">
                <h3 className="font-semibold text-foreground">{t('region.benefitsTitle')}</h3>
                <ul className="space-y-2">
                  {[
                    t('region.benefit1'),
                    t('region.benefit2'),
                    t('region.benefit3'),
                    t('region.benefit4')
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Crop Prices Card */}
          <Card className="shadow-xl border-2 border-green-300 bg-gradient-to-br from-green-100 to-green-50 hover:scale-105 transition-transform duration-300">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mb-4">
                <Settings className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">{t('region.cropPricesTitle')}</h2>
              <p className="text-muted-foreground mb-4">
                {t('region.cropPricesDesc')}
              </p>
              <Button 
                variant="outline"
                className="h-12 px-6"
                onClick={() => onNavigate('crop_prices')}
              >
                {t('region.viewPricesButton')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <Card className="bg-muted/50 border-muted">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Why do we need your location?
              </h3>
              <p className="text-muted-foreground">
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
