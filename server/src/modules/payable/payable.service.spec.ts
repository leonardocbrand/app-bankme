import { Test, TestingModule } from '@nestjs/testing';
import { PayableService } from './payable.service';
import { PrismaService } from '../prisma/prisma.service';
import { payablesMocks } from './mocks/payables.mocks';

describe('PayablesService', () => {
  let service: PayableService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'PrismaService',
          useValue: {
            payable: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        PrismaService,
        PayableService,
      ],
    }).compile();

    service = module.get<PayableService>(PayableService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of payables', async () => {
    jest
      .spyOn(prisma.payable, 'findMany')
      .mockResolvedValue([payablesMocks.payable]);

    expect(await service.getAll()).toStrictEqual([payablesMocks.payable]);
  });

  it('should return a payable', async () => {
    jest
      .spyOn(prisma.payable, 'findUnique')
      .mockResolvedValue(payablesMocks.payable);

    expect(await service.getById(payablesMocks.payable.id)).toStrictEqual(
      payablesMocks.payable,
    );
  });

  it('should create a payable', async () => {
    jest
      .spyOn(prisma.payable, 'create')
      .mockResolvedValue(payablesMocks.payable);

    expect(await service.create(payablesMocks.createPayableDto)).toStrictEqual(
      payablesMocks.payable,
    );
  });

  it('should update a payable', async () => {
    jest
      .spyOn(prisma.payable, 'findUnique')
      .mockResolvedValue(payablesMocks.payable);

    jest
      .spyOn(prisma.payable, 'update')
      .mockResolvedValue(payablesMocks.payable);

    expect(
      await service.update(
        payablesMocks.payable.id,
        payablesMocks.updatePayableDto,
      ),
    ).toStrictEqual(payablesMocks.payable);
  });

  it('should delete a payable', async () => {
    jest
      .spyOn(prisma.payable, 'update')
      .mockResolvedValue(payablesMocks.payable);

    await expect(
      service.delete(payablesMocks.payable.id),
    ).resolves.not.toThrow();
  });
});
