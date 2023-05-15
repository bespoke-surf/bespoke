export const SESSION_SECRET = 'asfl;kasfoaihfasdfknafin';

export const REDIS_SESSION_PREFIX = 'sess:';
export const REDIS_RATE_LIMIT_PREFIX = 'ratelimit:';
export const REDIS_SLOW_DOWN_PREFIX = 'slowdown:';
export const REDIS_SESSION_ID_PREFIX = 'sessId:';

export const STORE_SEND_EMAIL_TO_SUBSCRIBER_LIST_QUEUE =
  'store-send-email-to-subscriber-list-queue';

export const STORE_QUEST_QUEUE = 'store-quest-queue';
export const STORE_WORKFLOW_QUEUE = 'store-workflow-queue';

export const STORE_DIALY_CRON_QUEUE = 'store-daily-cron-queue';
export const STORE_WEEKLY_CRON_QUEUE = 'store-weekly-cron-queue';
export const STORE_QUARTERLY_CRON_QUEUE = 'store-quarterly-cron-queue';

export const USER_STORE_UPLOAD_CSV_FILE_QUEUE =
  'user-store-upload-csv-file-queue';

export const USER_SNS_EMAIL_METRIC_WEBHOOK_QUEUE =
  'user-sns-email-metric-webhook-queue';

export const USER_CUSTOMER_UPLOAD_QUEUE = 'user-customer-upload-queue';
export const STORE_PRODUCT_UPLOAD_QUEUE = 'store-product-upload-queue';

export const LOGIN_CONFIRMATION_PREFIX = 'confirmCode:';

export const UNSUBSCRIBE_ID_PREFIX = 'unsubscriberId:';

export const APP_SUBSCRIPTON_QUANTITY_PREFIX = 'appSubscriptionQuantity:';
export const DEFAULT_CONTACT_QUANTITY = 250;

export const EMAIL_HEADER_POST_ID_KEY = 'X-Bmail-Post';
export const EMAIL_HEADER_UNSUBSCRIBE_ID_KEY = 'X-Bmail-Unsubscribe';
