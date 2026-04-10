import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type SaleDocument = HydratedDocument<Sale>;

@Schema({ _id: false })
class PaymentAllocation {
  @Prop({ required: true, enum: ['CASH', 'MADA', 'CARD', 'WALLET'] })
  method!: string;

  @Prop({ required: true, min: 0 })
  amount!: number;
}

@Schema({ _id: false })
class SaleLine {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  productId!: Types.ObjectId;

  @Prop({ required: true, trim: true })
  productName!: string;

  @Prop({ required: true, min: 0 })
  quantity!: number;

  @Prop({ required: true, min: 0 })
  unitPrice!: number;

  @Prop({ required: true, min: 0, default: 0 })
  lineDiscount!: number;

  @Prop({ required: true, min: 0, max: 100, default: 15 })
  vatRate!: number;

  @Prop({ required: true, min: 0, default: 0 })
  vatAmount!: number;

  @Prop({ required: true, min: 0, default: 0 })
  lineTotal!: number;

  @Prop({ default: false })
  isWeighedItem!: boolean;

  @Prop({ min: 0, default: 0 })
  measuredWeightKg!: number;

  @Prop({ trim: true, default: '' })
  scaleBarcode!: string;
}

@Schema({ timestamps: true, versionKey: false, collection: 'sales' })
export class Sale {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tenant', required: true, index: true })
  tenantId!: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Shift', required: true, index: true })
  shiftId!: Types.ObjectId;

  @Prop({ required: true, trim: true, index: true, unique: true })
  receiptNumber!: string;

  @Prop({ required: true, trim: true, index: true })
  cashierId!: string;

  @Prop({ type: [SaleLine], default: [] })
  items!: SaleLine[];

  @Prop({ type: [PaymentAllocation], default: [] })
  payments!: PaymentAllocation[];

  @Prop({ required: true, min: 0, default: 0 })
  subtotal!: number;

  @Prop({ required: true, min: 0, default: 0 })
  discountAmount!: number;

  @Prop({ required: true, min: 0, default: 0 })
  vatAmount!: number;

  @Prop({ required: true, min: 0, default: 0 })
  totalAmount!: number;

  @Prop({ required: true, trim: true, default: 'SAR' })
  currency!: string;

  @Prop({ default: false, index: true })
  isOfflineQueued!: boolean;

  @Prop({ trim: true, default: '' })
  zatcaQrBase64!: string;

  @Prop({ default: null })
  soldAt!: Date | null;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);

SaleSchema.index({ tenantId: 1, soldAt: -1 });
SaleSchema.index({ tenantId: 1, cashierId: 1, soldAt: -1 });
