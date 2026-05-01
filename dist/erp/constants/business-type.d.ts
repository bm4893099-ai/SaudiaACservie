export declare const BUSINESS_TYPES: readonly ["BAKALA", "GROCERY_STORE"];
export type BusinessType = (typeof BUSINESS_TYPES)[number];
export type TenantFeatureAccess = {
    wholesaleProcurement: boolean;
    scaleIntegration: boolean;
    labelPrinting: boolean;
    departmentAnalytics: boolean;
    advancedInventory: boolean;
};
export declare const getBusinessTypeFeatureAccess: (businessType: BusinessType) => TenantFeatureAccess;
