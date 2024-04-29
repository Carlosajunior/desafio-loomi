import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  BadRequestException,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateSalesReportDTO } from '../dto/create-sales-report.dto';
import { GetSalesReportDTO } from '../dto/get-sales-report.dto';
import { UpdateSalesReportDTO } from '../dto/update-sales-report.dto';
import { DeleteSalesReportDTO } from '../dto/delete-sales-report.dto';
import { SalesReportService } from '../services/sales-report.service';

@Controller('sales-report')
export class salesReportController {
  constructor(private readonly salesReportService: SalesReportService) {}

  @Post()
  async createSalesReport(@Body() data: CreateSalesReportDTO) {
    try {
      return await this.salesReportService.createSalesReport(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Get()
  async getSalesReport(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: GetSalesReportDTO,
  ) {
    try {
      return await this.salesReportService.getSalesReport(query);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Patch()
  async updateSalesReport(@Body() data: UpdateSalesReportDTO) {
    try {
      return await this.updateSalesReport(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Delete()
  async deleteSalesReport(@Body() data: DeleteSalesReportDTO) {
    try {
      return await this.salesReportService.deleteSalesReport(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
