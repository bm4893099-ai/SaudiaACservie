import { Injectable, Optional } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { defaultSiteSettings } from './default-site-settings';
import { UpdateSiteSettingsDto } from './dto/update-site-settings.dto';
import { SiteSettings, SiteSettingsDocument } from './schemas/site-settings.schema';

type SiteSettingsState = typeof defaultSiteSettings;

@Injectable()
export class SettingsService {
  private memorySettings: SiteSettingsState = this.cloneData(defaultSiteSettings);

  constructor(
    @Optional()
    @InjectModel(SiteSettings.name)
    private readonly siteSettingsModel?: Model<SiteSettingsDocument>,
  ) {}

  private cloneData<T>(value: T): T {
    return JSON.parse(JSON.stringify(value)) as T;
  }

  private mergeSettings(
    current: Partial<SiteSettingsState>,
    updateSiteSettingsDto: UpdateSiteSettingsDto,
  ): SiteSettingsState {
    return {
      ...defaultSiteSettings,
      ...current,
      ...updateSiteSettingsDto,
      socials: {
        ...defaultSiteSettings.socials,
        ...current.socials,
        ...updateSiteSettingsDto.socials,
        instagram: {
          ...defaultSiteSettings.socials.instagram,
          ...current.socials?.instagram,
          ...updateSiteSettingsDto.socials?.instagram,
        },
        whatsapp: {
          ...defaultSiteSettings.socials.whatsapp,
          ...current.socials?.whatsapp,
          ...updateSiteSettingsDto.socials?.whatsapp,
        },
        facebook: {
          ...defaultSiteSettings.socials.facebook,
          ...current.socials?.facebook,
          ...updateSiteSettingsDto.socials?.facebook,
        },
        tiktok: {
          ...defaultSiteSettings.socials.tiktok,
          ...current.socials?.tiktok,
          ...updateSiteSettingsDto.socials?.tiktok,
        },
        x: {
          ...defaultSiteSettings.socials.x,
          ...current.socials?.x,
          ...updateSiteSettingsDto.socials?.x,
        },
      },
      serviceImages: {
        ...defaultSiteSettings.serviceImages,
        ...current.serviceImages,
        ...updateSiteSettingsDto.serviceImages,
      },
    };
  }

  async getSettings() {
    if (!this.siteSettingsModel) {
      return this.cloneData(this.memorySettings);
    }

    const siteSettingsModel = this.siteSettingsModel;

    try {
      const existing = (await siteSettingsModel.findOne().lean()) as SiteSettingsState | null;

      if (existing) {
        this.memorySettings = this.mergeSettings(existing, {});
        return existing;
      }

      const created = await siteSettingsModel.create(defaultSiteSettings);
      const createdSettings = created.toObject() as SiteSettingsState;

      this.memorySettings = this.mergeSettings(createdSettings, {});

      return createdSettings;
    } catch {
      return this.cloneData(this.memorySettings);
    }
  }

  async updateSettings(updateSiteSettingsDto: UpdateSiteSettingsDto) {
    const current = await this.getSettings();
    const merged = this.mergeSettings(current, updateSiteSettingsDto);

    this.memorySettings = this.cloneData(merged);

    if (!this.siteSettingsModel) {
      return this.cloneData(this.memorySettings);
    }

    try {
      return await this.siteSettingsModel
        .findOneAndUpdate(
          {},
          { $set: merged },
          {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
          },
        )
        .lean();
    } catch {
      return this.cloneData(this.memorySettings);
    }
  }
}
