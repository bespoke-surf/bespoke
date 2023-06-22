import { Controller, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';
import { SubscriberListService } from '../subscriber-list/subscriber-list.service';

@ApiExcludeController()
@Controller('subscriber')
export class SubscriberListController {
  constructor(private subscirberListService: SubscriberListService) {}

  // http event to unbuscriber - received from unsubscribe events from List-Unsubscribe
  @Post('unsubscribe')
  unsbuscribe(
    @Query('unsubscribeId') unsubscribeId: string,
    @Res() res: Response,
  ): void {
    this.subscirberListService.unsubscribe(unsubscribeId);
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
