import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoutineExercise } from '../entities/routine-exercise.entity';
import { ExerciseModule } from '../exercise/exercise.module';
import { RoutineModule } from '../routine/routine.module';

import { RoutineExerciseController } from './routine-exercise.controller';
import { RoutineExerciseService } from './routine-exercise.service';

@Module({
    imports: [TypeOrmModule.forFeature([RoutineExercise]), RoutineModule, ExerciseModule],
    controllers: [RoutineExerciseController],
    providers: [RoutineExerciseService],
    exports: [RoutineExerciseService],
})
export class RoutineExerciseModule {}
