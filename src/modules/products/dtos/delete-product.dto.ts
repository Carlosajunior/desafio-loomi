import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteProductDTO {
  @ApiProperty({
    title: 'id',
    type: String,
    required: true,
    description: 'Id of product the to be deleted.',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
