import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { userType } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SearchUserDTO {
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
  page: number;

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
  records_per_page: number;

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
    title: 'email',
    type: String,
    required: true,
    description: 'User`s email.',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    title: 'name',
    type: String,
    required: false,
    description: 'User`s name.',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    title: 'status',
    type: Boolean,
    required: false,
    description: 'User`s status.',
  })
  @IsOptional()
  @Transform(({ value }) =>
    value === 'true' ? true : value === 'false' ? false : value,
  )
  @IsBoolean()
  status?: boolean;

  @ApiPropertyOptional({
    title: 'type',
    type: userType,
    enum: userType,
    required: true,
    description: ' User`s type, Admin or Client.',
  })
  @IsOptional()
  @IsEnum(userType)
  @Transform(({ value }) => {
    return userType[value];
  })
  type?: userType;
}
