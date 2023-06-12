import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { About } from '../about/about.entity';
import { ApiKey } from '../apiKey/apiKey.entity';
import { Integration } from '../integration/integration.entity';
import { List } from '../list/list.entity';
import { Post } from '../post/post.entity';
import { Product } from '../product/product.entity';
import { Shopify } from '../shopify/shopify.entity';
import { SignupForm } from '../signup-form/signup-form.entity';
import { Store } from '../store/store.entity';
import { Subscriber } from '../subscriber/subscriber.entity';
import { User } from '../user/user.entity';
import { WorkflowState } from '../workflow-state/workflow-state.entity';
import { Workflow } from '../workflow/workflow.entity';
import { AuthorizationService } from './authorization.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Store,
      Post,
      Product,
      SignupForm,
      Shopify,
      Integration,
      List,
      Subscriber,
      Workflow,
      WorkflowState,
      About,
      ApiKey,
    ]),
  ],
  providers: [AuthorizationService],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
