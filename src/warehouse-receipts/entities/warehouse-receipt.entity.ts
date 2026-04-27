import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
  ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../departments/entities/department.entity';
import { Warehouse } from '../../warehouses/entities/warehouse.entity';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { WarehouseReceiptItem } from './warehouse-receipt-item.entity';

export enum ReceiptStatus {
  DRAFT = 'draft',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}

@Entity('warehouse_receipts')
export class WarehouseReceipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  createdById: number;

  @ManyToOne(() => User, (u) => u.receipts, { nullable: true })
  @JoinColumn({ name: 'createdById' })
  createdBy: User;

  @Column({ nullable: true })
  departmentId: number;

  @ManyToOne(() => Department, (d) => d.receipts, { nullable: true })
  @JoinColumn({ name: 'departmentId' })
  department: Department;

  @Column({ nullable: true })
  warehouseId: number;

  @ManyToOne(() => Warehouse, (w) => w.receipts, { nullable: true })
  @JoinColumn({ name: 'warehouseId' })
  warehouse: Warehouse;

  @Column({ nullable: true })
  supplierId: number;

  @ManyToOne(() => Supplier, (s) => s.receipts, { nullable: true })
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

  @Column({ unique: true, length: 50 })
  receiptNumber: string;

  @Column({ type: 'date' })
  receiptDate: string;
  @Column({ length: 200, nullable: true })
  companyName: string;

  @Column({ length: 200, nullable: true })
  documentReference: string;

  @Column({ length: 200, nullable: true })
  deliveryPerson: string;

  @Column({ length: 20, nullable: true })
  debitAccount: string;

  @Column({ length: 20, nullable: true })
  creditAccount: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
  totalAmount: number;

  @Column({ type: 'text', nullable: true })
  totalAmountInWords: string;

  @Column({ type: 'enum', enum: ReceiptStatus, default: ReceiptStatus.DRAFT })
  status: ReceiptStatus;

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ nullable: true })
  confirmedById: number;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'confirmedById' })
  confirmedBy: User;

  @Column({ type: 'timestamp', nullable: true })
  confirmedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => WarehouseReceiptItem, (item) => item.receipt, {
    cascade: true,
    eager: true,
  })
  items: WarehouseReceiptItem[];
}
