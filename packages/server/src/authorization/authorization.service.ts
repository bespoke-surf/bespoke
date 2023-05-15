import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { About } from '../about/about.entity';
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

@Injectable()
export class AuthorizationService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Store)
    private storeRepo: Repository<Store>,
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(SignupForm)
    private signupForm: Repository<SignupForm>,
    @InjectRepository(Shopify)
    private shopifyRepo: Repository<Shopify>,
    @InjectRepository(Integration)
    private integrationRepo: Repository<Integration>,
    @InjectRepository(List)
    private listRepo: Repository<List>,
    @InjectRepository(Subscriber)
    private subscriberRepo: Repository<Subscriber>,
    @InjectRepository(Workflow)
    private workflowRepo: Repository<Workflow>,
    @InjectRepository(WorkflowState)
    private workflowStateRepo: Repository<WorkflowState>,
    @InjectRepository(About)
    private aboutRepo: Repository<About>,
  ) {}

  async validUser(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    return user;
  }

  async hasStoreAccess(userId: string, storeId: string) {
    const store = await this.storeRepo.findOne({
      where: { id: storeId },
      relations: { user: true },
    });
    if (store?.user.id === userId) return true;
    return false;
  }

  async hasStoreAccessWithPost(userId: string, postId: string) {
    const post = await this.postRepo
      .createQueryBuilder('post')
      .where('post.id =:postId', { postId })
      .leftJoinAndSelect('post.store', 'store')
      .leftJoinAndSelect('store.user', 'user')
      .andWhere('user.id =:userId', { userId })
      .getOne();

    if (post) return true;
    return false;
  }

  async hasStoreAccessWithProduct(userId: string, productId: string) {
    const post = await this.productRepo
      .createQueryBuilder('product')
      .where('product.id = :productId', { productId })
      .leftJoinAndSelect('product.store', 'store')
      .leftJoinAndSelect('store.user', 'user')
      .andWhere('user.id =:userId', { userId })
      .getOne();

    if (post) return true;
    return false;
  }

  async hasStoreAccessWithSignupForm(userId: string, signupFormId: string) {
    const post = await this.signupForm
      .createQueryBuilder('signupForm')
      .where('signupForm.id =:signupFormId', { signupFormId })
      .leftJoinAndSelect('signupForm.store', 'store')
      .leftJoinAndSelect('store.user', 'user')
      .andWhere('user.id =:userId', { userId })
      .getOne();

    if (post) return true;
    return false;
  }
  async hasStoreAccessWithSubdomain(userId: string, subdomain: string) {
    const store = await this.storeRepo
      .createQueryBuilder('store')
      .where('store.subdomain=:subdomain', { subdomain })
      .leftJoinAndSelect('store.user', 'user')
      .andWhere('user.id =:userId', { userId })
      .getOne();

    if (store) return true;
    return false;
  }
  async hasStoreAccessWithShopify(userId: string, shopifyId: string) {
    const shopify = await this.shopifyRepo
      .createQueryBuilder('shopify')
      .where('shopify.id =:shopifyId', { shopifyId })
      .leftJoinAndSelect('shopify.integration', 'integration')
      .leftJoinAndSelect('integration.store', 'store')
      .leftJoinAndSelect('store.user', 'user')
      .andWhere('user.id =:userId', { userId })
      .getOne();
    if (shopify) return true;
    return false;
  }

  async hasStoreAccessWithIntegration(userId: string, integrationId: string) {
    const integration = await this.integrationRepo
      .createQueryBuilder('integration')
      .where('integration.id =:integrationId', { integrationId })
      .leftJoinAndSelect('integration.store', 'store')
      .leftJoinAndSelect('store.user', 'user')
      .andWhere('user.id =:userId', { userId })
      .getOne();
    if (integration) return true;
    return false;
  }

  async hasStoreAccessWithList(userId: string, listId: string) {
    const list = await this.listRepo
      .createQueryBuilder('list')
      .where('list.id =:listId', { listId })
      .leftJoinAndSelect('list.store', 'store')
      .leftJoinAndSelect('store.user', 'user')
      .andWhere('user.id =:userId', { userId })
      .getOne();
    if (list) return true;
    return false;
  }

  async hasStoreAccessWithSubscriber(userId: string, subscriberId: string) {
    const list = await this.subscriberRepo
      .createQueryBuilder('subscriber')
      .where('subscriber.id =:subscriberId', { subscriberId })
      .leftJoinAndSelect('subscriber.store', 'store')
      .leftJoinAndSelect('store.user', 'user')
      .andWhere('user.id =:userId', { userId })
      .getOne();
    if (list) return true;
    return false;
  }

  async hasStoreAccessWithWorkflow(userId: string, workflowId: string) {
    const list = await this.workflowRepo
      .createQueryBuilder('workflow')
      .where('workflow.id =:workflowId', { workflowId })
      .leftJoinAndSelect('workflow.store', 'store')
      .leftJoinAndSelect('store.user', 'user')
      .andWhere('user.id =:userId', { userId })
      .getOne();
    if (list) return true;
    return false;
  }

  async hasStoreAccessWithWorkflowState(
    userId: string,
    workflowStateId: string,
  ) {
    const list = await this.workflowStateRepo
      .createQueryBuilder('workflowState')
      .where('workflowState.id =:workflowStateId', { workflowStateId })
      .leftJoinAndSelect('workflowState.workflow', 'workflow')
      .leftJoinAndSelect('workflow.store', 'store')
      .leftJoinAndSelect('store.user', 'user')
      .andWhere('user.id =:userId', { userId })
      .getOne();
    if (list) return true;
    return false;
  }

  async hasStoreAccessWithAbout(userId: string, aboutId: string) {
    const list = await this.aboutRepo
      .createQueryBuilder('about')
      .where('about.id =:aboutId', { aboutId })
      .leftJoinAndSelect('about.store', 'store')
      .leftJoinAndSelect('store.user', 'user')
      .andWhere('user.id =:userId', { userId })
      .getOne();
    if (list) return true;
    return false;
  }
}
