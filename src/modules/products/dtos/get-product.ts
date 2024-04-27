import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetProductDTO {
  @ApiProperty({
    title: 'id',
    type: String,
    required: true,
    description: 'Id of product the to be retrieved.',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
