import {
  Controller,
  Get,
  HttpStatus,
  Options,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { SignupForm } from '../../signup-form/signup-form.entity';
import { StoreService } from '../store.service';

@Controller('store')
export class StoreControllerController {
  constructor(private readonly storeService: StoreService) {}

  @Get('/signup-form')
  async signupform(
    @Query('businessId') businessId: string,
  ): Promise<SignupForm[]> {
    const forms = await this.storeService.signupformController(businessId);
    return forms;
  }

  @Options('/signup-form')
  async signupformOptions(@Res() res: Response) {
    res.set('Access-Control-Allow-Origin', '*');
    res.send(HttpStatus.NO_CONTENT);
  }
}
