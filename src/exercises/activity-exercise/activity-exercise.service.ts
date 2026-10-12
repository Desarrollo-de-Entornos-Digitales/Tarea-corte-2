import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActivityExerciseNotFoundException } from '../../common/exceptions';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { ActivityExercise } from '../entities/activity-exercise.entity';
import { RoutineExerciseService } from '../routine-exercise/routine-exercise.service';

import { CreateActivityExerciseDto } from './dto/create-activity-exercise.dto';
import { UpdateActivityExerciseDto } from './dto/update-activity-exercise.dto';

@Injectable()
export class ActivityExerciseService {
    constructor(
        @InjectRepository(ActivityExercise)
        private readonly activityExerciseRepository: Repository<ActivityExercise>,
        private readonly activityLogService: ActivityLogService,
        private readonly routineExerciseService: RoutineExerciseService,
    ) {}

    async create(createActivityExerciseDto: CreateActivityExerciseDto): Promise<ActivityExercise> {
        const { activityLogId, routineExerciseId, ...data } = createActivityExerciseDto;
        const [activityLog, routineExercise] = await Promise.all([
            this.activityLogService.findOne(activityLogId),
            this.routineExerciseService.findOne(routineExerciseId),
        ]);

        const activityExercise = this.activityExerciseRepository.create({ ...data, activityLog, routineExercise });
        return await this.activityExerciseRepository.save(activityExercise);
    }

    async findAll(): Promise<ActivityExercise[]> {
        return await this.activityExerciseRepository.find({
            relations: { activityLog: true, routineExercise: { exercise: true } },
            order: { startedAt: 'DESC' },
        });
    }

    async findOne(id: number): Promise<ActivityExercise> {
        const activityExercise = await this.activityExerciseRepository.findOne({
            where: { id },
            relations: { activityLog: true, routineExercise: { exercise: true } },
        });
        if (!activityExercise) {
            throw new ActivityExerciseNotFoundException(id);
        }
        return activityExercise;
    }

    async update(id: number, updateActivityExerciseDto: UpdateActivityExerciseDto): Promise<ActivityExercise> {
        const { activityLogId, routineExerciseId, ...data } = updateActivityExerciseDto;
        await this.findOne(id);

        const activityLog = activityLogId ? await this.activityLogService.findOne(activityLogId) : undefined;
        const routineExercise = routineExerciseId
            ? await this.routineExerciseService.findOne(routineExerciseId)
            : undefined;

        await this.activityExerciseRepository.save({
            id,
            ...data,
            ...(activityLog ? { activityLog } : {}),
            ...(routineExercise ? { routineExercise } : {}),
        });
        return this.findOne(id);
    }

    async remove(id: number): Promise<{ id: number }> {
        await this.findOne(id);
        await this.activityExerciseRepository.delete(id);
        return { id };
    }

    async findByActivityLog(activityLogId: number): Promise<ActivityExercise[]> {
        return await this.activityExerciseRepository.find({
            where: { activityLog: { id: activityLogId } },
            relations: { routineExercise: { exercise: true } },
            order: { startedAt: 'ASC' },
        });
    }
}
