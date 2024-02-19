import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignorDto } from './schemas/createAssignorSchema';
import { UpdateAssignorDto } from './schemas/updateAssignorSchema';

@Injectable()
export class AssignorService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const assignors = await this.prisma.assignor.findMany({
      where: {
        deletedAt: null,
      },
    });

    if (!assignors) {
      return [];
    }

    return assignors;
  }

  async getById(id: string) {
    const assignor = await this.prisma.assignor.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });

    return assignor;
  }

  async getByDocumentOrEmail(data: CreateAssignorDto | UpdateAssignorDto) {
    const assignor = await this.prisma.assignor.findFirst({
      where: {
        OR: [{ document: data.document }, { email: data.email }],
      },
    });

    return assignor;
  }

  async create(data: CreateAssignorDto) {
    const assignor = await this.prisma.assignor.create({ data });

    return assignor;
  }

  async update(id: string, data: UpdateAssignorDto) {
    const updatedAssignor = await this.prisma.assignor.update({
      where: { id },
      data,
    });

    return updatedAssignor;
  }

  async delete(id: string) {
    await this.prisma.assignor.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
