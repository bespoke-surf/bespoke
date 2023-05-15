import type { Redis } from 'ioredis';
import namor from 'namor';
import { LOGIN_CONFIRMATION_PREFIX } from '../../constants';

export const createConfirmationCode = async (userId: string, redis: Redis) => {
  const id = namor.generate({ words: 4, salt: 5 });

  await redis.set(
    `${LOGIN_CONFIRMATION_PREFIX}${id}`,
    userId,
    'EX',
    60 * 60 * 24,
  );
  return id;
  // return `${url}/confirm/${id}`;
};
