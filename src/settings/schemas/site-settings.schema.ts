import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SiteSettingsDocument = HydratedDocument<SiteSettings>;

@Schema({ _id: false })
class SocialLink {
  @Prop({ default: '' })
  url!: string;

  @Prop({ default: false })
  enabled!: boolean;
}

@Schema({ _id: false })
class SocialLinks {
  @Prop({ type: SocialLink, default: () => ({}) })
  instagram!: SocialLink;

  @Prop({ type: SocialLink, default: () => ({}) })
  whatsapp!: SocialLink;

  @Prop({ type: SocialLink, default: () => ({}) })
  facebook!: SocialLink;

  @Prop({ type: SocialLink, default: () => ({}) })
  tiktok!: SocialLink;

  @Prop({ type: SocialLink, default: () => ({}) })
  x!: SocialLink;
}

@Schema({ _id: false })
class ServiceImages {
  @Prop({ default: '' })
  acRepair!: string;

  @Prop({ default: '' })
  fridgeRepair!: string;

  @Prop({ default: '' })
  washingMachineRepair!: string;

  @Prop({ default: '' })
  electronicsRepair!: string;
}

@Schema({ timestamps: true, versionKey: false })
export class SiteSettings {
  @Prop({ required: true, trim: true })
  businessName!: string;

  @Prop({ trim: true, default: '' })
  tagline!: string;

  @Prop({ trim: true, default: '' })
  heroBadge!: string;

  @Prop({ trim: true, default: '' })
  heroTitle!: string;

  @Prop({ trim: true, default: '' })
  heroSubtitle!: string;

  @Prop({ trim: true, default: '' })
  phone!: string;

  @Prop({ trim: true, default: '' })
  whatsappNumber!: string;

  @Prop({ trim: true, default: '' })
  email!: string;

  @Prop({ trim: true, default: '' })
  address!: string;

  @Prop({ trim: true, default: '' })
  mapLink!: string;

  @Prop({ trim: true, default: '' })
  workingHours!: string;

  @Prop({ trim: true, default: '' })
  footerNote!: string;

  @Prop({ type: SocialLinks, default: () => ({}) })
  socials!: SocialLinks;

  @Prop({ type: ServiceImages, default: () => ({}) })
  serviceImages!: ServiceImages;
}

export const SiteSettingsSchema = SchemaFactory.createForClass(SiteSettings);
