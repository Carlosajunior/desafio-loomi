import { NotAcceptableException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { UpdateProductDTO } from '../dtos/update-product.dto';
import { DeleteProductDTO } from '../dtos/delete-product.dto';

export class ProductsRepository {
  prisma = new PrismaClient();

  async createProduct(data: CreateProductDTO) {
    try {
      return await this.prisma.product.create({ data: { ...data } });
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
