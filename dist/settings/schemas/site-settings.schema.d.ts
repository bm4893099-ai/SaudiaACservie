import { HydratedDocument } from 'mongoose';
export type SiteSettingsDocument = HydratedDocument<SiteSettings>;
declare class SocialLink {
    url: string;
    enabled: boolean;
}
declare class SocialLinks {
    instagram: SocialLink;
    whatsapp: SocialLink;
    facebook: SocialLink;
    tiktok: SocialLink;
    x: SocialLink;
}
declare class ServiceImages {
    acRepair: string;
    fridgeRepair: string;
    washingMachineRepair: string;
    electronicsRepair: string;
}
export declare class SiteSettings {
    businessName: string;
    tagline: string;
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    phone: string;
    whatsappNumber: string;
    email: string;
    address: string;
    mapLink: string;
    workingHours: string;
    footerNote: string;
    socials: SocialLinks;
    serviceImages: ServiceImages;
}
export declare const SiteSettingsSchema: import("mongoose").Schema<SiteSettings, import("mongoose").Model<SiteSettings, any, any, any, import("mongoose").Document<unknown, any, SiteSettings, any, {}> & SiteSettings & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SiteSettings, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<SiteSettings>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<SiteSettings> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export {};
