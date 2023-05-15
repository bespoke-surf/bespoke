import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  JSONObject: any;
  PhoneNumber: any;
};

export type About = {
  __typename?: 'About';
  about?: Maybe<Scalars['String']>;
  aboutHTML?: Maybe<Scalars['String']>;
  aboutLexical?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  industry?: Maybe<Scalars['String']>;
};

/** different type of industry verticals */
export enum AboutIndustryEnum {
  AgencyMarketingConsulting = 'AGENCY_MARKETING_CONSULTING',
  BankingFinancialServicesInsurance = 'BANKING_FINANCIAL_SERVICES_INSURANCE',
  EcommerceApparelAccessories = 'ECOMMERCE_APPAREL_ACCESSORIES',
  EcommerceAutomotive = 'ECOMMERCE_AUTOMOTIVE',
  EcommerceElectronics = 'ECOMMERCE_ELECTRONICS',
  EcommerceFoodBeverage = 'ECOMMERCE_FOOD_BEVERAGE',
  EcommerceHardwareHomeImprovements = 'ECOMMERCE_HARDWARE_HOME_IMPROVEMENTS',
  EcommerceHealthBeauty = 'ECOMMERCE_HEALTH_BEAUTY',
  EcommerceHousewaresHomeFurnishingsGarden = 'ECOMMERCE_HOUSEWARES_HOME_FURNISHINGS_GARDEN',
  EcommerceJewelry = 'ECOMMERCE_JEWELRY',
  EcommerceMassMerchant = 'ECOMMERCE_MASS_MERCHANT',
  EcommerceOfficeSupplies = 'ECOMMERCE_OFFICE_SUPPLIES',
  EcommerceOther = 'ECOMMERCE_OTHER',
  EcommerceSpecialty = 'ECOMMERCE_SPECIALTY',
  EcommerceSportingGoods = 'ECOMMERCE_SPORTING_GOODS',
  EcommerceToysHobbies = 'ECOMMERCE_TOYS_HOBBIES',
  Education = 'EDUCATION',
  EventsEntertainment = 'EVENTS_ENTERTAINMENT',
  NonProfit = 'NON_PROFIT',
  Other = 'OTHER',
  PolitcsGoverment = 'POLITCS_GOVERMENT',
  RealEstateConstruction = 'REAL_ESTATE_CONSTRUCTION',
  Restaurants = 'RESTAURANTS',
  SoftwareSass = 'SOFTWARE_SASS',
  Telecommunication = 'TELECOMMUNICATION',
  Travel = 'TRAVEL'
}

/** add comma speratedEmails to list input */
export type AddCommaSeperatedEmailsToListInput = {
  emails: Scalars['String'];
  listId: Scalars['String'];
  storeId: Scalars['String'];
};

/** add more product images */
export type AddMoreProductImagesInput = {
  image: ProductImageInput;
  productId: Scalars['String'];
};

/** add signup form item */
export type AddSignupFormItem = {
  itemId: Scalars['String'];
  listId: Scalars['String'];
  storeId: Scalars['String'];
};

/** Workflow state delay activity vlaue */
export type BaseConditionalFilter = {
  __typename?: 'BaseConditionalFilter';
  condition?: Maybe<BaseConditionalFilterConditionEnum>;
  value?: Maybe<BaseConditionalFilterValueUnion>;
};

/** different workflwo flow filters */
export enum BaseConditionalFilterConditionEnum {
  HasDoneOrNotDone = 'HAS_DONE_OR_NOT_DONE',
  HasNotBeenInThisFlow = 'HAS_NOT_BEEN_IN_THIS_FLOW',
  IsInListOrNot = 'IS_IN_LIST_OR_NOT'
}

/** Workflow state delay activity vlaue */
export type BaseConditionalFilterHasDoneOrNotDoneValue = {
  __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue';
  inequality?: Maybe<BaseConditionalFilterHasDoneOrNotDoneValueInequality>;
  time?: Maybe<BaseConditionalFilterHasDoneOrNotDoneValueTime>;
  trigger?: Maybe<BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum>;
};

/** Workflow state delay activity vlaue */
export type BaseConditionalFilterHasDoneOrNotDoneValueInequality = {
  __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality';
  expression?: Maybe<BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum>;
  value?: Maybe<Scalars['Float']>;
};

/** Workflow state delay activity vlaue */
export type BaseConditionalFilterHasDoneOrNotDoneValueInequalityInput = {
  expression: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum;
  value?: InputMaybe<Scalars['Float']>;
};

/** Workflow state delay activity vlaue */
export type BaseConditionalFilterHasDoneOrNotDoneValueInput = {
  inequality: BaseConditionalFilterHasDoneOrNotDoneValueInequalityInput;
  time: BaseConditionalFilterHasDoneOrNotDoneValueTimeInput;
  trigger: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum;
};

/** Workflow state delay activity vlaue */
export type BaseConditionalFilterHasDoneOrNotDoneValueTime = {
  __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime';
  date1?: Maybe<Scalars['String']>;
  date2?: Maybe<Scalars['String']>;
  delayType?: Maybe<DelayTypeEnum>;
  expression?: Maybe<BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum>;
  value1?: Maybe<Scalars['Float']>;
  value2?: Maybe<Scalars['Float']>;
};

/** different workflwo flow filters inequality expressions */
export enum BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum {
  After = 'AFTER',
  Before = 'BEFORE',
  Between = 'BETWEEN',
  BetweenDates = 'BETWEEN_DATES',
  InTheLast = 'IN_THE_LAST',
  OverAllTime = 'OVER_ALL_TIME',
  SinceStartingThisFlow = 'SINCE_STARTING_THIS_FLOW'
}

/** Workflow state delay activity vlaue */
export type BaseConditionalFilterHasDoneOrNotDoneValueTimeInput = {
  date1?: InputMaybe<Scalars['String']>;
  date2?: InputMaybe<Scalars['String']>;
  delayType?: InputMaybe<DelayTypeEnum>;
  expression: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum;
  value1?: InputMaybe<Scalars['Float']>;
  value2?: InputMaybe<Scalars['Float']>;
};

/** different workflwo flow filters inequality expressions */
export enum BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum {
  EmailBounced = 'EMAIL_BOUNCED',
  EmailDropped = 'EMAIL_DROPPED',
  EmailLinkClicked = 'EMAIL_LINK_CLICKED',
  EmailMarkedAsSpam = 'EMAIL_MARKED_AS_SPAM',
  EmailOpened = 'EMAIL_OPENED',
  EmailReceived = 'EMAIL_RECEIVED',
  EmailSent = 'EMAIL_SENT',
  EmailUnsubscribed = 'EMAIL_UNSUBSCRIBED',
  ShopifyCancelledOrder = 'SHOPIFY_CANCELLED_ORDER',
  ShopifyCheckoutStarted = 'SHOPIFY_CHECKOUT_STARTED',
  ShopifyFulfilledOrder = 'SHOPIFY_FULFILLED_ORDER',
  ShopifyPlacedOrder = 'SHOPIFY_PLACED_ORDER',
  ShopifyRefundedOrder = 'SHOPIFY_REFUNDED_ORDER'
}

export type BaseConditionalFilterValueUnion = BaseConditionalFilterHasDoneOrNotDoneValue;

/** different workflwo flow filters inequality expressions */
export enum BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum {
  AtLeastOnce = 'AT_LEAST_ONCE',
  DoesntEqual = 'DOESNT_EQUAL',
  Equals = 'EQUALS',
  IsAtLeast = 'IS_AT_LEAST',
  IsAtMost = 'IS_AT_MOST',
  IsGreaterThan = 'IS_GREATER_THAN',
  IsLessThan = 'IS_LESS_THAN',
  ZeroTimes = 'ZERO_TIMES'
}

/** Workflow state delay activity vlaue */
export type BaseTriggerFilter = {
  __typename?: 'BaseTriggerFilter';
  dimension?: Maybe<BaseTriggerFilterDimensionEnum>;
  type?: Maybe<BaseTriggerFilterTypeEnum>;
  value?: Maybe<BaseTriggerFilterValueUnion>;
};

/** Workflow state delay activity vlaue */
export type BaseTriggerFilterBooleanValue = {
  __typename?: 'BaseTriggerFilterBooleanValue';
  booleanValue?: Maybe<Scalars['Boolean']>;
};

/** Workflow state delay activity vlaue */
export type BaseTriggerFilterDateValue = {
  __typename?: 'BaseTriggerFilterDateValue';
  dateDate1?: Maybe<Scalars['String']>;
  dateDate2?: Maybe<Scalars['String']>;
  dateDelayType?: Maybe<DelayTypeEnum>;
  dateExpression?: Maybe<BaseTriggerFilterDateValueExpressionEnum>;
  dateValue1?: Maybe<Scalars['Float']>;
  dateValue2?: Maybe<Scalars['Float']>;
};

/** different workflwo flow filters inequality expressions */
export enum BaseTriggerFilterDateValueExpressionEnum {
  DayIsInMonthOff = 'DAY_IS_IN_MONTH_OFF',
  DayIsInTheLast = 'DAY_IS_IN_THE_LAST',
  DayIsInTheNext = 'DAY_IS_IN_THE_NEXT',
  DayIsInThisMonth = 'DAY_IS_IN_THIS_MONTH',
  DayIsToday = 'DAY_IS_TODAY',
  IsAfter = 'IS_AFTER',
  IsAtLeast = 'IS_AT_LEAST',
  IsBefore = 'IS_BEFORE',
  IsBetween = 'IS_BETWEEN',
  IsBetweenDates = 'IS_BETWEEN_DATES',
  IsInTheLast = 'IS_IN_THE_LAST',
  IsInTheNext = 'IS_IN_THE_NEXT'
}

/** different workflow trigger filters */
export enum BaseTriggerFilterDimensionEnum {
  DiscountCodes = 'DISCOUNT_CODES',
  DollarValue = 'DOLLAR_VALUE',
  Items = 'ITEMS',
  ItemCount = 'ITEM_COUNT',
  Name = 'NAME',
  ProductId = 'PRODUCT_ID',
  Quantity = 'QUANTITY',
  ShippingRate = 'SHIPPING_RATE',
  Sku = 'SKU',
  SourceName = 'SOURCE_NAME',
  TotalDiscounts = 'TOTAL_DISCOUNTS',
  VariantName = 'VARIANT_NAME',
  Vendor = 'VENDOR'
}

/** Workflow state delay activity vlaue */
export type BaseTriggerFilterListValue = {
  __typename?: 'BaseTriggerFilterListValue';
  listExpression?: Maybe<BaseTriggerFilterListValueExpressionEnum>;
  listValue?: Maybe<Scalars['String']>;
};

/** different workflwo flow filters inequality expressions */
export enum BaseTriggerFilterListValueExpressionEnum {
  Contains = 'CONTAINS',
  DosentContain = 'DOSENT_CONTAIN',
  HasAtleast = 'HAS_ATLEAST',
  HasAtleastOneItem = 'HAS_ATLEAST_ONE_ITEM',
  HasAtmost = 'HAS_ATMOST',
  HasFewerThan = 'HAS_FEWER_THAN',
  HasMoreThan = 'HAS_MORE_THAN',
  IsEmpty = 'IS_EMPTY'
}

/** Workflow state delay activity vlaue */
export type BaseTriggerFilterNumberValue = {
  __typename?: 'BaseTriggerFilterNumberValue';
  numberExpression?: Maybe<BaseTriggerFilterNumberValueExpressionEnum>;
  numberValue?: Maybe<Scalars['Int']>;
};

/** different number value expression */
export enum BaseTriggerFilterNumberValueExpressionEnum {
  DosentEqual = 'DOSENT_EQUAL',
  Equals = 'EQUALS',
  IsAtleast = 'IS_ATLEAST',
  IsAtMost = 'IS_AT_MOST',
  IsGreaterThan = 'IS_GREATER_THAN',
  IsLessThan = 'IS_LESS_THAN'
}

/** Workflow state delay activity vlaue */
export type BaseTriggerFilterTextValue = {
  __typename?: 'BaseTriggerFilterTextValue';
  textExpression?: Maybe<BaseTriggerFilterTextValueExpressionEnum>;
  textValue?: Maybe<Scalars['String']>;
};

/** different text value expressions */
export enum BaseTriggerFilterTextValueExpressionEnum {
  Contains = 'CONTAINS',
  DosentContain = 'DOSENT_CONTAIN',
  DosentEndsWith = 'DOSENT_ENDS_WITH',
  DosentEqual = 'DOSENT_EQUAL',
  DosentStartWith = 'DOSENT_START_WITH',
  EndsWith = 'ENDS_WITH',
  Equals = 'EQUALS',
  IsIn = 'IS_IN',
  IsNotIn = 'IS_NOT_IN',
  IsNotSet = 'IS_NOT_SET',
  IsSet = 'IS_SET',
  StartsWith = 'STARTS_WITH'
}

/** different workflow trigger filters */
export enum BaseTriggerFilterTypeEnum {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  List = 'LIST',
  Number = 'NUMBER',
  Text = 'TEXT'
}

export type BaseTriggerFilterValueUnion = BaseTriggerFilterBooleanValue | BaseTriggerFilterDateValue | BaseTriggerFilterListValue | BaseTriggerFilterNumberValue | BaseTriggerFilterTextValue;

/** benchmark data */
export type BenchmarkData = {
  __typename?: 'BenchmarkData';
  clicked: Scalars['String'];
  contact: Scalars['String'];
  delivered: Scalars['String'];
  id: Scalars['String'];
  opened: Scalars['String'];
};

export type Billing = {
  __typename?: 'Billing';
  billingPlanStatus: BillingPlanStatus;
  billingSubscriptionEntity?: Maybe<BillingSubscriptionEntity>;
  cancelAtPeriodEnd: Scalars['Boolean'];
  contactsQuantity: Scalars['Float'];
  currentPeriodEnd?: Maybe<Scalars['DateTime']>;
  emailSendQuantity: Scalars['Float'];
  id: Scalars['ID'];
  subscriptionId?: Maybe<Scalars['String']>;
};

/** different types of subscription */
export enum BillingPlanStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Free = 'FREE',
  PastDue = 'PAST_DUE',
  Pending = 'PENDING'
}

/** different entities used for billing subscription */
export enum BillingSubscriptionEntity {
  Shopify = 'SHOPIFY',
  Stripe = 'STRIPE'
}

/** CDN type of imags */
export enum CdnType {
  Cloudinary = 'CLOUDINARY',
  Shopify = 'SHOPIFY'
}

/** Product in posts */
export type Challenge = {
  __typename?: 'Challenge';
  challengeType: ChallengeTypeEnum;
  completionCount: Scalars['Float'];
  completionStages: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isHidden: Scalars['Boolean'];
  measuredMetric?: Maybe<MetricType>;
  measuredUnit?: Maybe<ChallengeMeasuredValueUnit>;
  measuredValue?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  questId: Scalars['String'];
};

/** different types of challenges */
export enum ChallengeMeasuredValueUnit {
  Percentage = 'PERCENTAGE',
  Rate = 'RATE'
}

/** different types of challenges */
export enum ChallengeTypeEnum {
  Challenge = 'CHALLENGE'
}

/** update store details input */
export type CompleteOnboardingInput = {
  about: Scalars['String'];
  address1: Scalars['String'];
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  name: Scalars['String'];
  senderEmail: Scalars['String'];
  senderName: Scalars['String'];
  state?: InputMaybe<Scalars['String']>;
  subdomain: Scalars['String'];
  zipCode: Scalars['String'];
};

export type Contact = {
  __typename?: 'Contact';
  address1: Scalars['String'];
  address2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  senderEmail: Scalars['String'];
  senderName: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  zipCode: Scalars['String'];
};

/** contact limit status */
export enum ContactLimitStatus {
  Allowed = 'ALLOWED',
  BrinkOfDissalwoed = 'BRINK_OF_DISSALWOED',
  Disallowed = 'DISALLOWED'
}

/** update store details input */
export type CreateConditionalSplitNodeInput = {
  flowFilter: Array<Array<WorkflowFlowFilterInput>>;
  otherWise: Scalars['Boolean'];
  workflowId: Scalars['String'];
  workflowStateId: Scalars['String'];
};

/** create new connection */
export type CreateNewDelayNodeInput = {
  delayInMilliseconds: Scalars['Float'];
  delayType: Scalars['String'];
  otherWise: Scalars['Boolean'];
  workflowId: Scalars['String'];
  workflowStateId: Scalars['String'];
};

/** create post input */
export type CreatePostInput = {
  bodyHTML?: InputMaybe<Scalars['String']>;
  bodyLexical?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<ImageInput>;
  storeId: Scalars['String'];
  subTitle?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

/** create post input */
export type CreatePostViewedInput = {
  ipAddress?: InputMaybe<Scalars['String']>;
  postHandle: Scalars['String'];
  referer?: InputMaybe<Scalars['String']>;
  utmData?: InputMaybe<MetricUtmDataInput>;
};

/** create category input */
export type CreateProductInput = {
  externalLink: Scalars['String'];
  image: Array<ProductImageInput>;
  name: Scalars['String'];
  price: Scalars['Int'];
  productSource: ProductSource;
  storeId: Scalars['String'];
  type: ProductType;
};

/** create send email */
export type CreateSendEmailNodeInput = {
  design: Scalars['String'];
  html: Scalars['String'];
  otherWise: Scalars['Boolean'];
  subject: Scalars['String'];
  type: Scalars['String'];
  workflowId: Scalars['String'];
  workflowStateId: Scalars['String'];
};

/** update store details input */
export type CreateShopifyAppSubscriptionInput = {
  contactQuantity: Scalars['Int'];
  isPremium: Scalars['Boolean'];
  subdomain: Scalars['String'];
};

/** add signup form input */
export type CreateSignupFormInput = {
  listId: Scalars['String'];
  name: Scalars['String'];
  storeId: Scalars['String'];
};

/** update store details input */
export type CreateTriggerSplitNodeInput = {
  otherWise: Scalars['Boolean'];
  triggerFilter: Array<Array<WorkflowTriggerFilterInput>>;
  workflowId: Scalars['String'];
  workflowStateId: Scalars['String'];
};

/** create user with email input */
export type CreateUserWithEmailInput = {
  email: Scalars['String'];
  name: Scalars['String'];
};

export type CsvFileEmail = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
};

/** different workflwo flow filters inequality expressions */
export enum DelayTypeEnum {
  Days = 'DAYS',
  Hours = 'HOURS',
  Minutes = 'MINUTES',
  Weeks = 'WEEKS'
}

export type DisplayPicture = {
  __typename?: 'DisplayPicture';
  height: Scalars['Int'];
  src: Scalars['String'];
  width: Scalars['Int'];
};

/** email concent */
export type EmailConcent = {
  __typename?: 'EmailConcent';
  collectedFrom: EmailConcentCollectedFrom;
  id: Scalars['ID'];
  optInLevel: EmailConcentOptInLevel;
  state: EmailConcentState;
};

/** email concent collected from */
export enum EmailConcentCollectedFrom {
  Import = 'IMPORT',
  LandingPage = 'LANDING_PAGE',
  Other = 'OTHER',
  SignupForm = 'SIGNUP_FORM'
}

/** email concent opt in level */
export enum EmailConcentOptInLevel {
  ConfirmedOptIn = 'CONFIRMED_OPT_IN',
  SingleOptIn = 'SINGLE_OPT_IN',
  SingleOptInWithNotification = 'SINGLE_OPT_IN_WITH_NOTIFICATION'
}

/** email concent state */
export enum EmailConcentState {
  Subscribed = 'SUBSCRIBED',
  Unsubscribed = 'UNSUBSCRIBED'
}

/** email delivery status */
export enum EmailDeliveryStatus {
  Bounced = 'BOUNCED',
  Subscribed = 'SUBSCRIBED'
}

/** email login input */
export type EmailLoginInput = {
  email: Scalars['String'];
};

/** email sent limit status */
export enum EmailSentLimitStatus {
  Allowed = 'ALLOWED',
  BrinkOfDissalwoed = 'BRINK_OF_DISSALWOED',
  Disallowed = 'DISALLOWED'
}

/** Event */
export type Event = {
  __typename?: 'Event';
  createdAt: Scalars['DateTime'];
  eventAccessRestriction: EventConfidentiality;
  eventState: EventState;
  eventType: EventType;
  id: Scalars['ID'];
  link?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  notificationDismissed: Scalars['Boolean'];
  notificationRead: Scalars['Boolean'];
  showAsNotification: Scalars['Boolean'];
  userId: Scalars['String'];
};

/** different types of confidential events for user */
export enum EventConfidentiality {
  High = 'HIGH',
  Low = 'LOW',
  Medium = 'MEDIUM'
}

/** different types of event */
export enum EventState {
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
  Failed = 'FAILED'
}

/** different types of event */
export enum EventType {
  GrowthStar = 'GROWTH_STAR',
  Integration = 'INTEGRATION',
  List = 'LIST',
  Post = 'POST',
  Product = 'PRODUCT',
  Shopify = 'SHOPIFY',
  ShopifyCustomerSync = 'SHOPIFY_CUSTOMER_SYNC',
  ShopifyCustomerSyncProgress = 'SHOPIFY_CUSTOMER_SYNC_PROGRESS',
  ShopifyProductSync = 'SHOPIFY_PRODUCT_SYNC',
  ShopifyProductSyncProgress = 'SHOPIFY_PRODUCT_SYNC_PROGRESS',
  SignupForm = 'SIGNUP_FORM',
  Store = 'STORE',
  StoreChallenge = 'STORE_CHALLENGE',
  Subscriber = 'SUBSCRIBER',
  SubscriberList = 'SUBSCRIBER_LIST',
  User = 'USER',
  Workflow = 'WORKFLOW'
}

export type GetStoreEmailMetric = {
  __typename?: 'GetStoreEmailMetric';
  clicked: Scalars['Int'];
  clickedTrend: Scalars['Float'];
  contact: Scalars['Int'];
  delivered: Scalars['Int'];
  deliveredTrend: Scalars['Float'];
  opened: Scalars['Int'];
  openedTrend: Scalars['Float'];
};

export type ImageInput = {
  height: Scalars['Int'];
  src: Scalars['String'];
  width: Scalars['Int'];
};

/** Integration */
export type Integration = {
  __typename?: 'Integration';
  id: Scalars['ID'];
  shopify?: Maybe<Shopify>;
};

/** Item */
export type Item = {
  __typename?: 'Item';
  createdAt: Scalars['DateTime'];
  credits?: Maybe<Scalars['Float']>;
  data: ItemDataUnion;
  description?: Maybe<Scalars['String']>;
  end_date?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  imageData: Array<ItemImageData>;
  itemCategory: ItemCategory;
  itemCategoryId: Scalars['String'];
  name: Scalars['String'];
  start_date?: Maybe<Scalars['DateTime']>;
  type: ItemTypeEnum;
};

/** ItemCategory */
export type ItemCategory = {
  __typename?: 'ItemCategory';
  id: Scalars['ID'];
  items: Array<Item>;
  type: ItemCategoryTypeEnum;
};

/** item category type enum */
export enum ItemCategoryTypeEnum {
  Scubscription = 'SCUBSCRIPTION',
  Shop = 'SHOP'
}

export type ItemCreditsData = {
  __typename?: 'ItemCreditsData';
  credits: Scalars['Float'];
};

export type ItemDataUnion = ItemCreditsData | ItemEmailTemplateData | ItemSignupFormData;

export type ItemEmailTemplateData = {
  __typename?: 'ItemEmailTemplateData';
  design: Scalars['String'];
};

export type ItemImageData = {
  __typename?: 'ItemImageData';
  height: Scalars['Float'];
  src: Scalars['String'];
  width: Scalars['Float'];
};

export type ItemSignupFormData = {
  __typename?: 'ItemSignupFormData';
  formDesign: Scalars['String'];
  successDesign: Scalars['String'];
};

/** different item types */
export enum ItemTypeEnum {
  Credits = 'CREDITS',
  EmailTemplate = 'EMAIL_TEMPLATE',
  SignupForm = 'SIGNUP_FORM'
}

/** List */
export type List = {
  __typename?: 'List';
  addedThisWeek: Scalars['String'];
  addedToday: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isDefaultStoreList: Scalars['Boolean'];
  members: Scalars['Int'];
  name: Scalars['String'];
  starred: Scalars['Boolean'];
  store?: Maybe<Store>;
};

/** Subscriber Metric */
export type Metric = {
  __typename?: 'Metric';
  createdAt: Scalars['DateTime'];
  data?: Maybe<MetricData>;
  id: Scalars['ID'];
  list?: Maybe<List>;
  listId?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  metricType: MetricType;
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['String']>;
  signupForm?: Maybe<SignupForm>;
  signupFormId?: Maybe<Scalars['String']>;
  storeId: Scalars['String'];
  subscriber?: Maybe<Subscriber>;
  subscriberId?: Maybe<Scalars['String']>;
};

export type MetricData = MetricEmailLinkClicked | MetricPostViewed | MetricShopifyCancelledOrder | MetricShopifyCheckoutUpdate | MetricShopifyFulfilledOrder | MetricShopifyPlacedOrder;

export type MetricEmailLinkClicked = {
  __typename?: 'MetricEmailLinkClicked';
  link: Scalars['String'];
  type: MetricType;
};

export type MetricPostViewed = {
  __typename?: 'MetricPostViewed';
  ipAddress?: Maybe<Scalars['String']>;
  referer?: Maybe<Scalars['String']>;
  type: MetricType;
  utm?: Maybe<MetricUtmDataType>;
};

export type MetricShopifyCancelledOrder = {
  __typename?: 'MetricShopifyCancelledOrder';
  discount_codes: Array<MetricShopifyDiscountCodes>;
  id: Scalars['Int'];
  line_items: Array<MetricShopifyLineItems>;
  shipping_lines: Array<MetricShopifyShippingLines>;
  source_name: Scalars['String'];
  subtotal_price: Scalars['String'];
  total_discounts: Scalars['String'];
  total_price: Scalars['String'];
  type: MetricType;
};

export type MetricShopifyCheckoutUpdate = {
  __typename?: 'MetricShopifyCheckoutUpdate';
  abandoned_checkout_url: Scalars['String'];
  discount_codes: Array<MetricShopifyDiscountCodes>;
  id: Scalars['Int'];
  line_items: Array<MetricShopifyLineItems>;
  shipping_lines: Array<MetricShopifyShippingLines>;
  source_name: Scalars['String'];
  subtotal_price: Scalars['String'];
  total_discounts: Scalars['String'];
  total_price: Scalars['String'];
  type: MetricType;
};

export type MetricShopifyDiscountCodes = {
  __typename?: 'MetricShopifyDiscountCodes';
  amount: Scalars['String'];
  code: Scalars['String'];
  type: Scalars['String'];
};

export type MetricShopifyFulfilledOrder = {
  __typename?: 'MetricShopifyFulfilledOrder';
  discount_codes: Array<MetricShopifyDiscountCodes>;
  id: Scalars['Int'];
  line_items: Array<MetricShopifyLineItems>;
  shipping_lines: Array<MetricShopifyShippingLines>;
  source_name: Scalars['String'];
  subtotal_price: Scalars['String'];
  total_discounts: Scalars['String'];
  total_price: Scalars['String'];
  type: MetricType;
};

export type MetricShopifyLineItems = {
  __typename?: 'MetricShopifyLineItems';
  compare_at_price?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  key: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['String'];
  product_id: Scalars['Int'];
  title: Scalars['String'];
};

export type MetricShopifyPlacedOrder = {
  __typename?: 'MetricShopifyPlacedOrder';
  discount_codes: Array<MetricShopifyDiscountCodes>;
  id: Scalars['Int'];
  line_items: Array<MetricShopifyLineItems>;
  shipping_lines: Array<MetricShopifyShippingLines>;
  source_name: Scalars['String'];
  subtotal_price: Scalars['String'];
  total_discounts: Scalars['String'];
  total_price: Scalars['String'];
  type: MetricType;
};

export type MetricShopifyRefundedOrderLineItem = {
  __typename?: 'MetricShopifyRefundedOrderLineItem';
  name: Scalars['String'];
  total_discount: Scalars['String'];
};

export type MetricShopifyRefundedOrderLineItems = {
  __typename?: 'MetricShopifyRefundedOrderLineItems';
  line_item: MetricShopifyRefundedOrderLineItem;
};

export type MetricShopifyShippingLines = {
  __typename?: 'MetricShopifyShippingLines';
  code: Scalars['String'];
};

/** different types of metrics */
export enum MetricType {
  EmailBounced = 'EMAIL_BOUNCED',
  EmailDelivered = 'EMAIL_DELIVERED',
  EmailDropped = 'EMAIL_DROPPED',
  EmailLinkClicked = 'EMAIL_LINK_CLICKED',
  EmailMarkedAsSpam = 'EMAIL_MARKED_AS_SPAM',
  EmailOpened = 'EMAIL_OPENED',
  EmailSent = 'EMAIL_SENT',
  EmailUnsubscribed = 'EMAIL_UNSUBSCRIBED',
  FormSubmitted = 'FORM_SUBMITTED',
  FormViewed = 'FORM_VIEWED',
  PostDeleted = 'POST_DELETED',
  PostPublished = 'POST_PUBLISHED',
  PostUnpublished = 'POST_UNPUBLISHED',
  PostViewed = 'POST_VIEWED',
  ProductViewed = 'PRODUCT_VIEWED',
  ShopifyCancelledOrder = 'SHOPIFY_CANCELLED_ORDER',
  ShopifyCancelledOrderValue = 'SHOPIFY_CANCELLED_ORDER_VALUE',
  ShopifyCheckoutStarted = 'SHOPIFY_CHECKOUT_STARTED',
  ShopifyCheckoutStartedValue = 'SHOPIFY_CHECKOUT_STARTED_VALUE',
  ShopifyFulfilledOrder = 'SHOPIFY_FULFILLED_ORDER',
  ShopifyFulfilledOrderValue = 'SHOPIFY_FULFILLED_ORDER_VALUE',
  ShopifyOrderedProduct = 'SHOPIFY_ORDERED_PRODUCT',
  ShopifyOrderedProductValue = 'SHOPIFY_ORDERED_PRODUCT_VALUE',
  ShopifyPlacedOrder = 'SHOPIFY_PLACED_ORDER',
  ShopifyPlacedOrderValue = 'SHOPIFY_PLACED_ORDER_VALUE',
  ShopifyRefundedOrder = 'SHOPIFY_REFUNDED_ORDER',
  ShopifyRefundedOrderValue = 'SHOPIFY_REFUNDED_ORDER_VALUE'
}

export type MetricUtmDataInput = {
  campaign?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  medium?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<Scalars['String']>;
  term?: InputMaybe<Scalars['String']>;
};

export type MetricUtmDataType = {
  __typename?: 'MetricUtmDataType';
  campaign?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
  medium?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  term?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** update multiple product images */
  addCommaSeperatedEmailsToList?: Maybe<Scalars['Boolean']>;
  /** update product details */
  addMoreProductImages?: Maybe<Product>;
  /** add signup form item */
  addSignupFormItem?: Maybe<SignupForm>;
  /** check post handle avaialb */
  checkPostHandleAvailable: Scalars['Boolean'];
  /** add shopify integration */
  collectEmailSubscribers?: Maybe<Shopify>;
  /** create a new store */
  completeOnboarding?: Maybe<Store>;
  /** Login user */
  confirmCodeAndLogin?: Maybe<Scalars['Boolean']>;
  /** convert workflow to public */
  convertWorkflowToPublic?: Maybe<Workflow>;
  /** create checkout session url */
  createCheckoutSessionUrl?: Maybe<Scalars['String']>;
  /** update conditional split node */
  createConditionalSplitNode?: Maybe<WorkflowState>;
  /** create a list trigger */
  createListTrigger?: Maybe<WorkflowState>;
  /** create a metric trigger */
  createMetricTrigger?: Maybe<WorkflowState>;
  /** create new delay node */
  createNewDelayNode?: Maybe<Workflow>;
  /** update post */
  createNewList: List;
  /** create new workflow connection */
  createNodeConnection?: Maybe<Workflow>;
  /** create post */
  createPost?: Maybe<Post>;
  /** create post viewed */
  createPostViewed?: Maybe<Post>;
  /** update multiple product images */
  createProduct?: Maybe<Product>;
  createProductPost?: Maybe<ProductPost>;
  /** create send email node */
  createSendEmailNode?: Maybe<WorkflowState>;
  /** create shopify app subscription */
  createShopifyAppSubscription?: Maybe<Scalars['String']>;
  /** check signup form */
  createSignupForm?: Maybe<SignupForm>;
  /** update trigger split node */
  createTriggerSplitNode?: Maybe<WorkflowState>;
  /** get workflows */
  createWorkflow?: Maybe<Workflow>;
  /** delete list with id */
  deleteList: List;
  /** delete post */
  deletePost?: Maybe<Post>;
  /** delete a product */
  deleteProduct?: Maybe<Array<Product>>;
  /** delete product image */
  deleteProductImage?: Maybe<Product>;
  deleteProductPost?: Maybe<ProductPost>;
  /** check user onboarded */
  deleteSignupForm?: Maybe<SignupForm>;
  /** delete workflow name */
  deleteWorkflow?: Maybe<Workflow>;
  /** delete workflow node */
  deleteWorkflowNode?: Maybe<Workflow>;
  /** delete workflow transtion  */
  deleteWorkflowTransition?: Maybe<WorkflowState>;
  /** dismiss an event */
  dismissNotification?: Maybe<Event>;
  /** Login user */
  emailLogin?: Maybe<User>;
  /** Logout */
  logout?: Maybe<Scalars['Boolean']>;
  /** toggle send email notification */
  newSubscriberNotificationToggle?: Maybe<Notification>;
  /** publish post here */
  publishPostHere: Scalars['Boolean'];
  /** publish post here */
  publishPostToList: Scalars['Boolean'];
  /** add shopify integration */
  removeCollectEmailSubscribers?: Maybe<Shopify>;
  /** remove shopify integration */
  removeShopifyIntegration?: Maybe<Shopify>;
  /** update multiple product images */
  removeSubscriberFromList?: Maybe<SubscriberList>;
  /** replicate workflow  */
  replicateWorkflow?: Maybe<Workflow>;
  /** resubscribe to list */
  resubscribeToList?: Maybe<Subscriber>;
  /** set all events as read */
  setAllEventAsRead?: Maybe<Event>;
  /** cancle the shopify app subscription */
  shopifyAppSubscriptionCancel?: Maybe<Scalars['Boolean']>;
  /** create user with email */
  signupWithEmail?: Maybe<User>;
  /** add shopify integration */
  stopShopifyCustomerSync?: Maybe<Shopify>;
  /** add shopify integration */
  stopShopifyProductSync?: Maybe<Shopify>;
  /** update default listid ot collect email */
  subscribeToStore?: Maybe<Scalars['Boolean']>;
  syncScript?: Maybe<Scalars['Boolean']>;
  /** remove shopify integration */
  syncShopifyCustomers?: Maybe<Shopify>;
  /** remove shopify integration */
  syncShopifyProducts?: Maybe<Shopify>;
  /** toggle list trigger */
  toggleListStar?: Maybe<List>;
  /** toggle product hidden */
  toggleProductHidden?: Maybe<Scalars['Boolean']>;
  /** update workflow data */
  turnOffWorkflow?: Maybe<Workflow>;
  /** update workflow data */
  turnOnWorkflow?: Maybe<Workflow>;
  /** unpublish post */
  unpublishPost?: Maybe<Post>;
  /** unsubscribe from all list */
  unsubscribeFromAllList?: Maybe<Subscriber>;
  /** unsubscribe from list */
  unsubscribeFromList?: Maybe<SubscriberList>;
  /** update about */
  updateAbout?: Maybe<About>;
  /** update a conditional split state */
  updateConditionalSplitState?: Maybe<WorkflowState>;
  /** update default listid ot collect email */
  updateDefaultListIdToCollectEmail?: Maybe<Store>;
  /** update a delay state */
  updateDelayState?: Maybe<WorkflowState>;
  /** update display picture */
  updateDisplayPicture?: Maybe<Store>;
  /** update a flow filter */
  updateFlowFilter?: Maybe<Workflow>;
  /** update industry */
  updateIndustry?: Maybe<About>;
  /** update list trigger */
  updateListTrigger?: Maybe<WorkflowState>;
  /** update metric trigger */
  updateMetricTrigger?: Maybe<WorkflowState>;
  /** update post */
  updatePost: Scalars['Boolean'];
  /** update product details */
  updateProductDetails?: Maybe<Product>;
  /** update a conditional split state */
  updateSendEmailState?: Maybe<WorkflowState>;
  /** update signup form */
  updateSignupForm?: Maybe<SignupForm>;
  /** update the store currency */
  updateStoreCurrency: Store;
  /** update store details */
  updateStoreDetails?: Maybe<Store>;
  /** update trigger filter */
  updateTriggerFilter?: Maybe<Workflow>;
  /** update a trigger split state */
  updateTriggerSplitState?: Maybe<WorkflowState>;
  /** add description to workflow */
  updateWorkflowDescription?: Maybe<Workflow>;
  /** update workflow name */
  updateWorkflowName?: Maybe<Workflow>;
  /** uplaod csv file emails to list */
  uploadCsvFileEmailsToList?: Maybe<Scalars['String']>;
};


export type MutationAddCommaSeperatedEmailsToListArgs = {
  input: AddCommaSeperatedEmailsToListInput;
};


export type MutationAddMoreProductImagesArgs = {
  input: AddMoreProductImagesInput;
};


export type MutationAddSignupFormItemArgs = {
  input: AddSignupFormItem;
};


export type MutationCheckPostHandleAvailableArgs = {
  handle: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationCollectEmailSubscribersArgs = {
  listId: Scalars['String'];
  shopifyId: Scalars['String'];
};


export type MutationCompleteOnboardingArgs = {
  input: CompleteOnboardingInput;
};


export type MutationConfirmCodeAndLoginArgs = {
  loginCode: Scalars['String'];
};


export type MutationConvertWorkflowToPublicArgs = {
  workflowId: Scalars['String'];
};


export type MutationCreateCheckoutSessionUrlArgs = {
  contactQuantity: Scalars['Int'];
  subdomain: Scalars['String'];
};


export type MutationCreateConditionalSplitNodeArgs = {
  input: CreateConditionalSplitNodeInput;
};


export type MutationCreateListTriggerArgs = {
  listId: Scalars['String'];
  workflowId: Scalars['String'];
};


export type MutationCreateMetricTriggerArgs = {
  metricType: MetricType;
  workflowId: Scalars['String'];
};


export type MutationCreateNewDelayNodeArgs = {
  input: CreateNewDelayNodeInput;
};


export type MutationCreateNewListArgs = {
  name: Scalars['String'];
  storeId: Scalars['String'];
};


export type MutationCreateNodeConnectionArgs = {
  otherWise: Scalars['Boolean'];
  sourceId: Scalars['String'];
  targetId: Scalars['String'];
  workflowId: Scalars['String'];
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreatePostViewedArgs = {
  input: CreatePostViewedInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateProductPostArgs = {
  nodeKey: Scalars['String'];
  postId: Scalars['String'];
  productIds: Array<Scalars['String']>;
};


export type MutationCreateSendEmailNodeArgs = {
  input: CreateSendEmailNodeInput;
};


export type MutationCreateShopifyAppSubscriptionArgs = {
  input: CreateShopifyAppSubscriptionInput;
};


export type MutationCreateSignupFormArgs = {
  input: CreateSignupFormInput;
};


export type MutationCreateTriggerSplitNodeArgs = {
  input: CreateTriggerSplitNodeInput;
};


export type MutationCreateWorkflowArgs = {
  storeId: Scalars['String'];
};


export type MutationDeleteListArgs = {
  listId: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  productId: Scalars['String'];
};


export type MutationDeleteProductImageArgs = {
  deletingUrl: Scalars['String'];
  productId: Scalars['String'];
};


export type MutationDeleteProductPostArgs = {
  nodeKey: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationDeleteSignupFormArgs = {
  signupFormId: Scalars['String'];
};


export type MutationDeleteWorkflowArgs = {
  workflowId: Scalars['String'];
};


export type MutationDeleteWorkflowNodeArgs = {
  workflowStateId: Scalars['String'];
};


export type MutationDeleteWorkflowTransitionArgs = {
  workflowId: Scalars['String'];
  workflowTransitionId: Scalars['String'];
};


export type MutationDismissNotificationArgs = {
  eventId: Scalars['String'];
};


export type MutationEmailLoginArgs = {
  input: EmailLoginInput;
};


export type MutationNewSubscriberNotificationToggleArgs = {
  subdomain: Scalars['String'];
};


export type MutationPublishPostHereArgs = {
  postHandle: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationPublishPostToListArgs = {
  listId: Scalars['String'];
  postHandle: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationRemoveCollectEmailSubscribersArgs = {
  shopifyId: Scalars['String'];
};


export type MutationRemoveShopifyIntegrationArgs = {
  shopifyId: Scalars['String'];
};


export type MutationRemoveSubscriberFromListArgs = {
  listId: Scalars['String'];
  subscriberId: Scalars['String'];
};


export type MutationReplicateWorkflowArgs = {
  replicaWorkflowId: Scalars['String'];
  storeId: Scalars['String'];
};


export type MutationResubscribeToListArgs = {
  listId: Scalars['String'];
  unsubscribeId: Scalars['String'];
};


export type MutationShopifyAppSubscriptionCancelArgs = {
  subdomain: Scalars['String'];
};


export type MutationSignupWithEmailArgs = {
  input: CreateUserWithEmailInput;
};


export type MutationStopShopifyCustomerSyncArgs = {
  shopifyId: Scalars['String'];
};


export type MutationStopShopifyProductSyncArgs = {
  shopifyId: Scalars['String'];
};


export type MutationSubscribeToStoreArgs = {
  email: Scalars['String'];
  storeId: Scalars['String'];
};


export type MutationSyncShopifyCustomersArgs = {
  shopifyId: Scalars['String'];
};


export type MutationSyncShopifyProductsArgs = {
  shopifyId: Scalars['String'];
};


export type MutationToggleListStarArgs = {
  listId: Scalars['String'];
};


export type MutationToggleProductHiddenArgs = {
  productId: Scalars['String'];
};


export type MutationTurnOffWorkflowArgs = {
  workflowId: Scalars['String'];
};


export type MutationTurnOnWorkflowArgs = {
  workflowId: Scalars['String'];
};


export type MutationUnpublishPostArgs = {
  postId: Scalars['String'];
};


export type MutationUnsubscribeFromAllListArgs = {
  unsubscribeId: Scalars['String'];
};


export type MutationUnsubscribeFromListArgs = {
  listId: Scalars['String'];
  unsubscribeId: Scalars['String'];
};


export type MutationUpdateAboutArgs = {
  input: UpdateAboutInput;
};


export type MutationUpdateConditionalSplitStateArgs = {
  input: UpdateConditionalSplitStateInput;
};


export type MutationUpdateDefaultListIdToCollectEmailArgs = {
  listId: Scalars['String'];
  storeId: Scalars['String'];
};


export type MutationUpdateDelayStateArgs = {
  input: UpdateDelayStateInput;
};


export type MutationUpdateDisplayPictureArgs = {
  input: UpdateDisplayPictureInput;
};


export type MutationUpdateFlowFilterArgs = {
  input: UpdateFlowFilterInput;
};


export type MutationUpdateIndustryArgs = {
  aboutId: Scalars['String'];
  industry: AboutIndustryEnum;
};


export type MutationUpdateListTriggerArgs = {
  listId: Scalars['String'];
  workflowStateId: Scalars['String'];
};


export type MutationUpdateMetricTriggerArgs = {
  metricType: MetricType;
  workflowStateId: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationUpdateProductDetailsArgs = {
  input: UpdateProductDetailsInput;
};


export type MutationUpdateSendEmailStateArgs = {
  input: UpdateSendEmailStateInput;
};


export type MutationUpdateSignupFormArgs = {
  input: UpdateSignupformInput;
};


export type MutationUpdateStoreCurrencyArgs = {
  currency: StoreCurrency;
  storeId: Scalars['String'];
};


export type MutationUpdateStoreDetailsArgs = {
  input: UpdateStoreDetailsInput;
};


export type MutationUpdateTriggerFilterArgs = {
  input: UpdateTriggerFilterInput;
};


export type MutationUpdateTriggerSplitStateArgs = {
  input: UpdateTriggerSplitStateInput;
};


export type MutationUpdateWorkflowDescriptionArgs = {
  descriptionHTML: Scalars['String'];
  descriptionLexical: Scalars['String'];
  workflowId: Scalars['String'];
};


export type MutationUpdateWorkflowNameArgs = {
  name: Scalars['String'];
  workflowId: Scalars['String'];
};


export type MutationUploadCsvFileEmailsToListArgs = {
  input: UploadCsvFileEmailsToListInput;
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['ID'];
  newSubscriber: Scalars['Boolean'];
};

/** Post */
export type Post = {
  __typename?: 'Post';
  bodyHTML?: Maybe<Scalars['String']>;
  bodyLexical?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<PostImage>;
  postHandle?: Maybe<Scalars['String']>;
  postOpenCount: Scalars['Int'];
  postRecipientCount: Scalars['Int'];
  postState: PostState;
  postType: PostType;
  postViewCount: Scalars['Int'];
  publishedDate?: Maybe<Scalars['DateTime']>;
  store?: Maybe<Store>;
  storeId: Scalars['String'];
  subTitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type PostImage = {
  __typename?: 'PostImage';
  height: Scalars['Int'];
  src: Scalars['String'];
  width: Scalars['Int'];
};

/** Different post states */
export enum PostState {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
  Unpublish = 'UNPUBLISH'
}

/** Different post states */
export enum PostType {
  Automation = 'AUTOMATION',
  Post = 'POST'
}

/** Products  */
export type Product = {
  __typename?: 'Product';
  description?: Maybe<Scalars['String']>;
  externalLink?: Maybe<Scalars['String']>;
  hidden: Scalars['Boolean'];
  id: Scalars['ID'];
  image?: Maybe<Array<ProductImage>>;
  name?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  productData?: Maybe<ShopifyProductData>;
  productSource: ProductSource;
  productType: ProductType;
  rank: Scalars['String'];
  storeId: Scalars['String'];
};

export type ProductFileInput = {
  fileName: Scalars['String'];
  filePath: Scalars['String'];
  originalFileName: Scalars['String'];
  src: Scalars['String'];
};

export type ProductImage = {
  __typename?: 'ProductImage';
  cdnType: CdnType;
  height: Scalars['Int'];
  mimeType: Scalars['String'];
  src: Scalars['String'];
  width: Scalars['Int'];
};

/** product image */
export type ProductImageInput = {
  cdnType: CdnType;
  height: Scalars['Int'];
  mimeType: Scalars['String'];
  src: Scalars['String'];
  width: Scalars['Int'];
};

/** Product in posts */
export type ProductPost = {
  __typename?: 'ProductPost';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  nodeKey: Scalars['String'];
  post: Post;
  postId: Scalars['String'];
  product: Product;
  productId: Scalars['String'];
};

/** source of the products */
export enum ProductSource {
  Shopify = 'SHOPIFY',
  Web = 'WEB'
}

/** Diffrent types of products  */
export enum ProductType {
  DigitalProduct = 'DIGITAL_PRODUCT',
  ExternalLink = 'EXTERNAL_LINK',
  PhysicialProduct = 'PHYSICIAL_PRODUCT',
  Service = 'SERVICE'
}

export type Query = {
  __typename?: 'Query';
  /** check able to send email to list */
  checkAbleToSendEmailToList: Scalars['Boolean'];
  /** check user onboarded */
  checkUserOnboarded?: Maybe<Scalars['Boolean']>;
  /** get about  */
  getAbout?: Maybe<About>;
  /** get lists of a unsubscirber */
  getAllListsOfASubscriber?: Maybe<Array<SubscriberList>>;
  /** get all posts for sitemap */
  getAllPublishedPostForSiteMap?: Maybe<Array<Post>>;
  /** get all stores for sitemap */
  getAllStoresForSiteMap?: Maybe<Array<Store>>;
  /** get benchmark data */
  getBenchmarkData?: Maybe<Array<BenchmarkData>>;
  getCurrentStoreChallengesByQuestType?: Maybe<Array<StoreChallenge>>;
  /** customer portal session */
  getCustomerPortalSession?: Maybe<Scalars['String']>;
  /** get draft posts */
  getDraftPosts?: Maybe<Array<Post>>;
  /** get emails link clicked */
  getEmailLinkClickedCount?: Maybe<Scalars['Int']>;
  /** get emails opened count */
  getEmailOpenedCount?: Maybe<Scalars['Int']>;
  /** get emails received count */
  getEmailReceivedCount?: Maybe<Scalars['Int']>;
  /** get email sent this month */
  getEmailSentThisMonthCount?: Maybe<Scalars['Int']>;
  /** get email sent today */
  getEmailSentTodayCount?: Maybe<Scalars['Int']>;
  getEmailTemplates: Array<StoreItem>;
  getFolderItems: Array<StoreItem>;
  /** get fulfilled order count */
  getFulfilledOrderCount?: Maybe<Scalars['Int']>;
  /** get integration with subdomain */
  getIntegrationWithSubdomain?: Maybe<Integration>;
  /** get list count */
  getListCount?: Maybe<Scalars['Int']>;
  /** get lists */
  getLists: Array<List>;
  /** get mandatory quest */
  getMandatoryQuest?: Maybe<Quest>;
  /** get subscriber metrics by type */
  getMetricsByType?: Maybe<Array<Metric>>;
  /** get more post */
  getMorePosts?: Maybe<Array<Post>>;
  /** get notification */
  getNotification?: Maybe<Notification>;
  /** get notifications */
  getNotifications: Array<Event>;
  getPathCrateItems: Array<Item>;
  /** get placed order count */
  getPlacedOrderCount?: Maybe<Scalars['Int']>;
  /** get post */
  getPost?: Maybe<Post>;
  /** get post */
  getPostByHandle?: Maybe<Post>;
  /** get post count */
  getPostCount?: Maybe<Scalars['Int']>;
  /** get post */
  getPosts?: Maybe<Array<Post>>;
  /** get product from with product id */
  getProduct: Product;
  /** get product count */
  getProductCount: Scalars['Int'];
  /** get product from category */
  getProducts: Array<Product>;
  /** get public workflows */
  getPublicWorkflows?: Maybe<Array<Workflow>>;
  /** check user onboarded */
  getSignupForm?: Maybe<SignupForm>;
  /** check user onboarded */
  getSignupForms?: Maybe<Array<SignupForm>>;
  /** get signupforms with storeid */
  getSignupFormsWithStoreId?: Maybe<Array<SignupForm>>;
  /** get starred lists */
  getStarredLists?: Maybe<Array<List>>;
  getStoreBilling?: Maybe<Billing>;
  getStoreCredits: Scalars['Int'];
  /** get subscriber revenue */
  getStoreDailyRevenueTrend?: Maybe<Scalars['Int']>;
  /** get subscriber revenue */
  getStoreEmailMetric?: Maybe<GetStoreEmailMetric>;
  /** get subscriber revenue */
  getStoreRevenue?: Maybe<Scalars['Int']>;
  /** get store with store name */
  getStoreWithSubdomain?: Maybe<Store>;
  /** get subscriber */
  getSubscriber?: Maybe<Subscriber>;
  /** get subscribers */
  getSubscriberCountAddedToday?: Maybe<Scalars['Int']>;
  /** check user onboarded */
  getSubscriberLists?: Maybe<Array<SubscriberList>>;
  /** get subscriber metrics */
  getSubscriberMetrics?: Maybe<Array<Metric>>;
  /** get subscriber revenue */
  getSubscriberRevenue?: Maybe<Scalars['Int']>;
  /** get subscribers */
  getSubscribers?: Maybe<Array<Subscriber>>;
  /** get subscribers list count */
  getSubscribersCount?: Maybe<Scalars['Int']>;
  /** check user onboarded */
  getSubscribersInListCount?: Maybe<Scalars['Int']>;
  /** get total submitted form */
  getTotalFormSubmitRate: Scalars['Int'];
  /** get total submitted form */
  getTotalSubmittedForm: Scalars['Int'];
  /** check if user is onboarded */
  getUserExistByEmail: Scalars['Boolean'];
  /** get user store */
  getUserStore?: Maybe<Store>;
  /** get workflow */
  getWorkflow?: Maybe<Workflow>;
  /** get workflow count */
  getWorkflowCount?: Maybe<Scalars['Int']>;
  /** get workflows */
  getWorkflows?: Maybe<Array<Workflow>>;
  hasProductPost?: Maybe<Scalars['Boolean']>;
  me?: Maybe<User>;
  /** search subscribers by email for now */
  searchSubscribers?: Maybe<Array<Subscriber>>;
  /** Check subdomain available */
  subdomainAvailable: Scalars['Boolean'];
  /** has unread events */
  unReadNotificationCount: Scalars['Int'];
};


export type QueryCheckAbleToSendEmailToListArgs = {
  listId: Scalars['String'];
  subdomain: Scalars['String'];
};


export type QueryGetAboutArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetAllListsOfASubscriberArgs = {
  unsubscriberId: Scalars['String'];
};


export type QueryGetBenchmarkDataArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetCurrentStoreChallengesByQuestTypeArgs = {
  questType: QuestType;
  subdomain: Scalars['String'];
};


export type QueryGetCustomerPortalSessionArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetDraftPostsArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetEmailLinkClickedCountArgs = {
  subscriberId: Scalars['String'];
};


export type QueryGetEmailOpenedCountArgs = {
  subscriberId: Scalars['String'];
};


export type QueryGetEmailReceivedCountArgs = {
  subscriberId: Scalars['String'];
};


export type QueryGetEmailSentThisMonthCountArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetEmailSentTodayCountArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetEmailTemplatesArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetFolderItemsArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetFulfilledOrderCountArgs = {
  subscriberId: Scalars['String'];
};


export type QueryGetIntegrationWithSubdomainArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetListCountArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetListsArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetMandatoryQuestArgs = {
  questType: QuestType;
};


export type QueryGetMetricsByTypeArgs = {
  allMetric?: InputMaybe<Scalars['Boolean']>;
  metricType?: InputMaybe<MetricType>;
  skip: Scalars['Int'];
  subdomain: Scalars['String'];
  take: Scalars['Int'];
};


export type QueryGetMorePostsArgs = {
  postHandle: Scalars['String'];
};


export type QueryGetNotificationArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetNotificationsArgs = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryGetPlacedOrderCountArgs = {
  subscriberId: Scalars['String'];
};


export type QueryGetPostArgs = {
  postId: Scalars['String'];
};


export type QueryGetPostByHandleArgs = {
  postHandle: Scalars['String'];
};


export type QueryGetPostCountArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetPostsArgs = {
  skip: Scalars['Int'];
  subdomain: Scalars['String'];
  take: Scalars['Int'];
};


export type QueryGetProductArgs = {
  productId: Scalars['String'];
};


export type QueryGetProductCountArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetProductsArgs = {
  skip: Scalars['Int'];
  subdomain: Scalars['String'];
  take: Scalars['Int'];
};


export type QueryGetPublicWorkflowsArgs = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryGetSignupFormArgs = {
  signupFormId: Scalars['String'];
};


export type QueryGetSignupFormsArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetSignupFormsWithStoreIdArgs = {
  storeId: Scalars['String'];
};


export type QueryGetStarredListsArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetStoreBillingArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetStoreCreditsArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetStoreDailyRevenueTrendArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetStoreEmailMetricArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetStoreRevenueArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetStoreWithSubdomainArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetSubscriberArgs = {
  subscriberId: Scalars['String'];
};


export type QueryGetSubscriberCountAddedTodayArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetSubscriberListsArgs = {
  listId: Scalars['String'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryGetSubscriberMetricsArgs = {
  allMetric?: InputMaybe<Scalars['Boolean']>;
  metricType?: InputMaybe<MetricType>;
  skip: Scalars['Int'];
  subscriberId: Scalars['String'];
  take: Scalars['Int'];
};


export type QueryGetSubscriberRevenueArgs = {
  subscriberId: Scalars['String'];
};


export type QueryGetSubscribersArgs = {
  skip: Scalars['Int'];
  subdomain: Scalars['String'];
  take: Scalars['Int'];
};


export type QueryGetSubscribersCountArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetSubscribersInListCountArgs = {
  listId: Scalars['String'];
};


export type QueryGetTotalFormSubmitRateArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetTotalSubmittedFormArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetUserExistByEmailArgs = {
  email: Scalars['String'];
};


export type QueryGetWorkflowArgs = {
  workflowId: Scalars['String'];
};


export type QueryGetWorkflowCountArgs = {
  subdomain: Scalars['String'];
};


export type QueryGetWorkflowsArgs = {
  subdomain: Scalars['String'];
};


export type QueryHasProductPostArgs = {
  subdomain: Scalars['String'];
};


export type QuerySearchSubscribersArgs = {
  searchString: Scalars['String'];
  subdomain: Scalars['String'];
};


export type QuerySubdomainAvailableArgs = {
  subdomain: Scalars['String'];
};

/** Product in posts */
export type Quest = {
  __typename?: 'Quest';
  challenges: Array<Challenge>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  questType: QuestType;
};

/** quest type */
export enum QuestType {
  Custome = 'CUSTOME',
  Daily = 'DAILY',
  Milestone = 'MILESTONE',
  Weekly = 'WEEKLY'
}

/** Shopify */
export type Shopify = {
  __typename?: 'Shopify';
  authenticated: Scalars['Boolean'];
  customerSyncJobId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  listIdToCollectEmail?: Maybe<Scalars['String']>;
  productSyncJobId?: Maybe<Scalars['String']>;
  sessionExpired: Scalars['Boolean'];
  storeUrl: Scalars['String'];
};

export type ShopifyProductData = {
  __typename?: 'ShopifyProductData';
  handle: Scalars['String'];
  id: Scalars['String'];
  images?: Maybe<Array<ShopifyProductDataImage>>;
  options: Array<ShopifyProductDataOptions>;
  totalInventory: Scalars['Int'];
  variants: ShopifyProductVariantEdges;
};

export type ShopifyProductDataImage = {
  __typename?: 'ShopifyProductDataImage';
  altText?: Maybe<Scalars['String']>;
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  url: Scalars['Int'];
  width?: Maybe<Scalars['Int']>;
};

export type ShopifyProductDataOptions = {
  __typename?: 'ShopifyProductDataOptions';
  id: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['Int'];
  values: Array<Scalars['String']>;
};

export type ShopifyProductVariant = {
  __typename?: 'ShopifyProductVariant';
  compareAtPrice?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  image?: Maybe<ShopifyProductDataImage>;
  position: Scalars['Float'];
  price: Scalars['Int'];
  selectedOptions: Array<ShopifyProductVariantSlectedOptions>;
  sku?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type ShopifyProductVariantEdges = {
  __typename?: 'ShopifyProductVariantEdges';
  edges: Array<ShopifyProductVariantNode>;
};

export type ShopifyProductVariantNode = {
  __typename?: 'ShopifyProductVariantNode';
  node: ShopifyProductVariant;
};

export type ShopifyProductVariantSlectedOptions = {
  __typename?: 'ShopifyProductVariantSlectedOptions';
  name: Scalars['String'];
  value: Scalars['String'];
};

/** Signup Form */
export type SignupForm = {
  __typename?: 'SignupForm';
  form?: Maybe<SignupFormData>;
  formState: SignupFormState;
  formSubmitRate: Scalars['Float'];
  id: Scalars['ID'];
  list?: Maybe<List>;
  name: Scalars['String'];
  scriptJavascript?: Maybe<Scalars['String']>;
  scriptModule?: Maybe<Scalars['String']>;
  store?: Maybe<Store>;
  submitted: Scalars['Int'];
  success?: Maybe<SignupFormData>;
  views: Scalars['Int'];
};

export type SignupFormData = {
  __typename?: 'SignupFormData';
  body: Scalars['String'];
  css: Scalars['String'];
  design: Scalars['String'];
  fonts: Scalars['String'];
  html: Scalars['String'];
  js: Scalars['String'];
};

export type SignupFormDataInput = {
  body: Scalars['String'];
  css: Scalars['String'];
  design: Scalars['String'];
  fonts: Scalars['String'];
  html: Scalars['String'];
  js: Scalars['String'];
};

/** Signup form state */
export enum SignupFormState {
  Draft = 'DRAFT',
  Live = 'LIVE'
}

export type Store = {
  __typename?: 'Store';
  about?: Maybe<About>;
  contact?: Maybe<Contact>;
  contactLimitStatus: ContactLimitStatus;
  createdAt: Scalars['DateTime'];
  currency: StoreCurrency;
  defaultListIdToCollectEmail?: Maybe<Scalars['String']>;
  displayPicture?: Maybe<DisplayPicture>;
  emailSentLimitStatus: EmailSentLimitStatus;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  shortId?: Maybe<Scalars['String']>;
  subdomain?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

/** Store challenge */
export type StoreChallenge = {
  __typename?: 'StoreChallenge';
  allCompleted: Scalars['Boolean'];
  challenge: Challenge;
  challengeId: Scalars['String'];
  completedCount: Scalars['Float'];
  completedStages: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  storeId: Scalars['String'];
};

/** the currency of the store */
export enum StoreCurrency {
  Aed = 'AED',
  Aud = 'AUD',
  Eur = 'EUR',
  Gbp = 'GBP',
  Inr = 'INR',
  Jpy = 'JPY',
  Usd = 'USD'
}

/** Store challenge */
export type StoreItem = {
  __typename?: 'StoreItem';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  item: Item;
  itemId: Scalars['String'];
  storeId: Scalars['String'];
};

/** Subscriber */
export type Subscriber = {
  __typename?: 'Subscriber';
  createdAt: Scalars['DateTime'];
  emailStatus: SubscriberEmailStatus;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
  storeId: Scalars['String'];
  subscriberAddress?: Maybe<SubscriberAddress>;
  subscriberType: SubscriberType;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

/** Subscriber Address */
export type SubscriberAddress = {
  __typename?: 'SubscriberAddress';
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  state?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
};

/** subscrber email status */
export enum SubscriberEmailStatus {
  MarkedAsSpam = 'MARKED_AS_SPAM',
  Subscribed = 'SUBSCRIBED',
  Unsubscribed = 'UNSUBSCRIBED'
}

/** Subscriber List */
export type SubscriberList = {
  __typename?: 'SubscriberList';
  createdAt: Scalars['DateTime'];
  emailConcent: EmailConcent;
  id: Scalars['ID'];
  list: List;
  listId: Scalars['String'];
  subscriber: Subscriber;
  subscriberId: Scalars['String'];
};

/** different types of subscribers */
export enum SubscriberType {
  Author = 'AUTHOR',
  Free = 'FREE'
}

/** update about input */
export type UpdateAboutInput = {
  about: Scalars['String'];
  aboutHTML?: InputMaybe<Scalars['String']>;
  aboutId: Scalars['String'];
  aboutLexical?: InputMaybe<Scalars['String']>;
};

/** update store details input */
export type UpdateConditionalSplitStateInput = {
  flowFilter: Array<Array<WorkflowFlowFilterInput>>;
  workflowStateId: Scalars['String'];
};

/** update delay sate input */
export type UpdateDelayStateInput = {
  delayInMilliseconds: Scalars['Float'];
  delayType: DelayTypeEnum;
  workflowStateId: Scalars['String'];
};

/** update store details input */
export type UpdateDisplayPictureInput = {
  height: Scalars['Int'];
  storeId: Scalars['String'];
  url: Scalars['String'];
  width: Scalars['Int'];
};

/** update flow filter input */
export type UpdateFlowFilterInput = {
  flowFilter?: InputMaybe<Array<Array<WorkflowFlowFilterInput>>>;
  workflowId: Scalars['String'];
};

/** update post input */
export type UpdatePostInput = {
  bodyHTML?: InputMaybe<Scalars['String']>;
  bodyLexical?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<ImageInput>;
  postId: Scalars['String'];
  subTitle?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

/** update product details */
export type UpdateProductDetailsInput = {
  description: Scalars['String'];
  files?: InputMaybe<Array<ProductFileInput>>;
  hours?: InputMaybe<Scalars['Int']>;
  minutes?: InputMaybe<Scalars['Int']>;
  name: Scalars['String'];
  price: Scalars['Int'];
  productId: Scalars['String'];
  productType: ProductType;
};

/** update store details input */
export type UpdateSendEmailStateInput = {
  design: Scalars['String'];
  html: Scalars['String'];
  subject: Scalars['String'];
  type: Scalars['String'];
  workflowStateId: Scalars['String'];
};

/** add signup form input */
export type UpdateSignupformInput = {
  form: SignupFormDataInput;
  formState: SignupFormState;
  name: Scalars['String'];
  scriptJavascript: Scalars['String'];
  scriptModule: Scalars['String'];
  signupFormId: Scalars['String'];
  success: SignupFormDataInput;
};

/** update store details input */
export type UpdateStoreDetailsInput = {
  address1: Scalars['String'];
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  name: Scalars['String'];
  senderEmail: Scalars['String'];
  senderName: Scalars['String'];
  state?: InputMaybe<Scalars['String']>;
  storeAbout?: InputMaybe<Scalars['String']>;
  storeId: Scalars['String'];
  subdomain?: InputMaybe<Scalars['String']>;
  zipCode: Scalars['String'];
};

/** update flow filter input */
export type UpdateTriggerFilterInput = {
  triggerFilter?: InputMaybe<Array<Array<WorkflowTriggerFilterInput>>>;
  workflowId: Scalars['String'];
};

/** update store details input */
export type UpdateTriggerSplitStateInput = {
  triggerFilter: Array<Array<WorkflowTriggerFilterInput>>;
  workflowStateId: Scalars['String'];
};

/** upload csv file input */
export type UploadCsvFileEmailsToListInput = {
  csvFileEmails: Array<CsvFileEmail>;
  listId: Scalars['String'];
  subdomain: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  store?: Maybe<Store>;
  userEmailDeliveryStatus: UserEmailDeliveryStatus;
};

/** user email delivery status */
export type UserEmailDeliveryStatus = {
  __typename?: 'UserEmailDeliveryStatus';
  emailDeliveryStatus: EmailDeliveryStatus;
  id: Scalars['ID'];
  softBounceCount: Scalars['Int'];
};

/** Workflow */
export type Workflow = {
  __typename?: 'Workflow';
  createdAt: Scalars['DateTime'];
  descriptionHTML?: Maybe<Scalars['String']>;
  descriptionLexical?: Maybe<Scalars['String']>;
  edge?: Maybe<Array<WorkflowEdge>>;
  flowFilter?: Maybe<Array<Array<BaseConditionalFilter>>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  node?: Maybe<Array<WorkflowNode>>;
  public: Scalars['Boolean'];
  replicationCount: Scalars['Int'];
  store: Store;
  storeId: Scalars['String'];
  triggerFilter?: Maybe<Array<Array<BaseTriggerFilter>>>;
  updatedAt: Scalars['DateTime'];
  workflowStatus: WorkflowStatus;
};

/** different workflwo activity type */
export enum WorkflowActivityType {
  ConditionalSplit = 'CONDITIONAL_SPLIT',
  Delay = 'DELAY',
  ListTrigger = 'LIST_TRIGGER',
  MetricTrigger = 'METRIC_TRIGGER',
  SendEmail = 'SEND_EMAIL',
  TriggerSplit = 'TRIGGER_SPLIT'
}

/** Workflow Edge Type */
export type WorkflowEdge = {
  __typename?: 'WorkflowEdge';
  id: Scalars['ID'];
  source: Scalars['String'];
  sourceHandle: Scalars['String'];
  target: Scalars['String'];
};

/** workflow state flow filter update input */
export type WorkflowFlowFilterInput = {
  condition: BaseConditionalFilterConditionEnum;
  value: BaseConditionalFilterHasDoneOrNotDoneValueInput;
};

/** Workflow Node Type */
export type WorkflowNode = {
  __typename?: 'WorkflowNode';
  data: WorkflowNodeData;
  id: Scalars['ID'];
  position: WorkflowNodeXyPostion;
  type: WorkflowNodeType;
};

/** XYPosition */
export type WorkflowNodeData = {
  __typename?: 'WorkflowNodeData';
  id: Scalars['String'];
  name: Scalars['String'];
  value: WorkflowStateValueUnion;
  workflowActivityType: Scalars['String'];
  workflowStateType: Scalars['String'];
};

/** different workflwo node types */
export enum WorkflowNodeType {
  ConditionalSplitNode = 'ConditionalSplitNode',
  DelayNode = 'DelayNode',
  SendEmailNode = 'SendEmailNode',
  TriggerNode = 'TriggerNode',
  TriggerNodeDisabled = 'TriggerNodeDisabled',
  TriggerSplitNode = 'TriggerSplitNode'
}

/** XYPosition */
export type WorkflowNodeXyPostion = {
  __typename?: 'WorkflowNodeXYPostion';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

/** WorkflowState */
export type WorkflowState = {
  __typename?: 'WorkflowState';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  value: WorkflowStateValueUnion;
  workflowActivityType: WorkflowActivityType;
  workflowStateType: WorkflowStateType;
};

/** Workflow state delay activity vlaue */
export type WorkflowStateConditionalSplitActivityValue = {
  __typename?: 'WorkflowStateConditionalSplitActivityValue';
  flowFilter: Array<Array<BaseConditionalFilter>>;
};

/** Workflow state delay activity vlaue */
export type WorkflowStateDelayActivityValue = {
  __typename?: 'WorkflowStateDelayActivityValue';
  delayInMilliseconds: Scalars['Float'];
  delayType: DelayTypeEnum;
};

/** Workflow staet list trigger value */
export type WorkflowStateListTriggerActivityValue = {
  __typename?: 'WorkflowStateListTriggerActivityValue';
  listId: Scalars['ID'];
};

/** Workflow staet metric trigger value */
export type WorkflowStateMetricTriggerActivityValue = {
  __typename?: 'WorkflowStateMetricTriggerActivityValue';
  metricType: MetricType;
};

/** Workflow state delay activity vlaue */
export type WorkflowStateSendEmailActivityValue = {
  __typename?: 'WorkflowStateSendEmailActivityValue';
  design: Scalars['String'];
  html: Scalars['String'];
  type: Scalars['String'];
};

/** Workflow state delay activity vlaue */
export type WorkflowStateTriggerSplitActivityValue = {
  __typename?: 'WorkflowStateTriggerSplitActivityValue';
  triggerFilter: Array<Array<BaseTriggerFilter>>;
};

/** different workflwo state types */
export enum WorkflowStateType {
  Cancelled = 'CANCELLED',
  Complete = 'COMPLETE',
  Denied = 'DENIED',
  Normal = 'NORMAL',
  Start = 'START'
}

export type WorkflowStateValueUnion = WorkflowStateConditionalSplitActivityValue | WorkflowStateDelayActivityValue | WorkflowStateListTriggerActivityValue | WorkflowStateMetricTriggerActivityValue | WorkflowStateSendEmailActivityValue | WorkflowStateTriggerSplitActivityValue;

/** different workflwo status */
export enum WorkflowStatus {
  Draft = 'DRAFT',
  Inactive = 'INACTIVE',
  Live = 'LIVE'
}

/** workflow state flow filter update input */
export type WorkflowTriggerFilterInput = {
  dimension?: InputMaybe<BaseTriggerFilterDimensionEnum>;
  type?: InputMaybe<BaseTriggerFilterTypeEnum>;
  value: Scalars['JSONObject'];
};

export type AboutFragment = { __typename?: 'About', id: string, about?: string | null, aboutLexical?: string | null, aboutHTML?: string | null, industry?: string | null };

export type GetAboutQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetAboutQuery = { __typename?: 'Query', getAbout?: { __typename?: 'About', id: string, about?: string | null, aboutLexical?: string | null, aboutHTML?: string | null, industry?: string | null } | null };

export type UpdateAboutMutationVariables = Exact<{
  input: UpdateAboutInput;
}>;


export type UpdateAboutMutation = { __typename?: 'Mutation', updateAbout?: { __typename?: 'About', id: string, about?: string | null, aboutLexical?: string | null, aboutHTML?: string | null, industry?: string | null } | null };

export type UpdateIndustryMutationVariables = Exact<{
  aboutId: Scalars['String'];
  industry: AboutIndustryEnum;
}>;


export type UpdateIndustryMutation = { __typename?: 'Mutation', updateIndustry?: { __typename?: 'About', id: string, about?: string | null, aboutLexical?: string | null, aboutHTML?: string | null, industry?: string | null } | null };

export type BillingFragment = { __typename?: 'Billing', id: string, cancelAtPeriodEnd: boolean, billingPlanStatus: BillingPlanStatus, billingSubscriptionEntity?: BillingSubscriptionEntity | null, currentPeriodEnd?: any | null, contactsQuantity: number, emailSendQuantity: number };

export type GetStoreBillingQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetStoreBillingQuery = { __typename?: 'Query', getStoreBilling?: { __typename?: 'Billing', id: string, cancelAtPeriodEnd: boolean, billingPlanStatus: BillingPlanStatus, billingSubscriptionEntity?: BillingSubscriptionEntity | null, currentPeriodEnd?: any | null, contactsQuantity: number, emailSendQuantity: number } | null };

export type DismissNotificationMutationVariables = Exact<{
  eventId: Scalars['String'];
}>;


export type DismissNotificationMutation = { __typename?: 'Mutation', dismissNotification?: { __typename?: 'Event', id: string, message: string, eventState: EventState, eventType: EventType, notificationRead: boolean, notificationDismissed: boolean, createdAt: any, link?: string | null } | null };

export type EventFragment = { __typename?: 'Event', id: string, message: string, eventState: EventState, eventType: EventType, notificationRead: boolean, notificationDismissed: boolean, createdAt: any, link?: string | null };

export type GetNotificationsQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type GetNotificationsQuery = { __typename?: 'Query', getNotifications: Array<{ __typename?: 'Event', id: string, message: string, eventState: EventState, eventType: EventType, notificationRead: boolean, notificationDismissed: boolean, createdAt: any, link?: string | null }> };

export type SetAllEventsAsReadMutationVariables = Exact<{ [key: string]: never; }>;


export type SetAllEventsAsReadMutation = { __typename?: 'Mutation', setAllEventAsRead?: { __typename?: 'Event', id: string, message: string, eventState: EventState, eventType: EventType, notificationRead: boolean, notificationDismissed: boolean, createdAt: any, link?: string | null } | null };

export type UnReadNotificationCountQueryVariables = Exact<{ [key: string]: never; }>;


export type UnReadNotificationCountQuery = { __typename?: 'Query', unReadNotificationCount: number };

export type GetIntegrationWithSubdomainQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetIntegrationWithSubdomainQuery = { __typename?: 'Query', getIntegrationWithSubdomain?: { __typename?: 'Integration', id: string, shopify?: { __typename?: 'Shopify', id: string, sessionExpired: boolean, storeUrl: string, authenticated: boolean, productSyncJobId?: string | null, customerSyncJobId?: string | null, listIdToCollectEmail?: string | null } | null } | null };

export type IntegrationFragment = { __typename?: 'Integration', id: string, shopify?: { __typename?: 'Shopify', id: string, sessionExpired: boolean, storeUrl: string, authenticated: boolean, productSyncJobId?: string | null, customerSyncJobId?: string | null, listIdToCollectEmail?: string | null } | null };

export type GetPathCrateItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPathCrateItemsQuery = { __typename?: 'Query', getPathCrateItems: Array<{ __typename?: 'Item', id: string, name: string, credits?: number | null, type: ItemTypeEnum, start_date?: any | null, end_date?: any | null, description?: string | null, imageData: Array<{ __typename?: 'ItemImageData', height: number, width: number, src: string }>, data: { __typename?: 'ItemCreditsData', credits: number } | { __typename?: 'ItemEmailTemplateData', design: string } | { __typename?: 'ItemSignupFormData', formDesign: string, successDesign: string } }> };

export type ItemFragment = { __typename?: 'Item', id: string, name: string, credits?: number | null, type: ItemTypeEnum, start_date?: any | null, end_date?: any | null, description?: string | null, imageData: Array<{ __typename?: 'ItemImageData', height: number, width: number, src: string }>, data: { __typename?: 'ItemCreditsData', credits: number } | { __typename?: 'ItemEmailTemplateData', design: string } | { __typename?: 'ItemSignupFormData', formDesign: string, successDesign: string } };

export type ItemCategoryFragment = { __typename?: 'ItemCategory', id: string, type: ItemCategoryTypeEnum };

export type CreateNewListMutationVariables = Exact<{
  name: Scalars['String'];
  storeId: Scalars['String'];
}>;


export type CreateNewListMutation = { __typename?: 'Mutation', createNewList: { __typename?: 'List', id: string, name: string, members: number, createdAt: any, starred: boolean } };

export type DeleteListMutationVariables = Exact<{
  listId: Scalars['String'];
}>;


export type DeleteListMutation = { __typename?: 'Mutation', deleteList: { __typename?: 'List', id: string, name: string, members: number, createdAt: any, starred: boolean } };

export type GetListCountQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetListCountQuery = { __typename?: 'Query', getListCount?: number | null };

export type GetListsQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetListsQuery = { __typename?: 'Query', getLists: Array<{ __typename?: 'List', id: string, name: string, members: number, createdAt: any, starred: boolean }> };

export type GetStarredListsQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetStarredListsQuery = { __typename?: 'Query', getStarredLists?: Array<{ __typename?: 'List', addedToday: string, addedThisWeek: string, id: string, name: string, members: number, createdAt: any, starred: boolean }> | null };

export type ListFragment = { __typename?: 'List', id: string, name: string, members: number, createdAt: any, starred: boolean };

export type ToggleListStarMutationVariables = Exact<{
  listId: Scalars['String'];
}>;


export type ToggleListStarMutation = { __typename?: 'Mutation', toggleListStar?: { __typename?: 'List', id: string, name: string, members: number, createdAt: any, starred: boolean } | null };

export type GetEmailLinkClickedCountQueryVariables = Exact<{
  subscriberId: Scalars['String'];
}>;


export type GetEmailLinkClickedCountQuery = { __typename?: 'Query', getEmailLinkClickedCount?: number | null };

export type GetEmailOpenedCountQueryVariables = Exact<{
  subscriberId: Scalars['String'];
}>;


export type GetEmailOpenedCountQuery = { __typename?: 'Query', getEmailOpenedCount?: number | null };

export type GetEmailReceivedCountQueryVariables = Exact<{
  subscriberId: Scalars['String'];
}>;


export type GetEmailReceivedCountQuery = { __typename?: 'Query', getEmailReceivedCount?: number | null };

export type GetEmailSentThisMonthCountQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetEmailSentThisMonthCountQuery = { __typename?: 'Query', getEmailSentThisMonthCount?: number | null };

export type GetEmailSentTodayCountQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetEmailSentTodayCountQuery = { __typename?: 'Query', getEmailSentTodayCount?: number | null };

export type GetFulfilledOrderCountQueryVariables = Exact<{
  subscriberId: Scalars['String'];
}>;


export type GetFulfilledOrderCountQuery = { __typename?: 'Query', getFulfilledOrderCount?: number | null };

export type GetMetricsByTypeQueryVariables = Exact<{
  subdomain: Scalars['String'];
  metricType?: InputMaybe<MetricType>;
  allMetric?: InputMaybe<Scalars['Boolean']>;
  take: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type GetMetricsByTypeQuery = { __typename?: 'Query', getMetricsByType?: Array<{ __typename?: 'Metric', id: string, metricType: MetricType, message: string, postId?: string | null, listId?: string | null, subscriberId?: string | null, createdAt: any, data?: { __typename: 'MetricEmailLinkClicked', type: MetricType, link: string } | { __typename: 'MetricPostViewed', type: MetricType, referer?: string | null, ipAddress?: string | null, utm?: { __typename?: 'MetricUtmDataType', campaign?: string | null, source?: string | null, term?: string | null, medium?: string | null, content?: string | null } | null } | { __typename: 'MetricShopifyCancelledOrder', type: MetricType, id: number } | { __typename: 'MetricShopifyCheckoutUpdate', type: MetricType, id: number } | { __typename: 'MetricShopifyFulfilledOrder', type: MetricType, id: number } | { __typename: 'MetricShopifyPlacedOrder', type: MetricType, id: number, subtotal_price: string, total_price: string } | null, subscriber?: { __typename?: 'Subscriber', id: string, subscriberType: SubscriberType, storeId: string, userId: string, createdAt: any, updatedAt: any, firstName?: string | null, lastName?: string | null, phoneNumber?: any | null, user: { __typename?: 'User', id: string, email: string, name?: string | null }, subscriberAddress?: { __typename?: 'SubscriberAddress', address1?: string | null, address2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null } | null } | null }> | null };

export type GetPlacedOrderCountQueryVariables = Exact<{
  subscriberId: Scalars['String'];
}>;


export type GetPlacedOrderCountQuery = { __typename?: 'Query', getPlacedOrderCount?: number | null };

export type GetSubscriberMetricsQueryVariables = Exact<{
  subscriberId: Scalars['String'];
  take: Scalars['Int'];
  skip: Scalars['Int'];
  metricType?: InputMaybe<MetricType>;
  allMetric?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetSubscriberMetricsQuery = { __typename?: 'Query', getSubscriberMetrics?: Array<{ __typename?: 'Metric', id: string, metricType: MetricType, message: string, postId?: string | null, listId?: string | null, subscriberId?: string | null, createdAt: any, data?: { __typename: 'MetricEmailLinkClicked', type: MetricType, link: string } | { __typename: 'MetricPostViewed', type: MetricType, referer?: string | null, ipAddress?: string | null, utm?: { __typename?: 'MetricUtmDataType', campaign?: string | null, source?: string | null, term?: string | null, medium?: string | null, content?: string | null } | null } | { __typename: 'MetricShopifyCancelledOrder', type: MetricType, id: number } | { __typename: 'MetricShopifyCheckoutUpdate', type: MetricType, id: number } | { __typename: 'MetricShopifyFulfilledOrder', type: MetricType, id: number } | { __typename: 'MetricShopifyPlacedOrder', type: MetricType, id: number, subtotal_price: string, total_price: string } | null, subscriber?: { __typename?: 'Subscriber', id: string, subscriberType: SubscriberType, storeId: string, userId: string, createdAt: any, updatedAt: any, firstName?: string | null, lastName?: string | null, phoneNumber?: any | null, user: { __typename?: 'User', id: string, email: string, name?: string | null }, subscriberAddress?: { __typename?: 'SubscriberAddress', address1?: string | null, address2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null } | null } | null }> | null };

export type GetSubscriberRevenueQueryVariables = Exact<{
  subscriberId: Scalars['String'];
}>;


export type GetSubscriberRevenueQuery = { __typename?: 'Query', getSubscriberRevenue?: number | null };

type MetricData_MetricEmailLinkClicked_Fragment = { __typename: 'MetricEmailLinkClicked', type: MetricType, link: string };

type MetricData_MetricPostViewed_Fragment = { __typename: 'MetricPostViewed', type: MetricType, referer?: string | null, ipAddress?: string | null, utm?: { __typename?: 'MetricUtmDataType', campaign?: string | null, source?: string | null, term?: string | null, medium?: string | null, content?: string | null } | null };

type MetricData_MetricShopifyCancelledOrder_Fragment = { __typename: 'MetricShopifyCancelledOrder', type: MetricType, id: number };

type MetricData_MetricShopifyCheckoutUpdate_Fragment = { __typename: 'MetricShopifyCheckoutUpdate', type: MetricType, id: number };

type MetricData_MetricShopifyFulfilledOrder_Fragment = { __typename: 'MetricShopifyFulfilledOrder', type: MetricType, id: number };

type MetricData_MetricShopifyPlacedOrder_Fragment = { __typename: 'MetricShopifyPlacedOrder', type: MetricType, id: number, subtotal_price: string, total_price: string };

export type MetricDataFragment = MetricData_MetricEmailLinkClicked_Fragment | MetricData_MetricPostViewed_Fragment | MetricData_MetricShopifyCancelledOrder_Fragment | MetricData_MetricShopifyCheckoutUpdate_Fragment | MetricData_MetricShopifyFulfilledOrder_Fragment | MetricData_MetricShopifyPlacedOrder_Fragment;

export type MetricFragment = { __typename?: 'Metric', id: string, metricType: MetricType, message: string, postId?: string | null, listId?: string | null, subscriberId?: string | null, createdAt: any, data?: { __typename: 'MetricEmailLinkClicked', type: MetricType, link: string } | { __typename: 'MetricPostViewed', type: MetricType, referer?: string | null, ipAddress?: string | null, utm?: { __typename?: 'MetricUtmDataType', campaign?: string | null, source?: string | null, term?: string | null, medium?: string | null, content?: string | null } | null } | { __typename: 'MetricShopifyCancelledOrder', type: MetricType, id: number } | { __typename: 'MetricShopifyCheckoutUpdate', type: MetricType, id: number } | { __typename: 'MetricShopifyFulfilledOrder', type: MetricType, id: number } | { __typename: 'MetricShopifyPlacedOrder', type: MetricType, id: number, subtotal_price: string, total_price: string } | null, subscriber?: { __typename?: 'Subscriber', id: string, subscriberType: SubscriberType, storeId: string, userId: string, createdAt: any, updatedAt: any, firstName?: string | null, lastName?: string | null, phoneNumber?: any | null, user: { __typename?: 'User', id: string, email: string, name?: string | null }, subscriberAddress?: { __typename?: 'SubscriberAddress', address1?: string | null, address2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null } | null } | null };

export type GetNotificationQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetNotificationQuery = { __typename?: 'Query', getNotification?: { __typename?: 'Notification', id: string, newSubscriber: boolean } | null };

export type NewSubscriberNotificationToggleMutationVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type NewSubscriberNotificationToggleMutation = { __typename?: 'Mutation', newSubscriberNotificationToggle?: { __typename?: 'Notification', id: string, newSubscriber: boolean } | null };

export type NotificationFragment = { __typename?: 'Notification', id: string, newSubscriber: boolean };

export type CheckPostHandleAvailableMutationVariables = Exact<{
  postId: Scalars['String'];
  handle: Scalars['String'];
}>;


export type CheckPostHandleAvailableMutation = { __typename?: 'Mutation', checkPostHandleAvailable: boolean };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: { __typename?: 'Post', id: string, title?: string | null, subTitle?: string | null, bodyLexical?: string | null, bodyHTML?: string | null, postState: PostState, publishedDate?: any | null, storeId: string, postHandle?: string | null, postViewCount: number, postOpenCount: number, postRecipientCount: number, image?: { __typename?: 'PostImage', src: string, width: number, height: number } | null, store?: { __typename?: 'Store', userId?: string | null } | null } | null };

export type CreatePostViewedMutationVariables = Exact<{
  input: CreatePostViewedInput;
}>;


export type CreatePostViewedMutation = { __typename?: 'Mutation', createPostViewed?: { __typename?: 'Post', id: string, title?: string | null, subTitle?: string | null, bodyLexical?: string | null, bodyHTML?: string | null, postState: PostState, publishedDate?: any | null, storeId: string, postHandle?: string | null, postViewCount: number, postOpenCount: number, postRecipientCount: number, image?: { __typename?: 'PostImage', src: string, width: number, height: number } | null, store?: { __typename?: 'Store', userId?: string | null } | null } | null };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: { __typename?: 'Post', id: string, title?: string | null, subTitle?: string | null, bodyLexical?: string | null, bodyHTML?: string | null, postState: PostState, publishedDate?: any | null, storeId: string, postHandle?: string | null, postViewCount: number, postOpenCount: number, postRecipientCount: number, image?: { __typename?: 'PostImage', src: string, width: number, height: number } | null, store?: { __typename?: 'Store', userId?: string | null } | null } | null };

export type GetAllPublishedPostForSiteMapQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPublishedPostForSiteMapQuery = { __typename?: 'Query', getAllPublishedPostForSiteMap?: Array<{ __typename?: 'Post', id: string, title?: string | null, subTitle?: string | null, bodyLexical?: string | null, bodyHTML?: string | null, postState: PostState, publishedDate?: any | null, storeId: string, postHandle?: string | null, postViewCount: number, postOpenCount: number, postRecipientCount: number, store?: { __typename?: 'Store', subdomain?: string | null, userId?: string | null } | null, image?: { __typename?: 'PostImage', src: string, width: number, height: number } | null }> | null };

export type GetDraftPostsQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetDraftPostsQuery = { __typename?: 'Query', getDraftPosts?: Array<{ __typename?: 'Post', id: string, title?: string | null, subTitle?: string | null, bodyLexical?: string | null, bodyHTML?: string | null, postState: PostState, publishedDate?: any | null, storeId: string, postHandle?: string | null, postViewCount: number, postOpenCount: number, postRecipientCount: number, image?: { __typename?: 'PostImage', src: string, width: number, height: number } | null, store?: { __typename?: 'Store', userId?: string | null } | null }> | null };

export type GetMorePostsQueryVariables = Exact<{
  postHandle: Scalars['String'];
}>;


export type GetMorePostsQuery = { __typename?: 'Query', getMorePosts?: Array<{ __typename?: 'Post', id: string, title?: string | null, subTitle?: string | null, bodyLexical?: string | null, bodyHTML?: string | null, postState: PostState, publishedDate?: any | null, storeId: string, postHandle?: string | null, postViewCount: number, postOpenCount: number, postRecipientCount: number, image?: { __typename?: 'PostImage', src: string, width: number, height: number } | null, store?: { __typename?: 'Store', userId?: string | null } | null }> | null };

export type GetPostQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type GetPostQuery = { __typename?: 'Query', getPost?: { __typename?: 'Post', id: string, title?: string | null, subTitle?: string | null, bodyLexical?: string | null, bodyHTML?: string | null, postState: PostState, publishedDate?: any | null, storeId: string, postHandle?: string | null, postViewCount: number, postOpenCount: number, postRecipientCount: number, image?: { __typename?: 'PostImage', src: string, width: number, height: number } | null, store?: { __typename?: 'Store', userId?: string | null } | null } | null };

export type GetPostByHandleQueryVariables = Exact<{
  postHandle: Scalars['String'];
}>;


export type GetPostByHandleQuery = { __typename?: 'Query', getPostByHandle?: { __typename?: 'Post', id: string, title?: string | null, subTitle?: string | null, bodyLexical?: string | null, bodyHTML?: string | null, postState: PostState, publishedDate?: any | null, storeId: string, postHandle?: string | null, postViewCount: number, postOpenCount: number, postRecipientCount: number, image?: { __typename?: 'PostImage', src: string, width: number, height: number } | null, store?: { __typename?: 'Store', userId?: string | null } | null } | null };

export type GetPostCountQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetPostCountQuery = { __typename?: 'Query', getPostCount?: number | null };

export type GetPostsQueryVariables = Exact<{
  subdomain: Scalars['String'];
  take: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type GetPostsQuery = { __typename?: 'Query', getPosts?: Array<{ __typename?: 'Post', id: string, title?: string | null, subTitle?: string | null, bodyLexical?: string | null, bodyHTML?: string | null, postState: PostState, publishedDate?: any | null, storeId: string, postHandle?: string | null, postViewCount: number, postOpenCount: number, postRecipientCount: number, image?: { __typename?: 'PostImage', src: string, width: number, height: number } | null, store?: { __typename?: 'Store', userId?: string | null } | null }> | null };

export type PostFragment = { __typename?: 'Post', id: string, title?: string | null, subTitle?: string | null, bodyLexical?: string | null, bodyHTML?: string | null, postState: PostState, publishedDate?: any | null, storeId: string, postHandle?: string | null, postViewCount: number, postOpenCount: number, postRecipientCount: number, image?: { __typename?: 'PostImage', src: string, width: number, height: number } | null, store?: { __typename?: 'Store', userId?: string | null } | null };

export type PublishPostHereMutationVariables = Exact<{
  postId: Scalars['String'];
  postHandle: Scalars['String'];
}>;


export type PublishPostHereMutation = { __typename?: 'Mutation', publishPostHere: boolean };

export type PublishPostToListMutationVariables = Exact<{
  postId: Scalars['String'];
  listId: Scalars['String'];
  postHandle: Scalars['String'];
}>;


export type PublishPostToListMutation = { __typename?: 'Mutation', publishPostToList: boolean };

export type UnpublishPostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type UnpublishPostMutation = { __typename?: 'Mutation', unpublishPost?: { __typename?: 'Post', id: string, title?: string | null, subTitle?: string | null, bodyLexical?: string | null, bodyHTML?: string | null, postState: PostState, publishedDate?: any | null, storeId: string, postHandle?: string | null, postViewCount: number, postOpenCount: number, postRecipientCount: number, image?: { __typename?: 'PostImage', src: string, width: number, height: number } | null, store?: { __typename?: 'Store', userId?: string | null } | null } | null };

export type UpdatePostMutationVariables = Exact<{
  input: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: boolean };

export type AddMoreProductImagesMutationVariables = Exact<{
  input: AddMoreProductImagesInput;
}>;


export type AddMoreProductImagesMutation = { __typename?: 'Mutation', addMoreProductImages?: { __typename?: 'Product', id: string, name?: string | null, description?: string | null, storeId: string, price: number, hidden: boolean, productType: ProductType, externalLink?: string | null, productSource: ProductSource, image?: Array<{ __typename?: 'ProductImage', src: string, height: number, width: number, mimeType: string, cdnType: CdnType }> | null } | null };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct?: { __typename?: 'Product', id: string, name?: string | null, description?: string | null, storeId: string, price: number, hidden: boolean, productType: ProductType, externalLink?: string | null, productSource: ProductSource, image?: Array<{ __typename?: 'ProductImage', src: string, height: number, width: number, mimeType: string, cdnType: CdnType }> | null } | null };

export type DeleteProductMutationVariables = Exact<{
  productId: Scalars['String'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct?: Array<{ __typename?: 'Product', id: string, name?: string | null, description?: string | null, storeId: string, price: number, hidden: boolean, productType: ProductType, externalLink?: string | null, productSource: ProductSource, image?: Array<{ __typename?: 'ProductImage', src: string, height: number, width: number, mimeType: string, cdnType: CdnType }> | null }> | null };

export type DeleteProductImageMutationVariables = Exact<{
  deletingUrl: Scalars['String'];
  productId: Scalars['String'];
}>;


export type DeleteProductImageMutation = { __typename?: 'Mutation', deleteProductImage?: { __typename?: 'Product', id: string, name?: string | null, description?: string | null, storeId: string, price: number, hidden: boolean, productType: ProductType, externalLink?: string | null, productSource: ProductSource, image?: Array<{ __typename?: 'ProductImage', src: string, height: number, width: number, mimeType: string, cdnType: CdnType }> | null } | null };

export type GetProductQueryVariables = Exact<{
  productId: Scalars['String'];
}>;


export type GetProductQuery = { __typename?: 'Query', getProduct: { __typename?: 'Product', id: string, name?: string | null, description?: string | null, storeId: string, price: number, hidden: boolean, productType: ProductType, externalLink?: string | null, productSource: ProductSource, image?: Array<{ __typename?: 'ProductImage', src: string, height: number, width: number, mimeType: string, cdnType: CdnType }> | null } };

export type GetProductCountQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetProductCountQuery = { __typename?: 'Query', getProductCount: number };

export type GetProductsQueryVariables = Exact<{
  subdomain: Scalars['String'];
  take: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type GetProductsQuery = { __typename?: 'Query', getProducts: Array<{ __typename?: 'Product', id: string, name?: string | null, description?: string | null, storeId: string, price: number, hidden: boolean, productType: ProductType, externalLink?: string | null, productSource: ProductSource, image?: Array<{ __typename?: 'ProductImage', src: string, height: number, width: number, mimeType: string, cdnType: CdnType }> | null }> };

export type ProductFragment = { __typename?: 'Product', id: string, name?: string | null, description?: string | null, storeId: string, price: number, hidden: boolean, productType: ProductType, externalLink?: string | null, productSource: ProductSource, image?: Array<{ __typename?: 'ProductImage', src: string, height: number, width: number, mimeType: string, cdnType: CdnType }> | null };

export type ProductImageFragment = { __typename?: 'ProductImage', src: string, height: number, width: number, mimeType: string, cdnType: CdnType };

export type ToggleProductHiddenMutationVariables = Exact<{
  productId: Scalars['String'];
}>;


export type ToggleProductHiddenMutation = { __typename?: 'Mutation', toggleProductHidden?: boolean | null };

export type UpdateProductDetialsMutationVariables = Exact<{
  input: UpdateProductDetailsInput;
}>;


export type UpdateProductDetialsMutation = { __typename?: 'Mutation', updateProductDetails?: { __typename?: 'Product', id: string, name?: string | null, description?: string | null, storeId: string, price: number, hidden: boolean, productType: ProductType, externalLink?: string | null, productSource: ProductSource, image?: Array<{ __typename?: 'ProductImage', src: string, height: number, width: number, mimeType: string, cdnType: CdnType }> | null } | null };

export type CreateProductPostMutationVariables = Exact<{
  postId: Scalars['String'];
  productIds: Array<Scalars['String']> | Scalars['String'];
  nodeKey: Scalars['String'];
}>;


export type CreateProductPostMutation = { __typename?: 'Mutation', createProductPost?: { __typename?: 'ProductPost', id: string, postId: string, productId: string } | null };

export type DeleteProductPostMutationVariables = Exact<{
  postId: Scalars['String'];
  nodeKey: Scalars['String'];
}>;


export type DeleteProductPostMutation = { __typename?: 'Mutation', deleteProductPost?: { __typename?: 'ProductPost', id: string, postId: string, productId: string } | null };

export type HasProductPostQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type HasProductPostQuery = { __typename?: 'Query', hasProductPost?: boolean | null };

export type ProductPostFragment = { __typename?: 'ProductPost', id: string, postId: string, productId: string };

export type ChallengeFragment = { __typename?: 'Challenge', id: string, name: string, description?: string | null, completionCount: number, completionStages: number, measuredMetric?: MetricType | null, challengeType: ChallengeTypeEnum };

export type GetMandatoryQuestQueryVariables = Exact<{
  questType: QuestType;
}>;


export type GetMandatoryQuestQuery = { __typename?: 'Query', getMandatoryQuest?: { __typename?: 'Quest', id: string, name: string, description?: string | null, questType: QuestType, challenges: Array<{ __typename?: 'Challenge', id: string, name: string, description?: string | null, completionCount: number, completionStages: number, measuredMetric?: MetricType | null, challengeType: ChallengeTypeEnum }> } | null };

export type QuestFragment = { __typename?: 'Quest', id: string, name: string, description?: string | null, questType: QuestType, challenges: Array<{ __typename?: 'Challenge', id: string, name: string, description?: string | null, completionCount: number, completionStages: number, measuredMetric?: MetricType | null, challengeType: ChallengeTypeEnum }> };

export type CollectEmailSubscribersMutationVariables = Exact<{
  shopifyId: Scalars['String'];
  listId: Scalars['String'];
}>;


export type CollectEmailSubscribersMutation = { __typename?: 'Mutation', collectEmailSubscribers?: { __typename?: 'Shopify', id: string, sessionExpired: boolean, storeUrl: string, authenticated: boolean, productSyncJobId?: string | null, customerSyncJobId?: string | null, listIdToCollectEmail?: string | null } | null };

export type RemoveCollectEmailSubscribersMutationVariables = Exact<{
  shopifyId: Scalars['String'];
}>;


export type RemoveCollectEmailSubscribersMutation = { __typename?: 'Mutation', removeCollectEmailSubscribers?: { __typename?: 'Shopify', id: string, sessionExpired: boolean, storeUrl: string, authenticated: boolean, productSyncJobId?: string | null, customerSyncJobId?: string | null, listIdToCollectEmail?: string | null } | null };

export type RemoveShopifyIntegrationMutationVariables = Exact<{
  shopifyId: Scalars['String'];
}>;


export type RemoveShopifyIntegrationMutation = { __typename?: 'Mutation', removeShopifyIntegration?: { __typename?: 'Shopify', id: string, sessionExpired: boolean, storeUrl: string, authenticated: boolean, productSyncJobId?: string | null, customerSyncJobId?: string | null, listIdToCollectEmail?: string | null } | null };

export type ShopifyFragment = { __typename?: 'Shopify', id: string, sessionExpired: boolean, storeUrl: string, authenticated: boolean, productSyncJobId?: string | null, customerSyncJobId?: string | null, listIdToCollectEmail?: string | null };

export type StopShopifyCustomerSyncMutationVariables = Exact<{
  shopifyId: Scalars['String'];
}>;


export type StopShopifyCustomerSyncMutation = { __typename?: 'Mutation', stopShopifyCustomerSync?: { __typename?: 'Shopify', id: string, sessionExpired: boolean, storeUrl: string, authenticated: boolean, productSyncJobId?: string | null, customerSyncJobId?: string | null, listIdToCollectEmail?: string | null } | null };

export type StopShopifyProductSyncMutationVariables = Exact<{
  shopifyId: Scalars['String'];
}>;


export type StopShopifyProductSyncMutation = { __typename?: 'Mutation', stopShopifyProductSync?: { __typename?: 'Shopify', id: string, sessionExpired: boolean, storeUrl: string, authenticated: boolean, productSyncJobId?: string | null, customerSyncJobId?: string | null, listIdToCollectEmail?: string | null } | null };

export type SyncShopifyCustomersMutationVariables = Exact<{
  shopifyId: Scalars['String'];
}>;


export type SyncShopifyCustomersMutation = { __typename?: 'Mutation', syncShopifyCustomers?: { __typename?: 'Shopify', id: string, sessionExpired: boolean, storeUrl: string, authenticated: boolean, productSyncJobId?: string | null, customerSyncJobId?: string | null, listIdToCollectEmail?: string | null } | null };

export type SyncShopifyProductsMutationVariables = Exact<{
  shopifyId: Scalars['String'];
}>;


export type SyncShopifyProductsMutation = { __typename?: 'Mutation', syncShopifyProducts?: { __typename?: 'Shopify', id: string, sessionExpired: boolean, storeUrl: string, authenticated: boolean, productSyncJobId?: string | null, customerSyncJobId?: string | null, listIdToCollectEmail?: string | null } | null };

export type AddSignupFormItemMutationVariables = Exact<{
  input: AddSignupFormItem;
}>;


export type AddSignupFormItemMutation = { __typename?: 'Mutation', addSignupFormItem?: { __typename?: 'SignupForm', formSubmitRate: number, views: number, submitted: number, id: string, name: string, formState: SignupFormState, scriptModule?: string | null, scriptJavascript?: string | null, form?: { __typename?: 'SignupFormData', js: string, body: string, css: string, fonts: string, design: string, html: string } | null, success?: { __typename?: 'SignupFormData', js: string, body: string, css: string, fonts: string, design: string, html: string } | null, list?: { __typename?: 'List', id: string, name: string, members: number, createdAt: any, starred: boolean } | null } | null };

export type CreateSignupFormMutationVariables = Exact<{
  input: CreateSignupFormInput;
}>;


export type CreateSignupFormMutation = { __typename?: 'Mutation', createSignupForm?: { __typename?: 'SignupForm', formSubmitRate: number, views: number, submitted: number, id: string, name: string, formState: SignupFormState, scriptModule?: string | null, scriptJavascript?: string | null, form?: { __typename?: 'SignupFormData', js: string, body: string, css: string, fonts: string, design: string, html: string } | null, success?: { __typename?: 'SignupFormData', js: string, body: string, css: string, fonts: string, design: string, html: string } | null, list?: { __typename?: 'List', id: string, name: string, members: number, createdAt: any, starred: boolean } | null } | null };

export type DeleteSignupFormMutationVariables = Exact<{
  signupFormId: Scalars['String'];
}>;


export type DeleteSignupFormMutation = { __typename?: 'Mutation', deleteSignupForm?: { __typename?: 'SignupForm', formSubmitRate: number, views: number, submitted: number, id: string, name: string, formState: SignupFormState, scriptModule?: string | null, scriptJavascript?: string | null, form?: { __typename?: 'SignupFormData', js: string, body: string, css: string, fonts: string, design: string, html: string } | null, success?: { __typename?: 'SignupFormData', js: string, body: string, css: string, fonts: string, design: string, html: string } | null, list?: { __typename?: 'List', id: string, name: string, members: number, createdAt: any, starred: boolean } | null } | null };

export type GetSignupFormQueryVariables = Exact<{
  signupFormId: Scalars['String'];
}>;


export type GetSignupFormQuery = { __typename?: 'Query', getSignupForm?: { __typename?: 'SignupForm', formSubmitRate: number, views: number, submitted: number, id: string, name: string, formState: SignupFormState, scriptModule?: string | null, scriptJavascript?: string | null, form?: { __typename?: 'SignupFormData', js: string, body: string, css: string, fonts: string, design: string, html: string } | null, success?: { __typename?: 'SignupFormData', js: string, body: string, css: string, fonts: string, design: string, html: string } | null, list?: { __typename?: 'List', id: string, name: string, members: number, createdAt: any, starred: boolean } | null } | null };

export type GetSignupFormsQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetSignupFormsQuery = { __typename?: 'Query', getSignupForms?: Array<{ __typename?: 'SignupForm', formSubmitRate: number, views: number, submitted: number, id: string, name: string, formState: SignupFormState, scriptModule?: string | null, scriptJavascript?: string | null, form?: { __typename?: 'SignupFormData', js: string, body: string, css: string, fonts: string, design: string, html: string } | null, success?: { __typename?: 'SignupFormData', js: string, body: string, css: string, fonts: string, design: string, html: string } | null, list?: { __typename?: 'List', id: string, name: string, members: number, createdAt: any, starred: boolean } | null }> | null };

export type GetTotalFormSubmitRateQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetTotalFormSubmitRateQuery = { __typename?: 'Query', getTotalFormSubmitRate: number };

export type GetTotalSubmittedFormQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetTotalSubmittedFormQuery = { __typename?: 'Query', getTotalSubmittedForm: number };

export type SignupFormFragment = { __typename?: 'SignupForm', formSubmitRate: number, views: number, submitted: number, id: string, name: string, formState: SignupFormState, scriptModule?: string | null, scriptJavascript?: string | null, form?: { __typename?: 'SignupFormData', js: string, body: string, css: string, fonts: string, design: string, html: string } | null, success?: { __typename?: 'SignupFormData', js: string, body: string, css: string, fonts: string, design: string, html: string } | null, list?: { __typename?: 'List', id: string, name: string, members: number, createdAt: any, starred: boolean } | null };

export type UpdateSignupFormMutationVariables = Exact<{
  input: UpdateSignupformInput;
}>;


export type UpdateSignupFormMutation = { __typename?: 'Mutation', updateSignupForm?: { __typename?: 'SignupForm', formSubmitRate: number, views: number, submitted: number, id: string, name: string, formState: SignupFormState, scriptModule?: string | null, scriptJavascript?: string | null, form?: { __typename?: 'SignupFormData', js: string, body: string, css: string, fonts: string, design: string, html: string } | null, success?: { __typename?: 'SignupFormData', js: string, body: string, css: string, fonts: string, design: string, html: string } | null, list?: { __typename?: 'List', id: string, name: string, members: number, createdAt: any, starred: boolean } | null } | null };

export type CheckAbleToSendEmailToListQueryVariables = Exact<{
  listId: Scalars['String'];
  subdomain: Scalars['String'];
}>;


export type CheckAbleToSendEmailToListQuery = { __typename?: 'Query', checkAbleToSendEmailToList: boolean };

export type CheckUserOrboardedQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckUserOrboardedQuery = { __typename?: 'Query', checkUserOnboarded?: boolean | null };

export type CreateCheckoutSessionUrlMutationVariables = Exact<{
  subdomain: Scalars['String'];
  contactQuantity: Scalars['Int'];
}>;


export type CreateCheckoutSessionUrlMutation = { __typename?: 'Mutation', createCheckoutSessionUrl?: string | null };

export type CreateShopifyAppSubscriptionMutationVariables = Exact<{
  input: CreateShopifyAppSubscriptionInput;
}>;


export type CreateShopifyAppSubscriptionMutation = { __typename?: 'Mutation', createShopifyAppSubscription?: string | null };

export type GetAllStoresForSiteMapQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllStoresForSiteMapQuery = { __typename?: 'Query', getAllStoresForSiteMap?: Array<{ __typename?: 'Store', id: string, subdomain?: string | null, name?: string | null, currency: StoreCurrency, userId?: string | null, defaultListIdToCollectEmail?: string | null, contactLimitStatus: ContactLimitStatus, emailSentLimitStatus: EmailSentLimitStatus, createdAt: any, contact?: { __typename?: 'Contact', senderName: string, senderEmail: string, address1: string, address2?: string | null, city: string, state?: string | null, country: string, zipCode: string } | null, displayPicture?: { __typename?: 'DisplayPicture', height: number, src: string, width: number } | null, about?: { __typename?: 'About', id: string, about?: string | null, aboutLexical?: string | null, aboutHTML?: string | null, industry?: string | null } | null }> | null };

export type GetBenchmarkDataQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetBenchmarkDataQuery = { __typename?: 'Query', getBenchmarkData?: Array<{ __typename?: 'BenchmarkData', id: string, opened: string, clicked: string, delivered: string, contact: string }> | null };

export type GetCustomerPortalSessionQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetCustomerPortalSessionQuery = { __typename?: 'Query', getCustomerPortalSession?: string | null };

export type GetStoreCreditsQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetStoreCreditsQuery = { __typename?: 'Query', getStoreCredits: number };

export type GetStoreDailyRevenueTrendQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetStoreDailyRevenueTrendQuery = { __typename?: 'Query', getStoreDailyRevenueTrend?: number | null };

export type GetStoreEmailMetricQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetStoreEmailMetricQuery = { __typename?: 'Query', getStoreEmailMetric?: { __typename?: 'GetStoreEmailMetric', contact: number, delivered: number, opened: number, clicked: number, openedTrend: number, clickedTrend: number, deliveredTrend: number } | null };

export type GetStoreRevenueQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetStoreRevenueQuery = { __typename?: 'Query', getStoreRevenue?: number | null };

export type GetUserStoreQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserStoreQuery = { __typename?: 'Query', getUserStore?: { __typename?: 'Store', id: string, subdomain?: string | null, name?: string | null, currency: StoreCurrency, userId?: string | null, defaultListIdToCollectEmail?: string | null, contactLimitStatus: ContactLimitStatus, emailSentLimitStatus: EmailSentLimitStatus, createdAt: any, contact?: { __typename?: 'Contact', senderName: string, senderEmail: string, address1: string, address2?: string | null, city: string, state?: string | null, country: string, zipCode: string } | null, displayPicture?: { __typename?: 'DisplayPicture', height: number, src: string, width: number } | null, about?: { __typename?: 'About', id: string, about?: string | null, aboutLexical?: string | null, aboutHTML?: string | null, industry?: string | null } | null } | null };

export type GetStoreWithSubdomainQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetStoreWithSubdomainQuery = { __typename?: 'Query', getStoreWithSubdomain?: { __typename?: 'Store', id: string, subdomain?: string | null, name?: string | null, currency: StoreCurrency, userId?: string | null, defaultListIdToCollectEmail?: string | null, contactLimitStatus: ContactLimitStatus, emailSentLimitStatus: EmailSentLimitStatus, createdAt: any, contact?: { __typename?: 'Contact', senderName: string, senderEmail: string, address1: string, address2?: string | null, city: string, state?: string | null, country: string, zipCode: string } | null, displayPicture?: { __typename?: 'DisplayPicture', height: number, src: string, width: number } | null, about?: { __typename?: 'About', id: string, about?: string | null, aboutLexical?: string | null, aboutHTML?: string | null, industry?: string | null } | null } | null };

export type ShopifyAppSubscriptionCancleMutationVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type ShopifyAppSubscriptionCancleMutation = { __typename?: 'Mutation', shopifyAppSubscriptionCancel?: boolean | null };

export type StoreFragment = { __typename?: 'Store', id: string, subdomain?: string | null, name?: string | null, currency: StoreCurrency, userId?: string | null, defaultListIdToCollectEmail?: string | null, contactLimitStatus: ContactLimitStatus, emailSentLimitStatus: EmailSentLimitStatus, createdAt: any, contact?: { __typename?: 'Contact', senderName: string, senderEmail: string, address1: string, address2?: string | null, city: string, state?: string | null, country: string, zipCode: string } | null, displayPicture?: { __typename?: 'DisplayPicture', height: number, src: string, width: number } | null, about?: { __typename?: 'About', id: string, about?: string | null, aboutLexical?: string | null, aboutHTML?: string | null, industry?: string | null } | null };

export type SubdomainAvailableQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type SubdomainAvailableQuery = { __typename?: 'Query', subdomainAvailable: boolean };

export type SubscribeToStoreMutationVariables = Exact<{
  storeId: Scalars['String'];
  email: Scalars['String'];
}>;


export type SubscribeToStoreMutation = { __typename?: 'Mutation', subscribeToStore?: boolean | null };

export type UpdateDefaultListIdToCollectEmailMutationVariables = Exact<{
  storeId: Scalars['String'];
  listId: Scalars['String'];
}>;


export type UpdateDefaultListIdToCollectEmailMutation = { __typename?: 'Mutation', updateDefaultListIdToCollectEmail?: { __typename?: 'Store', id: string, subdomain?: string | null, name?: string | null, currency: StoreCurrency, userId?: string | null, defaultListIdToCollectEmail?: string | null, contactLimitStatus: ContactLimitStatus, emailSentLimitStatus: EmailSentLimitStatus, createdAt: any, contact?: { __typename?: 'Contact', senderName: string, senderEmail: string, address1: string, address2?: string | null, city: string, state?: string | null, country: string, zipCode: string } | null, displayPicture?: { __typename?: 'DisplayPicture', height: number, src: string, width: number } | null, about?: { __typename?: 'About', id: string, about?: string | null, aboutLexical?: string | null, aboutHTML?: string | null, industry?: string | null } | null } | null };

export type UpdateDisplayPictureMutationVariables = Exact<{
  input: UpdateDisplayPictureInput;
}>;


export type UpdateDisplayPictureMutation = { __typename?: 'Mutation', updateDisplayPicture?: { __typename?: 'Store', id: string, subdomain?: string | null, name?: string | null, currency: StoreCurrency, userId?: string | null, defaultListIdToCollectEmail?: string | null, contactLimitStatus: ContactLimitStatus, emailSentLimitStatus: EmailSentLimitStatus, createdAt: any, contact?: { __typename?: 'Contact', senderName: string, senderEmail: string, address1: string, address2?: string | null, city: string, state?: string | null, country: string, zipCode: string } | null, displayPicture?: { __typename?: 'DisplayPicture', height: number, src: string, width: number } | null, about?: { __typename?: 'About', id: string, about?: string | null, aboutLexical?: string | null, aboutHTML?: string | null, industry?: string | null } | null } | null };

export type UpdateStoreCurrencyMutationVariables = Exact<{
  currency: StoreCurrency;
  storeId: Scalars['String'];
}>;


export type UpdateStoreCurrencyMutation = { __typename?: 'Mutation', updateStoreCurrency: { __typename?: 'Store', id: string, subdomain?: string | null, name?: string | null, currency: StoreCurrency, userId?: string | null, defaultListIdToCollectEmail?: string | null, contactLimitStatus: ContactLimitStatus, emailSentLimitStatus: EmailSentLimitStatus, createdAt: any, contact?: { __typename?: 'Contact', senderName: string, senderEmail: string, address1: string, address2?: string | null, city: string, state?: string | null, country: string, zipCode: string } | null, displayPicture?: { __typename?: 'DisplayPicture', height: number, src: string, width: number } | null, about?: { __typename?: 'About', id: string, about?: string | null, aboutLexical?: string | null, aboutHTML?: string | null, industry?: string | null } | null } };

export type UpdateStoreDetailsMutationVariables = Exact<{
  input: UpdateStoreDetailsInput;
}>;


export type UpdateStoreDetailsMutation = { __typename?: 'Mutation', updateStoreDetails?: { __typename?: 'Store', id: string, subdomain?: string | null, name?: string | null, currency: StoreCurrency, userId?: string | null, defaultListIdToCollectEmail?: string | null, contactLimitStatus: ContactLimitStatus, emailSentLimitStatus: EmailSentLimitStatus, createdAt: any, contact?: { __typename?: 'Contact', senderName: string, senderEmail: string, address1: string, address2?: string | null, city: string, state?: string | null, country: string, zipCode: string } | null, displayPicture?: { __typename?: 'DisplayPicture', height: number, src: string, width: number } | null, about?: { __typename?: 'About', id: string, about?: string | null, aboutLexical?: string | null, aboutHTML?: string | null, industry?: string | null } | null } | null };

export type GetCurrentStoreChallengeByQuestTypeQueryVariables = Exact<{
  subdomain: Scalars['String'];
  questType: QuestType;
}>;


export type GetCurrentStoreChallengeByQuestTypeQuery = { __typename?: 'Query', getCurrentStoreChallengesByQuestType?: Array<{ __typename?: 'StoreChallenge', id: string, completedCount: number, completedStages: number, challengeId: string, allCompleted: boolean, challenge: { __typename?: 'Challenge', id: string, name: string, description?: string | null, completionCount: number, completionStages: number, measuredMetric?: MetricType | null, challengeType: ChallengeTypeEnum } }> | null };

export type StoreChallengeFragment = { __typename?: 'StoreChallenge', id: string, completedCount: number, completedStages: number, challengeId: string, allCompleted: boolean, challenge: { __typename?: 'Challenge', id: string, name: string, description?: string | null, completionCount: number, completionStages: number, measuredMetric?: MetricType | null, challengeType: ChallengeTypeEnum } };

export type GetEmailTemplatesQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetEmailTemplatesQuery = { __typename?: 'Query', getEmailTemplates: Array<{ __typename?: 'StoreItem', id: string, itemId: string, storeId: string, item: { __typename?: 'Item', id: string, name: string, credits?: number | null, type: ItemTypeEnum, start_date?: any | null, end_date?: any | null, description?: string | null, imageData: Array<{ __typename?: 'ItemImageData', height: number, width: number, src: string }>, data: { __typename?: 'ItemCreditsData', credits: number } | { __typename?: 'ItemEmailTemplateData', design: string } | { __typename?: 'ItemSignupFormData', formDesign: string, successDesign: string } } }> };

export type GetFolderItemsQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetFolderItemsQuery = { __typename?: 'Query', getFolderItems: Array<{ __typename?: 'StoreItem', id: string, itemId: string, storeId: string, item: { __typename?: 'Item', id: string, name: string, credits?: number | null, type: ItemTypeEnum, start_date?: any | null, end_date?: any | null, description?: string | null, imageData: Array<{ __typename?: 'ItemImageData', height: number, width: number, src: string }>, data: { __typename?: 'ItemCreditsData', credits: number } | { __typename?: 'ItemEmailTemplateData', design: string } | { __typename?: 'ItemSignupFormData', formDesign: string, successDesign: string } } }> };

export type StoreItemFragment = { __typename?: 'StoreItem', id: string, itemId: string, storeId: string };

export type AddCommaSeperatedEmailsToListMutationVariables = Exact<{
  input: AddCommaSeperatedEmailsToListInput;
}>;


export type AddCommaSeperatedEmailsToListMutation = { __typename?: 'Mutation', addCommaSeperatedEmailsToList?: boolean | null };

export type GetAllListsOfASubscriberQueryVariables = Exact<{
  unsubscriberId: Scalars['String'];
}>;


export type GetAllListsOfASubscriberQuery = { __typename?: 'Query', getAllListsOfASubscriber?: Array<{ __typename?: 'SubscriberList', id: string, listId: string, subscriberId: string, createdAt: any, list: { __typename?: 'List', id: string, name: string, members: number, createdAt: any, starred: boolean }, subscriber: { __typename?: 'Subscriber', emailStatus: SubscriberEmailStatus, id: string, subscriberType: SubscriberType, storeId: string, userId: string, createdAt: any, updatedAt: any, firstName?: string | null, lastName?: string | null, phoneNumber?: any | null, user: { __typename?: 'User', id: string, email: string, name?: string | null }, subscriberAddress?: { __typename?: 'SubscriberAddress', address1?: string | null, address2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null } | null }, emailConcent: { __typename?: 'EmailConcent', state: EmailConcentState, optInLevel: EmailConcentOptInLevel, collectedFrom: EmailConcentCollectedFrom } }> | null };

export type GetSubscriberListsQueryVariables = Exact<{
  listId: Scalars['String'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
}>;


export type GetSubscriberListsQuery = { __typename?: 'Query', getSubscriberLists?: Array<{ __typename?: 'SubscriberList', id: string, listId: string, subscriberId: string, createdAt: any, subscriber: { __typename?: 'Subscriber', id: string, subscriberType: SubscriberType, storeId: string, userId: string, createdAt: any, updatedAt: any, firstName?: string | null, lastName?: string | null, phoneNumber?: any | null, user: { __typename?: 'User', id: string, email: string, name?: string | null }, subscriberAddress?: { __typename?: 'SubscriberAddress', address1?: string | null, address2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null } | null }, emailConcent: { __typename?: 'EmailConcent', state: EmailConcentState, optInLevel: EmailConcentOptInLevel, collectedFrom: EmailConcentCollectedFrom } }> | null };

export type GetSubscribersInListCountQueryVariables = Exact<{
  listId: Scalars['String'];
}>;


export type GetSubscribersInListCountQuery = { __typename?: 'Query', getSubscribersInListCount?: number | null };

export type RemoveSubscriberFromListMutationVariables = Exact<{
  listId: Scalars['String'];
  subscriberId: Scalars['String'];
}>;


export type RemoveSubscriberFromListMutation = { __typename?: 'Mutation', removeSubscriberFromList?: { __typename?: 'SubscriberList', id: string, listId: string, subscriberId: string, createdAt: any, subscriber: { __typename?: 'Subscriber', id: string, subscriberType: SubscriberType, storeId: string, userId: string, createdAt: any, updatedAt: any, firstName?: string | null, lastName?: string | null, phoneNumber?: any | null, user: { __typename?: 'User', id: string, email: string, name?: string | null }, subscriberAddress?: { __typename?: 'SubscriberAddress', address1?: string | null, address2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null } | null }, emailConcent: { __typename?: 'EmailConcent', state: EmailConcentState, optInLevel: EmailConcentOptInLevel, collectedFrom: EmailConcentCollectedFrom } } | null };

export type SubscriberListFragment = { __typename?: 'SubscriberList', id: string, listId: string, subscriberId: string, createdAt: any, subscriber: { __typename?: 'Subscriber', id: string, subscriberType: SubscriberType, storeId: string, userId: string, createdAt: any, updatedAt: any, firstName?: string | null, lastName?: string | null, phoneNumber?: any | null, user: { __typename?: 'User', id: string, email: string, name?: string | null }, subscriberAddress?: { __typename?: 'SubscriberAddress', address1?: string | null, address2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null } | null }, emailConcent: { __typename?: 'EmailConcent', state: EmailConcentState, optInLevel: EmailConcentOptInLevel, collectedFrom: EmailConcentCollectedFrom } };

export type UnsubscribeFromListMutationVariables = Exact<{
  listId: Scalars['String'];
  unsubscribeId: Scalars['String'];
}>;


export type UnsubscribeFromListMutation = { __typename?: 'Mutation', unsubscribeFromList?: { __typename?: 'SubscriberList', id: string, listId: string, subscriberId: string, createdAt: any, subscriber: { __typename?: 'Subscriber', id: string, subscriberType: SubscriberType, storeId: string, userId: string, createdAt: any, updatedAt: any, firstName?: string | null, lastName?: string | null, phoneNumber?: any | null, user: { __typename?: 'User', id: string, email: string, name?: string | null }, subscriberAddress?: { __typename?: 'SubscriberAddress', address1?: string | null, address2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null } | null }, emailConcent: { __typename?: 'EmailConcent', state: EmailConcentState, optInLevel: EmailConcentOptInLevel, collectedFrom: EmailConcentCollectedFrom } } | null };

export type GetSubscriberQueryVariables = Exact<{
  subscriberId: Scalars['String'];
}>;


export type GetSubscriberQuery = { __typename?: 'Query', getSubscriber?: { __typename?: 'Subscriber', id: string, subscriberType: SubscriberType, storeId: string, userId: string, createdAt: any, updatedAt: any, firstName?: string | null, lastName?: string | null, phoneNumber?: any | null, user: { __typename?: 'User', id: string, email: string, name?: string | null }, subscriberAddress?: { __typename?: 'SubscriberAddress', address1?: string | null, address2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null } | null } | null };

export type GetSubscriberCountAddedTodayQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetSubscriberCountAddedTodayQuery = { __typename?: 'Query', getSubscriberCountAddedToday?: number | null };

export type GetSubscribersQueryVariables = Exact<{
  subdomain: Scalars['String'];
  skip: Scalars['Int'];
  take: Scalars['Int'];
}>;


export type GetSubscribersQuery = { __typename?: 'Query', getSubscribers?: Array<{ __typename?: 'Subscriber', id: string, subscriberType: SubscriberType, storeId: string, userId: string, createdAt: any, updatedAt: any, firstName?: string | null, lastName?: string | null, phoneNumber?: any | null, user: { __typename?: 'User', id: string, email: string, name?: string | null }, subscriberAddress?: { __typename?: 'SubscriberAddress', address1?: string | null, address2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null } | null }> | null };

export type GetSubscribersCountQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetSubscribersCountQuery = { __typename?: 'Query', getSubscribersCount?: number | null };

export type ResubscribeToListMutationVariables = Exact<{
  listId: Scalars['String'];
  unsubscribeId: Scalars['String'];
}>;


export type ResubscribeToListMutation = { __typename?: 'Mutation', resubscribeToList?: { __typename?: 'Subscriber', id: string, subscriberType: SubscriberType, storeId: string, userId: string, createdAt: any, updatedAt: any, firstName?: string | null, lastName?: string | null, phoneNumber?: any | null, user: { __typename?: 'User', id: string, email: string, name?: string | null }, subscriberAddress?: { __typename?: 'SubscriberAddress', address1?: string | null, address2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null } | null } | null };

export type SearchSubscribersQueryVariables = Exact<{
  searchString: Scalars['String'];
  subdomain: Scalars['String'];
}>;


export type SearchSubscribersQuery = { __typename?: 'Query', searchSubscribers?: Array<{ __typename?: 'Subscriber', id: string, subscriberType: SubscriberType, storeId: string, userId: string, createdAt: any, updatedAt: any, firstName?: string | null, lastName?: string | null, phoneNumber?: any | null, user: { __typename?: 'User', id: string, email: string, name?: string | null }, subscriberAddress?: { __typename?: 'SubscriberAddress', address1?: string | null, address2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null } | null }> | null };

export type SubscriberFragment = { __typename?: 'Subscriber', id: string, subscriberType: SubscriberType, storeId: string, userId: string, createdAt: any, updatedAt: any, firstName?: string | null, lastName?: string | null, phoneNumber?: any | null, user: { __typename?: 'User', id: string, email: string, name?: string | null }, subscriberAddress?: { __typename?: 'SubscriberAddress', address1?: string | null, address2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null } | null };

export type UnsubscribeFromAllListMutationVariables = Exact<{
  unsubscribeId: Scalars['String'];
}>;


export type UnsubscribeFromAllListMutation = { __typename?: 'Mutation', unsubscribeFromAllList?: { __typename?: 'Subscriber', id: string, subscriberType: SubscriberType, storeId: string, userId: string, createdAt: any, updatedAt: any, firstName?: string | null, lastName?: string | null, phoneNumber?: any | null, user: { __typename?: 'User', id: string, email: string, name?: string | null }, subscriberAddress?: { __typename?: 'SubscriberAddress', address1?: string | null, address2?: string | null, city?: string | null, country?: string | null, state?: string | null, zipCode?: string | null } | null } | null };

export type CompleteOnboardingMutationVariables = Exact<{
  input: CompleteOnboardingInput;
}>;


export type CompleteOnboardingMutation = { __typename?: 'Mutation', completeOnboarding?: { __typename?: 'Store', id: string, subdomain?: string | null, name?: string | null, currency: StoreCurrency, userId?: string | null, defaultListIdToCollectEmail?: string | null, contactLimitStatus: ContactLimitStatus, emailSentLimitStatus: EmailSentLimitStatus, createdAt: any, contact?: { __typename?: 'Contact', senderName: string, senderEmail: string, address1: string, address2?: string | null, city: string, state?: string | null, country: string, zipCode: string } | null, displayPicture?: { __typename?: 'DisplayPicture', height: number, src: string, width: number } | null, about?: { __typename?: 'About', id: string, about?: string | null, aboutLexical?: string | null, aboutHTML?: string | null, industry?: string | null } | null } | null };

export type ConfirmCodeAndLoginMutationVariables = Exact<{
  loginCode: Scalars['String'];
}>;


export type ConfirmCodeAndLoginMutation = { __typename?: 'Mutation', confirmCodeAndLogin?: boolean | null };

export type EmailLoginMutationVariables = Exact<{
  input: EmailLoginInput;
}>;


export type EmailLoginMutation = { __typename?: 'Mutation', emailLogin?: { __typename?: 'User', id: string, email: string, name?: string | null, store?: { __typename?: 'Store', id: string, subdomain?: string | null, name?: string | null, currency: StoreCurrency, userId?: string | null, defaultListIdToCollectEmail?: string | null, contactLimitStatus: ContactLimitStatus, emailSentLimitStatus: EmailSentLimitStatus, createdAt: any, contact?: { __typename?: 'Contact', senderName: string, senderEmail: string, address1: string, address2?: string | null, city: string, state?: string | null, country: string, zipCode: string } | null, displayPicture?: { __typename?: 'DisplayPicture', height: number, src: string, width: number } | null, about?: { __typename?: 'About', id: string, about?: string | null, aboutLexical?: string | null, aboutHTML?: string | null, industry?: string | null } | null } | null } | null };

export type GetUserExistByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetUserExistByEmailQuery = { __typename?: 'Query', getUserExistByEmail: boolean };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: boolean | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, name?: string | null } | null };

export type SignupWithEmailMutationVariables = Exact<{
  input: CreateUserWithEmailInput;
}>;


export type SignupWithEmailMutation = { __typename?: 'Mutation', signupWithEmail?: { __typename?: 'User', id: string, email: string, name?: string | null } | null };

export type UploadCsvFileEmailsToListMutationVariables = Exact<{
  input: UploadCsvFileEmailsToListInput;
}>;


export type UploadCsvFileEmailsToListMutation = { __typename?: 'Mutation', uploadCsvFileEmailsToList?: string | null };

export type UserFragment = { __typename?: 'User', id: string, email: string, name?: string | null };

export type CreateConditionalSplitNodeMutationVariables = Exact<{
  input: CreateConditionalSplitNodeInput;
}>;


export type CreateConditionalSplitNodeMutation = { __typename?: 'Mutation', createConditionalSplitNode?: { __typename?: 'WorkflowState', id: string, name: string, description?: string | null, workflowStateType: WorkflowStateType, workflowActivityType: WorkflowActivityType, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } | null };

export type CreateListTriggerMutationVariables = Exact<{
  listId: Scalars['String'];
  workflowId: Scalars['String'];
}>;


export type CreateListTriggerMutation = { __typename?: 'Mutation', createListTrigger?: { __typename?: 'WorkflowState', id: string, name: string, description?: string | null, workflowStateType: WorkflowStateType, workflowActivityType: WorkflowActivityType, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } | null };

export type CreateMetricTriggerMutationVariables = Exact<{
  metricType: MetricType;
  workflowId: Scalars['String'];
}>;


export type CreateMetricTriggerMutation = { __typename?: 'Mutation', createMetricTrigger?: { __typename?: 'WorkflowState', id: string, name: string, description?: string | null, workflowStateType: WorkflowStateType, workflowActivityType: WorkflowActivityType, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } | null };

export type CreateSendEmailNodeMutationVariables = Exact<{
  input: CreateSendEmailNodeInput;
}>;


export type CreateSendEmailNodeMutation = { __typename?: 'Mutation', createSendEmailNode?: { __typename?: 'WorkflowState', id: string, name: string, description?: string | null, workflowStateType: WorkflowStateType, workflowActivityType: WorkflowActivityType, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } | null };

export type CreateTriggerSplitNodeMutationVariables = Exact<{
  input: CreateTriggerSplitNodeInput;
}>;


export type CreateTriggerSplitNodeMutation = { __typename?: 'Mutation', createTriggerSplitNode?: { __typename?: 'WorkflowState', id: string, name: string, description?: string | null, workflowStateType: WorkflowStateType, workflowActivityType: WorkflowActivityType, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } | null };

export type DeleteWorkflowTransitionMutationVariables = Exact<{
  workflowId: Scalars['String'];
  workflowTransitionId: Scalars['String'];
}>;


export type DeleteWorkflowTransitionMutation = { __typename?: 'Mutation', deleteWorkflowTransition?: { __typename?: 'WorkflowState', id: string, name: string, description?: string | null, workflowStateType: WorkflowStateType, workflowActivityType: WorkflowActivityType, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } | null };

export type UpdateListTriggerMutationVariables = Exact<{
  listId: Scalars['String'];
  workflowStateId: Scalars['String'];
}>;


export type UpdateListTriggerMutation = { __typename?: 'Mutation', updateListTrigger?: { __typename?: 'WorkflowState', id: string, name: string, description?: string | null, workflowStateType: WorkflowStateType, workflowActivityType: WorkflowActivityType, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } | null };

export type UpdateConditionalSplitStateMutationVariables = Exact<{
  input: UpdateConditionalSplitStateInput;
}>;


export type UpdateConditionalSplitStateMutation = { __typename?: 'Mutation', updateConditionalSplitState?: { __typename?: 'WorkflowState', id: string, name: string, description?: string | null, workflowStateType: WorkflowStateType, workflowActivityType: WorkflowActivityType, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } | null };

export type UpdateDelayStateMutationVariables = Exact<{
  input: UpdateDelayStateInput;
}>;


export type UpdateDelayStateMutation = { __typename?: 'Mutation', updateDelayState?: { __typename?: 'WorkflowState', id: string, name: string, description?: string | null, workflowStateType: WorkflowStateType, workflowActivityType: WorkflowActivityType, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } | null };

export type UpdateMetricTriggerMutationVariables = Exact<{
  metricType: MetricType;
  workflowStateId: Scalars['String'];
}>;


export type UpdateMetricTriggerMutation = { __typename?: 'Mutation', updateMetricTrigger?: { __typename?: 'WorkflowState', id: string, name: string, description?: string | null, workflowStateType: WorkflowStateType, workflowActivityType: WorkflowActivityType, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } | null };

export type UpdateSendEmailStateMutationVariables = Exact<{
  input: UpdateSendEmailStateInput;
}>;


export type UpdateSendEmailStateMutation = { __typename?: 'Mutation', updateSendEmailState?: { __typename?: 'WorkflowState', id: string, name: string, description?: string | null, workflowStateType: WorkflowStateType, workflowActivityType: WorkflowActivityType, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } | null };

export type UpdateTriggerSplitStateMutationVariables = Exact<{
  input: UpdateTriggerSplitStateInput;
}>;


export type UpdateTriggerSplitStateMutation = { __typename?: 'Mutation', updateTriggerSplitState?: { __typename?: 'WorkflowState', id: string, name: string, description?: string | null, workflowStateType: WorkflowStateType, workflowActivityType: WorkflowActivityType, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } | null };

export type WorkflowStateFragment = { __typename?: 'WorkflowState', id: string, name: string, description?: string | null, workflowStateType: WorkflowStateType, workflowActivityType: WorkflowActivityType, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } };

type WorkflowStateValueUnion_WorkflowStateConditionalSplitActivityValue_Fragment = { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> };

type WorkflowStateValueUnion_WorkflowStateDelayActivityValue_Fragment = { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number };

type WorkflowStateValueUnion_WorkflowStateListTriggerActivityValue_Fragment = { __typename: 'WorkflowStateListTriggerActivityValue', listId: string };

type WorkflowStateValueUnion_WorkflowStateMetricTriggerActivityValue_Fragment = { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType };

type WorkflowStateValueUnion_WorkflowStateSendEmailActivityValue_Fragment = { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string };

type WorkflowStateValueUnion_WorkflowStateTriggerSplitActivityValue_Fragment = { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> };

export type WorkflowStateValueUnionFragment = WorkflowStateValueUnion_WorkflowStateConditionalSplitActivityValue_Fragment | WorkflowStateValueUnion_WorkflowStateDelayActivityValue_Fragment | WorkflowStateValueUnion_WorkflowStateListTriggerActivityValue_Fragment | WorkflowStateValueUnion_WorkflowStateMetricTriggerActivityValue_Fragment | WorkflowStateValueUnion_WorkflowStateSendEmailActivityValue_Fragment | WorkflowStateValueUnion_WorkflowStateTriggerSplitActivityValue_Fragment;

export type ConvertWorkflowToPublicMutationVariables = Exact<{
  workflowId: Scalars['String'];
}>;


export type ConvertWorkflowToPublicMutation = { __typename?: 'Mutation', convertWorkflowToPublic?: { __typename?: 'Workflow', id: string, name: string, workflowStatus: WorkflowStatus, public: boolean, descriptionLexical?: string | null, descriptionHTML?: string | null, replicationCount: number, createdAt: any, updatedAt: any, node?: Array<{ __typename?: 'WorkflowNode', id: string, type: WorkflowNodeType, position: { __typename?: 'WorkflowNodeXYPostion', x: number, y: number }, data: { __typename?: 'WorkflowNodeData', id: string, name: string, workflowStateType: string, workflowActivityType: string, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } }> | null, edge?: Array<{ __typename?: 'WorkflowEdge', id: string, source: string, target: string, sourceHandle: string }> | null, flowFilter?: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> | null, triggerFilter?: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> | null } | null };

export type CreateNewDelayNodeMutationVariables = Exact<{
  input: CreateNewDelayNodeInput;
}>;


export type CreateNewDelayNodeMutation = { __typename?: 'Mutation', createNewDelayNode?: { __typename?: 'Workflow', id: string, name: string, workflowStatus: WorkflowStatus, public: boolean, descriptionLexical?: string | null, descriptionHTML?: string | null, replicationCount: number, createdAt: any, updatedAt: any, node?: Array<{ __typename?: 'WorkflowNode', id: string, type: WorkflowNodeType, position: { __typename?: 'WorkflowNodeXYPostion', x: number, y: number }, data: { __typename?: 'WorkflowNodeData', id: string, name: string, workflowStateType: string, workflowActivityType: string, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } }> | null, edge?: Array<{ __typename?: 'WorkflowEdge', id: string, source: string, target: string, sourceHandle: string }> | null, flowFilter?: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> | null, triggerFilter?: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> | null } | null };

export type CreateNodeConnectionMutationVariables = Exact<{
  workflowId: Scalars['String'];
  sourceId: Scalars['String'];
  targetId: Scalars['String'];
  otherWise: Scalars['Boolean'];
}>;


export type CreateNodeConnectionMutation = { __typename?: 'Mutation', createNodeConnection?: { __typename?: 'Workflow', id: string, name: string, workflowStatus: WorkflowStatus, public: boolean, descriptionLexical?: string | null, descriptionHTML?: string | null, replicationCount: number, createdAt: any, updatedAt: any, node?: Array<{ __typename?: 'WorkflowNode', id: string, type: WorkflowNodeType, position: { __typename?: 'WorkflowNodeXYPostion', x: number, y: number }, data: { __typename?: 'WorkflowNodeData', id: string, name: string, workflowStateType: string, workflowActivityType: string, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } }> | null, edge?: Array<{ __typename?: 'WorkflowEdge', id: string, source: string, target: string, sourceHandle: string }> | null, flowFilter?: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> | null, triggerFilter?: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> | null } | null };

export type CreateWorkflowMutationVariables = Exact<{
  storeId: Scalars['String'];
}>;


export type CreateWorkflowMutation = { __typename?: 'Mutation', createWorkflow?: { __typename?: 'Workflow', id: string, name: string, workflowStatus: WorkflowStatus, public: boolean, descriptionLexical?: string | null, descriptionHTML?: string | null, replicationCount: number, createdAt: any, updatedAt: any, node?: Array<{ __typename?: 'WorkflowNode', id: string, type: WorkflowNodeType, position: { __typename?: 'WorkflowNodeXYPostion', x: number, y: number }, data: { __typename?: 'WorkflowNodeData', id: string, name: string, workflowStateType: string, workflowActivityType: string, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } }> | null, edge?: Array<{ __typename?: 'WorkflowEdge', id: string, source: string, target: string, sourceHandle: string }> | null, flowFilter?: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> | null, triggerFilter?: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> | null } | null };

export type DeleteWorkflowMutationVariables = Exact<{
  workflowId: Scalars['String'];
}>;


export type DeleteWorkflowMutation = { __typename?: 'Mutation', deleteWorkflow?: { __typename?: 'Workflow', id: string, name: string, workflowStatus: WorkflowStatus, public: boolean, descriptionLexical?: string | null, descriptionHTML?: string | null, replicationCount: number, createdAt: any, updatedAt: any, node?: Array<{ __typename?: 'WorkflowNode', id: string, type: WorkflowNodeType, position: { __typename?: 'WorkflowNodeXYPostion', x: number, y: number }, data: { __typename?: 'WorkflowNodeData', id: string, name: string, workflowStateType: string, workflowActivityType: string, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } }> | null, edge?: Array<{ __typename?: 'WorkflowEdge', id: string, source: string, target: string, sourceHandle: string }> | null, flowFilter?: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> | null, triggerFilter?: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> | null } | null };

export type DeleteWorkflowNodeMutationVariables = Exact<{
  workflowStateId: Scalars['String'];
}>;


export type DeleteWorkflowNodeMutation = { __typename?: 'Mutation', deleteWorkflowNode?: { __typename?: 'Workflow', id: string, name: string, workflowStatus: WorkflowStatus, public: boolean, descriptionLexical?: string | null, descriptionHTML?: string | null, replicationCount: number, createdAt: any, updatedAt: any, node?: Array<{ __typename?: 'WorkflowNode', id: string, type: WorkflowNodeType, position: { __typename?: 'WorkflowNodeXYPostion', x: number, y: number }, data: { __typename?: 'WorkflowNodeData', id: string, name: string, workflowStateType: string, workflowActivityType: string, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } }> | null, edge?: Array<{ __typename?: 'WorkflowEdge', id: string, source: string, target: string, sourceHandle: string }> | null, flowFilter?: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> | null, triggerFilter?: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> | null } | null };

export type GetPublicWorkflowsQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
}>;


export type GetPublicWorkflowsQuery = { __typename?: 'Query', getPublicWorkflows?: Array<{ __typename?: 'Workflow', id: string, name: string, workflowStatus: WorkflowStatus, public: boolean, descriptionLexical?: string | null, descriptionHTML?: string | null, replicationCount: number, createdAt: any, updatedAt: any, store: { __typename?: 'Store', name?: string | null, id: string }, node?: Array<{ __typename?: 'WorkflowNode', id: string, type: WorkflowNodeType, position: { __typename?: 'WorkflowNodeXYPostion', x: number, y: number }, data: { __typename?: 'WorkflowNodeData', id: string, name: string, workflowStateType: string, workflowActivityType: string, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } }> | null, edge?: Array<{ __typename?: 'WorkflowEdge', id: string, source: string, target: string, sourceHandle: string }> | null, flowFilter?: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> | null, triggerFilter?: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> | null }> | null };

export type GetWorkflowQueryVariables = Exact<{
  workflowId: Scalars['String'];
}>;


export type GetWorkflowQuery = { __typename?: 'Query', getWorkflow?: { __typename?: 'Workflow', id: string, name: string, workflowStatus: WorkflowStatus, public: boolean, descriptionLexical?: string | null, descriptionHTML?: string | null, replicationCount: number, createdAt: any, updatedAt: any, node?: Array<{ __typename?: 'WorkflowNode', id: string, type: WorkflowNodeType, position: { __typename?: 'WorkflowNodeXYPostion', x: number, y: number }, data: { __typename?: 'WorkflowNodeData', id: string, name: string, workflowStateType: string, workflowActivityType: string, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } }> | null, edge?: Array<{ __typename?: 'WorkflowEdge', id: string, source: string, target: string, sourceHandle: string }> | null, flowFilter?: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> | null, triggerFilter?: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> | null } | null };

export type GetWorkflowCountQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetWorkflowCountQuery = { __typename?: 'Query', getWorkflowCount?: number | null };

export type GetWorkflowsQueryVariables = Exact<{
  subdomain: Scalars['String'];
}>;


export type GetWorkflowsQuery = { __typename?: 'Query', getWorkflows?: Array<{ __typename?: 'Workflow', id: string, name: string, workflowStatus: WorkflowStatus, public: boolean, descriptionLexical?: string | null, descriptionHTML?: string | null, replicationCount: number, createdAt: any, updatedAt: any, node?: Array<{ __typename?: 'WorkflowNode', id: string, type: WorkflowNodeType, position: { __typename?: 'WorkflowNodeXYPostion', x: number, y: number }, data: { __typename?: 'WorkflowNodeData', id: string, name: string, workflowStateType: string, workflowActivityType: string, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } }> | null, edge?: Array<{ __typename?: 'WorkflowEdge', id: string, source: string, target: string, sourceHandle: string }> | null, flowFilter?: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> | null, triggerFilter?: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> | null }> | null };

export type ReplicateWorkflowMutationVariables = Exact<{
  storeId: Scalars['String'];
  replicaWorkflowId: Scalars['String'];
}>;


export type ReplicateWorkflowMutation = { __typename?: 'Mutation', replicateWorkflow?: { __typename?: 'Workflow', id: string, name: string, workflowStatus: WorkflowStatus, public: boolean, descriptionLexical?: string | null, descriptionHTML?: string | null, replicationCount: number, createdAt: any, updatedAt: any, node?: Array<{ __typename?: 'WorkflowNode', id: string, type: WorkflowNodeType, position: { __typename?: 'WorkflowNodeXYPostion', x: number, y: number }, data: { __typename?: 'WorkflowNodeData', id: string, name: string, workflowStateType: string, workflowActivityType: string, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } }> | null, edge?: Array<{ __typename?: 'WorkflowEdge', id: string, source: string, target: string, sourceHandle: string }> | null, flowFilter?: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> | null, triggerFilter?: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> | null } | null };

export type TurnOffWorkflowMutationVariables = Exact<{
  workflowId: Scalars['String'];
}>;


export type TurnOffWorkflowMutation = { __typename?: 'Mutation', turnOffWorkflow?: { __typename?: 'Workflow', id: string, name: string, workflowStatus: WorkflowStatus, public: boolean, descriptionLexical?: string | null, descriptionHTML?: string | null, replicationCount: number, createdAt: any, updatedAt: any, node?: Array<{ __typename?: 'WorkflowNode', id: string, type: WorkflowNodeType, position: { __typename?: 'WorkflowNodeXYPostion', x: number, y: number }, data: { __typename?: 'WorkflowNodeData', id: string, name: string, workflowStateType: string, workflowActivityType: string, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } }> | null, edge?: Array<{ __typename?: 'WorkflowEdge', id: string, source: string, target: string, sourceHandle: string }> | null, flowFilter?: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> | null, triggerFilter?: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> | null } | null };

export type TurnOnWorkflowMutationVariables = Exact<{
  workflowId: Scalars['String'];
}>;


export type TurnOnWorkflowMutation = { __typename?: 'Mutation', turnOnWorkflow?: { __typename?: 'Workflow', id: string, name: string, workflowStatus: WorkflowStatus, public: boolean, descriptionLexical?: string | null, descriptionHTML?: string | null, replicationCount: number, createdAt: any, updatedAt: any, node?: Array<{ __typename?: 'WorkflowNode', id: string, type: WorkflowNodeType, position: { __typename?: 'WorkflowNodeXYPostion', x: number, y: number }, data: { __typename?: 'WorkflowNodeData', id: string, name: string, workflowStateType: string, workflowActivityType: string, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } }> | null, edge?: Array<{ __typename?: 'WorkflowEdge', id: string, source: string, target: string, sourceHandle: string }> | null, flowFilter?: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> | null, triggerFilter?: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> | null } | null };

export type UpdateWorkflowDescriptionMutationVariables = Exact<{
  workflowId: Scalars['String'];
  descriptionHTML: Scalars['String'];
  descriptionLexical: Scalars['String'];
}>;


export type UpdateWorkflowDescriptionMutation = { __typename?: 'Mutation', updateWorkflowDescription?: { __typename?: 'Workflow', id: string, name: string, workflowStatus: WorkflowStatus, public: boolean, descriptionLexical?: string | null, descriptionHTML?: string | null, replicationCount: number, createdAt: any, updatedAt: any, node?: Array<{ __typename?: 'WorkflowNode', id: string, type: WorkflowNodeType, position: { __typename?: 'WorkflowNodeXYPostion', x: number, y: number }, data: { __typename?: 'WorkflowNodeData', id: string, name: string, workflowStateType: string, workflowActivityType: string, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } }> | null, edge?: Array<{ __typename?: 'WorkflowEdge', id: string, source: string, target: string, sourceHandle: string }> | null, flowFilter?: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> | null, triggerFilter?: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> | null } | null };

export type UpdateFlowFilterMutationVariables = Exact<{
  input: UpdateFlowFilterInput;
}>;


export type UpdateFlowFilterMutation = { __typename?: 'Mutation', updateFlowFilter?: { __typename?: 'Workflow', id: string, name: string, workflowStatus: WorkflowStatus, public: boolean, descriptionLexical?: string | null, descriptionHTML?: string | null, replicationCount: number, createdAt: any, updatedAt: any, node?: Array<{ __typename?: 'WorkflowNode', id: string, type: WorkflowNodeType, position: { __typename?: 'WorkflowNodeXYPostion', x: number, y: number }, data: { __typename?: 'WorkflowNodeData', id: string, name: string, workflowStateType: string, workflowActivityType: string, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } }> | null, edge?: Array<{ __typename?: 'WorkflowEdge', id: string, source: string, target: string, sourceHandle: string }> | null, flowFilter?: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> | null, triggerFilter?: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> | null } | null };

export type UpdateTriggerFilterMutationVariables = Exact<{
  input: UpdateTriggerFilterInput;
}>;


export type UpdateTriggerFilterMutation = { __typename?: 'Mutation', updateTriggerFilter?: { __typename?: 'Workflow', id: string, name: string, workflowStatus: WorkflowStatus, public: boolean, descriptionLexical?: string | null, descriptionHTML?: string | null, replicationCount: number, createdAt: any, updatedAt: any, node?: Array<{ __typename?: 'WorkflowNode', id: string, type: WorkflowNodeType, position: { __typename?: 'WorkflowNodeXYPostion', x: number, y: number }, data: { __typename?: 'WorkflowNodeData', id: string, name: string, workflowStateType: string, workflowActivityType: string, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } }> | null, edge?: Array<{ __typename?: 'WorkflowEdge', id: string, source: string, target: string, sourceHandle: string }> | null, flowFilter?: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> | null, triggerFilter?: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> | null } | null };

export type UpdateWorkflowNameMutationVariables = Exact<{
  workflowId: Scalars['String'];
  name: Scalars['String'];
}>;


export type UpdateWorkflowNameMutation = { __typename?: 'Mutation', updateWorkflowName?: { __typename?: 'Workflow', id: string, name: string, workflowStatus: WorkflowStatus, public: boolean, descriptionLexical?: string | null, descriptionHTML?: string | null, replicationCount: number, createdAt: any, updatedAt: any, node?: Array<{ __typename?: 'WorkflowNode', id: string, type: WorkflowNodeType, position: { __typename?: 'WorkflowNodeXYPostion', x: number, y: number }, data: { __typename?: 'WorkflowNodeData', id: string, name: string, workflowStateType: string, workflowActivityType: string, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } }> | null, edge?: Array<{ __typename?: 'WorkflowEdge', id: string, source: string, target: string, sourceHandle: string }> | null, flowFilter?: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> | null, triggerFilter?: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> | null } | null };

export type BaseConditionalFilterFragment = { __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null };

export type WorkflowFragment = { __typename?: 'Workflow', id: string, name: string, workflowStatus: WorkflowStatus, public: boolean, descriptionLexical?: string | null, descriptionHTML?: string | null, replicationCount: number, createdAt: any, updatedAt: any, node?: Array<{ __typename?: 'WorkflowNode', id: string, type: WorkflowNodeType, position: { __typename?: 'WorkflowNodeXYPostion', x: number, y: number }, data: { __typename?: 'WorkflowNodeData', id: string, name: string, workflowStateType: string, workflowActivityType: string, value: { __typename: 'WorkflowStateConditionalSplitActivityValue', flowFilter: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> } | { __typename: 'WorkflowStateDelayActivityValue', delayType: DelayTypeEnum, delayInMilliseconds: number } | { __typename: 'WorkflowStateListTriggerActivityValue', listId: string } | { __typename: 'WorkflowStateMetricTriggerActivityValue', metricType: MetricType } | { __typename: 'WorkflowStateSendEmailActivityValue', type: string, design: string, html: string } | { __typename: 'WorkflowStateTriggerSplitActivityValue', triggerFilter: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> } } }> | null, edge?: Array<{ __typename?: 'WorkflowEdge', id: string, source: string, target: string, sourceHandle: string }> | null, flowFilter?: Array<Array<{ __typename?: 'BaseConditionalFilter', condition?: BaseConditionalFilterConditionEnum | null, value?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValue', trigger?: BaseConditionalFilterHasDoneOrNotDoneValueTriggerEnum | null, inequality?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueInequality', expression?: BaseCondtionalFilterHasDoneOrNotDoneValueInequalityExpressionEnum | null, value?: number | null } | null, time?: { __typename?: 'BaseConditionalFilterHasDoneOrNotDoneValueTime', expression?: BaseConditionalFilterHasDoneOrNotDoneValueTimeExpressionEnum | null, value1?: number | null, value2?: number | null, date1?: string | null, date2?: string | null, delayType?: DelayTypeEnum | null } | null } | null }>> | null, triggerFilter?: Array<Array<{ __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null }>> | null };

export type BaseTriggerFilterFragment = { __typename?: 'BaseTriggerFilter', dimension?: BaseTriggerFilterDimensionEnum | null, type?: BaseTriggerFilterTypeEnum | null, value?: { __typename: 'BaseTriggerFilterBooleanValue', booleanValue?: boolean | null } | { __typename: 'BaseTriggerFilterDateValue', dateExpression?: BaseTriggerFilterDateValueExpressionEnum | null, dateValue1?: number | null, dateValue2?: number | null, dateDate1?: string | null, dateDate2?: string | null, dateDelayType?: DelayTypeEnum | null } | { __typename: 'BaseTriggerFilterListValue', listExpression?: BaseTriggerFilterListValueExpressionEnum | null, listValue?: string | null } | { __typename: 'BaseTriggerFilterNumberValue', numberExpression?: BaseTriggerFilterNumberValueExpressionEnum | null, numberValue?: number | null } | { __typename: 'BaseTriggerFilterTextValue', textExpression?: BaseTriggerFilterTextValueExpressionEnum | null, textValue?: string | null } | null };

export const BillingFragmentDoc = gql`
    fragment Billing on Billing {
  id
  cancelAtPeriodEnd
  billingPlanStatus
  billingSubscriptionEntity
  currentPeriodEnd
  contactsQuantity
  emailSendQuantity
}
    `;
export const EventFragmentDoc = gql`
    fragment Event on Event {
  id
  message
  eventState
  eventType
  notificationRead
  notificationDismissed
  createdAt
  link
}
    `;
export const ShopifyFragmentDoc = gql`
    fragment Shopify on Shopify {
  id
  sessionExpired
  storeUrl
  authenticated
  productSyncJobId
  customerSyncJobId
  listIdToCollectEmail
}
    `;
export const IntegrationFragmentDoc = gql`
    fragment Integration on Integration {
  id
  shopify {
    ...Shopify
  }
}
    ${ShopifyFragmentDoc}`;
export const ItemFragmentDoc = gql`
    fragment Item on Item {
  id
  name
  credits
  imageData {
    height
    width
    src
  }
  data {
    ... on ItemEmailTemplateData {
      design
    }
    ... on ItemSignupFormData {
      formDesign
      successDesign
    }
    ... on ItemCreditsData {
      credits
    }
  }
  type
  start_date
  end_date
  description
}
    `;
export const ItemCategoryFragmentDoc = gql`
    fragment ItemCategory on ItemCategory {
  id
  type
}
    `;
export const MetricDataFragmentDoc = gql`
    fragment MetricData on MetricData {
  __typename
  ... on MetricShopifyPlacedOrder {
    type
    id
    subtotal_price
    total_price
  }
  ... on MetricShopifyCheckoutUpdate {
    type
    id
  }
  ... on MetricShopifyFulfilledOrder {
    type
    id
  }
  ... on MetricEmailLinkClicked {
    type
    link
  }
  ... on MetricShopifyCancelledOrder {
    type
    id
  }
  ... on MetricPostViewed {
    type
    referer
    ipAddress
    utm {
      campaign
      source
      term
      medium
      content
    }
  }
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  email
  name
}
    `;
export const SubscriberFragmentDoc = gql`
    fragment Subscriber on Subscriber {
  id
  subscriberType
  storeId
  userId
  createdAt
  updatedAt
  firstName
  lastName
  user {
    ...User
  }
  phoneNumber
  subscriberAddress {
    address1
    address2
    city
    country
    state
    zipCode
  }
}
    ${UserFragmentDoc}`;
export const MetricFragmentDoc = gql`
    fragment Metric on Metric {
  id
  metricType
  message
  postId
  listId
  data {
    ...MetricData
  }
  subscriberId
  subscriber {
    ...Subscriber
  }
  createdAt
}
    ${MetricDataFragmentDoc}
${SubscriberFragmentDoc}`;
export const NotificationFragmentDoc = gql`
    fragment Notification on Notification {
  id
  newSubscriber
}
    `;
export const PostFragmentDoc = gql`
    fragment Post on Post {
  id
  title
  subTitle
  bodyLexical
  bodyHTML
  postState
  publishedDate
  storeId
  postHandle
  postViewCount
  postOpenCount
  postRecipientCount
  image {
    src
    width
    height
  }
  store {
    userId
  }
}
    `;
export const ProductImageFragmentDoc = gql`
    fragment ProductImage on ProductImage {
  src
  height
  width
  mimeType
  cdnType
}
    `;
export const ProductFragmentDoc = gql`
    fragment Product on Product {
  id
  name
  description
  storeId
  price
  hidden
  productType
  externalLink
  productSource
  image {
    ...ProductImage
  }
}
    ${ProductImageFragmentDoc}`;
export const ProductPostFragmentDoc = gql`
    fragment ProductPost on ProductPost {
  id
  postId
  productId
}
    `;
export const ChallengeFragmentDoc = gql`
    fragment Challenge on Challenge {
  id
  name
  description
  completionCount
  completionStages
  measuredMetric
  challengeType
}
    `;
export const QuestFragmentDoc = gql`
    fragment Quest on Quest {
  id
  name
  description
  questType
  challenges {
    ...Challenge
  }
}
    ${ChallengeFragmentDoc}`;
export const ListFragmentDoc = gql`
    fragment List on List {
  id
  name
  members
  createdAt
  starred
}
    `;
export const SignupFormFragmentDoc = gql`
    fragment SignupForm on SignupForm {
  formSubmitRate
  views
  submitted
  id
  name
  formState
  scriptModule
  scriptJavascript
  form {
    js
    body
    css
    fonts
    design
    html
  }
  success {
    js
    body
    css
    fonts
    design
    html
  }
  list {
    ...List
  }
}
    ${ListFragmentDoc}`;
export const AboutFragmentDoc = gql`
    fragment About on About {
  id
  about
  aboutLexical
  aboutHTML
  industry
}
    `;
export const StoreFragmentDoc = gql`
    fragment Store on Store {
  id
  subdomain
  name
  currency
  userId
  defaultListIdToCollectEmail
  contactLimitStatus
  emailSentLimitStatus
  createdAt
  contact {
    senderName
    senderEmail
    address1
    address2
    city
    state
    country
    zipCode
  }
  displayPicture {
    height
    src
    width
  }
  about {
    ...About
  }
}
    ${AboutFragmentDoc}`;
export const StoreChallengeFragmentDoc = gql`
    fragment StoreChallenge on StoreChallenge {
  id
  completedCount
  completedStages
  challengeId
  allCompleted
  challenge {
    ...Challenge
  }
}
    ${ChallengeFragmentDoc}`;
export const StoreItemFragmentDoc = gql`
    fragment StoreItem on StoreItem {
  id
  itemId
  storeId
}
    `;
export const SubscriberListFragmentDoc = gql`
    fragment SubscriberList on SubscriberList {
  id
  listId
  subscriberId
  subscriber {
    ...Subscriber
  }
  emailConcent {
    state
    optInLevel
    collectedFrom
  }
  createdAt
}
    ${SubscriberFragmentDoc}`;
export const BaseConditionalFilterFragmentDoc = gql`
    fragment BaseConditionalFilter on BaseConditionalFilter {
  condition
  value {
    ... on BaseConditionalFilterHasDoneOrNotDoneValue {
      trigger
      inequality {
        expression
        value
      }
      time {
        expression
        value1
        value2
        date1
        date2
        delayType
      }
    }
  }
}
    `;
export const BaseTriggerFilterFragmentDoc = gql`
    fragment BaseTriggerFilter on BaseTriggerFilter {
  dimension
  type
  value {
    ... on BaseTriggerFilterTextValue {
      __typename
      textExpression
      textValue
    }
    ... on BaseTriggerFilterNumberValue {
      __typename
      numberExpression
      numberValue
    }
    ... on BaseTriggerFilterDateValue {
      __typename
      dateExpression
      dateValue1
      dateValue2
      dateDate1
      dateDate2
      dateDelayType
    }
    ... on BaseTriggerFilterBooleanValue {
      __typename
      booleanValue
    }
    ... on BaseTriggerFilterListValue {
      __typename
      listExpression
      listValue
    }
  }
}
    `;
export const WorkflowStateValueUnionFragmentDoc = gql`
    fragment WorkflowStateValueUnion on WorkflowStateValueUnion {
  __typename
  ... on WorkflowStateDelayActivityValue {
    delayType
    delayInMilliseconds
  }
  ... on WorkflowStateListTriggerActivityValue {
    listId
  }
  ... on WorkflowStateSendEmailActivityValue {
    type
    design
    html
  }
  ... on WorkflowStateMetricTriggerActivityValue {
    metricType
  }
  ... on WorkflowStateConditionalSplitActivityValue {
    flowFilter {
      ...BaseConditionalFilter
    }
  }
  ... on WorkflowStateTriggerSplitActivityValue {
    triggerFilter {
      ...BaseTriggerFilter
    }
  }
}
    ${BaseConditionalFilterFragmentDoc}
${BaseTriggerFilterFragmentDoc}`;
export const WorkflowStateFragmentDoc = gql`
    fragment WorkflowState on WorkflowState {
  id
  name
  description
  workflowStateType
  workflowActivityType
  value {
    ...WorkflowStateValueUnion
  }
}
    ${WorkflowStateValueUnionFragmentDoc}`;
export const WorkflowFragmentDoc = gql`
    fragment Workflow on Workflow {
  id
  name
  workflowStatus
  public
  descriptionLexical
  descriptionHTML
  replicationCount
  node {
    id
    type
    position {
      x
      y
    }
    data {
      id
      name
      workflowStateType
      workflowActivityType
      value {
        ...WorkflowStateValueUnion
      }
    }
  }
  edge {
    id
    source
    target
    sourceHandle
  }
  flowFilter {
    ...BaseConditionalFilter
  }
  triggerFilter {
    ...BaseTriggerFilter
  }
  createdAt
  updatedAt
}
    ${WorkflowStateValueUnionFragmentDoc}
${BaseConditionalFilterFragmentDoc}
${BaseTriggerFilterFragmentDoc}`;
export const GetAboutDocument = gql`
    query GetAbout($subdomain: String!) {
  getAbout(subdomain: $subdomain) {
    ...About
  }
}
    ${AboutFragmentDoc}`;
export const UpdateAboutDocument = gql`
    mutation UpdateAbout($input: UpdateAboutInput!) {
  updateAbout(input: $input) {
    ...About
  }
}
    ${AboutFragmentDoc}`;
export const UpdateIndustryDocument = gql`
    mutation UpdateIndustry($aboutId: String!, $industry: AboutIndustryEnum!) {
  updateIndustry(aboutId: $aboutId, industry: $industry) {
    ...About
  }
}
    ${AboutFragmentDoc}`;
export const GetStoreBillingDocument = gql`
    query GetStoreBilling($subdomain: String!) {
  getStoreBilling(subdomain: $subdomain) {
    ...Billing
  }
}
    ${BillingFragmentDoc}`;
export const DismissNotificationDocument = gql`
    mutation DismissNotification($eventId: String!) {
  dismissNotification(eventId: $eventId) {
    ...Event
  }
}
    ${EventFragmentDoc}`;
export const GetNotificationsDocument = gql`
    query GetNotifications($take: Int!, $skip: Int!) {
  getNotifications(take: $take, skip: $skip) {
    ...Event
  }
}
    ${EventFragmentDoc}`;
export const SetAllEventsAsReadDocument = gql`
    mutation SetAllEventsAsRead {
  setAllEventAsRead {
    ...Event
  }
}
    ${EventFragmentDoc}`;
export const UnReadNotificationCountDocument = gql`
    query unReadNotificationCount {
  unReadNotificationCount
}
    `;
export const GetIntegrationWithSubdomainDocument = gql`
    query GetIntegrationWithSubdomain($subdomain: String!) {
  getIntegrationWithSubdomain(subdomain: $subdomain) {
    ...Integration
  }
}
    ${IntegrationFragmentDoc}`;
export const GetPathCrateItemsDocument = gql`
    query GetPathCrateItems {
  getPathCrateItems {
    ...Item
  }
}
    ${ItemFragmentDoc}`;
export const CreateNewListDocument = gql`
    mutation CreateNewList($name: String!, $storeId: String!) {
  createNewList(name: $name, storeId: $storeId) {
    ...List
  }
}
    ${ListFragmentDoc}`;
export const DeleteListDocument = gql`
    mutation DeleteList($listId: String!) {
  deleteList(listId: $listId) {
    ...List
  }
}
    ${ListFragmentDoc}`;
export const GetListCountDocument = gql`
    query GetListCount($subdomain: String!) {
  getListCount(subdomain: $subdomain)
}
    `;
export const GetListsDocument = gql`
    query GetLists($subdomain: String!) {
  getLists(subdomain: $subdomain) {
    ...List
  }
}
    ${ListFragmentDoc}`;
export const GetStarredListsDocument = gql`
    query GetStarredLists($subdomain: String!) {
  getStarredLists(subdomain: $subdomain) {
    ...List
    addedToday
    addedThisWeek
  }
}
    ${ListFragmentDoc}`;
export const ToggleListStarDocument = gql`
    mutation ToggleListStar($listId: String!) {
  toggleListStar(listId: $listId) {
    ...List
  }
}
    ${ListFragmentDoc}`;
export const GetEmailLinkClickedCountDocument = gql`
    query GetEmailLinkClickedCount($subscriberId: String!) {
  getEmailLinkClickedCount(subscriberId: $subscriberId)
}
    `;
export const GetEmailOpenedCountDocument = gql`
    query GetEmailOpenedCount($subscriberId: String!) {
  getEmailOpenedCount(subscriberId: $subscriberId)
}
    `;
export const GetEmailReceivedCountDocument = gql`
    query GetEmailReceivedCount($subscriberId: String!) {
  getEmailReceivedCount(subscriberId: $subscriberId)
}
    `;
export const GetEmailSentThisMonthCountDocument = gql`
    query GetEmailSentThisMonthCount($subdomain: String!) {
  getEmailSentThisMonthCount(subdomain: $subdomain)
}
    `;
export const GetEmailSentTodayCountDocument = gql`
    query GetEmailSentTodayCount($subdomain: String!) {
  getEmailSentTodayCount(subdomain: $subdomain)
}
    `;
export const GetFulfilledOrderCountDocument = gql`
    query GetFulfilledOrderCount($subscriberId: String!) {
  getFulfilledOrderCount(subscriberId: $subscriberId)
}
    `;
export const GetMetricsByTypeDocument = gql`
    query GetMetricsByType($subdomain: String!, $metricType: MetricType, $allMetric: Boolean, $take: Int!, $skip: Int!) {
  getMetricsByType(
    subdomain: $subdomain
    metricType: $metricType
    allMetric: $allMetric
    take: $take
    skip: $skip
  ) {
    ...Metric
  }
}
    ${MetricFragmentDoc}`;
export const GetPlacedOrderCountDocument = gql`
    query GetPlacedOrderCount($subscriberId: String!) {
  getPlacedOrderCount(subscriberId: $subscriberId)
}
    `;
export const GetSubscriberMetricsDocument = gql`
    query GetSubscriberMetrics($subscriberId: String!, $take: Int!, $skip: Int!, $metricType: MetricType, $allMetric: Boolean) {
  getSubscriberMetrics(
    subscriberId: $subscriberId
    take: $take
    skip: $skip
    metricType: $metricType
    allMetric: $allMetric
  ) {
    ...Metric
  }
}
    ${MetricFragmentDoc}`;
export const GetSubscriberRevenueDocument = gql`
    query GetSubscriberRevenue($subscriberId: String!) {
  getSubscriberRevenue(subscriberId: $subscriberId)
}
    `;
export const GetNotificationDocument = gql`
    query GetNotification($subdomain: String!) {
  getNotification(subdomain: $subdomain) {
    ...Notification
  }
}
    ${NotificationFragmentDoc}`;
export const NewSubscriberNotificationToggleDocument = gql`
    mutation NewSubscriberNotificationToggle($subdomain: String!) {
  newSubscriberNotificationToggle(subdomain: $subdomain) {
    ...Notification
  }
}
    ${NotificationFragmentDoc}`;
export const CheckPostHandleAvailableDocument = gql`
    mutation CheckPostHandleAvailable($postId: String!, $handle: String!) {
  checkPostHandleAvailable(postId: $postId, handle: $handle)
}
    `;
export const CreatePostDocument = gql`
    mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    ...Post
  }
}
    ${PostFragmentDoc}`;
export const CreatePostViewedDocument = gql`
    mutation CreatePostViewed($input: CreatePostViewedInput!) {
  createPostViewed(input: $input) {
    ...Post
  }
}
    ${PostFragmentDoc}`;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: String!) {
  deletePost(postId: $postId) {
    ...Post
  }
}
    ${PostFragmentDoc}`;
export const GetAllPublishedPostForSiteMapDocument = gql`
    query GetAllPublishedPostForSiteMap {
  getAllPublishedPostForSiteMap {
    ...Post
    store {
      subdomain
    }
  }
}
    ${PostFragmentDoc}`;
export const GetDraftPostsDocument = gql`
    query GetDraftPosts($subdomain: String!) {
  getDraftPosts(subdomain: $subdomain) {
    ...Post
  }
}
    ${PostFragmentDoc}`;
export const GetMorePostsDocument = gql`
    query GetMorePosts($postHandle: String!) {
  getMorePosts(postHandle: $postHandle) {
    ...Post
  }
}
    ${PostFragmentDoc}`;
export const GetPostDocument = gql`
    query GetPost($postId: String!) {
  getPost(postId: $postId) {
    ...Post
  }
}
    ${PostFragmentDoc}`;
export const GetPostByHandleDocument = gql`
    query GetPostByHandle($postHandle: String!) {
  getPostByHandle(postHandle: $postHandle) {
    ...Post
  }
}
    ${PostFragmentDoc}`;
export const GetPostCountDocument = gql`
    query GetPostCount($subdomain: String!) {
  getPostCount(subdomain: $subdomain)
}
    `;
export const GetPostsDocument = gql`
    query GetPosts($subdomain: String!, $take: Int!, $skip: Int!) {
  getPosts(subdomain: $subdomain, take: $take, skip: $skip) {
    ...Post
  }
}
    ${PostFragmentDoc}`;
export const PublishPostHereDocument = gql`
    mutation PublishPostHere($postId: String!, $postHandle: String!) {
  publishPostHere(postId: $postId, postHandle: $postHandle)
}
    `;
export const PublishPostToListDocument = gql`
    mutation PublishPostToList($postId: String!, $listId: String!, $postHandle: String!) {
  publishPostToList(postId: $postId, listId: $listId, postHandle: $postHandle)
}
    `;
export const UnpublishPostDocument = gql`
    mutation UnpublishPost($postId: String!) {
  unpublishPost(postId: $postId) {
    ...Post
  }
}
    ${PostFragmentDoc}`;
export const UpdatePostDocument = gql`
    mutation UpdatePost($input: UpdatePostInput!) {
  updatePost(input: $input)
}
    `;
export const AddMoreProductImagesDocument = gql`
    mutation AddMoreProductImages($input: AddMoreProductImagesInput!) {
  addMoreProductImages(input: $input) {
    ...Product
  }
}
    ${ProductFragmentDoc}`;
export const CreateProductDocument = gql`
    mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    ...Product
  }
}
    ${ProductFragmentDoc}`;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($productId: String!) {
  deleteProduct(productId: $productId) {
    ...Product
  }
}
    ${ProductFragmentDoc}`;
export const DeleteProductImageDocument = gql`
    mutation DeleteProductImage($deletingUrl: String!, $productId: String!) {
  deleteProductImage(deletingUrl: $deletingUrl, productId: $productId) {
    ...Product
  }
}
    ${ProductFragmentDoc}`;
export const GetProductDocument = gql`
    query GetProduct($productId: String!) {
  getProduct(productId: $productId) {
    ...Product
  }
}
    ${ProductFragmentDoc}`;
export const GetProductCountDocument = gql`
    query GetProductCount($subdomain: String!) {
  getProductCount(subdomain: $subdomain)
}
    `;
export const GetProductsDocument = gql`
    query GetProducts($subdomain: String!, $take: Int!, $skip: Int!) {
  getProducts(subdomain: $subdomain, take: $take, skip: $skip) {
    ...Product
  }
}
    ${ProductFragmentDoc}`;
export const ToggleProductHiddenDocument = gql`
    mutation ToggleProductHidden($productId: String!) {
  toggleProductHidden(productId: $productId)
}
    `;
export const UpdateProductDetialsDocument = gql`
    mutation UpdateProductDetials($input: UpdateProductDetailsInput!) {
  updateProductDetails(input: $input) {
    ...Product
  }
}
    ${ProductFragmentDoc}`;
export const CreateProductPostDocument = gql`
    mutation CreateProductPost($postId: String!, $productIds: [String!]!, $nodeKey: String!) {
  createProductPost(postId: $postId, productIds: $productIds, nodeKey: $nodeKey) {
    ...ProductPost
  }
}
    ${ProductPostFragmentDoc}`;
export const DeleteProductPostDocument = gql`
    mutation DeleteProductPost($postId: String!, $nodeKey: String!) {
  deleteProductPost(postId: $postId, nodeKey: $nodeKey) {
    ...ProductPost
  }
}
    ${ProductPostFragmentDoc}`;
export const HasProductPostDocument = gql`
    query HasProductPost($subdomain: String!) {
  hasProductPost(subdomain: $subdomain)
}
    `;
export const GetMandatoryQuestDocument = gql`
    query GetMandatoryQuest($questType: QuestType!) {
  getMandatoryQuest(questType: $questType) {
    ...Quest
  }
}
    ${QuestFragmentDoc}`;
export const CollectEmailSubscribersDocument = gql`
    mutation CollectEmailSubscribers($shopifyId: String!, $listId: String!) {
  collectEmailSubscribers(shopifyId: $shopifyId, listId: $listId) {
    ...Shopify
  }
}
    ${ShopifyFragmentDoc}`;
export const RemoveCollectEmailSubscribersDocument = gql`
    mutation RemoveCollectEmailSubscribers($shopifyId: String!) {
  removeCollectEmailSubscribers(shopifyId: $shopifyId) {
    ...Shopify
  }
}
    ${ShopifyFragmentDoc}`;
export const RemoveShopifyIntegrationDocument = gql`
    mutation RemoveShopifyIntegration($shopifyId: String!) {
  removeShopifyIntegration(shopifyId: $shopifyId) {
    ...Shopify
  }
}
    ${ShopifyFragmentDoc}`;
export const StopShopifyCustomerSyncDocument = gql`
    mutation StopShopifyCustomerSync($shopifyId: String!) {
  stopShopifyCustomerSync(shopifyId: $shopifyId) {
    ...Shopify
  }
}
    ${ShopifyFragmentDoc}`;
export const StopShopifyProductSyncDocument = gql`
    mutation StopShopifyProductSync($shopifyId: String!) {
  stopShopifyProductSync(shopifyId: $shopifyId) {
    ...Shopify
  }
}
    ${ShopifyFragmentDoc}`;
export const SyncShopifyCustomersDocument = gql`
    mutation SyncShopifyCustomers($shopifyId: String!) {
  syncShopifyCustomers(shopifyId: $shopifyId) {
    ...Shopify
  }
}
    ${ShopifyFragmentDoc}`;
export const SyncShopifyProductsDocument = gql`
    mutation SyncShopifyProducts($shopifyId: String!) {
  syncShopifyProducts(shopifyId: $shopifyId) {
    ...Shopify
  }
}
    ${ShopifyFragmentDoc}`;
export const AddSignupFormItemDocument = gql`
    mutation AddSignupFormItem($input: AddSignupFormItem!) {
  addSignupFormItem(input: $input) {
    ...SignupForm
  }
}
    ${SignupFormFragmentDoc}`;
export const CreateSignupFormDocument = gql`
    mutation CreateSignupForm($input: CreateSignupFormInput!) {
  createSignupForm(input: $input) {
    ...SignupForm
  }
}
    ${SignupFormFragmentDoc}`;
export const DeleteSignupFormDocument = gql`
    mutation DeleteSignupForm($signupFormId: String!) {
  deleteSignupForm(signupFormId: $signupFormId) {
    ...SignupForm
  }
}
    ${SignupFormFragmentDoc}`;
export const GetSignupFormDocument = gql`
    query GetSignupForm($signupFormId: String!) {
  getSignupForm(signupFormId: $signupFormId) {
    ...SignupForm
  }
}
    ${SignupFormFragmentDoc}`;
export const GetSignupFormsDocument = gql`
    query GetSignupForms($subdomain: String!) {
  getSignupForms(subdomain: $subdomain) {
    ...SignupForm
  }
}
    ${SignupFormFragmentDoc}`;
export const GetTotalFormSubmitRateDocument = gql`
    query GetTotalFormSubmitRate($subdomain: String!) {
  getTotalFormSubmitRate(subdomain: $subdomain)
}
    `;
export const GetTotalSubmittedFormDocument = gql`
    query GetTotalSubmittedForm($subdomain: String!) {
  getTotalSubmittedForm(subdomain: $subdomain)
}
    `;
export const UpdateSignupFormDocument = gql`
    mutation UpdateSignupForm($input: UpdateSignupformInput!) {
  updateSignupForm(input: $input) {
    ...SignupForm
  }
}
    ${SignupFormFragmentDoc}`;
export const CheckAbleToSendEmailToListDocument = gql`
    query CheckAbleToSendEmailToList($listId: String!, $subdomain: String!) {
  checkAbleToSendEmailToList(listId: $listId, subdomain: $subdomain)
}
    `;
export const CheckUserOrboardedDocument = gql`
    query CheckUserOrboarded {
  checkUserOnboarded
}
    `;
export const CreateCheckoutSessionUrlDocument = gql`
    mutation CreateCheckoutSessionUrl($subdomain: String!, $contactQuantity: Int!) {
  createCheckoutSessionUrl(
    subdomain: $subdomain
    contactQuantity: $contactQuantity
  )
}
    `;
export const CreateShopifyAppSubscriptionDocument = gql`
    mutation CreateShopifyAppSubscription($input: CreateShopifyAppSubscriptionInput!) {
  createShopifyAppSubscription(input: $input)
}
    `;
export const GetAllStoresForSiteMapDocument = gql`
    query GetAllStoresForSiteMap {
  getAllStoresForSiteMap {
    ...Store
  }
}
    ${StoreFragmentDoc}`;
export const GetBenchmarkDataDocument = gql`
    query GetBenchmarkData($subdomain: String!) {
  getBenchmarkData(subdomain: $subdomain) {
    id
    opened
    clicked
    delivered
    contact
  }
}
    `;
export const GetCustomerPortalSessionDocument = gql`
    query GetCustomerPortalSession($subdomain: String!) {
  getCustomerPortalSession(subdomain: $subdomain)
}
    `;
export const GetStoreCreditsDocument = gql`
    query GetStoreCredits($subdomain: String!) {
  getStoreCredits(subdomain: $subdomain)
}
    `;
export const GetStoreDailyRevenueTrendDocument = gql`
    query GetStoreDailyRevenueTrend($subdomain: String!) {
  getStoreDailyRevenueTrend(subdomain: $subdomain)
}
    `;
export const GetStoreEmailMetricDocument = gql`
    query GetStoreEmailMetric($subdomain: String!) {
  getStoreEmailMetric(subdomain: $subdomain) {
    contact
    delivered
    opened
    clicked
    openedTrend
    clickedTrend
    deliveredTrend
  }
}
    `;
export const GetStoreRevenueDocument = gql`
    query GetStoreRevenue($subdomain: String!) {
  getStoreRevenue(subdomain: $subdomain)
}
    `;
export const GetUserStoreDocument = gql`
    query GetUserStore {
  getUserStore {
    ...Store
  }
}
    ${StoreFragmentDoc}`;
export const GetStoreWithSubdomainDocument = gql`
    query GetStoreWithSubdomain($subdomain: String!) {
  getStoreWithSubdomain(subdomain: $subdomain) {
    ...Store
  }
}
    ${StoreFragmentDoc}`;
export const ShopifyAppSubscriptionCancleDocument = gql`
    mutation ShopifyAppSubscriptionCancle($subdomain: String!) {
  shopifyAppSubscriptionCancel(subdomain: $subdomain)
}
    `;
export const SubdomainAvailableDocument = gql`
    query subdomainAvailable($subdomain: String!) {
  subdomainAvailable(subdomain: $subdomain)
}
    `;
export const SubscribeToStoreDocument = gql`
    mutation SubscribeToStore($storeId: String!, $email: String!) {
  subscribeToStore(storeId: $storeId, email: $email)
}
    `;
export const UpdateDefaultListIdToCollectEmailDocument = gql`
    mutation UpdateDefaultListIdToCollectEmail($storeId: String!, $listId: String!) {
  updateDefaultListIdToCollectEmail(storeId: $storeId, listId: $listId) {
    ...Store
  }
}
    ${StoreFragmentDoc}`;
export const UpdateDisplayPictureDocument = gql`
    mutation UpdateDisplayPicture($input: UpdateDisplayPictureInput!) {
  updateDisplayPicture(input: $input) {
    ...Store
  }
}
    ${StoreFragmentDoc}`;
export const UpdateStoreCurrencyDocument = gql`
    mutation UpdateStoreCurrency($currency: StoreCurrency!, $storeId: String!) {
  updateStoreCurrency(currency: $currency, storeId: $storeId) {
    ...Store
  }
}
    ${StoreFragmentDoc}`;
export const UpdateStoreDetailsDocument = gql`
    mutation UpdateStoreDetails($input: UpdateStoreDetailsInput!) {
  updateStoreDetails(input: $input) {
    ...Store
  }
}
    ${StoreFragmentDoc}`;
export const GetCurrentStoreChallengeByQuestTypeDocument = gql`
    query GetCurrentStoreChallengeByQuestType($subdomain: String!, $questType: QuestType!) {
  getCurrentStoreChallengesByQuestType(
    subdomain: $subdomain
    questType: $questType
  ) {
    ...StoreChallenge
  }
}
    ${StoreChallengeFragmentDoc}`;
export const GetEmailTemplatesDocument = gql`
    query GetEmailTemplates($subdomain: String!) {
  getEmailTemplates(subdomain: $subdomain) {
    ...StoreItem
    item {
      ...Item
    }
  }
}
    ${StoreItemFragmentDoc}
${ItemFragmentDoc}`;
export const GetFolderItemsDocument = gql`
    query GetFolderItems($subdomain: String!) {
  getFolderItems(subdomain: $subdomain) {
    ...StoreItem
    item {
      ...Item
    }
  }
}
    ${StoreItemFragmentDoc}
${ItemFragmentDoc}`;
export const AddCommaSeperatedEmailsToListDocument = gql`
    mutation AddCommaSeperatedEmailsToList($input: AddCommaSeperatedEmailsToListInput!) {
  addCommaSeperatedEmailsToList(input: $input)
}
    `;
export const GetAllListsOfASubscriberDocument = gql`
    query GetAllListsOfASubscriber($unsubscriberId: String!) {
  getAllListsOfASubscriber(unsubscriberId: $unsubscriberId) {
    ...SubscriberList
    list {
      ...List
    }
    subscriber {
      emailStatus
    }
  }
}
    ${SubscriberListFragmentDoc}
${ListFragmentDoc}`;
export const GetSubscriberListsDocument = gql`
    query GetSubscriberLists($listId: String!, $skip: Int!, $take: Int!) {
  getSubscriberLists(listId: $listId, skip: $skip, take: $take) {
    ...SubscriberList
  }
}
    ${SubscriberListFragmentDoc}`;
export const GetSubscribersInListCountDocument = gql`
    query GetSubscribersInListCount($listId: String!) {
  getSubscribersInListCount(listId: $listId)
}
    `;
export const RemoveSubscriberFromListDocument = gql`
    mutation RemoveSubscriberFromList($listId: String!, $subscriberId: String!) {
  removeSubscriberFromList(listId: $listId, subscriberId: $subscriberId) {
    ...SubscriberList
  }
}
    ${SubscriberListFragmentDoc}`;
export const UnsubscribeFromListDocument = gql`
    mutation UnsubscribeFromList($listId: String!, $unsubscribeId: String!) {
  unsubscribeFromList(listId: $listId, unsubscribeId: $unsubscribeId) {
    ...SubscriberList
  }
}
    ${SubscriberListFragmentDoc}`;
export const GetSubscriberDocument = gql`
    query GetSubscriber($subscriberId: String!) {
  getSubscriber(subscriberId: $subscriberId) {
    ...Subscriber
  }
}
    ${SubscriberFragmentDoc}`;
export const GetSubscriberCountAddedTodayDocument = gql`
    query GetSubscriberCountAddedToday($subdomain: String!) {
  getSubscriberCountAddedToday(subdomain: $subdomain)
}
    `;
export const GetSubscribersDocument = gql`
    query GetSubscribers($subdomain: String!, $skip: Int!, $take: Int!) {
  getSubscribers(subdomain: $subdomain, skip: $skip, take: $take) {
    ...Subscriber
  }
}
    ${SubscriberFragmentDoc}`;
export const GetSubscribersCountDocument = gql`
    query GetSubscribersCount($subdomain: String!) {
  getSubscribersCount(subdomain: $subdomain)
}
    `;
export const ResubscribeToListDocument = gql`
    mutation ResubscribeToList($listId: String!, $unsubscribeId: String!) {
  resubscribeToList(listId: $listId, unsubscribeId: $unsubscribeId) {
    ...Subscriber
  }
}
    ${SubscriberFragmentDoc}`;
export const SearchSubscribersDocument = gql`
    query SearchSubscribers($searchString: String!, $subdomain: String!) {
  searchSubscribers(searchString: $searchString, subdomain: $subdomain) {
    ...Subscriber
  }
}
    ${SubscriberFragmentDoc}`;
export const UnsubscribeFromAllListDocument = gql`
    mutation UnsubscribeFromAllList($unsubscribeId: String!) {
  unsubscribeFromAllList(unsubscribeId: $unsubscribeId) {
    ...Subscriber
  }
}
    ${SubscriberFragmentDoc}`;
export const CompleteOnboardingDocument = gql`
    mutation CompleteOnboarding($input: CompleteOnboardingInput!) {
  completeOnboarding(input: $input) {
    ...Store
  }
}
    ${StoreFragmentDoc}`;
export const ConfirmCodeAndLoginDocument = gql`
    mutation ConfirmCodeAndLogin($loginCode: String!) {
  confirmCodeAndLogin(loginCode: $loginCode)
}
    `;
export const EmailLoginDocument = gql`
    mutation EmailLogin($input: EmailLoginInput!) {
  emailLogin(input: $input) {
    ...User
    store {
      ...Store
    }
  }
}
    ${UserFragmentDoc}
${StoreFragmentDoc}`;
export const GetUserExistByEmailDocument = gql`
    query getUserExistByEmail($email: String!) {
  getUserExistByEmail(email: $email)
}
    `;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export const MeDocument = gql`
    query Me {
  me {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const SignupWithEmailDocument = gql`
    mutation SignupWithEmail($input: CreateUserWithEmailInput!) {
  signupWithEmail(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export const UploadCsvFileEmailsToListDocument = gql`
    mutation UploadCsvFileEmailsToList($input: UploadCsvFileEmailsToListInput!) {
  uploadCsvFileEmailsToList(input: $input)
}
    `;
export const CreateConditionalSplitNodeDocument = gql`
    mutation createConditionalSplitNode($input: CreateConditionalSplitNodeInput!) {
  createConditionalSplitNode(input: $input) {
    ...WorkflowState
  }
}
    ${WorkflowStateFragmentDoc}`;
export const CreateListTriggerDocument = gql`
    mutation CreateListTrigger($listId: String!, $workflowId: String!) {
  createListTrigger(listId: $listId, workflowId: $workflowId) {
    ...WorkflowState
  }
}
    ${WorkflowStateFragmentDoc}`;
export const CreateMetricTriggerDocument = gql`
    mutation CreateMetricTrigger($metricType: MetricType!, $workflowId: String!) {
  createMetricTrigger(metricType: $metricType, workflowId: $workflowId) {
    ...WorkflowState
  }
}
    ${WorkflowStateFragmentDoc}`;
export const CreateSendEmailNodeDocument = gql`
    mutation CreateSendEmailNode($input: CreateSendEmailNodeInput!) {
  createSendEmailNode(input: $input) {
    ...WorkflowState
  }
}
    ${WorkflowStateFragmentDoc}`;
export const CreateTriggerSplitNodeDocument = gql`
    mutation createTriggerSplitNode($input: CreateTriggerSplitNodeInput!) {
  createTriggerSplitNode(input: $input) {
    ...WorkflowState
  }
}
    ${WorkflowStateFragmentDoc}`;
export const DeleteWorkflowTransitionDocument = gql`
    mutation DeleteWorkflowTransition($workflowId: String!, $workflowTransitionId: String!) {
  deleteWorkflowTransition(
    workflowId: $workflowId
    workflowTransitionId: $workflowTransitionId
  ) {
    ...WorkflowState
  }
}
    ${WorkflowStateFragmentDoc}`;
export const UpdateListTriggerDocument = gql`
    mutation UpdateListTrigger($listId: String!, $workflowStateId: String!) {
  updateListTrigger(listId: $listId, workflowStateId: $workflowStateId) {
    ...WorkflowState
  }
}
    ${WorkflowStateFragmentDoc}`;
export const UpdateConditionalSplitStateDocument = gql`
    mutation UpdateConditionalSplitState($input: UpdateConditionalSplitStateInput!) {
  updateConditionalSplitState(input: $input) {
    ...WorkflowState
  }
}
    ${WorkflowStateFragmentDoc}`;
export const UpdateDelayStateDocument = gql`
    mutation UpdateDelayState($input: UpdateDelayStateInput!) {
  updateDelayState(input: $input) {
    ...WorkflowState
  }
}
    ${WorkflowStateFragmentDoc}`;
export const UpdateMetricTriggerDocument = gql`
    mutation UpdateMetricTrigger($metricType: MetricType!, $workflowStateId: String!) {
  updateMetricTrigger(metricType: $metricType, workflowStateId: $workflowStateId) {
    ...WorkflowState
  }
}
    ${WorkflowStateFragmentDoc}`;
export const UpdateSendEmailStateDocument = gql`
    mutation UpdateSendEmailState($input: UpdateSendEmailStateInput!) {
  updateSendEmailState(input: $input) {
    ...WorkflowState
  }
}
    ${WorkflowStateFragmentDoc}`;
export const UpdateTriggerSplitStateDocument = gql`
    mutation UpdateTriggerSplitState($input: UpdateTriggerSplitStateInput!) {
  updateTriggerSplitState(input: $input) {
    ...WorkflowState
  }
}
    ${WorkflowStateFragmentDoc}`;
export const ConvertWorkflowToPublicDocument = gql`
    mutation ConvertWorkflowToPublic($workflowId: String!) {
  convertWorkflowToPublic(workflowId: $workflowId) {
    ...Workflow
  }
}
    ${WorkflowFragmentDoc}`;
export const CreateNewDelayNodeDocument = gql`
    mutation CreateNewDelayNode($input: CreateNewDelayNodeInput!) {
  createNewDelayNode(input: $input) {
    ...Workflow
  }
}
    ${WorkflowFragmentDoc}`;
export const CreateNodeConnectionDocument = gql`
    mutation CreateNodeConnection($workflowId: String!, $sourceId: String!, $targetId: String!, $otherWise: Boolean!) {
  createNodeConnection(
    workflowId: $workflowId
    sourceId: $sourceId
    targetId: $targetId
    otherWise: $otherWise
  ) {
    ...Workflow
  }
}
    ${WorkflowFragmentDoc}`;
export const CreateWorkflowDocument = gql`
    mutation CreateWorkflow($storeId: String!) {
  createWorkflow(storeId: $storeId) {
    ...Workflow
  }
}
    ${WorkflowFragmentDoc}`;
export const DeleteWorkflowDocument = gql`
    mutation DeleteWorkflow($workflowId: String!) {
  deleteWorkflow(workflowId: $workflowId) {
    ...Workflow
  }
}
    ${WorkflowFragmentDoc}`;
export const DeleteWorkflowNodeDocument = gql`
    mutation DeleteWorkflowNode($workflowStateId: String!) {
  deleteWorkflowNode(workflowStateId: $workflowStateId) {
    ...Workflow
  }
}
    ${WorkflowFragmentDoc}`;
export const GetPublicWorkflowsDocument = gql`
    query GetPublicWorkflows($take: Int!, $skip: Int!) {
  getPublicWorkflows(take: $take, skip: $skip) {
    ...Workflow
    store {
      name
      id
    }
  }
}
    ${WorkflowFragmentDoc}`;
export const GetWorkflowDocument = gql`
    query getWorkflow($workflowId: String!) {
  getWorkflow(workflowId: $workflowId) {
    ...Workflow
  }
}
    ${WorkflowFragmentDoc}`;
export const GetWorkflowCountDocument = gql`
    query GetWorkflowCount($subdomain: String!) {
  getWorkflowCount(subdomain: $subdomain)
}
    `;
export const GetWorkflowsDocument = gql`
    query getWorkflows($subdomain: String!) {
  getWorkflows(subdomain: $subdomain) {
    ...Workflow
  }
}
    ${WorkflowFragmentDoc}`;
export const ReplicateWorkflowDocument = gql`
    mutation ReplicateWorkflow($storeId: String!, $replicaWorkflowId: String!) {
  replicateWorkflow(storeId: $storeId, replicaWorkflowId: $replicaWorkflowId) {
    ...Workflow
  }
}
    ${WorkflowFragmentDoc}`;
export const TurnOffWorkflowDocument = gql`
    mutation TurnOffWorkflow($workflowId: String!) {
  turnOffWorkflow(workflowId: $workflowId) {
    ...Workflow
  }
}
    ${WorkflowFragmentDoc}`;
export const TurnOnWorkflowDocument = gql`
    mutation TurnOnWorkflow($workflowId: String!) {
  turnOnWorkflow(workflowId: $workflowId) {
    ...Workflow
  }
}
    ${WorkflowFragmentDoc}`;
export const UpdateWorkflowDescriptionDocument = gql`
    mutation UpdateWorkflowDescription($workflowId: String!, $descriptionHTML: String!, $descriptionLexical: String!) {
  updateWorkflowDescription(
    workflowId: $workflowId
    descriptionLexical: $descriptionLexical
    descriptionHTML: $descriptionHTML
  ) {
    ...Workflow
  }
}
    ${WorkflowFragmentDoc}`;
export const UpdateFlowFilterDocument = gql`
    mutation UpdateFlowFilter($input: UpdateFlowFilterInput!) {
  updateFlowFilter(input: $input) {
    ...Workflow
  }
}
    ${WorkflowFragmentDoc}`;
export const UpdateTriggerFilterDocument = gql`
    mutation UpdateTriggerFilter($input: UpdateTriggerFilterInput!) {
  updateTriggerFilter(input: $input) {
    ...Workflow
  }
}
    ${WorkflowFragmentDoc}`;
export const UpdateWorkflowNameDocument = gql`
    mutation UpdateWorkflowName($workflowId: String!, $name: String!) {
  updateWorkflowName(workflowId: $workflowId, name: $name) {
    ...Workflow
  }
}
    ${WorkflowFragmentDoc}`;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    GetAbout(variables: GetAboutQueryVariables, options?: C): Promise<GetAboutQuery> {
      return requester<GetAboutQuery, GetAboutQueryVariables>(GetAboutDocument, variables, options) as Promise<GetAboutQuery>;
    },
    UpdateAbout(variables: UpdateAboutMutationVariables, options?: C): Promise<UpdateAboutMutation> {
      return requester<UpdateAboutMutation, UpdateAboutMutationVariables>(UpdateAboutDocument, variables, options) as Promise<UpdateAboutMutation>;
    },
    UpdateIndustry(variables: UpdateIndustryMutationVariables, options?: C): Promise<UpdateIndustryMutation> {
      return requester<UpdateIndustryMutation, UpdateIndustryMutationVariables>(UpdateIndustryDocument, variables, options) as Promise<UpdateIndustryMutation>;
    },
    GetStoreBilling(variables: GetStoreBillingQueryVariables, options?: C): Promise<GetStoreBillingQuery> {
      return requester<GetStoreBillingQuery, GetStoreBillingQueryVariables>(GetStoreBillingDocument, variables, options) as Promise<GetStoreBillingQuery>;
    },
    DismissNotification(variables: DismissNotificationMutationVariables, options?: C): Promise<DismissNotificationMutation> {
      return requester<DismissNotificationMutation, DismissNotificationMutationVariables>(DismissNotificationDocument, variables, options) as Promise<DismissNotificationMutation>;
    },
    GetNotifications(variables: GetNotificationsQueryVariables, options?: C): Promise<GetNotificationsQuery> {
      return requester<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, variables, options) as Promise<GetNotificationsQuery>;
    },
    SetAllEventsAsRead(variables?: SetAllEventsAsReadMutationVariables, options?: C): Promise<SetAllEventsAsReadMutation> {
      return requester<SetAllEventsAsReadMutation, SetAllEventsAsReadMutationVariables>(SetAllEventsAsReadDocument, variables, options) as Promise<SetAllEventsAsReadMutation>;
    },
    unReadNotificationCount(variables?: UnReadNotificationCountQueryVariables, options?: C): Promise<UnReadNotificationCountQuery> {
      return requester<UnReadNotificationCountQuery, UnReadNotificationCountQueryVariables>(UnReadNotificationCountDocument, variables, options) as Promise<UnReadNotificationCountQuery>;
    },
    GetIntegrationWithSubdomain(variables: GetIntegrationWithSubdomainQueryVariables, options?: C): Promise<GetIntegrationWithSubdomainQuery> {
      return requester<GetIntegrationWithSubdomainQuery, GetIntegrationWithSubdomainQueryVariables>(GetIntegrationWithSubdomainDocument, variables, options) as Promise<GetIntegrationWithSubdomainQuery>;
    },
    GetPathCrateItems(variables?: GetPathCrateItemsQueryVariables, options?: C): Promise<GetPathCrateItemsQuery> {
      return requester<GetPathCrateItemsQuery, GetPathCrateItemsQueryVariables>(GetPathCrateItemsDocument, variables, options) as Promise<GetPathCrateItemsQuery>;
    },
    CreateNewList(variables: CreateNewListMutationVariables, options?: C): Promise<CreateNewListMutation> {
      return requester<CreateNewListMutation, CreateNewListMutationVariables>(CreateNewListDocument, variables, options) as Promise<CreateNewListMutation>;
    },
    DeleteList(variables: DeleteListMutationVariables, options?: C): Promise<DeleteListMutation> {
      return requester<DeleteListMutation, DeleteListMutationVariables>(DeleteListDocument, variables, options) as Promise<DeleteListMutation>;
    },
    GetListCount(variables: GetListCountQueryVariables, options?: C): Promise<GetListCountQuery> {
      return requester<GetListCountQuery, GetListCountQueryVariables>(GetListCountDocument, variables, options) as Promise<GetListCountQuery>;
    },
    GetLists(variables: GetListsQueryVariables, options?: C): Promise<GetListsQuery> {
      return requester<GetListsQuery, GetListsQueryVariables>(GetListsDocument, variables, options) as Promise<GetListsQuery>;
    },
    GetStarredLists(variables: GetStarredListsQueryVariables, options?: C): Promise<GetStarredListsQuery> {
      return requester<GetStarredListsQuery, GetStarredListsQueryVariables>(GetStarredListsDocument, variables, options) as Promise<GetStarredListsQuery>;
    },
    ToggleListStar(variables: ToggleListStarMutationVariables, options?: C): Promise<ToggleListStarMutation> {
      return requester<ToggleListStarMutation, ToggleListStarMutationVariables>(ToggleListStarDocument, variables, options) as Promise<ToggleListStarMutation>;
    },
    GetEmailLinkClickedCount(variables: GetEmailLinkClickedCountQueryVariables, options?: C): Promise<GetEmailLinkClickedCountQuery> {
      return requester<GetEmailLinkClickedCountQuery, GetEmailLinkClickedCountQueryVariables>(GetEmailLinkClickedCountDocument, variables, options) as Promise<GetEmailLinkClickedCountQuery>;
    },
    GetEmailOpenedCount(variables: GetEmailOpenedCountQueryVariables, options?: C): Promise<GetEmailOpenedCountQuery> {
      return requester<GetEmailOpenedCountQuery, GetEmailOpenedCountQueryVariables>(GetEmailOpenedCountDocument, variables, options) as Promise<GetEmailOpenedCountQuery>;
    },
    GetEmailReceivedCount(variables: GetEmailReceivedCountQueryVariables, options?: C): Promise<GetEmailReceivedCountQuery> {
      return requester<GetEmailReceivedCountQuery, GetEmailReceivedCountQueryVariables>(GetEmailReceivedCountDocument, variables, options) as Promise<GetEmailReceivedCountQuery>;
    },
    GetEmailSentThisMonthCount(variables: GetEmailSentThisMonthCountQueryVariables, options?: C): Promise<GetEmailSentThisMonthCountQuery> {
      return requester<GetEmailSentThisMonthCountQuery, GetEmailSentThisMonthCountQueryVariables>(GetEmailSentThisMonthCountDocument, variables, options) as Promise<GetEmailSentThisMonthCountQuery>;
    },
    GetEmailSentTodayCount(variables: GetEmailSentTodayCountQueryVariables, options?: C): Promise<GetEmailSentTodayCountQuery> {
      return requester<GetEmailSentTodayCountQuery, GetEmailSentTodayCountQueryVariables>(GetEmailSentTodayCountDocument, variables, options) as Promise<GetEmailSentTodayCountQuery>;
    },
    GetFulfilledOrderCount(variables: GetFulfilledOrderCountQueryVariables, options?: C): Promise<GetFulfilledOrderCountQuery> {
      return requester<GetFulfilledOrderCountQuery, GetFulfilledOrderCountQueryVariables>(GetFulfilledOrderCountDocument, variables, options) as Promise<GetFulfilledOrderCountQuery>;
    },
    GetMetricsByType(variables: GetMetricsByTypeQueryVariables, options?: C): Promise<GetMetricsByTypeQuery> {
      return requester<GetMetricsByTypeQuery, GetMetricsByTypeQueryVariables>(GetMetricsByTypeDocument, variables, options) as Promise<GetMetricsByTypeQuery>;
    },
    GetPlacedOrderCount(variables: GetPlacedOrderCountQueryVariables, options?: C): Promise<GetPlacedOrderCountQuery> {
      return requester<GetPlacedOrderCountQuery, GetPlacedOrderCountQueryVariables>(GetPlacedOrderCountDocument, variables, options) as Promise<GetPlacedOrderCountQuery>;
    },
    GetSubscriberMetrics(variables: GetSubscriberMetricsQueryVariables, options?: C): Promise<GetSubscriberMetricsQuery> {
      return requester<GetSubscriberMetricsQuery, GetSubscriberMetricsQueryVariables>(GetSubscriberMetricsDocument, variables, options) as Promise<GetSubscriberMetricsQuery>;
    },
    GetSubscriberRevenue(variables: GetSubscriberRevenueQueryVariables, options?: C): Promise<GetSubscriberRevenueQuery> {
      return requester<GetSubscriberRevenueQuery, GetSubscriberRevenueQueryVariables>(GetSubscriberRevenueDocument, variables, options) as Promise<GetSubscriberRevenueQuery>;
    },
    GetNotification(variables: GetNotificationQueryVariables, options?: C): Promise<GetNotificationQuery> {
      return requester<GetNotificationQuery, GetNotificationQueryVariables>(GetNotificationDocument, variables, options) as Promise<GetNotificationQuery>;
    },
    NewSubscriberNotificationToggle(variables: NewSubscriberNotificationToggleMutationVariables, options?: C): Promise<NewSubscriberNotificationToggleMutation> {
      return requester<NewSubscriberNotificationToggleMutation, NewSubscriberNotificationToggleMutationVariables>(NewSubscriberNotificationToggleDocument, variables, options) as Promise<NewSubscriberNotificationToggleMutation>;
    },
    CheckPostHandleAvailable(variables: CheckPostHandleAvailableMutationVariables, options?: C): Promise<CheckPostHandleAvailableMutation> {
      return requester<CheckPostHandleAvailableMutation, CheckPostHandleAvailableMutationVariables>(CheckPostHandleAvailableDocument, variables, options) as Promise<CheckPostHandleAvailableMutation>;
    },
    CreatePost(variables: CreatePostMutationVariables, options?: C): Promise<CreatePostMutation> {
      return requester<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, variables, options) as Promise<CreatePostMutation>;
    },
    CreatePostViewed(variables: CreatePostViewedMutationVariables, options?: C): Promise<CreatePostViewedMutation> {
      return requester<CreatePostViewedMutation, CreatePostViewedMutationVariables>(CreatePostViewedDocument, variables, options) as Promise<CreatePostViewedMutation>;
    },
    DeletePost(variables: DeletePostMutationVariables, options?: C): Promise<DeletePostMutation> {
      return requester<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, variables, options) as Promise<DeletePostMutation>;
    },
    GetAllPublishedPostForSiteMap(variables?: GetAllPublishedPostForSiteMapQueryVariables, options?: C): Promise<GetAllPublishedPostForSiteMapQuery> {
      return requester<GetAllPublishedPostForSiteMapQuery, GetAllPublishedPostForSiteMapQueryVariables>(GetAllPublishedPostForSiteMapDocument, variables, options) as Promise<GetAllPublishedPostForSiteMapQuery>;
    },
    GetDraftPosts(variables: GetDraftPostsQueryVariables, options?: C): Promise<GetDraftPostsQuery> {
      return requester<GetDraftPostsQuery, GetDraftPostsQueryVariables>(GetDraftPostsDocument, variables, options) as Promise<GetDraftPostsQuery>;
    },
    GetMorePosts(variables: GetMorePostsQueryVariables, options?: C): Promise<GetMorePostsQuery> {
      return requester<GetMorePostsQuery, GetMorePostsQueryVariables>(GetMorePostsDocument, variables, options) as Promise<GetMorePostsQuery>;
    },
    GetPost(variables: GetPostQueryVariables, options?: C): Promise<GetPostQuery> {
      return requester<GetPostQuery, GetPostQueryVariables>(GetPostDocument, variables, options) as Promise<GetPostQuery>;
    },
    GetPostByHandle(variables: GetPostByHandleQueryVariables, options?: C): Promise<GetPostByHandleQuery> {
      return requester<GetPostByHandleQuery, GetPostByHandleQueryVariables>(GetPostByHandleDocument, variables, options) as Promise<GetPostByHandleQuery>;
    },
    GetPostCount(variables: GetPostCountQueryVariables, options?: C): Promise<GetPostCountQuery> {
      return requester<GetPostCountQuery, GetPostCountQueryVariables>(GetPostCountDocument, variables, options) as Promise<GetPostCountQuery>;
    },
    GetPosts(variables: GetPostsQueryVariables, options?: C): Promise<GetPostsQuery> {
      return requester<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, variables, options) as Promise<GetPostsQuery>;
    },
    PublishPostHere(variables: PublishPostHereMutationVariables, options?: C): Promise<PublishPostHereMutation> {
      return requester<PublishPostHereMutation, PublishPostHereMutationVariables>(PublishPostHereDocument, variables, options) as Promise<PublishPostHereMutation>;
    },
    PublishPostToList(variables: PublishPostToListMutationVariables, options?: C): Promise<PublishPostToListMutation> {
      return requester<PublishPostToListMutation, PublishPostToListMutationVariables>(PublishPostToListDocument, variables, options) as Promise<PublishPostToListMutation>;
    },
    UnpublishPost(variables: UnpublishPostMutationVariables, options?: C): Promise<UnpublishPostMutation> {
      return requester<UnpublishPostMutation, UnpublishPostMutationVariables>(UnpublishPostDocument, variables, options) as Promise<UnpublishPostMutation>;
    },
    UpdatePost(variables: UpdatePostMutationVariables, options?: C): Promise<UpdatePostMutation> {
      return requester<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, variables, options) as Promise<UpdatePostMutation>;
    },
    AddMoreProductImages(variables: AddMoreProductImagesMutationVariables, options?: C): Promise<AddMoreProductImagesMutation> {
      return requester<AddMoreProductImagesMutation, AddMoreProductImagesMutationVariables>(AddMoreProductImagesDocument, variables, options) as Promise<AddMoreProductImagesMutation>;
    },
    CreateProduct(variables: CreateProductMutationVariables, options?: C): Promise<CreateProductMutation> {
      return requester<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, variables, options) as Promise<CreateProductMutation>;
    },
    DeleteProduct(variables: DeleteProductMutationVariables, options?: C): Promise<DeleteProductMutation> {
      return requester<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, variables, options) as Promise<DeleteProductMutation>;
    },
    DeleteProductImage(variables: DeleteProductImageMutationVariables, options?: C): Promise<DeleteProductImageMutation> {
      return requester<DeleteProductImageMutation, DeleteProductImageMutationVariables>(DeleteProductImageDocument, variables, options) as Promise<DeleteProductImageMutation>;
    },
    GetProduct(variables: GetProductQueryVariables, options?: C): Promise<GetProductQuery> {
      return requester<GetProductQuery, GetProductQueryVariables>(GetProductDocument, variables, options) as Promise<GetProductQuery>;
    },
    GetProductCount(variables: GetProductCountQueryVariables, options?: C): Promise<GetProductCountQuery> {
      return requester<GetProductCountQuery, GetProductCountQueryVariables>(GetProductCountDocument, variables, options) as Promise<GetProductCountQuery>;
    },
    GetProducts(variables: GetProductsQueryVariables, options?: C): Promise<GetProductsQuery> {
      return requester<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, variables, options) as Promise<GetProductsQuery>;
    },
    ToggleProductHidden(variables: ToggleProductHiddenMutationVariables, options?: C): Promise<ToggleProductHiddenMutation> {
      return requester<ToggleProductHiddenMutation, ToggleProductHiddenMutationVariables>(ToggleProductHiddenDocument, variables, options) as Promise<ToggleProductHiddenMutation>;
    },
    UpdateProductDetials(variables: UpdateProductDetialsMutationVariables, options?: C): Promise<UpdateProductDetialsMutation> {
      return requester<UpdateProductDetialsMutation, UpdateProductDetialsMutationVariables>(UpdateProductDetialsDocument, variables, options) as Promise<UpdateProductDetialsMutation>;
    },
    CreateProductPost(variables: CreateProductPostMutationVariables, options?: C): Promise<CreateProductPostMutation> {
      return requester<CreateProductPostMutation, CreateProductPostMutationVariables>(CreateProductPostDocument, variables, options) as Promise<CreateProductPostMutation>;
    },
    DeleteProductPost(variables: DeleteProductPostMutationVariables, options?: C): Promise<DeleteProductPostMutation> {
      return requester<DeleteProductPostMutation, DeleteProductPostMutationVariables>(DeleteProductPostDocument, variables, options) as Promise<DeleteProductPostMutation>;
    },
    HasProductPost(variables: HasProductPostQueryVariables, options?: C): Promise<HasProductPostQuery> {
      return requester<HasProductPostQuery, HasProductPostQueryVariables>(HasProductPostDocument, variables, options) as Promise<HasProductPostQuery>;
    },
    GetMandatoryQuest(variables: GetMandatoryQuestQueryVariables, options?: C): Promise<GetMandatoryQuestQuery> {
      return requester<GetMandatoryQuestQuery, GetMandatoryQuestQueryVariables>(GetMandatoryQuestDocument, variables, options) as Promise<GetMandatoryQuestQuery>;
    },
    CollectEmailSubscribers(variables: CollectEmailSubscribersMutationVariables, options?: C): Promise<CollectEmailSubscribersMutation> {
      return requester<CollectEmailSubscribersMutation, CollectEmailSubscribersMutationVariables>(CollectEmailSubscribersDocument, variables, options) as Promise<CollectEmailSubscribersMutation>;
    },
    RemoveCollectEmailSubscribers(variables: RemoveCollectEmailSubscribersMutationVariables, options?: C): Promise<RemoveCollectEmailSubscribersMutation> {
      return requester<RemoveCollectEmailSubscribersMutation, RemoveCollectEmailSubscribersMutationVariables>(RemoveCollectEmailSubscribersDocument, variables, options) as Promise<RemoveCollectEmailSubscribersMutation>;
    },
    RemoveShopifyIntegration(variables: RemoveShopifyIntegrationMutationVariables, options?: C): Promise<RemoveShopifyIntegrationMutation> {
      return requester<RemoveShopifyIntegrationMutation, RemoveShopifyIntegrationMutationVariables>(RemoveShopifyIntegrationDocument, variables, options) as Promise<RemoveShopifyIntegrationMutation>;
    },
    StopShopifyCustomerSync(variables: StopShopifyCustomerSyncMutationVariables, options?: C): Promise<StopShopifyCustomerSyncMutation> {
      return requester<StopShopifyCustomerSyncMutation, StopShopifyCustomerSyncMutationVariables>(StopShopifyCustomerSyncDocument, variables, options) as Promise<StopShopifyCustomerSyncMutation>;
    },
    StopShopifyProductSync(variables: StopShopifyProductSyncMutationVariables, options?: C): Promise<StopShopifyProductSyncMutation> {
      return requester<StopShopifyProductSyncMutation, StopShopifyProductSyncMutationVariables>(StopShopifyProductSyncDocument, variables, options) as Promise<StopShopifyProductSyncMutation>;
    },
    SyncShopifyCustomers(variables: SyncShopifyCustomersMutationVariables, options?: C): Promise<SyncShopifyCustomersMutation> {
      return requester<SyncShopifyCustomersMutation, SyncShopifyCustomersMutationVariables>(SyncShopifyCustomersDocument, variables, options) as Promise<SyncShopifyCustomersMutation>;
    },
    SyncShopifyProducts(variables: SyncShopifyProductsMutationVariables, options?: C): Promise<SyncShopifyProductsMutation> {
      return requester<SyncShopifyProductsMutation, SyncShopifyProductsMutationVariables>(SyncShopifyProductsDocument, variables, options) as Promise<SyncShopifyProductsMutation>;
    },
    AddSignupFormItem(variables: AddSignupFormItemMutationVariables, options?: C): Promise<AddSignupFormItemMutation> {
      return requester<AddSignupFormItemMutation, AddSignupFormItemMutationVariables>(AddSignupFormItemDocument, variables, options) as Promise<AddSignupFormItemMutation>;
    },
    CreateSignupForm(variables: CreateSignupFormMutationVariables, options?: C): Promise<CreateSignupFormMutation> {
      return requester<CreateSignupFormMutation, CreateSignupFormMutationVariables>(CreateSignupFormDocument, variables, options) as Promise<CreateSignupFormMutation>;
    },
    DeleteSignupForm(variables: DeleteSignupFormMutationVariables, options?: C): Promise<DeleteSignupFormMutation> {
      return requester<DeleteSignupFormMutation, DeleteSignupFormMutationVariables>(DeleteSignupFormDocument, variables, options) as Promise<DeleteSignupFormMutation>;
    },
    GetSignupForm(variables: GetSignupFormQueryVariables, options?: C): Promise<GetSignupFormQuery> {
      return requester<GetSignupFormQuery, GetSignupFormQueryVariables>(GetSignupFormDocument, variables, options) as Promise<GetSignupFormQuery>;
    },
    GetSignupForms(variables: GetSignupFormsQueryVariables, options?: C): Promise<GetSignupFormsQuery> {
      return requester<GetSignupFormsQuery, GetSignupFormsQueryVariables>(GetSignupFormsDocument, variables, options) as Promise<GetSignupFormsQuery>;
    },
    GetTotalFormSubmitRate(variables: GetTotalFormSubmitRateQueryVariables, options?: C): Promise<GetTotalFormSubmitRateQuery> {
      return requester<GetTotalFormSubmitRateQuery, GetTotalFormSubmitRateQueryVariables>(GetTotalFormSubmitRateDocument, variables, options) as Promise<GetTotalFormSubmitRateQuery>;
    },
    GetTotalSubmittedForm(variables: GetTotalSubmittedFormQueryVariables, options?: C): Promise<GetTotalSubmittedFormQuery> {
      return requester<GetTotalSubmittedFormQuery, GetTotalSubmittedFormQueryVariables>(GetTotalSubmittedFormDocument, variables, options) as Promise<GetTotalSubmittedFormQuery>;
    },
    UpdateSignupForm(variables: UpdateSignupFormMutationVariables, options?: C): Promise<UpdateSignupFormMutation> {
      return requester<UpdateSignupFormMutation, UpdateSignupFormMutationVariables>(UpdateSignupFormDocument, variables, options) as Promise<UpdateSignupFormMutation>;
    },
    CheckAbleToSendEmailToList(variables: CheckAbleToSendEmailToListQueryVariables, options?: C): Promise<CheckAbleToSendEmailToListQuery> {
      return requester<CheckAbleToSendEmailToListQuery, CheckAbleToSendEmailToListQueryVariables>(CheckAbleToSendEmailToListDocument, variables, options) as Promise<CheckAbleToSendEmailToListQuery>;
    },
    CheckUserOrboarded(variables?: CheckUserOrboardedQueryVariables, options?: C): Promise<CheckUserOrboardedQuery> {
      return requester<CheckUserOrboardedQuery, CheckUserOrboardedQueryVariables>(CheckUserOrboardedDocument, variables, options) as Promise<CheckUserOrboardedQuery>;
    },
    CreateCheckoutSessionUrl(variables: CreateCheckoutSessionUrlMutationVariables, options?: C): Promise<CreateCheckoutSessionUrlMutation> {
      return requester<CreateCheckoutSessionUrlMutation, CreateCheckoutSessionUrlMutationVariables>(CreateCheckoutSessionUrlDocument, variables, options) as Promise<CreateCheckoutSessionUrlMutation>;
    },
    CreateShopifyAppSubscription(variables: CreateShopifyAppSubscriptionMutationVariables, options?: C): Promise<CreateShopifyAppSubscriptionMutation> {
      return requester<CreateShopifyAppSubscriptionMutation, CreateShopifyAppSubscriptionMutationVariables>(CreateShopifyAppSubscriptionDocument, variables, options) as Promise<CreateShopifyAppSubscriptionMutation>;
    },
    GetAllStoresForSiteMap(variables?: GetAllStoresForSiteMapQueryVariables, options?: C): Promise<GetAllStoresForSiteMapQuery> {
      return requester<GetAllStoresForSiteMapQuery, GetAllStoresForSiteMapQueryVariables>(GetAllStoresForSiteMapDocument, variables, options) as Promise<GetAllStoresForSiteMapQuery>;
    },
    GetBenchmarkData(variables: GetBenchmarkDataQueryVariables, options?: C): Promise<GetBenchmarkDataQuery> {
      return requester<GetBenchmarkDataQuery, GetBenchmarkDataQueryVariables>(GetBenchmarkDataDocument, variables, options) as Promise<GetBenchmarkDataQuery>;
    },
    GetCustomerPortalSession(variables: GetCustomerPortalSessionQueryVariables, options?: C): Promise<GetCustomerPortalSessionQuery> {
      return requester<GetCustomerPortalSessionQuery, GetCustomerPortalSessionQueryVariables>(GetCustomerPortalSessionDocument, variables, options) as Promise<GetCustomerPortalSessionQuery>;
    },
    GetStoreCredits(variables: GetStoreCreditsQueryVariables, options?: C): Promise<GetStoreCreditsQuery> {
      return requester<GetStoreCreditsQuery, GetStoreCreditsQueryVariables>(GetStoreCreditsDocument, variables, options) as Promise<GetStoreCreditsQuery>;
    },
    GetStoreDailyRevenueTrend(variables: GetStoreDailyRevenueTrendQueryVariables, options?: C): Promise<GetStoreDailyRevenueTrendQuery> {
      return requester<GetStoreDailyRevenueTrendQuery, GetStoreDailyRevenueTrendQueryVariables>(GetStoreDailyRevenueTrendDocument, variables, options) as Promise<GetStoreDailyRevenueTrendQuery>;
    },
    GetStoreEmailMetric(variables: GetStoreEmailMetricQueryVariables, options?: C): Promise<GetStoreEmailMetricQuery> {
      return requester<GetStoreEmailMetricQuery, GetStoreEmailMetricQueryVariables>(GetStoreEmailMetricDocument, variables, options) as Promise<GetStoreEmailMetricQuery>;
    },
    GetStoreRevenue(variables: GetStoreRevenueQueryVariables, options?: C): Promise<GetStoreRevenueQuery> {
      return requester<GetStoreRevenueQuery, GetStoreRevenueQueryVariables>(GetStoreRevenueDocument, variables, options) as Promise<GetStoreRevenueQuery>;
    },
    GetUserStore(variables?: GetUserStoreQueryVariables, options?: C): Promise<GetUserStoreQuery> {
      return requester<GetUserStoreQuery, GetUserStoreQueryVariables>(GetUserStoreDocument, variables, options) as Promise<GetUserStoreQuery>;
    },
    GetStoreWithSubdomain(variables: GetStoreWithSubdomainQueryVariables, options?: C): Promise<GetStoreWithSubdomainQuery> {
      return requester<GetStoreWithSubdomainQuery, GetStoreWithSubdomainQueryVariables>(GetStoreWithSubdomainDocument, variables, options) as Promise<GetStoreWithSubdomainQuery>;
    },
    ShopifyAppSubscriptionCancle(variables: ShopifyAppSubscriptionCancleMutationVariables, options?: C): Promise<ShopifyAppSubscriptionCancleMutation> {
      return requester<ShopifyAppSubscriptionCancleMutation, ShopifyAppSubscriptionCancleMutationVariables>(ShopifyAppSubscriptionCancleDocument, variables, options) as Promise<ShopifyAppSubscriptionCancleMutation>;
    },
    subdomainAvailable(variables: SubdomainAvailableQueryVariables, options?: C): Promise<SubdomainAvailableQuery> {
      return requester<SubdomainAvailableQuery, SubdomainAvailableQueryVariables>(SubdomainAvailableDocument, variables, options) as Promise<SubdomainAvailableQuery>;
    },
    SubscribeToStore(variables: SubscribeToStoreMutationVariables, options?: C): Promise<SubscribeToStoreMutation> {
      return requester<SubscribeToStoreMutation, SubscribeToStoreMutationVariables>(SubscribeToStoreDocument, variables, options) as Promise<SubscribeToStoreMutation>;
    },
    UpdateDefaultListIdToCollectEmail(variables: UpdateDefaultListIdToCollectEmailMutationVariables, options?: C): Promise<UpdateDefaultListIdToCollectEmailMutation> {
      return requester<UpdateDefaultListIdToCollectEmailMutation, UpdateDefaultListIdToCollectEmailMutationVariables>(UpdateDefaultListIdToCollectEmailDocument, variables, options) as Promise<UpdateDefaultListIdToCollectEmailMutation>;
    },
    UpdateDisplayPicture(variables: UpdateDisplayPictureMutationVariables, options?: C): Promise<UpdateDisplayPictureMutation> {
      return requester<UpdateDisplayPictureMutation, UpdateDisplayPictureMutationVariables>(UpdateDisplayPictureDocument, variables, options) as Promise<UpdateDisplayPictureMutation>;
    },
    UpdateStoreCurrency(variables: UpdateStoreCurrencyMutationVariables, options?: C): Promise<UpdateStoreCurrencyMutation> {
      return requester<UpdateStoreCurrencyMutation, UpdateStoreCurrencyMutationVariables>(UpdateStoreCurrencyDocument, variables, options) as Promise<UpdateStoreCurrencyMutation>;
    },
    UpdateStoreDetails(variables: UpdateStoreDetailsMutationVariables, options?: C): Promise<UpdateStoreDetailsMutation> {
      return requester<UpdateStoreDetailsMutation, UpdateStoreDetailsMutationVariables>(UpdateStoreDetailsDocument, variables, options) as Promise<UpdateStoreDetailsMutation>;
    },
    GetCurrentStoreChallengeByQuestType(variables: GetCurrentStoreChallengeByQuestTypeQueryVariables, options?: C): Promise<GetCurrentStoreChallengeByQuestTypeQuery> {
      return requester<GetCurrentStoreChallengeByQuestTypeQuery, GetCurrentStoreChallengeByQuestTypeQueryVariables>(GetCurrentStoreChallengeByQuestTypeDocument, variables, options) as Promise<GetCurrentStoreChallengeByQuestTypeQuery>;
    },
    GetEmailTemplates(variables: GetEmailTemplatesQueryVariables, options?: C): Promise<GetEmailTemplatesQuery> {
      return requester<GetEmailTemplatesQuery, GetEmailTemplatesQueryVariables>(GetEmailTemplatesDocument, variables, options) as Promise<GetEmailTemplatesQuery>;
    },
    GetFolderItems(variables: GetFolderItemsQueryVariables, options?: C): Promise<GetFolderItemsQuery> {
      return requester<GetFolderItemsQuery, GetFolderItemsQueryVariables>(GetFolderItemsDocument, variables, options) as Promise<GetFolderItemsQuery>;
    },
    AddCommaSeperatedEmailsToList(variables: AddCommaSeperatedEmailsToListMutationVariables, options?: C): Promise<AddCommaSeperatedEmailsToListMutation> {
      return requester<AddCommaSeperatedEmailsToListMutation, AddCommaSeperatedEmailsToListMutationVariables>(AddCommaSeperatedEmailsToListDocument, variables, options) as Promise<AddCommaSeperatedEmailsToListMutation>;
    },
    GetAllListsOfASubscriber(variables: GetAllListsOfASubscriberQueryVariables, options?: C): Promise<GetAllListsOfASubscriberQuery> {
      return requester<GetAllListsOfASubscriberQuery, GetAllListsOfASubscriberQueryVariables>(GetAllListsOfASubscriberDocument, variables, options) as Promise<GetAllListsOfASubscriberQuery>;
    },
    GetSubscriberLists(variables: GetSubscriberListsQueryVariables, options?: C): Promise<GetSubscriberListsQuery> {
      return requester<GetSubscriberListsQuery, GetSubscriberListsQueryVariables>(GetSubscriberListsDocument, variables, options) as Promise<GetSubscriberListsQuery>;
    },
    GetSubscribersInListCount(variables: GetSubscribersInListCountQueryVariables, options?: C): Promise<GetSubscribersInListCountQuery> {
      return requester<GetSubscribersInListCountQuery, GetSubscribersInListCountQueryVariables>(GetSubscribersInListCountDocument, variables, options) as Promise<GetSubscribersInListCountQuery>;
    },
    RemoveSubscriberFromList(variables: RemoveSubscriberFromListMutationVariables, options?: C): Promise<RemoveSubscriberFromListMutation> {
      return requester<RemoveSubscriberFromListMutation, RemoveSubscriberFromListMutationVariables>(RemoveSubscriberFromListDocument, variables, options) as Promise<RemoveSubscriberFromListMutation>;
    },
    UnsubscribeFromList(variables: UnsubscribeFromListMutationVariables, options?: C): Promise<UnsubscribeFromListMutation> {
      return requester<UnsubscribeFromListMutation, UnsubscribeFromListMutationVariables>(UnsubscribeFromListDocument, variables, options) as Promise<UnsubscribeFromListMutation>;
    },
    GetSubscriber(variables: GetSubscriberQueryVariables, options?: C): Promise<GetSubscriberQuery> {
      return requester<GetSubscriberQuery, GetSubscriberQueryVariables>(GetSubscriberDocument, variables, options) as Promise<GetSubscriberQuery>;
    },
    GetSubscriberCountAddedToday(variables: GetSubscriberCountAddedTodayQueryVariables, options?: C): Promise<GetSubscriberCountAddedTodayQuery> {
      return requester<GetSubscriberCountAddedTodayQuery, GetSubscriberCountAddedTodayQueryVariables>(GetSubscriberCountAddedTodayDocument, variables, options) as Promise<GetSubscriberCountAddedTodayQuery>;
    },
    GetSubscribers(variables: GetSubscribersQueryVariables, options?: C): Promise<GetSubscribersQuery> {
      return requester<GetSubscribersQuery, GetSubscribersQueryVariables>(GetSubscribersDocument, variables, options) as Promise<GetSubscribersQuery>;
    },
    GetSubscribersCount(variables: GetSubscribersCountQueryVariables, options?: C): Promise<GetSubscribersCountQuery> {
      return requester<GetSubscribersCountQuery, GetSubscribersCountQueryVariables>(GetSubscribersCountDocument, variables, options) as Promise<GetSubscribersCountQuery>;
    },
    ResubscribeToList(variables: ResubscribeToListMutationVariables, options?: C): Promise<ResubscribeToListMutation> {
      return requester<ResubscribeToListMutation, ResubscribeToListMutationVariables>(ResubscribeToListDocument, variables, options) as Promise<ResubscribeToListMutation>;
    },
    SearchSubscribers(variables: SearchSubscribersQueryVariables, options?: C): Promise<SearchSubscribersQuery> {
      return requester<SearchSubscribersQuery, SearchSubscribersQueryVariables>(SearchSubscribersDocument, variables, options) as Promise<SearchSubscribersQuery>;
    },
    UnsubscribeFromAllList(variables: UnsubscribeFromAllListMutationVariables, options?: C): Promise<UnsubscribeFromAllListMutation> {
      return requester<UnsubscribeFromAllListMutation, UnsubscribeFromAllListMutationVariables>(UnsubscribeFromAllListDocument, variables, options) as Promise<UnsubscribeFromAllListMutation>;
    },
    CompleteOnboarding(variables: CompleteOnboardingMutationVariables, options?: C): Promise<CompleteOnboardingMutation> {
      return requester<CompleteOnboardingMutation, CompleteOnboardingMutationVariables>(CompleteOnboardingDocument, variables, options) as Promise<CompleteOnboardingMutation>;
    },
    ConfirmCodeAndLogin(variables: ConfirmCodeAndLoginMutationVariables, options?: C): Promise<ConfirmCodeAndLoginMutation> {
      return requester<ConfirmCodeAndLoginMutation, ConfirmCodeAndLoginMutationVariables>(ConfirmCodeAndLoginDocument, variables, options) as Promise<ConfirmCodeAndLoginMutation>;
    },
    EmailLogin(variables: EmailLoginMutationVariables, options?: C): Promise<EmailLoginMutation> {
      return requester<EmailLoginMutation, EmailLoginMutationVariables>(EmailLoginDocument, variables, options) as Promise<EmailLoginMutation>;
    },
    getUserExistByEmail(variables: GetUserExistByEmailQueryVariables, options?: C): Promise<GetUserExistByEmailQuery> {
      return requester<GetUserExistByEmailQuery, GetUserExistByEmailQueryVariables>(GetUserExistByEmailDocument, variables, options) as Promise<GetUserExistByEmailQuery>;
    },
    Logout(variables?: LogoutMutationVariables, options?: C): Promise<LogoutMutation> {
      return requester<LogoutMutation, LogoutMutationVariables>(LogoutDocument, variables, options) as Promise<LogoutMutation>;
    },
    Me(variables?: MeQueryVariables, options?: C): Promise<MeQuery> {
      return requester<MeQuery, MeQueryVariables>(MeDocument, variables, options) as Promise<MeQuery>;
    },
    SignupWithEmail(variables: SignupWithEmailMutationVariables, options?: C): Promise<SignupWithEmailMutation> {
      return requester<SignupWithEmailMutation, SignupWithEmailMutationVariables>(SignupWithEmailDocument, variables, options) as Promise<SignupWithEmailMutation>;
    },
    UploadCsvFileEmailsToList(variables: UploadCsvFileEmailsToListMutationVariables, options?: C): Promise<UploadCsvFileEmailsToListMutation> {
      return requester<UploadCsvFileEmailsToListMutation, UploadCsvFileEmailsToListMutationVariables>(UploadCsvFileEmailsToListDocument, variables, options) as Promise<UploadCsvFileEmailsToListMutation>;
    },
    createConditionalSplitNode(variables: CreateConditionalSplitNodeMutationVariables, options?: C): Promise<CreateConditionalSplitNodeMutation> {
      return requester<CreateConditionalSplitNodeMutation, CreateConditionalSplitNodeMutationVariables>(CreateConditionalSplitNodeDocument, variables, options) as Promise<CreateConditionalSplitNodeMutation>;
    },
    CreateListTrigger(variables: CreateListTriggerMutationVariables, options?: C): Promise<CreateListTriggerMutation> {
      return requester<CreateListTriggerMutation, CreateListTriggerMutationVariables>(CreateListTriggerDocument, variables, options) as Promise<CreateListTriggerMutation>;
    },
    CreateMetricTrigger(variables: CreateMetricTriggerMutationVariables, options?: C): Promise<CreateMetricTriggerMutation> {
      return requester<CreateMetricTriggerMutation, CreateMetricTriggerMutationVariables>(CreateMetricTriggerDocument, variables, options) as Promise<CreateMetricTriggerMutation>;
    },
    CreateSendEmailNode(variables: CreateSendEmailNodeMutationVariables, options?: C): Promise<CreateSendEmailNodeMutation> {
      return requester<CreateSendEmailNodeMutation, CreateSendEmailNodeMutationVariables>(CreateSendEmailNodeDocument, variables, options) as Promise<CreateSendEmailNodeMutation>;
    },
    createTriggerSplitNode(variables: CreateTriggerSplitNodeMutationVariables, options?: C): Promise<CreateTriggerSplitNodeMutation> {
      return requester<CreateTriggerSplitNodeMutation, CreateTriggerSplitNodeMutationVariables>(CreateTriggerSplitNodeDocument, variables, options) as Promise<CreateTriggerSplitNodeMutation>;
    },
    DeleteWorkflowTransition(variables: DeleteWorkflowTransitionMutationVariables, options?: C): Promise<DeleteWorkflowTransitionMutation> {
      return requester<DeleteWorkflowTransitionMutation, DeleteWorkflowTransitionMutationVariables>(DeleteWorkflowTransitionDocument, variables, options) as Promise<DeleteWorkflowTransitionMutation>;
    },
    UpdateListTrigger(variables: UpdateListTriggerMutationVariables, options?: C): Promise<UpdateListTriggerMutation> {
      return requester<UpdateListTriggerMutation, UpdateListTriggerMutationVariables>(UpdateListTriggerDocument, variables, options) as Promise<UpdateListTriggerMutation>;
    },
    UpdateConditionalSplitState(variables: UpdateConditionalSplitStateMutationVariables, options?: C): Promise<UpdateConditionalSplitStateMutation> {
      return requester<UpdateConditionalSplitStateMutation, UpdateConditionalSplitStateMutationVariables>(UpdateConditionalSplitStateDocument, variables, options) as Promise<UpdateConditionalSplitStateMutation>;
    },
    UpdateDelayState(variables: UpdateDelayStateMutationVariables, options?: C): Promise<UpdateDelayStateMutation> {
      return requester<UpdateDelayStateMutation, UpdateDelayStateMutationVariables>(UpdateDelayStateDocument, variables, options) as Promise<UpdateDelayStateMutation>;
    },
    UpdateMetricTrigger(variables: UpdateMetricTriggerMutationVariables, options?: C): Promise<UpdateMetricTriggerMutation> {
      return requester<UpdateMetricTriggerMutation, UpdateMetricTriggerMutationVariables>(UpdateMetricTriggerDocument, variables, options) as Promise<UpdateMetricTriggerMutation>;
    },
    UpdateSendEmailState(variables: UpdateSendEmailStateMutationVariables, options?: C): Promise<UpdateSendEmailStateMutation> {
      return requester<UpdateSendEmailStateMutation, UpdateSendEmailStateMutationVariables>(UpdateSendEmailStateDocument, variables, options) as Promise<UpdateSendEmailStateMutation>;
    },
    UpdateTriggerSplitState(variables: UpdateTriggerSplitStateMutationVariables, options?: C): Promise<UpdateTriggerSplitStateMutation> {
      return requester<UpdateTriggerSplitStateMutation, UpdateTriggerSplitStateMutationVariables>(UpdateTriggerSplitStateDocument, variables, options) as Promise<UpdateTriggerSplitStateMutation>;
    },
    ConvertWorkflowToPublic(variables: ConvertWorkflowToPublicMutationVariables, options?: C): Promise<ConvertWorkflowToPublicMutation> {
      return requester<ConvertWorkflowToPublicMutation, ConvertWorkflowToPublicMutationVariables>(ConvertWorkflowToPublicDocument, variables, options) as Promise<ConvertWorkflowToPublicMutation>;
    },
    CreateNewDelayNode(variables: CreateNewDelayNodeMutationVariables, options?: C): Promise<CreateNewDelayNodeMutation> {
      return requester<CreateNewDelayNodeMutation, CreateNewDelayNodeMutationVariables>(CreateNewDelayNodeDocument, variables, options) as Promise<CreateNewDelayNodeMutation>;
    },
    CreateNodeConnection(variables: CreateNodeConnectionMutationVariables, options?: C): Promise<CreateNodeConnectionMutation> {
      return requester<CreateNodeConnectionMutation, CreateNodeConnectionMutationVariables>(CreateNodeConnectionDocument, variables, options) as Promise<CreateNodeConnectionMutation>;
    },
    CreateWorkflow(variables: CreateWorkflowMutationVariables, options?: C): Promise<CreateWorkflowMutation> {
      return requester<CreateWorkflowMutation, CreateWorkflowMutationVariables>(CreateWorkflowDocument, variables, options) as Promise<CreateWorkflowMutation>;
    },
    DeleteWorkflow(variables: DeleteWorkflowMutationVariables, options?: C): Promise<DeleteWorkflowMutation> {
      return requester<DeleteWorkflowMutation, DeleteWorkflowMutationVariables>(DeleteWorkflowDocument, variables, options) as Promise<DeleteWorkflowMutation>;
    },
    DeleteWorkflowNode(variables: DeleteWorkflowNodeMutationVariables, options?: C): Promise<DeleteWorkflowNodeMutation> {
      return requester<DeleteWorkflowNodeMutation, DeleteWorkflowNodeMutationVariables>(DeleteWorkflowNodeDocument, variables, options) as Promise<DeleteWorkflowNodeMutation>;
    },
    GetPublicWorkflows(variables: GetPublicWorkflowsQueryVariables, options?: C): Promise<GetPublicWorkflowsQuery> {
      return requester<GetPublicWorkflowsQuery, GetPublicWorkflowsQueryVariables>(GetPublicWorkflowsDocument, variables, options) as Promise<GetPublicWorkflowsQuery>;
    },
    getWorkflow(variables: GetWorkflowQueryVariables, options?: C): Promise<GetWorkflowQuery> {
      return requester<GetWorkflowQuery, GetWorkflowQueryVariables>(GetWorkflowDocument, variables, options) as Promise<GetWorkflowQuery>;
    },
    GetWorkflowCount(variables: GetWorkflowCountQueryVariables, options?: C): Promise<GetWorkflowCountQuery> {
      return requester<GetWorkflowCountQuery, GetWorkflowCountQueryVariables>(GetWorkflowCountDocument, variables, options) as Promise<GetWorkflowCountQuery>;
    },
    getWorkflows(variables: GetWorkflowsQueryVariables, options?: C): Promise<GetWorkflowsQuery> {
      return requester<GetWorkflowsQuery, GetWorkflowsQueryVariables>(GetWorkflowsDocument, variables, options) as Promise<GetWorkflowsQuery>;
    },
    ReplicateWorkflow(variables: ReplicateWorkflowMutationVariables, options?: C): Promise<ReplicateWorkflowMutation> {
      return requester<ReplicateWorkflowMutation, ReplicateWorkflowMutationVariables>(ReplicateWorkflowDocument, variables, options) as Promise<ReplicateWorkflowMutation>;
    },
    TurnOffWorkflow(variables: TurnOffWorkflowMutationVariables, options?: C): Promise<TurnOffWorkflowMutation> {
      return requester<TurnOffWorkflowMutation, TurnOffWorkflowMutationVariables>(TurnOffWorkflowDocument, variables, options) as Promise<TurnOffWorkflowMutation>;
    },
    TurnOnWorkflow(variables: TurnOnWorkflowMutationVariables, options?: C): Promise<TurnOnWorkflowMutation> {
      return requester<TurnOnWorkflowMutation, TurnOnWorkflowMutationVariables>(TurnOnWorkflowDocument, variables, options) as Promise<TurnOnWorkflowMutation>;
    },
    UpdateWorkflowDescription(variables: UpdateWorkflowDescriptionMutationVariables, options?: C): Promise<UpdateWorkflowDescriptionMutation> {
      return requester<UpdateWorkflowDescriptionMutation, UpdateWorkflowDescriptionMutationVariables>(UpdateWorkflowDescriptionDocument, variables, options) as Promise<UpdateWorkflowDescriptionMutation>;
    },
    UpdateFlowFilter(variables: UpdateFlowFilterMutationVariables, options?: C): Promise<UpdateFlowFilterMutation> {
      return requester<UpdateFlowFilterMutation, UpdateFlowFilterMutationVariables>(UpdateFlowFilterDocument, variables, options) as Promise<UpdateFlowFilterMutation>;
    },
    UpdateTriggerFilter(variables: UpdateTriggerFilterMutationVariables, options?: C): Promise<UpdateTriggerFilterMutation> {
      return requester<UpdateTriggerFilterMutation, UpdateTriggerFilterMutationVariables>(UpdateTriggerFilterDocument, variables, options) as Promise<UpdateTriggerFilterMutation>;
    },
    UpdateWorkflowName(variables: UpdateWorkflowNameMutationVariables, options?: C): Promise<UpdateWorkflowNameMutation> {
      return requester<UpdateWorkflowNameMutation, UpdateWorkflowNameMutationVariables>(UpdateWorkflowNameDocument, variables, options) as Promise<UpdateWorkflowNameMutation>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;