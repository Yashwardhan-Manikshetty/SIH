import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Camera,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Leaf,
  Shield,
  Eye,
  Zap,
} from 'lucide-react';

interface DiseaseDetectionProps {
  onNavigate: (page: string) => void;
}

interface AnalysisResult {
  disease: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  crop?: string;
  description: string;
  symptoms: string[];
  treatment: string[];
  prevention: string[];
}

export const DiseaseDetection = ({ onNavigate }: DiseaseDetectionProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const API_BASE = "http://localhost:8000";

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));
    setIsAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`${API_BASE}/predict`, { method: "POST", body: formData });
      if (!res.ok) throw new Error("Detection failed");
      const data = await res.json();
      console.log(data);

      setAnalysisResult({
        disease: data.prediction ?? "Unknown",
        confidence: Math.round(data?.confidence * 100),
        severity: data.severity ?? (
          data.confidence > 0.8 ? "High" :
          data.confidence > 0.5 ? "Medium" : "Low"
        ),
        crop: data.crop || "Unknown crop",
        description: data.description || "No description provided.",
        symptoms: (Array.isArray(data.symptoms) ? data.symptoms : [])
          .filter(s => typeof s === "string" && s.trim() !== ""),
        treatment: (Array.isArray(data.treatment) ? data.treatment : [])
          .filter(t => typeof t === "string" && t.trim() !== ""),
        prevention: (Array.isArray(data.prevention) ? data.prevention : [])
          .filter(p => typeof p === "string" && p.trim() !== ""),
      });
      
      
    } catch (err) {
      console.error(err);
      setAnalysisResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    if (selectedImage) URL.revokeObjectURL(selectedImage);
    setSelectedImage(null);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'bg-success/10 text-success border-success/20';
      case 'Medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'High': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => onNavigate('dashboard')} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Disease Detection</h1>
            <p className="text-muted-foreground">Upload or capture plant images for AI-powered disease diagnosis</p>
          </div>
        </div>

        {!selectedImage ? (
          <UploadSection onUpload={handleImageUpload} isDisabled={isAnalyzing} />
        ) : (
          <AnalysisSection
            selectedImage={selectedImage}
            analysisResult={analysisResult}
            isAnalyzing={isAnalyzing}
            onReset={resetAnalysis}
            onNavigate={onNavigate}
            getSeverityColor={getSeverityColor}
          />
        )}
      </div>
    </div>
  );
};

export default DiseaseDetection;

/* ---------------- Upload Section ---------------- */
interface UploadProps {
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
}

const UploadSection = ({ onUpload, isDisabled }: UploadProps) => (
  <div className="space-y-6">
    {/* Upload Options */}
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Camera className="mr-2 h-5 w-5 text-primary" />
          Upload Plant Image
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {['Take Photo', 'Upload Image'].map((type, i) => (
            <label key={i} className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                capture={type === 'Take Photo' ? 'environment' : undefined}
                onChange={onUpload}
                className="hidden"
                disabled={isDisabled}
              />
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors">
                {type === 'Take Photo' ? (
                  <Camera className="h-12 w-12 mx-auto mb-4 text-primary" />
                ) : (
                  <Upload className="h-12 w-12 mx-auto mb-4 text-primary" />
                )}
                <h3 className="text-lg font-semibold text-foreground mb-2">{type}</h3>
                <p className="text-muted-foreground">
                  {type === 'Take Photo'
                    ? 'Use your camera to capture plant disease'
                    : 'Select image from your device'}
                </p>
              </div>
            </label>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* Tips */}
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Eye className="mr-2 h-5 w-5 text-success" />
          Tips for Better Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Photo Quality</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Take clear, well-lit photos</li>
              <li>• Focus on affected plant parts</li>
              <li>• Avoid blurry or dark images</li>
              <li>• Include multiple angles if possible</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Best Practices</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Capture symptoms clearly</li>
              <li>• Include healthy parts for comparison</li>
              <li>• Take photos in natural light</li>
              <li>• Fill the frame with the plant</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

/* ---------------- Analysis Section ---------------- */
interface AnalysisProps {
  selectedImage: string;
  analysisResult: AnalysisResult | null;
  isAnalyzing: boolean;
  onReset: () => void;
  onNavigate: (page: string) => void;
  getSeverityColor: (severity: string) => string;
}

const AnalysisSection = ({
  selectedImage,
  analysisResult,
  isAnalyzing,
  onReset,
  onNavigate,
  getSeverityColor,
}: AnalysisProps) => (
  <div className="space-y-6">
    {/* Image Preview */}
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <ImageIcon className="mr-2 h-5 w-5 text-primary" />
            Uploaded Image
          </div>
          <Button variant="outline" onClick={onReset}>
            Upload New Image
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-muted rounded-lg overflow-hidden">
          <img src={selectedImage} alt="Plant disease analysis" className="w-full h-full object-cover" />
        </div>
      </CardContent>
    </Card>

    {/* Loading */}
    {isAnalyzing && (
      <Card className="shadow-card">
        <CardContent className="p-8 text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Analyzing Image...</h3>
          <p className="text-muted-foreground">Our AI is examining your plant for disease symptoms</p>
        </CardContent>
      </Card>
    )}

    {/* Results */}
    {analysisResult && !isAnalyzing && (
      <div className="space-y-6">
        {/* Disease Identification */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5 text-primary" />
              Disease Identification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{analysisResult.disease}</h3>
                <p className="text-muted-foreground">Detected in {analysisResult.crop}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{analysisResult.confidence}%</div>
                <div className="text-sm text-muted-foreground">Confidence</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-4">
              <Badge className={getSeverityColor(analysisResult.severity)}>
                {analysisResult.severity} Severity
              </Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 mr-1 text-success" />
                Analysis Complete
              </div>
            </div>

            <p className="text-muted-foreground">{analysisResult.description}</p>
          </CardContent>
        </Card>

        {/* Symptoms */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-warning" />
              Symptoms Identified
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysisResult.symptoms.map((s, i) => (
                <li key={i} className="flex items-center">
                  <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                  <span className="text-foreground">{s}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Treatment & Prevention */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-success" />
                Treatment Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {analysisResult.treatment.map((step, i) => (
                  <li key={i} className="flex items-start">
                    <span className="bg-success text-success-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-foreground">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Leaf className="mr-2 h-5 w-5 text-primary" />
                Prevention Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysisResult.prevention.map((tip, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Chatbot */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Need More Help?</h3>
            <p className="text-muted-foreground mb-4">
              Get personalized treatment advice from our AI assistant
            </p>
            <Button onClick={() => onNavigate('chatbot')} className="bg-gradient-primary hover:opacity-90">
              Get Treatment Advice
            </Button>
          </CardContent>
        </Card>
      </div>
    )}
  </div>
);
