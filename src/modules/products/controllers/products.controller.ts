import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { UpdateProductDTO } from '../dtos/update-product.dto';
import { DeleteProductDTO } from '../dtos/delete-product.dto';
import { AuthGuard } from 'src/modules/authentication/guards/authentication.guard';
import { SearchProductsDTO } from '../dtos/search-product.dto';
import { GetProductDTO } from '../dtos/get-product';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() data: CreateProductDTO) {
    try {
      return await this.productsService.createProduct(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Get('search')
  async searchProducts(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: SearchProductsDTO,
  ) {
    try {
      return await this.productsService.searchProducts(query);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Get()
  async detailProduct(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: GetProductDTO,
  ) {
    try {
      return await this.productsService.detailProduct(query);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Patch()
  async updateProduct(@Body() data: UpdateProductDTO) {
    try {
      return await this.productsService.updateProduct(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Delete()
  async deleteProduct(@Body() data: DeleteProductDTO) {
    try {
      return await this.productsService.deleteProduct(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
