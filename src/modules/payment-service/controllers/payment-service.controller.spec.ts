import { Test, TestingModule } from '@nestjs/testing';
import { PaymentServiceController } from './payment-service.controller';
import { PaymentServiceService } from '../services/payment-service.service';

describe('PaymentServiceController', () => {
  let controller: PaymentServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentServiceController],
      providers: [PaymentServiceService],
    }).compile();

    controller = module.get<PaymentServiceController>(PaymentServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
