import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../../auth/user/user.module';
import { Routine } from '../entities/routine.entity';

import { RoutineController } from './routine.controller';
import { RoutineService } from './routine.service';

@Module({
    imports: [TypeOrmModule.forFeature([Routine]), UserModule],
    controllers: [RoutineController],
    providers: [RoutineService],
    exports: [RoutineService],
})
export class RoutineModule {}
