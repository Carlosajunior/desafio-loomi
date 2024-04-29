import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ListOrderItemsByOrderId {
  @ApiProperty({
    title: 'orderId',
    type: String,
    required: true,
    description: 'Id of an order.',
  })
  @IsNotEmpty()
  @IsUUID()
  orderId: string;
}
