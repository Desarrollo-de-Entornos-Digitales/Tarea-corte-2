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

import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExerciseService } from './exercise.service';

@Controller('exercises')
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
export class ExerciseController {
    constructor(private readonly exerciseService: ExerciseService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Permissions('create_exercise')
    create(@Body() createExerciseDto: CreateExerciseDto) {
        return this.exerciseService.create(createExerciseDto);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Permissions('read_exercise')
    findAll(@Query('type') type?: string, @Query('search') search?: string) {
        if (type || search) {
            return this.exerciseService.searchByTypeAndName(type, search);
        }
        return this.exerciseService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Permissions('read_exercise')
    findOne(@Param('id', PositiveIntPipe) id: number) {
        return this.exerciseService.findOne(id);
    }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @Permissions('update_exercise')
    update(@Param('id', PositiveIntPipe) id: number, @Body() updateExerciseDto: UpdateExerciseDto) {
        return this.exerciseService.update(id, updateExerciseDto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @Permissions('delete_exercise')
    remove(@Param('id', PositiveIntPipe) id: number) {
        return this.exerciseService.remove(id);
    }
}
