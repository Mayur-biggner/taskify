import { Task } from 'common/interfaces/tasks.interface';
import { CreateTaskDto, GetTasksQueryDto, UpdateTaskDto } from '../dtos';
import { TasksService } from '../tasks.service';

jest.mock('fs'); // Mock the file system operations

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TasksService();
  });

  beforeEach(() => {
    service['todos'] = [
      {
        id: 1,
        title: 'Task 1',
        dueDate: '2025-04-01',
        description: 'TBD',
        completed: false,
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 2,
        title: 'Another Task',
        dueDate: '2025-04-02',
        description: 'TBD',
        completed: false,
        createdAt: '',
        updatedAt: '',
      },
    ];
  });

  describe('getAll', () => {
    it('should return all tasks', () => {
      const mockTasks: Task[] = [
        {
          id: 1,
          title: 'Task 1',
          completed: false,
          description: 'TBD',
          dueDate: '2025-04-01',
          createdAt: '',
          updatedAt: '',
        },
        {
          id: 2,
          title: 'Task 2',
          completed: true,
          description: 'TBD',
          dueDate: '2025-04-02',
          createdAt: '',
          updatedAt: '',
        },
      ];
      jest.spyOn(service, 'getAll').mockReturnValue(mockTasks);
      expect(service.getAll()).toEqual(mockTasks);
    });

    it('should filter tasks by title', () => {
      const query: GetTasksQueryDto = { title: 'Task 1' };
      const tasks = service.getAll(query);
      console.log('Filtered Tasks:', tasks);
      expect(tasks).toMatchObject([{ title: 'Task 1' }]);
    });

    it('should filter tasks by due date', () => {
      const query: GetTasksQueryDto = { dueDate: '2025-04-01' };
      const tasks = service.getAll(query);
      expect(tasks).
        toMatchObject([{ dueDate: '2025-04-01' }]);
    });

    it('should filter tasks by date range', () => {
      const query: GetTasksQueryDto = {
        startDate: '2025-04-01',
        endDate: '2025-04-03',
      };
      const tasks = service.getAll(query);
      expect(
        tasks.every(
          (task) =>
            task.dueDate >= query.startDate && task.dueDate <= query.endDate,
        ),
      ).toBe(true);
    });
  });

  describe('getById', () => {
    it('should return a task if found', () => {
      const task = service.create({ title: 'Test Task' } as CreateTaskDto);
      expect(service.getById(task.id)).toEqual(task);
    });

    it('should return undefined if task not found', () => {
      expect(service.getById(999)).toBeUndefined();
    });
  });

  describe('create', () => {
    it('should create and return a new task', () => {
      const taskDto: CreateTaskDto = {
        title: 'New Task',
        description: 'Task description',
        dueDate: '2025-04-01',
        completed: false,
      };
      const task = service.create(taskDto);
      expect(task).toMatchObject({ title: 'New Task', completed: false });
    });
  });

  describe('update', () => {
    it('should update an existing task', () => {
      const task = service.create({ title: 'Old Task' } as CreateTaskDto);
      const updatedTask = service.update(task.id, {
        title: 'Updated Task',
      } as UpdateTaskDto);
      expect(updatedTask).toMatchObject({ title: 'Updated Task' });
    });

    it('should return null if task not found', () => {
      expect(service.update(999, { title: 'Does Not Exist' })).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a task and return true', () => {
      const task = service.create({ title: 'Task to Delete' } as CreateTaskDto);
      expect(service.delete(task.id)).toBe(true);
      expect(service.getById(task.id)).toBeUndefined();
    });

    it('should return false if task not found', () => {
      expect(service.delete(999)).toBe(false);
    });
  });
});
