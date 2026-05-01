export declare class NationalAddress {
    buildingNumber: string;
    street: string;
    district: string;
    city: string;
    country: string;
    postalCode: string;
    additionalNumber: string;
    unitNumber: string;
}
export declare const NationalAddressSchema: import("mongoose").Schema<NationalAddress, import("mongoose").Model<NationalAddress, any, any, any, import("mongoose").Document<unknown, any, NationalAddress, any, {}> & NationalAddress & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NationalAddress, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<NationalAddress>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<NationalAddress> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
