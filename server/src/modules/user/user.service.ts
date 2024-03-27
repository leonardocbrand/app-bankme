import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './schemas/create-user.dto';
import { UpdateUserDto } from './schemas/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private primsa: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.primsa.user.create({
      data: {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      },
    });

    return user;
  }

  async getAll() {
    const users = await this.primsa.user.findMany();

    return users;
  }

  async getById(id: string) {
    const user = await this.primsa.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async getByLogin(login: string) {
    const user = await this.primsa.user.findUnique({
      where: {
        login,
      },
    });

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const updatedUser = await this.primsa.user.update({
      where: {
        id,
      },
      data,
    });

    return updatedUser.login;
  }

  async delete(id: string) {
    await this.primsa.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
