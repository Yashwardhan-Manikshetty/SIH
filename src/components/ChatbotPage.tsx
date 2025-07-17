import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AgrowHeader } from './AgrowHeader';
import { 
  ArrowLeft, 
  Send, 
  Mic, 
  MicOff, 
  Bot, 
  User, 
  Leaf, 
  CloudRain, 
  Lightbulb 
} from 'lucide-react';

interface ChatbotPageProps {
  onNavigate: (page: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

export const ChatbotPage = ({ onNavigate }: ChatbotPageProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      content: 'Hello! I\'m your Agrow AI assistant. I can help you with crop recommendations, weather insights, disease identification, and farming best practices. How can I assist you today?',
      timestamp: new Date(),
      suggestions: [
        'Best crops for current season',
        'Weather forecast for my area',
        'Disease prevention tips',
        'Soil preparation advice'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    let response = '';
    let suggestions: string[] = [];

    if (lowerMessage.includes('weather') || lowerMessage.includes('forecast')) {
      response = 'Based on current weather data for your region, we expect moderate rainfall in the next 3 days with temperatures ranging from 25-30°C. Humidity levels will be around 70%. This is ideal for crops like rice and cotton. Would you like specific recommendations for your selected crops?';
      suggestions = ['Crop recommendations for rainy season', 'Pest control in humid weather', 'Soil drainage tips'];
    } else if (lowerMessage.includes('crop') || lowerMessage.includes('plant')) {
      response = 'For your region and the current season, I recommend considering soybean, cotton, and tur dal. These crops are well-suited to your local climate and soil conditions. Soybean has a 92% suitability score for your area. Would you like detailed planting instructions?';
      suggestions = ['Soybean planting guide', 'Cotton cultivation tips', 'Tur dal best practices'];
    } else if (lowerMessage.includes('disease') || lowerMessage.includes('pest')) {
      response = 'Common diseases in your area this season include leaf blight, rust, and aphid infestations. For prevention, ensure proper spacing between plants, avoid overwatering, and consider organic neem-based pesticides. Would you like specific treatment recommendations?';
      suggestions = ['Organic pest control methods', 'Disease identification guide', 'Preventive care schedule'];
    } else if (lowerMessage.includes('soil') || lowerMessage.includes('fertilizer')) {
      response = 'For optimal soil health, I recommend testing your soil pH and nutrient levels. Based on typical conditions in your region, consider adding organic compost and balanced NPK fertilizer. Soil preparation should begin 2-3 weeks before planting. Need specific fertilizer recommendations?';
      suggestions = ['Soil testing procedures', 'Organic fertilizer options', 'Soil pH management'];
    } else if (lowerMessage.includes('price') || lowerMessage.includes('market')) {
      response = 'Current market prices show good demand for cotton and soybean. Cotton is trading at ₹6,200/quintal and soybean at ₹4,800/quintal. These prices are 8% higher than last month. Would you like market trend analysis?';
      suggestions = ['Market price trends', 'Best time to sell', 'Storage tips for better prices'];
    } else {
      response = 'I understand you\'re looking for farming guidance. I can help with crop selection, weather forecasts, disease identification, soil management, and market insights. Could you please be more specific about what you\'d like to know?';
      suggestions = ['Weather updates', 'Crop recommendations', 'Disease prevention', 'Market prices'];
    }

    return {
      id: Date.now().toString(),
      sender: 'bot',
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input functionality would be implemented here
  };

  return (
    <div className="min-h-screen bg-gradient-earth flex flex-col">
      <AgrowHeader 
        showLanguageSelector={true}
        showDarkMode={true}
      />
      
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('dashboard')}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Agrow AI Assistant</h1>
              <p className="text-muted-foreground">Get instant farming advice and insights</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <Card className="flex-1 flex flex-col shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-between">
              <span>Chat</span>
              <Badge variant="secondary" className="bg-success/10 text-success">
                Online
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 max-h-96">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'user' 
                        ? 'bg-primary ml-2' 
                        : 'bg-muted mr-2'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4 text-primary-foreground" />
                      ) : (
                        <Bot className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    
                    <div className={`rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted mr-2">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length > 0 && messages[messages.length - 1].sender === 'bot' && messages[messages.length - 1].suggestions && (
              <div className="px-6 py-4 border-t">
                <p className="text-sm font-medium text-foreground mb-2">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-xs"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Input Area */}
        <Card className="mt-4 shadow-card">
          <CardContent className="p-4">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Ask me anything about farming..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                  className="pr-12"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleVoiceInput}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                    isListening ? 'text-destructive' : 'text-muted-foreground'
                  }`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
              <Button 
                onClick={() => handleSendMessage(inputMessage)}
                className="bg-gradient-primary hover:opacity-90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="cursor-pointer hover:shadow-elevated transition-shadow" onClick={() => handleSendMessage('What crops should I plant this season?')}>
            <CardContent className="p-4 text-center">
              <Leaf className="h-8 w-8 mx-auto mb-2 text-success" />
              <h3 className="font-medium text-foreground">Crop Advice</h3>
              <p className="text-sm text-muted-foreground">Get planting recommendations</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-elevated transition-shadow" onClick={() => handleSendMessage('What\'s the weather forecast for this week?')}>
            <CardContent className="p-4 text-center">
              <CloudRain className="h-8 w-8 mx-auto mb-2 text-sky" />
              <h3 className="font-medium text-foreground">Weather Insights</h3>
              <p className="text-sm text-muted-foreground">Check weather conditions</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-elevated transition-shadow" onClick={() => handleSendMessage('How can I improve my farming practices?')}>
            <CardContent className="p-4 text-center">
              <Lightbulb className="h-8 w-8 mx-auto mb-2 text-harvest" />
              <h3 className="font-medium text-foreground">Farming Tips</h3>
              <p className="text-sm text-muted-foreground">Learn best practices</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};