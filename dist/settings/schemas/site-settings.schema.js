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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteSettingsSchema = exports.SiteSettings = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let SocialLink = class SocialLink {
};
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], SocialLink.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], SocialLink.prototype, "enabled", void 0);
SocialLink = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], SocialLink);
let SocialLinks = class SocialLinks {
};
__decorate([
    (0, mongoose_1.Prop)({ type: SocialLink, default: () => ({}) }),
    __metadata("design:type", SocialLink)
], SocialLinks.prototype, "instagram", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: SocialLink, default: () => ({}) }),
    __metadata("design:type", SocialLink)
], SocialLinks.prototype, "whatsapp", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: SocialLink, default: () => ({}) }),
    __metadata("design:type", SocialLink)
], SocialLinks.prototype, "facebook", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: SocialLink, default: () => ({}) }),
    __metadata("design:type", SocialLink)
], SocialLinks.prototype, "tiktok", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: SocialLink, default: () => ({}) }),
    __metadata("design:type", SocialLink)
], SocialLinks.prototype, "x", void 0);
SocialLinks = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], SocialLinks);
let ServiceImages = class ServiceImages {
};
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], ServiceImages.prototype, "acRepair", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], ServiceImages.prototype, "fridgeRepair", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], ServiceImages.prototype, "washingMachineRepair", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], ServiceImages.prototype, "electronicsRepair", void 0);
ServiceImages = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ServiceImages);
let SiteSettings = class SiteSettings {
};
exports.SiteSettings = SiteSettings;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], SiteSettings.prototype, "businessName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], SiteSettings.prototype, "tagline", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], SiteSettings.prototype, "heroBadge", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], SiteSettings.prototype, "heroTitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], SiteSettings.prototype, "heroSubtitle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], SiteSettings.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], SiteSettings.prototype, "whatsappNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], SiteSettings.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], SiteSettings.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], SiteSettings.prototype, "mapLink", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], SiteSettings.prototype, "workingHours", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], SiteSettings.prototype, "footerNote", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: SocialLinks, default: () => ({}) }),
    __metadata("design:type", SocialLinks)
], SiteSettings.prototype, "socials", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: ServiceImages, default: () => ({}) }),
    __metadata("design:type", ServiceImages)
], SiteSettings.prototype, "serviceImages", void 0);
exports.SiteSettings = SiteSettings = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false })
], SiteSettings);
exports.SiteSettingsSchema = mongoose_1.SchemaFactory.createForClass(SiteSettings);
//# sourceMappingURL=site-settings.schema.js.map