import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOneOptions,
  FindOptionsWhere,
  ObjectId,
  Repository,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UserEmailDeliveryStatusService } from './user.emailDeliveryStatus';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private userEmailDeliveryStatusService: UserEmailDeliveryStatusService,
  ) {}

  async createUser({
    email,
    name,
    stripeCustomerId,
  }: {
    email: string;
    name?: string;
    stripeCustomerId?: string;
  }): Promise<User> {
    const user = await this.userRepo.save({
      email,
      name,
      stripeCustomerId,
    });
    await this.userEmailDeliveryStatusService.createEmailDeliveryStatus(user);
    return user;
  }

  async findOne(options: FindOneOptions<User>): Promise<User | null> {
    return this.userRepo.findOne(options);
  }

  async update(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<User>,
    partialEntity: QueryDeepPartialEntity<User>,
  ): Promise<UpdateResult> {
    return this.userRepo.update(criteria, partialEntity);
  }
}
