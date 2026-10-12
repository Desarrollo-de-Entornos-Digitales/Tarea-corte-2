import { IsInt, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class CreateRoutineExerciseDto {
    @IsInt({ message: 'El id de la rutina debe ser un número entero' })
    @IsPositive({ message: 'El id de la rutina debe ser positivo' })
    routineId: number;

    @IsInt({ message: 'El id del ejercicio debe ser un número entero' })
    @IsPositive({ message: 'El id del ejercicio debe ser positivo' })
    exerciseId: number;

    @IsInt({ message: 'El orden debe ser un número entero' })
    @Min(1, { message: 'El orden debe ser al menos 1' })
    orderIndex: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    targetSets?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    targetReps?: number;

    @IsOptional()
    @IsNumber({}, { message: 'El peso objetivo debe ser numérico' })
    @Min(0)
    targetWeightKg?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    targetDurationMin?: number;
}
