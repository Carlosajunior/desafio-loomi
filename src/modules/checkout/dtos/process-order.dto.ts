import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ProcessOrderDTO {
  @ApiProperty({
    title: 'cardNumber',
    type: String,
    required: true,
    description: "User's card number for payment process.",
  })
  @IsNotEmpty()
  @IsString()
  cardNumber: string;

  @ApiProperty({
    title: 'expirationDate',
    type: String,
    required: true,
    description:
      "User's card expiration date for payment process. Must be on the format YYYY-MM-DD.",
  })
  @IsNotEmpty()
  @IsDateString()
  expirationDate: string;

  @ApiProperty({
    title: 'cvv',
    type: String,
    required: true,
    description: "User's card cvv for payment process.",
  })
  @IsNotEmpty()
  @IsString()
  cvv: string;

  @ApiProperty({
    title: 'orderId',
    type: String,
    required: true,
    description: 'Id of the order which payment will be processed.',
  })
  @IsNotEmpty()
  @IsUUID()
  orderId: string;
}
