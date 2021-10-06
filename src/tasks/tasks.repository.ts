import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./task.entity";
import { UpdateTaskDto } from './dto/update-task.dto'

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const {title, description} = createTaskDto;

        const task = this.create({
            title,
            description,
        });

        await this.save(task);
        return task;
    }

    async updateTask (id: number, updateTaskData: UpdateTaskDto): Promise<Task> {
        const {title, description} = updateTaskData;

        // find the task given the id and update it
        // Checking for undefined so that the user can clear out either field
        const task = await this.findOne(id);
        task.title = title === undefined ? title : task.title;
        task.description = description === undefined ? task.description : description;

        return await this.save(task);
    }
}