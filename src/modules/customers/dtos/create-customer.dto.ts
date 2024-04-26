import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDTO {
  @ApiProperty({
    title: 'fullName',
    type: String,
    required: true,
    description: 'Customer`s full name.',
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    title: 'contact',
    type: String,
    required: true,
    description: 'Customer`s contatct.',
  })
  @IsNotEmpty()
  @IsString()
  contact: string;

  @ApiProperty({
    title: 'address',
    type: String,
    required: true,
    description: 'Customer`s address.',
  })
  @IsNotEmpty()
  @IsString()
  address: string;
}
