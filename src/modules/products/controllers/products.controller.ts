import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { UpdateProductDTO } from '../dtos/update-product.dto';
import { DeleteProductDTO } from '../dtos/delete-product.dto';
import { AuthGuard } from 'src/modules/authentication/guards/authentication.guard';

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
