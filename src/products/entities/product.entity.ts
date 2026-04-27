import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, OneToMany, JoinColumn,
} from 'typeorm';

@Entity('product_categories')
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Product, (p) => p.category)
  products: Product[];
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => ProductCategory, (c) => c.products, { nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category: ProductCategory;

  @Column({ length: 200 })
  name: string;

  @Column({ unique: true, length: 50 })
  code: string;

  @Column({ length: 200, nullable: true })
  brand: string;

  @Column({ length: 200, nullable: true })
  specification: string;

  @Column({ length: 50, default: 'Cái' })
  unitOfMeasure: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  unitPrice: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
