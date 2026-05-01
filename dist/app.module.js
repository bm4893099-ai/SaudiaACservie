"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const database_config_1 = require("./database/database-config");
const contact_module_1 = require("./contact/contact.module");
const erp_module_1 = require("./erp/erp.module");
const settings_module_1 = require("./settings/settings.module");
const site_module_1 = require("./site/site.module");
const databaseImports = database_config_1.databaseEnabled
    ? [
        mongoose_1.MongooseModule.forRootAsync({
            inject: [config_1.ConfigService],
            useFactory: (configService) => ({
                uri: configService.get('MONGODB_URI'),
            }),
        }),
    ]
    : [];
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                exclude: ['/api*'],
            }),
            ...databaseImports,
            site_module_1.SiteModule,
            contact_module_1.ContactModule,
            settings_module_1.SettingsModule,
            erp_module_1.ErpModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map