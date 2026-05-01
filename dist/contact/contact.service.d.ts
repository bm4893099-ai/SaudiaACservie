import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactSubmission, ContactSubmissionDocument } from './schemas/contact-submission.schema';
type MemoryContactSubmission = CreateContactDto & {
    createdAt: string;
    id: string;
    location: string;
    preferredDate: string;
    updatedAt: string;
};
export declare class ContactService {
    private readonly contactModel?;
    private memorySubmissions;
    constructor(contactModel?: Model<ContactSubmissionDocument> | undefined);
    private cloneData;
    createSubmission(createContactDto: CreateContactDto): Promise<{
        message: string;
        submission: MemoryContactSubmission;
    } | {
        message: string;
        submission: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ContactSubmission, {}, {}> & ContactSubmission & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, ContactSubmission, {}, {}> & ContactSubmission & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getAllSubmissions(): Promise<MemoryContactSubmission[] | (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, ContactSubmission, {}, {}> & ContactSubmission & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
}
export {};
