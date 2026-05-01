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
exports.SaleSchema = exports.Sale = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PaymentAllocation = class PaymentAllocation {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['CASH', 'MADA', 'CARD', 'WALLET'] }),
    __metadata("design:type", String)
], PaymentAllocation.prototype, "method", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], PaymentAllocation.prototype, "amount", void 0);
PaymentAllocation = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], PaymentAllocation);
let SaleLine = class SaleLine {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Product', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], SaleLine.prototype, "productId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], SaleLine.prototype, "productName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], SaleLine.prototype, "quantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], SaleLine.prototype, "unitPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], SaleLine.prototype, "lineDiscount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, max: 100, default: 15 }),
    __metadata("design:type", Number)
], SaleLine.prototype, "vatRate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], SaleLine.prototype, "vatAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], SaleLine.prototype, "lineTotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], SaleLine.prototype, "isWeighedItem", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0, default: 0 }),
    __metadata("design:type", Number)
], SaleLine.prototype, "measuredWeightKg", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], SaleLine.prototype, "scaleBarcode", void 0);
SaleLine = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], SaleLine);
let Sale = class Sale {
};
exports.Sale = Sale;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Sale.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Shift', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Sale.prototype, "shiftId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, index: true, unique: true }),
    __metadata("design:type", String)
], Sale.prototype, "receiptNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, index: true }),
    __metadata("design:type", String)
], Sale.prototype, "cashierId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [SaleLine], default: [] }),
    __metadata("design:type", Array)
], Sale.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [PaymentAllocation], default: [] }),
    __metadata("design:type", Array)
], Sale.prototype, "payments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "subtotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "discountAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "vatAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], Sale.prototype, "totalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, default: 'SAR' }),
    __metadata("design:type", String)
], Sale.prototype, "currency", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false, index: true }),
    __metadata("design:type", Boolean)
], Sale.prototype, "isOfflineQueued", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], Sale.prototype, "zatcaQrBase64", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Object)
], Sale.prototype, "soldAt", void 0);
exports.Sale = Sale = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false, collection: 'sales' })
], Sale);
exports.SaleSchema = mongoose_1.SchemaFactory.createForClass(Sale);
exports.SaleSchema.index({ tenantId: 1, soldAt: -1 });
exports.SaleSchema.index({ tenantId: 1, cashierId: 1, soldAt: -1 });
//# sourceMappingURL=sale.schema.js.map