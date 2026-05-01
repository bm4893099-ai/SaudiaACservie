"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildZatcaVatReturnPipeline = void 0;
const mongoose_1 = require("mongoose");
const buildZatcaVatReturnPipeline = (tenantId, startDate, endDate) => {
    const tenantObjectId = new mongoose_1.Types.ObjectId(tenantId);
    return [
        {
            $facet: {
                outputVat: [
                    {
                        $match: {
                            tenantId: tenantObjectId,
                            soldAt: { $gte: startDate, $lte: endDate },
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            totalOutputVat: { $sum: '$vatAmount' },
                            totalSales: { $sum: '$totalAmount' },
                        },
                    },
                ],
                inputVat: [
                    {
                        $match: {
                            tenantId: tenantObjectId,
                            createdAt: { $gte: startDate, $lte: endDate },
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            totalInputVat: { $sum: '$vatAmount' },
                            totalPurchases: { $sum: '$totalAmount' },
                        },
                    },
                ],
            },
        },
        {
            $project: {
                totalOutputVat: { $ifNull: [{ $first: '$outputVat.totalOutputVat' }, 0] },
                totalSales: { $ifNull: [{ $first: '$outputVat.totalSales' }, 0] },
                totalInputVat: { $ifNull: [{ $first: '$inputVat.totalInputVat' }, 0] },
                totalPurchases: { $ifNull: [{ $first: '$inputVat.totalPurchases' }, 0] },
                vatPayable: {
                    $subtract: [
                        { $ifNull: [{ $first: '$outputVat.totalOutputVat' }, 0] },
                        { $ifNull: [{ $first: '$inputVat.totalInputVat' }, 0] },
                    ],
                },
            },
        },
    ];
};
exports.buildZatcaVatReturnPipeline = buildZatcaVatReturnPipeline;
//# sourceMappingURL=zatca-vat-return.pipeline.js.map