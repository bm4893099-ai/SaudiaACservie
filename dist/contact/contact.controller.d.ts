import { CreateContactDto } from './dto/create-contact.dto';
import { ContactService } from './contact.service';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    createContact(createContactDto: CreateContactDto): Promise<{
        message: string;
        submission: CreateContactDto & {
            createdAt: string;
            id: string;
            location: string;
            preferredDate: string;
            updatedAt: string;
        };
    } | {
        message: string;
        submission: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/contact-submission.schema").ContactSubmission, {}, {}> & import("./schemas/contact-submission.schema").ContactSubmission & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, {}> & import("mongoose").Document<unknown, {}, import("./schemas/contact-submission.schema").ContactSubmission, {}, {}> & import("./schemas/contact-submission.schema").ContactSubmission & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    getContactSubmissions(): Promise<(CreateContactDto & {
        createdAt: string;
        id: string;
        location: string;
        preferredDate: string;
        updatedAt: string;
    })[] | (import("mongoose").FlattenMaps<import("mongoose").Document<unknown, {}, import("./schemas/contact-submission.schema").ContactSubmission, {}, {}> & import("./schemas/contact-submission.schema").ContactSubmission & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
}
