import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { DepartmentsModule } from './departments/departments.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ProductsModule } from './products/products.module';
import { Department } from './departments/entities/department.entity';
import { Warehouse } from './warehouses/entities/warehouse.entity';
import { Supplier } from './suppliers/entities/supplier.entity';
import { Product, ProductCategory } from './products/entities/product.entity';
import { WarehouseReceiptsModule } from './warehouse-receipts/warehouse-receipts.module';
import { WarehouseReceipt } from './warehouse-receipts/entities/warehouse-receipt.entity';
import { WarehouseReceiptItem } from './warehouse-receipts/entities/warehouse-receipt-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 5432),
        username: config.get('DB_USERNAME', 'admin'),
        password: config.get('DB_PASSWORD', 'password123'),
        database: config.get('DB_NAME', 'myapp_db'),
        entities: [
          User,
          Department, Warehouse, Supplier,
          ProductCategory, Product,
          WarehouseReceipt, WarehouseReceiptItem,
        ],
        synchronize: config.get('NODE_ENV') !== 'production',
        logging: config.get('NODE_ENV') === 'development',
      }),
      inject: [ConfigService],
    }),

    AuthModule,
    DepartmentsModule,
    WarehousesModule,
    SuppliersModule,
    ProductsModule,
    WarehouseReceiptsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
