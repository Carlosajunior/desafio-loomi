import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateOrderDTO {
  @ApiProperty({
    title: 'clientId',
    type: String,
    required: true,
    description: 'Id of the customer issuing a new order.',
  })
  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({
    title: 'productId',
    type: String,
    required: true,
    description:
      'Id of a product, to be inserted on a new order item, related to this order.',
  })
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    title: 'quantity',
    type: Number,
    required: true,
    description:
      'Quantity of a product, to be inserted on a new order item, related to this order.',
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
