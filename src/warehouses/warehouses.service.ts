import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { CreateWarehouseDto, UpdateWarehouseDto } from './dto/warehouse.dto';

@Injectable()
export class WarehousesService {
  constructor(@InjectRepository(Warehouse) private repo: Repository<Warehouse>) {}

  findAll() { return this.repo.find({ where: { isActive: true }, order: { name: 'ASC' } }); }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Kho #${id} không tồn tại`);
    return item;
  }

  create(dto: CreateWarehouseDto) { return this.repo.save(this.repo.create(dto)); }

  async update(id: number, dto: UpdateWarehouseDto) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.repo.update(id, { isActive: false });
    return { message: 'Đã xóa' };
  }
}
