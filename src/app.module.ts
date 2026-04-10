import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { databaseEnabled } from './database/database-config';
import { ContactModule } from './contact/contact.module';
import { ErpModule } from './erp/erp.module';
import { SettingsModule } from './settings/settings.module';
import { SiteModule } from './site/site.module';

const databaseImports = databaseEnabled
  ? [
      MongooseModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          uri: configService.get<string>('MONGODB_URI'),
        }),
      }),
    ]
  : [];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
    ...databaseImports,
    SiteModule,
    ContactModule,
    SettingsModule,
    ErpModule,
  ],
})
export class AppModule {}
