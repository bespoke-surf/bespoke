import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkflowListner {
  // constructor(private readonly eventService: EventService) {}
  // @OnEvent('workflow.create')
  // handleUserCreatedEvent(event: Workflow) {
  //   this.eventService.createEvent({
  //     eventProducerId: event.id,
  //     eventType: EventType.WORKFLOW,
  //     message: `New workflow created ${event.name}`,
  //     userId: event.store.user.id,
  //     eventAccessRestriction: EventAccessRestriction.HIGH,
  //     eventState: EventState.COMPLETED,
  //   });
  // }
  // @OnEvent('workflow.turnOn')
  // handleWorkflowTurnOnEvent(event: Workflow) {
  //   this.eventService.createEvent({
  //     eventProducerId: event.id,
  //     eventType: EventType.WORKFLOW,
  //     message: `Workflow ${event.name} turned on`,
  //     userId: event.store.user.id,
  //     eventAccessRestriction: EventAccessRestriction.HIGH,
  //     eventState: EventState.COMPLETED,
  //   });
  // }
  // @OnEvent('workflow.turnOff')
  // handleWorkflowTurnOffEvent(event: Workflow) {
  //   this.eventService.createEvent({
  //     eventProducerId: event.id,
  //     eventType: EventType.WORKFLOW,
  //     message: `Workflow ${event.name} turned off`,
  //     userId: event.store.user.id,
  //     eventAccessRestriction: EventAccessRestriction.HIGH,
  //     eventState: EventState.COMPLETED,
  //   });
  // }
}
