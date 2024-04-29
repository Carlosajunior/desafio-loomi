import { NotAcceptableException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { simpleFaker, faker } from '@faker-js/faker';
import { SalesReportService } from './sales-report.service';
import { SalesReportRepository } from '../repositories/sales-report.repository';
import { AwsS3Service } from '../../aws-s3/services/aws-s3.services';
import { CreateSalesReportDTO } from '../dto/create-sales-report.dto';

describe('service', () => {
  let service: SalesReportService;
  let salesReportRepository: SalesReportRepository;
  let awsS3Service: AwsS3Service;
  const mockSalesReportRepository = () => ({});
  const mockAwsS3Service = () => ({});
  const mockSalesReport = {
    nomedoproduto: faker.word.words(),
    preçodoproduto: faker.number.float(),
    quantidadevendida: faker.number.bigInt(),
    totaldevendas: faker.number.bigInt(),
    valortotaldevendas: faker.number.float(),
  };

  const mockSalesReportDB = {
    id: simpleFaker.string.uuid(),
    period: faker.date.anytime().toDateString(),
    salesTotal: faker.number.int(),
    soldProducts: faker.number.int(),
    filePath: faker.internet.url(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SalesReportService,
        {
          provide: SalesReportRepository,
          useFactory: mockSalesReportRepository,
        },
        { provide: AwsS3Service, useFactory: mockAwsS3Service },
      ],
    }).compile();

    service = module.get<SalesReportService>(SalesReportService);
    salesReportRepository = module.get<SalesReportRepository>(
      SalesReportRepository,
    );
    awsS3Service = module.get<AwsS3Service>(AwsS3Service);
  });

  describe('createSalesReport', () => {
    const data: CreateSalesReportDTO = {
      date_end: faker.date.anytime().toDateString(),
      date_start: faker.date.anytime().toDateString(),
    };

    it('should create a sales report, after retrieving all the data and parsing to a CSV an upload to S3', async () => {
      salesReportRepository.generateSalesReport = jest
        .fn()
        .mockResolvedValue([mockSalesReport]);
      service.writeSalesReportOnCSV = jest
        .fn()
        .mockResolvedValue(Buffer.from(faker.string.sample()));
      awsS3Service.uploadFileToS3 = jest
        .fn()
        .mockResolvedValue(faker.internet.url());
      salesReportRepository.createSalesReport = jest
        .fn()
        .mockResolvedValue(mockSalesReportDB);

      const result = await service.createSalesReport(data);
      expect(result).toEqual(mockSalesReportDB);
    });

    it('should handle error and return NotAcceptableException', async () => {
      const mockError = new Error('Error message');
      salesReportRepository.createSalesReport = jest
        .fn()
        .mockRejectedValue(mockError);

      const result = await service.createSalesReport(data);
      expect(result).toBeInstanceOf(NotAcceptableException);
    });
  });
});
