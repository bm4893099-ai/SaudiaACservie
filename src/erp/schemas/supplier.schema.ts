import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type SupplierDocument = HydratedDocument<Supplier>;

@Schema({ timestamps: true, versionKey: false, collection: 'suppliers' })
export class Supplier {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tenant', required: true, index: true })
  tenantId!: Types.ObjectId;

  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ trim: true, default: '' })
  contactPerson!: string;

  @Prop({ trim: true, default: '' })
  phone!: string;

  @Prop({ trim: true, default: '' })
  email!: string;

  @Prop({ trim: true, default: '' })
  vatNumber!: string;

  @Prop({ trim: true, default: '' })
  crNumber!: string;

  @Prop({ trim: true, default: '' })
  paymentTerms!: string;

  @Prop({ default: true, index: true })
  isActive!: boolean;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);

SupplierSchema.index({ tenantId: 1, name: 1 }, { unique: true });
