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

export const assignorMock = {
  assignor,
};
