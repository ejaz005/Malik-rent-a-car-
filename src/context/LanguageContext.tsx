import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  isRtl: boolean;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: 'Home',
    fleet: 'Our Fleet',
    tours: 'Tour Packages',
    destinations: 'Destinations',
    travelTips: 'Travel Tips',
    about: 'About Us',
    gallery: 'Gallery',
    reviews: 'Reviews',
    blog: 'Guides',
    contact: 'Contact',
    bookNow: 'Book Now',
    callNow: 'Call Now',
    whatsappUs: 'WhatsApp Us',
    aiAdvisor: 'AI Route & Car Advisor',

    // Hero
    heroTitle: 'Reliable & Affordable Rides Across Gilgit-Baltistan',
    heroSubtitle: 'Explore Hunza, Skardu, Fairy Meadows, and Khunjerab with premium 4x4 Prado, Hilux, and experienced mountain drivers.',
    open247: 'Open 24/7 in Gilgit & Skardu',
    verifiedService: 'Verified Tour & Rental Operator Since 2020',
    quickBookingTitle: 'Instant Car & Tour Booking',
    pickupLocation: 'Pick-up Location',
    dropoffLocation: 'Drop-off Location',
    pickupDate: 'Start Date',
    returnDate: 'Return Date',
    vehicleType: 'Vehicle Type',
    driverPreference: 'Driver Option',
    withDriver: 'With Mountain Driver (Recommended)',
    selfDrive: 'Self-Drive (Permit required)',
    calculateCost: 'Check Rates & Availability',
    emergencyHelpline: '24/7 Helpline: 0317 9236600',

    // Fleet
    fleetHeading: 'Our Mountain-Ready Fleet',
    fleetSubheading: 'High-clearance 4x4 Land Cruisers, Prados, Hiluxes, and passenger vans serviced for extreme mountain conditions.',
    allVehicles: 'All Vehicles',
    suvPrado: '4x4 Prado / SUV',
    pickupHilux: 'Hilux Revo',
    vanCoaster: 'Vans & Coasters',
    sedan: 'Sedans',
    mountainJeep: 'Mountain Jeeps',
    seats: 'Seats',
    perDay: 'Per Day',
    withoutFuel: 'Without Fuel',
    acIncluded: 'Air Conditioned',
    luggageSpace: 'Bags',
    viewDetails: 'Vehicle Details',
    bookViaWhatsApp: 'WhatsApp Book',

    // AI Advisor
    aiAdvisorTitle: 'Gilgit-Baltistan AI Route & Vehicle Advisor',
    aiAdvisorSubtitle: 'Powered by Gemini 4 Argon — Upload a photo of any vehicle, steep road, or mountain pass to get an expert safety & suitability report.',
    uploadPhoto: 'Upload Vehicle or Road Photo',
    orUseSample: 'Or analyze a sample mountain route:',
    sampleBabusar: 'Babusar Pass Snow Track',
    sampleDeosai: 'Deosai Boulder Riverbed',
    samplePrado: 'Inspect Toyota Prado 4x4',
    analyzingImage: 'Gemini 4 Argon is inspecting terrain, clearance, and 4WD requirements...',
    analyzeNow: 'Analyze Suitability with AI',
    disclaimerAi: 'Analysis tailored to Karakoram Highway, Gilgit-Skardu expressway, and high-altitude alpine passes.',

    // Tour Packages
    toursHeading: 'Curated Gilgit-Baltistan Tour Packages',
    toursSubheading: 'Unforgettable adventures with reliable 4x4 vehicles, dedicated mountain drivers, and customized itineraries.',
    daysNights: 'Duration',
    bestTime: 'Best Season',
    startingFrom: 'Starting from',
    viewItinerary: 'View Itinerary',
    bookThisTour: 'Inquire on WhatsApp',

    // Why Choose Us
    whyHeading: 'Why Choose Malik Rent A Car?',
    whySubheading: 'Trusted by hundreds of families, mountaineers, and corporate groups across Pakistan and worldwide.',
    reason1Title: '24/7 Mountain Dispatch & Service',
    reason1Desc: 'We operate 24 hours a day, 7 days a week. From midnight airport landings in Gilgit to emergency mountain assistance.',
    reason2Title: 'Impeccably Maintained 4x4 Fleet',
    reason2Desc: 'Every Prado, Hilux, and van undergoes multi-point safety inspections: all-terrain tires, brakes, suspension, and high-altitude tuning.',
    reason3Title: 'Experienced Mountain Drivers',
    reason3Desc: 'Native Gilgit-Baltistan drivers with 10+ years on Karakoram Highway, Babusar, Deosai, and off-road canyon tracks.',
    reason4Title: 'Transparent, Direct Pricing',
    reason4Desc: 'No hidden booking fees, no middleman commissions. Clear daily rates starting at PKR 7,500/day.',

    // Calculator
    calculatorTitle: 'Interactive Rental Price Estimator',
    calculatorSubtitle: 'Get an accurate estimate for your custom itinerary in seconds.',
    numberOfDays: 'Number of Days',
    selectCar: 'Select Vehicle',
    driverOption: 'Driver Service',
    estimatedTotal: 'Estimated Total',
    volumeDiscount: 'Multi-Day Discount Applied',
    bookThisEstimate: 'Lock in this Price via WhatsApp',

    // Reviews & About
    reviewsHeading: 'Verified Traveler Reviews',
    reviewsSubheading: 'Rated 4.9/5 stars by tourists from across Pakistan and international travelers.',
    aboutHeading: 'About Malik Rent A Car Gilgit Baltistan',
    aboutStory: 'Founded in January 2020 in the heart of Gilgit, Malik Rent A Car began with a clear mission: to provide dependable, comfortable, and honest transport across Northern Pakistan. Today, our fleet serves Gilgit, Skardu, Hunza, and the most remote valleys with pride.',

    // Contact
    contactHeading: 'Get In Touch With Us',
    contactSubheading: 'Call, WhatsApp, or visit our office in Gilgit anytime. We are open 24 hours every single day.',
    phoneNumbers: 'Direct Phone Numbers',
    whatsappAvailable: 'WhatsApp / SMS (Fastest Reply)',
    visitOurOffice: 'Gilgit Headquarters',
    paymentBadges: 'Accepted Payment Methods',
    sendInquiry: 'Send Booking Inquiry',
    fullName: 'Your Full Name',
    phoneNumber: 'Phone / WhatsApp Number',
    emailAddress: 'Email Address',
    specialNotes: 'Trip Details / Requirements',
    submitBooking: 'Submit & Open WhatsApp',

    // Floating Switcher
    langNameEn: 'English',
    langNameUr: 'اردو',
    floatingSwitcherTooltip: 'Toggle English / اردو (RTL)',
    modeRtlActive: 'RTL Active',
    modeLtrActive: 'LTR Active',
  },
  ur: {
    // Navigation
    home: 'ہوم',
    fleet: 'ہماری گاڑیاں',
    tours: 'ٹور پیکجز',
    destinations: 'سیاحتی مقامات',
    travelTips: 'سفری ہدایات',
    about: 'ہمارے بارے میں',
    gallery: 'تصاویر',
    reviews: 'رائے اور ریویوز',
    blog: 'رہنما بلاگ',
    contact: 'رابطہ کریں',
    bookNow: 'بکنگ کریں',
    callNow: 'کال کریں',
    whatsappUs: 'واٹس ایپ',
    aiAdvisor: 'اے آئی روٹ ایڈوائزر',

    // Hero
    heroTitle: 'گلگت بلتستان بھر میں قابل اعتماد اور سستی سواری',
    heroSubtitle: 'ہنزہ، سکردو، فیری میڈوز اور خنجراب کے پرفضا مقامات کی سیر کے لیے جدید پراڈو، ہائی لکس اور تجربہ کار ڈرائیورز دستیاب ہیں۔',
    open247: 'گلگت اور سکردو میں 24 گھنٹے دستیاب',
    verifiedService: '2020 سے معتبر اور رجسٹرڈ کار رینٹل سروس',
    quickBookingTitle: 'فوری گاڑی اور ٹور بکنگ',
    pickupLocation: 'پک اپ کا مقام',
    dropoffLocation: 'ڈراپ آف کا مقام',
    pickupDate: 'روانگی کی تاریخ',
    returnDate: 'واپسی کی تاریخ',
    vehicleType: 'گاڑی کی قسم',
    driverPreference: 'ڈرائیور کی ضرورت',
    withDriver: 'ڈرائیور کے ساتھ (تجویز کردہ)',
    selfDrive: 'سیلف ڈرائیو (بغیر ڈرائیور)',
    calculateCost: 'کرایہ اور دستیابی دیکھیں',
    emergencyHelpline: '24 گھنٹے ہیلپ لائن: 0317 9236600',

    // Fleet
    fleetHeading: 'پہاڑی راستوں کے لیے تیار گاڑیاں',
    fleetSubheading: 'ہائی گرائونڈ کلیئرنس پراڈو، لینڈ کروزر، ہائی لکس اور کشادہ وینز جو گلگت بلتستان کے کٹھن راستوں کے لیے بالکل فٹ ہیں۔',
    allVehicles: 'تمام گاڑیاں',
    suvPrado: '4x4 پراڈو / ایس یو وی',
    pickupHilux: 'ہائی لکس ریوو',
    vanCoaster: 'وین اور کوسٹر',
    sedan: 'سیڈان کاریں',
    mountainJeep: 'پہاڑی جیپیں',
    seats: 'سیٹیں',
    perDay: 'فی دن',
    withoutFuel: 'بغیر فیول',
    acIncluded: 'اے سی موجود ہے',
    luggageSpace: 'سامان',
    viewDetails: 'تفصیلات دیکھیں',
    bookViaWhatsApp: 'واٹس ایپ بکنگ',

    // AI Advisor
    aiAdvisorTitle: 'گلگت بلتستان اے آئی روٹ و گاڑی ایڈوائزر',
    aiAdvisorSubtitle: 'جیمنائی 4 آرگن سے تقویت یافتہ — کسی بھی گاڑی یا پہاڑی سڑک کی تصویر اپ لوڈ کر کے جانیں کہ آیا وہ راستے کے لیے محفوظ ہے۔',
    uploadPhoto: 'گاڑی یا سڑک کی تصویر اپ لوڈ کریں',
    orUseSample: 'یا نمونہ پہاڑی راستہ چیک کریں:',
    sampleBabusar: 'بابوسر ٹاپ برفانی ٹریک',
    sampleDeosai: 'دیوسائی ندی اور پتھریلا راستہ',
    samplePrado: 'ٹویوٹا پراڈو 4x4 معائنہ',
    analyzingImage: 'جیمنائی تصویر اور سڑک کی جانچ کر رہا ہے...',
    analyzeNow: 'اے آئی کے ذریعے تجزیہ کریں',
    disclaimerAi: 'شاہراہ ریشم، سکردو روڈ، اور دیوسائی و فیری میڈوز کے کٹھن ٹریکس کے مطابق تجزیہ۔',

    // Tour Packages
    toursHeading: 'شاندار گلگت بلتستان ٹور پیکجز',
    toursSubheading: 'شاندار 4x4 گاڑیوں، مقامی ڈرائیورز اور مکمل رہنمائی کے ساتھ ناقابل فراموش یادیں بنائیں۔',
    daysNights: 'مدت',
    bestTime: 'بہترین موسم',
    startingFrom: 'کرایہ شروع از',
    viewItinerary: 'پروگرام دیکھیں',
    bookThisTour: 'واٹس ایپ پر رابطہ کریں',

    // Why Choose Us
    whyHeading: 'ملک رینٹ اے کار کا انتخاب کیوں؟',
    whySubheading: 'ملک بھر اور بیرون ملک سے آنے والے سینکڑوں سیاحوں کا بااعتماد ادارہ۔',
    reason1Title: '24 گھنٹے ہنگامی و سفری سہولت',
    reason1Desc: 'ہم ہفتے کے ساتوں دن چوبیس گھنٹے حاضر ہیں۔ رات گئے فلائٹ لینڈنگ سے لے کر ایمرجنسی روڈ سائیڈ سروس تک۔',
    reason2Title: 'مکمل طور پر فٹ اور چیک شدہ گاڑیاں',
    reason2Desc: 'ہماری ہر گاڑی کے بریک، ٹائر اور سسپنشن کا پہاڑی سفر سے قبل سخت معائنہ کیا جاتا ہے۔',
    reason3Title: 'ماہر پہاڑی ڈرائیورز',
    reason3Desc: 'شاہراہ قراقرم، بابوسر اور دیوسائی کے خطرناک موڑوں پر 10 سال سے زائد کا تجربہ رکھنے والے مقامی ڈرائیورز۔',
    reason4Title: 'مناسب اور شفاف ریٹس',
    reason4Desc: 'کوئی پوشیدہ چارجز نہیں۔ پراڈو اور کاریں مناسب ترین یومیہ کرائے پر دستیاب ہیں۔',

    // Calculator
    calculatorTitle: 'کرایہ کیلکولیٹر',
    calculatorSubtitle: 'اپنے ٹور کے دنوں اور گاڑی کے مطابق فوری تخمینہ لگائیں۔',
    numberOfDays: 'دنوں کی تعداد',
    selectCar: 'گاڑی منتخب کریں',
    driverOption: 'ڈرائیور کی سہولت',
    estimatedTotal: 'کل تخمینہ کرایہ',
    volumeDiscount: 'خصوصی رعایت لاگو کی گئی',
    bookThisEstimate: 'یہ ریٹ واٹس ایپ پر محفوظ کریں',

    // Reviews & About
    reviewsHeading: 'ہمارے معزز مسافروں کی رائے',
    reviewsSubheading: 'ملک اور بیرون ملک کے سیاحوں کی طرف سے 4.9 اسٹار ریٹنگ۔',
    aboutHeading: 'ملک رینٹ اے کار گلگت بلتستان کا تعارف',
    aboutStory: 'جنوری 2020 میں گلگت سے شروع ہونے والی یہ سروس آج گلگت، ہنزہ اور سکردو میں سیاحوں کے لیے سب سے قابل بھروسا سفری ساتھی بن چکی ہے۔',

    // Contact
    contactHeading: 'ہم سے رابطہ کریں',
    contactSubheading: 'کال، واٹس ایپ یا ہمارے گلگت دفتر تشریف لائیں۔ ہم 24 گھنٹے کھلے ہیں۔',
    phoneNumbers: 'براہ راست فون نمبرز',
    whatsappAvailable: 'واٹس ایپ اور ایس ایم ایس',
    visitOurOffice: 'گلگت ہیڈ آفس',
    paymentBadges: 'ادائیگی کے تمام ذرائع قبول ہیں',
    sendInquiry: 'بکنگ فارم پُر کریں',
    fullName: 'آپ کا مکمل نام',
    phoneNumber: 'فون / واٹس ایپ نمبر',
    emailAddress: 'ای میل ایڈریس',
    specialNotes: 'سفر کی تفصیلات اور خواہشات',
    submitBooking: 'ارسال کریں اور واٹس ایپ کھولیں',

    // Floating Switcher
    langNameEn: 'English',
    langNameUr: 'اردو',
    floatingSwitcherTooltip: 'انگریزی اور اردو کے درمیان سوئچ کریں',
    modeRtlActive: 'دائیں سے بائیں (اردو)',
    modeLtrActive: 'بائیں سے دائیں (English)',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  isRtl: false,
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mrac_lang');
      return saved === 'ur' ? 'ur' : 'en';
    }
    return 'en';
  });

  const isRtl = language === 'ur';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mrac_lang', lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    if (isRtl) {
      document.documentElement.classList.add('rtl-mode');
    } else {
      document.documentElement.classList.remove('rtl-mode');
    }
  }, [language, isRtl]);

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, isRtl, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
