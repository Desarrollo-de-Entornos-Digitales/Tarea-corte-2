import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RoutineExerciseNotFoundException } from '../../common/exceptions';
import { RoutineExercise } from '../entities/routine-exercise.entity';
import { ExerciseService } from '../exercise/exercise.service';
import { RoutineService } from '../routine/routine.service';

import { CreateRoutineExerciseDto } from './dto/create-routine-exercise.dto';
import { UpdateRoutineExerciseDto } from './dto/update-routine-exercise.dto';

@Injectable()
export class RoutineExerciseService {
    constructor(
        @InjectRepository(RoutineExercise)
        private readonly routineExerciseRepository: Repository<RoutineExercise>,
        private readonly routineService: RoutineService,
        private readonly exerciseService: ExerciseService,
    ) {}

    async create(createRoutineExerciseDto: CreateRoutineExerciseDto): Promise<RoutineExercise> {
        const { routineId, exerciseId, ...data } = createRoutineExerciseDto;
        const [routine, exercise] = await Promise.all([
            this.routineService.findOne(routineId),
            this.exerciseService.findOne(exerciseId),
        ]);

        const routineExercise = this.routineExerciseRepository.create({ ...data, routine, exercise });
        return await this.routineExerciseRepository.save(routineExercise);
    }

    async findAll(): Promise<RoutineExercise[]> {
        return await this.routineExerciseRepository.find({
            relations: { routine: true, exercise: true },
            order: { orderIndex: 'ASC' },
        });
    }

    async findOne(id: number): Promise<RoutineExercise> {
        const routineExercise = await this.routineExerciseRepository.findOne({
            where: { id },
            relations: { routine: true, exercise: true },
        });
        if (!routineExercise) {
            throw new RoutineExerciseNotFoundException(id);
        }
        return routineExercise;
    }

    async update(id: number, updateRoutineExerciseDto: UpdateRoutineExerciseDto): Promise<RoutineExercise> {
        const { routineId, exerciseId, ...data } = updateRoutineExerciseDto;
        await this.findOne(id);

        const routine = routineId ? await this.routineService.findOne(routineId) : undefined;
        const exercise = exerciseId ? await this.exerciseService.findOne(exerciseId) : undefined;

        await this.routineExerciseRepository.save({
            id,
            ...data,
            ...(routine ? { routine } : {}),
            ...(exercise ? { exercise } : {}),
        });
        return this.findOne(id);
    }

    async remove(id: number): Promise<{ id: number }> {
        await this.findOne(id);
        await this.routineExerciseRepository.delete(id);
        return { id };
    }

    async findByRoutine(routineId: number): Promise<RoutineExercise[]> {
        return await this.routineExerciseRepository.find({
            where: { routine: { id: routineId } },
            relations: { exercise: true },
            order: { orderIndex: 'ASC' },
        });
    }
}
