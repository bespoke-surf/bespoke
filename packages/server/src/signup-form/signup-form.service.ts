import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemSignupFormData } from '../item/enums/itemData';
import { ItemService } from '../item/item.service';
import { MetricService } from '../metric/metirc.service';
import { StoreItemService } from '../store-item/store-item.service';
import { CreateSignupFormInput } from '../store/dto/createSignupForm';
import { AddSignupFormItem } from './dto/addSignupFormItem';
import { UpdateSignupformInput } from './dto/updateSignupFormInput';
import { SignupFormState } from './enum/signupFormState.enum';
import { SignupForm } from './signup-form.entity';
@Injectable()
export class SignupFormService {
  constructor(
    @InjectRepository(SignupForm)
    private readonly signupFormRepo: Repository<SignupForm>,
    private eventEmitter: EventEmitter2,
    private itemService: ItemService,
    private storeItemService: StoreItemService,
    private metricService: MetricService,
  ) {}

  async emitEvent(eventName: string, signupFormId: string) {
    const getPost = await this.signupFormRepo.findOne({
      where: { id: signupFormId },
      relations: { store: { user: true } },
    });
    this.eventEmitter.emit(eventName, getPost);
  }

  async getSignupForms(subdomain: string): Promise<SignupForm[] | null> {
    const forms = await this.signupFormRepo.find({
      where: {
        store: {
          subdomain,
        },
      },
      relations: {
        list: true,
      },
    });
    return forms ?? null;
  }

  async getSignupForm(id: string): Promise<SignupForm | null> {
    const forms = await this.signupFormRepo.findOne({
      where: {
        id,
      },
      relations: {
        list: true,
      },
    });
    return forms ?? null;
  }

  async getSignupFormsWithStoreId(
    storeId: string,
  ): Promise<SignupForm[] | null> {
    const forms = await this.signupFormRepo.find({
      where: {
        store: { id: storeId },
      },
    });
    return forms ?? null;
  }

  async getLiveSignupformsWithStoreId(
    storeId: string,
  ): Promise<SignupForm[] | null> {
    const forms = await this.signupFormRepo.find({
      where: {
        formState: SignupFormState.LIVE,
        store: { id: storeId },
      },
    });
    return forms ?? null;
  }

  async deleteSignupForm(signupFormId: string): Promise<null> {
    await this.signupFormRepo.delete(signupFormId);
    return null;
  }

  async createSignupForm(
    input: CreateSignupFormInput,
  ): Promise<SignupForm | null> {
    try {
      const form = await this.signupFormRepo.save({
        formState: SignupFormState.DRAFT,
        ...input,
      });
      return form ?? null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async updateSignupForms(input: UpdateSignupformInput): Promise<null> {
    const { signupFormId, ...rest } = input;
    await this.signupFormRepo.update(signupFormId, {
      ...rest,
    });
    return null;
  }

  async incremetFormView(formId: string): Promise<null> {
    const form = await this.signupFormRepo.findOne({ where: { id: formId } });

    if (!form) return null;

    await this.metricService.createFormViewedMetric(
      formId,
      form.name ?? '',
      form.storeId,
    );

    return null;
  }

  async incrementFormSubmission(formId: string): Promise<null> {
    const form = await this.signupFormRepo.findOne({ where: { id: formId } });
    if (!form) return null;

    await this.metricService.createFormSubmittedMetric(
      formId,
      form.name ?? '',
      form.storeId,
    );

    return null;
  }

  async getFormViewedCount(signupForm: SignupForm): Promise<number> {
    const viewCount = await this.metricService.getFormViewedCount(
      signupForm.id,
    );
    return viewCount;
  }
  async getFormSubmittedCount(signupForm: SignupForm): Promise<number> {
    const viewCount = await this.metricService.getFormSubmittedCount(
      signupForm.id,
    );
    return viewCount;
  }

  async getFormSubmitRate(signupForm: SignupForm): Promise<number> {
    const viewCount = await this.metricService.getFormViewedCount(
      signupForm.id,
    );

    const submittedCount = await this.metricService.getFormSubmittedCount(
      signupForm.id,
    );

    if (viewCount === 0) return 0;
    const rate = Math.round((submittedCount / viewCount) * 100);
    return rate ?? 0;
  }

  async addSignupFormItem(
    input: AddSignupFormItem,
  ): Promise<SignupForm | null> {
    const storeItem = await this.storeItemService.getStoreItem(
      input.itemId,
      input.storeId,
    );
    if (!storeItem) return null;

    const item = await this.itemService.getItemWithItemCategory(input.itemId);
    if (!item) return null;

    const data = item.data as ItemSignupFormData;

    const signupForm = await this.signupFormRepo.save({
      name: item?.name,
      formState: SignupFormState.DRAFT,
      form: {
        body: '',
        css: '',
        fonts: '',
        html: '',
        js: '',

        design: JSON.stringify(data.formDesign),
      },
      success: {
        body: '',
        css: '',
        fonts: '',
        html: '',
        js: '',
        design: JSON.stringify(data.successDesign),
      },
      listId: input.listId,
      storeId: input.storeId,
    });
    return signupForm;
  }

  async getTotalSubmittedForm(subdomain: string): Promise<number> {
    const count = await this.metricService.getTotalFormSubmittedCount(
      subdomain,
    );
    return count;
  }

  async getTotalFormSubmitRate(subdomain: string): Promise<number> {
    const submittedCount = await this.metricService.getTotalFormSubmittedCount(
      subdomain,
    );

    const viewCount = await this.metricService.getTotalFormViewedCount(
      subdomain,
    );

    if (viewCount === 0) return 0;
    const rate = Math.round((submittedCount / viewCount) * 100);
    return rate ?? 0;
  }

  async getSignupFormCount(storeId: string): Promise<number> {
    return await this.signupFormRepo.count({ where: { storeId } });
  }
}
