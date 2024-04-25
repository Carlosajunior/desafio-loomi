import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({
    title: 'email',
    type: String,
    required: true,
    description: ' User`s e-mail.',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    title: 'password',
    type: String,
    required: true,
    description: ' User`s password.',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
