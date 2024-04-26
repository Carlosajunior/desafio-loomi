import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UpdateUserAsClientDTO } from './update-user-as-client.dto';

export class UpdateUserDTO extends UpdateUserAsClientDTO {
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
