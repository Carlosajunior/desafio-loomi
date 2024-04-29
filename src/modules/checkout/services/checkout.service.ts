import { Injectable, NotAcceptableException } from '@nestjs/common';
import { processOrderDTO } from '../dtos/process-order.dto';
import { HttpService } from '@nestjs/axios';
import { PaymentCredentialsDTO } from 'src/modules/payment-service/dtos/payment-credentials.dto';
import { AxiosResponse } from 'axios';
import { OrdersService } from 'src/modules/orders/services/orders.service';
import { Order, OrderItem, OrderStatus } from '@prisma/client';
import { OrderItemsService } from 'src/modules/order-items/services/order-items.service';
import { ProductsService } from 'src/modules/products/services/products.service';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly httpService: HttpService,
    private readonly ordersService: OrdersService,
    private readonly orderItemsService: OrderItemsService,
    private readonly productsService: ProductsService,
  ) {}

  async processOrder(data: processOrderDTO) {
    try {
      const order = (await this.ordersService.detailOrder({
        id: data.orderId,
      })) as unknown as Order;

      if (
        order.orderStatus == OrderStatus.Despachado ||
        order.orderStatus == OrderStatus.Entregue
      )
        return new NotAcceptableException('Esse pedido já foi finalizado.');

      const orderItems = (await this.orderItemsService.listOrderItemsByOrderId({
        orderId: data.orderId,
      })) as unknown as OrderItem[];

      for (const orderItem of orderItems) {
        try {
          const availability =
            await this.productsService.verifyProductAvailability({
              productId: orderItem.productId,
              quantity: orderItem.quantity,
            });

          if (!availability) {
            return new NotAcceptableException(
              'Não há itens suficientes em estoque para atender esse item do pedido.',
            );
          }
        } catch (error) {
          return new NotAcceptableException(error);
        }
      }

      const result = (await this.callPaymentEndpoint({
        cardNumber: data.cardNumber,
        expirationDate: data.expirationDate,
        cvv: data.cvv,
        amount: parseFloat(order.total.toString()),
      })) as unknown as AxiosResponse;

      if (!result.data)
        return new NotAcceptableException('Pagamento não foi aprovado');

      await this.ordersService.updateOrder({
        id: order.id,
        orderStatus: 'Em_preparacao',
      });

      await this.orderItemsService.updateProductsStockQuantity({
        orderId: data.orderId,
      });

      await this.ordersService.updateOrder({
        id: order.id,
        orderStatus: 'Despachado',
      });
      return 'Pagamento foi aprovado e o pedido ja foi despachado';
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async callPaymentEndpoint(data: PaymentCredentialsDTO) {
    try {
      return await this.httpService.axiosRef.post(
        'http://localhost:3000/payment-service/process',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      return new NotAcceptableException(
        'Erro ao chamar o endpoint de pagamento:',
        error,
      );
    }
  }
}
