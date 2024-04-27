import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetCustomerDTO {
  @ApiProperty({
    title: 'id',
    type: String,
    required: true,
    description: 'Id of customer the to be retrieved.',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
