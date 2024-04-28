import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserAsClientDTO {
  @ApiPropertyOptional({
    title: 'email',
    type: String,
    required: false,
    description: ' User`s e-mail.',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    title: 'password',
    type: String,
    required: false,
    description: ' User`s password.',
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({
    title: 'name',
    type: String,
    required: false,
    description: ' User`s name.',
  })
  @IsOptional()
  @IsString()
  name?: string;
}
