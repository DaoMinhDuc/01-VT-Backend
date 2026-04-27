import {
  Controller, Get, Post, Put, Delete, Body, Param,
  ParseIntPipe, UseGuards, Request, Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { WarehouseReceiptsService } from './warehouse-receipts.service';
import { CreateReceiptDto, UpdateReceiptDto } from './dto/receipt.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Warehouse Receipts — Phiếu Nhập Kho')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('receipts')
export class WarehouseReceiptsController {
  constructor(private readonly service: WarehouseReceiptsService) {}

  @ApiOperation({ summary: 'Danh sách phiếu nhập kho' })
  @ApiQuery({ name: 'search', required: false })
  @Get()
  findAll(@Query('search') search?: string) {
    return this.service.findAll(search);
  }

  @ApiOperation({ summary: 'Chi tiết phiếu nhập kho' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @ApiOperation({ summary: 'Tạo phiếu nhập kho mới' })
  @Post()
  create(
    @Body() dto: CreateReceiptDto,
    @Request() req: { user: { id: number } },
  ) {
    return this.service.create(dto, req.user.id);
  }

  @ApiOperation({ summary: 'Cập nhật phiếu nhập kho' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReceiptDto,
  ) {
    return this.service.update(id, dto);
  }

  @ApiOperation({ summary: 'Xác nhận phiếu nhập kho' })
  @Post(':id/confirm')
  confirm(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: { id: number } },
  ) {
    return this.service.confirm(id, req.user.id);
  }

  @ApiOperation({ summary: 'Hủy phiếu nhập kho' })
  @Post(':id/cancel')
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.service.cancel(id);
  }

  @ApiOperation({ summary: 'Xóa phiếu nháp' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
