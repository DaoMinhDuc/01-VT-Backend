import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Product, ProductCategory } from './entities/product.entity';
import { CreateProductDto, UpdateProductDto, CreateProductCategoryDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
    @InjectRepository(ProductCategory) private catRepo: Repository<ProductCategory>,
  ) {}

  findAll(search?: string) {
    return this.repo.find({
      where: search ? [
        { isActive: true, name: ILike(`%${search}%`) },
        { isActive: true, code: ILike(`%${search}%`) },
      ] : { isActive: true },
      relations: ['category'],
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id }, relations: ['category'] });
    if (!item) throw new NotFoundException(`Hàng hóa #${id} không tồn tại`);
    return item;
  }

  create(dto: CreateProductDto) { return this.repo.save(this.repo.create(dto)); }

  async update(id: number, dto: UpdateProductDto) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.update(id, { isActive: false });
    return { message: 'Đã xóa' };
  }
  findAllCategories() { return this.catRepo.find({ order: { name: 'ASC' } }); }
  createCategory(dto: CreateProductCategoryDto) { return this.catRepo.save(this.catRepo.create(dto)); }
}
