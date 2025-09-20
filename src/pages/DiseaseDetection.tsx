import DiseaseDetection from '../components/DiseaseDetection';
import { useNavigate } from 'react-router-dom';

const DiseaseDetectionRoute = () => {
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    switch (page) {
      case 'landing':
        navigate('/');
        break;
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'region-selection':
        navigate('/region-selection');
        break;
      case 'crop-selection':
        navigate('/crop-selection');
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
    <DiseaseDetection 
      onNavigate={handleNavigate}
    />
  );
};

export default DiseaseDetectionRoute;
