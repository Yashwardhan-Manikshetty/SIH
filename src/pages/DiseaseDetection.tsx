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

  return <DiseaseDetection onNavigate={handleNavigate} />;
};

export default DiseaseDetectionRoute;
