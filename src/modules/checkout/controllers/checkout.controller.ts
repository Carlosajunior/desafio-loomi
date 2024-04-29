import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CheckoutService } from '../services/checkout.service';
import { processOrderDTO } from '../dtos/process-order.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('process-order')
  async processOrder(@Body() processOrderDTO: processOrderDTO) {
    try {
      return await this.checkoutService.processOrder(processOrderDTO);
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
