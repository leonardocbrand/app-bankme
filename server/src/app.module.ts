import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule as PrismaGlobalModule } from './modules/prisma/prisma.module';
import { PayablesModule } from './modules/payables/payables.module';
import { AssignorsModule } from './modules/assignors/assignors.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaGlobalModule,
    PayablesModule,
    AssignorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
