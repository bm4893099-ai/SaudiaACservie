import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type ShiftDocument = HydratedDocument<Shift>;

@Schema({ timestamps: true, versionKey: false, collection: 'shifts' })
export class Shift {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tenant', required: true, index: true })
  tenantId!: Types.ObjectId;

  @Prop({ required: true, trim: true, index: true })
  registerId!: string;

  @Prop({ required: true, trim: true })
  cashierId!: string;

  @Prop({ required: true, default: Date.now, index: true })
  openedAt!: Date;

  @Prop({ default: null, index: true })
  closedAt!: Date | null;

  @Prop({ required: true, min: 0 })
  openingFloat!: number;

  @Prop({ min: 0, default: 0 })
  expectedClosingCash!: number;

  @Prop({ min: 0, default: 0 })
  closingCash!: number;

  @Prop({ default: 0 })
  variance!: number;

  @Prop({
    required: true,
    enum: ['OPEN', 'CLOSED', 'RECONCILED'],
    default: 'OPEN',
    index: true,
  })
  status!: string;
}

export const ShiftSchema = SchemaFactory.createForClass(Shift);

ShiftSchema.index({ tenantId: 1, registerId: 1, status: 1 });
