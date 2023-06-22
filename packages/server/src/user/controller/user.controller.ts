import { InjectQueue } from '@nestjs/bull';
import { Controller, HttpStatus, Post, Query, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Queue } from 'bull';
import { IsEmail, IsString } from 'class-validator';
import { Request, Response } from 'express';
import { USER_SNS_EMAIL_METRIC_WEBHOOK_QUEUE } from '../../constants';
import { UserStoreSnsEmailMetricQueueData } from '../queue/sns-webhookQueue';
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

@ApiExcludeController()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectQueue(USER_SNS_EMAIL_METRIC_WEBHOOK_QUEUE)
    private readonly userSnsEmailMetricWebhookQueue: Queue<UserStoreSnsEmailMetricQueueData>,
  ) {}

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

  @Post('sns-webhook')
  sendgridWebhook(@Req() req: Request, @Res() res: Response) {
    const body: any[] = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const data = Buffer.concat(body).toString();
      this.userSnsEmailMetricWebhookQueue.add(
        { data },
        { removeOnComplete: true, removeOnFail: true },
      );
    });

    req.on('error', (err) => {
      console.error(err);
    });
    res.sendStatus(HttpStatus.OK);
  }
}
