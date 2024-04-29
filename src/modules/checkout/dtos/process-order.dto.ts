import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ProccessOrderDTO {
  @ApiProperty({
    title: 'cardNumber',
    type: String,
    required: true,
    description: "User's card number for payment proccess.",
  })
  @IsNotEmpty()
  @IsString()
  cardNumber: string;

  @ApiProperty({
    title: 'expirationDate',
    type: String,
    required: true,
    description:
      "User's card expiration date for payment proccess. Must be on the format YYYY-MM-DD.",
  })
  @IsNotEmpty()
  @IsDateString()
  expirationDate: string;

  @ApiProperty({
    title: 'cvv',
    type: String,
    required: true,
    description: "User's card cvv for payment proccess.",
  })
  @IsNotEmpty()
  @IsString()
  cvv: string;

  @ApiProperty({
    title: 'orderId',
    type: String,
    required: true,
    description: 'Id of the order which payment will be proccessed.',
  })
  @IsNotEmpty()
  @IsUUID()
  orderId: string;
}
