export declare class LocalizedText {
    en: string;
    ar: string;
}
export declare const LocalizedTextSchema: import("mongoose").Schema<LocalizedText, import("mongoose").Model<LocalizedText, any, any, any, import("mongoose").Document<unknown, any, LocalizedText, any, {}> & LocalizedText & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LocalizedText, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<LocalizedText>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<LocalizedText> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
