import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UpdateCustomerDTO } from './update-customer-client.dto';

export class UpdateCustomerAsAdminDTO extends UpdateCustomerDTO {
  @ApiProperty({
    title: 'id',
    type: String,
    required: true,
    description: 'The id of the customer to be updated.',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
