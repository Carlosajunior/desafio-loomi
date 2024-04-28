import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsUUID, IsNotEmpty } from 'class-validator';

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
    title: 'quantity',
    type: Number,
    required: true,
    description: 'Quantity of this order item.',
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
