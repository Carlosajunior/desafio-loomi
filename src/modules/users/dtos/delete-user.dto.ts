import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteUserDTO {
  @ApiProperty({
    title: 'id',
    type: String,
    required: true,
    description: 'Id of user to be deleted.',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
