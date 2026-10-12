import { IsIn, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

const EXERCISE_TYPES = ['strength', 'cardio', 'core', 'flexibility', 'balance'] as const;

export class CreateExerciseDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @MinLength(3, { message: 'El nombre debe contener al menos 3 caracteres' })
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsIn(EXERCISE_TYPES, { message: `El tipo debe ser uno de: ${EXERCISE_TYPES.join(', ')}` })
    type: string;

    @IsOptional()
    @IsNumber({}, { message: 'Las calorías estimadas deben ser numéricas' })
    @Min(0, { message: 'Las calorías estimadas no pueden ser negativas' })
    estimatedCalories?: number;

    @IsOptional()
    @IsNumber({}, { message: 'La distancia estimada debe ser numérica' })
    @Min(0, { message: 'La distancia estimada no puede ser negativa' })
    estimatedDistanceKm?: number;

    @IsOptional()
    @IsNumber({}, { message: 'La duración estimada debe ser numérica' })
    @Min(0, { message: 'La duración estimada no puede ser negativa' })
    estimatedDurationMin?: number;

    @IsOptional()
    @IsString()
    icon?: string;
}
