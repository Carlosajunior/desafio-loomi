import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteOrderDTO {
  @ApiProperty({
    title: 'id',
    type: String,
    required: true,
    description: 'Id of order the to be deleted.',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
