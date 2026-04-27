import {
  IsString, IsOptional, IsNumber, IsDateString, IsEnum,
  IsArray, ValidateNested, Min, ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ReceiptStatus } from '../entities/warehouse-receipt.entity';

export class CreateReceiptItemDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  productId?: number;

  @ApiProperty()
  @IsString()
  productName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  productCode?: string;

  @ApiPropertyOptional({ default: 'Cái' })
  @IsOptional()
  @IsString()
  unitOfMeasure?: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  quantityDocument: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  quantityActual: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  unitPrice: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;
}

export class CreateReceiptDto {
  @ApiProperty()
  @IsString()
  receiptNumber: string;

  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  receiptDate: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  departmentId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  departmentName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  warehouseId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  warehouseName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  supplierId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  supplierName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  documentReference?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  deliveryPerson?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  debitAccount?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  creditAccount?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ type: [CreateReceiptItemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateReceiptItemDto)
  items: CreateReceiptItemDto[];
}

export class UpdateReceiptDto {
  @IsOptional() @IsString() receiptNumber?: string;
  @IsOptional() @IsDateString() receiptDate?: string;
  @IsOptional() @IsString() companyName?: string;
  @IsOptional() @IsNumber() @Type(() => Number) departmentId?: number;
  @IsOptional() @IsString() departmentName?: string;
  @IsOptional() @IsNumber() @Type(() => Number) warehouseId?: number;
  @IsOptional() @IsString() warehouseName?: string;
  @IsOptional() @IsNumber() @Type(() => Number) supplierId?: number;
  @IsOptional() @IsString() supplierName?: string;
  @IsOptional() @IsString() documentReference?: string;
  @IsOptional() @IsString() deliveryPerson?: string;
  @IsOptional() @IsString() debitAccount?: string;
  @IsOptional() @IsString() creditAccount?: string;
  @IsOptional() @IsString() note?: string;
  @IsOptional() @IsEnum(ReceiptStatus) status?: ReceiptStatus;
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => CreateReceiptItemDto)
  items?: CreateReceiptItemDto[];
}
