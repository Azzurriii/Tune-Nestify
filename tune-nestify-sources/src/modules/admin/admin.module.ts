import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AdminGuard } from '../../common/guards/admin.guard';

@Module({
  imports: [
    JwtModule,
    ConfigModule,
    TypeOrmModule.forFeature([User])
  ],
  providers: [AdminService, AdminGuard],
  controllers: [AdminController],
})
export class AdminModule {}