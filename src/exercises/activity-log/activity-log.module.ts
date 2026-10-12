import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../../auth/user/user.module';
import { ActivityLog } from '../entities/activity-log.entity';
import { RoutineModule } from '../routine/routine.module';

import { ActivityLogController } from './activity-log.controller';
import { ActivityLogService } from './activity-log.service';

@Module({
    imports: [TypeOrmModule.forFeature([ActivityLog]), UserModule, RoutineModule],
    controllers: [ActivityLogController],
    providers: [ActivityLogService],
    exports: [ActivityLogService],
})
export class ActivityLogModule {}
