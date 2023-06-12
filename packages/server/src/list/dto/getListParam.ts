import { IsDefined, IsNotEmpty, IsNumber, IsUUID, Max } from 'class-validator';

export class GetListParam {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class GetListsQuery {
  @IsDefined()
  @IsNumber()
  @Max(100)
  limit: number;

  @IsDefined()
  @IsNumber()
  page: number;
}
