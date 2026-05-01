import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
export type PurchaseOrderDocument = HydratedDocument<PurchaseOrder>;
declare class PurchaseOrderLine {
    productId: Types.ObjectId;
    orderedQuantity: number;
    receivedQuantity: number;
    unitCost: number;
    vatRate: number;
    discountAmount: number;
}
export declare class PurchaseOrder {
    tenantId: Types.ObjectId;
    supplierId: Types.ObjectId;
    poNumber: string;
    status: string;
    items: PurchaseOrderLine[];
    expectedDeliveryDate: Date | null;
    notes: string;
    subtotal: number;
    vatAmount: number;
    totalAmount: number;
}
export declare const PurchaseOrderSchema: MongooseSchema<PurchaseOrder, import("mongoose").Model<PurchaseOrder, any, any, any, import("mongoose").Document<unknown, any, PurchaseOrder, any, {}> & PurchaseOrder & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PurchaseOrder, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PurchaseOrder>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<PurchaseOrder> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export {};
