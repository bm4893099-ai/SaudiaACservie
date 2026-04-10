import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import {
  LocalizedText,
  LocalizedTextSchema,
} from './shared/localized-text.schema';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true, versionKey: false, collection: 'categories' })
export class Category {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tenant', required: true, index: true })
  tenantId!: Types.ObjectId;

  @Prop({ type: LocalizedTextSchema, required: true })
  name!: LocalizedText;

  @Prop({ trim: true, default: '', index: true })
  code!: string;

  @Prop({ default: true, index: true })
  isActive!: boolean;

  @Prop({ trim: true, default: '' })
  department!: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.index({ tenantId: 1, 'name.en': 1 }, { unique: true });
CategorySchema.index({ tenantId: 1, code: 1 }, { unique: true, sparse: true });
