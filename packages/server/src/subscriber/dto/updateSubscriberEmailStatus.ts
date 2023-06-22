import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ApiBodyTypeEnum } from '../../apiKey/enum/apiBodyTypeEnum';
import { SubscriberEmailStatus } from '../enum/emailStatus.enum';

class UpdateSubscriberEmailStatusAttributesObject {
  @IsEnum(SubscriberEmailStatus, { always: true })
  @IsDefined()
  @ApiProperty({
    required: true,
    description: 'Subscriber email status',
    enum: SubscriberEmailStatus,
    default: SubscriberEmailStatus.SUBSCRIBED,
  })
  emailStatus: SubscriberEmailStatus;
}

class UpdateSubscriberemailStatusDataObject {
  @IsEnum(ApiBodyTypeEnum, { always: true })
  @IsNotEmpty()
  @ApiProperty({
    enum: ApiBodyTypeEnum,
    default: ApiBodyTypeEnum.Subscriber,
  })
  type: ApiBodyTypeEnum;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description:
      'Primary key that uniquely identifies this subscriber. Generated by Bespoke.',
    default: 'UUID',
    example: 'UUID',
  })
  subscriberId: string;

  @IsObject()
  @IsNotEmptyObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => UpdateSubscriberEmailStatusAttributesObject)
  @ApiProperty()
  attributes: UpdateSubscriberEmailStatusAttributesObject;
}

export class UpdateSubscriberEmailStatusDto {
  @IsObject()
  @IsNotEmptyObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => UpdateSubscriberemailStatusDataObject)
  @ApiProperty()
  data: UpdateSubscriberemailStatusDataObject;
}