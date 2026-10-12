import { NotFoundException } from '@nestjs/common';

export class ActivityLogNotFoundException extends NotFoundException {
    constructor(activityLogId: number) {
        super({
            error: 'Activity Log Not Found',
            message: `La sesión de actividad con identificador ${activityLogId} no fue encontrada.`,
        });
    }
}
