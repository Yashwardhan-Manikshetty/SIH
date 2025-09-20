import {MainDashboard} from '../components/MainDashboard';
import { useNavigate } from 'react-router-dom';

const DashboardRoute = () => {
  const navigate = useNavigate();

  // Get stored data from sessionStorage
  const selectedDistrict = sessionStorage.getItem('selectedDistrict') || '';
  const selectedCrops = JSON.parse(sessionStorage.getItem('selectedCrops') || '[]');

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
    <MainDashboard 
      selectedDistrict={selectedDistrict}
      selectedCrops={selectedCrops}
      onNavigate={handleNavigate}
    />
  );
};

export default DashboardRoute;
