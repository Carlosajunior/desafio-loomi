import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CheckoutService } from '../services/checkout.service';
import { ProccessOrderDTO } from '../dtos/process-order.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post('proccess-order')
  async processOrder(@Body() processOrderDTO: ProccessOrderDTO) {
    try {
      return await this.checkoutService.proccessOrder(processOrderDTO);
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
