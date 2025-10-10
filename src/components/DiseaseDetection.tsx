import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, ArrowLeft, Upload } from "lucide-react";

interface DiseaseDetectionProps {
  onNavigate: (page: string) => void;
}

interface AnalysisResult {
  disease: string;
  confidence: number;
  cause: string;
  symptoms: string[];
  prevention: string[];
  treatment: string[];
  severity: "Low" | "Medium" | "High";
  description: string;
}

const API_BASE = "http://localhost:8000";

export const DiseaseDetection = ({ onNavigate }: DiseaseDetectionProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedImage(URL.createObjectURL(file));
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_BASE}/predict`, { method: "POST", body: formData });
      const data = await res.json();

      setAnalysisResult({
        disease: data.prediction || "Unknown Disease",
        confidence: Math.round((data.confidence ?? 0) * 100),
        cause: data.cause || "Not available",
        symptoms: data.symptoms || [],
        prevention: data.prevention || [],
        treatment: data.treatment || [],
        description: data.description || "",
        severity: data.confidence > 0.8 ? "High" : data.confidence > 0.5 ? "Medium" : "Low",
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      setAnalysisResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low":
        return "bg-green-100 text-green-700 border-green-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "High":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-lime-50">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
        {/* Header */}
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => onNavigate("dashboard")} className="mr-4">
            <ArrowLeft className="h-5 w-5 mr-2" /> Back
          </Button>
          <h1 className="text-3xl font-extrabold text-emerald-800">
            🌱 AI Disease Detection
          </h1>
        </div>

        {/* Upload Card */}
        <Card className="shadow-lg border border-emerald-200 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-emerald-800">
              <Camera className="mr-2 h-6 w-6 text-emerald-600" /> Upload or Drop Image
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* Upload Box */}
            <label
              htmlFor="file-upload"
              className="border-2 border-dashed border-emerald-300 rounded-2xl flex flex-col items-center justify-center py-12 cursor-pointer hover:bg-emerald-50 transition duration-300"
            >
              <Upload className="w-10 h-10 text-emerald-500 mb-3" />
              <p className="text-emerald-700 font-medium">
                Click to upload or drag and drop your image
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Supports JPG, PNG, JPEG formats
              </p>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {/* Image Preview */}
            {selectedImage && (
              <motion.div
                className="rounded-xl overflow-hidden mt-6 shadow-md border border-emerald-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <img
                  src={selectedImage}
                  alt="Uploaded Preview"
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            )}

            {/* Loading Message */}
            {isAnalyzing && (
              <motion.p
                className="text-sm text-emerald-600 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                🔍 Analyzing image, please wait...
              </motion.p>
            )}

            {/* Results Section */}
            <AnimatePresence>
              {analysisResult && !isAnalyzing && (
                <motion.div
                  className="mt-6 border-t border-emerald-200 pt-6 space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h3 className="text-2xl font-semibold text-emerald-800">
                    {analysisResult.disease} ({analysisResult.confidence}%)
                  </h3>

                  <Badge className={`${getSeverityColor(analysisResult.severity)} px-3 py-1`}>
                    {analysisResult.severity} Severity
                  </Badge>

                  <p className="text-gray-600">{analysisResult.description}</p>

                  <div>
                    <h4 className="font-semibold text-emerald-700 mt-4">Cause:</h4>
                    <p className="text-gray-600">{analysisResult.cause}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-emerald-700 mt-4">Symptoms:</h4>
                    <ul className="list-disc ml-6 text-gray-600">
                      {analysisResult.symptoms.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-emerald-700 mt-4">Prevention:</h4>
                    <ul className="list-disc ml-6 text-gray-600">
                      {analysisResult.prevention.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-emerald-700 mt-4">Treatment:</h4>
                    <ul className="list-disc ml-6 text-gray-600">
                      {analysisResult.treatment.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiseaseDetection;
