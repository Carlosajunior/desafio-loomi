import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @ApiProperty({
    title: 'name',
    type: String,
    required: true,
    description: 'Product`s name.',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    title: 'description',
    type: String,
    required: true,
    description: 'Product`s description.',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    title: 'price',
    type: Number,
    required: true,
    description: 'Product`s price.',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    title: 'stockQuantity',
    type: Number,
    required: true,
    description: 'Product`s stock quantity.',
  })
  @IsNotEmpty()
  @IsNumber()
  stockQuantity: number;
}
