import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
export type SupplierDocument = HydratedDocument<Supplier>;
export declare class Supplier {
    tenantId: Types.ObjectId;
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
    vatNumber: string;
    crNumber: string;
    paymentTerms: string;
    isActive: boolean;
}
export declare const SupplierSchema: MongooseSchema<Supplier, import("mongoose").Model<Supplier, any, any, any, import("mongoose").Document<unknown, any, Supplier, any, {}> & Supplier & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Supplier, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Supplier>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Supplier> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
