import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateRoutineDto {
    @IsInt({ message: 'El id del usuario debe ser un número entero' })
    @IsPositive({ message: 'El id del usuario debe ser positivo' })
    userId: number;

    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre de la rutina es obligatorio' })
    @MinLength(3, { message: 'El nombre debe contener al menos 3 caracteres' })
    name: string;

    @IsOptional()
    @IsString()
    description?: string;
}
