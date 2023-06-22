import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ListModule } from '../list/list.module';
import { SubscriberModule } from '../subscriber/subscriber.module';
import { UserModule } from '../user/user.module';
import { ApiVersion, BESPOKE_API_KEY } from './constants';

const options: SwaggerDocumentOptions = {
  operationIdFactory: (_: string, methodKey: string) => methodKey,
};

const config = new DocumentBuilder()
  .setContact(
    'Bespoke Developers',
    'https://developers.bespoke.surf',
    'developers@bespoke.surf',
  )
  .addServer('https://api.bespoke.surf', 'Production')
  .setVersion(ApiVersion.June23)
  .setLicense(
    'MIT',
    'https://github.com/bespoke-surf/bespoke/blob/main/LICENSE',
  )
  .setExternalDoc('The Bespoke API', 'https://developers.bespoke.surf')
  .setTermsOfService('https://bespoke.surf/terms-of-service')
  .addApiKey(
    {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description:
        'Private key authentication for /api/ endpoints is performed by setting the `Authorization` header to `Bespoke-API-Key your-private-api-key`<br>For more information please visit https://developers.bespoke.surf/en/v2023-02-22/reference/api-overview#authentication',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      'x-default': 'Bespoke-API-Key your-private-api-key',
    },
    BESPOKE_API_KEY,
  )
  .addSecurityRequirements(BESPOKE_API_KEY);

export const bespokeApiDocumnet = (app: INestApplication) => {
  const conf = config
    .setTitle('BESPOKE REST API')
    .setDescription(
      'The Bespoke List API. Please visit https://developers.bespoke.surf for more details.',
    )
    .addTag('List', 'The List API')
    .addTag('Subscriber', 'The Subscriber API')
    .build();

  return SwaggerModule.createDocument(app, conf, {
    ...options,
    include: [ListModule, SubscriberModule, UserModule],
  });
};

// export const subscriberApiDocument = (app: INestApplication) => {
//   const conf = config
//     .setTitle('Subscriber API')
//     .setDescription(
//       'The Bespoke Subscriber API. Please visit https://developers.bespoke.surf for more details.',
//     )
//     .addTag('Subscriber', 'The Subscriber API')
//     .build();

//   return SwaggerModule.createDocument(app, conf, {
//     ...options,
//     include: [],
//   });

// };
