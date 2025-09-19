import { useState } from 'react';
import {LandingPage} from '../components/LandingPage';
import {RegionSelection} from '../components/RegionSelection';
import {CropSelection} from '../components/CropSelection';
import {MainDashboard} from '../components/MainDashboard';
import DiseaseDetection from '../components/DiseaseDetection';
import ChatbotPage from '../components/ChatbotPage';
import {SettingsPage} from '../components/SettingsPage';
import { ThemeProvider } from '../components/ThemeProvider';
import  AgmarknetDashboard  from '../components/AgmarknetDashboard';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);

  const handlePageNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const handleRegionSelection = (district: string) => {
    setSelectedDistrict(district);
    setCurrentPage('crop-selection');
  };

  const handleCropSelection = (crops: string[]) => {
    setSelectedCrops(crops);
    setCurrentPage('dashboard');
  };

  const handleGetStarted = () => {
    setCurrentPage('region-selection');
  };

  const handleLearnMore = () => {
    // Could navigate to an about page or show more info
    console.log('Learn more clicked');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage 
            onGetStarted={handleGetStarted}
            onLearnMore={handleLearnMore}
          />
        );
      case 'crop_prices':
        return (
          <AgmarknetDashboard/>
        );
      
      case 'region-selection':
        return (
          <RegionSelection 
            onRegionSelected={handleRegionSelection}
            onNavigate={handlePageNavigation}
          />
        );
      
      case 'crop-selection':
        return (
          <CropSelection 
            onCropsSelected={handleCropSelection}
          />
        );
      
      case 'dashboard':
        return (
          <MainDashboard 
            selectedDistrict={selectedDistrict}
            selectedCrops={selectedCrops}
            onNavigate={handlePageNavigation}
          />
        );
      
      case 'disease-detection':
        return (
          <DiseaseDetection 
            onNavigate={handlePageNavigation}
          />
        );
      
      case 'chatbot':
        return (
          <ChatbotPage 
            onNavigate={handlePageNavigation}
          />
        );
      
      case 'settings':
        return (
          <SettingsPage 
            onNavigate={handlePageNavigation}
          />
        );
      
      default:
        return (
          <LandingPage 
            onGetStarted={handleGetStarted}
            onLearnMore={handleLearnMore}
          />
        );
    }
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className="min-h-screen">
        {renderCurrentPage()}
      </div>
    </ThemeProvider>
  );
};

export default Index;
