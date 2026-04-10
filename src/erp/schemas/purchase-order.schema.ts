import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type PurchaseOrderDocument = HydratedDocument<PurchaseOrder>;

@Schema({ _id: false })
class PurchaseOrderLine {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  productId!: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  orderedQuantity!: number;

  @Prop({ required: true, min: 0, default: 0 })
  receivedQuantity!: number;

  @Prop({ required: true, min: 0 })
  unitCost!: number;

  @Prop({ required: true, min: 0, max: 100, default: 15 })
  vatRate!: number;

  @Prop({ min: 0, default: 0 })
  discountAmount!: number;
}

@Schema({ timestamps: true, versionKey: false, collection: 'purchase_orders' })
export class PurchaseOrder {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tenant', required: true, index: true })
  tenantId!: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Supplier', required: true, index: true })
  supplierId!: Types.ObjectId;

  @Prop({ required: true, trim: true, index: true })
  poNumber!: string;

  @Prop({
    required: true,
    enum: ['DRAFT', 'APPROVED', 'PARTIALLY_RECEIVED', 'RECEIVED', 'CANCELLED'],
    default: 'DRAFT',
    index: true,
  })
  status!: string;

  @Prop({ type: [PurchaseOrderLine], default: [] })
  items!: PurchaseOrderLine[];

  @Prop({ default: null })
  expectedDeliveryDate!: Date | null;

  @Prop({ trim: true, default: '' })
  notes!: string;

  @Prop({ required: true, min: 0, default: 0 })
  subtotal!: number;

  @Prop({ required: true, min: 0, default: 0 })
  vatAmount!: number;

  @Prop({ required: true, min: 0, default: 0 })
  totalAmount!: number;
}

export const PurchaseOrderSchema = SchemaFactory.createForClass(PurchaseOrder);

PurchaseOrderSchema.index({ tenantId: 1, poNumber: 1 }, { unique: true });
PurchaseOrderSchema.index({ tenantId: 1, supplierId: 1, createdAt: -1 });
