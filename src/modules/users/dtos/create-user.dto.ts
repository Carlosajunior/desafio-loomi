import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { CreateUserAsClientDTO } from './create-user-as-client.dto';
import { userType } from '@prisma/client';

export class CreateUserDTO extends CreateUserAsClientDTO {
  @ApiProperty({
    title: 'type',
    type: userType,
    enum: userType,
    required: true,
    description: ' User`s type, Admin or Client.',
  })
  @IsNotEmpty()
  @IsEnum(userType)
  type: userType;
}
