export interface IPricing {
  id: PricingIdType;
  type: "basic" | "advanced" | "default" | "open source";
  title: string;
  overages: number;
  price: number;
  contacts: number;
  emails: number;
}

export const FREE_PLAN_ID = "FREE";
export const OPEN_SOURCE_PLAN_ID = "OPEN_SOURCE";

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
  | typeof OPEN_SOURCE_PLAN_ID
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
    id: OPEN_SOURCE_PLAN_ID,
    type: "open source",
    title: "Open Source",
    contacts: 999999999999,
    emails: 999999999999,
    overages: 0,
    price: 0,
  },
  {
    id: FREE_PLAN_ID,
    type: "default",
    title: "Free",
    contacts: 2000,
    emails: 6000,
    overages: 0,
    price: 0,
  },
  {
    id: BASIC_PLAN_5K_ID,
    type: "basic",
    title: "Basic 5k",
    contacts: 5000,
    emails: 15000,
    overages: 0.004,
    price: 15,
  },

  {
    id: BASIC_PLAN_10K_ID,
    type: "basic",
    title: "Basic 10k",
    contacts: 10000,
    emails: 30000,
    overages: 0.003,
    price: 25,
  },
  {
    id: BASIC_PLAN_20K_ID,
    type: "basic",
    title: "Basic 20k",
    contacts: 20000,
    emails: 60000,
    overages: 0.003,
    price: 50,
  },
  {
    id: BASIC_PLAN_50K_ID,
    type: "basic",
    title: "Basic 50k",
    contacts: 50000,
    emails: 150000,
    overages: 0.0028,
    price: 120,
  },
  {
    id: BASIC_PLAN_100K_ID,
    type: "basic",
    title: "Basic 100k",
    contacts: 100000,
    emails: 300000,
    overages: 0.0023,
    price: 200,
  },
  {
    id: ADVANCED_PLAN_10K_ID,
    type: "advanced",
    title: "Advanced 10k",
    contacts: 10000,
    emails: 50000,
    overages: 0.0075,
    price: 60,
  },
  {
    id: ADVANCED_PLAN_20K_ID,
    type: "advanced",
    title: "Advanced 20k",
    contacts: 20000,
    emails: 100000,
    overages: 0.006,
    price: 100,
  },
  {
    id: ADVANCED_PLAN_50K_ID,
    type: "advanced",
    title: "Advanced 50k",
    contacts: 50000,
    emails: 250000,
    overages: 0.006,
    price: 250,
  },
  {
    id: ADVANCED_PLAN_100K_ID,
    type: "advanced",
    title: "Advanced 100k",
    contacts: 100000,
    emails: 500000,
    overages: 0.005,
    price: 450,
  },
  {
    id: ADVANCED_PLAN_200K_ID,
    type: "advanced",
    title: "Advanced 200k",
    contacts: 200000,
    emails: 1000000,
    overages: 0.005,
    price: 900,
  },
];
