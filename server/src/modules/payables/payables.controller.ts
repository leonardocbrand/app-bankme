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
import { PayablesService } from './payables.service';
import { Payable as PayableModel } from '@prisma/client';
import {
  CreatePayableDto,
  createPayableSchema,
} from '../schemas/createPayableSchema';
import { ZodValidationPipe } from 'src/pipes/zodValidation.pipe';
import { AssignorsService } from '../assignors/assignors.service';
import {
  UpdatePayableDto,
  updatePayableSchema,
} from '../schemas/updatePayableSchema';

@Controller('integrations/payable')
export class PayablesController {
  constructor(
    private readonly payablesService: PayablesService,
    private readonly assignorsService: AssignorsService,
  ) {}

  @Get()
  async getAll() {
    const payables = await this.payablesService.getAll();

    return payables;
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const payable = await this.payablesService.getById(id);

    if (!payable) {
      throw new NotFoundException('Payable not found');
    }

    return payable;
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createPayableSchema))
  async create(@Body() data: CreatePayableDto): Promise<PayableModel> {
    const assignorExists = this.assignorsService.getById(data.assignorId);

    if (!assignorExists) {
      throw new BadRequestException('Assignor not found');
    }

    const payable = await this.payablesService.create(data as any);

    return payable;
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updatePayableSchema))
  async update(@Param('id') id: string, @Body() data: UpdatePayableDto) {
    const payableExists = await this.payablesService.getById(id);

    if (!payableExists) {
      throw new NotFoundException('Payable not found');
    }

    if (data.assignorId) {
      const assignorExists = this.assignorsService.getById(data.assignorId);

      if (!assignorExists) {
        throw new BadRequestException('Assignor not found');
      }
    }

    const updatedPayable = await this.payablesService.update(id, data);

    return updatedPayable;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    const payableExists = await this.payablesService.getById(id);

    if (!payableExists) {
      throw new NotFoundException('Payable not found');
    }

    await this.payablesService.delete(id);
  }
}
