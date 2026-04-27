import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto/department.dto';

@Injectable()
export class DepartmentsService {
  constructor(@InjectRepository(Department) private repo: Repository<Department>) {}

  findAll() { return this.repo.find({ where: { isActive: true }, order: { name: 'ASC' } }); }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Bộ phận #${id} không tồn tại`);
    return item;
  }

  create(dto: CreateDepartmentDto) { return this.repo.save(this.repo.create(dto)); }

  async update(id: number, dto: UpdateDepartmentDto) {
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
