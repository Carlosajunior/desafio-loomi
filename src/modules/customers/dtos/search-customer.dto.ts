import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SearchCustomerDTO {
  @ApiProperty({
    title: 'page',
    type: Number,
    required: true,
    description:
      'Page parameter for pagination, to define which page wants to retrieve.',
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  page?: number;

  @ApiProperty({
    title: 'records_per_page',
    type: Number,
    required: true,
    description:
      'Records per page parameter, to define how much records should be retrieved when paginating the search.',
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  records_per_page?: number;

  @ApiPropertyOptional({
    title: 'date_start',
    type: String,
    required: false,
    description:
      'Filter parameter for search from a initial date. Must be on the format YYYY-MM-DD.',
  })
  @IsOptional()
  @IsDateString()
  date_start?: string;

  @ApiPropertyOptional({
    title: 'date_end',
    type: String,
    required: false,
    description:
      'Filter parameter for search from a ending date. Must be on the format YYYY-MM-DD.',
  })
  @IsOptional()
  @IsDateString()
  date_end?: string;

  @ApiPropertyOptional({
    title: 'fullName',
    type: String,
    required: false,
    description: 'Customer`s full name.',
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({
    title: 'contact',
    type: String,
    required: false,
    description: 'Customer`s contatct.',
  })
  @IsOptional()
  @IsString()
  contact?: string;

  @ApiPropertyOptional({
    title: 'address',
    type: String,
    required: false,
    description: 'Customer`s address.',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    title: 'status',
    type: Boolean,
    required: false,
    description: 'Customer`s status.',
  })
  @IsOptional()
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  @IsBoolean()
  status?: boolean;
}
