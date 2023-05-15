import { registerEnumType } from '@nestjs/graphql';

export enum SignupFormState {
  DRAFT = 'DRAFT',
  LIVE = 'LIVE',
}

registerEnumType(SignupFormState, {
  name: 'SignupFormState',
  description: 'Signup form state',
});
