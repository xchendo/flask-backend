import { Body, Controller, Post, Get, Param, Patch } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { Task } from './task.entity'
import { UpdateTaskDto } from './dto/update-task.dto'

@Controller('tasks')
export class TasksController {
  constructor (private tasksService: TasksService) {}

  @Post()
  createTask (@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto)
  }

  @Get()
  getAllTasks(): Promise<Task[]>{
    return this.tasksService.getAllTasks();
  }

  @Patch(':id')
  updateTask(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

}
