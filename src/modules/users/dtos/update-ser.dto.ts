import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateUserDTO {
  @ApiPropertyOptional({
    title: 'id',
    type: String,
    required: true,
    description: 'Id of user to be deleted.',
  })
  @IsOptional()
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    title: 'email',
    type: String,
    required: false,
    description: ' User`s e-mail.',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    title: 'password',
    type: String,
    required: false,
    description: ' User`s password.',
  })
  @IsOptional()
  @IsString()
  password: string;

  @ApiPropertyOptional({
    title: 'name',
    type: String,
    required: false,
    description: ' User`s name.',
  })
  @IsOptional()
  @IsString()
  name: string;
}
