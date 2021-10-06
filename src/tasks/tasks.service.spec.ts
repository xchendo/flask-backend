import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from './tasks.repository';

const mockTasksRepository = () => ({
  createTask: jest.fn(),
  updateTask: jest.fn(),
  find: jest.fn(),
});

describe('TasksService', () => {
  let service: TasksService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<TasksRepository>(TasksRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('calls TasksRepository.createTask and returns the result', () => {
      expect(repository.createTask).not.toHaveBeenCalled();
      service.createTask({title: 'test', description: 'test'});
      expect(repository.createTask).toHaveBeenCalled();

    });
  });

  describe('getAllTasks', () => {
    it('calls TasksRepository.find and returns the result', () => {
      expect(repository.find).not.toHaveBeenCalled();
      service.getAllTasks();
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('updateTask', () => {
    it('calls TasksRepository.update and returns the result', () => {
      expect(repository.updateTask).not.toHaveBeenCalled();
      service.updateTask(1, {title: '', description: ''});
      expect(repository.updateTask).toHaveBeenCalled();
    });
  });
});
