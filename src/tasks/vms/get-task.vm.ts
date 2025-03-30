import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Type } from 'class-transformer';

export class GetTaskData {
  @Expose()
  @ApiProperty({ name: 'id', format: 'number' })
  id: number;

  @Expose()
  @ApiProperty({ name: 'title', format: 'string' })
  title: string;

  @Expose()
  @ApiProperty({ name: 'dueDate', format: 'string' })
  dueDate: string | null;

  @Expose()
  @ApiProperty({ name: 'description', format: 'string' })
  description: string | null;

  @Expose()
  @ApiProperty({ name: 'completed', format: 'boolean' })
  completed: boolean;

  @Expose()
  @ApiProperty({ name: 'createdAt', format: 'string' })
  createdAt: string;

  @Expose()
  @ApiProperty({ name: 'updatedAt', format: 'string' })
  updatedAt: string;

  public static toViewModel(d: any): GetTaskData {
    return plainToInstance(GetTaskData, d, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
  }
}


export class GetTasksViewModel {
  @ApiProperty({ name: 'status', format: 'boolean' })
  status: boolean = true;

  @ApiProperty({ name: 'message', format: 'string' })
  message: string = 'DATA_RETRIEVED';

  @Expose()
  @ApiProperty({ type: [GetTaskData] })
  data: GetTaskData[];

  public static toViewModel(d: any): GetTasksViewModel {
    return plainToInstance(GetTasksViewModel, d, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
  }
}


export class GetTaskViewModelById {
    @ApiProperty({ name: 'status', format: 'boolean' })
    status: boolean = true;
    
    @ApiProperty({ name: 'message', format: 'string' })
    message: string = 'DATA_RETRIEVED';
    
    @Expose()
    @Type(() => GetTaskData)
    @ApiProperty({ type: GetTaskData })
    data: GetTaskData;
    
    public static toViewModel(d: any): GetTaskViewModelById {
        return plainToInstance(GetTaskViewModelById, d, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        });
    }
}
