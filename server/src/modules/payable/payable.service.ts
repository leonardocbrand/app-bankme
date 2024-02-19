import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePayableDto } from './schemas/createPayableSchema';
import { UpdatePayableDto } from './schemas/updatePayableSchema';

@Injectable()
export class PayableService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const payables = await this.prisma.payable.findMany({
      where: {
        deletedAt: null,
      },
    });

    if (!payables) {
      return [];
    }

    return payables;
  }

  async getById(id: string) {
    const payable = await this.prisma.payable.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });

    return payable;
  }

  async create(data: CreatePayableDto) {
    const payable = await this.prisma.payable.create({ data });

    return payable;
  }

  async update(id: string, data: UpdatePayableDto) {
    const updatedPayable = await this.prisma.payable.update({
      where: { id },
      data,
    });

    return updatedPayable;
  }

  async delete(id: string) {
    await this.prisma.payable.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
