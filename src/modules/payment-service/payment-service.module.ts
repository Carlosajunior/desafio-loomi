import { Module } from '@nestjs/common';
import { PaymentServiceService } from './services/payment-service.service';
import { PaymentServiceController } from './controllers/payment-service.controller';

@Module({
  controllers: [PaymentServiceController],
  providers: [PaymentServiceService],
})
export class PaymentServiceModule {}
