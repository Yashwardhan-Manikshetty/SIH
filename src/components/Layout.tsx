import { Outlet, useLocation } from "react-router-dom";
import { UnifiedHeader } from "./UnifiedHeader";
import { ThemeProvider } from "./ThemeProvider";
import UserFlowProgress from "./UserFlowProgress";
import { useAuth } from "@/contexts/AuthContext";

const Layout = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // Show progress indicator for user flow steps
  const showProgress =
    isAuthenticated &&
    ["/region-selection", "/crop-selection", "/dashboard"].includes(
      location.pathname
    );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <UnifiedHeader
          showLanguageSelector={true}
          showVoiceAssistant={true}   // turned ON for better UX
          showDarkMode={true}
          showMobileMenu={true}
          variant="default"
        />

        {/* Optional progress bar */}
        {showProgress && (
          <div className="max-w-7xl mx-auto w-full px-4">
            <UserFlowProgress />
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
