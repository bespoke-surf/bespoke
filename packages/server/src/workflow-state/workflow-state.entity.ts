import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { WorkflowTransition } from '../workflow-transition/workflow-transition.entity';
import { Workflow } from '../workflow/workflow.entity';
import { WorkflowActivityType } from './enum/workflowActivityType.enum';
import { WorkflowStateType } from './enum/workflowStateType.enum';
import { WorkflowStateValueUnion } from './type/stateValueUnion';

@ObjectType({
  description: 'WorkflowState',
})
@Entity({
  orderBy: {
    createdAt: 'DESC',
  },
})
export class WorkflowState {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => WorkflowStateType)
  @Column({ type: 'enum', enum: WorkflowStateType })
  workflowStateType: WorkflowStateType;

  @Field(() => WorkflowStateValueUnion)
  @Column({ type: 'jsonb' })
  value: typeof WorkflowStateValueUnion;

  @Field(() => WorkflowActivityType)
  @Column({ enum: WorkflowActivityType, type: 'enum' })
  workflowActivityType: WorkflowActivityType;

  @Column({ type: 'uuid' })
  workflowId: string;

  @ManyToOne(() => Workflow, (workflow) => workflow.workflowState, {
    onDelete: 'CASCADE',
  })
  workflow: Relation<Workflow>;

  @OneToMany(
    () => WorkflowTransition,
    (workflowTransition) => workflowTransition.workflowState,
  )
  workflowTransition: Relation<WorkflowTransition[]>;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
