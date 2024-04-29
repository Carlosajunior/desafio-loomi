import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteSalesReportDTO {
  @ApiProperty({
    title: 'id',
    type: String,
    required: true,
    description: 'Id of the sales report the to be deleted.',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
