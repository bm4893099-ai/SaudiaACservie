import { UpdateSiteSettingsDto } from './dto/update-site-settings.dto';
import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
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
