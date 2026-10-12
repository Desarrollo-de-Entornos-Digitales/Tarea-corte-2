import { IsDateString, IsInt, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class CreateActivityExerciseDto {
    @IsInt({ message: 'El id de la sesión de actividad debe ser un número entero' })
    @IsPositive({ message: 'El id de la sesión de actividad debe ser positivo' })
    activityLogId: number;

    @IsInt({ message: 'El id del ejercicio de rutina debe ser un número entero' })
    @IsPositive({ message: 'El id del ejercicio de rutina debe ser positivo' })
    routineExerciseId: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    actualSets?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    actualReps?: number;

    @IsOptional()
    @IsNumber({}, { message: 'El peso real debe ser numérico' })
    @Min(0)
    actualWeightKg?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    actualDurationMin?: number;

    @IsOptional()
    @IsNumber({}, { message: 'Las calorías quemadas deben ser numéricas' })
    @Min(0)
    caloriesBurned?: number;

    @IsOptional()
    @IsNumber({}, { message: 'La distancia recorrida debe ser numérica' })
    @Min(0)
    distanceCoveredKm?: number;

    @IsDateString({}, { message: 'startedAt debe ser una fecha ISO válida' })
    startedAt: string;

    @IsOptional()
    @IsDateString({}, { message: 'completedAt debe ser una fecha ISO válida' })
    completedAt?: string;
}
