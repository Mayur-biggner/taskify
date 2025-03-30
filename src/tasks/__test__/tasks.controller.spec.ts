import { Test, TestingModule } from '@nestjs/testing';
import { ApiResponse, Task } from 'common/interfaces/tasks.interface';
import { CreateTaskDto, GetTasksQueryDto, UpdateTaskDto } from '../dtos';
import { TasksController } from '../tasks.controller';
import { TasksService } from '../tasks.service';

const mockTask: Task = {
  id: 1,
  title: 'Test Task',
  description: 'This is a test task',
  completed: false,
  dueDate: '2025-04-01',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTasksService = {
    getAll: jest.fn().mockReturnValue([mockTask]),
    getById: jest
      .fn()
      .mockImplementation((id) => (id === 1 ? mockTask : undefined)),
    create: jest
      .fn()
      .mockImplementation((dto) => ({ ...mockTask, ...dto, id: 2 })),
    update: jest
      .fn()
      .mockImplementation((id, dto) =>
        id === 1
          ? { ...mockTask, ...dto, updatedAt: new Date().toISOString() }
          : null,
      ),
    delete: jest.fn().mockImplementation((id) => id === 1),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: mockTasksService }],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  beforeEach(() => {
    service['todos'] = [
      {
        id: 1,
        title: 'Task 1',
        description: 'This is a test task',
        dueDate: '2025-04-01',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'This is a test task',
        dueDate: '2025-04-02',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all tasks', () => {
      const query: GetTasksQueryDto = {};
      const result: ApiResponse<Task[]> = controller.getAll(query);
      expect(result.status).toBe('success');
      expect(result.data).toHaveLength(1);
      expect(service.getAll).toHaveBeenCalledWith(query);
    });
  });

  describe('getById', () => {
    it('should return a task if found', () => {
      const result = controller.getById(1);
      expect(result.status).toBe('success');
      expect(result.data).toEqual(mockTask);
    });

    it('should return an error if task is not found', () => {
      const result = controller.getById(99);
      expect(result.status).toBe('error');
      expect(result.message).toBe('Task not found');
    });
  });

  describe('create', () => {
    it('should create and return a new task', () => {
      const dto: CreateTaskDto = {
        title: 'New Task',
        description: 'Test Desc',
        completed: false,
      };
      const result = controller.create(dto);
      //   expect(result.title).toBe(dto.title);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('update', () => {
    it('should update a task and return it', () => {
      const dto: UpdateTaskDto = { title: 'Updated Task' };
      const result = controller.update(1, dto);
      expect(result.status).toBe('success');
      expect(result.data.title).toBe(dto.title);
    });

    it('should return an error if task is not found', () => {
      const dto: UpdateTaskDto = { title: 'Updated Task' };
      const result = controller.update(99, dto);
      expect(result.status).toBe('error');
      expect(result.message).toBe('Task not found');
    });
  });

  describe('delete', () => {
    it('should delete a task and return success', () => {
      const result = controller.delete(1);
      expect(result.status).toBe('success');
    });

    it('should return an error if task is not found', () => {
      const result = controller.delete(99);
      expect(result.status).toBe('error');
      expect(result.message).toBe('Task not found');
    });
  });
});
