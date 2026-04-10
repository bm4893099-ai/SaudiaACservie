import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      brand: 'VITALBLAZE',
      heroTitle: 'The Ultimate Retail Engine for KSA',
      heroSubtitle:
        'Multi-tenant ERP, premium POS, inventory intelligence, and ZATCA-first invoicing built for Saudi retail operators.',
      startTrial: 'Start Free Trial',
      viewDemo: 'View Demo',
      monthly: 'Monthly',
      yearly: 'Yearly',
      bakalaPlan: 'Bakala Plan',
      superstorePlan: 'Superstore Plan',
      createTenant: 'Create Tenant',
      inventory: 'Inventory',
      pos: 'POS',
      analytics: 'Analytics',
    },
  },
  ar: {
    translation: {
      brand: 'فايتالبليز',
      heroTitle: 'المحرك الأقوى لتجزئة المملكة',
      heroSubtitle:
        'منصة ERP متعددة المستأجرين مع نقطة بيع ذكية ومخزون متقدم وفوترة متوافقة مع الزكاة والضريبة والجمارك.',
      startTrial: 'ابدأ الفترة التجريبية',
      viewDemo: 'عرض توضيحي',
      monthly: 'شهري',
      yearly: 'سنوي',
      bakalaPlan: 'خطة البقالة',
      superstorePlan: 'خطة السوبرماركت',
      createTenant: 'إنشاء مستأجر',
      inventory: 'المخزون',
      pos: 'نقطة البيع',
      analytics: 'التحليلات',
    },
  },
};

void i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
