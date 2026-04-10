import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class SocialPlatformDto {
  @IsString()
  @IsOptional()
  url?: string;

  @IsBoolean()
  @IsOptional()
  enabled?: boolean;
}

class SocialsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => SocialPlatformDto)
  instagram?: SocialPlatformDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialPlatformDto)
  whatsapp?: SocialPlatformDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialPlatformDto)
  facebook?: SocialPlatformDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialPlatformDto)
  tiktok?: SocialPlatformDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialPlatformDto)
  x?: SocialPlatformDto;
}

class ServiceImagesDto {
  @IsString()
  @IsOptional()
  acRepair?: string;

  @IsString()
  @IsOptional()
  fridgeRepair?: string;

  @IsString()
  @IsOptional()
  washingMachineRepair?: string;

  @IsString()
  @IsOptional()
  electronicsRepair?: string;
}

export class UpdateSiteSettingsDto {
  @IsString()
  @IsOptional()
  businessName?: string;

  @IsString()
  @IsOptional()
  tagline?: string;

  @IsString()
  @IsOptional()
  heroBadge?: string;

  @IsString()
  @IsOptional()
  heroTitle?: string;

  @IsString()
  @IsOptional()
  heroSubtitle?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  whatsappNumber?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  mapLink?: string;

  @IsString()
  @IsOptional()
  workingHours?: string;

  @IsString()
  @IsOptional()
  footerNote?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SocialsDto)
  socials?: SocialsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ServiceImagesDto)
  serviceImages?: ServiceImagesDto;
}
