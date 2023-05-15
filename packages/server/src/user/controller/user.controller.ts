import { Controller, Post, Query } from '@nestjs/common';
import { IsEmail, IsString } from 'class-validator';
import { UserService } from '../user.service';

class SubscribeToStoreQuery {
  @IsEmail()
  email: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsString()
  storeId: string;

  @IsString()
  formId: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('subscribe')
  subscribeToStore(@Query() query: SubscribeToStoreQuery): Promise<boolean> {
    return this.userService.subscribeToStoreFromForm(
      query.storeId,
      query.email,
      query.formId,
      query.firstName,
      query.lastName,
    );
  }
}
