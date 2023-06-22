import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationQuery {
  @IsNumber()
  @IsOptional()
  @Max(100)
  limit: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  page: number;
}
