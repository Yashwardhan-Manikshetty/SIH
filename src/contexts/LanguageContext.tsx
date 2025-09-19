import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'mr' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // Header
    'header.title': 'Agrow AI',
    'header.subtitle': 'AI-powered Smart Farming for Maharashtra Farmers',
    
    // Landing Page
    'landing.hero.title': 'Smart Farming for',
    'landing.hero.titleHighlight': 'Maharashtra',
    'landing.hero.subtitle': 'AI-powered insights for crop selection, disease diagnosis, and yield optimization based on real-time weather, soil health, and climate data.',
    'landing.hero.getStarted': 'Get Started',
    'landing.hero.learnMore': 'Learn More',
    'landing.features.title': 'Why Choose Agrow AI?',
    'landing.features.subtitle': 'Comprehensive AI-powered farming solutions designed specifically for Maharashtra\'s diverse agricultural landscape.',
    'landing.features.weather.title': 'Weather Intelligence',
    'landing.features.weather.desc': '7-day forecasts with monsoon predictions and climate insights',
    'landing.features.crop.title': 'Crop Recommendations',
    'landing.features.crop.desc': 'AI-powered suggestions for optimal crop selection based on your region',
    'landing.features.disease.title': 'Disease Detection',
    'landing.features.disease.desc': 'Early identification of crop diseases with treatment recommendations',
    'landing.features.market.title': 'Current Market Prices',
    'landing.features.market.desc': 'Latest mandi prices for their crops across districts to make smarter selling decisions.',
    'landing.features.mobile.title': 'Mobile Friendly',
    'landing.features.mobile.desc': 'Access insights anywhere, even with limited internet connectivity',
    'landing.features.language.title': 'Local Language Support',
    'landing.features.language.desc': 'Available in Marathi, Hindi, and English for better accessibility',
    'landing.footer.copyright': '© {year} Agrow AI. All rights reserved.',
    'landing.footer.tagline': 'Empowering Maharashtra farmers with AI-powered solutions',
    
    // Dashboard
    'dashboard.welcome': 'Welcome to Your Farm Dashboard',
    'dashboard.offline.banner': 'You are offline. Showing last saved advisories.',
    'dashboard.quickActions.dashboard': 'Dashboard',
    'dashboard.quickActions.disease': 'Disease Detection',
    'dashboard.quickActions.assistant': 'AI Assistant',
    'dashboard.quickActions.alerts': 'Alerts',
    'dashboard.quickActions.settings': 'Settings',
    'dashboard.weather.title': '7-Day Weather Forecast',
    'dashboard.weather.loading': 'Loading weather...',
    'dashboard.weather.noData': 'No weather data available',
    'dashboard.monsoon.title': 'Monsoon Outlook',
    'dashboard.monsoon.normal': 'Normal',
    'dashboard.monsoon.prediction': 'Monsoon Prediction',
    'dashboard.monsoon.rainfallProgress': 'Rainfall Progress',
    'dashboard.monsoon.soilMoisture': 'Soil Moisture',
    'dashboard.monsoon.expectedRainfall': 'Expected rainfall: 85% of normal',
    'dashboard.monsoon.bestTimeSowing': 'Best time for sowing: Next 2 weeks',
    'dashboard.crops.title': 'Crop Recommendations',
    'dashboard.crops.suitabilityScore': 'Suitability Score',
    'dashboard.crops.risk': 'Risk',
    'dashboard.diseases.title': 'Diseases',
    'dashboard.diseases.action': 'Action',
    'dashboard.yield.title': 'Yield Prediction',
    'dashboard.yield.min': 'Min',
    'dashboard.yield.likely': 'Likely',
    'dashboard.yield.max': 'Max',
    
    // Common
    'common.navigation': 'Navigation',
    'common.cropsSelected': 'crops selected',
    'common.today': 'Today',
    'common.tomorrow': 'Tomorrow',
    'common.low': 'Low',
    'common.medium': 'Medium',
    'common.high': 'High',
    'common.normal': 'Normal',
    'common.clear': 'Clear',
    'common.cloudy': 'Cloudy',
    'common.rainLikely': 'Rain likely',
    
    // Region Selection
    'region.title': 'Select Your Region',
    'region.subtitle': 'Choose your district to get personalized agricultural insights and recommendations for your area.',
    'region.districtLabel': 'Select District',
    'region.districtPlaceholder': 'Choose your district',
    'region.confirmButton': 'Confirm Region',
    'region.continueButton': 'Continue',
    'region.settingsButton': 'Settings',
    'region.mapTitle': 'Maharashtra Map',
    'region.selected': 'Selected',
    'region.selectDistrict': 'Select your district above',
    'region.benefitsTitle': 'What you\'ll get:',
    'region.benefit1': 'Localized weather forecasts',
    'region.benefit2': 'Region-specific crop recommendations',
    'region.benefit3': 'Local disease outbreak alerts',
    'region.benefit4': 'Market price updates',
    'region.cropPricesTitle': 'Crop Prices',
    'region.cropPricesDesc': 'View current market prices for crops in your region',
    'region.viewPricesButton': 'View Prices',
    
    // Authentication
    'auth.login.title': 'Welcome Back',
    'auth.login.subtitle': 'Sign in to access your personalized farming dashboard',
    'auth.login.formTitle': 'Sign In',
    'auth.login.button': 'Sign In',
    'auth.login.switchText': 'Don\'t have an account?',
    'auth.login.link': 'Create Account',
    'auth.register.title': 'Join Agrow AI',
    'auth.register.subtitle': 'Create your account to get started with smart farming',
    'auth.register.formTitle': 'Create Account',
    'auth.register.button': 'Create Account',
    'auth.register.switchText': 'Already have an account?',
    'auth.register.link': 'Sign In',
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
    'auth.errors.addressRequired': 'Address is required',
    'auth.errors.stateRequired': 'Please select your state',
    'auth.errors.districtRequired': 'Please select your district',
    'auth.info.title': 'Why Create an Account?',
    'auth.info.personalized.title': 'Personalized Experience',
    'auth.info.personalized.desc': 'Get customized recommendations based on your location and farming needs',
    'auth.info.localized.title': 'Localized Insights',
    'auth.info.localized.desc': 'Access weather forecasts, market prices, and crop advice specific to your region',
    'auth.info.regional.title': 'Regional Support',
    'auth.info.regional.desc': 'Connect with local agricultural experts and farming communities',
    'auth.info.note': 'Your information is secure and will only be used to provide better farming recommendations',
  },
  mr: {
    // Header
    'header.title': 'अग्रो एआय',
    'header.subtitle': 'महाराष्ट्र शेतकऱ्यांसाठी एआय-चालित स्मार्ट शेती',
    
    // Landing Page
    'landing.hero.title': 'स्मार्ट शेती',
    'landing.hero.titleHighlight': 'महाराष्ट्रासाठी',
    'landing.hero.subtitle': 'रिअल-टाइम हवामान, मातीचे आरोग्य आणि हवामान डेटावर आधारित पिके निवड, रोग निदान आणि उत्पादन अनुकूलनासाठी एआय-चालित अंतर्दृष्टी.',
    'landing.hero.getStarted': 'सुरु करा',
    'landing.hero.learnMore': 'अधिक जाणून घ्या',
    'landing.features.title': 'अग्रो एआय का निवडावे?',
    'landing.features.subtitle': 'महाराष्ट्राच्या विविध शेतीच्या भूदृश्यासाठी विशेषतः डिझाइन केलेली व्यापक एआय-चालित शेती उपाय.',
    'landing.features.weather.title': 'हवामान बुद्धिमत्ता',
    'landing.features.weather.desc': 'मान्सून अंदाज आणि हवामान अंतर्दृष्टीसह 7-दिवसीय अंदाज',
    'landing.features.crop.title': 'पिके शिफारसी',
    'landing.features.crop.desc': 'तुमच्या प्रदेशावर आधारित इष्टतम पिके निवडीसाठी एआय-चालित सुझाव',
    'landing.features.disease.title': 'रोग शोध',
    'landing.features.disease.desc': 'उपचार शिफारसीसह पिकांच्या रोगांची लवकर ओळख',
    'landing.features.market.title': 'सध्याचे बाजार भाव',
    'landing.features.market.desc': 'जिल्ह्यांमध्ये त्यांच्या पिकांचे नवीनतम मंडी भाव अधिक चांगले विक्री निर्णय घेण्यासाठी.',
    'landing.features.mobile.title': 'मोबाइल अनुकूल',
    'landing.features.mobile.desc': 'मर्यादित इंटरनेट कनेक्टिव्हिटीसहही कोठेही अंतर्दृष्टी मिळवा',
    'landing.features.language.title': 'स्थानिक भाषा समर्थन',
    'landing.features.language.desc': 'चांगल्या प्रवेशासाठी मराठी, हिंदी आणि इंग्रजीमध्ये उपलब्ध',
    'landing.footer.copyright': '© {year} अग्रो एआय. सर्व हक्क सुरक्षित.',
    'landing.footer.tagline': 'एआय-चालित उपायांसह महाराष्ट्र शेतकऱ्यांना सक्षम करणे',
    
    // Dashboard
    'dashboard.welcome': 'तुमच्या शेत डॅशबोर्डमध्ये आपले स्वागत आहे',
    'dashboard.offline.banner': 'तुम्ही ऑफलाइन आहात. शेवटची जतन केलेली सल्ले दाखवत आहे.',
    'dashboard.quickActions.dashboard': 'डॅशबोर्ड',
    'dashboard.quickActions.disease': 'रोग शोध',
    'dashboard.quickActions.assistant': 'एआय सहाय्यक',
    'dashboard.quickActions.alerts': 'सूचना',
    'dashboard.quickActions.settings': 'सेटिंग्ज',
    'dashboard.weather.title': '7-दिवसीय हवामान अंदाज',
    'dashboard.weather.loading': 'हवामान लोड होत आहे...',
    'dashboard.weather.noData': 'हवामान डेटा उपलब्ध नाही',
    'dashboard.monsoon.title': 'मान्सून दृष्टीकोन',
    'dashboard.monsoon.normal': 'सामान्य',
    'dashboard.monsoon.prediction': 'मान्सून अंदाज',
    'dashboard.monsoon.rainfallProgress': 'पाऊस प्रगती',
    'dashboard.monsoon.soilMoisture': 'मातीची ओलावा',
    'dashboard.monsoon.expectedRainfall': 'अपेक्षित पाऊस: सामान्याच्या 85%',
    'dashboard.monsoon.bestTimeSowing': 'वेबण्याचा सर्वोत्तम वेळ: पुढील 2 आठवडे',
    'dashboard.crops.title': 'पिके शिफारसी',
    'dashboard.crops.suitabilityScore': 'योग्यता स्कोअर',
    'dashboard.crops.risk': 'जोखीम',
    'dashboard.diseases.title': 'रोग',
    'dashboard.diseases.action': 'कृती',
    'dashboard.yield.title': 'उत्पादन अंदाज',
    'dashboard.yield.min': 'किमान',
    'dashboard.yield.likely': 'संभाव्य',
    'dashboard.yield.max': 'कमाल',
    
    // Common
    'common.navigation': 'नेव्हिगेशन',
    'common.cropsSelected': 'पिके निवडले',
    'common.today': 'आज',
    'common.tomorrow': 'उद्या',
    'common.low': 'कमी',
    'common.medium': 'मध्यम',
    'common.high': 'उच्च',
    'common.normal': 'सामान्य',
    'common.clear': 'स्पष्ट',
    'common.cloudy': 'ढगाळ',
    'common.rainLikely': 'पाऊस येण्याची शक्यता',
    
    // Region Selection
    'region.title': 'तुमचा प्रदेश निवडा',
    'region.subtitle': 'तुमच्या क्षेत्रासाठी वैयक्तिकृत शेती अंतर्दृष्टी आणि शिफारसी मिळविण्यासाठी तुमचा जिल्हा निवडा.',
    'region.districtLabel': 'जिल्हा निवडा',
    'region.districtPlaceholder': 'तुमचा जिल्हा निवडा',
    'region.confirmButton': 'प्रदेश निश्चित करा',
    'region.continueButton': 'पुढे जा',
    'region.settingsButton': 'सेटिंग्ज',
    'region.mapTitle': 'महाराष्ट्र नकाशा',
    'region.selected': 'निवडले',
    'region.selectDistrict': 'वरील जिल्हा निवडा',
    'region.benefitsTitle': 'तुम्हाला काय मिळेल:',
    'region.benefit1': 'स्थानिक हवामान अंदाज',
    'region.benefit2': 'प्रदेश-विशिष्ट पिके शिफारसी',
    'region.benefit3': 'स्थानिक रोग प्रादुर्भाव सूचना',
    'region.benefit4': 'बाजार भाव अद्यतने',
    'region.cropPricesTitle': 'पिके भाव',
    'region.cropPricesDesc': 'तुमच्या प्रदेशातील पिकांचे सध्याचे बाजार भाव पहा',
    'region.viewPricesButton': 'भाव पहा',
    
    // Authentication
    'auth.login.title': 'पुन्हा स्वागत आहे',
    'auth.login.subtitle': 'तुमच्या वैयक्तिकृत शेती डॅशबोर्डमध्ये प्रवेश करण्यासाठी साइन इन करा',
    'auth.login.formTitle': 'साइन इन',
    'auth.login.button': 'साइन इन',
    'auth.login.switchText': 'खाते नाही?',
    'auth.login.link': 'खाते तयार करा',
    'auth.register.title': 'अग्रो एआयमध्ये सामील व्हा',
    'auth.register.subtitle': 'स्मार्ट शेतीसह सुरुवात करण्यासाठी तुमचे खाते तयार करा',
    'auth.register.formTitle': 'खाते तयार करा',
    'auth.register.button': 'खाते तयार करा',
    'auth.register.switchText': 'आधीपासून खाते आहे?',
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
    'auth.errors.addressRequired': 'पत्ता आवश्यक आहे',
    'auth.errors.stateRequired': 'कृपया तुमचे राज्य निवडा',
    'auth.errors.districtRequired': 'कृपया तुमचा जिल्हा निवडा',
    'auth.info.title': 'खाते का तयार करावे?',
    'auth.info.personalized.title': 'वैयक्तिकृत अनुभव',
    'auth.info.personalized.desc': 'तुमच्या स्थान आणि शेतीच्या गरजांवर आधारित सानुकूलित शिफारसी मिळवा',
    'auth.info.localized.title': 'स्थानिक अंतर्दृष्टी',
    'auth.info.localized.desc': 'तुमच्या प्रदेशासाठी विशिष्ट हवामान अंदाज, बाजार भाव आणि पिके सल्ले मिळवा',
    'auth.info.regional.title': 'प्रादेशिक समर्थन',
    'auth.info.regional.desc': 'स्थानिक शेती तज्ञ आणि शेती समुदायांशी जोडा',
    'auth.info.note': 'तुमची माहिती सुरक्षित आहे आणि केवळ चांगल्या शेती शिफारसी देण्यासाठी वापरली जाईल',
  },
  hi: {
    // Header
    'header.title': 'अग्रो एआय',
    'header.subtitle': 'महाराष्ट्र किसानों के लिए एआय-संचालित स्मार्ट खेती',
    
    // Landing Page
    'landing.hero.title': 'स्मार्ट खेती',
    'landing.hero.titleHighlight': 'महाराष्ट्र के लिए',
    'landing.hero.subtitle': 'रियल-टाइम मौसम, मिट्टी के स्वास्थ्य और जलवायु डेटा के आधार पर फसल चयन, रोग निदान और उपज अनुकूलन के लिए एआय-संचालित अंतर्दृष्टि।',
    'landing.hero.getStarted': 'शुरू करें',
    'landing.hero.learnMore': 'और जानें',
    'landing.features.title': 'अग्रो एआय क्यों चुनें?',
    'landing.features.subtitle': 'महाराष्ट्र की विविध कृषि भूदृश्य के लिए विशेष रूप से डिज़ाइन किए गए व्यापक एआय-संचालित खेती समाधान।',
    'landing.features.weather.title': 'मौसम बुद्धिमत्ता',
    'landing.features.weather.desc': 'मानसून पूर्वानुमान और जलवायु अंतर्दृष्टि के साथ 7-दिवसीय पूर्वानुमान',
    'landing.features.crop.title': 'फसल सुझाव',
    'landing.features.crop.desc': 'आपके क्षेत्र के आधार पर इष्टतम फसल चयन के लिए एआय-संचालित सुझाव',
    'landing.features.disease.title': 'रोग पहचान',
    'landing.features.disease.desc': 'उपचार सुझावों के साथ फसल रोगों की प्रारंभिक पहचान',
    'landing.features.market.title': 'वर्तमान बाजार मूल्य',
    'landing.features.market.desc': 'जिलों में उनकी फसलों के नवीनतम मंडी मूल्य बेहतर बिक्री निर्णय लेने के लिए।',
    'landing.features.mobile.title': 'मोबाइल अनुकूल',
    'landing.features.mobile.desc': 'सीमित इंटरनेट कनेक्टिविटी के साथ भी कहीं भी अंतर्दृष्टि प्राप्त करें',
    'landing.features.language.title': 'स्थानीय भाषा समर्थन',
    'landing.features.language.desc': 'बेहतर पहुंच के लिए मराठी, हिंदी और अंग्रेजी में उपलब्ध',
    'landing.footer.copyright': '© {year} अग्रो एआय। सभी अधिकार सुरक्षित।',
    'landing.footer.tagline': 'एआय-संचालित समाधानों के साथ महाराष्ट्र किसानों को सशक्त बनाना',
    
    // Dashboard
    'dashboard.welcome': 'आपके फार्म डैशबोर्ड में आपका स्वागत है',
    'dashboard.offline.banner': 'आप ऑफलाइन हैं। अंतिम सहेजे गए सलाह दिखा रहे हैं।',
    'dashboard.quickActions.dashboard': 'डैशबोर्ड',
    'dashboard.quickActions.disease': 'रोग पहचान',
    'dashboard.quickActions.assistant': 'एआय सहायक',
    'dashboard.quickActions.alerts': 'अलर्ट',
    'dashboard.quickActions.settings': 'सेटिंग्स',
    'dashboard.weather.title': '7-दिवसीय मौसम पूर्वानुमान',
    'dashboard.weather.loading': 'मौसम लोड हो रहा है...',
    'dashboard.weather.noData': 'मौसम डेटा उपलब्ध नहीं है',
    'dashboard.monsoon.title': 'मानसून दृष्टिकोण',
    'dashboard.monsoon.normal': 'सामान्य',
    'dashboard.monsoon.prediction': 'मानसून पूर्वानुमान',
    'dashboard.monsoon.rainfallProgress': 'वर्षा प्रगति',
    'dashboard.monsoon.soilMoisture': 'मिट्टी की नमी',
    'dashboard.monsoon.expectedRainfall': 'अपेक्षित वर्षा: सामान्य का 85%',
    'dashboard.monsoon.bestTimeSowing': 'बुवाई का सबसे अच्छा समय: अगले 2 सप्ताह',
    'dashboard.crops.title': 'फसल सुझाव',
    'dashboard.crops.suitabilityScore': 'उपयुक्तता स्कोर',
    'dashboard.crops.risk': 'जोखिम',
    'dashboard.diseases.title': 'रोग',
    'dashboard.diseases.action': 'कार्य',
    'dashboard.yield.title': 'उपज पूर्वानुमान',
    'dashboard.yield.min': 'न्यूनतम',
    'dashboard.yield.likely': 'संभावित',
    'dashboard.yield.max': 'अधिकतम',
    
    // Common
    'common.navigation': 'नेविगेशन',
    'common.cropsSelected': 'फसलें चुनी गईं',
    'common.today': 'आज',
    'common.tomorrow': 'कल',
    'common.low': 'कम',
    'common.medium': 'मध्यम',
    'common.high': 'उच्च',
    'common.normal': 'सामान्य',
    'common.clear': 'स्पष्ट',
    'common.cloudy': 'बादल',
    'common.rainLikely': 'बारिश की संभावना',
    
    // Region Selection
    'region.title': 'अपना क्षेत्र चुनें',
    'region.subtitle': 'अपने क्षेत्र के लिए व्यक्तिगत कृषि अंतर्दृष्टि और सुझाव प्राप्त करने के लिए अपना जिला चुनें।',
    'region.districtLabel': 'जिला चुनें',
    'region.districtPlaceholder': 'अपना जिला चुनें',
    'region.confirmButton': 'क्षेत्र की पुष्टि करें',
    'region.continueButton': 'जारी रखें',
    'region.settingsButton': 'सेटिंग्स',
    'region.mapTitle': 'महाराष्ट्र मानचित्र',
    'region.selected': 'चुना गया',
    'region.selectDistrict': 'ऊपर से अपना जिला चुनें',
    'region.benefitsTitle': 'आपको क्या मिलेगा:',
    'region.benefit1': 'स्थानीय मौसम पूर्वानुमान',
    'region.benefit2': 'क्षेत्र-विशिष्ट फसल सुझाव',
    'region.benefit3': 'स्थानीय रोग प्रकोप अलर्ट',
    'region.benefit4': 'बाजार मूल्य अपडेट',
    'region.cropPricesTitle': 'फसल मूल्य',
    'region.cropPricesDesc': 'अपने क्षेत्र में फसलों के वर्तमान बाजार मूल्य देखें',
    'region.viewPricesButton': 'मूल्य देखें',
    
    // Authentication
    'auth.login.title': 'वापस स्वागत है',
    'auth.login.subtitle': 'अपने व्यक्तिगत खेती डैशबोर्ड तक पहुंचने के लिए साइन इन करें',
    'auth.login.formTitle': 'साइन इन',
    'auth.login.button': 'साइन इन',
    'auth.login.switchText': 'खाता नहीं है?',
    'auth.login.link': 'खाता बनाएं',
    'auth.register.title': 'अग्रो एआय में शामिल हों',
    'auth.register.subtitle': 'स्मार्ट खेती के साथ शुरुआत करने के लिए अपना खाता बनाएं',
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
    'auth.errors.addressRequired': 'पता आवश्यक है',
    'auth.errors.stateRequired': 'कृपया अपना राज्य चुनें',
    'auth.errors.districtRequired': 'कृपया अपना जिला चुनें',
    'auth.info.title': 'खाता क्यों बनाएं?',
    'auth.info.personalized.title': 'व्यक्तिगत अनुभव',
    'auth.info.personalized.desc': 'अपने स्थान और खेती की जरूरतों के आधार पर अनुकूलित सुझाव प्राप्त करें',
    'auth.info.localized.title': 'स्थानीय अंतर्दृष्टि',
    'auth.info.localized.desc': 'अपने क्षेत्र के लिए विशिष्ट मौसम पूर्वानुमान, बाजार मूल्य और फसल सलाह तक पहुंचें',
    'auth.info.regional.title': 'क्षेत्रीय समर्थन',
    'auth.info.regional.desc': 'स्थानीय कृषि विशेषज्ञों और खेती समुदायों से जुड़ें',
    'auth.info.note': 'आपकी जानकारी सुरक्षित है और केवल बेहतर खेती सुझाव देने के लिए उपयोग की जाएगी',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('agrow-language') as Language;
    if (savedLanguage && ['en', 'mr', 'hi'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('agrow-language', language);
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[language][key as keyof typeof translations[typeof language]];
    if (!translation) {
      console.warn(`Translation missing for key: ${key} in language: ${language}`);
      return key;
    }
    
    // Handle dynamic values like {year}
    return translation.replace('{year}', new Date().getFullYear().toString());
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
