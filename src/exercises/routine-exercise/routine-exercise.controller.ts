import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Permissions } from '../../auth/decorators/permissions.decorator';
import { PermissionsGuard } from '../../auth/guards/permissions/permissions.guard';
import { PositiveIntPipe } from '../../common/pipes/positive-int-pipe';

import { CreateRoutineExerciseDto } from './dto/create-routine-exercise.dto';
import { UpdateRoutineExerciseDto } from './dto/update-routine-exercise.dto';
import { RoutineExerciseService } from './routine-exercise.service';

@Controller('routine-exercises')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class RoutineExerciseController {
    constructor(private readonly routineExerciseService: RoutineExerciseService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Permissions('create_routine_exercise')
    create(@Body() createRoutineExerciseDto: CreateRoutineExerciseDto) {
        return this.routineExerciseService.create(createRoutineExerciseDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Permissions('read_routine_exercise')
    findAll(@Query('routineId') routineId?: string) {
        if (routineId) {
            return this.routineExerciseService.findByRoutine(+routineId);
        }
        return this.routineExerciseService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Permissions('read_routine_exercise')
    findOne(@Param('id', PositiveIntPipe) id: number) {
        return this.routineExerciseService.findOne(id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @Permissions('update_routine_exercise')
    update(@Param('id', PositiveIntPipe) id: number, @Body() updateRoutineExerciseDto: UpdateRoutineExerciseDto) {
        return this.routineExerciseService.update(id, updateRoutineExerciseDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Permissions('delete_routine_exercise')
    remove(@Param('id', PositiveIntPipe) id: number) {
        return this.routineExerciseService.remove(id);
    }
}
