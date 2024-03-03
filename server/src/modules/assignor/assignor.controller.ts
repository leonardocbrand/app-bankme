import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AssignorService } from './assignor.service';
import {
  CreateAssignorDto,
  createAssignorSchema,
} from './schemas/createAssignorSchema';
import { ZodValidationPipe } from '../../pipes/zodValidation.pipe';
import {
  UpdateAssignorDto,
  updateAssignorSchema,
} from './schemas/updateAssignorSchema';

@Controller('integrations/assignor')
export class AssignorController {
  constructor(private readonly assignorService: AssignorService) {}

  @Get()
  async findAll() {
    const assignors = await this.assignorService.getAll();

    return assignors;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const assignor = await this.assignorService.getById(id);

    if (!assignor) {
      throw new NotFoundException('Assignor not found');
    }

    return assignor;
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createAssignorSchema))
  async create(@Body() data: CreateAssignorDto) {
    const validateAssignor =
      await this.assignorService.getByDocumentOrEmail(data);

    if (validateAssignor) {
      throw new BadRequestException(
        'This document or email already has been taken',
      );
    }

    const assignor = await this.assignorService.create(data);

    return assignor;
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateAssignorSchema))
  async update(@Param('id') id: string, @Body() data: UpdateAssignorDto) {
    const assignorExists = await this.assignorService.getById(id);

    if (!assignorExists) {
      throw new BadRequestException('Assignor not found');
    }

    if (data.document || data.email) {
      const validateAssignor =
        await this.assignorService.getByDocumentOrEmail(data);

      if (validateAssignor) {
        throw new BadRequestException(
          'This document or email already has been taken',
        );
      }
    }

    const updatedAssignor = await this.assignorService.update(id, data);

    return updatedAssignor;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const validateAssignor = await this.assignorService.getById(id);

    if (!validateAssignor) {
      throw new NotFoundException('Assignor not found');
    }

    await this.assignorService.delete(id);
  }
}
