import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseEnabled } from '../database/database-config';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { SiteSettings, SiteSettingsSchema } from './schemas/site-settings.schema';

const databaseImports = databaseEnabled
  ? [
      MongooseModule.forFeature([
        { name: SiteSettings.name, schema: SiteSettingsSchema },
      ]),
    ]
  : [];

@Module({
  imports: [...databaseImports],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
