import {CropSelection} from '../components/CropSelection';
import { useNavigate } from 'react-router-dom';

const CropSelectionRoute = () => {
  const navigate = useNavigate();

  const handleCropSelection = (crops: string[]) => {
    // Store crops in sessionStorage for now, could use context or state management later
    sessionStorage.setItem('selectedCrops', JSON.stringify(crops));
    navigate('/dashboard');
  };

  return (
    <CropSelection 
      onCropsSelected={handleCropSelection}
    />
  );
};

export default CropSelectionRoute;
