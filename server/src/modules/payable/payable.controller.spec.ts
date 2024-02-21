import { Test, TestingModule } from '@nestjs/testing';
import { AssignorService } from '../assignor/assignor.service';
import { PrismaService } from '../prisma/prisma.service';
import { PayableController } from './payable.controller';
import { PayableService } from './payable.service';
import { assignorMock } from '../assignor/mocks/assignor.mocks';
import { payablesMocks } from './mocks/payables.mocks';
import { NotFoundException } from '@nestjs/common';

describe('PayablesController', () => {
  let controller: PayableController;
  let service: PayableService;
  let assignorService: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayableController],
      providers: [PayableService, AssignorService, PrismaService],
    }).compile();

    controller = module.get<PayableController>(PayableController);
    service = module.get<PayableService>(PayableService);
    assignorService = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of payable', async () => {
    jest.spyOn(service, 'getAll').mockResolvedValue([payablesMocks.payable]);

    expect(await controller.getAll()).toStrictEqual([payablesMocks.payable]);
  });

  it('should return a payable', async () => {
    jest.spyOn(service, 'getById').mockResolvedValue(payablesMocks.payable);

    expect(await controller.getById(payablesMocks.payable.id)).toBe(
      payablesMocks.payable,
    );
  });

  it('should return a not found exception', async () => {
    jest.spyOn(service, 'getById').mockResolvedValue(null);

    await expect(controller.getById(payablesMocks.payable.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should create a payable', async () => {
    jest
      .spyOn(assignorService, 'getById')
      .mockResolvedValue(assignorMock.assignor);

    jest.spyOn(service, 'create').mockResolvedValue(payablesMocks.payable);

    expect(await controller.create(payablesMocks.createPayableDto)).toBe(
      payablesMocks.payable,
    );
  });

  it('should return a not found exception when trying to create a payable with a non exist assignor', async () => {
    jest.spyOn(assignorService, 'getById').mockResolvedValue(null);

    await expect(
      controller.create(payablesMocks.createPayableDto),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return a not found exception when trying to update a payable with a non exist id', async () => {
    jest.spyOn(service, 'getById').mockResolvedValue(null);

    await expect(
      controller.update(
        payablesMocks.payable.id,
        payablesMocks.updatePayableDto,
      ),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return a not found exception when trying to update a payable with a non exist assignor', async () => {
    jest.spyOn(service, 'getById').mockResolvedValue(payablesMocks.payable);
    jest.spyOn(assignorService, 'getById').mockResolvedValue(null);

    await expect(
      controller.update(
        payablesMocks.payable.id,
        payablesMocks.updatePayableDto,
      ),
    ).rejects.toThrow(NotFoundException);
  });

  it('should update a payable', async () => {
    jest.spyOn(service, 'getById').mockResolvedValue(payablesMocks.payable);
    jest
      .spyOn(assignorService, 'getById')
      .mockResolvedValue(assignorMock.assignor);
    jest
      .spyOn(service, 'update')
      .mockResolvedValue(payablesMocks.updatedPayable);

    expect(
      await controller.update(
        payablesMocks.payable.id,
        payablesMocks.updatePayableDto,
      ),
    ).toStrictEqual(payablesMocks.updatedPayable);
  });

  it('should return a not found exception when trying to delete a payable with non exist id', async () => {
    jest.spyOn(service, 'getById').mockResolvedValue(null);

    await expect(controller.delete(payablesMocks.payable.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should delete a payable', async () => {
    jest.spyOn(service, 'getById').mockResolvedValue(payablesMocks.payable);
    jest.spyOn(service, 'delete').mockResolvedValue();

    await expect(
      controller.delete(payablesMocks.payable.id),
    ).resolves.not.toThrow();
  });
});
