import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteOrderItemDTO {
  @ApiProperty({
    title: 'id',
    type: String,
    required: true,
    description: 'Id of order item the to be deleted.',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
