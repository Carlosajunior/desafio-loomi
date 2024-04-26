import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchCustomerByNameDTO {
  @ApiProperty({
    title: 'fullName',
    type: String,
    required: true,
    description: 'Customer`s full name.',
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;
}
