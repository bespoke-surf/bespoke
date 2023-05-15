import type { Redis } from 'ioredis';
import namor from 'namor';
import { UNSUBSCRIBE_ID_PREFIX } from '../../constants';

export const createUnsubscribeId = ({
  subscriberId,
  listId,
  redis,
}: {
  subscriberId: string;
  listId?: string;
  redis: Redis;
}) => {
  const id = namor.generate({ words: 4, salt: 5 });

  const data = {
    subscriberId,
    listId: listId,
  };

  redis.set(
    `${UNSUBSCRIBE_ID_PREFIX}${id}`,
    JSON.stringify(data),
    'EX',
    60 * 60 * 24 * 365,
  );

  return id;
};
