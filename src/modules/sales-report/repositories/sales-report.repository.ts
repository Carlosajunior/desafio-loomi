import { NotAcceptableException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DeleteSalesReportDTO } from '../dto/delete-sales-report.dto';
import { UpdateSalesReportDTO } from '../dto/update-sales-report.dto';
import { GetSalesReportDTO } from '../dto/get-sales-report.dto';

export class SalesReportRepository {
  prisma = new PrismaClient();

  async createSalesReport(data: {
    period: string;
    salesTotal: number;
    soldProducts: number;
    filePath: string;
  }) {
    try {
      return await this.prisma.salesReport.create({ data: data });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async getSalesReport(data: GetSalesReportDTO) {
    try {
      return await this.prisma.salesReport.findUnique({
        where: { id: data.id },
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async generateSalesReport(generateSalesReportSQLQuery: string) {
    try {
      return await this.prisma.$queryRawUnsafe<
        {
          nomedoproduto: string;
          preçodoproduto: number;
          quantidadevendida: number;
          totaldevendas: number;
          valortotaldevendas: number;
        }[]
      >(generateSalesReportSQLQuery);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async updateSalesReport(data: UpdateSalesReportDTO) {
    try {
      return await this.prisma.salesReport.update({
        where: { id: data.id },
        data: { filePath: data.filePath },
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async deleteSalesReport(data: DeleteSalesReportDTO) {
    try {
      return await this.prisma.salesReport.delete({ where: { id: data.id } });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }
}
