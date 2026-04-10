import type { KpiCard, ProductRecord, RevenuePoint, TenantFormValues } from '../types/erp';

export const initialTenantFormValues: TenantFormValues = {
  storeName: 'VITALBLAZE Flagship',
  logoUrl: '',
  crNumber: '2051234567',
  vatNumber: '300123456700003',
  businessType: 'BAKALA',
  adminEmail: 'admin@vitalblaze.sa',
  adminPassword: 'P@ssw0rd!2026',
  nationalAddress: {
    buildingNumber: '3124',
    street: 'Prince Mohammed Bin Fahd Road',
    district: 'Al Faisaliyah',
    city: 'Dammam',
    postalCode: '32272',
    additionalNumber: '7421',
    unitNumber: '12',
  },
};

export const productCatalog: ProductRecord[] = [
  {
    id: 'prod-1',
    sku: 'RICE-05KG',
    barcode: '6281000000012',
    category: 'Staples',
    name: { en: 'Premium Basmati Rice 5kg', ar: 'أرز بسمتي فاخر 5 كجم' },
    costPrice: 24,
    sellingPrice: 31.5,
    vatRate: 15,
    stockOnHand: 18,
    reorderLevel: 10,
    expiryDate: '2026-12-12',
    isWeighedItem: false,
  },
  {
    id: 'prod-2',
    sku: 'APPLES-KG',
    barcode: '2001500123456',
    category: 'Fresh Produce',
    name: { en: 'Royal Gala Apples', ar: 'تفاح رويال جالا' },
    costPrice: 4.2,
    sellingPrice: 7.8,
    vatRate: 15,
    stockOnHand: 4.6,
    reorderLevel: 8,
    expiryDate: '2026-04-14',
    isWeighedItem: true,
    scaleBarcodeConfig: {
      prefix: '20',
      itemCode: '01500',
      embedsWeight: true,
    },
  },
  {
    id: 'prod-3',
    sku: 'MILK-1L',
    barcode: '6281000000449',
    category: 'Dairy',
    name: { en: 'Fresh Milk 1L', ar: 'حليب طازج 1 لتر' },
    costPrice: 3.1,
    sellingPrice: 4.75,
    vatRate: 15,
    stockOnHand: 0,
    reorderLevel: 20,
    expiryDate: '2026-04-11',
    isWeighedItem: false,
  },
  {
    id: 'prod-4',
    sku: 'DATES-PREMIUM',
    barcode: '6281000000784',
    category: 'Snacks',
    name: { en: 'Premium Dates Box', ar: 'علبة تمر فاخر' },
    costPrice: 10,
    sellingPrice: 16,
    vatRate: 15,
    stockOnHand: 33,
    reorderLevel: 12,
    expiryDate: '2027-01-20',
    isWeighedItem: false,
  },
];

export const revenueSeries: RevenuePoint[] = [
  { label: 'Mon', revenue: 12400, profit: 3180 },
  { label: 'Tue', revenue: 14860, profit: 4024 },
  { label: 'Wed', revenue: 13520, profit: 3516 },
  { label: 'Thu', revenue: 16840, profit: 4622 },
  { label: 'Fri', revenue: 21450, profit: 5980 },
  { label: 'Sat', revenue: 23600, profit: 6480 },
  { label: 'Sun', revenue: 18220, profit: 5016 },
];

export const bakalaKpis: KpiCard[] = [
  { label: 'Daily Revenue', value: 'SAR 23,600', growth: '+12.4%', tone: 'indigo' },
  { label: 'Gross Profit', value: 'SAR 6,480', growth: '+8.1%', tone: 'emerald' },
  { label: 'Average Basket', value: 'SAR 42.30', growth: '+3.9%', tone: 'slate' },
];

export const groceryKpis: KpiCard[] = [
  { label: 'Daily Revenue', value: 'SAR 86,200', growth: '+14.6%', tone: 'indigo' },
  { label: 'Gross Profit', value: 'SAR 18,940', growth: '+11.2%', tone: 'emerald' },
  { label: 'Department Margin', value: '22.8%', growth: '+2.4%', tone: 'slate' },
];
