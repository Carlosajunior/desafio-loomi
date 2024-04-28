import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class SearchOrderDTO {
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
  page: number;

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
  records_per_page: number;

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
    title: 'orderStatus',
    type: OrderStatus,
    enum: OrderStatus,
    required: false,
    description: 'Status of the order.',
  })
  @IsEnum(OrderStatus)
  @IsOptional()
  orderStatus?: OrderStatus;

  @ApiPropertyOptional({
    title: 'total',
    type: Number,
    required: false,
    description: 'Total value of the order` items',
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  total?: number;

  @ApiPropertyOptional({
    title: 'clientId',
    type: String,
    required: false,
    description: 'Id of the customer that issued an order.',
  })
  @IsUUID()
  @IsOptional()
  clientId?: string;
}
