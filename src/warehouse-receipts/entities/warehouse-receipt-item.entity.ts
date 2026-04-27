import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn,
} from 'typeorm';
import { WarehouseReceipt } from './warehouse-receipt.entity';
import { Product } from '../../products/entities/product.entity';

@Entity('warehouse_receipt_items')
export class WarehouseReceiptItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  receiptId: number;

  @ManyToOne(() => WarehouseReceipt, (r) => r.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'receiptId' })
  receipt: WarehouseReceipt;

  @Column({ nullable: true })
  productId: number;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ default: 1 })
  lineNumber: number;
  @Column({ length: 255 })
  productName: string;

  @Column({ length: 50, nullable: true })
  productCode: string;

  @Column({ length: 50, default: 'Cái' })
  unitOfMeasure: string;

  @Column({ type: 'decimal', precision: 15, scale: 3, default: 0 })
  quantityDocument: number;

  @Column({ type: 'decimal', precision: 15, scale: 3, default: 0 })
  quantityActual: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
  totalAmount: number;

  @Column({ type: 'text', nullable: true })
  note: string;
}
