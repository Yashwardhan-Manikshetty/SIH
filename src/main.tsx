import React from "react";
import { useTranslation } from "react-i18next";

// 🌐 Language Selector
function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <select
      value={i18n.language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="bg-white text-black p-2 rounded-md border"
    >
      <option value="en">English</option>
      <option value="mr">मराठी</option>
      <option value="hi">हिन्दी</option>
    </select>
  );
}

// 🌾 Navbar Component
function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-green-700 text-white shadow-md">
      <h1 className="text-lg font-bold">Agrow Dashboard</h1>
      <LanguageSelector />
    </div>
  );
}

// 📊 Dashboard Component
function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-2">{t("welcome")}</h2>
      <p className="text-gray-700 mb-4">
        {t("selectedCrops", { district: "Pune", count: 3 })}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold text-green-700 mb-1">
            {t("diseaseDetection")}
          </h3>
          <p className="text-sm text-gray-600">AI-powered crop health check</p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="font-bold text-green-700 mb-1">{t("aiAssistant")}</h3>
          <p className="text-sm text-gray-600">
            Ask your smart farming assistant
          </p>
        </div>
      </div>
    </div>
  );
}

// 🌿 Root Component
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
