import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse as ApiSwaggerResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponse, Task } from 'common/interfaces/tasks.interface';
import { CreateTaskDto, GetTasksQueryDto, UpdateTaskDto } from './dtos';
import { TasksService } from './tasks.service';
import { CreateTaskViewModel } from './vms/create-task.vm';
import { GetTasksViewModel, GetTaskViewModelById } from './vms/get-task.vm';
import { UpdateTaskViewModel } from './vms/update-task.vm';
const TASKS = 'todos';
const ID = ':id';

/**
 * Tasks Controller
 * Handles task-related API endpoints for creating, retrieving, updating, and deleting tasks.
 */
@ApiTags('Tasks')
@Controller(TASKS)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Retrieve all tasks with optional search and filtering
   * @param {GetTasksQueryDto} query - Query parameters for filtering
   * @returns {ApiResponse<Task[]>} - Standard API response with filtered tasks
   */
  @ApiOperation({
    summary: 'Get all tasks',
    description: 'Fetches all tasks from the database with optional filters',
  })
  @ApiSwaggerResponse({
    status: 200,
    description: 'List of tasks retrieved successfully',
    type: GetTasksViewModel,
  })
  @Get()
  getAll(@Query() query: GetTasksQueryDto): ApiResponse<Task[]> {
    const tasks = this.tasksService.getAll(query);
    return {
      status: 'success',
      message: 'Tasks retrieved successfully',
      data: tasks,
    };
  }

  /**
   * Retrieve a task by its ID
   * @param {number} id - The ID of the task to retrieve
   * @returns {ApiResponse<Task>} - Standard API response with task details
   */
  @ApiOperation({
    summary: 'Get a task by ID',
    description: 'Fetches a single task by its ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Unique identifier of the task',
    type: Number,
  })
  @ApiSwaggerResponse({
    status: 200,
    description: 'Task found successfully',
    type: GetTaskViewModelById,
  })
  @ApiSwaggerResponse({ status: 404, description: 'Task not found' })
  @Get(ID)
  getById(@Param('id') id: number): ApiResponse<Task> {
    const task = this.tasksService.getById(Number(id));
    if (!task) {
      return { status: 'error', message: 'Task not found' };
    }
    return {
      status: 'success',
      message: 'Task retrieved successfully',
      data: task,
    };
  }

  /**
   * Create a new task
   * @param {CreateTaskDto} todo - The task data
   * @returns {ApiResponse<Task>} - Standard API response with the created task
   */
  @ApiOperation({
    summary: 'Create a new task',
    description: 'Creates a new task and returns the created task',
  })
  @ApiBody({ type: CreateTaskDto, description: 'Task details' })
  @ApiSwaggerResponse({
    status: 201,
    description: 'Task created successfully',
    type: CreateTaskViewModel,
  })
  @Post()
  create(@Body() todo: CreateTaskDto): CreateTaskViewModel {
    const data = this.tasksService.create(todo);
    return CreateTaskViewModel.toViewModel({ data });
  }

  /**
   * Update an existing task
   * @param {number} id - The ID of the task to update
   * @param {UpdateTaskDto} updatedTodo - The updated task data
   * @returns {ApiResponse<Task>} - Standard API response with the updated task
   */
  @ApiOperation({
    summary: 'Update an existing task',
    description: 'Updates a task with new details',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the task to update',
    type: Number,
  })
  @ApiBody({ type: UpdateTaskDto, description: 'Updated task details' })
  @ApiSwaggerResponse({
    status: 200,
    description: 'Task updated successfully',
    type: UpdateTaskViewModel,
  })
  @ApiSwaggerResponse({ status: 404, description: 'Task not found' })
  @Put(ID)
  update(
    @Param('id') id: number,
    @Body() updatedTodo: UpdateTaskDto,
  ): ApiResponse<Task> {
    const task = this.tasksService.update(Number(id), updatedTodo);
    if (!task) {
      return { status: 'error', message: 'Task not found' };
    }
    return {
      status: 'success',
      message: 'Task updated successfully',
      data: task,
    };
  }

  /**
   * Delete a task by its ID
   * @param {number} id - The ID of the task to delete
   * @returns {ApiResponse<null>} - Standard API response with a success or failure message
   */
  @ApiOperation({
    summary: 'Delete a task',
    description: 'Deletes a task by its ID',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID of the task to delete',
    type: Number,
  })
  @ApiSwaggerResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiSwaggerResponse({ status: 404, description: 'Task not found' })
  @Delete(ID)
  delete(@Param('id') id: number): ApiResponse<null> {
    const isDeleted = this.tasksService.delete(Number(id));
    if (!isDeleted) {
      return { status: 'error', message: 'Task not found' };
    }
    return { status: 'success', message: 'Task deleted successfully' };
  }
}
