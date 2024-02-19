import { Module } from '@nestjs/common';
import { PayableService } from './payable.service';
import { PayableController } from './payable.controller';
import { AssignorModule } from '../assignor/assignor.module';
@Module({
  imports: [AssignorModule],
  controllers: [PayableController],
  providers: [PayableService],
})
export class PayableModule {}
