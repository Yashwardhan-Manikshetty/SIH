import React from 'react';
import { MainDashboard } from '../components/MainDashboard';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../i18n'; // Import i18n setup

// Language Selector Component
function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng); // remember user's language
  };

  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="p-2 rounded-md border border-gray-300 text-sm bg-white shadow-sm"
    >
      <option value="en">English</option>
      <option value="mr">मराठी</option>
      <option value="hi">हिन्दी</option>
    </select>
  );
}

const DashboardRoute = () => {
  const navigate = useNavigate();

  // ✅ Get stored data from sessionStorage
  const selectedDistrict = sessionStorage.getItem('selectedDistrict') || '';
  const selectedCrops = JSON.parse(sessionStorage.getItem('selectedCrops') || '[]');

  // ✅ Handle navigation as before
  const handleNavigate = (page: string) => {
    switch (page) {
      case 'landing':
        navigate('/');
        break;
      case 'region-selection':
        navigate('/region-selection');
        break;
      case 'crop-selection':
        navigate('/crop-selection');
        break;
      case 'disease-detection':
        navigate('/disease-detection');
        break;
      case 'chatbot':
        navigate('/chatbot');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'crop_prices':
        navigate('/crop-prices');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Add top navbar with language selector */}
      <div className="flex justify-between items-center p-4 bg-green-700 text-white shadow-md">
        <h1 className="text-lg font-bold">Agrow Dashboard</h1>
        <LanguageSelector />
      </div>

      {/* ✅ Keep your existing MainDashboard */}
      <MainDashboard 
        selectedDistrict={selectedDistrict}
        selectedCrops={selectedCrops}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default DashboardRoute;
