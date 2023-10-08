import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Field } from 'shared/interfaces/cache-fields.type';
import { CacheObject } from 'shared/interfaces/cache-object.interface';
import { DynamicObjectI } from 'shared/interfaces/dynamic-object.interface';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async set(key: string, value: string, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async setObject(
    key: string,
    value: CacheObject,
    ttl?: number,
  ): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  async getValue(key: string): Promise<string | CacheObject | undefined> {
    return this.cacheManager.get<string | CacheObject>(key);
  }

  async deleteKey(key: string): Promise<void> {
    return this.cacheManager.del(key);
  }

  async getField(key: string, field: Field): Promise<string | undefined> {
    const value = (await this.cacheManager.get(key)) as DynamicObjectI;

    if (typeof value === 'object' && !!value) {
      return value[field];
    }
    return undefined;
  }
}
