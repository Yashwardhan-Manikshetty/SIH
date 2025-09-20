import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
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
    'auth.login.link': 'Sign In',
    'auth.register.title': 'Join AgrowAI',
    'auth.register.subtitle': 'Create your account to get started',
    'auth.register.formTitle': 'Create Account',
    'auth.register.button': 'Create Account',
    'auth.register.switchText': 'Already have an account?',
    'auth.register.link': 'Sign Up',
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
    'auth.info.note': 'Your information is secure and will only be used to provide better farming insights.'
  },
  mr: {
    'auth.login.title': 'पुन्हा स्वागत',
    'auth.login.subtitle': 'तुमच्या शेत डॅशबोर्डमध्ये प्रवेश करण्यासाठी साइन इन करा',
    'auth.login.formTitle': 'साइन इन',
    'auth.login.button': 'साइन इन',
    'auth.login.switchText': 'खाते नाही?',
    'auth.login.link': 'साइन अप',
    'auth.register.title': 'AgrowAI मध्ये सामील व्हा',
    'auth.register.subtitle': 'सुरुवात करण्यासाठी तुमचे खाते तयार करा',
    'auth.register.formTitle': 'खाते तयार करा',
    'auth.register.button': 'खाते तयार करा',
    'auth.register.switchText': 'आधीच खाते आहे?',
    'auth.register.link': 'साइन इन',
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
    'auth.info.note': 'तुमची माहिती सुरक्षित आहे आणि केवळ चांगल्या शेती अंतर्दृष्टीसाठी वापरली जाईल.'
  },
  hi: {
    'auth.login.title': 'वापस स्वागत है',
    'auth.login.subtitle': 'अपने फार्म डैशबोर्ड तक पहुंचने के लिए साइन इन करें',
    'auth.login.formTitle': 'साइन इन',
    'auth.login.button': 'साइन इन',
    'auth.login.switchText': 'खाता नहीं है?',
    'auth.login.link': 'साइन अप',
    'auth.register.title': 'AgrowAI में शामिल हों',
    'auth.register.subtitle': 'शुरुआत करने के लिए अपना खाता बनाएं',
    'auth.register.formTitle': 'खाता बनाएं',
    'auth.register.button': 'खाता बनाएं',
    'auth.register.switchText': 'पहले से खाता है?',
    'auth.register.link': 'साइन इन',
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
    'auth.info.note': 'आपकी जानकारी सुरक्षित है और केवल बेहतर कृषि अंतर्दृष्टि प्रदान करने के लिए उपयोग की जाएगी।'
  }
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations['en']] || key;
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
