import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
export type SaleDocument = HydratedDocument<Sale>;
declare class PaymentAllocation {
    method: string;
    amount: number;
}
declare class SaleLine {
    productId: Types.ObjectId;
    productName: string;
    quantity: number;
    unitPrice: number;
    lineDiscount: number;
    vatRate: number;
    vatAmount: number;
    lineTotal: number;
    isWeighedItem: boolean;
    measuredWeightKg: number;
    scaleBarcode: string;
}
export declare class Sale {
    tenantId: Types.ObjectId;
    shiftId: Types.ObjectId;
    receiptNumber: string;
    cashierId: string;
    items: SaleLine[];
    payments: PaymentAllocation[];
    subtotal: number;
    discountAmount: number;
    vatAmount: number;
    totalAmount: number;
    currency: string;
    isOfflineQueued: boolean;
    zatcaQrBase64: string;
    soldAt: Date | null;
}
export declare const SaleSchema: MongooseSchema<Sale, import("mongoose").Model<Sale, any, any, any, import("mongoose").Document<unknown, any, Sale, any, {}> & Sale & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Sale, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Sale>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Sale> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export {};
