declare class SocialPlatformDto {
    url?: string;
    enabled?: boolean;
}
declare class SocialsDto {
    instagram?: SocialPlatformDto;
    whatsapp?: SocialPlatformDto;
    facebook?: SocialPlatformDto;
    tiktok?: SocialPlatformDto;
    x?: SocialPlatformDto;
}
declare class ServiceImagesDto {
    acRepair?: string;
    fridgeRepair?: string;
    washingMachineRepair?: string;
    electronicsRepair?: string;
}
export declare class UpdateSiteSettingsDto {
    businessName?: string;
    tagline?: string;
    heroBadge?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    phone?: string;
    whatsappNumber?: string;
    email?: string;
    address?: string;
    mapLink?: string;
    workingHours?: string;
    footerNote?: string;
    socials?: SocialsDto;
    serviceImages?: ServiceImagesDto;
}
export {};
