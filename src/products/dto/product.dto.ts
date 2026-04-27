import { IsString, IsOptional, IsBoolean, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString() name: string;
  @IsString() code: string;
  @IsOptional() @IsNumber() @Type(() => Number) categoryId?: number;
  @IsOptional() @IsString() brand?: string;
  @IsOptional() @IsString() specification?: string;
  @IsOptional() @IsString() unitOfMeasure?: string;
  @IsOptional() @IsNumber() @Min(0) @Type(() => Number) unitPrice?: number;
}

export class UpdateProductDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() code?: string;
  @IsOptional() @IsNumber() @Type(() => Number) categoryId?: number;
  @IsOptional() @IsString() brand?: string;
  @IsOptional() @IsString() specification?: string;
  @IsOptional() @IsString() unitOfMeasure?: string;
  @IsOptional() @IsNumber() @Min(0) @Type(() => Number) unitPrice?: number;
  @IsOptional() @IsBoolean() isActive?: boolean;
}

export class CreateProductCategoryDto {
  @IsString() name: string;
  @IsString() code: string;
  @IsOptional() @IsString() description?: string;
}
