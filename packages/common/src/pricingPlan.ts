export interface IPricing {
  id: PricingIdType;
  type: "basic" | "advanced" | "default";
  title: string;
  overages: number;
  price: number;
  contacts: number;
  emails: number;
  stripePriceId: string;
}

export const FREE_PLAN_ID = "FREE";

export const BASIC_PLAN_5K_ID = "BASIC_5K";
export const BASIC_PLAN_10K_ID = "BASIC_10K";
export const BASIC_PLAN_20K_ID = "BASIC_20K";
export const BASIC_PLAN_50K_ID = "BASIC_50K";
export const BASIC_PLAN_100K_ID = "BASIC_100K";

export const ADVANCED_PLAN_10K_ID = "ADVANCED_10K";
export const ADVANCED_PLAN_20K_ID = "ADVANCED_20K";
export const ADVANCED_PLAN_50K_ID = "ADVANCED_50K";
export const ADVANCED_PLAN_100K_ID = "ADVANCED_100K";
export const ADVANCED_PLAN_200K_ID = "ADVANCED_200K";

export type PricingIdType =
  | typeof FREE_PLAN_ID
  | typeof BASIC_PLAN_5K_ID
  | typeof BASIC_PLAN_10K_ID
  | typeof BASIC_PLAN_20K_ID
  | typeof BASIC_PLAN_50K_ID
  | typeof BASIC_PLAN_100K_ID
  | typeof ADVANCED_PLAN_10K_ID
  | typeof ADVANCED_PLAN_20K_ID
  | typeof ADVANCED_PLAN_50K_ID
  | typeof ADVANCED_PLAN_100K_ID
  | typeof ADVANCED_PLAN_200K_ID;

export const bespokePricingPlan: IPricing[] = [
  {
    id: FREE_PLAN_ID,
    type: "default",
    title: "Free",
    contacts: 2000,
    emails: 6000,
    overages: 0,
    price: 0,
    stripePriceId: "",
  },
  {
    id: BASIC_PLAN_5K_ID,
    type: "basic",
    title: "Basic 5k",
    contacts: 5000,
    emails: 15000,
    overages: 0.004,
    price: 15,
    stripePriceId: "price_1NDUwYGuTUZZ6Si6iT5OjXG7",
  },

  {
    id: BASIC_PLAN_10K_ID,
    type: "basic",
    title: "Basic 10k",
    contacts: 10000,
    emails: 30000,
    overages: 0.003,
    price: 25,
    stripePriceId: "price_1NDUwYGuTUZZ6Si6cJ4xlxQi",
  },
  {
    id: BASIC_PLAN_20K_ID,
    type: "basic",
    title: "Basic 20k",
    contacts: 20000,
    emails: 60000,
    overages: 0.003,
    price: 50,
    stripePriceId: "price_1NDUwYGuTUZZ6Si6uYiobqzA",
  },
  {
    id: BASIC_PLAN_50K_ID,
    type: "basic",
    title: "Basic 50k",
    contacts: 50000,
    emails: 150000,
    overages: 0.0028,
    price: 120,
    stripePriceId: "price_1NDUwYGuTUZZ6Si64Eg9lBgK",
  },
  {
    id: BASIC_PLAN_100K_ID,
    type: "basic",
    title: "Basic 100k",
    contacts: 100000,
    emails: 300000,
    overages: 0.0023,
    price: 200,
    stripePriceId: "price_1NDUwYGuTUZZ6Si6KRZEnu9D",
  },
  {
    id: ADVANCED_PLAN_10K_ID,
    type: "advanced",
    title: "Advanced 10k",
    contacts: 10000,
    emails: 50000,
    overages: 0.0075,
    price: 60,
    stripePriceId: "price_1NDV0cGuTUZZ6Si6gM1GiOpD",
  },
  {
    id: ADVANCED_PLAN_20K_ID,
    type: "advanced",
    title: "Advanced 20k",
    contacts: 20000,
    emails: 100000,
    overages: 0.006,
    price: 100,
    stripePriceId: "price_1NDV0cGuTUZZ6Si6xR85WOVh",
  },
  {
    id: ADVANCED_PLAN_50K_ID,
    type: "advanced",
    title: "Advanced 50k",
    contacts: 50000,
    emails: 250000,
    overages: 0.006,
    price: 250,
    stripePriceId: "price_1NDV0cGuTUZZ6Si6gPxcCPfd",
  },
  {
    id: ADVANCED_PLAN_100K_ID,
    type: "advanced",
    title: "Advanced 100k",
    contacts: 100000,
    emails: 500000,
    overages: 0.005,
    price: 450,
    stripePriceId: "price_1NDV0cGuTUZZ6Si6umg72kv3",
  },
  {
    id: ADVANCED_PLAN_200K_ID,
    type: "advanced",
    title: "Advanced 200k",
    contacts: 200000,
    emails: 1000000,
    overages: 0.005,
    price: 900,
    stripePriceId: "price_1NDV0cGuTUZZ6Si6zQcMRc0E",
  },
];
