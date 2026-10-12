import { IsDateString, IsInt, IsOptional, IsPositive } from 'class-validator';

export class CreateActivityLogDto {
    @IsInt({ message: 'El id del usuario debe ser un número entero' })
    @IsPositive({ message: 'El id del usuario debe ser positivo' })
    userId: number;

    @IsInt({ message: 'El id de la rutina debe ser un número entero' })
    @IsPositive({ message: 'El id de la rutina debe ser positivo' })
    routineId: number;

    @IsDateString({}, { message: 'startedAt debe ser una fecha ISO válida' })
    startedAt: string;

    @IsOptional()
    @IsDateString({}, { message: 'completedAt debe ser una fecha ISO válida' })
    completedAt?: string;
}
