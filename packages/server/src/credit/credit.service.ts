import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credit } from './credit.entity';

@Injectable()
export class CreditService {
  constructor(
    @InjectRepository(Credit)
    private readonly creditRepo: Repository<Credit>,
  ) {}

  addGrowthPathPageCreditsEntity(storeId: string): Credit {
    const credit = new Credit();
    credit.storeId = storeId;
    credit.credited = 100;
    return credit;
  }

  // async creditCredits({
  //   storeId,
  //   credited,
  //   userId,
  // }: {
  //   storeId: string;
  //   credited: number;
  //   userId: string | undefined;
  // }) {
  //   await this.creditRepo.save({
  //     storeId,
  //     credited,
  //   });
  //   if (userId) {
  //     this.eventService.createEvent({
  //       eventAccessRestriction: EventAccessRestriction.HIGH,
  //       eventProducerId: storeId,
  //       eventState: EventState.COMPLETED,
  //       eventType: EventType.STORE,
  //       message: 'You received 1,000 Bonus Credits!',
  //       userId,
  //       showAsNotification: true,
  //     });
  //   }
  // }

  async debitCredits(storeId: string, debited: number) {
    await this.creditRepo.save({
      storeId,
      debited: debited,
    });
  }

  async getStoreCredis(storeId: string) {
    const response = await this.creditRepo
      .createQueryBuilder('credits')
      .where('credits.storeId = :storeId', { storeId })
      .select('SUM(credited)', 'creditedSum')
      .addSelect('SUM(debited)', 'debitedSum')
      .getRawMany();

    const { creditedSum, debitedSum } = response[0];

    return Number(creditedSum) - Number(debitedSum);
  }
}
