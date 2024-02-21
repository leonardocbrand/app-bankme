import {
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
import { PayableService } from './payable.service';

import { ZodValidationPipe } from '../../pipes/zodValidation.pipe';
import { AssignorService } from '../assignor/assignor.service';
import {
  createPayableSchema,
  CreatePayableDto,
} from './schemas/createPayableSchema';
import {
  updatePayableSchema,
  UpdatePayableDto,
} from './schemas/updatePayableSchema';

@Controller('integrations/payable')
export class PayableController {
  constructor(
    private readonly payableService: PayableService,
    private readonly assignorService: AssignorService,
  ) {}

  @Get()
  async getAll() {
    const payables = await this.payableService.getAll();

    return payables;
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const payable = await this.payableService.getById(id);

    if (!payable) {
      throw new NotFoundException('Payable not found');
    }

    return payable;
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createPayableSchema))
  async create(@Body() data: CreatePayableDto) {
    const assignorExists = await this.assignorService.getById(data.assignorId);

    if (!assignorExists) {
      throw new NotFoundException('Assignor not found');
    }

    const payable = await this.payableService.create({
      ...data,
      emissionDate: new Date(data.emissionDate).toISOString(),
    });

    return payable;
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updatePayableSchema))
  async update(@Param('id') id: string, @Body() data: UpdatePayableDto) {
    const payableExists = await this.payableService.getById(id);

    if (!payableExists) {
      throw new NotFoundException('Payable not found');
    }

    if (data.assignorId) {
      const assignorExists = await this.assignorService.getById(
        data.assignorId,
      );

      if (!assignorExists) {
        throw new NotFoundException('Assignor not found');
      }
    }

    const updatedPayable = await this.payableService.update(id, data);

    return updatedPayable;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const payableExists = await this.payableService.getById(id);

    if (!payableExists) {
      throw new NotFoundException('Payable not found');
    }

    await this.payableService.delete(id);
  }
}
