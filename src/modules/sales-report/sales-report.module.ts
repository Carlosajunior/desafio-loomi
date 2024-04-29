import { Module } from '@nestjs/common';
import { SalesReportService } from './services/sales-report.service';
import { salesReportController } from './controllers/sales-report.controller';
import { SalesReportRepository } from './repositories/sales-report.repository';
import { AwsS3Service } from '../aws-s3/services/aws-s3.services';

@Module({
  controllers: [salesReportController],
  providers: [SalesReportService, SalesReportRepository, AwsS3Service],
})
export class SalesReportModule {}
