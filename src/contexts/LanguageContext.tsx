// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  // Updated t function signature to accept options for placeholders
  t: (key: string, options?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// Translation keys
const translations = {
  en: {
    'auth.login.title': 'Welcome Back',
    'auth.login.subtitle': 'Sign in to access your farm dashboard',
    'auth.login.formTitle': 'Sign In',
    'auth.login.button': 'Sign In',
    'auth.login.switchText': "Don't have an account?",
    'auth.login.link': 'Sign Up', // Corrected: If you don't have an account, you sign up
    'auth.register.title': 'Join AgrowAI',
    'auth.register.subtitle': 'Create your account to get started',
    'auth.register.formTitle': 'Create Account',
    'auth.register.button': 'Create Account',
    'auth.register.switchText': 'Already have an account?',
    'auth.register.link': 'Sign In', // Corrected: If you already have an account, you sign in
    'auth.fields.name': 'Full Name',
    'auth.fields.mobileNo': 'Mobile Number',
    'auth.fields.address': 'Address',
    'auth.fields.state': 'State',
    'auth.fields.district': 'District',
    'auth.placeholders.name': 'Enter your full name',
    'auth.placeholders.mobileNo': 'Enter 10-digit mobile number',
    'auth.placeholders.address': 'Enter your complete address',
    'auth.placeholders.state': 'Select your state',
    'auth.placeholders.district': 'Select your district',
    'auth.placeholders.selectStateFirst': 'Select state first',
    'auth.errors.nameRequired': 'Name is required',
    'auth.errors.mobileRequired': 'Mobile number is required',
    'auth.errors.mobileInvalid': 'Please enter a valid 10-digit mobile number',
    'auth.errors.passwordRequired': 'Password is required',
    'auth.errors.passwordTooShort': 'Password must be at least 6 characters',
    'auth.errors.confirmPasswordRequired': 'Please confirm your password',
    'auth.errors.passwordsDoNotMatch': 'Passwords do not match',
    'auth.errors.addressRequired': 'Address is required',
    'auth.errors.stateRequired': 'State is required',
    'auth.errors.districtRequired': 'District is required',
    'auth.info.title': 'Why Join AgrowAI?',
    'auth.info.personalized.title': 'Personalized Insights',
    'auth.info.personalized.desc': 'Get customized farming advice based on your location and crop preferences.',
    'auth.info.localized.title': 'Local Weather Data',
    'auth.info.localized.desc': 'Access real-time weather information for your specific region.',
    'auth.info.regional.title': 'Regional Crop Prices',
    'auth.info.regional.desc': 'Stay updated with market prices in your local area.',
    'auth.info.note': 'Your information is secure and will only be used to provide better farming insights.',

    // --- NEW: Landing Page Translations ---
    'landing.hero.titlePart1': 'Smart Farming for',
    'landing.hero.titlePart2': 'Maharashtra',
    'landing.hero.subtitle': 'AI-powered insights for crop selection, disease diagnosis, and yield optimization based on real-time weather, soil health, and climate data.',
    'landing.hero.getStartedButton': 'Get Started',
    'landing.hero.learnMoreButton': 'Learn More',
    'landing.hero.iotImageAlt': 'Smart Farming IoT',

    'landing.features.title': 'Why Choose Agrow AI?',
    'landing.features.subtitle': 'Comprehensive AI-powered farming solutions designed specifically for Maharashtra\'s diverse agricultural landscape.',
    'landing.features.weather.title': 'Weather Intelligence',
    'landing.features.weather.desc': '7-day forecasts with monsoon predictions and climate insights',
    'landing.features.cropRec.title': 'Crop Recommendations',
    'landing.features.cropRec.desc': 'AI-powered suggestions for optimal crop selection based on your region',
    'landing.features.diseaseDet.title': 'Disease Detection',
    'landing.features.diseaseDet.desc': 'Early identification of crop diseases with treatment recommendations',
    'landing.features.marketPrices.title': 'Current Market Prices',
    'landing.features.marketPrices.desc': 'Latest mandi prices for their crops across districts to make smarter selling decisions.',
    'landing.features.mobileFriendly.title': 'Mobile Friendly',
    'landing.features.mobileFriendly.desc': 'Access insights anywhere, even with limited internet connectivity',
    'landing.features.localLang.title': 'Local Language Support',
    'landing.features.localLang.desc': 'Available in Marathi, Hindi, and English for better accessibility',

    'landing.footer.copyright': '© {year} Agrow AI. All rights reserved.',
    'landing.footer.moto': 'Empowering Maharashtra farmers with AI-powered solutions'
  },
  mr: {
    'auth.login.title': 'पुन्हा स्वागत',
    'auth.login.subtitle': 'तुमच्या शेत डॅशबोर्डमध्ये प्रवेश करण्यासाठी साइन इन करा',
    'auth.login.formTitle': 'साइन इन',
    'auth.login.button': 'साइन इन',
    'auth.login.switchText': 'खाते नाही?',
    'auth.login.link': 'साइन अप करा', // Corrected
    'auth.register.title': 'AgrowAI मध्ये सामील व्हा',
    'auth.register.subtitle': 'सुरुवात करण्यासाठी तुमचे खाते तयार करा',
    'auth.register.formTitle': 'खाते तयार करा',
    'auth.register.button': 'खाते तयार करा',
    'auth.register.switchText': 'आधीच खाते आहे?',
    'auth.register.link': 'साइन इन करा', // Corrected
    'auth.fields.name': 'पूर्ण नाव',
    'auth.fields.mobileNo': 'मोबाइल नंबर',
    'auth.fields.address': 'पत्ता',
    'auth.fields.state': 'राज्य',
    'auth.fields.district': 'जिल्हा',
    'auth.placeholders.name': 'तुमचे पूर्ण नाव प्रविष्ट करा',
    'auth.placeholders.mobileNo': '10-अंकी मोबाइल नंबर प्रविष्ट करा',
    'auth.placeholders.address': 'तुमचा पूर्ण पत्ता प्रविष्ट करा',
    'auth.placeholders.state': 'तुमचे राज्य निवडा',
    'auth.placeholders.district': 'तुमचा जिल्हा निवडा',
    'auth.placeholders.selectStateFirst': 'प्रथम राज्य निवडा',
    'auth.errors.nameRequired': 'नाव आवश्यक आहे',
    'auth.errors.mobileRequired': 'मोबाइल नंबर आवश्यक आहे',
    'auth.errors.mobileInvalid': 'कृपया वैध 10-अंकी मोबाइल नंबर प्रविष्ट करा',
    'auth.errors.passwordRequired': 'पासवर्ड आवश्यक आहे',
    'auth.errors.passwordTooShort': 'पासवर्ड किमान 6 अक्षरे असावे',
    'auth.errors.confirmPasswordRequired': 'कृपया आपला पासवर्ड पुष्टी करा',
    'auth.errors.passwordsDoNotMatch': 'पासवर्ड जुळत नाहीत',
    'auth.errors.addressRequired': 'पत्ता आवश्यक आहे',
    'auth.errors.stateRequired': 'राज्य आवश्यक आहे',
    'auth.errors.districtRequired': 'जिल्हा आवश्यक आहे',
    'auth.info.title': 'AgrowAI मध्ये का सामील व्हावे?',
    'auth.info.personalized.title': 'वैयक्तिकृत अंतर्दृष्टी',
    'auth.info.personalized.desc': 'तुमच्या स्थान आणि पिकाच्या प्राधान्यांवर आधारित सानुकूलित शेती सल्ला मिळवा.',
    'auth.info.localized.title': 'स्थानिक हवामान डेटा',
    'auth.info.localized.desc': 'तुमच्या विशिष्ट प्रदेशासाठी रिअल-टाइम हवामान माहिती मिळवा.',
    'auth.info.regional.title': 'प्रादेशिक पिकाच्या किमती',
    'auth.info.regional.desc': 'तुमच्या स्थानिक क्षेत्रातील बाजार किमतींसह अद्ययावत रहा.',
    'auth.info.note': 'तुमची माहिती सुरक्षित आहे आणि केवळ चांगल्या शेती अंतर्दृष्टीसाठी वापरली जाईल.',

    // --- NEW: Landing Page Translations ---
    'landing.hero.titlePart1': 'स्मार्ट शेती',
    'landing.hero.titlePart2': 'महाराष्ट्रासाठी',
    'landing.hero.subtitle': 'वास्तविक वेळेतील हवामान, मातीचे आरोग्य आणि हवामान डेटावर आधारित पीक निवड, रोग निदान आणि उत्पादन ऑप्टिमायझेशनसाठी AI-शक्तीवर चालणारी अंतर्दृष्टी.',
    'landing.hero.getStartedButton': 'सुरुवात करा',
    'landing.hero.learnMoreButton': 'अधिक जाणून घ्या',
    'landing.hero.iotImageAlt': 'स्मार्ट शेती IoT',

    'landing.features.title': 'Agrow AI का निवडावे?',
    'landing.features.subtitle': 'महाराष्ट्राच्या विविध कृषी भूभागासाठी खास डिझाइन केलेले व्यापक AI-शक्तीवर चालणारे शेती उपाय.',
    'landing.features.weather.title': 'हवामान बुद्धिमत्ता',
    'landing.features.weather.desc': 'मान्सून अंदाज आणि हवामान अंतर्दृष्टीसह 7-दिवसांचे अंदाज',
    'landing.features.cropRec.title': 'पीक शिफारसी',
    'landing.features.cropRec.desc': 'आपल्या प्रदेशावर आधारित सर्वोत्तम पीक निवडीसाठी AI-शक्तीवर चाललेल्या सूचना',
    'landing.features.diseaseDet.title': 'रोग ओळख',
    'landing.features.diseaseDet.desc': 'उपचार शिफारसींसह पिकांच्या रोगांची लवकर ओळख',
    'landing.features.marketPrices.title': 'वर्तमान बाजार भाव',
    'landing.features.marketPrices.desc': 'शेतकऱ्यांना त्यांच्या पिकांच्या जिल्ह्यांमधील नवीनतम मंडी दर माहिती करून smarter विक्रीचे निर्णय घेण्यासाठी मदत.',
    'landing.features.mobileFriendly.title': 'मोबाइल अनुकूल',
    'landing.features.mobileFriendly.desc': 'कमी इंटरनेट कनेक्टिव्हिटी असतानाही कुठेही अंतर्दृष्टी मिळवा',
    'landing.features.localLang.title': 'स्थानिक भाषेचा आधार',
    'landing.features.localLang.desc': 'उत्तम प्रवेशयोग्यतेसाठी मराठी, हिंदी आणि इंग्रजीमध्ये उपलब्ध',

    'landing.footer.copyright': '© {year} Agrow AI. सर्व हक्क राखीव.',
    'landing.footer.moto': 'AI-शक्तीवर चालणाऱ्या उपायांनी महाराष्ट्रातील शेतकऱ्यांना सक्षम करत आहे'
  },
  hi: {
    'auth.login.title': 'वापस स्वागत है',
    'auth.login.subtitle': 'अपने फार्म डैशबोर्ड तक पहुंचने के लिए साइन इन करें',
    'auth.login.formTitle': 'साइन इन',
    'auth.login.button': 'साइन इन',
    'auth.login.switchText': 'खाता नहीं है?',
    'auth.login.link': 'साइन अप करें', // Corrected
    'auth.register.title': 'AgrowAI में शामिल हों',
    'auth.register.subtitle': 'शुरुआत करने के लिए अपना खाता बनाएं',
    'auth.register.formTitle': 'खाता बनाएं',
    'auth.register.button': 'खाता बनाएं',
    'auth.register.switchText': 'पहले से खाता है?',
    'auth.register.link': 'साइन इन करें', // Corrected
    'auth.fields.name': 'पूरा नाम',
    'auth.fields.mobileNo': 'मोबाइल नंबर',
    'auth.fields.address': 'पता',
    'auth.fields.state': 'राज्य',
    'auth.fields.district': 'जिला',
    'auth.placeholders.name': 'अपना पूरा नाम दर्ज करें',
    'auth.placeholders.mobileNo': '10-अंकी मोबाइल नंबर दर्ज करें',
    'auth.placeholders.address': 'अपना पूरा पता दर्ज करें',
    'auth.placeholders.state': 'अपना राज्य चुनें',
    'auth.placeholders.district': 'अपना जिला चुनें',
    'auth.placeholders.selectStateFirst': 'पहले राज्य चुनें',
    'auth.errors.nameRequired': 'नाम आवश्यक है',
    'auth.errors.mobileRequired': 'मोबाइल नंबर आवश्यक है',
    'auth.errors.mobileInvalid': 'कृपया वैध 10-अंकी मोबाइल नंबर दर्ज करें',
    'auth.errors.passwordRequired': 'पासवर्ड आवश्यक है',
    'auth.errors.passwordTooShort': 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए',
    'auth.errors.confirmPasswordRequired': 'कृपया अपना पासवर्ड पुष्टि करें',
    'auth.errors.passwordsDoNotMatch': 'पासवर्ड मेल नहीं खाते',
    'auth.errors.addressRequired': 'पता आवश्यक है',
    'auth.errors.stateRequired': 'राज्य आवश्यक है',
    'auth.errors.districtRequired': 'जिला आवश्यक है',
    'auth.info.title': 'AgrowAI में क्यों शामिल हों?',
    'auth.info.personalized.title': 'व्यक्तिगत अंतर्दृष्टि',
    'auth.info.personalized.desc': 'अपने स्थान और फसल प्राथमिकताओं के आधार पर अनुकूलित कृषि सलाह प्राप्त करें।',
    'auth.info.localized.title': 'स्थानीय मौसम डेटा',
    'auth.info.localized.desc': 'अपने विशिष्ट क्षेत्र के लिए रियल-टाइम मौसम जानकारी प्राप्त करें।',
    'auth.info.regional.title': 'क्षेत्रीय फसल कीमतें',
    'auth.info.regional.desc': 'अपने स्थानीय क्षेत्र में बाजार कीमतों के साथ अपडेट रहें।',
    'auth.info.note': 'आपकी जानकारी सुरक्षित है और केवल बेहतर कृषि अंतर्दृष्टि प्रदान करने के लिए उपयोग की जाएगी।',

    // --- NEW: Landing Page Translations ---
    'landing.hero.titlePart1': 'स्मार्ट फार्मिंग',
    'landing.hero.titlePart2': 'महाराष्ट्र के लिए',
    'landing.hero.subtitle': 'वास्तविक समय के मौसम, मिट्टी के स्वास्थ्य और जलवायु डेटा के आधार पर फसल चयन, रोग निदान और उपज अनुकूलन के लिए AI-संचालित अंतर्दृष्टि।',
    'landing.hero.getStartedButton': 'शुरू करें',
    'landing.hero.learnMoreButton': 'और जानें',
    'landing.hero.iotImageAlt': 'स्मार्ट फार्मिंग IoT',

    'landing.features.title': 'Agrow AI क्यों चुनें?',
    'landing.features.subtitle': 'महाराष्ट्र के विविध कृषि परिदृश्य के लिए विशेष रूप से डिज़ाइन किए गए व्यापक AI-संचालित कृषि समाधान।',
    'landing.features.weather.title': 'मौसम बुद्धिमत्ता',
    'landing.features.weather.desc': 'मानसून पूर्वानुमान और जलवायु अंतर्दृष्टि के साथ 7-दिवसीय पूर्वानुमान',
    'landing.features.cropRec.title': 'फसल सिफारिशें',
    'landing.features.cropRec.desc': 'आपके क्षेत्र के आधार पर इष्टतम फसल चयन के लिए AI-संचालित सुझाव',
    'landing.features.diseaseDet.title': 'रोग का पता लगाना',
    'landing.features.diseaseDet.desc': 'उपचार सिफारिशों के साथ फसल रोगों की शीघ्र पहचान',
    'landing.features.marketPrices.title': 'वर्तमान बाजार मूल्य',
    'landing.features.marketPrices.desc': 'किसानों के लिए उनके फसलों के जिलों में नवीनतम मंडी मूल्य ताकि वे बेहतर बिक्री निर्णय ले सकें।',
    'landing.features.mobileFriendly.title': 'मोबाइल अनुकूल',
    'landing.features.mobileFriendly.desc': 'सीमित इंटरनेट कनेक्टिविटी के साथ भी कहीं भी अंतर्दृष्टि तक पहुंचें',
    'landing.features.localLang.title': 'स्थानीय भाषा समर्थन',
    'landing.features.localLang.desc': 'बेहतर पहुंच के लिए मराठी, हिंदी और अंग्रेजी में उपलब्ध',

    'landing.footer.copyright': '© {year} एग्रो एआई। सर्वाधिकार सुरक्षित।',
    'landing.footer.moto': 'एआई-संचालित समाधानों के साथ महाराष्ट्र के किसानों को सशक्त बनाना'
  }
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // You might want to get initial language from localStorage or user settings
  const [language, setLanguage] = useState('en'); // Default to Hindi as per your original code

  const t = (key: string, options?: { [key: string]: string | number }): string => {
    let translatedText = translations[language as keyof typeof translations]?.[key as keyof typeof translations['en']] || key;

    // Replace placeholders like {year} in the translated text
    if (options) {
      for (const optionKey in options) {
        if (Object.prototype.hasOwnProperty.call(options, optionKey)) {
          translatedText = translatedText.replace(new RegExp(`\\{${optionKey}\\}`, 'g'), String(options[optionKey]));
        }
      }
    }
    return translatedText;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};