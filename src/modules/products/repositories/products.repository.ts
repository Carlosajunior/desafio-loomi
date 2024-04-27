import { NotAcceptableException } from '@nestjs/common';
import { PrismaClient, Product } from '@prisma/client';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { UpdateProductDTO } from '../dtos/update-product.dto';
import { DeleteProductDTO } from '../dtos/delete-product.dto';
import { GetProductDTO } from '../dtos/get-product';

export class ProductsRepository {
  prisma = new PrismaClient();

  async createProduct(data: CreateProductDTO) {
    try {
      return await this.prisma.product.create({ data: { ...data } });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async listProducts(productsSQLQuery: string) {
    try {
      const products =
        await this.prisma.$queryRawUnsafe<Product[]>(productsSQLQuery);
      return { products };
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async detailProduct(data: GetProductDTO) {
    try {
      return await this.prisma.product.findUnique({ where: { id: data.id } });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async updateProduct(data: UpdateProductDTO) {
    try {
      const { id, ...parameters } = data;
      return await this.prisma.product.update({
        where: {
          id: id,
        },
        data: { ...parameters },
      });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async deleteProduct(data: DeleteProductDTO) {
    try {
      return await this.prisma.product.delete({ where: { id: data.id } });
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }
}
