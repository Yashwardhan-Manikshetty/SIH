import {RegionSelection} from '../components/RegionSelection';
import { useNavigate } from 'react-router-dom';

const RegionSelectionRoute = () => {
  const navigate = useNavigate();

  const handleRegionSelection = (district: string) => {
    // Store district in sessionStorage for now, could use context or state management later
    sessionStorage.setItem('selectedDistrict', district);
    navigate('/crop-selection');
  };

  const handleNavigate = (page: string) => {
    switch (page) {
      case 'landing':
        navigate('/');
        break;
      case 'crop_prices':
        navigate('/crop-prices');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <RegionSelection 
      onRegionSelected={handleRegionSelection}
      onNavigate={handleNavigate}
    />
  );
};

export default RegionSelectionRoute;
