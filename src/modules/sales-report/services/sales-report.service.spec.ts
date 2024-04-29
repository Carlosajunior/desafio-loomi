import { Test, TestingModule } from '@nestjs/testing';
import { salesReportService } from './sales-report.service';

describe('salesReportService', () => {
  let service: salesReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [salesReportService],
    }).compile();

    service = module.get<salesReportService>(salesReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
