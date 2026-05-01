"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErpModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../database/database-config");
const category_schema_1 = require("./schemas/category.schema");
const grn_schema_1 = require("./schemas/grn.schema");
const product_schema_1 = require("./schemas/product.schema");
const purchase_order_schema_1 = require("./schemas/purchase-order.schema");
const sale_schema_1 = require("./schemas/sale.schema");
const shift_schema_1 = require("./schemas/shift.schema");
const supplier_schema_1 = require("./schemas/supplier.schema");
const tenant_schema_1 = require("./schemas/tenant.schema");
const databaseImports = database_config_1.databaseEnabled
    ? [
        mongoose_1.MongooseModule.forFeature([
            { name: tenant_schema_1.Tenant.name, schema: tenant_schema_1.TenantSchema },
            { name: supplier_schema_1.Supplier.name, schema: supplier_schema_1.SupplierSchema },
            { name: category_schema_1.Category.name, schema: category_schema_1.CategorySchema },
            { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
            { name: purchase_order_schema_1.PurchaseOrder.name, schema: purchase_order_schema_1.PurchaseOrderSchema },
            { name: grn_schema_1.Grn.name, schema: grn_schema_1.GrnSchema },
            { name: shift_schema_1.Shift.name, schema: shift_schema_1.ShiftSchema },
            { name: sale_schema_1.Sale.name, schema: sale_schema_1.SaleSchema },
        ]),
    ]
    : [];
let ErpModule = class ErpModule {
};
exports.ErpModule = ErpModule;
exports.ErpModule = ErpModule = __decorate([
    (0, common_1.Module)({
        imports: [...databaseImports],
        exports: [...databaseImports],
    })
], ErpModule);
//# sourceMappingURL=erp.module.js.map