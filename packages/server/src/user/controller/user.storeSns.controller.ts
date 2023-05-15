import { InjectQueue } from '@nestjs/bull';
import { Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Queue } from 'bull';
import { Request, Response } from 'express';
import { USER_SNS_EMAIL_METRIC_WEBHOOK_QUEUE } from '../../constants';
import { UserStoreSnsEmailMetricQueueData } from '../queue/sns-webhookQueue';

@Controller('user')
export class UserStoreSnsController {
  constructor(
    @InjectQueue(USER_SNS_EMAIL_METRIC_WEBHOOK_QUEUE)
    private readonly userSnsEmailMetricWebhookQueue: Queue<UserStoreSnsEmailMetricQueueData>,
  ) {}
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
