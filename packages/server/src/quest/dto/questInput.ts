import { Field, InputType } from '@nestjs/graphql';
import { QuestType } from '../enum/questType.enum';
import { Quest } from '../quests.entity';

@InputType({ description: 'create quest input' })
export class CreateQuestInput implements Partial<Quest> {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => QuestType)
  questType: QuestType; // total time
}
