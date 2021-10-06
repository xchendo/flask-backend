import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

describe('TasksController', () => {
  let controller: TasksController;
  // inject dependencies
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        { provide: TasksService, useValue: {createTask: jest.fn()} }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTask', () => {
    it('should work', () => {
      expect(service.createTask).not.toHaveBeenCalled();
      controller.createTask({title: 'test', description: 'again'});
      expect(service.createTask).toHaveBeenCalled();
    });
  });
})
