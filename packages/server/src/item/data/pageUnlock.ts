import { getThisQuarter } from '../../utils/quarterDates';
import {
  ItemCreditsData,
  ItemEmailTemplateData,
  ItemSignupFormData,
} from '../enums/itemData';
import { ItemTypeEnum } from '../enums/type';
import { Item } from '../items.entity';
import {
  celebratinIWDData,
  febFlasSale,
  feelingLukcyData,
  giveawayValentinesDay,
  holdUpUnlockDataFormData,
  inTheClub,
  longWeekendSaleData,
  newFavouritesData,
  presidentDaySaleData,
  wereSpringCleaingEarly,
  womentCollection,
} from './pageUnlock/data';

const quarterStart = getThisQuarter().quarterStart;
const quarterEnd = getThisQuarter().quarterEnd;

const start_date = new Date(quarterStart);
const end_date = new Date(quarterEnd);

const creditImageData = [
  {
    height: 600,
    width: 600,
    src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673974509/Frame_5_1_i2ooz7.png',
  },
];

// 7,7,4,5,5
export const pageUnlockPage1Level0: Partial<Item>[] = [
  {
    name: 'Long Weekend Sale',
    description: '',
    type: ItemTypeEnum.EMAIL_TEMPLATE,
    data: {
      design: longWeekendSaleData,
    } satisfies ItemEmailTemplateData,
    imageData: [
      {
        height: 2013,
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673961432/Frame_6_4_w37oqr.png',
        width: 600,
      },
    ],
    start_date,
    end_date,
  },
  {
    name: 'Credits Page 1 - 1',
    description: '',
    type: ItemTypeEnum.CREDITS,
    imageData: creditImageData,
    data: {
      credits: 100,
    } satisfies ItemCreditsData,
    start_date,
    end_date,
  },
  {
    name: 'February Flash Sale',
    description: '',
    type: ItemTypeEnum.EMAIL_TEMPLATE,
    data: {
      design: febFlasSale,
    } satisfies ItemEmailTemplateData,
    imageData: [
      {
        height: 1438,
        width: 600,
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673961932/Frame_7_rkasay.png',
      },
    ],
    start_date,
    end_date,
  },
  {
    name: "Presidents' Day Sale",
    description: '',
    type: ItemTypeEnum.EMAIL_TEMPLATE,
    data: {
      design: presidentDaySaleData,
    },
    imageData: [
      {
        height: 1059,
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673962299/Frame_8_5_grsjzr.png',
        width: 600,
      },
    ],
    start_date,
    end_date,
  },
  //
  {
    name: 'Giveaway + Valentines Day',
    description: '',
    type: ItemTypeEnum.EMAIL_TEMPLATE,
    data: {
      design: giveawayValentinesDay,
    },
    imageData: [
      {
        height: 2591,
        width: 600,
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673962728/Frame_9_3_fsd5zc.png',
      },
    ],
    start_date,
    end_date,
  },
  {
    name: 'Credist Page 1 - 2',
    description: '',
    type: ItemTypeEnum.CREDITS,
    imageData: creditImageData,
    data: {
      credits: 100,
    },
    start_date,
    end_date,
  },
  {
    name: 'Hold Up! Instantly Unlock',
    description: '',
    type: ItemTypeEnum.SIGNUP_FORM,
    data: {
      formDesign: holdUpUnlockDataFormData.formDesign,
      successDesign: holdUpUnlockDataFormData.successDesig,
    } satisfies ItemSignupFormData,
    imageData: [
      {
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673975176/Frame_15_4_f4dwbt.png',
        height: 824,
        width: 1315,
      },
      {
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673975176/Frame_16_3_gzh21m.png',
        height: 661,
        width: 700,
      },
      {
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673975177/Frame_17_1_znmnfb.png',
        height: 661,
        width: 700,
      },
    ],
    start_date,
    end_date,
  },
];

export const pageUnlockPageLevel5: Partial<Item>[] = [
  {
    name: 'A Collection for the women that inpire us',
    description: '',
    type: ItemTypeEnum.EMAIL_TEMPLATE,
    data: {
      design: womentCollection,
    },
    imageData: [
      {
        height: 1801,
        width: 600,
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673963089/Frame_10_2_jg4q6d.png',
      },
    ],
    start_date,
    end_date,
  },

  {
    name: 'New Spring Favourites',
    description: '',
    type: ItemTypeEnum.EMAIL_TEMPLATE,
    data: { design: newFavouritesData },
    imageData: [
      {
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673964001/Frame_11_4_itnw3r.png',
        height: 2973,
        width: 600,
      },
    ],
    start_date,
    end_date,
  },
  {
    name: 'Celebrating Internation Womens Day',
    description: '',
    type: ItemTypeEnum.EMAIL_TEMPLATE,
    data: {
      design: celebratinIWDData,
    },
    imageData: [
      {
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673964361/Frame_12_2_kqcwua.png',
        height: 1118,
        width: 600,
      },
    ],
    start_date,
    end_date,
  },
  {
    name: 'Credits Page 2',
    description: '',
    type: ItemTypeEnum.CREDITS,
    imageData: creditImageData,
    data: {
      credits: 100,
    },
    start_date,
    end_date,
  },
];

export const pageUnlockPageLevel8: Partial<Item>[] = [
  {
    name: "We're spring cleaning early",
    description: '',
    type: ItemTypeEnum.EMAIL_TEMPLATE,
    data: {
      design: wereSpringCleaingEarly,
    },
    imageData: [
      {
        height: 1515,
        width: 600,
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673966050/Frame_13_1_nb6r2j.png',
      },
    ],
    start_date,
    end_date,
  },
  {
    name: 'Your lucky today. Save 30%',
    description: '',
    type: ItemTypeEnum.EMAIL_TEMPLATE,
    data: {
      design: feelingLukcyData,
    },
    imageData: [
      {
        height: 916,
        width: 600,
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673974137/Frame_14_fodhus.png',
      },
    ],
    start_date,
    end_date,
  },
  {
    name: 'In the club',
    description: '',
    type: ItemTypeEnum.SIGNUP_FORM,
    data: {
      formDesign: inTheClub.formDesign,
      successDesign: inTheClub.successDesign,
    } satisfies ItemSignupFormData,
    imageData: [
      {
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673976341/Frame_22_1_szqtyv.png',
        height: 670,
        width: 986,
      },
      {
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673976385/Frame_20_1_ji8mgk.png',
        height: 425,
        width: 708,
      },
      {
        src: 'https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1673976382/Frame_21_1_re8gga.png',
        height: 401,
        width: 708,
      },
    ],
    start_date,
    end_date,
  },
];
