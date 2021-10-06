import { Body, Controller, Post } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { Task } from './task.entity'

@Controller('tasks')
export class TasksController {
  constructor (private tasksService: TasksService) {}

  @Post()
  createTask (@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto)
  }
}
