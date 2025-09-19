import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UnifiedHeader } from './UnifiedHeader';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface CropSelectionProps {
  onCropsSelected: (crops: string[]) => void;
}

export const CropSelection = ({ onCropsSelected }: CropSelectionProps) => {
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);

  const crops = [
    { name: 'Rice', season: 'Kharif', emoji: '🌾' },
    { name: 'Wheat', season: 'Rabi', emoji: '🌾' },
    { name: 'Jowar', season: 'Kharif', emoji: '🌾' },
    { name: 'Soybean', season: 'Kharif', emoji: '🫘' },
    { name: 'Cotton', season: 'Kharif', emoji: '🤍' },
    { name: 'Groundnut', season: 'Kharif', emoji: '🥜' },
    { name: 'Tur', season: 'Kharif', emoji: '🫘' },
    { name: 'Moong', season: 'Kharif', emoji: '🫘' },
    { name: 'Chana', season: 'Rabi', emoji: '🫘' },
    { name: 'Sugarcane', season: 'Annual', emoji: '🎋' },
    { name: 'Onion', season: 'Rabi', emoji: '🧅' },
    { name: 'Tomato', season: 'Rabi', emoji: '🍅' },
    { name: 'Grapes', season: 'Perennial', emoji: '🍇' },
    { name: 'Bajra', season: 'Kharif', emoji: '🌾' },
    { name: 'Maize', season: 'Kharif', emoji: '🌽' }
  ];

  const toggleCrop = (cropName: string) => {
    setSelectedCrops(prev => {
      if (prev.includes(cropName)) {
        return prev.filter(crop => crop !== cropName);
      } else {
        return [...prev, cropName];
      }
    });
  };

  const handleNext = () => {
    if (selectedCrops.length > 0) {
      onCropsSelected(selectedCrops);
    }
  };

  const getSeasonColor = (season: string) => {
    switch (season) {
      case 'Kharif': return 'bg-success/10 text-success border-success/20';
      case 'Rabi': return 'bg-harvest/10 text-harvest border-harvest/20';
      case 'Annual': return 'bg-sky/10 text-sky border-sky/20';
      case 'Perennial': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      {/* <UnifiedHeader 
        showLanguageSelector={true}
        showVoiceAssistant={false}
        showDarkMode={true}
        showMobileMenu={true}
        variant="dashboard"
      /> */}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Select Your Crops
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the crops you're growing or planning to grow. This helps us provide personalized recommendations.
          </p>
        </div>

        {/* Selected Crops Summary */}
        {selectedCrops.length > 0 && (
          <Card className="mb-8 bg-success/5 border-success/20">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-5 w-5 text-success mr-2" />
                <span className="font-medium text-success">
                  {selectedCrops.length} crop{selectedCrops.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCrops.map(crop => (
                  <Badge key={crop} variant="secondary" className="text-sm px-3 py-1">
                    {crop}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Crop Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {crops.map((crop) => {
            const isSelected = selectedCrops.includes(crop.name);
            return (
              <Card 
                key={crop.name}
                className={`cursor-pointer transition-all duration-300 hover:shadow-elevated ${
                  isSelected 
                    ? 'ring-2 ring-primary bg-primary/5 shadow-elevated' 
                    : 'hover:bg-accent/5'
                }`}
                onClick={() => toggleCrop(crop.name)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-4xl mb-3">{crop.emoji}</div>
                  <h3 className="font-semibold text-foreground mb-2">{crop.name}</h3>
                  <Badge className={`text-xs ${getSeasonColor(crop.season)}`}>
                    {crop.season}
                  </Badge>
                  {isSelected && (
                    <div className="mt-2">
                      <CheckCircle className="h-5 w-5 text-primary mx-auto" />
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Season Information */}
        <Card className="mb-8 bg-muted/50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Growing Seasons</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { season: 'Kharif', description: 'Monsoon season (Jun-Oct)', color: 'success' },
                { season: 'Rabi', description: 'Winter season (Nov-Apr)', color: 'harvest' },
                { season: 'Annual', description: 'Year-round cultivation', color: 'sky' },
                { season: 'Perennial', description: 'Multi-year crops', color: 'primary' }
              ].map(({ season, description, color }) => (
                <div key={season} className="text-center">
                  <Badge className={`mb-2 ${getSeasonColor(season)}`}>
                    {season}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <Button 
            onClick={handleNext}
            disabled={selectedCrops.length === 0}
            className="bg-gradient-primary hover:opacity-90 disabled:opacity-50 text-lg px-8 py-6 rounded-lg shadow-elevated"
          >
            Continue to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            You can change your crop selection anytime from the dashboard settings.
          </p>
        </div>
      </div>
    </div>
  );
};