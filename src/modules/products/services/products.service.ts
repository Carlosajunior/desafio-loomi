import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { UpdateProductDTO } from '../dtos/update-product.dto';
import { DeleteProductDTO } from '../dtos/delete-product.dto';
import { SearchProductsDTO } from '../dtos/search-product.dto';
import { GetProductDTO } from '../dtos/get-product';

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

  async detailProduct(data: GetProductDTO) {
    try {
      return await this.productsRepository.detailProduct(data);
    } catch (error) {
      return new NotAcceptableException(error);
    }
  }

  async searchProducts(data: SearchProductsDTO) {
    try {
      let productsSQLQuery = `SELECT * FROM "Product"`;
      const conditions: string[] = [];

      if (data.name)
        conditions.push(`LOWER("name") LIKE LOWER('${data.name}%')`);
      if (data.description)
        conditions.push(
          `LOWER("description") LIKE LOWER('${data.description}%')`,
        );
      else if (data.price) conditions.push(`"price" = ${data.price}`);
      if (data.stockQuantity)
        conditions.push(`"stockQuantity" = ${data.stockQuantity}`);
      if (data.date_start && data.date_end)
        conditions.push(
          `"created_at" BETWEEN '${data.date_start}' AND '${data.date_end}'`,
        );
      if (conditions.length > 0) {
        productsSQLQuery += ' WHERE ' + conditions.join(' AND ');
      }

      productsSQLQuery =
        productsSQLQuery +
        ` LIMIT ${data.records_per_page} OFFSET ${(data.page - 1) * data.records_per_page}`;

      return await this.productsRepository.listProducts(productsSQLQuery);
    } catch (error) {
      return new NotFoundException(error);
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
