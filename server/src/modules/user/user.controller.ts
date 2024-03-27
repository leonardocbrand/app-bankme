import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, createUserSchema } from './schemas/create-user.dto';
import { UpdateUserDto, updateUserSchema } from './schemas/update-user.dto';
import { ZodValidationPipe } from 'src/pipes/zodValidation.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() createUserDto: CreateUserDto) {
    const validateLogin = await this.userService.getByLogin(
      createUserDto.login,
    );

    if (validateLogin) {
      throw new BadRequestException('Login already registered');
    }

    const { id, login } = await this.userService.create(createUserDto);

    return { id, login };
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateUserSchema))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const validateUser = await this.userService.getById(id);

    if (!validateUser) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.login) {
      const validateLogin = await this.userService.getByLogin(
        updateUserDto.login,
      );

      if (validateLogin) {
        throw new BadRequestException('Login already registered');
      }
    }

    const updatedUser = await this.userService.update(id, updateUserDto);

    return updatedUser;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const validateUser = await this.userService.getById(id);

    if (!validateUser) {
      throw new NotFoundException('User not found');
    }

    await this.userService.delete(id);
  }
}
