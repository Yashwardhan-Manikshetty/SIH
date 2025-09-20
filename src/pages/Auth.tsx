import { AuthPage } from '../components/AuthPage';
import { useNavigate } from 'react-router-dom';

const AuthRoute = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/region-selection');
  };

  return (
    <AuthPage onLoginSuccess={handleLoginSuccess} />
  );
};

export default AuthRoute;
