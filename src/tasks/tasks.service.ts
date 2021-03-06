import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TasksRepository } from './tasks.repository'
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'

@Injectable()
export class TasksService {
  constructor (
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  updateTask (id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.tasksRepository.updateTask(id, updateTaskDto)
  }
}
