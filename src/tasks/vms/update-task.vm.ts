import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { Task } from 'common/interfaces/tasks.interface';

export class UpdateTaskViewModel {
  @Expose()
  @ApiProperty({ name: 'status', format: 'boolean' })
  status: boolean = true;

  @Expose()
  @ApiProperty({ name: 'message', format: 'string' })
  message: string = 'TASK_UPDATED';

  @Expose()
  @ApiProperty({ name: 'data', format: 'object' })
  data?: Task;

  public static toViewModel(d: any): UpdateTaskViewModel {
    return plainToInstance(UpdateTaskViewModel, d, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
  }
}
