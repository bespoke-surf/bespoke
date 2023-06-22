import {
  BadGatewayException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKeyService } from '../apiKey/apiKey.service';
import { SubscriberApiService } from '../subscriber/subscriber.api.service';
import { Subscriber } from '../subscriber/subscriber.entity';
import { SubscriberService } from '../subscriber/subscriber.service';
import { CreateSubscriberDto } from './controller/dto/createSubscriber.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Injectable()
export class UserApiService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly userService: UserService,
    private readonly subscriberService: SubscriberService,
    private readonly subscriberApiService: SubscriberApiService,
    private readonly apiKeyService: ApiKeyService,
  ) {}

  async createSubscriber(
    body: CreateSubscriberDto,
    apiKey: string,
  ): Promise<Subscriber> {
    const { email, firstName, lastName, location, phoneNumber } =
      body.data.attributes;

    const api = await this.apiKeyService.getApiKey(apiKey);

    if (!api) throw new ForbiddenException();

    const userExist = await this.userRepo.findOneBy({
      email: body.data.attributes.email,
    });
    if (userExist) throw new ConflictException();

    const user = await this.userService.createUserWithEmailAndNoName(email);
    if (!user) throw new BadGatewayException();

    const subscriber = await this.subscriberService.createSubscriber(
      api.storeId,
      user?.id,
      firstName,
      lastName,
      phoneNumber,
    );
    if (!subscriber) throw new BadGatewayException();

    if (location) {
      const { address1, address2, city, country, state, zipCode } = location;
      await this.subscriberService.addOrUpdateSubscriberAddress({
        subscriber,
        address1,
        address2,
        city,
        country,
        state,
        zipCode,
      });
    }

    const sub = await this.subscriberApiService.getSubscriber(subscriber.id);
    if (!sub) throw new BadGatewayException();
    return sub;
  }
}
