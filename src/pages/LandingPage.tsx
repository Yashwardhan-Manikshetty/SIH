import {LandingPage} from '../components/LandingPage';
import { ThemeProvider } from '../components/ThemeProvider';
import { useNavigate } from 'react-router-dom';

const LandingPageRoute = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/region-selection');
  };

  const handleLearnMore = () => {
    // Could navigate to an about page or show more info
    console.log('Learn more clicked');
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className="min-h-screen">
        <LandingPage 
          onGetStarted={handleGetStarted}
          onLearnMore={handleLearnMore}
        />
      </div>
    </ThemeProvider>
  );
};

export default LandingPageRoute;
