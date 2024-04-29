import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateSalesReportDTO {
  @ApiProperty({
    title: 'id',
    type: String,
    required: true,
    description: 'Id of the sales report the to be updated.',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({
    title: 'filePath',
    type: String,
    required: true,
    description: 'File path of the sales report the to be updated.',
  })
  @IsNotEmpty()
  @IsString()
  filePath: string;
}
