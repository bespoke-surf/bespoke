import dayjs from 'dayjs';
import { DAYJS_TIMESTAMPZ_FORMAT } from '../../utils/constants';
import { ItemEmailTemplateData, ItemSignupFormData } from '../enums/itemData';
import { ItemTypeEnum } from '../enums/type';
import { Item } from '../items.entity';
import {
  pathCaretFromDesign,
  pathCratesuccessFormDesign,
} from './subscriptionRewards/may/signupFrom';
import { siteWideOff } from './subscriptionRewards/may/siteWideOff';
import { winOver100 } from './subscriptionRewards/may/winOver100';

import {
  marchFormDesign,
  marchSuccessForm,
} from './subscriptionRewards/june/signupform';
import { marchTemplate1 } from './subscriptionRewards/june/template1';
import { marchTemplate2 } from './subscriptionRewards/june/template2';

const start_date_june = new Date(
  dayjs().month(5).startOf('month').format(DAYJS_TIMESTAMPZ_FORMAT),
);
const end_date_june = new Date(
  dayjs().month(5).endOf('month').format(DAYJS_TIMESTAMPZ_FORMAT),
);

const start_date_july = new Date(
  dayjs().month(6).startOf('month').format(DAYJS_TIMESTAMPZ_FORMAT),
);
const end_date_july = new Date(
  dayjs().month(6).endOf('month').format(DAYJS_TIMESTAMPZ_FORMAT),
);

export const subscrpitonRewardItems: Partial<Item>[] = [
  {
    name: 'Win over $1000 worth of products',
    description: 'Win Over $1000 Worth of Products - Enter Now!',
    type: ItemTypeEnum.EMAIL_TEMPLATE,
    imageData: [
      {
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673870828/Frame_1_10_nxwqcb.png',
        height: 1200,
        width: 600,
      },
    ],
    start_date: start_date_june,
    end_date: end_date_june,

    data: {
      design: winOver100,
    } satisfies ItemEmailTemplateData,
  },
  {
    name: '60% Off Sitewide Starts Now! ✨',
    description: 'Limited Time Offer: 60% off Sitewide - Start Shopping Now!',
    imageData: [
      {
        height: 1409,
        width: 600,
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673871489/Frame_2_4_invcrd.png',
      },
    ],
    type: ItemTypeEnum.EMAIL_TEMPLATE,
    start_date: start_date_june,
    end_date: end_date_june,

    data: {
      design: siteWideOff,
    } satisfies ItemEmailTemplateData,
  },

  {
    name: 'Do you want 10% off?',
    description: '',
    type: ItemTypeEnum.SIGNUP_FORM,
    start_date: start_date_june,
    end_date: end_date_june,

    imageData: [
      {
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673883784/Frame_5_sajsk0.png',
        width: 986,
        height: 670,
      },
      {
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673881427/Frame_3_3_p5es8i.png',
        width: 447,
        height: 596,
      },
      {
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673881427/Frame_3_3_p5es8i.png',
        width: 448,
        height: 472,
      },
    ],
    data: {
      formDesign: pathCaretFromDesign,
      successDesign: pathCratesuccessFormDesign,
    } satisfies ItemSignupFormData,
  },
  {
    name: 'Explore new-in white dress',
    description: '',
    type: ItemTypeEnum.EMAIL_TEMPLATE,
    start_date: start_date_july,
    end_date: end_date_july,
    imageData: [
      {
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1677651686/_home_afi_Desktop_form_1_fwlg4r.png',
        height: 1954,
        width: 519,
      },
    ],
    data: {
      design: marchTemplate1,
    } satisfies ItemEmailTemplateData,
  },
  {
    name: 'Spring collection just dropped ',
    description: '',
    type: ItemTypeEnum.EMAIL_TEMPLATE,
    start_date: start_date_july,
    end_date: end_date_july,
    imageData: [
      {
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1677686343/Frame_13_3_ejfxfr.png',
        height: 919,
        width: 541,
      },
    ],
    data: {
      design: marchTemplate2,
    } satisfies ItemEmailTemplateData,
  },
  {
    name: 'Join the club and get rewards',
    description: '',
    type: ItemTypeEnum.SIGNUP_FORM,
    start_date: start_date_july,
    end_date: end_date_july,
    imageData: [
      {
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1677685980/Frame_12_4_qj8a5n.png',
        width: 986,
        height: 670,
      },
      {
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1677685955/bespoke.localhost_9_rmd5pr.png',
        width: 600,
        height: 300,
      },
      {
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1677685952/bespoke.localhost_9_1_c1tdeu.png',
        width: 600,
        height: 300,
      },
    ],
    data: {
      formDesign: marchFormDesign,
      successDesign: marchSuccessForm,
    } satisfies ItemSignupFormData,
  },
];
