import { NotFoundException } from '@nestjs/common';

export class ActivityExerciseNotFoundException extends NotFoundException {
    constructor(activityExerciseId: number) {
        super({
            error: 'Activity Exercise Not Found',
            message: `El resultado de ejercicio con identificador ${activityExerciseId} no fue encontrado.`,
        });
    }
}
