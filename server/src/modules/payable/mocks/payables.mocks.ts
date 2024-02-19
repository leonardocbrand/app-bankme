import { faker } from '@faker-js/faker';
import { Payable } from '@prisma/client';

const payable: Payable = {
  id: faker.string.uuid(),
  value: faker.number.float(),
  emissionDate: faker.date.recent(),
  assignorId: faker.string.uuid(),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
  deletedAt: null,
};

const createPayableDto = {
  value: payable.value,
  assignorId: payable.assignorId,
  emissionDate: String(payable.emissionDate),
};

const updatePayableDto = {
  value: faker.number.float(),
  assignorId: faker.string.uuid(),
};

export const payablesMocks = {
  payable,
  createPayableDto,
  updatePayableDto,
};
