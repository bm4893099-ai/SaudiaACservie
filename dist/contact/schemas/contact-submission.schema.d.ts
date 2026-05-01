import { HydratedDocument } from 'mongoose';
export type ContactSubmissionDocument = HydratedDocument<ContactSubmission>;
export declare class ContactSubmission {
    name: string;
    phone: string;
    serviceType: string;
    location: string;
    preferredDate: string;
    message: string;
}
export declare const ContactSubmissionSchema: import("mongoose").Schema<ContactSubmission, import("mongoose").Model<ContactSubmission, any, any, any, import("mongoose").Document<unknown, any, ContactSubmission, any, {}> & ContactSubmission & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ContactSubmission, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ContactSubmission>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<ContactSubmission> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
