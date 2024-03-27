import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './schemas/create-user.dto';
import { UpdateUserDto } from './schemas/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const users = await this.prisma.user.findMany();

    return users.map((e) => {
      const { password, ...rest } = e;

      return rest;
    });
  }

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      },
    });

    return user;
  }

  async getByLogin(login: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        login,
      },
    });

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    let updateData = data;

    if (data.password) {
      const crypt_password = await bcrypt.hash(data.password, 10);
      updateData = {
        ...data,
        password: crypt_password,
      };
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateData,
    });

    return updatedUser.login;
  }

  async delete(id: string) {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
