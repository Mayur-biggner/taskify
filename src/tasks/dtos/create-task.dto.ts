import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { isCompleted } from 'common/types/tasks.type';

export class CreateTaskDto {
  @Expose()
  @ApiProperty({ name: 'title', description: 'Task title', format: 'string', required: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Expose()
  @ApiProperty({ name: 'dueDate', description: 'Due date of the task', format: 'date-time', required: false })
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => value?.toISOString())
  dueDate?: string;

  @Expose()
  @ApiProperty({ name: 'description', description: 'Task description', format: 'string', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @Expose()
  @ApiProperty({ name: 'completed', description: 'Task completion status', format: 'boolean', required: true })
  @IsNotEmpty()
  completed: isCompleted;

  public static toViewModel(d: any): CreateTaskDto {
    return plainToInstance(CreateTaskDto, d, { 
      exposeUnsetFields: false, 
      excludeExtraneousValues: true, 
      exposeDefaultValues: true 
    });
  }
}