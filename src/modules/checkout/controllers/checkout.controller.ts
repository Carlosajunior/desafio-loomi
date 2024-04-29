import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CheckoutService } from '../services/checkout.service';
import { ProcessOrderDTO } from '../dtos/process-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @ApiOperation({
    summary: `Endpoint accesible to administrators only, that proccess an order, checking if the payment is allowed by the method issued by the customer and if there's still enough products on stock to attend to this order.`,
  })
  @Post('process-order')
  async processOrder(@Body() processOrderDTO: ProcessOrderDTO) {
    try {
      return await this.checkoutService.processOrder(processOrderDTO);
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
