import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ApiBodyTypeEnum } from '../../apiKey/enum/apiBodyTypeEnum';

class AttributesObject {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'A helpful name to label the list',
    example: 'Newsletter',
    default: 'Newsletter',
  })
  name: string;
}

class DataObject {
  @IsDefined()
  @IsEnum(ApiBodyTypeEnum, { always: true })
  @ApiProperty({
    enum: ApiBodyTypeEnum,
    default: ApiBodyTypeEnum.List,
  })
  type: ApiBodyTypeEnum;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description:
      'Primary key that uniquely identifies this list. Generated by Bespoke.',
    default: 'UUID',
    example: 'UUID',
  })
  listId: string;

  @IsObject()
  @ValidateNested()
  @IsNotEmptyObject()
  @IsDefined()
  @Type(() => AttributesObject)
  @ApiProperty()
  attributes: AttributesObject;
}

export class UpdateListDto {
  @IsObject()
  @ValidateNested()
  @IsNotEmptyObject()
  @IsDefined()
  @Type(() => DataObject)
  @ApiProperty()
  data: DataObject;
}
