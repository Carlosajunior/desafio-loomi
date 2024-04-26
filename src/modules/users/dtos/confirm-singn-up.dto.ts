import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ConfirmSingUpDTO {
  @ApiProperty({
    title: 'id',
    type: String,
    required: true,
    description: 'Id of user to be activated.',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
