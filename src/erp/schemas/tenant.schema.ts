import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BUSINESS_TYPES, BusinessType } from '../constants/business-type';
import {
  NationalAddress,
  NationalAddressSchema,
} from './shared/national-address.schema';

export type TenantDocument = HydratedDocument<Tenant>;

@Schema({ timestamps: true, versionKey: false, collection: 'tenants' })
export class Tenant {
  @Prop({ required: true, trim: true })
  storeName!: string;

  @Prop({ trim: true, default: '' })
  logoUrl!: string;

  @Prop({ required: true, trim: true })
  crNumber!: string;

  @Prop({
    required: true,
    trim: true,
    match: /^\d{15}$/,
    index: true,
    unique: true,
  })
  vatNumber!: string;

  @Prop({ type: NationalAddressSchema, required: true })
  nationalAddress!: NationalAddress;

  @Prop({ required: true, enum: BUSINESS_TYPES, index: true })
  businessType!: BusinessType;

  @Prop({ required: true, trim: true, lowercase: true, unique: true, index: true })
  adminEmail!: string;

  @Prop({ required: true, select: false })
  adminPasswordHash!: string;

  @Prop({ default: true, index: true })
  isActive!: boolean;

  @Prop({ trim: true, default: 'Asia/Riyadh' })
  timezone!: string;

  @Prop({ trim: true, default: 'SAR' })
  currency!: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);

TenantSchema.index({ storeName: 1, businessType: 1 });
