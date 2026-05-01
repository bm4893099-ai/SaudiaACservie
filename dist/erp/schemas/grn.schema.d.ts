import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
export type GrnDocument = HydratedDocument<Grn>;
declare class GrnLine {
    productId: Types.ObjectId;
    receivedQuantity: number;
    acceptedQuantity: number;
    rejectedQuantity: number;
    unitCost: number;
    vatRate: number;
    expiryDate: Date | null;
    batchNumber: string;
}
export declare class Grn {
    tenantId: Types.ObjectId;
    purchaseOrderId: Types.ObjectId;
    grnNumber: string;
    items: GrnLine[];
    subtotal: number;
    vatAmount: number;
    totalAmount: number;
    receivedBy: string;
}
export declare const GrnSchema: MongooseSchema<Grn, import("mongoose").Model<Grn, any, any, any, import("mongoose").Document<unknown, any, Grn, any, {}> & Grn & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Grn, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Grn>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Grn> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export {};
