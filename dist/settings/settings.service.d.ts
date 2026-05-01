import { Model } from 'mongoose';
import { UpdateSiteSettingsDto } from './dto/update-site-settings.dto';
import { SiteSettingsDocument } from './schemas/site-settings.schema';
export declare class SettingsService {
    private readonly siteSettingsModel?;
    private memorySettings;
    constructor(siteSettingsModel?: Model<SiteSettingsDocument> | undefined);
    private cloneData;
    private mergeSettings;
    getSettings(): Promise<{
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
        socials: {
            instagram: {
                url: string;
                enabled: boolean;
            };
            whatsapp: {
                url: string;
                enabled: boolean;
            };
            facebook: {
                url: string;
                enabled: boolean;
            };
            tiktok: {
                url: string;
                enabled: boolean;
            };
            x: {
                url: string;
                enabled: boolean;
            };
        };
        serviceImages: {
            acRepair: string;
            fridgeRepair: string;
            washingMachineRepair: string;
            electronicsRepair: string;
        };
    }>;
    updateSettings(updateSiteSettingsDto: UpdateSiteSettingsDto): Promise<{
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
        socials: {
            instagram: {
                url: string;
                enabled: boolean;
            };
            whatsapp: {
                url: string;
                enabled: boolean;
            };
            facebook: {
                url: string;
                enabled: boolean;
            };
            tiktok: {
                url: string;
                enabled: boolean;
            };
            x: {
                url: string;
                enabled: boolean;
            };
        };
        serviceImages: {
            acRepair: string;
            fridgeRepair: string;
            washingMachineRepair: string;
            electronicsRepair: string;
        };
    }>;
}
