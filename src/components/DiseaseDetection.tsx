import React, { useState } from "react";

const DiseaseDetection: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setIsAnalyzing(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch(`${API_BASE}/detect`, {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Detection failed");
        const data = await res.json();
        setAnalysisResult({
          disease: data.disease,
          confidence: Math.round(data.confidence * 100),
          source: "server",
        });
      } catch (err) {
        console.error(err);
        setAnalysisResult(null);
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Disease Detection</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <div className="mt-4">
          <img src={image} alt="Uploaded" className="max-w-xs rounded shadow" />
        </div>
      )}
      {isAnalyzing && <p className="mt-4 text-blue-600">Analyzing image...</p>}
      {analysisResult && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p>Disease: {analysisResult.disease}</p>
          <p>Confidence: {analysisResult.confidence}%</p>
        </div>
      )}
    </div>
  );
};

export default DiseaseDetection;
