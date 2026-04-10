import { Body, Controller, Get, Put } from '@nestjs/common';
import { UpdateSiteSettingsDto } from './dto/update-site-settings.dto';
import { SettingsService } from './settings.service';

@Controller('admin/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings() {
    return this.settingsService.getSettings();
  }

  @Put()
  async updateSettings(@Body() updateSiteSettingsDto: UpdateSiteSettingsDto) {
    return this.settingsService.updateSettings(updateSiteSettingsDto);
  }
}
