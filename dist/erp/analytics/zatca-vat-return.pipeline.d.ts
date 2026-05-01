import { Types } from 'mongoose';
export declare const buildZatcaVatReturnPipeline: (tenantId: string, startDate: Date, endDate: Date) => ({
    $facet: {
        outputVat: ({
            $match: {
                tenantId: Types.ObjectId;
                soldAt: {
                    $gte: Date;
                    $lte: Date;
                };
            };
            $group?: undefined;
        } | {
            $group: {
                _id: null;
                totalOutputVat: {
                    $sum: string;
                };
                totalSales: {
                    $sum: string;
                };
            };
            $match?: undefined;
        })[];
        inputVat: ({
            $match: {
                tenantId: Types.ObjectId;
                createdAt: {
                    $gte: Date;
                    $lte: Date;
                };
            };
            $group?: undefined;
        } | {
            $group: {
                _id: null;
                totalInputVat: {
                    $sum: string;
                };
                totalPurchases: {
                    $sum: string;
                };
            };
            $match?: undefined;
        })[];
    };
    $project?: undefined;
} | {
    $project: {
        totalOutputVat: {
            $ifNull: (number | {
                $first: string;
            })[];
        };
        totalSales: {
            $ifNull: (number | {
                $first: string;
            })[];
        };
        totalInputVat: {
            $ifNull: (number | {
                $first: string;
            })[];
        };
        totalPurchases: {
            $ifNull: (number | {
                $first: string;
            })[];
        };
        vatPayable: {
            $subtract: {
                $ifNull: (number | {
                    $first: string;
                })[];
            }[];
        };
    };
    $facet?: undefined;
})[];
