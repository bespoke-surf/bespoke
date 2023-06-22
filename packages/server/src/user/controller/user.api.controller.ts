import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ApiKeyAccessScopeEnum } from '../../apiKey/enum/apikScopeEnum';
import { AppAbility } from '../../casl/casl-ability.factory/casl-ability.factory';
import { ApiKey } from '../../decorator/ApiKeyId';
import { CheckPolicies } from '../../decorator/checkPolicies';
import { ApiKeyAuthGurad } from '../../guard/api/apiKeyAuthGuard';
import { ApiPoliciesGuard } from '../../guard/api/apiPoliciesGuard';
import { ThrottlerForApiGuard } from '../../guard/throttleForApiGuard';
import { ExceptionResponse } from '../../resposes/response';
import { Subscriber } from '../../subscriber/subscriber.entity';
import { ApiVersion } from '../../utils/constants';
import { UserApiService } from '../user.api.service';
import { CreateSubscriberDto } from './dto/createSubscriber.dto';

@UseGuards(ApiKeyAuthGurad)
@UseGuards(ThrottlerForApiGuard)
@UseGuards(ApiPoliciesGuard)
@ApiHeader({
  name: 'revision',
  description: 'API endpoint revision (format: YYYY-MM-DD[.suffix])',
  required: true,
  schema: {
    default: ApiVersion.June23,
  },
})
@ApiResponse({ status: '4XX', type: ExceptionResponse })
@ApiResponse({ status: '5XX', type: ExceptionResponse })
@Controller()
export class UserApiController {
  constructor(private readonly userApiService: UserApiService) {}

  @Throttle(700, 60)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(ApiKeyAccessScopeEnum.SUBSCRIBER_MANAGE, Subscriber),
  )
  @ApiOperation({
    summary: 'Create Subscriber',
    description:
      'Create a new Subscriber. Default email status is `SUBSCRIBED` to all list.<br><br>*Rate limit*:<br>Limit: 700<br>TTL: 60s\n\n**Scopes:**\n`subscriber:manage`',
  })
  @ApiOkResponse({ description: 'Create New Subscriber', type: Subscriber })
  @ApiTags('Subscriber')
  @Post('api/subscriber')
  createSubscriber(
    @Body() body: CreateSubscriberDto,
    @ApiKey() apiKey: string,
  ): Promise<Subscriber> {
    return this.userApiService.createSubscriber(body, apiKey);
  }
}
