import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { simpleFaker, faker } from '@faker-js/faker';
import { ProductsService } from './products.service';
import { ProductsRepository } from '../repositories/products.repository';
import { CreateProductDTO } from '../dtos/create-product.dto';
import { GetProductDTO } from '../dtos/get-product';
import { SearchProductsDTO } from '../dtos/search-product.dto';
import { UpdateProductDTO } from '../dtos/update-product.dto';
import { DeleteProductDTO } from '../dtos/delete-product.dto';

describe('service', () => {
  let service: ProductsService;
  let productsRepository: ProductsRepository;

  const mockProductsRepository = () => ({});

  const mockProduct = {
    id: simpleFaker.string.uuid(),
    name: faker.person.firstName(),
    description: faker.string.sample(),
    price: faker.number.int(),
    stockQuantity: faker.number.int(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: ProductsRepository, useFactory: mockProductsRepository },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productsRepository = module.get<ProductsRepository>(ProductsRepository);
  });

  describe('createUser', () => {
    const data: CreateProductDTO = {
      name: faker.person.firstName(),
      description: faker.string.sample(),
      price: faker.number.int(),
      stockQuantity: faker.number.int(),
    };

    it('should create a product', async () => {
      productsRepository.createProduct = jest
        .fn()
        .mockResolvedValue(mockProduct);

      const result = await service.createProduct(data);
      expect(result).toEqual(mockProduct);
    });

    it('should handle error and return NotAcceptableException', async () => {
      const mockError = new Error('Error message');
      productsRepository.createProduct = jest.fn().mockRejectedValue(mockError);

      const result = await service.createProduct(data);
      expect(result).toBeInstanceOf(NotAcceptableException);
    });
  });

  describe('detailProduct', () => {
    const data: GetProductDTO = {
      id: simpleFaker.string.uuid(),
    };

    it('should return a product', async () => {
      productsRepository.detailProduct = jest
        .fn()
        .mockResolvedValue(mockProduct);

      const result = await service.detailProduct(data);
      expect(result).toEqual(mockProduct);
    });

    it('should handle error and return NotFoundException', async () => {
      const mockError = new Error('Error message');
      productsRepository.detailProduct = jest.fn().mockRejectedValue(mockError);

      const result = await service.detailProduct(data);
      expect(result).toBeInstanceOf(NotAcceptableException);
    });
  });

  describe('searchProducts', () => {
    const data: SearchProductsDTO = {
      page: faker.number.int(),
      records_per_page: faker.number.int(),
    };

    it('should search products', async () => {
      productsRepository.listProducts = jest
        .fn()
        .mockResolvedValue({ products: [mockProduct] });

      const result = await service.searchProducts(data);
      expect(result).toEqual({ products: [mockProduct] });
    });

    it('should handle error and return NotFoundException', async () => {
      const mockError = new Error('Error message');
      productsRepository.listProducts = jest.fn().mockRejectedValue(mockError);

      const result = await service.searchProducts(data);
      expect(result).toBeInstanceOf(NotFoundException);
    });
  });

  describe('updateProducts', () => {
    const data: UpdateProductDTO = {
      id: simpleFaker.string.uuid(),
      name: faker.person.firstName(),
    };

    it('should update product', async () => {
      productsRepository.updateProduct = jest
        .fn()
        .mockResolvedValue(mockProduct);

      const result = await service.updateProduct(data);
      expect(result).toEqual(mockProduct);
    });

    it('should handle error and return NotAcceptableException', async () => {
      const mockError = new Error('Error message');
      productsRepository.updateProduct = jest.fn().mockRejectedValue(mockError);

      const result = await service.updateProduct(data);
      expect(result).toBeInstanceOf(NotAcceptableException);
    });
  });

  describe('deleteProduct', () => {
    const data: DeleteProductDTO = {
      id: simpleFaker.string.uuid(),
    };

    it('should delete product', async () => {
      productsRepository.deleteProduct = jest
        .fn()
        .mockResolvedValue(mockProduct);
      const result = await service.deleteProduct(data);
      expect(result).toEqual(mockProduct);
    });

    it('should handle error and return NotAcceptableException', async () => {
      const mockError = new Error('Error message');
      productsRepository.deleteProduct = jest.fn().mockRejectedValue(mockError);

      const result = await service.deleteProduct(data);
      expect(result).toBeInstanceOf(NotAcceptableException);
    });
  });
});
