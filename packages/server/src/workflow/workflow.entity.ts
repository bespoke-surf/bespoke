import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
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
import { Store } from '../store/store.entity';
import { WorkflowState } from '../workflow-state/workflow-state.entity';
import { WorkflowTransition } from '../workflow-transition/workflow-transition.entity';
import { WorkflowStatus } from './enum/workflowStatus.enum';
import { BaseConditionalFilter } from './type/baseCoindtionalFilter/baseConditionalFilter';
import { BaseTriggerFilter } from './type/baseTriggerFilter/baseTriggerFilter';
import { WorkflowEdge } from './type/edgeType';
import { WorkflowNode } from './type/nodeType';

@ObjectType({
  description: 'Workflow',
})
@Entity({
  orderBy: {
    createdAt: 'DESC',
  },
})
export class Workflow {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @Column()
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  descriptionLexical: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  descriptionHTML: string;

  @Field()
  @Column({ type: 'boolean', default: false })
  public: boolean;

  @Field(() => Int)
  @Column({ default: 0 })
  replicationCount: number;

  @Field(() => WorkflowStatus)
  @Column({ type: 'enum', enum: WorkflowStatus, default: WorkflowStatus.DRAFT })
  workflowStatus: WorkflowStatus;

  @Field()
  @Column({ type: 'uuid' })
  storeId: string;

  @Field(() => [WorkflowNode], { nullable: true })
  node?: WorkflowNode[];

  @Field(() => [WorkflowEdge], { nullable: true })
  edge?: WorkflowEdge[];

  @Field(() => [[BaseConditionalFilter]], { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  flowFilter?: BaseConditionalFilter[][];

  @Field(() => [[BaseTriggerFilter]], { nullable: true })
  @Column({ type: 'jsonb', nullable: true })
  triggerFilter?: BaseTriggerFilter[][];

  @Field(() => Store)
  @ManyToOne(() => Store, (store) => store.workflow, {
    onDelete: 'CASCADE',
  })
  store: Relation<Store>;

  @OneToMany(() => WorkflowState, (workflowState) => workflowState.workflow)
  workflowState: Relation<WorkflowState[]>;

  @OneToMany(
    () => WorkflowTransition,
    (workflowTransition) => workflowTransition.workflow,
  )
  workflowTransition: Relation<WorkflowTransition[]>;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
