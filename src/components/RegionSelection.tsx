import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FarmWiseHeader } from './FarmWiseHeader';
import { MapPin, ArrowRight, CheckCircle } from 'lucide-react';

interface RegionSelectionProps {
  onRegionSelected: (district: string) => void;
}

export const RegionSelection = ({ onRegionSelected }: RegionSelectionProps) => {
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const districts = [
    'Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur', 'Amravati',
    'Sangli', 'Satara', 'Ahmednagar', 'Latur', 'Dhule', 'Jalgaon', 'Akola', 'Yavatmal',
    'Nanded', 'Osmanabad', 'Beed', 'Parbhani', 'Buldhana', 'Washim', 'Hingoli', 'Jalna',
    'Chandrapur', 'Gadchiroli', 'Gondiya', 'Bhandara', 'Wardha', 'Raigad', 'Thane',
    'Ratnagiri', 'Sindhudurg', 'Nandurbar'
  ];

  const handleConfirmRegion = () => {
    if (selectedDistrict) {
      onRegionSelected(selectedDistrict);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <FarmWiseHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Select Your Region
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your district to get personalized agricultural insights and recommendations for your area.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* District Selection */}
          <Card className="shadow-elevated">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">Choose District</h2>
                  <p className="text-muted-foreground">Select your district from the dropdown</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    District
                  </label>
                  <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                    <SelectTrigger className="w-full h-14 text-lg">
                      <SelectValue placeholder="Select your district" />
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
                  Confirm Region
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Maharashtra Map Visualization */}
          <Card className="shadow-elevated">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Maharashtra Map</h2>
              
              {/* Simplified Maharashtra Map */}
              <div className="aspect-square bg-gradient-sky rounded-2xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="h-16 w-16 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Maharashtra</h3>
                  <p className="text-muted-foreground">
                    {selectedDistrict ? `Selected: ${selectedDistrict}` : 'Select your district above'}
                  </p>
                </div>
              </div>

              {/* Region Benefits */}
              <div className="mt-6 space-y-3">
                <h3 className="font-semibold text-foreground">What you'll get:</h3>
                <ul className="space-y-2">
                  {[
                    'Localized weather forecasts',
                    'Region-specific crop recommendations',
                    'Local disease outbreak alerts',
                    'Soil health insights for your area',
                    'Market price updates'
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