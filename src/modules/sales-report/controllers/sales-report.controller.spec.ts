import { Test, TestingModule } from '@nestjs/testing';
import { salesReportController } from './sales-report.controller';
import { salesReportService } from '../services/sales-report.service';

describe('salesReportController', () => {
  let controller: salesReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [salesReportController],
      providers: [salesReportService],
    }).compile();

    controller = module.get<salesReportController>(salesReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
