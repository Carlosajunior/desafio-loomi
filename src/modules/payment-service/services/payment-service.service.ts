import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PaymentCredentialsDTO } from '../dtos/payment-credentials.dto';

@Injectable()
export class PaymentServiceService {
  async processPayment(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    credentials: PaymentCredentialsDTO,
  ): Promise<boolean | NotAcceptableException> {
    try {
      return Math.random() < 0.5;
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }
}
