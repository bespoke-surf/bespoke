import { registerEnumType } from '@nestjs/graphql';

export enum StoreCurrency {
  USD = 'USD',
  INR = 'INR',
  EUR = 'EUR',
  AED = 'AED',
  GBP = 'GBP',
  AUD = 'AUD',
  JPY = 'JPY',
}

registerEnumType(StoreCurrency, {
  name: 'StoreCurrency',
  description: 'the currency of the store',
});
