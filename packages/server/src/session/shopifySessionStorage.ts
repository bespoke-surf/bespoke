import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { SessionStorage } from '@nestjs-shopify/core';
import { Session } from '@shopify/shopify-api';
import type { Redis, RedisOptions } from 'ioredis';

export interface RedisSessionStorageOptions extends RedisOptions {
  sessionKeyPrefix: string;
  onError?: (...args: any[]) => void;
}
const defaultRedisSessionStorageOptions: RedisSessionStorageOptions = {
  sessionKeyPrefix: 'shopify_sessions',
};

export class ShopifySessionStorage implements SessionStorage {
  public readonly ready: Promise<void>;
  private options: RedisSessionStorageOptions;

  constructor(@InjectRedis() private readonly redis: Redis) {
    this.options = { ...defaultRedisSessionStorageOptions };
  }

  public async storeSession(session: Session): Promise<boolean> {
    await this.redis.set(
      this.fullKey(session.id),
      JSON.stringify(session.toPropertyArray()),
    );
    await this.addKeyToShopList(session);
    return true;
  }

  public async loadSession(id: string): Promise<Session | undefined> {
    await this.ready;

    let rawResult: any = await this.redis.get(this.fullKey(id));

    if (!rawResult) return undefined;
    rawResult = JSON.parse(rawResult);

    return Session.fromPropertyArray(rawResult);
  }

  public async deleteSession(id: string): Promise<boolean> {
    await this.ready;
    const session = await this.loadSession(id);
    if (session) {
      await this.removeKeyFromShopList(session.shop, id);
      await this.redis.del(this.fullKey(id));
    }
    return true;
  }

  public async deleteSessions(ids: string[]): Promise<boolean> {
    await this.ready;
    await Promise.all(ids.map((id) => this.deleteSession(id)));
    return true;
  }

  public async findSessionsByShop(shop: string): Promise<Session[]> {
    await this.ready;

    const idKeysArrayString = await this.redis.get(this.fullKey(shop));
    if (!idKeysArrayString) return [];

    const idKeysArray = JSON.parse(idKeysArrayString);
    const results: Session[] = [];
    for (const idKey of idKeysArray) {
      const rawResult = await this.redis.get(idKey);
      if (!rawResult) continue;

      const session = Session.fromPropertyArray(JSON.parse(rawResult));
      results.push(session);
    }

    return results;
  }

  public async disconnect(): Promise<void> {
    await this.redis.quit();
  }

  private fullKey(name: string): string {
    return `${this.options.sessionKeyPrefix}_${name}`;
  }

  private async addKeyToShopList(session: Session) {
    const shopKey = this.fullKey(session.shop);
    const idKey = this.fullKey(session.id);
    const idKeysArrayString = await this.redis.get(shopKey);

    if (idKeysArrayString) {
      const idKeysArray = JSON.parse(idKeysArrayString);

      if (!idKeysArray.includes(idKey)) {
        idKeysArray.push(idKey);
        await this.redis.set(shopKey, JSON.stringify(idKeysArray));
      }
    } else {
      await this.redis.set(shopKey, JSON.stringify([idKey]));
    }
  }

  private async removeKeyFromShopList(shop: string, id: string) {
    const shopKey = this.fullKey(shop);
    const idKey = this.fullKey(id);
    const idKeysArrayString = await this.redis.get(shopKey);

    if (idKeysArrayString) {
      const idKeysArray = JSON.parse(idKeysArrayString);
      const index = idKeysArray.indexOf(idKey);

      if (index > -1) {
        idKeysArray.splice(index, 1);
        await this.redis.set(shopKey, JSON.stringify(idKeysArray));
      }
    }
  }
}
