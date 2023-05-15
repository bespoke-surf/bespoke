import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { USER_STORE_UPLOAD_CSV_FILE_QUEUE } from '../../constants';
import { EventAccessRestriction } from '../../event/enum/eventConfidentiality';
import { EventState } from '../../event/enum/eventState.enum';
import { EventType } from '../../event/enum/eventType.enum';
import { EventService } from '../../event/event.service';
import { EmailConcentCollectedFrom } from '../../subscriber-list/enum/emailConcentCollectedFrom.enum';
import { EmailConcentOptInLevel } from '../../subscriber-list/enum/emailConcentOptInLevel.enum';
import { SubscriberService } from '../../subscriber/subscriber.service';
import { UserService } from '../user.service';

export interface UserStoreUploadCSVFileQueueData {
  csvFileEmails: { email: string; firstName?: string; lastName?: string }[];
  listId: string;
  storeId: string;
  userId: string;
}

@Processor(USER_STORE_UPLOAD_CSV_FILE_QUEUE)
export class UserStoreUploadCSVFileQueue {
  constructor(
    private readonly userService: UserService,
    private readonly subscriberService: SubscriberService,
    private readonly eventService: EventService,
  ) {}

  @Process()
  async transcode(job: Job<UserStoreUploadCSVFileQueueData>) {
    await this.eventService.createEvent({
      eventAccessRestriction: EventAccessRestriction.HIGH,
      eventProducerId: job.data.listId,
      eventState: EventState.ACTIVE,
      eventType: EventType.LIST,
      message:
        'Contacts import in progress. Please wait as the system processes the data from the CSV file.',
      userId: job.data.userId,
      showAsNotification: true,
    });

    let skipped = 0;

    for (const file of job.data.csvFileEmails) {
      const subscriber = await this.userService.addSubscriberToStore({
        storeId: job.data.storeId,
        email: file.email,
        firstName: file.firstName,
        lastName: file.lastName,
      });
      if (!subscriber) skipped += 1;
      if (subscriber) {
        await this.subscriberService.addSubscriberToList(
          job.data.listId,
          subscriber.id,
          EmailConcentCollectedFrom.IMPORT,
          EmailConcentOptInLevel.SINGLE_OPT_IN,
        );
      }
    }
    await this.eventService.createEvent({
      eventAccessRestriction: EventAccessRestriction.HIGH,
      eventProducerId: job.data.listId,
      eventState: EventState.COMPLETED,
      eventType: EventType.LIST,
      message: `Contacts import complete. The data from the CSV file has been successfully processed and added to the system. ${skipped} contacts were skipped.`,
      userId: job.data.userId,
      showAsNotification: true,
    });
  }
}
