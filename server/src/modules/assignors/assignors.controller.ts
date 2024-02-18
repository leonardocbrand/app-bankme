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
import { AssignorsService } from './assignors.service';
import {
  CreateAssignorDto,
  createAssignorSchema,
} from '../schemas/createAssignorSchema';
import { ZodValidationPipe } from 'src/pipes/zodValidation.pipe';
import {
  UpdateAssignorDto,
  updateAssignorSchema,
} from '../schemas/updateAssignorSchema';

@Controller('integrations/assignor')
export class AssignorsController {
  constructor(private readonly assignorsService: AssignorsService) {}

  @Get()
  async findAll() {
    const assignors = await this.assignorsService.getAll();

    return assignors;
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const assignor = await this.assignorsService.getById(id);

    if (!assignor) {
      throw new NotFoundException('Assignor not found');
    }

    return assignor;
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createAssignorSchema))
  async create(@Body() data: CreateAssignorDto) {
    const validateAssignor =
      await this.assignorsService.getByDocumentOrEmail(data);

    if (validateAssignor) {
      throw new BadRequestException(
        'This document or email already has been taken',
      );
    }

    const assignor = await this.assignorsService.create(data);

    return assignor;
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateAssignorSchema))
  async update(@Param('id') id: string, @Body() data: UpdateAssignorDto) {
    const assignorExists = await this.assignorsService.getById(id);

    if (!assignorExists) {
      throw new BadRequestException('Assignor not found');
    }

    if (data.document || data.email) {
      const validateAssignor =
        await this.assignorsService.getByDocumentOrEmail(data);

      if (validateAssignor) {
        throw new BadRequestException(
          'This document or email already has been taken',
        );
      }
    }

    const updatedAssignor = await this.assignorsService.update(id, data);

    return updatedAssignor;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const validateAssignor = await this.assignorsService.getById(id);

    if (!validateAssignor) {
      throw new NotFoundException('Assignor not found');
    }

    await this.assignorsService.delete(id);
  }
}
