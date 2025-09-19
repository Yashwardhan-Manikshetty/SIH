import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AgrowHeader } from './AgrowHeader';
import { MapPin, ArrowRight, CheckCircle } from 'lucide-react';
import * as React from "react";

interface RegionSelectionProps {
  onRegionSelected: (state: string, district: string) => void;
  onNavigate: (path: string) => void;
}

export const RegionSelection = ({ onRegionSelected }: RegionSelectionProps) => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  // Example states with districts
  const statesWithDistricts: Record<string, string[]> = {
    Maharashtra: [
      'Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Solapur', 'Kolhapur',
      'Sangli', 'Satara', 'Jalgaon',
    ],
    Punjab: [
      'Amritsar', 'Ludhiana', 'Patiala', 'Jalandhar', 'Bathinda',
    ],
  };

  const handleConfirmRegion = () => {
    if (selectedState && selectedDistrict) {
      onRegionSelected(selectedState, selectedDistrict);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth flex flex-col">
      <AgrowHeader />

      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Select Your Region
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your state and district to get personalized agricultural insights and recommendations for your area.
          </p>
        </div>

        {/* Centered Card */}
        <div className="flex justify-center w-full">
          <Card className="shadow-elevated w-full max-w-lg">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-foreground">Choose Region</h2>
                  <p className="text-muted-foreground">Select your state and district</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* State Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    State
                  </label>
                  <Select
                    value={selectedState}
                    onValueChange={(value) => { setSelectedState(value); setSelectedDistrict(''); }}
                  >
                    <SelectTrigger className="w-full h-14 text-lg">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {Object.keys(statesWithDistricts).map((state) => (
                        <SelectItem key={state} value={state} className="text-lg py-3">
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* District Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    District
                  </label>
                  <Select
                    value={selectedDistrict}
                    onValueChange={setSelectedDistrict}
                    disabled={!selectedState}
                  >
                    <SelectTrigger className="w-full h-14 text-lg">
                      <SelectValue placeholder="Select your district" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {selectedState &&
                        statesWithDistricts[selectedState]?.map((district) => (
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
                      You've selected {selectedDistrict}, {selectedState}. You'll get personalized recommendations for this region.
                    </p>
                  </div>
                )}

                <Button
                  onClick={handleConfirmRegion}
                  disabled={!selectedState || !selectedDistrict}
                  className="w-full h-14 text-lg bg-gradient-primary hover:opacity-90 disabled:opacity-50"
                >
                  Confirm Region
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
