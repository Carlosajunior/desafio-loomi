import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { UpdateProductDTO } from '../dtos/update-product.dto';
import { DeleteProductDTO } from '../dtos/delete-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async createProduct(data: CreateProductDTO) {
    try {
      return await this.productsRepository.createProduct(data);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async updateProduct(data: UpdateProductDTO) {
    try {
      return await this.productsRepository.updateProduct(data);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async deleteProduct(data: DeleteProductDTO) {
    try {
      return await this.productsRepository.deleteProduct(data);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }
}
