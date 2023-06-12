import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Equal, Repository } from 'typeorm';
import { ApiKeyService } from '../apiKey/apiKey.service';
import { CreateListDto } from './dto/createList';
import { UpdateListDto } from './dto/updateList';
import { List, listSelect } from './list.entity';

@Injectable()
export class ListApiService {
  constructor(
    @InjectRepository(List)
    private readonly listRepo: Repository<List>,
    private readonly apiKeyService: ApiKeyService,
  ) {}

  async getList(id: string): Promise<List> {
    const list = await this.listRepo.findOne({
      where: { id },
      select: listSelect,
    });
    if (!list) throw new NotFoundException();
    return list;
  }

  async getLists({
    apiKey,
    page = 1,
    limit = 100,
  }: {
    apiKey: string;
    limit?: number;
    page?: number;
  }): Promise<List[]> {
    if (limit > 100) limit = 100;
    const list = await this.listRepo.find({
      where: {
        store: {
          apiKey: {
            key: apiKey,
          },
        },
      },
      select: listSelect,
      take: limit,
      skip: limit * (page - 1),
    });
    return list;
  }

  async creatList(body: CreateListDto, apiKey: string): Promise<List> {
    try {
      const api = await this.apiKeyService.getApiKey(apiKey);
      const newList = await this.listRepo.save(
        {
          name: body.data.attributes.name,
          storeId: api?.storeId,
        },
        {},
      );
      if (!newList) throw new Error();
      const list = await this.listRepo.findOne({
        where: {
          id: newList.id,
        },
        select: listSelect,
      });
      if (!list) throw new Error();
      return list;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async deleteList(id: string, res: Response): Promise<void> {
    try {
      const list = await this.listRepo.findOneOrFail({
        where: { id },
      });
      await this.listRepo.remove(list);
      res.sendStatus(HttpStatus.NO_CONTENT);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async updateList(body: UpdateListDto): Promise<List> {
    try {
      const list = await this.listRepo.findOneByOrFail({
        id: Equal(body.data.id),
      });
      if (!list) throw new Error();
      console.log({ list, body });

      await this.listRepo.update(list.id, {
        name: body.data.attributes.name,
      });

      const updateList = await this.listRepo.findOneOrFail({
        where: { id: body.data.id },
        select: listSelect,
      });
      return updateList;
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
