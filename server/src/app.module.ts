import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule as PrismaGlobalModule } from './modules/prisma/prisma.module';
import { PayableModule } from './modules/payable/payable.module';
import { AssignorModule } from './modules/assignor/assignor.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaGlobalModule,
    PayableModule,
    AssignorModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
