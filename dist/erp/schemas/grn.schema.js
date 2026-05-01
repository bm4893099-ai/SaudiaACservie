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
exports.GrnSchema = exports.Grn = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let GrnLine = class GrnLine {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Product', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], GrnLine.prototype, "productId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], GrnLine.prototype, "receivedQuantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], GrnLine.prototype, "acceptedQuantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], GrnLine.prototype, "rejectedQuantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], GrnLine.prototype, "unitCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0, max: 100, default: 15 }),
    __metadata("design:type", Number)
], GrnLine.prototype, "vatRate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Object)
], GrnLine.prototype, "expiryDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], GrnLine.prototype, "batchNumber", void 0);
GrnLine = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], GrnLine);
let Grn = class Grn {
};
exports.Grn = Grn;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Grn.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.Schema.Types.ObjectId,
        ref: 'PurchaseOrder',
        required: true,
        index: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Grn.prototype, "purchaseOrderId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, index: true, unique: true }),
    __metadata("design:type", String)
], Grn.prototype, "grnNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [GrnLine], default: [] }),
    __metadata("design:type", Array)
], Grn.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], Grn.prototype, "subtotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], Grn.prototype, "vatAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], Grn.prototype, "totalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], Grn.prototype, "receivedBy", void 0);
exports.Grn = Grn = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false, collection: 'grns' })
], Grn);
exports.GrnSchema = mongoose_1.SchemaFactory.createForClass(Grn);
exports.GrnSchema.index({ tenantId: 1, createdAt: -1 });
//# sourceMappingURL=grn.schema.js.map