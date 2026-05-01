"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBusinessTypeFeatureAccess = exports.BUSINESS_TYPES = void 0;
exports.BUSINESS_TYPES = ['BAKALA', 'GROCERY_STORE'];
const getBusinessTypeFeatureAccess = (businessType) => {
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
exports.getBusinessTypeFeatureAccess = getBusinessTypeFeatureAccess;
//# sourceMappingURL=business-type.js.map