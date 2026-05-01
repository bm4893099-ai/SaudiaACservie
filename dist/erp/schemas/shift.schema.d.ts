import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
export type ShiftDocument = HydratedDocument<Shift>;
export declare class Shift {
    tenantId: Types.ObjectId;
    registerId: string;
    cashierId: string;
    openedAt: Date;
    closedAt: Date | null;
    openingFloat: number;
    expectedClosingCash: number;
    closingCash: number;
    variance: number;
    status: string;
}
export declare const ShiftSchema: MongooseSchema<Shift, import("mongoose").Model<Shift, any, any, any, import("mongoose").Document<unknown, any, Shift, any, {}> & Shift & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Shift, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Shift>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Shift> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
