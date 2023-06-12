import { IsDefined, IsNotEmpty, IsNumber, IsUUID, Max } from 'class-validator';

export class GetSubscriberParam {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class GetSubscriberQuery {
  @IsDefined()
  @IsNumber()
  @Max(100)
  limit: number;

  @IsDefined()
  @IsNumber()
  page: number;
}
