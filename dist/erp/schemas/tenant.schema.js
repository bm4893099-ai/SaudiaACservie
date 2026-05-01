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
exports.TenantSchema = exports.Tenant = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const business_type_1 = require("../constants/business-type");
const national_address_schema_1 = require("./shared/national-address.schema");
let Tenant = class Tenant {
};
exports.Tenant = Tenant;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Tenant.prototype, "storeName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], Tenant.prototype, "logoUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Tenant.prototype, "crNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        trim: true,
        match: /^\d{15}$/,
        index: true,
        unique: true,
    }),
    __metadata("design:type", String)
], Tenant.prototype, "vatNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: national_address_schema_1.NationalAddressSchema, required: true }),
    __metadata("design:type", national_address_schema_1.NationalAddress)
], Tenant.prototype, "nationalAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: business_type_1.BUSINESS_TYPES, index: true }),
    __metadata("design:type", String)
], Tenant.prototype, "businessType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, lowercase: true, unique: true, index: true }),
    __metadata("design:type", String)
], Tenant.prototype, "adminEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, select: false }),
    __metadata("design:type", String)
], Tenant.prototype, "adminPasswordHash", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true, index: true }),
    __metadata("design:type", Boolean)
], Tenant.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: 'Asia/Riyadh' }),
    __metadata("design:type", String)
], Tenant.prototype, "timezone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: 'SAR' }),
    __metadata("design:type", String)
], Tenant.prototype, "currency", void 0);
exports.Tenant = Tenant = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false, collection: 'tenants' })
], Tenant);
exports.TenantSchema = mongoose_1.SchemaFactory.createForClass(Tenant);
exports.TenantSchema.index({ storeName: 1, businessType: 1 });
//# sourceMappingURL=tenant.schema.js.map