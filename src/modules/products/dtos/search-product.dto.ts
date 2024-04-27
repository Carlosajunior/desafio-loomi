import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SearchProductsDTO {
  @ApiProperty({
    title: 'page',
    type: Number,
    required: false,
    description:
      'Page parameter for pagination, to define which page wants to retrieve.',
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  page?: number;

  @ApiProperty({
    title: 'records_per_page',
    type: Number,
    required: false,
    description:
      'Records per page parameter, to define how much records should be retrieved when paginating the search.',
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  records_per_page?: number;

  @ApiPropertyOptional({
    title: 'date_start',
    type: String,
    required: false,
    description:
      'Filter parameter for search from a initial date. Must be on the format YYYY-MM-DD.',
  })
  @IsOptional()
  @IsDateString()
  date_start: string;

  @ApiPropertyOptional({
    title: 'date_end',
    type: String,
    required: false,
    description:
      'Filter parameter for search from a ending date. Must be on the format YYYY-MM-DD.',
  })
  @IsOptional()
  @IsDateString()
  date_end: string;

  @ApiPropertyOptional({
    title: 'name',
    type: String,
    required: false,
    description: 'Product`s name.',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    title: 'description',
    type: String,
    required: false,
    description: 'Product`s description.',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({
    title: 'price',
    type: Number,
    required: false,
    description: 'Product`s price.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiPropertyOptional({
    title: 'stockQuantity',
    type: Number,
    required: false,
    description: 'Product`s stock quantity.',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  stockQuantity: number;
}
