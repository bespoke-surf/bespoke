import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { BESPOKE_API_KEY } from '../utils/constants';

@Injectable()
export class ThrottlerForApiGuard extends ThrottlerGuard {
  protected getTracker(req: Record<string, any>): string {
    const apiKey = req.headers[BESPOKE_API_KEY.toLowerCase()] as string;
    return apiKey;
  }
}
