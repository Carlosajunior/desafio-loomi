import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { ProductsRepository } from './repositories/products.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, JwtService, ProductsRepository],
})
export class ProductsModule {}
