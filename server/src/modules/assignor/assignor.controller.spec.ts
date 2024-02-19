import { Test, TestingModule } from '@nestjs/testing';
import { AssignorController } from './assignor.controller';
import { AssignorService } from './assignor.service';

describe('AssignorsController', () => {
  let controller: AssignorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignorController],
      providers: [AssignorService],
    }).compile();

    controller = module.get<AssignorController>(AssignorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
