import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class SearchOrderItemDTO {
  @ApiProperty({
    title: 'page',
    type: Number,
    required: true,
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
    required: true,
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
  date_start?: string;

  @ApiPropertyOptional({
    title: 'date_end',
    type: String,
    required: false,
    description:
      'Filter parameter for search from a ending date. Must be on the format YYYY-MM-DD.',
  })
  @IsOptional()
  @IsDateString()
  date_end?: string;

  @ApiPropertyOptional({
    title: 'orderId',
    type: String,
    required: false,
    description: 'Id of the order which the item is related to.',
  })
  @IsUUID()
  @IsOptional()
  orderId?: string;

  @ApiPropertyOptional({
    title: 'productId',
    type: String,
    required: false,
    description: 'Id of the product of this order item.',
  })
  @IsUUID()
  @IsOptional()
  productId?: string;

  @ApiPropertyOptional({
    title: 'quantity',
    type: Number,
    required: false,
    description: 'Quantity of this order item.',
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  quantity?: number;
}
