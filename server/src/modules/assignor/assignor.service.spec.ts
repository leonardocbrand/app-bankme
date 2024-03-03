import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from './assignor.service';
import { assignorMock } from './mocks/assignor.mocks';
import { PrismaService } from '../prisma/prisma.service';

describe('AssignorsService', () => {
  let service: AssignorService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'PrismaService',
          useValue: {
            assignor: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
        PrismaService,
        AssignorService,
      ],
    }).compile();

    service = module.get<AssignorService>(AssignorService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of assignor', async () => {
    jest
      .spyOn(prisma.assignor, 'findMany')
      .mockResolvedValue([assignorMock.assignor]);

    expect(await service.getAll()).toStrictEqual([assignorMock.assignor]);
  });

  it('should return an assignor', async () => {
    jest
      .spyOn(prisma.assignor, 'findUnique')
      .mockResolvedValue(assignorMock.assignor);

    expect(await service.getById(assignorMock.assignor.id)).toStrictEqual(
      assignorMock.assignor,
    );
  });

  it('should return an assignor when trying to find one by Document or Email', async () => {
    jest
      .spyOn(prisma.assignor, 'findFirst')
      .mockResolvedValue(assignorMock.assignor);

    expect(
      await service.getByDocumentOrEmail(assignorMock.createAssignorDto),
    ).toStrictEqual(assignorMock.assignor);
  });

  it('should return an assignor when create one', async () => {
    jest
      .spyOn(prisma.assignor, 'create')
      .mockResolvedValue(assignorMock.assignor);

    expect(await service.create(assignorMock.createAssignorDto)).toStrictEqual(
      assignorMock.assignor,
    );
  });

  it('should return an assignor when update one', async () => {
    jest
      .spyOn(prisma.assignor, 'findUnique')
      .mockResolvedValue(assignorMock.assignor);

    jest
      .spyOn(prisma.assignor, 'update')
      .mockResolvedValue(assignorMock.updatedAssignor);

    expect(
      await service.update(
        assignorMock.assignor.id,
        assignorMock.updateAssignorDto,
      ),
    ).toStrictEqual(assignorMock.updatedAssignor);
  });

  it('should delete an assignor', async () => {
    jest
      .spyOn(prisma.assignor, 'update')
      .mockResolvedValue(assignorMock.deletedAssignor);

    await expect(
      service.delete(assignorMock.assignor.id),
    ).resolves.not.toThrow();
  });
});
