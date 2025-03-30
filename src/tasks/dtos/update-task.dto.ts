import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { isCompleted } from 'common/types/tasks.type';

export class UpdateTaskDto {
  @Expose()
  @ApiProperty({
    name: 'title',
    description: 'Task title',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @Expose()
  @ApiProperty({
    name: 'dueDate',
    description: 'Due date of the task',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  dueDate?: string;

  @Expose()
  @ApiProperty({
    name: 'description',
    description: 'Task description',
    format: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @Expose()
  @ApiProperty({
    name: 'completed',
    description: 'Task completion status',
    format: 'boolean',
    required: false,
  })
  @IsOptional()
  completed?: isCompleted;

  public static toViewModel(d: any): UpdateTaskDto {
    return plainToInstance(UpdateTaskDto, d, {
      exposeUnsetFields: false,
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
  }
}
