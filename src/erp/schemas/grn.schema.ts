import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type GrnDocument = HydratedDocument<Grn>;

@Schema({ _id: false })
class GrnLine {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  productId!: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  receivedQuantity!: number;

  @Prop({ required: true, min: 0 })
  acceptedQuantity!: number;

  @Prop({ required: true, min: 0, default: 0 })
  rejectedQuantity!: number;

  @Prop({ required: true, min: 0 })
  unitCost!: number;

  @Prop({ min: 0, max: 100, default: 15 })
  vatRate!: number;

  @Prop({ default: null })
  expiryDate!: Date | null;

  @Prop({ trim: true, default: '' })
  batchNumber!: string;
}

@Schema({ timestamps: true, versionKey: false, collection: 'grns' })
export class Grn {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tenant', required: true, index: true })
  tenantId!: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'PurchaseOrder',
    required: true,
    index: true,
  })
  purchaseOrderId!: Types.ObjectId;

  @Prop({ required: true, trim: true, index: true, unique: true })
  grnNumber!: string;

  @Prop({ type: [GrnLine], default: [] })
  items!: GrnLine[];

  @Prop({ required: true, min: 0, default: 0 })
  subtotal!: number;

  @Prop({ required: true, min: 0, default: 0 })
  vatAmount!: number;

  @Prop({ required: true, min: 0, default: 0 })
  totalAmount!: number;

  @Prop({ trim: true, default: '' })
  receivedBy!: string;
}

export const GrnSchema = SchemaFactory.createForClass(Grn);

GrnSchema.index({ tenantId: 1, createdAt: -1 });
