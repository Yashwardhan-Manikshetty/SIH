import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import RegionSelection from "./pages/RegionSelection";
import CropSelection from "./pages/CropSelection";
import Dashboard from "./pages/Dashboard";
import DiseaseDetection from "./pages/DiseaseDetection";
import Chatbot from "./pages/Chatbot";
import Settings from "./pages/Settings";
import CropPrices from "./pages/CropPrices";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import "./i18n"; // ensure i18n loads globally

// ✅ Create a global QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {/* Suspense ensures i18n translations load gracefully */}
            <Suspense
              fallback={
                <div className="flex h-screen items-center justify-center text-lg text-green-700 font-semibold">
                  Loading Agrow AI...
                </div>
              }
            >
              <BrowserRouter>
                <Routes>
                  {/* 🌿 Public routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/auth" element={<Auth />} />

                  {/* 🌾 Main layout routes */}
                  <Route element={<Layout />}>
                    <Route path="disease-detection" element={<DiseaseDetection />} />
                    <Route path="chatbot" element={<Chatbot />} />
                    <Route path="crop-prices" element={<CropPrices />} />

                    {/* 🔒 Protected routes */}
                    <Route
                      path="region-selection"
                      element={
                        <ProtectedRoute>
                          <RegionSelection />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="crop-selection"
                      element={
                        <ProtectedRoute>
                          <CropSelection />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="settings"
                      element={
                        <ProtectedRoute>
                          <Settings />
                        </ProtectedRoute>
                      }
                    />
                  </Route>

                  {/* 🚫 Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </Suspense>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
