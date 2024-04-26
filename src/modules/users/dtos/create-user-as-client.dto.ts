import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserAsClientDTO {
  @ApiProperty({
    title: 'email',
    type: String,
    required: true,
    description: 'A valid e-mail for user, used to authenticate.',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    title: 'password',
    type: String,
    required: true,
    description: 'A password for user, used to authenticate.',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    title: 'name',
    type: String,
    required: true,
    description: 'User`s name.',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
