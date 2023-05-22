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
    stripePriceId: "price_1N9V8iGuTUZZ6Si67Z8L5v6Y",
  },

  {
    id: BASIC_PLAN_10K_ID,
    type: "basic",
    title: "Basic 10k",
    contacts: 10000,
    emails: 30000,
    overages: 0.003,
    price: 25,
    stripePriceId: "price_1N9VAaGuTUZZ6Si6LRHzh1NA",
  },
  {
    id: BASIC_PLAN_20K_ID,
    type: "basic",
    title: "Basic 20k",
    contacts: 20000,
    emails: 60000,
    overages: 0.003,
    price: 50,
    stripePriceId: "price_1N9VBSGuTUZZ6Si6vQbaBMcD",
  },
  {
    id: BASIC_PLAN_50K_ID,
    type: "basic",
    title: "Basic 50k",
    contacts: 50000,
    emails: 150000,
    overages: 0.0028,
    price: 120,
    stripePriceId: "price_1N9VQmGuTUZZ6Si65BJD5PVr",
  },
  {
    id: BASIC_PLAN_100K_ID,
    type: "basic",
    title: "Basic 100k",
    contacts: 100000,
    emails: 300000,
    overages: 0.0023,
    price: 200,
    stripePriceId: "price_1N9VQlGuTUZZ6Si68c7P03r8",
  },
  {
    id: ADVANCED_PLAN_10K_ID,
    type: "advanced",
    title: "Advanced 10k",
    contacts: 10000,
    emails: 50000,
    overages: 0.0075,
    price: 60,
    stripePriceId: "price_1N9VWVGuTUZZ6Si6EASkNtSW",
  },
  {
    id: ADVANCED_PLAN_20K_ID,
    type: "advanced",
    title: "Advanced 20k",
    contacts: 20000,
    emails: 100000,
    overages: 0.006,
    price: 100,
    stripePriceId: "price_1N9VWVGuTUZZ6Si6JlC3s3ne",
  },
  {
    id: ADVANCED_PLAN_50K_ID,
    type: "advanced",
    title: "Advanced 50k",
    contacts: 50000,
    emails: 250000,
    overages: 0.006,
    price: 250,
    stripePriceId: "price_1N9VWVGuTUZZ6Si6kWSiLcrO",
  },
  {
    id: ADVANCED_PLAN_100K_ID,
    type: "advanced",
    title: "Advanced 100k",
    contacts: 100000,
    emails: 500000,
    overages: 0.005,
    price: 450,
    stripePriceId: "price_1N9VWVGuTUZZ6Si6XibHzCsy",
  },
  {
    id: ADVANCED_PLAN_200K_ID,
    type: "advanced",
    title: "Advanced 200k",
    contacts: 200000,
    emails: 1000000,
    overages: 0.005,
    price: 900,
    stripePriceId: "price_1N9VWVGuTUZZ6Si62sDlFUXf",
  },
];
