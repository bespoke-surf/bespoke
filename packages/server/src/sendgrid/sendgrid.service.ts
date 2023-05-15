import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import type { Client } from '@sendgrid/client';
import SendgridClient from '@sendgrid/client';
import SendGrid from '@sendgrid/mail';
import dayjs from 'dayjs';
import invariant from 'tiny-invariant';
import { EnvironmentVariables } from '../types';
import { welcomeEmailTemplate } from './welcomeEmail';
@Injectable()
export class SendgridService {
  sendGridClient: Client;
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    @InjectSentry() private readonly sentryClient: SentryService,
  ) {
    const apikey = this.configService.get('SENDGRID_API_KEY');
    invariant(typeof apikey === 'string', 'sendgrid api key missing');
    SendGrid.setApiKey(apikey);
    SendgridClient.setApiKey(apikey);
    this.sendGridClient = SendgridClient;
  }

  async send(mail: SendGrid.MailDataRequired[] | SendGrid.MailDataRequired) {
    try {
      await SendGrid.send(mail);
    } catch (err) {
      console.log('threw error');
      console.log(err);
      console.log(JSON.stringify(err));
      this.sentryClient.instance().captureException(err);
    }
  }

  async welcomeEmail(email: string) {
    try {
      const mail: SendGrid.MailDataRequired = {
        from: 'Afi <hafiz@bespoke.surf>',
        to: email,
        subject: `Welcome to Bespoke`,
        replyTo: 'hafiz@bespoke.surf',
        html: welcomeEmailTemplate(),
        text: `
bespoke logo ( https://bespoke.surf )

Hey there,

Thanks for signing up! We created Bespoke through the lens of empowering humanity to become financially independent.

A few recommended features to try out are, Workflow Automation, Newsletter with products inserted and especially our community section.

Let me know how your onboarding experience went, I'd love to hear your response. Also, if you have any questions or suggestions just hit reply.

Afi,
Founder @ Bespoke

PS: Don't forget to add a display picture for your account. It's under Business Profile in the Settings page.
`,
        sendAt: dayjs().add(42).unix(),
      };
      await this.send(mail);
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }
}
