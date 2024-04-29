import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { UpdateProductDTO } from '../dtos/update-product.dto';
import { DeleteProductDTO } from '../dtos/delete-product.dto';
import { SearchProductsDTO } from '../dtos/search-product.dto';
import { GetProductDTO } from '../dtos/get-product';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: `Endpoint accesible to administrators only, to create a new product, returning it's data.`,
  })
  @Post()
  async createProduct(@Body() data: CreateProductDTO) {
    try {
      return await this.productsService.createProduct(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @ApiOperation({
    summary: `Endpoint accesible to administrators only, to make a search for products, that's paginated and can receive some of his properties to be used as filters on that search.`,
  })
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

  @ApiOperation({
    summary: `Endpoint accesible to administrators only, retrive a product's data given it's Id.`,
  })
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

  @ApiOperation({
    summary: `Endpoint accesible to administrators only, to update one or more product's properties given the new value of the property to be updated, returning the product's data updated.`,
  })
  @Patch()
  async updateProduct(@Body() data: UpdateProductDTO) {
    try {
      return await this.productsService.updateProduct(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @ApiOperation({
    summary: `Endpoint accesible to administrators only, to remove a product's data from the database.`,
  })
  @Delete()
  async deleteProduct(@Body() data: DeleteProductDTO) {
    try {
      return await this.productsService.deleteProduct(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
