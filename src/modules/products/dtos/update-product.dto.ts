import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UpdateProductDTO {
  @ApiProperty({
    title: 'id',
    type: String,
    required: true,
    description: 'Id of product the to be updated.',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    title: 'name',
    type: String,
    required: false,
    description: 'Product`s name.',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    title: 'description',
    type: String,
    required: false,
    description: 'Product`s description.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    title: 'price',
    type: Number,
    required: false,
    description: 'Product`s price.',
  })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional({
    title: 'stockQuantity',
    type: Number,
    required: false,
    description: 'Product`s stock quantity.',
  })
  @IsOptional()
  @IsNumber()
  stockQuantity?: number;
}
