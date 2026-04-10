import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import {
  LocalizedText,
  LocalizedTextSchema,
} from './shared/localized-text.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ _id: false })
class ScaleBarcodeConfig {
  @Prop({ trim: true, default: '20' })
  prefix!: string;

  @Prop({ trim: true, default: '' })
  itemCode!: string;

  @Prop({ default: true })
  embedsWeight!: boolean;
}

@Schema({ timestamps: true, versionKey: false, collection: 'products' })
export class Product {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tenant', required: true, index: true })
  tenantId!: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category', required: true, index: true })
  categoryId!: Types.ObjectId;

  @Prop({ type: LocalizedTextSchema, required: true })
  name!: LocalizedText;

  @Prop({ trim: true, default: '', index: true })
  sku!: string;

  @Prop({ trim: true, default: '', index: true })
  barcode!: string;

  @Prop({ required: true, min: 0 })
  costPrice!: number;

  @Prop({ required: true, min: 0 })
  sellingPrice!: number;

  @Prop({ required: true, min: 0, max: 100, default: 15 })
  vatRate!: number;

  @Prop({ default: null })
  expiryDate!: Date | null;

  @Prop({ default: false, index: true })
  isWeighedItem!: boolean;

  @Prop({ type: ScaleBarcodeConfig, default: () => ({}) })
  scaleBarcodeConfig!: ScaleBarcodeConfig;

  @Prop({ required: true, min: 0, default: 0 })
  stockOnHand!: number;

  @Prop({ required: true, min: 0, default: 0 })
  reorderLevel!: number;

  @Prop({ trim: true, default: 'UNIT' })
  unitOfMeasure!: string;

  @Prop({ default: true, index: true })
  isActive!: boolean;

  @Prop({ default: false, index: true })
  sfdaRequiresExpiryTracking!: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ tenantId: 1, sku: 1 }, { unique: true, sparse: true });
ProductSchema.index({ tenantId: 1, barcode: 1 }, { unique: true, sparse: true });
ProductSchema.index({ tenantId: 1, 'name.en': 1 });
ProductSchema.index({ tenantId: 1, expiryDate: 1 });
