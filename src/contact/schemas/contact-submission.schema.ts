import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactSubmissionDocument = HydratedDocument<ContactSubmission>;

@Schema({ timestamps: true, versionKey: false })
export class ContactSubmission {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, trim: true })
  phone!: string;

  @Prop({ required: true, trim: true })
  serviceType!: string;

  @Prop({ trim: true, default: '' })
  location!: string;

  @Prop({ trim: true, default: '' })
  preferredDate!: string;

  @Prop({ required: true, trim: true })
  message!: string;
}

export const ContactSubmissionSchema = SchemaFactory.createForClass(ContactSubmission);
