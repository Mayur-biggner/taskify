import { Injectable } from '@nestjs/common';
import { Task } from 'common/interfaces/tasks.interface';
import * as fs from 'fs';
import { CreateTaskDto, GetTasksQueryDto, UpdateTaskDto } from './dtos';

const DATA_FILE = 'tasks.json';

@Injectable()
export class TasksService {
  private todos: Task[] = [];

  constructor() {
    this.loadData();
  }

  // Load data from JSON file
  private loadData(): void {
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf-8');
      this.todos = JSON.parse(data);
    } catch (error) {
      this.todos = [];
    }
  }

  // Save data to JSON file
  private saveData(): void {
    fs.writeFileSync(DATA_FILE, JSON.stringify(this.todos, null, 2));
  }

  // Get all ToDos with optional filtering
  getAll(query?: GetTasksQueryDto): Task[] {
    let filteredTasks = this.todos;

    if (query?.title) {
      filteredTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(query.title.toLowerCase()),
      );
    }

    if (query?.dueDate) {
      if (query?.dueDate) {
        filteredTasks = filteredTasks.filter(
          (task) =>
            new Date(task.dueDate).toISOString().split('T')[0] ===
            query.dueDate,
        );
      }
    }

    if (query?.startDate && query?.endDate) {
      const start = new Date(query.startDate);
      const end = new Date(query.endDate);
      filteredTasks = filteredTasks.filter((task) => {
        const taskDate = new Date(task.dueDate);
        return taskDate >= start && taskDate <= end;
      });
    }

    return filteredTasks;
  }

  // Get ToDo by ID
  getById(id: number): Task | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  // Create a new ToDo
  create(todo: CreateTaskDto): Task {
    const newTodo: Task = {
      id: Date.now(),
      title: todo.title,
      description: todo.description || null,
      completed: todo.completed || false,
      dueDate: todo.dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.todos.push(newTodo);
    this.saveData();
    return newTodo;
  }

  // Update a ToDo
  update(id: number, updatedTodo: UpdateTaskDto): Task | null {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos[index] = {
        ...this.todos[index],
        ...updatedTodo,
        updatedAt: new Date().toISOString(),
      };
      this.saveData();
      return this.todos[index];
    }
    return null;
  }

  // Delete a ToDo
  delete(id: number): boolean {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.saveData();
      return true;
    }
    return false;
  }
}
