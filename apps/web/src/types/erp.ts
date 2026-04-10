export type BusinessType = 'BAKALA' | 'GROCERY_STORE';

export type TenantFeatureAccess = {
  wholesaleProcurement: boolean;
  scaleIntegration: boolean;
  labelPrinting: boolean;
  departmentAnalytics: boolean;
  advancedInventory: boolean;
};

export type LocalizedText = {
  en: string;
  ar: string;
};

export type TenantFormValues = {
  storeName: string;
  logoUrl: string;
  crNumber: string;
  vatNumber: string;
  businessType: BusinessType;
  adminEmail: string;
  adminPassword: string;
  nationalAddress: {
    buildingNumber: string;
    street: string;
    district: string;
    city: string;
    postalCode: string;
    additionalNumber: string;
    unitNumber: string;
  };
};

export type ProductRecord = {
  id: string;
  sku: string;
  barcode: string;
  category: string;
  name: LocalizedText;
  costPrice: number;
  sellingPrice: number;
  vatRate: number;
  stockOnHand: number;
  reorderLevel: number;
  expiryDate?: string;
  isWeighedItem: boolean;
  scaleBarcodeConfig?: {
    prefix: string;
    itemCode: string;
    embedsWeight: boolean;
  };
};

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
  isWeighedItem: boolean;
  scaleBarcode?: string;
};

export type RevenuePoint = {
  label: string;
  revenue: number;
  profit: number;
};

export type KpiCard = {
  label: string;
  value: string;
  growth: string;
  tone: 'indigo' | 'emerald' | 'slate';
};
