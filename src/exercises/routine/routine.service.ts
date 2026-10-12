import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserService } from '../../auth/user/user.service';
import { RoutineNotFoundException } from '../../common/exceptions';
import { Routine } from '../entities/routine.entity';

import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';

@Injectable()
export class RoutineService {
    constructor(
        @InjectRepository(Routine)
        private readonly routineRepository: Repository<Routine>,
        private readonly userService: UserService,
    ) {}

    async create(createRoutineDto: CreateRoutineDto): Promise<Routine> {
        const { userId, ...routineData } = createRoutineDto;
        const user = await this.userService.findOne(userId);

        const routine = this.routineRepository.create({ ...routineData, user });
        return await this.routineRepository.save(routine);
    }

    async findAll(): Promise<Routine[]> {
        return await this.routineRepository.find({
            relations: { user: true },
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(id: number, withExercises = false): Promise<Routine> {
        const routine = await this.routineRepository.findOne({
            where: { id },
            relations: {
                user: true,
                routineExercises: withExercises ? { exercise: true } : false,
            },
        });
        if (!routine) {
            throw new RoutineNotFoundException(id);
        }
        return routine;
    }

    async update(id: number, updateRoutineDto: UpdateRoutineDto): Promise<Routine> {
        const { userId, ...routineData } = updateRoutineDto;
        await this.findOne(id);

        if (userId) {
            const user = await this.userService.findOne(userId);
            await this.routineRepository.save({ id, ...routineData, user });
        } else {
            await this.routineRepository.update(id, routineData);
        }

        return this.findOne(id);
    }

    async remove(id: number): Promise<{ id: number }> {
        await this.findOne(id);
        await this.routineRepository.delete(id);
        return { id };
    }

    async findByUser(userId: number): Promise<Routine[]> {
        return await this.routineRepository.find({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' },
        });
    }
}
