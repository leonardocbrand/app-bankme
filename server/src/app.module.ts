import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule as PrismaGlobalModule } from './modules/prisma/prisma.module';
import { PayableModule } from './modules/payable/payable.module';
import { AssignorModule } from './modules/assignor/assignor.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaGlobalModule,
    PayableModule,
    AssignorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
