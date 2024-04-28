import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetOrderItemDTO {
  @ApiProperty({
    title: 'id',
    type: String,
    required: true,
    description: 'Id of order item the to be retrieved.',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
