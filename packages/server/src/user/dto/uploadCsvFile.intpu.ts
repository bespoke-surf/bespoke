import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
class CsvFileEmail {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;
}

@InputType({ description: 'upload csv file input' })
export class UploadCsvFileEmailsToListInput {
  @Field(() => [CsvFileEmail])
  csvFileEmails: CsvFileEmail[];

  @Field()
  listId: string;

  @Field()
  subdomain: string;
}
