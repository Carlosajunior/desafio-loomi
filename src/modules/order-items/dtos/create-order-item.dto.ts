import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateOrderItemDTO {
  @ApiProperty({
    title: 'orderId',
    type: String,
    required: true,
    description: 'Id of the order which the item is related to.',
  })
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({
    title: 'productId',
    type: String,
    required: true,
    description: 'Id of the product of this order item.',
  })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    title: 'quantity',
    type: Number,
    required: true,
    description: 'Quantity of this order item.',
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
