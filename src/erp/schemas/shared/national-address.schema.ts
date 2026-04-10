import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class NationalAddress {
  @Prop({ required: true, trim: true })
  buildingNumber!: string;

  @Prop({ required: true, trim: true })
  street!: string;

  @Prop({ required: true, trim: true })
  district!: string;

  @Prop({ required: true, trim: true })
  city!: string;

  @Prop({ required: true, trim: true, default: 'Saudi Arabia' })
  country!: string;

  @Prop({ required: true, trim: true })
  postalCode!: string;

  @Prop({ trim: true, default: '' })
  additionalNumber!: string;

  @Prop({ trim: true, default: '' })
  unitNumber!: string;
}

export const NationalAddressSchema = SchemaFactory.createForClass(NationalAddress);
