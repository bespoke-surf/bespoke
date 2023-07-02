import * as aws from '@aws-sdk/client-ses';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectSentry, SentryService } from '@ntegral/nestjs-sentry';
import { Redis } from 'ioredis';
import nodemailer from 'nodemailer';
import htmlToText from 'nodemailer-html-to-text';
import Mail from 'nodemailer/lib/mailer';
import invariant from 'tiny-invariant';
import { EnvironmentVariables } from '../types';
import { automatedEmailFailedTemplate } from './emailsTemplates/automatedEmailFailed';
import { newSubscriberNotificationTemplate } from './emailsTemplates/newSubscriberNotificationTemplate';
import { shopifyCustomerDataErasureRequestTemplate } from './emailsTemplates/shopifyCustomerDataErasureRequestTemplate';
import { shopifyCustomerDataRequestTemplate } from './emailsTemplates/shopifyCustomerDataRequestTemplate';
import { shopifyShopRedactTemplate } from './emailsTemplates/shopifyShopRedactTemplate';
import { signupOrLoginEmailTemplate } from './emailsTemplates/signupOrLoginEmailTemplate';
import { createConfirmationCode } from './utils/codeGenerator';

@Injectable()
export class SesService {
  ses;
  emailDomain;
  supportEmail;
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    @InjectSentry() private readonly sentryClient: SentryService,
    @InjectRedis() private redis: Redis,
  ) {
    const AWS_SES_ACCESS_KEY = this.configService.get('AWS_ACCESS_KEY_ID');
    const AWS_SES_SECRET_ACCESS_KEY = this.configService.get(
      'AWS_SECRET_ACCESS_KEY',
    );
    invariant(typeof AWS_SES_ACCESS_KEY === 'string', 'aws access key');
    invariant(
      typeof AWS_SES_SECRET_ACCESS_KEY === 'string',
      'aws secret access key',
    );
    const emailDomain = this.configService.get('EMAIL_DOMAIN');
    const supportEmail = this.configService.get('SUPPORT_EMAIL');
    const sesRegion = this.configService.get('SES_REGION');
    invariant(typeof emailDomain === 'string', 'EMAIL_DOMAIN is missing');
    invariant(typeof supportEmail === 'string', 'SUPPORT EMAIL is missing');
    invariant(typeof sesRegion === 'string', 'SES_REGION is missing');

    this.emailDomain = emailDomain;
    this.supportEmail = supportEmail;

    this.ses = new aws.SES({
      apiVersion: '2010-12-01',
      region: sesRegion,
      credentialDefaultProvider: defaultProvider,
    });
  }

  async send(email: Mail.Options[]) {
    const sendingRate = this.configService.get('SES_SENDING_RATE');
    invariant(typeof sendingRate === 'string', 'SES_SENDING_RATE is missing');
    const messages = [...email];
    const transporter = nodemailer.createTransport({
      SES: { ses: this.ses, aws },
      sendingRate: Number(sendingRate),
    });
    transporter.use('compile', htmlToText.htmlToText());
    transporter.once('idle', () => {
      if (transporter.isIdle()) {
        const message = messages.shift();
        if (message) {
          transporter.sendMail(message, (err) => {
            console.log(err);
            this.sentryClient.instance().captureException(err);
          });
        }
        if (!message) {
          transporter.close();
        }
      }
    });
  }

  async sendLoginOrSignupCode(email: string, userId: string) {
    try {
      const loginOrSignupCode = await createConfirmationCode(
        userId,
        this.redis,
      );
      console.log(this.emailDomain, this.supportEmail, 'email domain');
      const mail: Mail.Options = {
        from: `Bespoke <no-reply@${this.emailDomain}>`,
        to: email,
        subject: `Your temporary Bespoke login code is ${loginOrSignupCode}`,
        replyTo: this.supportEmail,
        html: signupOrLoginEmailTemplate({
          loginOrSignupCode,
        }),
      };
      this.send([mail]);
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }

  async newSubscriber(
    senderEmail: string,
    subdomain: string,
    listName: string,
    subscriberEmail: string,
  ) {
    try {
      const FRONTEND_HOST = this.configService.get('FRONTEND_HOST');
      const FRONTEND_HOST_PROTOCOL = this.configService.get(
        'FRONTEND_HOST_PROTOCOL',
      );
      invariant(typeof FRONTEND_HOST === 'string', 'FRONTEND_HOST missing');
      invariant(
        typeof FRONTEND_HOST_PROTOCOL === 'string',
        'FRONTEND_HOST_PROTOCOL missing',
      );
      const notificationPage = `${FRONTEND_HOST_PROTOCOL}//${subdomain}.${FRONTEND_HOST}/settings/notifications`;

      const mail: Mail.Options = {
        from: `Bespoke <no-reply@${this.emailDomain}>`,
        to: senderEmail,
        subject: `${subscriberEmail} just susbscribed`,
        replyTo: this.supportEmail,
        html: newSubscriberNotificationTemplate({
          notificationPage,
          listName,
          subscriberEmail,
        }),
      };

      this.send([mail]);
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }

  async automatedEmailFailed(
    email: string,
    subdomain: string,
    emailSubject: string,
  ) {
    try {
      const FRONTEND_HOST = this.configService.get('FRONTEND_HOST');
      const FRONTEND_HOST_PROTOCOL = this.configService.get(
        'FRONTEND_HOST_PROTOCOL',
      );
      invariant(typeof FRONTEND_HOST === 'string', 'FRONTEND_HOST missing');
      invariant(
        typeof FRONTEND_HOST_PROTOCOL === 'string',
        'FRONTEND_HOST_PROTOCOL missing',
      );
      const planPage = `${FRONTEND_HOST_PROTOCOL}//${subdomain}.${FRONTEND_HOST}/plans`;

      const mail: Mail.Options = {
        from: `Bespoke <no-reply@${this.emailDomain}`,
        to: email,
        subject: `Your automated email "${emailSubject}" was revoked from sending`,
        replyTo: this.supportEmail,
        html: automatedEmailFailedTemplate({
          planPage,
          emailSubject,
        }),
      };
      this.send([mail]);
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }
  async shopifyCustomerDataRequest(
    email: string,
    subdomain: string,
    subscriberId: string,
    subscriberEmail: string,
  ) {
    try {
      const FRONTEND_HOST = this.configService.get('FRONTEND_HOST');
      const FRONTEND_HOST_PROTOCOL = this.configService.get(
        'FRONTEND_HOST_PROTOCOL',
      );
      invariant(typeof FRONTEND_HOST === 'string', 'FRONTEND_HOST missing');
      invariant(
        typeof FRONTEND_HOST_PROTOCOL === 'string',
        'FRONTEND_HOST_PROTOCOL missing',
      );

      const subscriberPage = `${FRONTEND_HOST_PROTOCOL}//${subdomain}.${FRONTEND_HOST}/subscribers/${subscriberId}`;
      const subscriberExportCsvLink = `${FRONTEND_HOST_PROTOCOL}//${subdomain}.${FRONTEND_HOST}/subscribers/${subscriberId}/subscriber-export`;
      const subscriberAddressExportCsvLink = `${FRONTEND_HOST_PROTOCOL}//${subdomain}.${FRONTEND_HOST}/subscribers/${subscriberId}/subscriber-address-export`;

      const mail: Mail.Options = {
        from: `Bespoke <no-reply@${this.emailDomain}>`,
        to: email,
        subject: `Bespoke subscriber data requested via Shopify`,
        replyTo: this.supportEmail,
        html: shopifyCustomerDataRequestTemplate({
          dataGeneratedForEmail: subscriberEmail,
          subscriberAddressExportCsvLink,
          subscriberExportCsvLink,
          subscriberPage,
        }),
      };
      this.send([mail]);
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }

  async shopifyCustomerDataErasureRequest(
    email: string,
    subscriberEmail: string,
  ) {
    try {
      const mail: Mail.Options = {
        from: `Bespoke <no-reply@${this.emailDomain}>`,
        to: email,
        subject: `Bespoke Subscriber data erasure requested via Shopify`,
        replyTo: this.supportEmail,
        html: shopifyCustomerDataErasureRequestTemplate({
          dataGeneratedForEmail: subscriberEmail,
        }),
      };
      this.send([mail]);
    } catch (err) {
      console.log(err);
    }
  }
  async shopifyShopRedactRequest(email: string, shopifyStore: string) {
    try {
      const FRONTEND_HOST = this.configService.get('FRONTEND_HOST');
      const FRONTEND_HOST_PROTOCOL = this.configService.get(
        'FRONTEND_HOST_PROTOCOL',
      );
      invariant(typeof FRONTEND_HOST === 'string', 'FRONTEND_HOST missing');
      invariant(
        typeof FRONTEND_HOST_PROTOCOL === 'string',
        'FRONTEND_HOST_PROTOCOL missing',
      );

      const mail: Mail.Options = {
        from: `Bespoke <no-reply@${this.emailDomain}>`,
        to: email,
        subject: `Bespoke Shopify Shop Redact Request`,
        replyTo: this.supportEmail,
        html: shopifyShopRedactTemplate({ shopifyStore }),
      };
      this.send([mail]);
    } catch (err) {
      console.log(err);
      this.sentryClient.instance().captureException(err);
    }
  }
}
