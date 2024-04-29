import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PaymentCredentialsDTO {
  @IsNotEmpty()
  @IsString()
  cardNumber: string;

  @IsNotEmpty()
  @IsDateString()
  expirationDate: string;

  @IsNotEmpty()
  @IsString()
  cvv: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
