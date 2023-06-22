import { IsNotEmpty, IsUUID } from 'class-validator';

export class ListIdParam {
  @IsUUID()
  @IsNotEmpty()
  listId: string;
}
