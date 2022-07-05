import {
  IsArray,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsMongoId()
  @ApiProperty()
  category: string;

  @IsInt()
  @ApiProperty()
  listPrice: number;

  @IsInt()
  @ApiProperty()
  unitCost: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ApiPropertyOptional()
  attributes: string[];

  @IsInt()
  @ApiProperty()
  quantity: number;
}
