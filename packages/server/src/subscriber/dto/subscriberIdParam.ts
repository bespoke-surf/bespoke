import { IsNotEmpty, IsUUID } from 'class-validator';

export class SubscriberIdParam {
  @IsUUID()
  @IsNotEmpty()
  subscriberId: string;
}
