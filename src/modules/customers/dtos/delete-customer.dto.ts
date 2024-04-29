import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteCustomerDTO {
  @ApiProperty({
    title: 'id',
    type: String,
    required: true,
    description: 'Id of the user current logged in.',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
