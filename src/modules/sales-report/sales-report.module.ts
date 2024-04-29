import { Module } from '@nestjs/common';
import { SalesReportService } from './services/sales-report.service';
import { salesReportController } from './controllers/sales-report.controller';
import { SalesReportRepository } from './repositories/sales-report.repository';

@Module({
  controllers: [salesReportController],
  providers: [SalesReportService, SalesReportRepository],
})
export class SalesReportModule {}
