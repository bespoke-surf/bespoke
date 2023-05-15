import { createUnionType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ItemEmailTemplateData {
  @Field()
  design: string;
}

@ObjectType()
export class ItemSignupFormData {
  @Field()
  formDesign: string;

  @Field()
  successDesign: string;
}

@ObjectType()
export class ItemCreditsData {
  @Field()
  credits: number;
}
export const ItemDataUnion = createUnionType({
  name: 'ItemDataUnion',
  types: () =>
    [ItemEmailTemplateData, ItemSignupFormData, ItemCreditsData] as const,
  resolveType(value) {
    if ('design' in value) {
      return ItemEmailTemplateData;
    }

    if ('formDesign' in value) {
      return ItemSignupFormData;
    }

    if ('credits' in value) {
      return ItemCreditsData;
    }

    return null;
  },
});
