import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';
import { PrismaService } from '../prisma/prisma.service';
import { assignorMock } from './mocks/assignor.mocks';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AssignorsController', () => {
  let controller: AssignorController;
  let service: AssignorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [AssignorService, PrismaService],
    }).compile();

    controller = module.get<AssignorController>(AssignorController);
    service = module.get<AssignorService>(AssignorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of assignors', async () => {
    jest.spyOn(service, 'getAll').mockResolvedValue([assignorMock.assignor]);

    expect(await controller.findAll()).toStrictEqual([assignorMock.assignor]);
  });

  it('should return an error when there is no assignor', async () => {
    jest.spyOn(service, 'getById').mockResolvedValue(null);

    await expect(controller.findById(assignorMock.assignor.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return an assignor', async () => {
    jest.spyOn(service, 'getById').mockResolvedValue(assignorMock.assignor);

    expect(await controller.findById(assignorMock.assignor.id)).toStrictEqual(
      assignorMock.assignor,
    );
  });

  it('should return an error when trying to create an assignor with a existing document or email', async () => {
    jest
      .spyOn(service, 'getByDocumentOrEmail')
      .mockResolvedValue(assignorMock.assignor);
    await expect(
      controller.create(assignorMock.createAssignorDto),
    ).rejects.toThrow(BadRequestException);
  });

  it('should create an assignor', async () => {
    jest.spyOn(service, 'getByDocumentOrEmail').mockResolvedValue(null);
    jest.spyOn(service, 'create').mockResolvedValue(assignorMock.assignor);

    expect(
      await controller.create(assignorMock.createAssignorDto),
    ).toStrictEqual(assignorMock.assignor);
  });

  it('should return an error when trying to update a non existing assignor', async () => {
    jest.spyOn(service, 'getById').mockResolvedValue(null);

    await expect(
      controller.update(
        assignorMock.assignor.id,
        assignorMock.updateAssignorDto,
      ),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return an error when trying to update an assignor with a document or email that already exists', async () => {
    jest.spyOn(service, 'getById').mockResolvedValue(assignorMock.assignor);
    jest
      .spyOn(service, 'getByDocumentOrEmail')
      .mockResolvedValue(assignorMock.assignor);

    await expect(
      controller.update(
        assignorMock.assignor.id,
        assignorMock.updateAssignorDto,
      ),
    ).rejects.toThrow(BadRequestException);
  });

  it('should update an assignor', async () => {
    jest.spyOn(service, 'getById').mockResolvedValue(assignorMock.assignor);
    jest.spyOn(service, 'getByDocumentOrEmail').mockResolvedValue(null);
    jest
      .spyOn(service, 'update')
      .mockResolvedValue(assignorMock.updatedAssignor);

    expect(
      await controller.update(
        assignorMock.assignor.id,
        assignorMock.updateAssignorDto,
      ),
    ).toStrictEqual(assignorMock.updatedAssignor);
  });

  it('should return an error when trying to delete a non existing assignor', async () => {
    jest.spyOn(service, 'getById').mockResolvedValue(null);

    await expect(controller.delete(assignorMock.assignor.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should delete an assignor', async () => {
    jest.spyOn(service, 'getById').mockResolvedValue(assignorMock.assignor);
    jest.spyOn(service, 'delete').mockResolvedValue();

    await expect(
      controller.delete(assignorMock.assignor.id),
    ).resolves.not.toThrow();
  });
});
