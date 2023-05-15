import { registerEnumType } from '@nestjs/graphql';

export enum AboutIndustryEnum {
  ECOMMERCE_APPAREL_ACCESSORIES = 'Ecommerce (Apparel & Accessories)',
  ECOMMERCE_AUTOMOTIVE = 'Ecommerce (Automotive)',
  ECOMMERCE_ELECTRONICS = 'Ecommerce (Electronics)',
  ECOMMERCE_FOOD_BEVERAGE = 'Ecommerce (Food & Beverage)',
  ECOMMERCE_JEWELRY = 'Ecommerce (Jewelry)',
  ECOMMERCE_HOUSEWARES_HOME_FURNISHINGS_GARDEN = 'Ecommerce (Housewares, Home Furnishings, & Garden)',
  ECOMMERCE_HARDWARE_HOME_IMPROVEMENTS = 'Ecommerce (Hardware & Home Improvement)',
  ECOMMERCE_HEALTH_BEAUTY = 'Ecommerce (Health & Beauty)',
  ECOMMERCE_MASS_MERCHANT = 'Ecommerce (Mass Merchant)',
  ECOMMERCE_OFFICE_SUPPLIES = 'Ecommerce (Office Supplies)',
  ECOMMERCE_SPECIALTY = 'Ecommerce (Specialty)',
  ECOMMERCE_SPORTING_GOODS = 'Ecommerce (Sporting Goods)',
  ECOMMERCE_TOYS_HOBBIES = 'Ecommerce (Toys & Hobbies)',
  ECOMMERCE_OTHER = 'Ecommerce (Other)',
  AGENCY_MARKETING_CONSULTING = 'Agency, Marketing, and Consulting',
  BANKING_FINANCIAL_SERVICES_INSURANCE = 'Banking, Financial Services, and Insurance',
  EDUCATION = 'Education',
  EVENTS_ENTERTAINMENT = 'Events & Entertainment',
  NON_PROFIT = 'Non-Profit',
  POLITCS_GOVERMENT = 'Politics and Government',
  REAL_ESTATE_CONSTRUCTION = 'Real Estate and Construction',
  RESTAURANTS = 'Restaurants',
  TELECOMMUNICATION = 'Telecommunications',
  SOFTWARE_SASS = 'Software / SaaS',
  TRAVEL = 'Travel',
  OTHER = 'Other',
}

registerEnumType(AboutIndustryEnum, {
  name: 'AboutIndustryEnum',
  description: 'different type of industry verticals',
});
