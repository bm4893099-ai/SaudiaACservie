"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const default_site_settings_1 = require("./default-site-settings");
const site_settings_schema_1 = require("./schemas/site-settings.schema");
let SettingsService = class SettingsService {
    constructor(siteSettingsModel) {
        this.siteSettingsModel = siteSettingsModel;
        this.memorySettings = this.cloneData(default_site_settings_1.defaultSiteSettings);
    }
    cloneData(value) {
        return JSON.parse(JSON.stringify(value));
    }
    mergeSettings(current, updateSiteSettingsDto) {
        return {
            ...default_site_settings_1.defaultSiteSettings,
            ...current,
            ...updateSiteSettingsDto,
            socials: {
                ...default_site_settings_1.defaultSiteSettings.socials,
                ...current.socials,
                ...updateSiteSettingsDto.socials,
                instagram: {
                    ...default_site_settings_1.defaultSiteSettings.socials.instagram,
                    ...current.socials?.instagram,
                    ...updateSiteSettingsDto.socials?.instagram,
                },
                whatsapp: {
                    ...default_site_settings_1.defaultSiteSettings.socials.whatsapp,
                    ...current.socials?.whatsapp,
                    ...updateSiteSettingsDto.socials?.whatsapp,
                },
                facebook: {
                    ...default_site_settings_1.defaultSiteSettings.socials.facebook,
                    ...current.socials?.facebook,
                    ...updateSiteSettingsDto.socials?.facebook,
                },
                tiktok: {
                    ...default_site_settings_1.defaultSiteSettings.socials.tiktok,
                    ...current.socials?.tiktok,
                    ...updateSiteSettingsDto.socials?.tiktok,
                },
                x: {
                    ...default_site_settings_1.defaultSiteSettings.socials.x,
                    ...current.socials?.x,
                    ...updateSiteSettingsDto.socials?.x,
                },
            },
            serviceImages: {
                ...default_site_settings_1.defaultSiteSettings.serviceImages,
                ...current.serviceImages,
                ...updateSiteSettingsDto.serviceImages,
            },
        };
    }
    async getSettings() {
        if (!this.siteSettingsModel) {
            return this.cloneData(this.memorySettings);
        }
        const siteSettingsModel = this.siteSettingsModel;
        try {
            const existing = (await siteSettingsModel.findOne().lean());
            if (existing) {
                this.memorySettings = this.mergeSettings(existing, {});
                return existing;
            }
            const created = await siteSettingsModel.create(default_site_settings_1.defaultSiteSettings);
            const createdSettings = created.toObject();
            this.memorySettings = this.mergeSettings(createdSettings, {});
            return createdSettings;
        }
        catch {
            return this.cloneData(this.memorySettings);
        }
    }
    async updateSettings(updateSiteSettingsDto) {
        const current = await this.getSettings();
        const merged = this.mergeSettings(current, updateSiteSettingsDto);
        this.memorySettings = this.cloneData(merged);
        if (!this.siteSettingsModel) {
            return this.cloneData(this.memorySettings);
        }
        try {
            return await this.siteSettingsModel
                .findOneAndUpdate({}, { $set: merged }, {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true,
            })
                .lean();
        }
        catch {
            return this.cloneData(this.memorySettings);
        }
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, mongoose_1.InjectModel)(site_settings_schema_1.SiteSettings.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SettingsService);
//# sourceMappingURL=settings.service.js.map