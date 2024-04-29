import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetSalesReportDTO {
  @ApiProperty({
    title: 'id',
    type: String,
    required: true,
    description: 'Id of the sales report the to be retrieved.',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
