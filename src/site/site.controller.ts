import { Controller, Get } from '@nestjs/common';
import { SettingsService } from '../settings/settings.service';

@Controller('public')
export class SiteController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('settings')
  async getSettings() {
    return this.settingsService.getSettings();
  }
}
