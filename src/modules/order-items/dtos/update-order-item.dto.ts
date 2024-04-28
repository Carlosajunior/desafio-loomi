import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsUUID, IsNotEmpty } from 'class-validator';

export class UpdateOrderItemDTO {
  @ApiProperty({
    title: 'id',
    type: String,
    required: true,
    description: 'Id of order item the to be updated.',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

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
  @IsNumber()
  @IsOptional()
  quantity?: number;
}
