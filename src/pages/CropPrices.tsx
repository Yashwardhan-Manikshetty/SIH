import AgmarknetDashboard from '../components/AgmarknetDashboard';
import { useNavigate } from 'react-router-dom';

const CropPricesRoute = () => {
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
      case 'disease-detection':
        navigate('/disease-detection');
        break;
      case 'chatbot':
        navigate('/chatbot');
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <AgmarknetDashboard />
  );
};

export default CropPricesRoute;
