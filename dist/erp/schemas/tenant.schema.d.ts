import { HydratedDocument } from 'mongoose';
import { BusinessType } from '../constants/business-type';
import { NationalAddress } from './shared/national-address.schema';
export type TenantDocument = HydratedDocument<Tenant>;
export declare class Tenant {
    storeName: string;
    logoUrl: string;
    crNumber: string;
    vatNumber: string;
    nationalAddress: NationalAddress;
    businessType: BusinessType;
    adminEmail: string;
    adminPasswordHash: string;
    isActive: boolean;
    timezone: string;
    currency: string;
}
export declare const TenantSchema: import("mongoose").Schema<Tenant, import("mongoose").Model<Tenant, any, any, any, import("mongoose").Document<unknown, any, Tenant, any, {}> & Tenant & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Tenant, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Tenant>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Tenant> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
