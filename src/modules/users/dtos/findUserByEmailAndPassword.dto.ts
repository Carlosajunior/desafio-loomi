import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class FindUserByEmailDTO {
  @ApiProperty({
    title: 'email',
    type: String,
    required: true,
    description: ' User`s e-mail.',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
