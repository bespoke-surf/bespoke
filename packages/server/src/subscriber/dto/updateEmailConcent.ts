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
import { EmailConcentState } from '../../subscriber-list/enum/emailConcentState.enum';

class UpdateEmailConcentAttributes {
  @IsEnum(EmailConcentState, { always: true })
  @IsDefined()
  @ApiProperty({
    required: true,
    description: 'Email concent state',
    enum: EmailConcentState,
    default: EmailConcentState.SUBSCRIBED,
  })
  state: EmailConcentState;
}

class UpdateEmailConecetnDataObject {
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
      'Primary key that uniquely identifies the list. Generated by Bespoke.',
    default: 'UUID',
    example: 'UUID',
  })
  listId: string;

  @IsObject()
  @IsNotEmptyObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => UpdateEmailConcentAttributes)
  @ApiProperty()
  attributes: UpdateEmailConcentAttributes;
}

export class UpdateEmailConcentDto {
  @IsObject()
  @IsNotEmptyObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => UpdateEmailConecetnDataObject)
  @ApiProperty()
  data: UpdateEmailConecetnDataObject;
}
