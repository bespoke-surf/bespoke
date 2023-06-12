import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { Repository } from 'typeorm';
import { ApiKey } from './apiKey.entity';
import { ApiAccessLevel } from './enum/apiAccessLevel';
import { ApiKeyAccessScopeEnum } from './enum/apikScopeEnum';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey) private apiKeyRepo: Repository<ApiKey>,
  ) {}

  async createApiKey(
    storeId: string,
    name: string,
    accessLevel: ApiAccessLevel,
    scopes?: ApiKeyAccessScopeEnum[],
  ) {
    console.log({ storeId, name, accessLevel, scopes });
    let accessScope: ApiKeyAccessScopeEnum[] = [];
    let level;

    if (accessLevel === ApiAccessLevel.READ) {
      accessScope = Object.values(ApiKeyAccessScopeEnum).filter((scope) =>
        scope.endsWith(':read'),
      );
      level = ApiAccessLevel.READ;
    }
    if (accessLevel === ApiAccessLevel.FULL) {
      accessScope = Object.values(ApiKeyAccessScopeEnum).filter((scope) =>
        scope.endsWith(':manage'),
      );
      level = ApiAccessLevel.FULL;
    }

    if (accessLevel === ApiAccessLevel.CUSTOM && scopes) {
      accessScope = scopes;
      level = ApiAccessLevel.CUSTOM;
    }
    console.log({ accessScope, accessLevel, level });
    await this.apiKeyRepo.save({
      storeId,
      name,
      key: nanoid(),
      scopes: accessScope,
      accessLevel: level,
    });
    return null;
  }

  async getApiKeys(subdomain: string): Promise<ApiKey[]> {
    const apiKeys = await this.apiKeyRepo.find({
      where: {
        store: {
          subdomain,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return apiKeys;
  }

  async getApiKey(apiKey: string): Promise<ApiKey | null> {
    try {
      const api = await this.apiKeyRepo.findOne({
        where: { key: apiKey },
      });
      if (!api) return null;
      return api;
    } catch (err) {
      return null;
    }
  }

  async deleteApiKey(id: string): Promise<null> {
    const apiKey = await this.apiKeyRepo.findOne({ where: { id } });
    if (apiKey) {
      await this.apiKeyRepo.remove(apiKey);
    }
    return null;
  }
}
