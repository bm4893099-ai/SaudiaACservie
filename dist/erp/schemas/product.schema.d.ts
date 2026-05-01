import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { LocalizedText } from './shared/localized-text.schema';
export type ProductDocument = HydratedDocument<Product>;
declare class ScaleBarcodeConfig {
    prefix: string;
    itemCode: string;
    embedsWeight: boolean;
}
export declare class Product {
    tenantId: Types.ObjectId;
    categoryId: Types.ObjectId;
    name: LocalizedText;
    sku: string;
    barcode: string;
    costPrice: number;
    sellingPrice: number;
    vatRate: number;
    expiryDate: Date | null;
    isWeighedItem: boolean;
    scaleBarcodeConfig: ScaleBarcodeConfig;
    stockOnHand: number;
    reorderLevel: number;
    unitOfMeasure: string;
    isActive: boolean;
    sfdaRequiresExpiryTracking: boolean;
}
export declare const ProductSchema: MongooseSchema<Product, import("mongoose").Model<Product, any, any, any, import("mongoose").Document<unknown, any, Product, any, {}> & Product & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Product>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Product> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
export {};
