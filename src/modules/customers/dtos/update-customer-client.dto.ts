import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCustomerDTO {
  @ApiPropertyOptional({
    title: 'user_id',
    type: String,
    required: false,
    description: 'The id of the user that created the customer.',
  })
  @IsOptional()
  @IsUUID()
  user_id: string;

  @ApiPropertyOptional({
    title: 'fullName',
    type: String,
    required: false,
    description: 'Customer`s full name.',
  })
  @IsOptional()
  @IsString()
  fullName: string;

  @ApiPropertyOptional({
    title: 'contact',
    type: String,
    required: false,
    description: 'Customer`s contatct.',
  })
  @IsOptional()
  @IsString()
  contact: string;

  @ApiPropertyOptional({
    title: 'address',
    type: String,
    required: false,
    description: 'Customer`s address.',
  })
  @IsOptional()
  @IsString()
  address: string;
}
