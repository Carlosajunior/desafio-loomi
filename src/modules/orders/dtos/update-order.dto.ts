import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class UpdateOrderDTO {
  @ApiProperty({
    title: 'id',
    type: String,
    required: true,
    description: 'Id of order the to be updated.',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

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
  @IsNumber()
  @IsOptional()
  total?: number;
}
