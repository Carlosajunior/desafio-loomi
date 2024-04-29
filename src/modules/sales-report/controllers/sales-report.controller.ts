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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('sales-report')
@Controller('sales-report')
export class salesReportController {
  constructor(private readonly salesReportService: SalesReportService) {}

  @ApiOperation({
    summary: `Endpoint accesible to administrators only, that generates a sales report given a certain period of time to filter the records on the database, generating a CSV file and upload it, returning an object with the total of producst sold on that period, total revenue and a link to download the CSV file.`,
  })
  @Post()
  async createSalesReport(@Body() data: CreateSalesReportDTO) {
    try {
      return await this.salesReportService.createSalesReport(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @ApiOperation({
    summary: `Endpoint accesible to administrators only, retrive a sales report's data given it's Id.`,
  })
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

  @ApiOperation({
    summary: `Endpoint accesible to administrators only, to update a sales report file path`,
  })
  @Patch()
  async updateSalesReport(@Body() data: UpdateSalesReportDTO) {
    try {
      return await this.updateSalesReport(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @ApiOperation({
    summary: `Endpoint accesible to administrators only, to remove a sales report's data from the database.`,
  })
  @Delete()
  async deleteSalesReport(@Body() data: DeleteSalesReportDTO) {
    try {
      return await this.salesReportService.deleteSalesReport(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
