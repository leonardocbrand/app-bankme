import { faker } from '@faker-js/faker';
import { Assignor } from '@prisma/client';

const assignor: Assignor = {
  id: faker.string.uuid(),
  document: faker.string.numeric(11),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
  deletedAt: faker.date.recent(),
};

const createAssignorDto = {
  name: assignor.name,
  document: assignor.document,
  email: assignor.email,
  phone: assignor.phone,
};

const updateAssignorDto = {
  name: faker.person.fullName(),
  phone: faker.phone.number(),
};

const updatedAssignor = {
  id: assignor.id,
  document: assignor.document,
  name: updateAssignorDto.name,
  email: assignor.email,
  phone: updateAssignorDto.phone,
  createdAt: assignor.createdAt,
  updatedAt: assignor.updatedAt,
  deletedAt: assignor.deletedAt,
};

const deletedAssignor = {
  id: assignor.id,
  document: assignor.document,
  name: updateAssignorDto.name,
  email: assignor.email,
  phone: updateAssignorDto.phone,
  createdAt: assignor.createdAt,
  updatedAt: assignor.updatedAt,
  deletedAt: faker.date.recent(),
};

export const assignorMock = {
  assignor,
  createAssignorDto,
  updateAssignorDto,
  updatedAssignor,
  deletedAssignor,
};
