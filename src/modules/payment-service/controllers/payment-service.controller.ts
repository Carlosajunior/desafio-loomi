import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { PaymentServiceService } from '../services/payment-service.service';
import { PaymentCredentialsDTO } from '../dtos/payment-credentials.dto';
import { IsPublic } from 'src/modules/authentication/decorators/is-public.decorator';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller('payment-service')
export class PaymentServiceController {
  constructor(private readonly paymentServiceService: PaymentServiceService) {}

  @ApiExcludeEndpoint()
  @IsPublic()
  @Post('process')
  async processPayment(
    @Body() credentials: PaymentCredentialsDTO,
  ): Promise<{ success: boolean } | BadRequestException> {
    try {
      const paymentApproved =
        await this.paymentServiceService.processPayment(credentials);
      return { success: paymentApproved as unknown as boolean };
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
