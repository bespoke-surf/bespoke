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
import { ListEnum } from '../enum/ListEnum';

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
  @IsEnum(ListEnum, { each: true })
  @IsNotEmpty()
  @ApiProperty({
    enum: ListEnum,
    default: ListEnum.List,
  })
  type: ListEnum;

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
