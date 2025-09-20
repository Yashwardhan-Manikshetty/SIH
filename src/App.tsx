import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import RegionSelection from "./pages/RegionSelection";
import CropSelection from "./pages/CropSelection";
import Dashboard from "./pages/Dashboard";
import DiseaseDetection from "./pages/DiseaseDetection";
import Chatbot from "./pages/Chatbot";
import Settings from "./pages/Settings";
import CropPrices from "./pages/CropPrices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<Layout />}>
            <Route path="region-selection" element={<RegionSelection />} />
            <Route path="crop-selection" element={<CropSelection />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="disease-detection" element={<DiseaseDetection />} />
            <Route path="chatbot" element={<Chatbot />} />
            <Route path="settings" element={<Settings />} />
            <Route path="crop-prices" element={<CropPrices />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
