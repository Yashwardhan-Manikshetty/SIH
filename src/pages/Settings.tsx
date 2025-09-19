import {SettingsPage} from '../components/SettingsPage';
import { useNavigate } from 'react-router-dom';

const SettingsRoute = () => {
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
      case 'crop_prices':
        navigate('/crop-prices');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <SettingsPage 
      onNavigate={handleNavigate}
    />
  );
};

export default SettingsRoute;
