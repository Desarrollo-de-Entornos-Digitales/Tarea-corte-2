import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from '../../auth/user/user.service';
import { ActivityLogNotFoundException } from '../../common/exceptions';
import { ActivityLog } from '../entities/activity-log.entity';
import { RoutineService } from '../routine/routine.service';

import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { UpdateActivityLogDto } from './dto/update-activity-log.dto';

@Injectable()
export class ActivityLogService {
    constructor(
        @InjectRepository(ActivityLog)
        private readonly activityLogRepository: Repository<ActivityLog>,
        private readonly userService: UserService,
        private readonly routineService: RoutineService,
    ) {}

    async create(createActivityLogDto: CreateActivityLogDto): Promise<ActivityLog> {
        const { userId, routineId, ...data } = createActivityLogDto;
        const [user, routine] = await Promise.all([
            this.userService.findOne(userId),
            this.routineService.findOne(routineId),
        ]);

        const activityLog = this.activityLogRepository.create({ ...data, user, routine });
        return await this.activityLogRepository.save(activityLog);
    }

    async findAll(): Promise<ActivityLog[]> {
        return await this.activityLogRepository.find({
            relations: { user: true, routine: true },
            order: { startedAt: 'DESC' },
        });
    }

    async findOne(id: number): Promise<ActivityLog> {
        const activityLog = await this.activityLogRepository.findOne({
            where: { id },
            relations: { user: true, routine: true, activityExercises: { routineExercise: { exercise: true } } },
        });
        if (!activityLog) {
            throw new ActivityLogNotFoundException(id);
        }
        return activityLog;
    }

    async update(id: number, updateActivityLogDto: UpdateActivityLogDto): Promise<ActivityLog> {
        const { userId, routineId, ...data } = updateActivityLogDto;
        await this.findOne(id);

        const user = userId ? await this.userService.findOne(userId) : undefined;
        const routine = routineId ? await this.routineService.findOne(routineId) : undefined;

        await this.activityLogRepository.save({
            id,
            ...data,
            ...(user ? { user } : {}),
            ...(routine ? { routine } : {}),
        });
        return this.findOne(id);
    }

    async remove(id: number): Promise<{ id: number }> {
        await this.findOne(id);
        await this.activityLogRepository.delete(id);
        return { id };
    }

    async findByUser(userId: number): Promise<ActivityLog[]> {
        return await this.activityLogRepository.find({
            where: { user: { id: userId } },
            relations: { routine: true },
            order: { startedAt: 'DESC' },
        });
    }
}
