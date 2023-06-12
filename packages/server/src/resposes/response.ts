import { ApiProperty } from '@nestjs/swagger';

export class ExceptionResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
