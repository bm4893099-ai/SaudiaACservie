import type { BusinessType, TenantFeatureAccess } from '../types/erp';

export const getBusinessTypeFeatures = (
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
