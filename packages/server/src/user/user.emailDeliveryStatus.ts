import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { EmailDeliveryStatus } from './enum/emailDeliveryStatus.enum';
import { User, UserEmailDeliveryStatus } from './user.entity';

@Injectable()
export class UserEmailDeliveryStatusService {
  constructor(
    @InjectRepository(UserEmailDeliveryStatus)
    private userEmailDeliveryStatus: Repository<UserEmailDeliveryStatus>,
  ) {}

  async createEmailDeliveryStatus(
    user: User,
  ): Promise<UserEmailDeliveryStatus> {
    return await this.userEmailDeliveryStatus.save({
      user,
    });
  }

  async getEmailDeliveryStatus(
    userId: string,
  ): Promise<UserEmailDeliveryStatus | null> {
    try {
      const emailDeliveryStatus = await this.userEmailDeliveryStatus.findOne({
        where: {
          user: {
            id: userId,
          },
        },
      });
      return emailDeliveryStatus ?? null;
    } catch (err) {
      return null;
    }
  }

  async emailDeliveryStatusToBounced(
    emailDeliveryStatusId: string,
  ): Promise<UpdateResult | null> {
    try {
      return await this.userEmailDeliveryStatus.update(emailDeliveryStatusId, {
        emailDeliveryStatus: EmailDeliveryStatus.BOUNCED,
      });
    } catch (err) {
      return null;
    }
  }

  async incrementEmailDeliverySoftBounceCount(
    emailDeliveryStatusId: string,
  ): Promise<UpdateResult | null> {
    try {
      const emailDeliveryStatus = await this.userEmailDeliveryStatus.findOne({
        where: {
          id: emailDeliveryStatusId,
        },
      });

      const dropedCount = (emailDeliveryStatus?.softBounceCount ?? 0) + 1;

      return await this.userEmailDeliveryStatus.update(emailDeliveryStatusId, {
        softBounceCount: dropedCount,
        emailDeliveryStatus:
          dropedCount >= 7
            ? EmailDeliveryStatus.BOUNCED
            : emailDeliveryStatus?.emailDeliveryStatus,
      });
    } catch (err) {
      return null;
    }
  }
}
