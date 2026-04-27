import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseReceiptsController } from './warehouse-receipts.controller';
import { WarehouseReceiptsService } from './warehouse-receipts.service';
import { WarehouseReceipt } from './entities/warehouse-receipt.entity';
import { WarehouseReceiptItem } from './entities/warehouse-receipt-item.entity';
import { Department } from '../departments/entities/department.entity';
import { Warehouse } from '../warehouses/entities/warehouse.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    WarehouseReceipt, WarehouseReceiptItem,
    Department, Warehouse, Supplier, Product
  ])],
  controllers: [WarehouseReceiptsController],
  providers: [WarehouseReceiptsService],
})
export class WarehouseReceiptsModule {}
