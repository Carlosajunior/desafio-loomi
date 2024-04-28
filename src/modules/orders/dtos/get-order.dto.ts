import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetOrderDTO {
  @ApiProperty({
    title: 'id',
    type: String,
    required: true,
    description: 'Id of order the to be retrieved.',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
