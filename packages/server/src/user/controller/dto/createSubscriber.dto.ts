import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsISO31661Alpha2,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiBodyTypeEnum } from '../../../apiKey/enum/apiBodyTypeEnum';

class CreateSubscriberLocationObject {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'First line of street address',
    example: 'address1',
    default: '89 E 42nd St',
  })
  address1: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Second line of street address',
    example: 'address2',
    default: '1st floor',
  })
  address2: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'City name',
    example: 'city',
    default: 'New York',
  })
  city: string;

  @IsNotEmpty()
  @IsISO31661Alpha2()
  @IsString()
  @ApiProperty({
    description: 'Country Code',
    example: 'US',
    default: 'US',
  })
  country: string;

  @IsString()
  @ApiProperty({
    required: false,
    description: 'State Code',
    example: 'NY',
    default: 'NY',
  })
  state: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Zip Code',
    example: '1007',
    default: '1007',
  })
  zipCode: string;
}

class CreateSubscriberAttributesObject {
  @IsDefined()
  @IsEmail()
  @ApiProperty({
    description: 'Individuals email address',
    example: 'email',
    default: 'john.hopkins@example.com',
  })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Individuals first name',
    example: 'John',
    default: 'John',
  })
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: 'Individuals last name',
    example: 'Hopkins',
    default: 'Hopkins',
  })
  lastName: string;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty({
    required: false,
    description: "Individual's phone number in E.164 format",
    example: '+15005550006',
    default: '+15005550006',
  })
  phoneNumber: string;

  @IsObject()
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateSubscriberLocationObject)
  @ApiProperty({
    required: false,
  })
  location: CreateSubscriberLocationObject;
}

class CreateSubscriberDataObject {
  @IsEnum(ApiBodyTypeEnum, { always: true })
  @IsNotEmpty()
  @ApiProperty({
    enum: ApiBodyTypeEnum,
    default: ApiBodyTypeEnum.Subscriber,
  })
  type: ApiBodyTypeEnum;

  @IsObject()
  @IsNotEmptyObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => CreateSubscriberAttributesObject)
  @ApiProperty()
  attributes: CreateSubscriberAttributesObject;
}

export class CreateSubscriberDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateSubscriberDataObject)
  @ApiProperty()
  data: CreateSubscriberDataObject;
}
