import {
  Injectable, NotFoundException, BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { WarehouseReceipt, ReceiptStatus } from './entities/warehouse-receipt.entity';
import { WarehouseReceiptItem } from './entities/warehouse-receipt-item.entity';
import { CreateReceiptDto, UpdateReceiptDto } from './dto/receipt.dto';
import { numberToWords } from '../common/utils/number-to-words';

import { Department } from '../departments/entities/department.entity';
import { Warehouse } from '../warehouses/entities/warehouse.entity';
import { Supplier } from '../suppliers/entities/supplier.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class WarehouseReceiptsService {
  constructor(
    @InjectRepository(WarehouseReceipt)
    private readonly receiptRepo: Repository<WarehouseReceipt>,
    @InjectRepository(WarehouseReceiptItem)
    private readonly itemRepo: Repository<WarehouseReceiptItem>,
    @InjectRepository(Department)
    private readonly deptRepo: Repository<Department>,
    @InjectRepository(Warehouse)
    private readonly warehouseRepo: Repository<Warehouse>,
    @InjectRepository(Supplier)
    private readonly supplierRepo: Repository<Supplier>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findAll(search?: string) {
    const query = this.receiptRepo
      .createQueryBuilder('receipt')
      .leftJoinAndSelect('receipt.createdBy', 'createdBy')
      .leftJoinAndSelect('receipt.department', 'department')
      .leftJoinAndSelect('receipt.warehouse', 'warehouse')
      .leftJoinAndSelect('receipt.supplier', 'supplier')
      .leftJoinAndSelect('receipt.items', 'items')
      .orderBy('receipt.createdAt', 'DESC');

    if (search) {
      query.where(
        'receipt.receiptNumber ILIKE :s OR receipt.deliveryPerson ILIKE :s OR receipt.companyName ILIKE :s',
        { s: `%${search}%` },
      );
    }

    return query.getMany();
  }

  async findOne(id: number) {
    const receipt = await this.receiptRepo.findOne({
      where: { id },
      relations: [
        'createdBy', 'confirmedBy',
        'department', 'warehouse', 'supplier',
        'items', 'items.product',
      ],
    });
    if (!receipt) throw new NotFoundException(`Phiếu nhập kho #${id} không tồn tại`);
    return receipt;
  }

  async create(dto: CreateReceiptDto, userId: number) {
    const existing = await this.receiptRepo.findOne({
      where: { receiptNumber: dto.receiptNumber },
    });
    if (existing) {
      throw new BadRequestException(`Số phiếu "${dto.receiptNumber}" đã tồn tại`);
    }
    let departmentId = dto.departmentId;
    if (!departmentId && dto.departmentName) {
      const dept = await this.deptRepo.save({ name: dto.departmentName, code: `DEP-${Date.now()}` });
      departmentId = dept.id;
    }

    let warehouseId = dto.warehouseId;
    if (!warehouseId && dto.warehouseName) {
      const wh = await this.warehouseRepo.save({ name: dto.warehouseName, code: `WH-${Date.now()}` });
      warehouseId = wh.id;
    }

    let supplierId = dto.supplierId;
    if (!supplierId && dto.supplierName) {
      const sup = await this.supplierRepo.save({ name: dto.supplierName, code: `SUP-${Date.now()}` });
      supplierId = sup.id;
    }
    const items = await Promise.all(dto.items.map(async (item, idx) => {
      let productId = item.productId;
      if (!productId && item.productName) {
        const prod = await this.productRepo.save({
          name: item.productName,
          code: item.productCode || `PRD-${Date.now()}-${idx}`,
          unitOfMeasure: item.unitOfMeasure || 'Cái',
          unitPrice: item.unitPrice,
        });
        productId = prod.id;
      }

      const totalAmount = Number(item.quantityActual) * Number(item.unitPrice);
      return this.itemRepo.create({
        ...item,
        productId,
        lineNumber: idx + 1,
        totalAmount,
      });
    }));
    const totalAmount = items.reduce((sum, i) => sum + Number(i.totalAmount), 0);

    const receipt = this.receiptRepo.create({
      ...dto,
      departmentId,
      warehouseId,
      supplierId,
      createdById: userId,
      items,
      totalAmount,
      totalAmountInWords: numberToWords(totalAmount),
      status: ReceiptStatus.DRAFT,
    });

    return this.receiptRepo.save(receipt);
  }

  async update(id: number, dto: UpdateReceiptDto) {
    const receipt = await this.findOne(id);
    if (receipt.status === ReceiptStatus.CONFIRMED) {
      throw new BadRequestException('Không thể chỉnh sửa phiếu đã xác nhận');
    }

    let departmentId = dto.departmentId;
    if (!departmentId && dto.departmentName) {
      const dept = await this.deptRepo.save({ name: dto.departmentName, code: `DEP-${Date.now()}` });
      departmentId = dept.id;
    }

    let warehouseId = dto.warehouseId;
    if (!warehouseId && dto.warehouseName) {
      const wh = await this.warehouseRepo.save({ name: dto.warehouseName, code: `WH-${Date.now()}` });
      warehouseId = wh.id;
    }

    let supplierId = dto.supplierId;
    if (!supplierId && dto.supplierName) {
      const sup = await this.supplierRepo.save({ name: dto.supplierName, code: `SUP-${Date.now()}` });
      supplierId = sup.id;
    }

    if (dto.items) {
      await this.itemRepo.delete({ receiptId: id });

      const items = await Promise.all(dto.items.map(async (item, idx) => {
        let productId = item.productId;
        if (!productId && item.productName) {
          const prod = await this.productRepo.save({
            name: item.productName,
            code: item.productCode || `PRD-${Date.now()}-${idx}`,
            unitOfMeasure: item.unitOfMeasure || 'Cái',
            unitPrice: item.unitPrice,
          });
          productId = prod.id;
        }

        const totalAmount = Number(item.quantityActual) * Number(item.unitPrice);
        return this.itemRepo.create({
          ...item,
          productId,
          receiptId: id,
          lineNumber: idx + 1,
          totalAmount,
        });
      }));

      await this.itemRepo.save(items);

      const totalAmount = items.reduce((sum, i) => sum + Number(i.totalAmount), 0);
      dto['totalAmount'] = totalAmount;
      dto['totalAmountInWords'] = numberToWords(totalAmount);
    }

    await this.receiptRepo.update(id, {
      receiptNumber: dto.receiptNumber,
      receiptDate: dto.receiptDate,
      companyName: dto.companyName,
      departmentId: departmentId ?? dto.departmentId,
      warehouseId: warehouseId ?? dto.warehouseId,
      supplierId: supplierId ?? dto.supplierId,
      documentReference: dto.documentReference,
      deliveryPerson: dto.deliveryPerson,
      debitAccount: dto.debitAccount,
      creditAccount: dto.creditAccount,
      note: dto.note,
      ...(dto['totalAmount'] !== undefined && {
        totalAmount: dto['totalAmount'],
        totalAmountInWords: dto['totalAmountInWords'],
      }),
    });

    return this.findOne(id);
  }

  async confirm(id: number, userId: number) {
    const receipt = await this.findOne(id);
    if (receipt.status !== ReceiptStatus.DRAFT) {
      throw new BadRequestException('Chỉ có thể xác nhận phiếu ở trạng thái Nháp');
    }

    await this.receiptRepo.update(id, {
      status: ReceiptStatus.CONFIRMED,
      confirmedById: userId,
      confirmedAt: new Date(),
    });

    return this.findOne(id);
  }

  async cancel(id: number) {
    const receipt = await this.findOne(id);
    if (receipt.status === ReceiptStatus.CANCELLED) {
      throw new BadRequestException('Phiếu đã bị hủy');
    }

    await this.receiptRepo.update(id, { status: ReceiptStatus.CANCELLED });
    return this.findOne(id);
  }

  async remove(id: number) {
    const receipt = await this.findOne(id);
    if (receipt.status === ReceiptStatus.CONFIRMED) {
      throw new BadRequestException('Không thể xóa phiếu đã xác nhận');
    }
    await this.receiptRepo.delete(id);
    return { message: `Đã xóa phiếu #${id}` };
  }
}
