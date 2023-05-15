import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { WorkflowState } from '../workflow-state/workflow-state.entity';
import { Workflow } from '../workflow/workflow.entity';

@ObjectType({
  description: 'WorkflowTransition',
})
@Entity({
  orderBy: {
    createdAt: 'DESC',
  },
})
export class WorkflowTransition {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ type: 'bool', default: false })
  otherWise: boolean;

  @Column({ type: 'uuid' })
  workflowId: string;

  @Column({ type: 'uuid' })
  workflowStateId: string;

  @Column({ type: 'uuid' })
  nextStateId: string;

  @ManyToOne(() => Workflow, (workflow) => workflow.workflowTransition, {
    onDelete: 'CASCADE',
  })
  workflow: Relation<Workflow>;

  @ManyToOne(
    () => WorkflowState,
    (workflowState) => workflowState.workflowTransition,
    {
      onDelete: 'CASCADE',
    },
  )
  workflowState: Relation<WorkflowState>;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
