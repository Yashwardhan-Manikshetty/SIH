import { Outlet, useLocation } from 'react-router-dom';
import { UnifiedHeader } from './UnifiedHeader';
import { ThemeProvider } from './ThemeProvider';
import UserFlowProgress from './UserFlowProgress';
import { useAuth } from '@/contexts/AuthContext';

const Layout = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Show progress indicator for user flow steps
  const showProgress = isAuthenticated && [
    '/region-selection',
    '/crop-selection', 
    '/dashboard'
  ].includes(location.pathname);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-gray-50">
        <UnifiedHeader 
          showLanguageSelector={true}
          showVoiceAssistant={false}
          showDarkMode={true}
          showMobileMenu={true}
          variant="default"
        />
        {/* {showProgress && <UserFlowProgress />} */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
