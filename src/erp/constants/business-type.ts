export const BUSINESS_TYPES = ['BAKALA', 'GROCERY_STORE'] as const;

export type BusinessType = (typeof BUSINESS_TYPES)[number];

export type TenantFeatureAccess = {
  wholesaleProcurement: boolean;
  scaleIntegration: boolean;
  labelPrinting: boolean;
  departmentAnalytics: boolean;
  advancedInventory: boolean;
};

export const getBusinessTypeFeatureAccess = (
  businessType: BusinessType,
): TenantFeatureAccess => {
  if (businessType === 'GROCERY_STORE') {
    return {
      wholesaleProcurement: true,
      scaleIntegration: true,
      labelPrinting: true,
      departmentAnalytics: true,
      advancedInventory: true,
    };
  }

  return {
    wholesaleProcurement: false,
    scaleIntegration: false,
    labelPrinting: false,
    departmentAnalytics: false,
    advancedInventory: true,
  };
};
