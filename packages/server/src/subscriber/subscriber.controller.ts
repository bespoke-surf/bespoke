import { Controller, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';
import { SubscriberService } from './subscriber.service';

@ApiExcludeController()
@Controller()
export class SubscriberController {
  constructor(private subscirberService: SubscriberService) {}

  // http event for unbuscriber with userId
  @Post('unsubscribe')
  unsbuscribe(
    @Query('unsubscribeId') unsubscribeId: string,
    @Res() res: Response,
  ): void {
    this.subscirberService.unsubscrbe(unsubscribeId);
    res.status(HttpStatus.OK).send('ok');
  }

  // // transmitted through sendgrid under unsubscribe.sendgrid.bespoke.surf
  // // check inboud parse settings
  // @Post('inbound-unsubscribe')
  // inboundUnsubscribe(@Body() body: { to: string }, @Res() res: Response): void {
  //   this.subscriberListService.inboudUnsubscribe(body.to);
  //   res.status(HttpStatus.OK).send('ok');
  // }
}
