import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiBodyTypeEnum } from '../../apiKey/enum/apiBodyTypeEnum';

class AttributesObject {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'A helpful name to label the list',
    example: 'Newsletter',
    default: 'Newsletter',
  })
  name: string;
}

class DataObject {
  @IsEnum(ApiBodyTypeEnum, { always: true })
  @IsNotEmpty()
  @ApiProperty({
    enum: ApiBodyTypeEnum,
    default: ApiBodyTypeEnum.List,
  })
  type: ApiBodyTypeEnum;

  @IsObject()
  @IsNotEmptyObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => AttributesObject)
  @ApiProperty()
  attributes: AttributesObject;
}

export class CreateListDto {
  @IsObject()
  @IsNotEmptyObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => DataObject)
  @ApiProperty()
  data: DataObject;
}
