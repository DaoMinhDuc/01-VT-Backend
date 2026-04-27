import { IsString, IsOptional, IsBoolean, MinLength } from 'class-validator';

export class CreateWarehouseDto {
  @IsString() @MinLength(2) name: string;
  @IsString() code: string;
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsString() description?: string;
}

export class UpdateWarehouseDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() code?: string;
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
}
