import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { LocalizedText } from './shared/localized-text.schema';
export type CategoryDocument = HydratedDocument<Category>;
export declare class Category {
    tenantId: Types.ObjectId;
    name: LocalizedText;
    code: string;
    isActive: boolean;
    department: string;
}
export declare const CategorySchema: MongooseSchema<Category, import("mongoose").Model<Category, any, any, any, import("mongoose").Document<unknown, any, Category, any, {}> & Category & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Category, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Category>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Category> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
