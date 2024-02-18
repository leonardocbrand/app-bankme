import { Module } from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import { AssignorsController } from './assignors.controller';

@Module({
  controllers: [AssignorsController],
  providers: [AssignorsService],
  exports: [AssignorsService],
})
export class AssignorsModule {}
