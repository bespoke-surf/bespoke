import { playgroundFile } from '@bespoke/common';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import Handlebars from 'handlebars';
import type { Redis } from 'ioredis';
import mjml2html from 'mjml';
import Mail from 'nodemailer/lib/mailer';
import {
  EMAIL_HEADER_POST_ID_KEY,
  EMAIL_HEADER_UNSUBSCRIBE_ID_KEY,
} from '../../constants';
import { Post } from '../../post/post.entity';
import { Subscriber } from '../../subscriber/subscriber.entity';
import { Contact, Store } from '../store.entity';
import { createUnsubscribeId } from '../utils/createUnsubscribeLInk';
dayjs.extend(LocalizedFormat);

interface AbandonedCartProductValues {
  name: string;
  price: string;
  url: string;
  img_src: string;
}

interface AbandonedCartProduct {
  product_zero?: AbandonedCartProductValues;
  product_one?: AbandonedCartProductValues;
  product_two?: AbandonedCartProductValues;
}

export interface HandleBarValues {
  abandoned_checkout_url?: string;
  abandoned_cart_product?: AbandonedCartProduct;
  unsubscribeLink?: string;
  contact?: {
    address1: string;
    address2?: string;
    city: string;
    state?: string;
    country: string;
    zipCode: string;
  };
}

export const smptpSubscriberListEmail = ({
  subscriber,
  postWithStoreAndContact,
  frontEndHost,
  frontEndHostProtocol,
  listId,
  host,
  redis,
}: {
  subscriber: Subscriber;
  postWithStoreAndContact: Post;
  frontEndHost: string;
  frontEndHostProtocol: string;
  listId: string;
  host: string;
  redis: Redis;
}): Mail.Options => {
  const storeURL = `${frontEndHostProtocol}//${postWithStoreAndContact.store.subdomain}.${frontEndHost}`;

  const unsubscribeId = createUnsubscribeId({
    subscriberId: subscriber.id,
    listId: listId,
    redis,
  });
  // const customArgs = {
  //   postId: postWithStoreAndContact.id,
  //   subscriberId: subscriber.id,
  //   listId,
  // };

  return {
    to: subscriber.user.email,
    from: `${postWithStoreAndContact.store.contact?.senderName} <${postWithStoreAndContact.store.subdomain}@bespoke.surf>`,
    replyTo: `${postWithStoreAndContact.store.contact?.senderName} <${postWithStoreAndContact.store.contact?.senderEmail}>`,
    subject: `${postWithStoreAndContact.title}`,
    html: htmlOutput({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      html: postWithStoreAndContact.bodyHTML!,
      bodyTopInject: postReadOnlineHeader(postWithStoreAndContact, storeURL),
      bodyFooterInject: postUnsubscribeFooter(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        postWithStoreAndContact.store.contact!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        postWithStoreAndContact.store.name!,
        `${storeURL}/unsubscribe/${unsubscribeId}`,
      ),
    }),
    list: {
      Unsubscribe: `<${host}/subscriber/unsubscribe?unsubscribeId=${unsubscribeId}>`,
      'Unsubscribe-Post': `List-Unsubscribe=One-Click`,
      Post: `<${frontEndHostProtocol}//${postWithStoreAndContact.store.subdomain}.${frontEndHost}/p/${postWithStoreAndContact.postHandle}>`,
      Url: `<${frontEndHostProtocol}//${postWithStoreAndContact.store.subdomain}.${frontEndHost}>`,
      Id: `<${postWithStoreAndContact.store.subdomain}.${frontEndHost}>`,
      Owner: `<mailto:${postWithStoreAndContact.store.contact?.senderEmail}>`,
      Archive: `<${frontEndHostProtocol}//${postWithStoreAndContact.store.subdomain}.${frontEndHost}>`,
    },
    headers: {
      [EMAIL_HEADER_POST_ID_KEY]: postWithStoreAndContact.id,
      [EMAIL_HEADER_UNSUBSCRIBE_ID_KEY]: unsubscribeId,
    },
  };
};

//TODO: automatically add a list by checking if the header is missing, check if unsubscribe link is missing.
export const smptpAutomationEmail = ({
  subscriber,
  listId,
  host,
  html,
  storeWithContact,
  subject,
  handleBarValues,
  frontEndHost,
  frontEndHostProtocol,
  unsubscribeId,
}: {
  subscriber: Subscriber;
  frontEndHost: string;
  frontEndHostProtocol: string;
  listId?: string;
  host: string;
  html: string;
  subject: string;
  unsubscribeId: string;
  storeWithContact: Store;
  handleBarValues?: HandleBarValues;
}): Mail.Options => {
  const storeURL = `${frontEndHostProtocol}//${storeWithContact.subdomain}.${frontEndHost}`;

  let listHeaders: Mail.Options['list'] = {
    Owner: `<mailto:${storeWithContact.contact?.senderEmail}>`,
  };

  if (listId) {
    listHeaders = {
      ...listHeaders,
      Unsubscribe: `<${host}/subscriber/unsubscribe?unsubscribeId=${unsubscribeId}>`,
      'Unsubscribe-Post': `List-Unsubscribe=One-Click`,
    };
  } else {
    listHeaders = {
      Unsubscribe: `<${host}/subscriber/unsubscribe?unsubscribeId=${unsubscribeId}>`,
      'Unsubscribe-Post': `List-Unsubscribe=One-Click`,
    };
  }
  const headers = {
    [EMAIL_HEADER_UNSUBSCRIBE_ID_KEY]: unsubscribeId,
  };

  return {
    to: subscriber.user.email,
    from: `${storeWithContact.contact?.senderName} <${storeWithContact.subdomain}@bespoke.surf>`,
    replyTo: `${storeWithContact.contact?.senderName} <${storeWithContact.contact?.senderEmail}>`,
    subject: `${subject}`,
    list: listHeaders,
    html: htmlOutput({
      html: Handlebars.compile(html)({ handleBarValues }),
      bodyFooterInject: automationUnsubscribeFooter(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        storeWithContact.contact!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        storeWithContact.name!,
        `${storeURL}/unsubscribe/${unsubscribeId}`,
      ),
    }),
    headers,
  };
};

const mjmlCssStyle = `
.link-nostyle { color: inherit; text-decoration: none }

 @media only screen and (min-width:480px) {
      .mj-column-per-33-333333333333336 {
        width: 33.333333333333336% !important;
        max-width: 33.333333333333336%;
      }
    }
 .moz-text-html .mj-column-per-33-333333333333336 {
      width: 33.333333333333336% !important;
      max-width: 33.333333333333336%;
    }
 ${playgroundFile}
`;

const postReadOnlineHeader = (post: Post, storeURL: string) => {
  return `
    <mj-section>
          <mj-column>
            <mj-button align="right" background-color="transparent" color="black" text-decoration="underline" href="${storeURL}/p/${
    post.postHandle
  }">read online</mj-button>
            <mj-text font-size="36px" font-weight="700" color="#000">${
              post?.title
            }</mj-text>
            <mj-text font-size="20px" color="#000">${post.subTitle}</mj-text>
            <mj-text color="#767676">${dayjs(post.publishedDate).format(
              'LL',
            )}</mj-text>
            <mj-image alt="${post.title}" src="${post.image?.src}" />
          </mj-column>
        </mj-section>
  `;
};

const postUnsubscribeFooter = (
  contact: Contact,
  storeName: string,
  unsubscribeLink: string,
) => {
  return `
  <mj-section background-color="#fafafa">
  <mj-column>
    <mj-text padding-bottom="0px" align="center" color="#808080">© ${dayjs().format(
      'YYYY',
    )} ${storeName}<br /><br />
      ${contact?.address1} ${contact?.address2}, ${contact?.city}, ${
    contact?.state
  }, ${contact?.country} ${contact?.zipCode}.
    </mj-text>
    <mj-button color="#808080" background-color="transparent" color="black" href="${unsubscribeLink}" align="center" text-decoration="underline"  padding="0px">
      Unsubscribe
    </mj-button>
  </mj-column>
</mj-section>
</mj-section>
  `;
};

const automationUnsubscribeFooter = (
  contact: Contact,
  storeName: string,
  unsubscribeLink: string,
) => {
  return `
  <mj-section full-width="100%" padding-top="100px">
  <mj-divider border-width="3px" border-style="solid" border-color="#e2e2e2" />
  <mj-column>
    <mj-text padding-bottom="0px" align="center" color="#808080">© ${dayjs().format(
      'YYYY',
    )} ${storeName}<br /><br />
      ${contact?.address1} ${contact?.address2}, ${contact?.city}, ${
    contact?.state
  }, ${contact?.country} ${contact?.zipCode}.
    </mj-text>
    <mj-button color="#808080" background-color="transparent" color="black" href="${unsubscribeLink}" align="center" text-decoration="underline" padding="0px">
      Unsubscribe
    </mj-button>
  </mj-column>
</mj-section>
`;
};

const htmlOutput = ({
  html,
  bodyTopInject: bodyHeaderInject,
  bodyFooterInject,
}: {
  html: string;
  bodyTopInject?: string;
  bodyFooterInject?: string;
}) => {
  return mjml2html(
    `
        <mjml>
  <mj-head>
    <mj-style> ${mjmlCssStyle} </mj-style>
  </mj-head>
  <mj-body>
      {{ses:openTracker}}
      ${bodyHeaderInject && `${bodyHeaderInject}`}
    <mj-raw>
      <div style="margin: 0px auto; max-width: 600px">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  text-align: center;
                "
              >
                <div
                  class="mj-column-per-100 mj-outlook-group-fix"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            word-break: break-word;
                          "
                        >
                          <div
                            class="ContentEditable__root"
                          >
                            ${html}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </mj-raw>
   ${bodyFooterInject && `${bodyFooterInject}`} 
  </mj-body>
</mjml>
`,
    {},
  ).html;
};
