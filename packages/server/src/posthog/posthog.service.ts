import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {} from 'posthog-node';
import { PostHog } from 'posthog-node';
import invariant from 'tiny-invariant';
import { EnvironmentVariables } from '../types';

@Injectable()
export class PosthogService {
  private posthog: PostHog;
  private readonly logger = new Logger(PosthogService.name);

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {
    const postHogKey = this.configService.get('POSTHOG_KEY');
    const NODE_ENV = this.configService.get('NODE_ENV');
    invariant(typeof postHogKey === 'string', 'POSTHOG_KEY is missing');
    invariant(typeof NODE_ENV === 'string', 'NODE_ENV is missing');
    this.posthog = new PostHog(
      postHogKey,
      {
        host: 'https://app.posthog.com',
        enable: NODE_ENV === 'production' ? true : false,
      }, // You can omit this line if using PostHog Cloud
    );
  }

  /**
   * Capture allows you to capture anything a user does within your system,
   * which you can later use in PostHog to find patterns in usage,
   * work out which features to improve or where people are giving up.
   */
  capture(args: PosthogCaptureArgs): void {
    this.logger.debug(args, 'received Posthog capture event');
    return this.posthog.capture(args);
  }

  /**
   * Identify lets you add metadata on your users so you can more easily identify who they are in PostHog,
   * and even do things like segment users by these properties.
   */
  identify(args: PosthogIdentifyArgs) {
    this.logger.debug(args, 'ran Posthog identify method');
    return this.posthog.identify(args);
  }
}

export interface PosthogCaptureArgs {
  /**
   * Uniquely identifies your user
   */
  distinctId: string;
  /**
   * which can be a object with any information you'd like to add
   */
  properties?: Record<string | number, any>;
  /**
   * We recommend using [verb] [noun], like movie played or movie
   * updated to easily identify what your events mean later on.
   */
  event: string;
  /**
   * object of what groups are related to this event, example:
   * { company: 'id:5' }. Can be used to analyze companies
   * instead of users.
   */
  groups?: Record<string, string | number>;
  /** 
   @param sendFeatureFlags OPTIONAL | Used with experiments. Determines whether to send feature flag values with the event.
   */
  sendFeatureFlags?: boolean;
}

export interface PosthogIdentifyArgs {
  /**
   * Uniquely identifies your user
   */
  distinctId: string;

  /**
   * which can be a object with any information you'd like to add
   */
  properties?: Record<string | number, any>;
}
