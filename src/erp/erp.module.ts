import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseEnabled } from '../database/database-config';
import { Category, CategorySchema } from './schemas/category.schema';
import { Grn, GrnSchema } from './schemas/grn.schema';
import { Product, ProductSchema } from './schemas/product.schema';
import {
  PurchaseOrder,
  PurchaseOrderSchema,
} from './schemas/purchase-order.schema';
import { Sale, SaleSchema } from './schemas/sale.schema';
import { Shift, ShiftSchema } from './schemas/shift.schema';
import { Supplier, SupplierSchema } from './schemas/supplier.schema';
import { Tenant, TenantSchema } from './schemas/tenant.schema';

const databaseImports = databaseEnabled
  ? [
      MongooseModule.forFeature([
        { name: Tenant.name, schema: TenantSchema },
        { name: Supplier.name, schema: SupplierSchema },
        { name: Category.name, schema: CategorySchema },
        { name: Product.name, schema: ProductSchema },
        { name: PurchaseOrder.name, schema: PurchaseOrderSchema },
        { name: Grn.name, schema: GrnSchema },
        { name: Shift.name, schema: ShiftSchema },
        { name: Sale.name, schema: SaleSchema },
      ]),
    ]
  : [];

@Module({
  imports: [...databaseImports],
  exports: [...databaseImports],
})
export class ErpModule {}
