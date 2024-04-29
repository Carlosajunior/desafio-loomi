import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateSalesReportDTO } from '../dto/create-sales-report.dto';
import { SalesReportRepository } from '../repositories/sales-report.repository';
import { GetSalesReportDTO } from '../dto/get-sales-report.dto';
import { UpdateSalesReportDTO } from '../dto/update-sales-report.dto';
import { DeleteSalesReportDTO } from '../dto/delete-sales-report.dto';

@Injectable()
export class SalesReportService {
  constructor(private readonly salesReportRepository: SalesReportRepository) {}

  async createSalesReport(data: CreateSalesReportDTO) {
    try {
      const generateSalesReportSQLQuery: string = `SELECT
        produto.name AS nomeDoProduto,
        itemPedido."unitPrice" AS preçoDoProduto,
        SUM(itemPedido.quantity) AS quantidadeVendida,
        SUM(itemPedido.subtotal) AS valorTotalDeVendas,
        (
          SELECT COUNT(*)
          FROM "OrderItem" itemPedido
          JOIN "Order" pedido ON itemPedido."orderId" = pedido.id
          WHERE itemPedido."productId" = produto.id
          AND pedido."orderStatus" IN ('Despachado', 'Entregue')
        ) AS totalDeVendas
      FROM
        "OrderItem" itemPedido
      JOIN
        "Product" produto ON itemPedido."productId" = produto.id
      JOIN
        "Order" pedido ON itemPedido."orderId" = pedido.id
      WHERE
        pedido."created_at" BETWEEN '${data.date_start}' AND '${data.date_end}'
      AND pedido."orderStatus" IN ('Despachado', 'Entregue')
      GROUP BY
        produto.id, produto.name, itemPedido."unitPrice";`;

      const salesReportOnPeriod =
        (await this.salesReportRepository.generateSalesReport(
          generateSalesReportSQLQuery,
        )) as unknown as {
          nomedoproduto: string;
          preçodoproduto: number;
          quantidadevendida: bigint;
          totaldevendas: bigint;
          valortotaldevendas: number;
        }[];

      let salesTotal: number = 0;
      let soldProducts: number = 0;

      for (const saleReport of salesReportOnPeriod) {
        salesTotal = salesTotal + Number(saleReport.totaldevendas);
        soldProducts = soldProducts + Number(saleReport.quantidadevendida);
      }

      return await this.salesReportRepository.createSalesReport({
        period: '' + data.date_start + ', ' + data.date_end,
        salesTotal: salesTotal,
        soldProducts: soldProducts,
        filePath: '',
      });
    } catch (error) {
      console.log(error);
      return new NotAcceptableException(error);
    }
  }

  async getSalesReport(data: GetSalesReportDTO) {
    try {
      return await this.salesReportRepository.getSalesReport(data);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async updateSalesReport(data: UpdateSalesReportDTO) {
    try {
      return await this.salesReportRepository.updateSalesReport(data);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async deleteSalesReport(data: DeleteSalesReportDTO) {
    try {
      return await this.salesReportRepository.deleteSalesReport(data);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }
}
