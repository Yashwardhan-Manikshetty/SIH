import { Outlet } from 'react-router-dom';
import { UnifiedHeader } from './UnifiedHeader';
import { ThemeProvider } from './ThemeProvider';

const Layout = () => {
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
        <main className="max-w-7xl mx-auto px-4 py-6">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
