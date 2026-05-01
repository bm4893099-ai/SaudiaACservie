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
exports.PurchaseOrderSchema = exports.PurchaseOrder = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PurchaseOrderLine = class PurchaseOrderLine {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Product', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PurchaseOrderLine.prototype, "productId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], PurchaseOrderLine.prototype, "orderedQuantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], PurchaseOrderLine.prototype, "receivedQuantity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], PurchaseOrderLine.prototype, "unitCost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, max: 100, default: 15 }),
    __metadata("design:type", Number)
], PurchaseOrderLine.prototype, "vatRate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0, default: 0 }),
    __metadata("design:type", Number)
], PurchaseOrderLine.prototype, "discountAmount", void 0);
PurchaseOrderLine = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], PurchaseOrderLine);
let PurchaseOrder = class PurchaseOrder {
};
exports.PurchaseOrder = PurchaseOrder;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Tenant', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PurchaseOrder.prototype, "tenantId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Supplier', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], PurchaseOrder.prototype, "supplierId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true, index: true }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "poNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['DRAFT', 'APPROVED', 'PARTIALLY_RECEIVED', 'RECEIVED', 'CANCELLED'],
        default: 'DRAFT',
        index: true,
    }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [PurchaseOrderLine], default: [] }),
    __metadata("design:type", Array)
], PurchaseOrder.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Object)
], PurchaseOrder.prototype, "expectedDeliveryDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true, default: '' }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], PurchaseOrder.prototype, "subtotal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], PurchaseOrder.prototype, "vatAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0, default: 0 }),
    __metadata("design:type", Number)
], PurchaseOrder.prototype, "totalAmount", void 0);
exports.PurchaseOrder = PurchaseOrder = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false, collection: 'purchase_orders' })
], PurchaseOrder);
exports.PurchaseOrderSchema = mongoose_1.SchemaFactory.createForClass(PurchaseOrder);
exports.PurchaseOrderSchema.index({ tenantId: 1, poNumber: 1 }, { unique: true });
exports.PurchaseOrderSchema.index({ tenantId: 1, supplierId: 1, createdAt: -1 });
//# sourceMappingURL=purchase-order.schema.js.map