import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../store/store.entity';
import { About } from './about.entity';
import { UpdateAboutInput } from './dto/updateAboutInput';
import { AboutIndustryEnum } from './enum/industry.enum';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private readonly aboutRepo: Repository<About>,
  ) {}

  async createAbout(store: Store): Promise<About | null> {
    const newAbout = await this.aboutRepo.save({
      store,
    });
    return newAbout ?? null;
  }

  async updateAbout(input: UpdateAboutInput): Promise<null> {
    const { aboutId, ...rest } = input;

    await this.aboutRepo.update(aboutId, {
      ...rest,
    });

    return null;
  }

  async updateIndustry(
    industry: AboutIndustryEnum,
    aboutId: string,
  ): Promise<null> {
    await this.aboutRepo.update(aboutId, {
      industry,
    });
    return null;
  }

  async getAbout(subdomain: string): Promise<About | null> {
    const about = await this.aboutRepo.findOne({
      where: {
        store: {
          subdomain,
        },
      },
    });
    return about ?? null;
  }
}
