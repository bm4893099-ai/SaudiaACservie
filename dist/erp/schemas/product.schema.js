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
exports.ProductSchema = exports.Product = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const localized_text_schema_1 = require("./shared/localized-text.schema");
let ScaleBarcodeConfig = class ScaleBarcodeConfig {
};
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '20' }),
    __metadata("design:type", String)
], ScaleBarcodeConfig.prototype, "prefix", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], ScaleBarcodeConfig.prototype, "itemCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], ScaleBarcodeConfig.prototype, "embedsWeight", void 0);
ScaleBarcodeConfig = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ScaleBarcodeConfig);
let Product = class Product {
};
exports.Product = Product;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Product.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Category', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Product.prototype, "categoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: localized_text_schema_1.LocalizedTextSchema, required: true }),
    __metadata("design:type", localized_text_schema_1.LocalizedText)
], Product.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '', index: true }),
    __metadata("design:type", String)
], Product.prototype, "sku", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '', index: true }),
    __metadata("design:type", String)
], Product.prototype, "barcode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "costPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "sellingPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, max: 100, default: 15 }),
    __metadata("design:type", Number)
], Product.prototype, "vatRate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Object)
], Product.prototype, "expiryDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false, index: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "isWeighedItem", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: ScaleBarcodeConfig, default: () => ({}) }),
    __metadata("design:type", ScaleBarcodeConfig)
], Product.prototype, "scaleBarcodeConfig", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "stockOnHand", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "reorderLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: 'UNIT' }),
    __metadata("design:type", String)
], Product.prototype, "unitOfMeasure", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true, index: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false, index: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "sfdaRequiresExpiryTracking", void 0);
exports.Product = Product = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false, collection: 'products' })
], Product);
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);
exports.ProductSchema.index({ tenantId: 1, sku: 1 }, { unique: true, sparse: true });
exports.ProductSchema.index({ tenantId: 1, barcode: 1 }, { unique: true, sparse: true });
exports.ProductSchema.index({ tenantId: 1, 'name.en': 1 });
exports.ProductSchema.index({ tenantId: 1, expiryDate: 1 });
//# sourceMappingURL=product.schema.js.map