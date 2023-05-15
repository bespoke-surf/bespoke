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
  ARN: any;
  Date: any;
  DateTime: any;
  Decimal: any;
  FormattedString: any;
  HTML: any;
  JSON: any;
  Money: any;
  StorefrontID: any;
  URL: any;
  UnsignedInt64: any;
  UtcOffset: any;
};

/** Possible types of app developer. */
export type AppDeveloperType =
  /** Indicates the app developer works directly for a Merchant. */
  | 'MERCHANT'
  /** Indicates the app developer is a Partner. */
  | 'PARTNER'
  /** Indicates the app developer is Shopify. */
  | 'SHOPIFY'
  /** Indicates the app developer is unknown. It is not categorized as any of the other developer types. */
  | 'UNKNOWN';

/**
 * The possible categories of an app installation, based on their purpose
 * or the environment they can run in.
 *
 */
export type AppInstallationCategory =
  /** Apps that serve as channels through which sales are made, such as the online store. */
  | 'CHANNEL'
  /** Apps that can be used in the POS mobile client. */
  | 'POS_EMBEDDED';

/** The levels of privacy of an app installation. */
export type AppInstallationPrivacy =
  | 'PRIVATE'
  | 'PUBLIC';

/** The set of valid sort keys for the AppInstallation query. */
export type AppInstallationSortKeys =
  /** Sort by the `app_title` value. */
  | 'APP_TITLE'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `installed_at` value. */
  | 'INSTALLED_AT'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/**
 * The pricing model for the app subscription.
 * The pricing model input can be either `appRecurringPricingDetails` or `appUsagePricingDetails`.
 *
 */
export type AppPlanInput = {
  /** The pricing details for recurring billing. */
  appRecurringPricingDetails?: InputMaybe<AppRecurringPricingInput>;
  /** The pricing details for usage-based billing. */
  appUsagePricingDetails?: InputMaybe<AppUsagePricingInput>;
};

/** The frequency at which the shop is billed for an app subscription. */
export type AppPricingInterval =
  /** The app subscription bills the shop annually. */
  | 'ANNUAL'
  /** The app subscription bills the shop every 30 days. */
  | 'EVERY_30_DAYS';

/** The public-facing category for an app. */
export type AppPublicCategory =
  /** The app's public category is [custom](https://shopify.dev/apps/distribution#capabilities-and-requirements). */
  | 'CUSTOM'
  /** The app's public category is other. An app is in this category if it's not classified under any of the other app types (private, public, or custom). */
  | 'OTHER'
  /** The app's public category is [private](https://shopify.dev/apps/distribution#deprecated-app-types). */
  | 'PRIVATE'
  /** The app's public category is [public](https://shopify.dev/apps/distribution#capabilities-and-requirements). */
  | 'PUBLIC';

/**
 * The approval status of the app purchase.
 *
 * The merchant is charged for the purchase immediately after approval, and the status changes to `active`.
 * If the payment fails, then the app purchase remains `pending`.
 *
 * Purchases start as `pending` and can change to: `active`, `declined`, `expired`. After a purchase changes, it
 * remains in that final state.
 *
 */
export type AppPurchaseStatus =
  /** The app purchase has been approved by the merchant and is ready to be activated by the app. App purchases created through the GraphQL Admin API are activated upon approval. */
  | 'ACCEPTED'
  /** The app purchase was approved by the merchant and has been activated by the app. Active app purchases are charged to the merchant and are paid out to the partner. */
  | 'ACTIVE'
  /** The app purchase was declined by the merchant. */
  | 'DECLINED'
  /** The app purchase was not accepted within two days of being created. */
  | 'EXPIRED'
  /** The app purchase is pending approval by the merchant. */
  | 'PENDING';

/** Instructs the app subscription to generate a fixed charge on a recurring basis. The frequency is specified by the billing interval. */
export type AppRecurringPricingInput = {
  /** The discount applied to the subscription for a given number of billing intervals. */
  discount?: InputMaybe<AppSubscriptionDiscountInput>;
  /** How often the app subscription generates a charge. */
  interval?: InputMaybe<AppPricingInterval>;
  /** The amount to be charged to the store every billing interval. The only permitted currency code is USD. */
  price: MoneyInput;
};

/** Possible error codes that can be returned by `AppRevenueAttributionRecordCreateUserError`. */
export type AppRevenueAttributionRecordCreateUserErrorCode =
  /** The input value is invalid. */
  | 'INVALID'
  /** The input value is already taken. */
  | 'TAKEN';

/** Possible error codes that can be returned by `AppRevenueAttributionRecordDeleteUserError`. */
export type AppRevenueAttributionRecordDeleteUserErrorCode =
  /** The input value is invalid. */
  | 'INVALID';

/** Allows to supply an app revenue attribution record. */
export type AppRevenueAttributionRecordInput = {
  /** The financial amount captured in this attribution. */
  amount: MoneyInput;
  /** The timestamp when the financial amount was captured. */
  capturedAt: Scalars['DateTime'];
  /**
   * The unique value submitted during creation.
   * For more information, refer to
   * [Idempotent requests](https://shopify.dev/api/usage/idempotent-requests).
   *
   */
  idempotencyKey: Scalars['String'];
  /** Indicates whether this is a test submission. */
  test: Scalars['Boolean'];
  /** The type of revenue attribution. */
  type: AppRevenueAttributionType;
};

/** The set of valid sort keys for the AppRevenueAttributionRecord query. */
export type AppRevenueAttributionRecordSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** Represents the billing types of revenue attribution. */
export type AppRevenueAttributionType =
  /** App purchase related revenue collection. */
  | 'APPLICATION_PURCHASE'
  /** App subscription revenue collection. */
  | 'APPLICATION_SUBSCRIPTION'
  /** App usage-based revenue collection. */
  | 'APPLICATION_USAGE'
  /** Other app revenue collection type. */
  | 'OTHER';

/**
 * Specifies a discount to the recurring pricing portion of a subscription over a number of billing intervals.
 *
 */
export type AppSubscriptionDiscountInput = {
  /**
   * The total number of billing intervals to which the discount will be applied.
   * The discount will be applied to an indefinite number of billing intervals if this value is left blank.
   *
   */
  durationLimitInIntervals?: InputMaybe<Scalars['Int']>;
  /** The value to be discounted every billing interval. */
  value?: InputMaybe<AppSubscriptionDiscountValueInput>;
};

/** Specifies the value discounted every billing interval. */
export type AppSubscriptionDiscountValueInput = {
  /** The monetary value of a discount. */
  amount?: InputMaybe<Scalars['Decimal']>;
  /** The percentage value of a discount. */
  percentage?: InputMaybe<Scalars['Float']>;
};

/** Allows an app to add more than one pricing plan to an app subscription. */
export type AppSubscriptionLineItemInput = {
  /** The pricing model for the app subscription. */
  plan: AppPlanInput;
};

/** The replacement behavior when creating an app subscription for a merchant with an already existing app subscription. */
export type AppSubscriptionReplacementBehavior =
  /** Cancels the merchant's current app subscription immediately and replaces it with the newly created app subscription. */
  | 'APPLY_IMMEDIATELY'
  /** Defers canceling the merchant's current app subscription and applying the newly created app subscription until the start of the next billing cycle. */
  | 'APPLY_ON_NEXT_BILLING_CYCLE'
  /**
   * Cancels the merchant's current app subscription immediately and replaces it with the newly created app subscription, with the exception of
   * the following scenarios where replacing the current app subscription will be deferred until the start of the next billing cycle.
   * 1) The current app subscription is annual and the newly created app subscription is also annual but is of a lesser value.
   * 2) The current app subscription is annual and the newly created app subscription is monthly.
   * 3) The current app subscription and the newly created app subscription are identical except for the `discount` value.
   *
   */
  | 'STANDARD';

/** The set of valid sort keys for the AppSubscription query. */
export type AppSubscriptionSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** The status of the app subscription. */
export type AppSubscriptionStatus =
  /** The app subscription has been approved by the merchant and is ready to be activated by the app. */
  | 'ACCEPTED'
  /** The app subscription has been approved by the merchant. Active app subscriptions are billed to the shop. After payment, partners receive payouts. */
  | 'ACTIVE'
  /** The app subscription was cancelled by the app. This could be caused by the app being uninstalled, a new app subscription being activated, or a direct cancellation by the app. This is a terminal state. */
  | 'CANCELLED'
  /** The app subscription was declined by the merchant. This is a terminal state. */
  | 'DECLINED'
  /** The app subscription wasn't approved by the merchant within two days of being created. This is a terminal state. */
  | 'EXPIRED'
  /** The app subscription is on hold due to non-payment. The subscription re-activates after payments resume. */
  | 'FROZEN'
  /** The app subscription is pending approval by the merchant. */
  | 'PENDING';

/** Possible error codes that can be returned by `AppSubscriptionTrialExtendUserError`. */
export type AppSubscriptionTrialExtendUserErrorCode =
  /** The app subscription isn't active. */
  | 'SUBSCRIPTION_NOT_ACTIVE'
  /** The app subscription wasn't found. */
  | 'SUBSCRIPTION_NOT_FOUND'
  /** The trial isn't active. */
  | 'TRIAL_NOT_ACTIVE';

/** The set of valid sort keys for the AppTransaction query. */
export type AppTransactionSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** Allows an app to issue arbitrary charges for app usage associated with a subscription. */
export type AppUsagePricingInput = {
  /** The maximum amount of usage charges that can be incurred within a subscription billing interval. */
  cappedAmount: MoneyInput;
  /** The terms and conditions for app usage. These terms stipulate the pricing model for the charges that an app creates. */
  terms: Scalars['String'];
};

/** The set of valid sort keys for the AppUsageRecord query. */
export type AppUsageRecordSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** Specifies the input fields required for an attribute. */
export type AttributeInput = {
  /** Key or name of the attribute. */
  key: Scalars['String'];
  /** Value of the attribute. */
  value: Scalars['String'];
};

/** The set of valid sort keys for the AutomaticDiscount query. */
export type AutomaticDiscountSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** The possible types for a badge. */
export type BadgeType =
  /** This badge has type `attention`. */
  | 'ATTENTION'
  /** This badge has type `default`. */
  | 'DEFAULT'
  /** This badge has type `info`. */
  | 'INFO'
  /** This badge has type `success`. */
  | 'SUCCESS'
  /** This badge has type `warning`. */
  | 'WARNING';

/** Possible error codes that can be returned by `BillingAttemptUserError`. */
export type BillingAttemptUserErrorCode =
  /** The input value is blank. */
  | 'BLANK'
  /** Subscription contract does not exist. */
  | 'CONTRACT_NOT_FOUND'
  /** The input value is invalid. */
  | 'INVALID';

/** Possible error codes that can be returned by `BulkMutationUserError`. */
export type BulkMutationErrorCode =
  /** There was a problem reading the JSONL file. This error might be intermittent, so you can try performing the same query again. */
  | 'INTERNAL_FILE_SERVER_ERROR'
  /** The operation did not run because the mutation is invalid. Check your mutation syntax and try again. */
  | 'INVALID_MUTATION'
  /** The JSONL file submitted via the `stagedUploadsCreate` mutation is invalid. Update the file and try again. */
  | 'INVALID_STAGED_UPLOAD_FILE'
  /** The JSONL file could not be found. Try [uploading the file](https://shopify.dev/api/usage/bulk-operations/imports#generate-the-uploaded-url-and-parameters) again, and check that you've entered the URL correctly for the `stagedUploadPath` mutation argument. */
  | 'NO_SUCH_FILE'
  /** The operation did not run because another bulk mutation is already running. [Wait for the operation to finish](https://shopify.dev/api/usage/bulk-operations/imports#wait-for-the-operation-to-finish) before retrying this operation. */
  | 'OPERATION_IN_PROGRESS';

/** Error codes for failed bulk operations. */
export type BulkOperationErrorCode =
  /**
   * The provided operation `query` returned access denied due to missing
   * [access scopes](https://shopify.dev/api/usage/access-scopes).
   * Review the requested object permissions and execute the query as a normal non-bulk GraphQL request to see more details.
   *
   */
  | 'ACCESS_DENIED'
  /**
   * The operation resulted in partial or incomplete data due to internal server errors during execution.
   * These errors might be intermittent, so you can try performing the same query again.
   *
   */
  | 'INTERNAL_SERVER_ERROR'
  /**
   * The operation resulted in partial or incomplete data due to query timeouts during execution.
   * In some cases, timeouts can be avoided by modifying your `query` to select fewer fields.
   *
   */
  | 'TIMEOUT';

/** The valid values for the status of a bulk operation. */
export type BulkOperationStatus =
  /** The bulk operation has been canceled. */
  | 'CANCELED'
  /**
   * Cancelation has been initiated on the bulk operation. There may be a short delay from when a cancelation
   * starts until the operation is actually canceled.
   *
   */
  | 'CANCELING'
  /** The bulk operation has successfully completed. */
  | 'COMPLETED'
  /** The bulk operation has been created. */
  | 'CREATED'
  /** The bulk operation URL has expired. */
  | 'EXPIRED'
  /**
   * The bulk operation has failed. For information on why the operation failed, use
   * [BulkOperation.errorCode](https://shopify.dev/api/admin-graphql/latest/enums/bulkoperationerrorcode).
   *
   */
  | 'FAILED'
  /** The bulk operation is runnning. */
  | 'RUNNING';

/** The valid values for the bulk operation's type. */
export type BulkOperationType =
  /** The bulk operation is a mutation. */
  | 'MUTATION'
  /** The bulk operation is a query. */
  | 'QUERY';

/** Possible error codes that can be returned by `BulkProductResourceFeedbackCreateUserError`. */
export type BulkProductResourceFeedbackCreateUserErrorCode =
  /** The input value is blank. */
  | 'BLANK'
  /** The input value is invalid. */
  | 'INVALID'
  /** The input value should be less than or equal to the maximum value allowed. */
  | 'LESS_THAN_OR_EQUAL_TO'
  /** The operation was attempted on too many feedback objects. The maximum number of feedback objects that you can operate on is 50. */
  | 'MAXIMUM_FEEDBACK_LIMIT_EXCEEDED'
  /** The feedback for a later version of this resource was already accepted. */
  | 'OUTDATED_FEEDBACK'
  /** The input value needs to be blank. */
  | 'PRESENT'
  /** The product wasn't found or isn't available to the channel. */
  | 'PRODUCT_NOT_FOUND';

/** Possible error codes that can be returned by `BusinessCustomerUserError`. */
export type BusinessCustomerErrorCode =
  /** The input value is blank. */
  | 'BLANK'
  /** Deleting the resource failed. */
  | 'FAILED_TO_DELETE'
  /** An internal error occurred. */
  | 'INTERNAL_ERROR'
  /** The input value is invalid. */
  | 'INVALID'
  /** The input is invalid. */
  | 'INVALID_INPUT'
  /** The number of resources exceeded the limit. */
  | 'LIMIT_REACHED'
  /** The input is empty. */
  | 'NO_INPUT'
  /** Missing a required field. */
  | 'REQUIRED'
  /** The resource wasn't found. */
  | 'RESOURCE_NOT_FOUND'
  /** The input value is already taken. */
  | 'TAKEN'
  /** The field value is too long. */
  | 'TOO_LONG'
  /** Unexpected type. */
  | 'UNEXPECTED_TYPE';

/** The input fields specifying the behavior of checkout for a B2B buyer. */
export type BuyerExperienceConfigurationInput = {
  /** Whether to checkout to draft order for merchant review. */
  checkoutToDraft?: InputMaybe<Scalars['Boolean']>;
  /** Represents the merchant configured payment terms. */
  paymentTermsTemplateId?: InputMaybe<Scalars['ID']>;
};

/** The set of valid sort keys for the CheckoutProfile query. */
export type CheckoutProfileSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `is_published` value. */
  | 'IS_PUBLISHED'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** The set of valid sort keys for the CodeDiscount query. */
export type CodeDiscountSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `ends_at` value. */
  | 'ENDS_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `starts_at` value. */
  | 'STARTS_AT'
  /** Sort by the `title` value. */
  | 'TITLE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** Possible error codes that can be returned by `CollectionAddProductsV2UserError`. */
export type CollectionAddProductsV2UserErrorCode =
  /** Can't manually add products to a smart collection. */
  | 'CANT_ADD_TO_SMART_COLLECTION'
  /** Collection doesn't exist. */
  | 'COLLECTION_DOES_NOT_EXIST';

/** Specifies the collection to delete. */
export type CollectionDeleteInput = {
  /** The ID of the collection to be deleted. */
  id: Scalars['ID'];
};

/** Specifies the input fields required to create a collection. */
export type CollectionInput = {
  /** The description of the collection, in HTML format. */
  descriptionHtml?: InputMaybe<Scalars['String']>;
  /**
   * A unique human-friendly string for the collection. Automatically generated from the collection's title.
   *
   */
  handle?: InputMaybe<Scalars['String']>;
  /**
   * Specifies the collection to update or create a new collection if absent. Required for updating a collection.
   *
   */
  id?: InputMaybe<Scalars['ID']>;
  /** The image associated with the collection. */
  image?: InputMaybe<ImageInput>;
  /** The metafields to associate with the collection. */
  metafields?: InputMaybe<Array<MetafieldInput>>;
  /** The private metafields to associate with the collection. */
  privateMetafields?: InputMaybe<Array<PrivateMetafieldInput>>;
  /** Initial list of collection products. Only valid with `collectionCreate` and without rules. */
  products?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * Indicates whether a redirect is required after a new handle has been provided.
   * If true, then the old handle is redirected to the new one automatically.
   *
   */
  redirectNewHandle?: InputMaybe<Scalars['Boolean']>;
  /**
   * The rules used to assign products to the collection.
   *
   */
  ruleSet?: InputMaybe<CollectionRuleSetInput>;
  /** SEO information for the collection. */
  seo?: InputMaybe<SeoInput>;
  /** The order in which the collection's products are sorted. */
  sortOrder?: InputMaybe<CollectionSortOrder>;
  /** The theme template used when viewing the collection in a store. */
  templateSuffix?: InputMaybe<Scalars['String']>;
  /** The title of the collection. Required for creating a new collection. */
  title?: InputMaybe<Scalars['String']>;
};

/** Specifies the publications to which a collection will be published. */
export type CollectionPublicationInput = {
  /** The ID of the publication. */
  publicationId?: InputMaybe<Scalars['ID']>;
};

/** Specifies a collection to publish and the sales channels to publish it to. */
export type CollectionPublishInput = {
  /** The channels where the collection will be published. */
  collectionPublications: Array<CollectionPublicationInput>;
  /** The collection to create or update publications for. */
  id: Scalars['ID'];
};

/** Specifies the attribute of a product being used to populate the smart collection. */
export type CollectionRuleColumn =
  /**
   * An attribute evaluated based on the `compare_at_price` attribute of the product's variants.
   * With `is_set` relation, the rule matches products with at least one variant with `compare_at_price` set.
   * With `is_not_set` relation, the rule matches matches products with at least one variant with `compare_at_price` not set.
   *
   */
  | 'IS_PRICE_REDUCED'
  /** The [`product_taxonomy_node_id`](https://shopify.dev/api/admin-graphql/latest/objects/Product#field-product-productcategory) attribute. */
  | 'PRODUCT_TAXONOMY_NODE_ID'
  /** The [`tag`](https://shopify.dev/api/admin-graphql/latest/objects/Product#field-product-producttype) attribute. */
  | 'TAG'
  /** The [`title`](https://shopify.dev/api/admin-graphql/latest/objects/Product#field-product-title) attribute. */
  | 'TITLE'
  /** The [`type`](https://shopify.dev/api/admin-graphql/latest/objects/Product#field-product-producttype) attribute. */
  | 'TYPE'
  /** The [`variant_compare_at_price`](https://shopify.dev/api/admin-graphql/latest/objects/ProductVariant#field-productvariant-compareatprice) attribute. */
  | 'VARIANT_COMPARE_AT_PRICE'
  /** The [`variant_inventory`](https://shopify.dev/api/admin-graphql/latest/objects/ProductVariant#field-productvariant-inventoryquantity) attribute. */
  | 'VARIANT_INVENTORY'
  /** The [`variant_price`](https://shopify.dev/api/admin-graphql/latest/objects/ProductVariant#field-productvariant-price) attribute. */
  | 'VARIANT_PRICE'
  /** The [`variant_title`](https://shopify.dev/api/admin-graphql/latest/objects/ProductVariant#field-productvariant-title) attribute. */
  | 'VARIANT_TITLE'
  /** The [`variant_weight`](https://shopify.dev/api/admin-graphql/latest/objects/ProductVariant#field-productvariant-weight) attribute. */
  | 'VARIANT_WEIGHT'
  /** The [`vendor`](https://shopify.dev/api/admin-graphql/latest/objects/Product#field-product-vendor) attribute. */
  | 'VENDOR';

/** Specifies a rule to associate with a collection. */
export type CollectionRuleInput = {
  /** The attribute that the rule focuses on. For example, `title` or `product_type`. */
  column: CollectionRuleColumn;
  /** The value that the operator is applied to. For example, `Hats`. */
  condition: Scalars['String'];
  /**
   * The type of operator that the rule is based on. For example, `equals`, `contains`, or `not_equals`.
   *
   */
  relation: CollectionRuleRelation;
};

/** Specifies the relationship between the `column` and the `condition`. */
export type CollectionRuleRelation =
  /** The attribute contains the condition. */
  | 'CONTAINS'
  /** The attribute ends with the condition. */
  | 'ENDS_WITH'
  /** The attribute is equal to the condition. */
  | 'EQUALS'
  /** The attribute is greater than the condition. */
  | 'GREATER_THAN'
  /** The attribute is not set (equal to `null`). */
  | 'IS_NOT_SET'
  /** The attribute is set (not equal to `null`). */
  | 'IS_SET'
  /** The attribute is less than the condition. */
  | 'LESS_THAN'
  /** The attribute does not contain the condition. */
  | 'NOT_CONTAINS'
  /** The attribute does not equal the condition. */
  | 'NOT_EQUALS'
  /** The attribute starts with the condition. */
  | 'STARTS_WITH';

/** Specifies a rule set for the collection. */
export type CollectionRuleSetInput = {
  /**
   * Whether products must match any or all of the rules to be included in the collection.
   * If true, then products must match at least one of the rules to be included in the collection.
   * If false, then products must match all of the rules to be included in the collection.
   *
   */
  appliedDisjunctively: Scalars['Boolean'];
  /** The rules used to assign products to the collection. */
  rules?: InputMaybe<Array<CollectionRuleInput>>;
};

/** The set of valid sort keys for the Collection query. */
export type CollectionSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** Specifies the sort order for the products in the collection. */
export type CollectionSortOrder =
  /** Alphabetically, in ascending order (A - Z). */
  | 'ALPHA_ASC'
  /** Alphabetically, in descending order (Z - A). */
  | 'ALPHA_DESC'
  /** By best-selling products. */
  | 'BEST_SELLING'
  /** By date created, in ascending order (oldest - newest). */
  | 'CREATED'
  /** By date created, in descending order (newest - oldest). */
  | 'CREATED_DESC'
  /** In the order set manually by the merchant. */
  | 'MANUAL'
  /** By price, in ascending order (lowest - highest). */
  | 'PRICE_ASC'
  /** By price, in descending order (highest - lowest). */
  | 'PRICE_DESC';

/** Specifies the collection to unpublish and the sales channels to remove it from. */
export type CollectionUnpublishInput = {
  /** The channels where the collection is published. */
  collectionPublications: Array<CollectionPublicationInput>;
  /** The collection to create or update publications for. */
  id: Scalars['ID'];
};

/** Specifies the input fields to create or update the address of a company location. */
export type CompanyAddressInput = {
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: InputMaybe<Scalars['String']>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: InputMaybe<Scalars['String']>;
  /** The name of the city, district, village, or town. */
  city?: InputMaybe<Scalars['String']>;
  /** The two-letter code ([ISO 3166-1 alpha-2]](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format) for the country of the address. For example, `US`` for the United States. */
  countryCode?: InputMaybe<CountryCode>;
  /** A phone number for the recipient. Formatted using E.164 standard. For example, _+16135551111_. */
  phone?: InputMaybe<Scalars['String']>;
  /** The identity of the recipient e.g. 'Receiving Department'. */
  recipient?: InputMaybe<Scalars['String']>;
  /** The zip or postal code of the address. */
  zip?: InputMaybe<Scalars['String']>;
  /** The two-letter code ([ISO 3166-2 alpha-2]](https://en.wikipedia.org/wiki/ISO_3166-2) format) for the region of the address, such as the province, state, or district. For example, `ON` for Ontario, Canada. */
  zoneCode?: InputMaybe<Scalars['String']>;
};

/** The valid values for the address type of a company. */
export type CompanyAddressType =
  /** The address is a billing address. */
  | 'BILLING'
  /** The address is a shipping address. */
  | 'SHIPPING';

/** The company contact attributes to use when creating a company or updating a company contact. */
export type CompanyContactInput = {
  /** The unique email address of the company contact. */
  email?: InputMaybe<Scalars['String']>;
  /** The company contact's first name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** The company contact's last name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** The contact's locale. */
  locale?: InputMaybe<Scalars['String']>;
  /** The phone number of the company contact. */
  phone?: InputMaybe<Scalars['String']>;
  /** The title of the company contact. */
  title?: InputMaybe<Scalars['String']>;
};

/**
 * The role and location to assign to a company contact.
 *
 */
export type CompanyContactRoleAssign = {
  /** The role ID. */
  companyContactRoleId: Scalars['ID'];
  /** The location. */
  companyLocationId: Scalars['ID'];
};

/** The set of valid sort keys for the CompanyContactRoleAssignment query. */
export type CompanyContactRoleAssignmentSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `location_name` value. */
  | 'LOCATION_NAME'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** The set of valid sort keys for the CompanyContactRole query. */
export type CompanyContactRoleSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** The set of valid sort keys for the CompanyContact query. */
export type CompanyContactSortKeys =
  /** Sort by the `company_id` value. */
  | 'COMPANY_ID'
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `email` value. */
  | 'EMAIL'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `name` value. */
  | 'NAME'
  /** Sort by the `name_email` value. */
  | 'NAME_EMAIL'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/**
 * Provides the fields and values to use when creating a company and its associated resources.
 *
 */
export type CompanyCreateInput = {
  /** The attributes for the company. */
  company: CompanyInput;
  /** The attributes for the company contact. */
  companyContact?: InputMaybe<CompanyContactInput>;
  /** The attributes for the company location. */
  companyLocation?: InputMaybe<CompanyLocationInput>;
};

/** The company attributes to use when creating or updating a company. */
export type CompanyInput = {
  /**
   * The date and time ([ISO 8601 format](http://en.wikipedia.org/wiki/ISO_8601)) at
   *           which the company became the customer.
   */
  customerSince?: InputMaybe<Scalars['DateTime']>;
  /** A unique externally-supplied identifier for the company. */
  externalId?: InputMaybe<Scalars['String']>;
  /** The name of the company. */
  name?: InputMaybe<Scalars['String']>;
  /** A note about the company. */
  note?: InputMaybe<Scalars['String']>;
};

/** The company location fields to use when creating or updating a company location. */
export type CompanyLocationInput = {
  /** The input fields to create or update the billing address for a company location. */
  billingAddress?: InputMaybe<CompanyAddressInput>;
  /** Whether the billing address is the same as the shipping address. If the value is true, then the input for `billingAddress` is ignored. */
  billingSameAsShipping?: InputMaybe<Scalars['Boolean']>;
  /** The configuration for the buyer's checkout at the company location. */
  buyerExperienceConfiguration?: InputMaybe<BuyerExperienceConfigurationInput>;
  /** A unique externally-supplied identifier for the company location. */
  externalId?: InputMaybe<Scalars['String']>;
  /** The preferred locale of the company location. */
  locale?: InputMaybe<Scalars['String']>;
  /** The name of the company location. */
  name?: InputMaybe<Scalars['String']>;
  /** A note about the company location. */
  note?: InputMaybe<Scalars['String']>;
  /** The phone number of the company location. */
  phone?: InputMaybe<Scalars['String']>;
  /** The input fields to create or update the shipping address for a company location. */
  shippingAddress?: InputMaybe<CompanyAddressInput>;
  /** The list of tax exemptions to apply to the company location. */
  taxExemptions?: InputMaybe<Array<TaxExemption>>;
  /** The tax registration ID of the company location. */
  taxRegistrationId?: InputMaybe<Scalars['String']>;
};

/**
 * The role and contact to assign on a location.
 *
 */
export type CompanyLocationRoleAssign = {
  /** The company contact ID.. */
  companyContactId: Scalars['ID'];
  /** The role ID. */
  companyContactRoleId: Scalars['ID'];
};

/** The set of valid sort keys for the CompanyLocation query. */
export type CompanyLocationSortKeys =
  /** Sort by the `company_and_location_name` value. */
  | 'COMPANY_AND_LOCATION_NAME'
  /** Sort by the `company_id` value. */
  | 'COMPANY_ID'
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `name` value. */
  | 'NAME'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** The company location fields to use when creating or updating a company location. */
export type CompanyLocationUpdateInput = {
  /** The configuration for the buyer's checkout at the company location. */
  buyerExperienceConfiguration?: InputMaybe<BuyerExperienceConfigurationInput>;
  /** A unique externally-supplied identifier for the company location. */
  externalId?: InputMaybe<Scalars['String']>;
  /** The preferred locale of the company location. */
  locale?: InputMaybe<Scalars['String']>;
  /** The name of the company location. */
  name?: InputMaybe<Scalars['String']>;
  /** A note about the company location. */
  note?: InputMaybe<Scalars['String']>;
  /** The phone number of the company location. */
  phone?: InputMaybe<Scalars['String']>;
};

/** The set of valid sort keys for the Company query. */
export type CompanySortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `name` value. */
  | 'NAME'
  /** Sort by the `order_count` value. */
  | 'ORDER_COUNT'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `since_date` value. */
  | 'SINCE_DATE'
  /** Sort by the `total_spent` value. */
  | 'TOTAL_SPENT'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** The context data that determines the pricing of a variant. */
export type ContextualPricingContext = {
  /**
   * The CompanyLocation ID used to fetch company location specific prices.
   *
   */
  companyLocationId?: InputMaybe<Scalars['ID']>;
  /** The country code used to fetch country-specific prices. */
  country?: InputMaybe<CountryCode>;
};

/**
 * The code designating a country/region, which generally follows ISO 3166-1 alpha-2 guidelines.
 * If a territory doesn't have a country code value in the `CountryCode` enum, then it might be considered a subdivision
 * of another country. For example, the territories associated with Spain are represented by the country code `ES`,
 * and the territories associated with the United States of America are represented by the country code `US`.
 *
 */
export type CountryCode =
  /** Ascension Island. */
  | 'AC'
  /** Andorra. */
  | 'AD'
  /** United Arab Emirates. */
  | 'AE'
  /** Afghanistan. */
  | 'AF'
  /** Antigua & Barbuda. */
  | 'AG'
  /** Anguilla. */
  | 'AI'
  /** Albania. */
  | 'AL'
  /** Armenia. */
  | 'AM'
  /** Netherlands Antilles. */
  | 'AN'
  /** Angola. */
  | 'AO'
  /** Argentina. */
  | 'AR'
  /** Austria. */
  | 'AT'
  /** Australia. */
  | 'AU'
  /** Aruba. */
  | 'AW'
  /** Åland Islands. */
  | 'AX'
  /** Azerbaijan. */
  | 'AZ'
  /** Bosnia & Herzegovina. */
  | 'BA'
  /** Barbados. */
  | 'BB'
  /** Bangladesh. */
  | 'BD'
  /** Belgium. */
  | 'BE'
  /** Burkina Faso. */
  | 'BF'
  /** Bulgaria. */
  | 'BG'
  /** Bahrain. */
  | 'BH'
  /** Burundi. */
  | 'BI'
  /** Benin. */
  | 'BJ'
  /** St. Barthélemy. */
  | 'BL'
  /** Bermuda. */
  | 'BM'
  /** Brunei. */
  | 'BN'
  /** Bolivia. */
  | 'BO'
  /** Caribbean Netherlands. */
  | 'BQ'
  /** Brazil. */
  | 'BR'
  /** Bahamas. */
  | 'BS'
  /** Bhutan. */
  | 'BT'
  /** Bouvet Island. */
  | 'BV'
  /** Botswana. */
  | 'BW'
  /** Belarus. */
  | 'BY'
  /** Belize. */
  | 'BZ'
  /** Canada. */
  | 'CA'
  /** Cocos (Keeling) Islands. */
  | 'CC'
  /** Congo - Kinshasa. */
  | 'CD'
  /** Central African Republic. */
  | 'CF'
  /** Congo - Brazzaville. */
  | 'CG'
  /** Switzerland. */
  | 'CH'
  /** Côte d’Ivoire. */
  | 'CI'
  /** Cook Islands. */
  | 'CK'
  /** Chile. */
  | 'CL'
  /** Cameroon. */
  | 'CM'
  /** China. */
  | 'CN'
  /** Colombia. */
  | 'CO'
  /** Costa Rica. */
  | 'CR'
  /** Cuba. */
  | 'CU'
  /** Cape Verde. */
  | 'CV'
  /** Curaçao. */
  | 'CW'
  /** Christmas Island. */
  | 'CX'
  /** Cyprus. */
  | 'CY'
  /** Czechia. */
  | 'CZ'
  /** Germany. */
  | 'DE'
  /** Djibouti. */
  | 'DJ'
  /** Denmark. */
  | 'DK'
  /** Dominica. */
  | 'DM'
  /** Dominican Republic. */
  | 'DO'
  /** Algeria. */
  | 'DZ'
  /** Ecuador. */
  | 'EC'
  /** Estonia. */
  | 'EE'
  /** Egypt. */
  | 'EG'
  /** Western Sahara. */
  | 'EH'
  /** Eritrea. */
  | 'ER'
  /** Spain. */
  | 'ES'
  /** Ethiopia. */
  | 'ET'
  /** Finland. */
  | 'FI'
  /** Fiji. */
  | 'FJ'
  /** Falkland Islands. */
  | 'FK'
  /** Faroe Islands. */
  | 'FO'
  /** France. */
  | 'FR'
  /** Gabon. */
  | 'GA'
  /** United Kingdom. */
  | 'GB'
  /** Grenada. */
  | 'GD'
  /** Georgia. */
  | 'GE'
  /** French Guiana. */
  | 'GF'
  /** Guernsey. */
  | 'GG'
  /** Ghana. */
  | 'GH'
  /** Gibraltar. */
  | 'GI'
  /** Greenland. */
  | 'GL'
  /** Gambia. */
  | 'GM'
  /** Guinea. */
  | 'GN'
  /** Guadeloupe. */
  | 'GP'
  /** Equatorial Guinea. */
  | 'GQ'
  /** Greece. */
  | 'GR'
  /** South Georgia & South Sandwich Islands. */
  | 'GS'
  /** Guatemala. */
  | 'GT'
  /** Guinea-Bissau. */
  | 'GW'
  /** Guyana. */
  | 'GY'
  /** Hong Kong SAR. */
  | 'HK'
  /** Heard & McDonald Islands. */
  | 'HM'
  /** Honduras. */
  | 'HN'
  /** Croatia. */
  | 'HR'
  /** Haiti. */
  | 'HT'
  /** Hungary. */
  | 'HU'
  /** Indonesia. */
  | 'ID'
  /** Ireland. */
  | 'IE'
  /** Israel. */
  | 'IL'
  /** Isle of Man. */
  | 'IM'
  /** India. */
  | 'IN'
  /** British Indian Ocean Territory. */
  | 'IO'
  /** Iraq. */
  | 'IQ'
  /** Iran. */
  | 'IR'
  /** Iceland. */
  | 'IS'
  /** Italy. */
  | 'IT'
  /** Jersey. */
  | 'JE'
  /** Jamaica. */
  | 'JM'
  /** Jordan. */
  | 'JO'
  /** Japan. */
  | 'JP'
  /** Kenya. */
  | 'KE'
  /** Kyrgyzstan. */
  | 'KG'
  /** Cambodia. */
  | 'KH'
  /** Kiribati. */
  | 'KI'
  /** Comoros. */
  | 'KM'
  /** St. Kitts & Nevis. */
  | 'KN'
  /** North Korea. */
  | 'KP'
  /** South Korea. */
  | 'KR'
  /** Kuwait. */
  | 'KW'
  /** Cayman Islands. */
  | 'KY'
  /** Kazakhstan. */
  | 'KZ'
  /** Laos. */
  | 'LA'
  /** Lebanon. */
  | 'LB'
  /** St. Lucia. */
  | 'LC'
  /** Liechtenstein. */
  | 'LI'
  /** Sri Lanka. */
  | 'LK'
  /** Liberia. */
  | 'LR'
  /** Lesotho. */
  | 'LS'
  /** Lithuania. */
  | 'LT'
  /** Luxembourg. */
  | 'LU'
  /** Latvia. */
  | 'LV'
  /** Libya. */
  | 'LY'
  /** Morocco. */
  | 'MA'
  /** Monaco. */
  | 'MC'
  /** Moldova. */
  | 'MD'
  /** Montenegro. */
  | 'ME'
  /** St. Martin. */
  | 'MF'
  /** Madagascar. */
  | 'MG'
  /** North Macedonia. */
  | 'MK'
  /** Mali. */
  | 'ML'
  /** Myanmar (Burma). */
  | 'MM'
  /** Mongolia. */
  | 'MN'
  /** Macao SAR. */
  | 'MO'
  /** Martinique. */
  | 'MQ'
  /** Mauritania. */
  | 'MR'
  /** Montserrat. */
  | 'MS'
  /** Malta. */
  | 'MT'
  /** Mauritius. */
  | 'MU'
  /** Maldives. */
  | 'MV'
  /** Malawi. */
  | 'MW'
  /** Mexico. */
  | 'MX'
  /** Malaysia. */
  | 'MY'
  /** Mozambique. */
  | 'MZ'
  /** Namibia. */
  | 'NA'
  /** New Caledonia. */
  | 'NC'
  /** Niger. */
  | 'NE'
  /** Norfolk Island. */
  | 'NF'
  /** Nigeria. */
  | 'NG'
  /** Nicaragua. */
  | 'NI'
  /** Netherlands. */
  | 'NL'
  /** Norway. */
  | 'NO'
  /** Nepal. */
  | 'NP'
  /** Nauru. */
  | 'NR'
  /** Niue. */
  | 'NU'
  /** New Zealand. */
  | 'NZ'
  /** Oman. */
  | 'OM'
  /** Panama. */
  | 'PA'
  /** Peru. */
  | 'PE'
  /** French Polynesia. */
  | 'PF'
  /** Papua New Guinea. */
  | 'PG'
  /** Philippines. */
  | 'PH'
  /** Pakistan. */
  | 'PK'
  /** Poland. */
  | 'PL'
  /** St. Pierre & Miquelon. */
  | 'PM'
  /** Pitcairn Islands. */
  | 'PN'
  /** Palestinian Territories. */
  | 'PS'
  /** Portugal. */
  | 'PT'
  /** Paraguay. */
  | 'PY'
  /** Qatar. */
  | 'QA'
  /** Réunion. */
  | 'RE'
  /** Romania. */
  | 'RO'
  /** Serbia. */
  | 'RS'
  /** Russia. */
  | 'RU'
  /** Rwanda. */
  | 'RW'
  /** Saudi Arabia. */
  | 'SA'
  /** Solomon Islands. */
  | 'SB'
  /** Seychelles. */
  | 'SC'
  /** Sudan. */
  | 'SD'
  /** Sweden. */
  | 'SE'
  /** Singapore. */
  | 'SG'
  /** St. Helena. */
  | 'SH'
  /** Slovenia. */
  | 'SI'
  /** Svalbard & Jan Mayen. */
  | 'SJ'
  /** Slovakia. */
  | 'SK'
  /** Sierra Leone. */
  | 'SL'
  /** San Marino. */
  | 'SM'
  /** Senegal. */
  | 'SN'
  /** Somalia. */
  | 'SO'
  /** Suriname. */
  | 'SR'
  /** South Sudan. */
  | 'SS'
  /** São Tomé & Príncipe. */
  | 'ST'
  /** El Salvador. */
  | 'SV'
  /** Sint Maarten. */
  | 'SX'
  /** Syria. */
  | 'SY'
  /** Eswatini. */
  | 'SZ'
  /** Tristan da Cunha. */
  | 'TA'
  /** Turks & Caicos Islands. */
  | 'TC'
  /** Chad. */
  | 'TD'
  /** French Southern Territories. */
  | 'TF'
  /** Togo. */
  | 'TG'
  /** Thailand. */
  | 'TH'
  /** Tajikistan. */
  | 'TJ'
  /** Tokelau. */
  | 'TK'
  /** Timor-Leste. */
  | 'TL'
  /** Turkmenistan. */
  | 'TM'
  /** Tunisia. */
  | 'TN'
  /** Tonga. */
  | 'TO'
  /** Turkey. */
  | 'TR'
  /** Trinidad & Tobago. */
  | 'TT'
  /** Tuvalu. */
  | 'TV'
  /** Taiwan. */
  | 'TW'
  /** Tanzania. */
  | 'TZ'
  /** Ukraine. */
  | 'UA'
  /** Uganda. */
  | 'UG'
  /** U.S. Outlying Islands. */
  | 'UM'
  /** United States. */
  | 'US'
  /** Uruguay. */
  | 'UY'
  /** Uzbekistan. */
  | 'UZ'
  /** Vatican City. */
  | 'VA'
  /** St. Vincent & Grenadines. */
  | 'VC'
  /** Venezuela. */
  | 'VE'
  /** British Virgin Islands. */
  | 'VG'
  /** Vietnam. */
  | 'VN'
  /** Vanuatu. */
  | 'VU'
  /** Wallis & Futuna. */
  | 'WF'
  /** Samoa. */
  | 'WS'
  /** Kosovo. */
  | 'XK'
  /** Yemen. */
  | 'YE'
  /** Mayotte. */
  | 'YT'
  /** South Africa. */
  | 'ZA'
  /** Zambia. */
  | 'ZM'
  /** Zimbabwe. */
  | 'ZW'
  /** Unknown Region. */
  | 'ZZ';

/**
 * The fields required to specify a harmonized system code.
 *
 */
export type CountryHarmonizedSystemCodeInput = {
  /** The ISO 3166-1 alpha-2 country code for the country that issued the specified harmonized system code. */
  countryCode: CountryCode;
  /** Country specific harmonized system code. */
  harmonizedSystemCode: Scalars['String'];
};

/** Specifies the input fields required to create a media object. */
export type CreateMediaInput = {
  /** The alt text associated with the media. */
  alt?: InputMaybe<Scalars['String']>;
  /** The media content type. */
  mediaContentType: MediaContentType;
  /** The original source of the media object. This might be an external URL or a staged upload URL. */
  originalSource: Scalars['String'];
};

/** The part of the image that should remain after cropping. */
export type CropRegion =
  /** Keep the bottom of the image. */
  | 'BOTTOM'
  /** Keep the center of the image. */
  | 'CENTER'
  /** Keep the left of the image. */
  | 'LEFT'
  /** Keep the right of the image. */
  | 'RIGHT'
  /** Keep the top of the image. */
  | 'TOP';

/**
 * The three-letter currency codes that represent the world currencies used in stores. These include standard ISO 4217 codes, legacy codes,
 * and non-standard codes.
 *
 */
export type CurrencyCode =
  /** United Arab Emirates Dirham (AED). */
  | 'AED'
  /** Afghan Afghani (AFN). */
  | 'AFN'
  /** Albanian Lek (ALL). */
  | 'ALL'
  /** Armenian Dram (AMD). */
  | 'AMD'
  /** Netherlands Antillean Guilder. */
  | 'ANG'
  /** Angolan Kwanza (AOA). */
  | 'AOA'
  /** Argentine Pesos (ARS). */
  | 'ARS'
  /** Australian Dollars (AUD). */
  | 'AUD'
  /** Aruban Florin (AWG). */
  | 'AWG'
  /** Azerbaijani Manat (AZN). */
  | 'AZN'
  /** Bosnia and Herzegovina Convertible Mark (BAM). */
  | 'BAM'
  /** Barbadian Dollar (BBD). */
  | 'BBD'
  /** Bangladesh Taka (BDT). */
  | 'BDT'
  /** Bulgarian Lev (BGN). */
  | 'BGN'
  /** Bahraini Dinar (BHD). */
  | 'BHD'
  /** Burundian Franc (BIF). */
  | 'BIF'
  /** Bermudian Dollar (BMD). */
  | 'BMD'
  /** Brunei Dollar (BND). */
  | 'BND'
  /** Bolivian Boliviano (BOB). */
  | 'BOB'
  /** Brazilian Real (BRL). */
  | 'BRL'
  /** Bahamian Dollar (BSD). */
  | 'BSD'
  /** Bhutanese Ngultrum (BTN). */
  | 'BTN'
  /** Botswana Pula (BWP). */
  | 'BWP'
  /** Belarusian Ruble (BYN). */
  | 'BYN'
  /** Belarusian Ruble (BYR). */
  | 'BYR'
  /** Belize Dollar (BZD). */
  | 'BZD'
  /** Canadian Dollars (CAD). */
  | 'CAD'
  /** Congolese franc (CDF). */
  | 'CDF'
  /** Swiss Francs (CHF). */
  | 'CHF'
  /** Chilean Peso (CLP). */
  | 'CLP'
  /** Chinese Yuan Renminbi (CNY). */
  | 'CNY'
  /** Colombian Peso (COP). */
  | 'COP'
  /** Costa Rican Colones (CRC). */
  | 'CRC'
  /** Cape Verdean escudo (CVE). */
  | 'CVE'
  /** Czech Koruny (CZK). */
  | 'CZK'
  /** Djiboutian Franc (DJF). */
  | 'DJF'
  /** Danish Kroner (DKK). */
  | 'DKK'
  /** Dominican Peso (DOP). */
  | 'DOP'
  /** Algerian Dinar (DZD). */
  | 'DZD'
  /** Egyptian Pound (EGP). */
  | 'EGP'
  /** Eritrean Nakfa (ERN). */
  | 'ERN'
  /** Ethiopian Birr (ETB). */
  | 'ETB'
  /** Euro (EUR). */
  | 'EUR'
  /** Fijian Dollars (FJD). */
  | 'FJD'
  /** Falkland Islands Pounds (FKP). */
  | 'FKP'
  /** United Kingdom Pounds (GBP). */
  | 'GBP'
  /** Georgian Lari (GEL). */
  | 'GEL'
  /** Ghanaian Cedi (GHS). */
  | 'GHS'
  /** Gibraltar Pounds (GIP). */
  | 'GIP'
  /** Gambian Dalasi (GMD). */
  | 'GMD'
  /** Guinean Franc (GNF). */
  | 'GNF'
  /** Guatemalan Quetzal (GTQ). */
  | 'GTQ'
  /** Guyanese Dollar (GYD). */
  | 'GYD'
  /** Hong Kong Dollars (HKD). */
  | 'HKD'
  /** Honduran Lempira (HNL). */
  | 'HNL'
  /** Croatian Kuna (HRK). */
  | 'HRK'
  /** Haitian Gourde (HTG). */
  | 'HTG'
  /** Hungarian Forint (HUF). */
  | 'HUF'
  /** Indonesian Rupiah (IDR). */
  | 'IDR'
  /** Israeli New Shekel (NIS). */
  | 'ILS'
  /** Indian Rupees (INR). */
  | 'INR'
  /** Iraqi Dinar (IQD). */
  | 'IQD'
  /** Iranian Rial (IRR). */
  | 'IRR'
  /** Icelandic Kronur (ISK). */
  | 'ISK'
  /** Jersey Pound. */
  | 'JEP'
  /** Jamaican Dollars (JMD). */
  | 'JMD'
  /** Jordanian Dinar (JOD). */
  | 'JOD'
  /** Japanese Yen (JPY). */
  | 'JPY'
  /** Kenyan Shilling (KES). */
  | 'KES'
  /** Kyrgyzstani Som (KGS). */
  | 'KGS'
  /** Cambodian Riel. */
  | 'KHR'
  /** Kiribati Dollar (KID). */
  | 'KID'
  /** Comorian Franc (KMF). */
  | 'KMF'
  /** South Korean Won (KRW). */
  | 'KRW'
  /** Kuwaiti Dinar (KWD). */
  | 'KWD'
  /** Cayman Dollars (KYD). */
  | 'KYD'
  /** Kazakhstani Tenge (KZT). */
  | 'KZT'
  /** Laotian Kip (LAK). */
  | 'LAK'
  /** Lebanese Pounds (LBP). */
  | 'LBP'
  /** Sri Lankan Rupees (LKR). */
  | 'LKR'
  /** Liberian Dollar (LRD). */
  | 'LRD'
  /** Lesotho Loti (LSL). */
  | 'LSL'
  /** Lithuanian Litai (LTL). */
  | 'LTL'
  /** Latvian Lati (LVL). */
  | 'LVL'
  /** Libyan Dinar (LYD). */
  | 'LYD'
  /** Moroccan Dirham. */
  | 'MAD'
  /** Moldovan Leu (MDL). */
  | 'MDL'
  /** Malagasy Ariary (MGA). */
  | 'MGA'
  /** Macedonia Denar (MKD). */
  | 'MKD'
  /** Burmese Kyat (MMK). */
  | 'MMK'
  /** Mongolian Tugrik. */
  | 'MNT'
  /** Macanese Pataca (MOP). */
  | 'MOP'
  /** Mauritanian Ouguiya (MRU). */
  | 'MRU'
  /** Mauritian Rupee (MUR). */
  | 'MUR'
  /** Maldivian Rufiyaa (MVR). */
  | 'MVR'
  /** Malawian Kwacha (MWK). */
  | 'MWK'
  /** Mexican Pesos (MXN). */
  | 'MXN'
  /** Malaysian Ringgits (MYR). */
  | 'MYR'
  /** Mozambican Metical. */
  | 'MZN'
  /** Namibian Dollar. */
  | 'NAD'
  /** Nigerian Naira (NGN). */
  | 'NGN'
  /** Nicaraguan Córdoba (NIO). */
  | 'NIO'
  /** Norwegian Kroner (NOK). */
  | 'NOK'
  /** Nepalese Rupee (NPR). */
  | 'NPR'
  /** New Zealand Dollars (NZD). */
  | 'NZD'
  /** Omani Rial (OMR). */
  | 'OMR'
  /** Panamian Balboa (PAB). */
  | 'PAB'
  /** Peruvian Nuevo Sol (PEN). */
  | 'PEN'
  /** Papua New Guinean Kina (PGK). */
  | 'PGK'
  /** Philippine Peso (PHP). */
  | 'PHP'
  /** Pakistani Rupee (PKR). */
  | 'PKR'
  /** Polish Zlotych (PLN). */
  | 'PLN'
  /** Paraguayan Guarani (PYG). */
  | 'PYG'
  /** Qatari Rial (QAR). */
  | 'QAR'
  /** Romanian Lei (RON). */
  | 'RON'
  /** Serbian dinar (RSD). */
  | 'RSD'
  /** Russian Rubles (RUB). */
  | 'RUB'
  /** Rwandan Franc (RWF). */
  | 'RWF'
  /** Saudi Riyal (SAR). */
  | 'SAR'
  /** Solomon Islands Dollar (SBD). */
  | 'SBD'
  /** Seychellois Rupee (SCR). */
  | 'SCR'
  /** Sudanese Pound (SDG). */
  | 'SDG'
  /** Swedish Kronor (SEK). */
  | 'SEK'
  /** Singapore Dollars (SGD). */
  | 'SGD'
  /** Saint Helena Pounds (SHP). */
  | 'SHP'
  /** Sierra Leonean Leone (SLL). */
  | 'SLL'
  /** Somali Shilling (SOS). */
  | 'SOS'
  /** Surinamese Dollar (SRD). */
  | 'SRD'
  /** South Sudanese Pound (SSP). */
  | 'SSP'
  /** Sao Tome And Principe Dobra (STD). */
  | 'STD'
  /** Sao Tome And Principe Dobra (STN). */
  | 'STN'
  /** Syrian Pound (SYP). */
  | 'SYP'
  /** Swazi Lilangeni (SZL). */
  | 'SZL'
  /** Thai baht (THB). */
  | 'THB'
  /** Tajikistani Somoni (TJS). */
  | 'TJS'
  /** Turkmenistani Manat (TMT). */
  | 'TMT'
  /** Tunisian Dinar (TND). */
  | 'TND'
  /** Tongan Pa'anga (TOP). */
  | 'TOP'
  /** Turkish Lira (TRY). */
  | 'TRY'
  /** Trinidad and Tobago Dollars (TTD). */
  | 'TTD'
  /** Taiwan Dollars (TWD). */
  | 'TWD'
  /** Tanzanian Shilling (TZS). */
  | 'TZS'
  /** Ukrainian Hryvnia (UAH). */
  | 'UAH'
  /** Ugandan Shilling (UGX). */
  | 'UGX'
  /** United States Dollars (USD). */
  | 'USD'
  /** Uruguayan Pesos (UYU). */
  | 'UYU'
  /** Uzbekistan som (UZS). */
  | 'UZS'
  /** Venezuelan Bolivares (VED). */
  | 'VED'
  /** Venezuelan Bolivares (VEF). */
  | 'VEF'
  /** Venezuelan Bolivares (VES). */
  | 'VES'
  /** Vietnamese đồng (VND). */
  | 'VND'
  /** Vanuatu Vatu (VUV). */
  | 'VUV'
  /** Samoan Tala (WST). */
  | 'WST'
  /** Central African CFA Franc (XAF). */
  | 'XAF'
  /** East Caribbean Dollar (XCD). */
  | 'XCD'
  /** West African CFA franc (XOF). */
  | 'XOF'
  /** CFP Franc (XPF). */
  | 'XPF'
  /** Unrecognized currency. */
  | 'XXX'
  /** Yemeni Rial (YER). */
  | 'YER'
  /** South African Rand (ZAR). */
  | 'ZAR'
  /** Zambian Kwacha (ZMW). */
  | 'ZMW';

/**
 * The source that collected the customer's consent to receive marketing materials.
 *
 */
export type CustomerConsentCollectedFrom =
  /**
   * The customer consent was collected outside of Shopify.
   *
   */
  | 'OTHER'
  /**
   * The customer consent was collected by Shopify.
   *
   */
  | 'SHOPIFY';

/** Specifies the customer to delete. */
export type CustomerDeleteInput = {
  /** The ID of the customer to delete. */
  id: Scalars['ID'];
};

/**
 * Possible marketing states for the customer’s email address.
 *
 */
export type CustomerEmailAddressMarketingState =
  /**
   * The customer’s email address marketing state is invalid.
   *
   */
  | 'INVALID'
  /**
   * The customer is not subscribed to email marketing.
   *
   */
  | 'NOT_SUBSCRIBED'
  /**
   * The customer is in the process of subscribing to email marketing.
   *
   */
  | 'PENDING'
  /**
   * The customer is subscribed to email marketing.
   *
   */
  | 'SUBSCRIBED'
  /**
   * The customer is not subscribed to email marketing but was previously subscribed.
   *
   */
  | 'UNSUBSCRIBED';

/**
 * The different levels related to whether a customer has opted in to having their opened emails tracked.
 *
 */
export type CustomerEmailAddressOpenTrackingLevel =
  /**
   * The customer has opted in to having their open emails tracked.
   *
   */
  | 'OPTED_IN'
  /**
   * The customer has opted out of having their open emails tracked.
   *
   */
  | 'OPTED_OUT'
  /**
   * The customer has not specified whether they want to opt in or out of having their open emails tracked.
   *
   */
  | 'UNKNOWN';

/**
 * Information that describes when a customer consented to
 *         receiving marketing material by email.
 */
export type CustomerEmailMarketingConsentInput = {
  /**
   * The latest date and time when the customer consented or objected to
   *           receiving marketing material by email.
   */
  consentUpdatedAt?: InputMaybe<Scalars['DateTime']>;
  /** The customer opt-in level at the time of subscribing to marketing material. */
  marketingOptInLevel?: InputMaybe<CustomerMarketingOptInLevel>;
  /**
   * The current marketing state associated with the customer's email.
   *           If the customer doesn't have an email, then this field is `null`.
   */
  marketingState: CustomerEmailMarketingState;
};

/**
 * The email consent information to update for a given customer ID.
 *
 */
export type CustomerEmailMarketingConsentUpdateInput = {
  /** The ID of the customer for which to update the email marketing consent information. The customer must have a unique email address associated to the record. If not, add the email address using the `customerUpdate` mutation first. */
  customerId: Scalars['ID'];
  /** The marketing consent information when the customer consented to receiving marketing material by email. */
  emailMarketingConsent: CustomerEmailMarketingConsentInput;
};

/** Possible error codes that can be returned by `CustomerEmailMarketingConsentUpdateUserError`. */
export type CustomerEmailMarketingConsentUpdateUserErrorCode =
  /** The input value isn't included in the list. */
  | 'INCLUSION'
  /** Unexpected internal error happened. */
  | 'INTERNAL_ERROR'
  /** The input value is invalid. */
  | 'INVALID'
  /** Missing a required argument. */
  | 'MISSING_ARGUMENT';

/**
 * The possible email marketing states for a customer.
 *
 */
export type CustomerEmailMarketingState =
  /**
   * The customer’s email address marketing state is invalid.
   *
   */
  | 'INVALID'
  /**
   * The customer isn't subscribed to email marketing.
   *
   */
  | 'NOT_SUBSCRIBED'
  /**
   * The customer is in the process of subscribing to email marketing.
   *
   */
  | 'PENDING'
  /**
   * The customer's personal data is erased. This value is internally-set and read-only.
   *
   */
  | 'REDACTED'
  /**
   * The customer is subscribed to email marketing.
   *
   */
  | 'SUBSCRIBED'
  /**
   * The customer isn't currently subscribed to email marketing but was previously subscribed.
   *
   */
  | 'UNSUBSCRIBED';

/** Provides the fields and values to use when creating or updating a customer. */
export type CustomerInput = {
  /** The addresses for a customer. */
  addresses?: InputMaybe<Array<MailingAddressInput>>;
  /** The unique email address of the customer. */
  email?: InputMaybe<Scalars['String']>;
  /**
   * Information that describes when the customer consented to receiving marketing
   *         material by email. The `email` field is required when creating a customer with email marketing
   *         consent information.
   */
  emailMarketingConsent?: InputMaybe<CustomerEmailMarketingConsentInput>;
  /** The customer's first name. */
  firstName?: InputMaybe<Scalars['String']>;
  /** The ID of the customer to update. */
  id?: InputMaybe<Scalars['ID']>;
  /** The customer's last name. */
  lastName?: InputMaybe<Scalars['String']>;
  /** The customer's locale. */
  locale?: InputMaybe<Scalars['String']>;
  /** Additional metafields to associate to the customer. */
  metafields?: InputMaybe<Array<MetafieldInput>>;
  /** A note about the customer. */
  note?: InputMaybe<Scalars['String']>;
  /** The unique phone number for the customer. */
  phone?: InputMaybe<Scalars['String']>;
  /** The private metafields to associate with the customer. */
  privateMetafields?: InputMaybe<Array<PrivateMetafieldInput>>;
  /**
   * The marketing consent information when the customer consented to receiving marketing
   *         material by SMS. The `phone` field is required when creating a customer with SMS
   *         marketing consent information.
   */
  smsMarketingConsent?: InputMaybe<CustomerSmsMarketingConsentInput>;
  /**
   * A list of tags to associate with the customer. Can be an array or a comma-separated list. Example values: `["tag1", "tag2", "tag3"]`, `"tag1, tag2, tag3"`
   *
   * Updating `tags` overwrites any existing tags that were previously added to the customer. To add new tags without overwriting
   * existing tags, use the [tagsAdd](https://shopify.dev/api/admin-graphql/latest/mutations/tagsadd)
   * mutation.
   *
   */
  tags?: InputMaybe<Array<Scalars['String']>>;
  /** Whether the customer is exempt from paying taxes on their order. */
  taxExempt?: InputMaybe<Scalars['Boolean']>;
  /** The list of tax exemptions to apply to the customer. */
  taxExemptions?: InputMaybe<Array<TaxExemption>>;
};

/**
 * The possible values for the marketing subscription opt-in level enabled at the time the customer consented to receive marketing information.
 *
 * The levels are defined by [the M3AAWG best practices guideline
 *   document](https://www.m3aawg.org/sites/maawg/files/news/M3AAWG_Senders_BCP_Ver3-2015-02.pdf).
 *
 */
export type CustomerMarketingOptInLevel =
  /**
   * After providing their information, the customer receives a confirmation and is required to
   * perform a intermediate step before receiving marketing information.
   *
   */
  | 'CONFIRMED_OPT_IN'
  /**
   * After providing their information, the customer receives marketing information without any
   * intermediate steps.
   *
   */
  | 'SINGLE_OPT_IN'
  /**
   * The customer receives marketing information but how they were opted in is unknown.
   *
   */
  | 'UNKNOWN';

/** Possible error codes that can be returned by `CustomerPaymentMethodGetUpdateUrlUserError`. */
export type CustomerPaymentMethodGetUpdateUrlUserErrorCode =
  /** Customer doesn't exist. */
  | 'CUSTOMER_DOES_NOT_EXIST'
  /** Invalid payment instrument. */
  | 'INVALID_INSTRUMENT'
  /** Payment method doesn't exist. */
  | 'PAYMENT_METHOD_DOES_NOT_EXIST'
  /** Too many requests. */
  | 'TOO_MANY_REQUESTS';

/**
 * Input for a remote gateway payment method, only one remote reference permitted.
 *
 */
export type CustomerPaymentMethodRemoteInput = {
  /**
   * The input fields for a remote authorize net customer profile.
   *
   */
  authorizeNetCustomerPaymentProfile?: InputMaybe<RemoteAuthorizeNetCustomerPaymentProfileInput>;
  /** The input fields for a remote Braintree customer profile. */
  braintreePaymentMethod?: InputMaybe<RemoteBraintreePaymentMethodInput>;
  /**
   * Input containing the fields for a remote stripe payment method.
   *
   */
  stripePaymentMethod?: InputMaybe<RemoteStripePaymentMethodInput>;
};

/** Possible error codes that can be returned by `CustomerPaymentMethodRemoteUserError`. */
export type CustomerPaymentMethodRemoteUserErrorCode =
  /** Authorize.net is not enabled for subscriptions. */
  | 'AUTHORIZE_NET_NOT_ENABLED_FOR_SUBSCRIPTIONS'
  /** Braintree is not enabled for subscriptions. */
  | 'BRAINTREE_NOT_ENABLED_FOR_SUBSCRIPTIONS'
  /** Exactly one remote reference is required. */
  | 'EXACTLY_ONE_REMOTE_REFERENCE_REQUIRED'
  /** The input value is invalid. */
  | 'INVALID'
  /** The input value needs to be blank. */
  | 'PRESENT'
  /** The input value is already taken. */
  | 'TAKEN';

/** The revocation reason types for a customer payment method. */
export type CustomerPaymentMethodRevocationReason =
  /** The Authorize.net payment gateway is not enabled. */
  | 'AUTHORIZE_NET_GATEWAY_NOT_ENABLED'
  /** Authorize.net did not return any payment methods. Make sure that the correct Authorize.net account is linked. */
  | 'AUTHORIZE_NET_RETURNED_NO_PAYMENT_METHOD'
  /** Failed to contact Braintree API. */
  | 'BRAINTREE_API_AUTHENTICATION_ERROR'
  /** The Braintree payment gateway is not enabled. */
  | 'BRAINTREE_GATEWAY_NOT_ENABLED'
  /** The Braintree payment method type should be a credit card or Apple Pay card. */
  | 'BRAINTREE_PAYMENT_METHOD_NOT_CARD'
  /** Braintree returned no payment methods. Make sure the correct Braintree account is linked. */
  | 'BRAINTREE_RETURNED_NO_PAYMENT_METHOD'
  /** The credit card failed to update. */
  | 'FAILED_TO_UPDATE_CREDIT_CARD'
  /** The payment method was manually revoked. */
  | 'MANUALLY_REVOKED'
  /** The payment method was replaced with an existing payment method. The associated contracts have been migrated to the other payment method. */
  | 'MERGED'
  /** Failed to contact the Stripe API. */
  | 'STRIPE_API_AUTHENTICATION_ERROR'
  /** Invalid request. Failed to retrieve payment method from Stripe. */
  | 'STRIPE_API_INVALID_REQUEST_ERROR'
  /** The Stripe payment gateway is not enabled. */
  | 'STRIPE_GATEWAY_NOT_ENABLED'
  /** The Stripe payment method type should be card. */
  | 'STRIPE_PAYMENT_METHOD_NOT_CARD'
  /** Stripe did not return any payment methods. Make sure that the correct Stripe account is linked. */
  | 'STRIPE_RETURNED_NO_PAYMENT_METHOD';

/** Possible error codes that can be returned by `CustomerPaymentMethodUserError`. */
export type CustomerPaymentMethodUserErrorCode =
  /** The input value is invalid. */
  | 'INVALID'
  /** The input value needs to be blank. */
  | 'PRESENT'
  /** The input value is already taken. */
  | 'TAKEN';

/** The valid tiers for the predicted spend of a customer with a shop. */
export type CustomerPredictedSpendTier =
  /**
   * The customer's spend is higher than the 70th percentile of the shop's customer sales.
   *
   */
  | 'HIGH'
  /**
   * The customer's spend is lower than the 10th percentile of the shop's customer sales, including customers who didn't repurchase.
   *
   */
  | 'LOW'
  /**
   * The customer's spend is between the 10th and 70th percentile of the shop's customer sales.
   *
   */
  | 'MEDIUM';

/**
 * The possible product subscription states for a customer, as defined by the customer's subscription contracts.
 *
 */
export type CustomerProductSubscriberStatus =
  /**
   * The customer has at least one active subscription contract.
   *
   */
  | 'ACTIVE'
  /**
   * The customer's last subscription contract was cancelled and there are no other active or paused
   * subscription contracts.
   *
   */
  | 'CANCELLED'
  /**
   * The customer's last subscription contract expired and there are no other active or paused
   * subscription contracts.
   *
   */
  | 'EXPIRED'
  /**
   * The customer's last subscription contract failed and there are no other active or paused
   * subscription contracts.
   *
   */
  | 'FAILED'
  /**
   * The customer has never had a subscription contract.
   *
   */
  | 'NEVER_SUBSCRIBED'
  /**
   * The customer has at least one paused subscription contract and there are no other active
   * subscription contracts.
   *
   */
  | 'PAUSED';

/** The set of valid sort keys for the CustomerSavedSearch query. */
export type CustomerSavedSearchSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `name` value. */
  | 'NAME'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** Possible error codes that can be returned by `CustomerSmsMarketingConsentError`. */
export type CustomerSmsMarketingConsentErrorCode =
  /** The input value isn't included in the list. */
  | 'INCLUSION'
  /** Unexpected internal error happened. */
  | 'INTERNAL_ERROR'
  /** The input value is invalid. */
  | 'INVALID'
  /** Missing a required argument. */
  | 'MISSING_ARGUMENT';

/**
 * The marketing consent information when the customer consented to
 *         receiving marketing material by SMS.
 */
export type CustomerSmsMarketingConsentInput = {
  /**
   * The date and time when the customer consented to receive marketing material by SMS.
   * If no date is provided, then the date and time when the consent information was sent is used.
   *
   */
  consentUpdatedAt?: InputMaybe<Scalars['DateTime']>;
  /**
   * The marketing subscription opt-in level that was set when the customer consented to receive marketing information.
   *
   */
  marketingOptInLevel?: InputMaybe<CustomerMarketingOptInLevel>;
  /** The current SMS marketing state for the customer. */
  marketingState: CustomerSmsMarketingState;
};

/**
 * The SMS marketing consent information to update for a given customer ID.
 *
 */
export type CustomerSmsMarketingConsentUpdateInput = {
  /** The ID of the customer to update the SMS marketing consent information for. The customer must have a unique phone number associated to the record. If not, add the phone number using the `customerUpdate` mutation first. */
  customerId: Scalars['ID'];
  /** The marketing consent information when the customer consented to receiving marketing material by SMS. */
  smsMarketingConsent: CustomerSmsMarketingConsentInput;
};

/**
 * The valid SMS marketing states for a customer’s phone number.
 *
 */
export type CustomerSmsMarketingState =
  /**
   * The customer hasn't subscribed to SMS marketing.
   *
   */
  | 'NOT_SUBSCRIBED'
  /**
   * The customer is in the process of subscribing to SMS marketing.
   *
   */
  | 'PENDING'
  /**
   * The customer's personal data is erased. This value is internally-set and read-only.
   *
   */
  | 'REDACTED'
  /**
   * The customer is subscribed to SMS marketing.
   *
   */
  | 'SUBSCRIBED'
  /**
   * The customer isn't currently subscribed to SMS marketing but was previously subscribed.
   *
   */
  | 'UNSUBSCRIBED';

/** The set of valid sort keys for the Customer query. */
export type CustomerSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `last_order_date` value. */
  | 'LAST_ORDER_DATE'
  /** Sort by the `location` value. */
  | 'LOCATION'
  /** Sort by the `name` value. */
  | 'NAME'
  /** Sort by the `orders_count` value. */
  | 'ORDERS_COUNT'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `total_spent` value. */
  | 'TOTAL_SPENT'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** The valid values for the state of a customer's account with a shop. */
export type CustomerState =
  /**
   * The customer declined the email invite to create an account.
   *
   */
  | 'DECLINED'
  /**
   * The customer doesn't have an active account. Customer accounts can be disabled from the Shopify admin at any time.
   *
   */
  | 'DISABLED'
  /**
   * The customer has created an account.
   *
   */
  | 'ENABLED'
  /**
   * The customer has received an email invite to create an account.
   *
   */
  | 'INVITED';

/** Days of the week from Monday to Sunday. */
export type DayOfTheWeek =
  /** Friday. */
  | 'FRIDAY'
  /** Monday. */
  | 'MONDAY'
  /** Saturday. */
  | 'SATURDAY'
  /** Sunday. */
  | 'SUNDAY'
  /** Thursday. */
  | 'THURSDAY'
  /** Tuesday. */
  | 'TUESDAY'
  /** Wednesday. */
  | 'WEDNESDAY';

/** Possible error codes that can be returned by `DelegateAccessTokenCreateUserError`. */
export type DelegateAccessTokenCreateUserErrorCode =
  /** The parent access token can't be a delegate token. */
  | 'DELEGATE_ACCESS_TOKEN'
  /** The access scope can't be empty. */
  | 'EMPTY_ACCESS_SCOPE'
  /** The delegate token can't expire after the parent token. */
  | 'EXPIRES_AFTER_PARENT'
  /** The expires_in value must be greater than 0. */
  | 'NEGATIVE_EXPIRES_IN'
  /** Persistence failed. */
  | 'PERSISTENCE_FAILED'
  /** The parent access token can't have a refresh token. */
  | 'REFRESH_TOKEN'
  /** Unknown scopes. */
  | 'UNKNOWN_SCOPES';

/** The input fields for a delegate access token. */
export type DelegateAccessTokenInput = {
  /** The list of scopes that will be delegated to the new access token. */
  delegateAccessScope: Array<Scalars['String']>;
  /** The amount of time, in seconds, after which the delegate access token is no longer valid. */
  expiresIn?: InputMaybe<Scalars['Int']>;
};

/** The set of valid sort keys for the DeletionEvent query. */
export type DeletionEventSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** The supported subject types of deletion events. */
export type DeletionEventSubjectType =
  | 'COLLECTION'
  | 'PRODUCT';

/** The field type that the condition will be applied to. */
export type DeliveryConditionField =
  /** The condition will check against the total price of the order. */
  | 'TOTAL_PRICE'
  /** The condition will check against the total weight of the order. */
  | 'TOTAL_WEIGHT';

/** The operator to use to determine if the condition passes. */
export type DeliveryConditionOperator =
  /** The condition will check whether the field is greater than or equal to the criterion. */
  | 'GREATER_THAN_OR_EQUAL_TO'
  /** The condition will check if the field is less than or equal to the criterion. */
  | 'LESS_THAN_OR_EQUAL_TO';

/** The input fields to specify a country. */
export type DeliveryCountryInput = {
  /** The country code of the country in the ISO 3166-1 alpha-2 format. */
  code?: InputMaybe<CountryCode>;
  /** Associate all available provinces with this country. */
  includeAllProvinces?: InputMaybe<Scalars['Boolean']>;
  /** The regions associated with this country. */
  provinces?: InputMaybe<Array<DeliveryProvinceInput>>;
  /** Whether the country is a part of the 'Rest of World' shipping zone. */
  restOfWorld?: InputMaybe<Scalars['Boolean']>;
};

/** Reasons the shop is blocked from converting to full multi-location delivery profiles mode. */
export type DeliveryLegacyModeBlockedReason =
  /** Multi-Location mode is disabled. The shop can't convert to full multi-location delivery profiles mode. */
  | 'MULTI_LOCATION_DISABLED'
  /** There are no locations for this store that can fulfill online orders. */
  | 'NO_LOCATIONS_FULFILLING_ONLINE_ORDERS';

/** The input fields for a delivery zone associated to a location group and profile. */
export type DeliveryLocationGroupZoneInput = {
  /** A list of countries to associate with the zone. */
  countries?: InputMaybe<Array<DeliveryCountryInput>>;
  /** A globally-unique identifier of the zone. */
  id?: InputMaybe<Scalars['ID']>;
  /** A list of method definitions to create. */
  methodDefinitionsToCreate?: InputMaybe<Array<DeliveryMethodDefinitionInput>>;
  /** A list of method definitions to update. */
  methodDefinitionsToUpdate?: InputMaybe<Array<DeliveryMethodDefinitionInput>>;
  /** The name of the zone. */
  name?: InputMaybe<Scalars['String']>;
};

/** The input fields for a method definition. */
export type DeliveryMethodDefinitionInput = {
  /** Whether to use this method definition during rate calculation. */
  active?: InputMaybe<Scalars['Boolean']>;
  /** A list of conditions to update on the method definition. */
  conditionsToUpdate?: InputMaybe<Array<DeliveryUpdateConditionInput>>;
  /** The description of the method definition. */
  description?: InputMaybe<Scalars['String']>;
  /** A globally-unique identifier of the method definition. Use only when updating a method definiton. */
  id?: InputMaybe<Scalars['ID']>;
  /** The name of the method definition. */
  name?: InputMaybe<Scalars['String']>;
  /** A participant to apply to the method definition. */
  participant?: InputMaybe<DeliveryParticipantInput>;
  /** A list of price conditions on the method definition. */
  priceConditionsToCreate?: InputMaybe<Array<DeliveryPriceConditionInput>>;
  /** A rate definition to apply to the method definition. */
  rateDefinition?: InputMaybe<DeliveryRateDefinitionInput>;
  /** A list of weight conditions on the method definition. */
  weightConditionsToCreate?: InputMaybe<Array<DeliveryWeightConditionInput>>;
};

/** The different types of method definitions to filter by. */
export type DeliveryMethodDefinitionType =
  /** A static merchant-defined rate. */
  | 'MERCHANT'
  /** A dynamic participant rate. */
  | 'PARTICIPANT';

/** Possible method types that a delivery method can have. */
export type DeliveryMethodType =
  /** The order is delivered using a local delivery service. */
  | 'LOCAL'
  /** No delivery is needed. */
  | 'NONE'
  /** The order is picked up by the customer. */
  | 'PICK_UP'
  /** The order is delivered to a retail store. */
  | 'RETAIL'
  /** The order is shipped. */
  | 'SHIPPING';

/** The input fields for a participant. */
export type DeliveryParticipantInput = {
  /**
   * Whether to automatically display new shipping services to the customer when a service becomes available.
   *
   */
  adaptToNewServices?: InputMaybe<Scalars['Boolean']>;
  /** The ID of the carrier service for this participant. */
  carrierServiceId?: InputMaybe<Scalars['ID']>;
  /** The fixed feed that is defined by the merchant for this participant. */
  fixedFee?: InputMaybe<MoneyInput>;
  /** The ID of the participant. */
  id?: InputMaybe<Scalars['ID']>;
  /** The list of shipping services offered by the participant. */
  participantServices?: InputMaybe<Array<DeliveryParticipantServiceInput>>;
  /** The merchant-defined percentage-of-rate fee for this participant. */
  percentageOfRateFee?: InputMaybe<Scalars['Float']>;
};

/** The input fields for a shipping service provided by a participant. */
export type DeliveryParticipantServiceInput = {
  /** Whether the service is active. */
  active: Scalars['Boolean'];
  /** The name of the service. */
  name: Scalars['String'];
};

/** The input fields for a price-based condition of a delivery method definition. */
export type DeliveryPriceConditionInput = {
  /** The monetary value to compare the price of an order to. */
  criteria?: InputMaybe<MoneyInput>;
  /** The operator to use for comparison. */
  operator?: InputMaybe<DeliveryConditionOperator>;
};

/** The input fields for a delivery profile. */
export type DeliveryProfileInput = {
  /** The list of condition IDs to delete. */
  conditionsToDelete?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * The list of location groups to be created in the delivery profile.
   *
   * **Note:** due to the potential complexity of the nested data, it is recommended to send no more than 5 location groups per each request.
   *
   */
  locationGroupsToCreate?: InputMaybe<Array<DeliveryProfileLocationGroupInput>>;
  /** The list of location groups to be deleted from the delivery profile. */
  locationGroupsToDelete?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * The list of location groups to be updated in the delivery profile.
   *
   * **Note:** due to the potential complexity of the nested data, it is recommended to send no more than 5 location groups per each request.
   *
   */
  locationGroupsToUpdate?: InputMaybe<Array<DeliveryProfileLocationGroupInput>>;
  /** The list of method definition IDs to delete. */
  methodDefinitionsToDelete?: InputMaybe<Array<Scalars['ID']>>;
  /** The name of the delivery profile. */
  name?: InputMaybe<Scalars['String']>;
  /** The list of location groups associated with the delivery profile. */
  profileLocationGroups?: InputMaybe<Array<DeliveryProfileLocationGroupInput>>;
  /** The list of selling plan groups to be associated with the delivery profile. */
  sellingPlanGroupsToAssociate?: InputMaybe<Array<Scalars['ID']>>;
  /** The list of selling plan groups to be dissociated with the delivery profile. */
  sellingPlanGroupsToDissociate?: InputMaybe<Array<Scalars['ID']>>;
  /** The list of product variant IDs to be associated with the delivery profile. */
  variantsToAssociate?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * The list of product variant IDs to be dissociated from the delivery profile.
   * The dissociated product variants are moved back to the default delivery profile.
   *
   */
  variantsToDissociate?: InputMaybe<Array<Scalars['ID']>>;
  /** The list of zone IDs to delete. */
  zonesToDelete?: InputMaybe<Array<Scalars['ID']>>;
};

/** The input fields for a location group associated to a delivery profile. */
export type DeliveryProfileLocationGroupInput = {
  /** The globally-unique identifier of the delivery profile location group. */
  id?: InputMaybe<Scalars['ID']>;
  /** The list of location IDs to be moved to this location group. */
  locations?: InputMaybe<Array<Scalars['ID']>>;
  /**
   * The list of location group zones to create.
   *
   * **Note:** due to the potential complexity of the nested data, it is recommended to send no more than 5 zones per each request.
   *
   */
  zonesToCreate?: InputMaybe<Array<DeliveryLocationGroupZoneInput>>;
  /**
   * The list of location group zones to update.
   *
   * **Note:** due to the potential complexity of the nested data, it is recommended to send no more than 5 zones per each request.
   *
   */
  zonesToUpdate?: InputMaybe<Array<DeliveryLocationGroupZoneInput>>;
};

/** The input fields to specify a region. */
export type DeliveryProvinceInput = {
  /** The code of the region. */
  code: Scalars['String'];
};

/** The input fields for a rate definition. */
export type DeliveryRateDefinitionInput = {
  /** A globally-unique identifier of the rate definition. */
  id?: InputMaybe<Scalars['ID']>;
  /** The price of the rate definition. */
  price: MoneyInput;
};

/** The input fields for shop-level delivery settings. */
export type DeliverySettingInput = {
  /** Whether legacy compatability mode is enabled for the multi-location delivery profiles feature. */
  legacyModeProfiles?: InputMaybe<Scalars['Boolean']>;
};

/** The input fields for updating the condition of a delivery method definition. */
export type DeliveryUpdateConditionInput = {
  /** The value that will be used in comparison. */
  criteria?: InputMaybe<Scalars['Float']>;
  /** The unit associated with the value that will be used in comparison. */
  criteriaUnit?: InputMaybe<Scalars['String']>;
  /** The property of an order that will be used in comparison. */
  field?: InputMaybe<DeliveryConditionField>;
  /** A globally-unique identifier of the condition. */
  id: Scalars['ID'];
  /** The operator to use for comparison. */
  operator?: InputMaybe<DeliveryConditionOperator>;
};

/** The input fields for a weight-based condition of a delivery method definition. */
export type DeliveryWeightConditionInput = {
  /** The weight value to compare the weight of an order to. */
  criteria?: InputMaybe<WeightInput>;
  /** The operator to use for comparison. */
  operator?: InputMaybe<DeliveryConditionOperator>;
};

/** Digital wallet, such as Apple Pay, which can be used for accelerated checkouts. */
export type DigitalWallet =
  /** Android Pay. */
  | 'ANDROID_PAY'
  /** Apple Pay. */
  | 'APPLE_PAY'
  /** Google Pay. */
  | 'GOOGLE_PAY'
  /** Shopify Pay. */
  | 'SHOPIFY_PAY';

/** Specifies the value of the discount and how it is applied. */
export type DiscountAmountInput = {
  /** The value of the discount. */
  amount?: InputMaybe<Scalars['Decimal']>;
  /** If true, then the discount is applied to each of the entitled items. If false, then the amount is split across all of the entitled items. */
  appliesOnEachItem?: InputMaybe<Scalars['Boolean']>;
};

/** The method by which the discount's value is allocated onto its entitled lines. */
export type DiscountApplicationAllocationMethod =
  /** The value is spread across all entitled lines. */
  | 'ACROSS'
  /** The value is applied onto every entitled line. */
  | 'EACH'
  /** The value is specifically applied onto a particular line. */
  | 'ONE';

/** The level at which the discount's value is applied. */
export type DiscountApplicationLevel =
  /**
   * The discount is applied at the line level.
   * Line level discounts are factored into the discountedUnitPriceSet on line items.
   *
   */
  | 'LINE'
  /**
   * The discount is applied at the order level.
   * Order level discounts are not factored into the discountedUnitPriceSet on line items.
   *
   */
  | 'ORDER';

/**
 * The lines on the order to which the discount is applied, of the type defined by
 * the discount application's `targetType`. For example, the value `ENTITLED`, combined with a `targetType` of
 * `LINE_ITEM`, applies the discount on all line items that are entitled to the discount.
 * The value `ALL`, combined with a `targetType` of `SHIPPING_LINE`, applies the discount on all shipping lines.
 *
 */
export type DiscountApplicationTargetSelection =
  /** The discount is allocated onto all the lines. */
  | 'ALL'
  /** The discount is allocated onto only the lines that it's entitled for. */
  | 'ENTITLED'
  /** The discount is allocated onto explicitly chosen lines. */
  | 'EXPLICIT';

/**
 * The type of line (i.e. line item or shipping line) on an order that the discount is applicable towards.
 *
 */
export type DiscountApplicationTargetType =
  /** The discount applies onto line items. */
  | 'LINE_ITEM'
  /** The discount applies onto shipping lines. */
  | 'SHIPPING_LINE';

/** The input fields to create an app discount. */
export type DiscountAutomaticAppInput = {
  /** Determines which discount classes the discount can combine with. */
  combinesWith?: InputMaybe<DiscountCombinesWithInput>;
  /** The date and time when the discount ends. For open-ended discounts, use `null`. */
  endsAt?: InputMaybe<Scalars['DateTime']>;
  /** The ID of the function providing the app discount type. */
  functionId?: InputMaybe<Scalars['String']>;
  /** Additional metafields to associate to the discount. */
  metafields?: InputMaybe<Array<MetafieldInput>>;
  /** The date and time when the discount starts. */
  startsAt?: InputMaybe<Scalars['DateTime']>;
  /** The title of the discount. */
  title?: InputMaybe<Scalars['String']>;
};

/** The input that's used to create or update an automatic basic discount. */
export type DiscountAutomaticBasicInput = {
  /** Determines which discount classes the discount can combine with. */
  combinesWith?: InputMaybe<DiscountCombinesWithInput>;
  /** Information about the qualifying items and their discount. */
  customerGets?: InputMaybe<DiscountCustomerGetsInput>;
  /** The date and time when the discount ends. For open-ended discounts, use `null`. */
  endsAt?: InputMaybe<Scalars['DateTime']>;
  /** The minimum subtotal or quantity that's required for the discount to be applied. */
  minimumRequirement?: InputMaybe<DiscountMinimumRequirementInput>;
  /** The date and time when the discount starts. */
  startsAt?: InputMaybe<Scalars['DateTime']>;
  /** The title of the discount. */
  title?: InputMaybe<Scalars['String']>;
};

/** Specifies input field to create or update an automatic Buy X, Get Y (BXGY) discount. */
export type DiscountAutomaticBxgyInput = {
  /** Determines which discount classes the discount can combine with. */
  combinesWith?: InputMaybe<DiscountCombinesWithInput>;
  /** The qualifying items and the quantity of each one that the customer has to buy to be eligible for the discount. */
  customerBuys?: InputMaybe<DiscountCustomerBuysInput>;
  /** The qualifying items in an order, the quantity of each one, and the total value of the discount. */
  customerGets?: InputMaybe<DiscountCustomerGetsInput>;
  /** The date and time when the discount ends. For open-ended discounts, use `null`. */
  endsAt?: InputMaybe<Scalars['DateTime']>;
  /** The date and time when the discount starts. */
  startsAt?: InputMaybe<Scalars['DateTime']>;
  /** The title of the discount. */
  title?: InputMaybe<Scalars['String']>;
  /** The maximum number of times that the discount can be applied to an order. */
  usesPerOrderLimit?: InputMaybe<Scalars['UnsignedInt64']>;
};

/** The class of the discount for combining purposes. */
export type DiscountClass =
  /** Combined as an order discount. */
  | 'ORDER'
  /** Combined as a product discount. */
  | 'PRODUCT'
  /** Combined as a shipping discount. */
  | 'SHIPPING';

/** The input fields to create a code app discount. */
export type DiscountCodeAppInput = {
  /** Whether the discount can be applied only once per customer. */
  appliesOncePerCustomer?: InputMaybe<Scalars['Boolean']>;
  /** The code to use the discount. */
  code?: InputMaybe<Scalars['String']>;
  /** Determines which discount classes the discount can combine with. */
  combinesWith?: InputMaybe<DiscountCombinesWithInput>;
  /** The customers that can use the discount. */
  customerSelection?: InputMaybe<DiscountCustomerSelectionInput>;
  /** The date and time when the discount ends. For open-ended discounts, use `null`. */
  endsAt?: InputMaybe<Scalars['DateTime']>;
  /** The ID of the function providing the app discount type. */
  functionId?: InputMaybe<Scalars['String']>;
  /** Additional metafields to associate to the discount. */
  metafields?: InputMaybe<Array<MetafieldInput>>;
  /** The date and time when the discount starts. */
  startsAt?: InputMaybe<Scalars['DateTime']>;
  /** The title of the discount. */
  title?: InputMaybe<Scalars['String']>;
  /** The maximum number of times that the discount can be used. For open-ended discounts, use `null`. */
  usageLimit?: InputMaybe<Scalars['Int']>;
};

/** The input field to create or update a basic code discount. */
export type DiscountCodeBasicInput = {
  /** Whether the discount can be applied only once per customer. */
  appliesOncePerCustomer?: InputMaybe<Scalars['Boolean']>;
  /** The code to use the discount. */
  code?: InputMaybe<Scalars['String']>;
  /** Determines which discount classes the discount can combine with. */
  combinesWith?: InputMaybe<DiscountCombinesWithInput>;
  /** The qualifying items in an order, the quantity of each one, and the total value of the discount. */
  customerGets?: InputMaybe<DiscountCustomerGetsInput>;
  /** The customers that can use the discount. */
  customerSelection?: InputMaybe<DiscountCustomerSelectionInput>;
  /** The date and time when the discount ends. For open-ended discounts, use `null`. */
  endsAt?: InputMaybe<Scalars['DateTime']>;
  /** The minimum subtotal or quantity that's required for the discount to be applied. */
  minimumRequirement?: InputMaybe<DiscountMinimumRequirementInput>;
  /** The number of times a discount applies on recurring purchases (subscriptions). */
  recurringCycleLimit?: InputMaybe<Scalars['Int']>;
  /** The date and time when the discount starts. */
  startsAt?: InputMaybe<Scalars['DateTime']>;
  /** The title of the discount. */
  title?: InputMaybe<Scalars['String']>;
  /** The maximum number of times that the discount can be used. For open-ended discounts, use `null`. */
  usageLimit?: InputMaybe<Scalars['Int']>;
};

/** Specifies input field to create or update a BXGY code discount. */
export type DiscountCodeBxgyInput = {
  /** Whether the discount can be applied only once per customer. */
  appliesOncePerCustomer?: InputMaybe<Scalars['Boolean']>;
  /** The code to use the discount. */
  code?: InputMaybe<Scalars['String']>;
  /** Determines which discount classes the discount can combine with. */
  combinesWith?: InputMaybe<DiscountCombinesWithInput>;
  /** The qualifying items and the quantity of each one that the customer has to buy to be eligible for the discount. */
  customerBuys?: InputMaybe<DiscountCustomerBuysInput>;
  /** The qualifying items that will be discounted, the quantity of each one, and the total value of the discount. */
  customerGets?: InputMaybe<DiscountCustomerGetsInput>;
  /** The customers that are eligible to use the discount. */
  customerSelection?: InputMaybe<DiscountCustomerSelectionInput>;
  /** The date and time when the discount ends. For open-ended discounts, use `null`. */
  endsAt?: InputMaybe<Scalars['DateTime']>;
  /** The date and time when the discount starts. */
  startsAt?: InputMaybe<Scalars['DateTime']>;
  /** The title of the discount. */
  title?: InputMaybe<Scalars['String']>;
  /** The maximum number of times that the discount can be used. For open-ended discounts, use `null`. */
  usageLimit?: InputMaybe<Scalars['Int']>;
  /** The maximum number of times that the discount can be applied to an order. */
  usesPerOrderLimit?: InputMaybe<Scalars['Int']>;
};

/** Specifies input field to create or update free shipping code discount. */
export type DiscountCodeFreeShippingInput = {
  /** Whether the discount applies on regular one-time-purchase items. */
  appliesOnOneTimePurchase?: InputMaybe<Scalars['Boolean']>;
  /** Whether the discount applies on subscription items. */
  appliesOnSubscription?: InputMaybe<Scalars['Boolean']>;
  /** Whether the discount can be applied only once per customer. */
  appliesOncePerCustomer?: InputMaybe<Scalars['Boolean']>;
  /** The code to use the discount. */
  code?: InputMaybe<Scalars['String']>;
  /** Determines which discount classes the shipping discount can combine with. */
  combinesWith?: InputMaybe<DiscountCombinesWithInput>;
  /** The customers that are eligible to use the discount. */
  customerSelection?: InputMaybe<DiscountCustomerSelectionInput>;
  /** A list of destinations where the discount will apply. */
  destination?: InputMaybe<DiscountShippingDestinationSelectionInput>;
  /** The date and time when the discount ends. For open-ended discounts, use `null`. */
  endsAt?: InputMaybe<Scalars['DateTime']>;
  /** The maximum shipping price that qualifies for the discount. */
  maximumShippingPrice?: InputMaybe<Scalars['Decimal']>;
  /** The minimum subtotal or quantity that's required for the discount to be applied. */
  minimumRequirement?: InputMaybe<DiscountMinimumRequirementInput>;
  /** The number of times a discount applies on recurring purchases (subscriptions). */
  recurringCycleLimit?: InputMaybe<Scalars['Int']>;
  /** The date and time when the discount starts. */
  startsAt?: InputMaybe<Scalars['DateTime']>;
  /** The title of the discount. */
  title?: InputMaybe<Scalars['String']>;
  /** The maximum number of times that the discount can be used. For open-ended discounts, use `null`. */
  usageLimit?: InputMaybe<Scalars['Int']>;
};

/** The set of valid sort keys for the DiscountCode query. */
export type DiscountCodeSortKeys =
  /** Sort by the `code` value. */
  | 'CODE'
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** Specifies the collections attached to a discount. */
export type DiscountCollectionsInput = {
  /** Specifies list of collection ids to add. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** Specifies list of collection ids to remove. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** Determines which discount classes the discount can combine with. */
export type DiscountCombinesWithInput = {
  /** Combines with order discounts. */
  orderDiscounts?: InputMaybe<Scalars['Boolean']>;
  /** Combines with product discounts. */
  productDiscounts?: InputMaybe<Scalars['Boolean']>;
  /** Combines with shipping discounts. */
  shippingDiscounts?: InputMaybe<Scalars['Boolean']>;
};

/** Specifies a list of countries to add or remove from the free shipping discount. */
export type DiscountCountriesInput = {
  /** The country codes to add to the list of countries where the discount applies. */
  add?: InputMaybe<Array<CountryCode>>;
  /** Whether the discount code is applicable to countries that have not been defined in the shop's shipping zones. */
  includeRestOfWorld?: InputMaybe<Scalars['Boolean']>;
  /** The country codes to remove from the list of countries where the discount applies. */
  remove?: InputMaybe<Array<CountryCode>>;
};

/** The prerequisite items and quantity for the discount. */
export type DiscountCustomerBuysInput = {
  /** The IDs of items that the customer buys. The items can be either collections or products. */
  items?: InputMaybe<DiscountItemsInput>;
  /** The quantity of prerequisite items. */
  value?: InputMaybe<DiscountCustomerBuysValueInput>;
};

/** The prerequisite quantity or the minimum purchase amount required for the discount. */
export type DiscountCustomerBuysValueInput = {
  /** The prerequisite minimum purchase amount required for the discount to be applicable. */
  amount?: InputMaybe<Scalars['Decimal']>;
  /** The quantity of prerequisite items. */
  quantity?: InputMaybe<Scalars['UnsignedInt64']>;
};

/** Specifies the items that will be discounted, the quantity of items that will be discounted, and the value of discount. */
export type DiscountCustomerGetsInput = {
  /** Whether the discount applies on regular one-time-purchase items. */
  appliesOnOneTimePurchase?: InputMaybe<Scalars['Boolean']>;
  /** Whether the discount applies on subscription items. */
  appliesOnSubscription?: InputMaybe<Scalars['Boolean']>;
  /** The IDs of the items that the customer gets. The items can be either collections or products. */
  items?: InputMaybe<DiscountItemsInput>;
  /** The quantity of items discounted and the discount value. */
  value?: InputMaybe<DiscountCustomerGetsValueInput>;
};

/** Specifies the quantity of items discounted and the discount value. */
export type DiscountCustomerGetsValueInput = {
  /** The value of the discount. */
  discountAmount?: InputMaybe<DiscountAmountInput>;
  /** The quantity of the items that are discounted and the discount value. */
  discountOnQuantity?: InputMaybe<DiscountOnQuantityInput>;
  /** The percentage value of the discount. Value must be between 0.00 - 1.00. */
  percentage?: InputMaybe<Scalars['Float']>;
};

/** Specifies which customer segments to add to or remove from the discount. */
export type DiscountCustomerSegmentsInput = {
  /** A list of customer segments to add to the current list of customer segments. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** A list of customer segments to remove from the current list of customer segments. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** Specifies the customers who can use this discount. */
export type DiscountCustomerSelectionInput = {
  /** Whether all customers can use this discount. */
  all?: InputMaybe<Scalars['Boolean']>;
  /** The list of customer segment IDs to add or remove from the list of customer segments. */
  customerSegments?: InputMaybe<DiscountCustomerSegmentsInput>;
  /** The list of customer IDs to add or remove from the list of customers. */
  customers?: InputMaybe<DiscountCustomersInput>;
};

/** Specifies which customers to add to or remove from the discount. */
export type DiscountCustomersInput = {
  /** A list of customers to add to the current list of customers who can use the discount. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** A list of customers to remove from the current list of customers who can use the discount. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** Specifies how the discount will be applied. Currently, only percentage off is supported. */
export type DiscountEffectInput = {
  /** The percentage value of the discount. Value must be between 0.00 - 1.00. */
  percentage?: InputMaybe<Scalars['Float']>;
};

/** Possible error codes that can be returned by `DiscountUserError`. */
export type DiscountErrorCode =
  /** The active period overlaps with other automatic discounts. At any given time, only one automatic discount can be active. */
  | 'ACTIVE_PERIOD_OVERLAP'
  /** The input value is blank. */
  | 'BLANK'
  /** The attribute selection contains conflicting settings. */
  | 'CONFLICT'
  /** The input value is already present. */
  | 'DUPLICATE'
  /** The input value should be equal to the value allowed. */
  | 'EQUAL_TO'
  /** The value exceeded the maximum allowed value. */
  | 'EXCEEDED_MAX'
  /** The input value should be greater than the minimum allowed value. */
  | 'GREATER_THAN'
  /** The input value should be greater than or equal to the minimum value allowed. */
  | 'GREATER_THAN_OR_EQUAL_TO'
  /** The value is already present through another selection. */
  | 'IMPLICIT_DUPLICATE'
  /** The input value isn't included in the list. */
  | 'INCLUSION'
  /** Unexpected internal error happened. */
  | 'INTERNAL_ERROR'
  /** The input value is invalid. */
  | 'INVALID'
  /** The `combinesWith` settings are invalid for the discount class. */
  | 'INVALID_COMBINES_WITH_FOR_DISCOUNT_CLASS'
  /** The discountClass is invalid for the price rule. */
  | 'INVALID_DISCOUNT_CLASS_FOR_PRICE_RULE'
  /** The input value should be less than the maximum value allowed. */
  | 'LESS_THAN'
  /** The input value should be less than or equal to the maximum value allowed. */
  | 'LESS_THAN_OR_EQUAL_TO'
  /** The active period overlaps with too many other app-provided discounts. There's a limit on the number of app discounts that can be active at any given time. */
  | 'MAX_APP_DISCOUNTS'
  /** Specify a minimum subtotal or a quantity, but not both. */
  | 'MINIMUM_SUBTOTAL_AND_QUANTITY_RANGE_BOTH_PRESENT'
  /** Missing a required argument. */
  | 'MISSING_ARGUMENT'
  /** The input value needs to be blank. */
  | 'PRESENT'
  /** The input value is already taken. */
  | 'TAKEN'
  /** The input value is too long. */
  | 'TOO_LONG'
  /** Too many arguments provided. */
  | 'TOO_MANY_ARGUMENTS'
  /** The input value is too short. */
  | 'TOO_SHORT'
  /** The value is outside of the allowed range. */
  | 'VALUE_OUTSIDE_RANGE';

/** The items attached to a discount. You can specify the discount items by product ID or collection ID. */
export type DiscountItemsInput = {
  /** Whether all items should be selected. */
  all?: InputMaybe<Scalars['Boolean']>;
  /** The collections that are attached to a discount. */
  collections?: InputMaybe<DiscountCollectionsInput>;
  /** The products and product variants that are attached to a discount. */
  products?: InputMaybe<DiscountProductsInput>;
};

/** The minimum quantity required for the discount. */
export type DiscountMinimumQuantityInput = {
  /** The minimum quantity of items that's required for the discount to be applied. */
  greaterThanOrEqualToQuantity?: InputMaybe<Scalars['UnsignedInt64']>;
};

/** The minimum quantity or subtotal required for a discount. */
export type DiscountMinimumRequirementInput = {
  /** The minimum required quantity. */
  quantity?: InputMaybe<DiscountMinimumQuantityInput>;
  /** The minimum required subtotal. */
  subtotal?: InputMaybe<DiscountMinimumSubtotalInput>;
};

/** The minimum subtotal required for a discount. */
export type DiscountMinimumSubtotalInput = {
  /** The minimum subtotal that's required for the discount to be applied. */
  greaterThanOrEqualToSubtotal?: InputMaybe<Scalars['Decimal']>;
};

/** Specifies the quantity of items discounted and the discount value. */
export type DiscountOnQuantityInput = {
  /** The percentage value of the discount. */
  effect?: InputMaybe<DiscountEffectInput>;
  /** The quantity of items that are discounted. */
  quantity?: InputMaybe<Scalars['UnsignedInt64']>;
};

/** Specifies the products and product variants attached to a discount. */
export type DiscountProductsInput = {
  /** Specifies list of product variant ids to add. */
  productVariantsToAdd?: InputMaybe<Array<Scalars['ID']>>;
  /** Specifies list of product variant ids to remove. */
  productVariantsToRemove?: InputMaybe<Array<Scalars['ID']>>;
  /** Specifies list of product ids to add. */
  productsToAdd?: InputMaybe<Array<Scalars['ID']>>;
  /** Specifies list of product ids to remove. */
  productsToRemove?: InputMaybe<Array<Scalars['ID']>>;
};

/** The redeem code to attach to a discount. */
export type DiscountRedeemCodeInput = {
  /** The code that a customer can use at checkout to receive the associated discount. */
  code: Scalars['String'];
};

/** The type of page where a shareable discount URL lands. */
export type DiscountShareableUrlTargetType =
  /** The URL lands on a collection page. */
  | 'COLLECTION'
  /** The URL lands on a home page. */
  | 'HOME'
  /** The URL lands on a product page. */
  | 'PRODUCT';

/** Specifies the destinations where the free shipping discount will be applied. */
export type DiscountShippingDestinationSelectionInput = {
  /** Whether the discount code applies to all countries. */
  all?: InputMaybe<Scalars['Boolean']>;
  /** A list of countries where the discount code will apply. */
  countries?: InputMaybe<DiscountCountriesInput>;
};

/** The set of valid sort keys for the Discount query. */
export type DiscountSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `ends_at` value. */
  | 'ENDS_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `starts_at` value. */
  | 'STARTS_AT'
  /** Sort by the `title` value. */
  | 'TITLE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** The status of the discount. */
export type DiscountStatus =
  /** The discount is active. */
  | 'ACTIVE'
  /** The discount is expired. */
  | 'EXPIRED'
  /** The discount is scheduled. */
  | 'SCHEDULED';

/** The type of line (line item or shipping line) on an order that the subscription discount is applicable towards. */
export type DiscountTargetType =
  /** The discount applies onto line items. */
  | 'LINE_ITEM'
  /** The discount applies onto shipping lines. */
  | 'SHIPPING_LINE';

/** The type of the subscription discount. */
export type DiscountType =
  /** Code discount type. */
  | 'CODE_DISCOUNT'
  /** Manual discount type. */
  | 'MANUAL';

/** Possible error codes that can be returned by `DisputeEvidenceUpdateUserError`. */
export type DisputeEvidenceUpdateUserErrorCode =
  /** Dispute evidence could not be found. */
  | 'DISPUTE_EVIDENCE_NOT_FOUND'
  /** Evidence already accepted. */
  | 'EVIDENCE_ALREADY_ACCEPTED'
  /** Evidence past due date. */
  | 'EVIDENCE_PAST_DUE_DATE'
  /** Combined files size is too large. */
  | 'FILES_SIZE_EXCEEDED_LIMIT'
  /** The input value is invalid. */
  | 'INVALID'
  /** Individual file size is too large. */
  | 'TOO_LARGE';

/** The possible statuses of a dispute. */
export type DisputeStatus =
  | 'ACCEPTED'
  | 'CHARGE_REFUNDED'
  | 'LOST'
  | 'NEEDS_RESPONSE'
  | 'UNDER_REVIEW'
  | 'WON';

/** The possible types for a dispute. */
export type DisputeType =
  /** The dispute has turned into a chargeback. */
  | 'CHARGEBACK'
  /** The dispute is in the inquiry phase. */
  | 'INQUIRY';

/** The input fields for applying an order-level discount to a draft order. */
export type DraftOrderAppliedDiscountInput = {
  /**
   * The applied amount of the discount.
   * If the type of the discount is fixed amount, then this is the fixed dollar amount.
   * If the type is percentage, then this is the subtotal multiplied by the percentage.
   *
   */
  amount?: InputMaybe<Scalars['Money']>;
  /**
   * Reason for the discount.
   *
   */
  description?: InputMaybe<Scalars['String']>;
  /**
   * Title of the discount.
   *
   */
  title?: InputMaybe<Scalars['String']>;
  /**
   * The value of the discount.
   * If the type of the discount is fixed amount, then this is a fixed dollar amount.
   * If the type is percentage, then this is the percentage.
   *
   */
  value: Scalars['Float'];
  /**
   * The type of discount.
   *
   */
  valueType: DraftOrderAppliedDiscountType;
};

/** The valid discount types that can be applied to a draft order. */
export type DraftOrderAppliedDiscountType =
  /** A fixed amount in the store's currency. */
  | 'FIXED_AMOUNT'
  /** A percentage of the order subtotal. */
  | 'PERCENTAGE';

/** Specifies the draft order to delete by its ID. */
export type DraftOrderDeleteInput = {
  /**
   * The ID of the draft order to delete.
   *
   */
  id: Scalars['ID'];
};

/** The input fields used to create or update a draft order. */
export type DraftOrderInput = {
  /**
   * The discount that will be applied to the draft order.
   * A draft order line item can have one discount. A draft order can also have one order-level discount.
   *
   */
  appliedDiscount?: InputMaybe<DraftOrderAppliedDiscountInput>;
  /**
   * The mailing address associated with the payment method.
   *
   */
  billingAddress?: InputMaybe<MailingAddressInput>;
  /**
   * Extra information added to the customer.
   *
   */
  customAttributes?: InputMaybe<Array<AttributeInput>>;
  /**
   * The customer's email address.
   *
   */
  email?: InputMaybe<Scalars['String']>;
  /**
   * Product variant line item or custom line item associated to the draft order.
   * Each draft order must include at least one line item.
   *
   */
  lineItems?: InputMaybe<Array<DraftOrderLineItemInput>>;
  /** The localization extensions attached to the draft order. For example, Tax IDs. */
  localizationExtensions?: InputMaybe<Array<LocalizationExtensionInput>>;
  /** The selected market region country code for the draft order. */
  marketRegionCountryCode?: InputMaybe<CountryCode>;
  /**
   * Metafields attached to the draft order.
   *
   */
  metafields?: InputMaybe<Array<MetafieldInput>>;
  /**
   * The text of an optional note that a shop owner can attach to the draft order.
   *
   */
  note?: InputMaybe<Scalars['String']>;
  /** The fields used to create payment terms. */
  paymentTerms?: InputMaybe<PaymentTermsInput>;
  /** The customer's phone number. */
  phone?: InputMaybe<Scalars['String']>;
  /** The payment currency of the customer for this draft order. */
  presentmentCurrencyCode?: InputMaybe<CurrencyCode>;
  /** The private metafields attached to the draft order. */
  privateMetafields?: InputMaybe<Array<PrivateMetafieldInput>>;
  /** The purchasing entity for this draft order. */
  purchasingEntity?: InputMaybe<PurchasingEntityInput>;
  /** Time after which inventory will automatically be restocked. */
  reserveInventoryUntil?: InputMaybe<Scalars['DateTime']>;
  /**
   * The mailing address to where the order will be shipped.
   *
   */
  shippingAddress?: InputMaybe<MailingAddressInput>;
  /**
   * A shipping line object, which details the shipping method used.
   *
   */
  shippingLine?: InputMaybe<ShippingLineInput>;
  /**
   * The source of the checkout.
   *           To use this field for sales attribution, you must register the channels that your app is managing.
   *           You can register the channels that your app is managing by completing
   *           [this Google Form](https://docs.google.com/forms/d/e/1FAIpQLScmVTZRQNjOJ7RD738mL1lGeFjqKVe_FM2tO9xsm21QEo5Ozg/viewform?usp=sf_link).
   *           After you've submitted your request, you need to wait for your request to be processed by Shopify.
   *           You can find a list of your channels in the Partner Dashboard, in your app's Marketplace extension.
   *           You need to specify the handle as the `source_name` value in your request.
   *           The handle is the channel that the order was placed from.
   */
  sourceName?: InputMaybe<Scalars['String']>;
  /**
   * A comma separated list of tags that have been added to the draft order.
   *
   */
  tags?: InputMaybe<Array<Scalars['String']>>;
  /**
   * Whether or not taxes are exempt for the draft order.
   * If false, then Shopify will refer to the taxable field for each line item.
   * If a customer is applied to the draft order, then Shopify will use the customer's tax exempt field instead.
   *
   */
  taxExempt?: InputMaybe<Scalars['Boolean']>;
  /**
   * Sent as part of a draft order object to load customer shipping information.
   *
   */
  useCustomerDefaultAddress?: InputMaybe<Scalars['Boolean']>;
  /** Whether the draft order will be visible to the customer on the self-serve portal. */
  visibleToCustomer?: InputMaybe<Scalars['Boolean']>;
};

/** The input fields used to create a line item for a draft order. */
export type DraftOrderLineItemInput = {
  /**
   * Discount which will be applied to the line item.
   *
   */
  appliedDiscount?: InputMaybe<DraftOrderAppliedDiscountInput>;
  /**
   * Represents a generic custom attribute using a key value pair.
   *
   */
  customAttributes?: InputMaybe<Array<AttributeInput>>;
  /** The price without any discounts applied. This value is ignored when `variantId` is provided. */
  originalUnitPrice?: InputMaybe<Scalars['Money']>;
  /**
   * The number of products that were purchased.
   *
   */
  quantity: Scalars['Int'];
  /**
   * Whether physical shipping is required. This value is ignored when `variantId` is provided.
   *
   */
  requiresShipping?: InputMaybe<Scalars['Boolean']>;
  /** The SKU number of the item. This value is ignored when `variantId` is provided. */
  sku?: InputMaybe<Scalars['String']>;
  /** Whether the item is taxable. This value is ignored when `variantId` is provided. */
  taxable?: InputMaybe<Scalars['Boolean']>;
  /** Title of the item. Ignored when `variantId` is provided. */
  title?: InputMaybe<Scalars['String']>;
  /**
   * The ID of the product variant corresponding to the line item.
   * Null if custom line item. Required if product variant line item.
   *
   */
  variantId?: InputMaybe<Scalars['ID']>;
  /**
   * Specifies the weight unit and value inputs.
   * This value is ignored when `variantId` is provided.
   *
   */
  weight?: InputMaybe<WeightInput>;
};

/** The set of valid sort keys for the DraftOrder query. */
export type DraftOrderSortKeys =
  /** Sort by the `customer_name` value. */
  | 'CUSTOMER_NAME'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `number` value. */
  | 'NUMBER'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `status` value. */
  | 'STATUS'
  /** Sort by the `total_price` value. */
  | 'TOTAL_PRICE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** The valid statuses for a draft order. */
export type DraftOrderStatus =
  /** The draft order has been paid. */
  | 'COMPLETED'
  /** An invoice for the draft order has been sent to the customer. */
  | 'INVOICE_SENT'
  /** The draft order is open. It has not been paid, and an invoice hasn't been sent. */
  | 'OPEN';

/** Specifies the fields for an email. */
export type EmailInput = {
  /** Specifies any bcc recipients for the email. */
  bcc?: InputMaybe<Array<Scalars['String']>>;
  /** Specifies the email body. */
  body?: InputMaybe<Scalars['String']>;
  /** Specifies a custom message to include in the email. */
  customMessage?: InputMaybe<Scalars['String']>;
  /** Specifies the email sender. */
  from?: InputMaybe<Scalars['String']>;
  /** Specifies the email subject. */
  subject?: InputMaybe<Scalars['String']>;
  /** Specifies the email recipient. */
  to?: InputMaybe<Scalars['String']>;
};

/** Possible error codes that can be returned by `ErrorsWebPixelUserError`. */
export type ErrorsWebPixelUserErrorCode =
  /** The input value is blank. */
  | 'BLANK'
  /** The provided settings ID does not match the expected settings definition on the app. */
  | 'INVALID_SETTINGS'
  /** The record with the ID used as the input value couldn't be found. */
  | 'NOT_FOUND'
  /** The input value is already taken. */
  | 'TAKEN'
  /** An error occurred and the web pixel couldnt be deleted. */
  | 'UNABLE_TO_DELETE';

/**
 * Specifies the input fields for an EventBridge webhook subscription.
 *
 */
export type EventBridgeWebhookSubscriptionInput = {
  /** The ARN of the EventBridge partner event source. */
  arn?: InputMaybe<Scalars['ARN']>;
  /** The format in which the webhook subscription should send the data. */
  format?: InputMaybe<WebhookSubscriptionFormat>;
  /** The list of fields to be included in the webhook subscription. */
  includeFields?: InputMaybe<Array<Scalars['String']>>;
  /** The list of namespaces for any metafields that should be included in the webhook subscription. */
  metafieldNamespaces?: InputMaybe<Array<Scalars['String']>>;
};

/** The set of valid sort keys for the Event query. */
export type EventSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** The possible content types for a file object. */
export type FileContentType =
  /** A Shopify-hosted generic file. */
  | 'FILE'
  /** A Shopify-hosted image. */
  | 'IMAGE'
  /** A Shopify-hosted video file. It's recommended to use this type for all video files. */
  | 'VIDEO';

/** The input fields that are required to create a file object. */
export type FileCreateInput = {
  /** The alternative text description of the file. */
  alt?: InputMaybe<Scalars['String']>;
  /** The file content type. If omitted, then Shopify will attempt to determine the content type during file processing. */
  contentType?: InputMaybe<FileContentType>;
  /**
   * An external URL (for images only) or a
   * [staged upload URL](https://shopify.dev/api/admin-graphql/latest/mutations/stageduploadscreate).
   *
   */
  originalSource: Scalars['String'];
};

/** The error types for a file. */
export type FileErrorCode =
  /** File could not be created because embed permissions are disabled for this video. */
  | 'EXTERNAL_VIDEO_EMBED_DISABLED'
  /** File could not be created because video is either not found or still transcoding. */
  | 'EXTERNAL_VIDEO_EMBED_NOT_FOUND_OR_TRANSCODING'
  /** File could not be created because the external video has an invalid aspect ratio. */
  | 'EXTERNAL_VIDEO_INVALID_ASPECT_RATIO'
  /** File could not be created because the external video could not be found. */
  | 'EXTERNAL_VIDEO_NOT_FOUND'
  /** File could not be created because the external video is not listed or is private. */
  | 'EXTERNAL_VIDEO_UNLISTED'
  /** File could not be created because the cumulative file storage limit would be exceeded. */
  | 'FILE_STORAGE_LIMIT_EXCEEDED'
  /** File could not be processed because the source could not be downloaded. */
  | 'GENERIC_FILE_DOWNLOAD_FAILURE'
  /** File could not be created because the size is too large. */
  | 'GENERIC_FILE_INVALID_SIZE'
  /** File could not be processed because the image could not be downloaded. */
  | 'IMAGE_DOWNLOAD_FAILURE'
  /** File could not be processed because the image could not be processed. */
  | 'IMAGE_PROCESSING_FAILURE'
  /** File could not be created because the image has an invalid aspect ratio. */
  | 'INVALID_IMAGE_ASPECT_RATIO'
  /** File could not be created because the image size is too large. */
  | 'INVALID_IMAGE_FILE_SIZE'
  /** File could not be created because the image's resolution exceeds the max limit. */
  | 'INVALID_IMAGE_RESOLUTION'
  /** File could not be processed because the signed URL was invalid. */
  | 'INVALID_SIGNED_URL'
  /** File timed out because it is currently being modified by another operation. */
  | 'MEDIA_TIMEOUT_ERROR'
  /** File could not be created because the model file failed processing. */
  | 'MODEL3D_GLB_OUTPUT_CREATION_ERROR'
  /** File could not be created because the model can't be converted to USDZ format. */
  | 'MODEL3D_GLB_TO_USDZ_CONVERSION_ERROR'
  /** File could not be created because the model file failed processing. */
  | 'MODEL3D_PROCESSING_FAILURE'
  /** File could not be created because the model's thumbnail generation failed. */
  | 'MODEL3D_THUMBNAIL_GENERATION_ERROR'
  /** Model failed validation. */
  | 'MODEL3D_VALIDATION_ERROR'
  /** File error has occurred for an unknown reason. */
  | 'UNKNOWN'
  /** File could not be created because the image is an unsupported file type. */
  | 'UNSUPPORTED_IMAGE_FILE_TYPE'
  /** File could not be created because it has an invalid file type. */
  | 'VIDEO_INVALID_FILETYPE_ERROR'
  /** File could not be created because it does not meet the maximum duration requirement. */
  | 'VIDEO_MAX_DURATION_ERROR'
  /** File could not be created because it does not meet the maximum height requirement. */
  | 'VIDEO_MAX_HEIGHT_ERROR'
  /** File could not be created because it does not meet the maximum width requirement. */
  | 'VIDEO_MAX_WIDTH_ERROR'
  /** File could not be created because the metadata could not be read. */
  | 'VIDEO_METADATA_READ_ERROR'
  /** File could not be created because it does not meet the minimum duration requirement. */
  | 'VIDEO_MIN_DURATION_ERROR'
  /** File could not be created because it does not meet the minimum height requirement. */
  | 'VIDEO_MIN_HEIGHT_ERROR'
  /** File could not be created because it does not meet the minimum width requirement. */
  | 'VIDEO_MIN_WIDTH_ERROR'
  /** Video failed validation. */
  | 'VIDEO_VALIDATION_ERROR';

/** The set of valid sort keys for the File query. */
export type FileSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `filename` value. */
  | 'FILENAME'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `original_upload_size` value. */
  | 'ORIGINAL_UPLOAD_SIZE'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** The possible statuses for a file object. */
export type FileStatus =
  /** File processing has failed. */
  | 'FAILED'
  /** File is being processed. */
  | 'PROCESSING'
  /** File is ready to be displayed. */
  | 'READY'
  /** File has been uploaded but hasn't been processed. */
  | 'UPLOADED';

/** The input fields that are required to update a file object. */
export type FileUpdateInput = {
  /** The alternative text description of the file. */
  alt?: InputMaybe<Scalars['String']>;
  /** The ID of the file to be updated. */
  id: Scalars['ID'];
  /**
   * The source from which to update the media preview image.
   * May be an external URL or a
   * [staged upload URL](https://shopify.dev/api/admin-graphql/latest/mutations/stageduploadscreate).
   *
   */
  previewImageSource?: InputMaybe<Scalars['String']>;
};

/** Possible error codes that can be returned by `FilesUserError`. */
export type FilesErrorCode =
  /** The alt value exceeds the maximum limit of 512 characters. */
  | 'ALT_VALUE_LIMIT_EXCEEDED'
  /** The search term must not be blank. */
  | 'BLANK_SEARCH'
  /** File does not exist. */
  | 'FILE_DOES_NOT_EXIST'
  /** File has a pending operation. */
  | 'FILE_LOCKED'
  /** The input value is invalid. */
  | 'INVALID'
  /** Search query isn't supported. */
  | 'INVALID_QUERY'
  /** At least one argument is required. */
  | 'MISSING_ARGUMENTS'
  /** Exceeded the limit of non-image media per shop. */
  | 'NON_IMAGE_MEDIA_PER_SHOP_LIMIT_EXCEEDED'
  /** Specify one argument: search, IDs, or deleteAll. */
  | 'TOO_MANY_ARGUMENTS'
  /** The file type is not supported. */
  | 'UNACCEPTABLE_ASSET'
  /** The file is not supported on trial accounts. Select a plan to upload this file. */
  | 'UNACCEPTABLE_TRIAL_ASSET'
  /** The file is not supported on trial accounts that have not validated their email. Either select a plan or verify the shop owner email to upload this file. */
  | 'UNACCEPTABLE_UNVERIFIED_TRIAL_ASSET';

/** The display status of a fulfillment. */
export type FulfillmentDisplayStatus =
  /** Displayed as **Attempted delivery**. */
  | 'ATTEMPTED_DELIVERY'
  /** Displayed as **Canceled**. */
  | 'CANCELED'
  /** Displayed as **Confirmed**. */
  | 'CONFIRMED'
  /** Displayed as **Delivered**. */
  | 'DELIVERED'
  /** Displayed as **Failure**. */
  | 'FAILURE'
  /** Displayed as **Fulfilled**. */
  | 'FULFILLED'
  /** Displayed as **In transit**. */
  | 'IN_TRANSIT'
  /** Displayed as **Label printed**. */
  | 'LABEL_PRINTED'
  /** Displayed as **Label purchased**. */
  | 'LABEL_PURCHASED'
  /** Displayed as **Label voided**. */
  | 'LABEL_VOIDED'
  /** Displayed as **Marked as fulfilled**. */
  | 'MARKED_AS_FULFILLED'
  /** Displayed as **Not delivered**. */
  | 'NOT_DELIVERED'
  /** Displayed as **Out for delivery**. */
  | 'OUT_FOR_DELIVERY'
  /** Displayed as **Picked up**. */
  | 'PICKED_UP'
  /** Displayed as **Ready for pickup**. */
  | 'READY_FOR_PICKUP'
  /** Displayed as **Submitted**. */
  | 'SUBMITTED';

/** The set of valid sort keys for the FulfillmentEvent query. */
export type FulfillmentEventSortKeys =
  /** Sort by the `happened_at` value. */
  | 'HAPPENED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** The status that describes a fulfillment or delivery event. */
export type FulfillmentEventStatus =
  /** A delivery was attempted. */
  | 'ATTEMPTED_DELIVERY'
  /** The fulfillment is confirmed. This is the default value when no other information is available. */
  | 'CONFIRMED'
  /** The fulfillment was successfully delivered. */
  | 'DELIVERED'
  /** The fulfillment request failed. */
  | 'FAILURE'
  /** The fulfillment is in transit. */
  | 'IN_TRANSIT'
  /** A purchased shipping label has been printed. */
  | 'LABEL_PRINTED'
  /** A shipping label has been purchased. */
  | 'LABEL_PURCHASED'
  /** The fulfillment is out for delivery. */
  | 'OUT_FOR_DELIVERY'
  /** The fulfillment is ready to be picked up. */
  | 'READY_FOR_PICKUP';

/** The reason for a fulfillment hold. */
export type FulfillmentHoldReason =
  /** The fulfillment hold is applied because payment is pending. */
  | 'AWAITING_PAYMENT'
  /** The fulfillment hold is applied because of a high risk of fraud. */
  | 'HIGH_RISK_OF_FRAUD'
  /** The fulfillment hold is applied because of an incorrect address. */
  | 'INCORRECT_ADDRESS'
  /** The fulfillment hold is applied because inventory is out of stock. */
  | 'INVENTORY_OUT_OF_STOCK'
  /** The fulfillment hold is applied for another reason. */
  | 'OTHER'
  /** The fulfillment hold is applied because of an unknown delivery date. */
  | 'UNKNOWN_DELIVERY_DATE';

/** The actions that can be taken on a fulfillment order. */
export type FulfillmentOrderAction =
  /** Cancels a fulfillment order. The corresponding mutation for this action is `fulfillmentOrderCancel`. */
  | 'CANCEL_FULFILLMENT_ORDER'
  /** Creates a fulfillment for selected line items in the fulfillment order. The corresponding mutation for this action is `fulfillmentCreateV2`. */
  | 'CREATE_FULFILLMENT'
  /** Opens an external URL to initiate the fulfillment process outside Shopify. This action should be paired with `FulfillmentOrderSupportedAction.externalUrl`. */
  | 'EXTERNAL'
  /** Applies a fulfillment hold on an open fulfillment order. The corresponding mutation for this action is `fulfillmentOrderHold`. */
  | 'HOLD'
  /** Marks the fulfillment order as open. The corresponding mutation for this action is `fulfillmentOrderOpen`. */
  | 'MARK_AS_OPEN'
  /** Moves a fulfillment order. The corresponding mutation for this action is `fulfillmentOrderMove`. */
  | 'MOVE'
  /** Releases the fulfillment hold on the fulfillment order. The corresponding mutation for this action is `fulfillmentOrderReleaseHold`. */
  | 'RELEASE_HOLD'
  /** Sends a cancellation request to the fulfillment service of a fulfillment order. The corresponding mutation for this action is `fulfillmentOrderSubmitCancellationRequest`. */
  | 'REQUEST_CANCELLATION'
  /** Sends a request for fulfilling selected line items in a fulfillment order to a fulfillment service. The corresponding mutation for this action is `fulfillmentOrderSubmitFulfillmentRequest`. */
  | 'REQUEST_FULFILLMENT';

/** The assigment status to be used to filter fulfillment orders. */
export type FulfillmentOrderAssignmentStatus =
  /**
   * Fulfillment orders for which the merchant has requested cancellation of
   * the previously accepted fulfillment request.
   *
   */
  | 'CANCELLATION_REQUESTED'
  /**
   * Fulfillment orders for which the merchant's fulfillment request has been accepted.
   * Any number of fulfillments can be created on these fulfillment orders
   * to completely fulfill the requested items.
   *
   */
  | 'FULFILLMENT_ACCEPTED'
  /**
   * Fulfillment orders for which the merchant has requested fulfillment.
   *
   */
  | 'FULFILLMENT_REQUESTED';

/** Input arguments for the fulfillment hold applied on the fulfillment order. */
export type FulfillmentOrderHoldInput = {
  /** Whether the merchant receives a notification about the fulfillment hold. The default value is `false`. */
  notifyMerchant?: InputMaybe<Scalars['Boolean']>;
  /** The reason for the fulfillment hold. */
  reason: FulfillmentHoldReason;
  /** Additional information about the fulfillment hold reason. */
  reasonNotes?: InputMaybe<Scalars['String']>;
};

/** Possible error codes that can be returned by `FulfillmentOrderHoldUserError`. */
export type FulfillmentOrderHoldUserErrorCode =
  /** The fulfillment order could not be found. */
  | 'FULFILLMENT_ORDER_NOT_FOUND'
  /** The input value is already taken. */
  | 'TAKEN';

/**
 * The input fields used to include the quantity of the fulfillment order line item that should be fulfilled.
 *
 */
export type FulfillmentOrderLineItemInput = {
  /** The ID of the fulfillment order line item. */
  id: Scalars['ID'];
  /** The quantity of the fulfillment order line item. */
  quantity: Scalars['Int'];
};

/**
 * The input fields used to include the line items of a specified fulfillment order that should be fulfilled.
 *
 */
export type FulfillmentOrderLineItemsInput = {
  /** The ID of the fulfillment order. */
  fulfillmentOrderId: Scalars['ID'];
  /**
   * The fulfillment order line items to be fulfilled.
   * If left blank, all line items of the fulfillment order will be fulfilled.
   *
   */
  fulfillmentOrderLineItems?: InputMaybe<Array<FulfillmentOrderLineItemInput>>;
};

/** The kinds of request merchants can make to a fulfillment service. */
export type FulfillmentOrderMerchantRequestKind =
  /**
   * The merchant requests cancellation of an `IN_PROGRESS` fulfillment order.
   *
   */
  | 'CANCELLATION_REQUEST'
  /**
   * The merchant requests fulfillment for an `OPEN` fulfillment order.
   *
   */
  | 'FULFILLMENT_REQUEST';

/** The reason for a fulfillment order rejection. */
export type FulfillmentOrderRejectionReason =
  /** The fulfillment order was rejected because of an incorrect address. */
  | 'INCORRECT_ADDRESS'
  /** The fulfillment order was rejected because of an ineligible product. */
  | 'INELIGIBLE_PRODUCT'
  /** The fulfillment order was rejected because inventory is out of stock. */
  | 'INVENTORY_OUT_OF_STOCK'
  /** The fulfillment order was rejected for another reason. */
  | 'OTHER'
  /** The fulfillment order was rejected because of an undeliverable destination. */
  | 'UNDELIVERABLE_DESTINATION';

/** Possible error codes that can be returned by `FulfillmentOrderReleaseHoldUserError`. */
export type FulfillmentOrderReleaseHoldUserErrorCode =
  /** The fulfillment order wasn't found. */
  | 'FULFILLMENT_ORDER_NOT_FOUND';

/** The request status of a fulfillment order. */
export type FulfillmentOrderRequestStatus =
  /** The fulfillment service accepted the merchant's fulfillment request. */
  | 'ACCEPTED'
  /**
   * The fulfillment service accepted the merchant's fulfillment cancellation request.
   *
   */
  | 'CANCELLATION_ACCEPTED'
  /**
   * The fulfillment service rejected the merchant's fulfillment cancellation request.
   *
   */
  | 'CANCELLATION_REJECTED'
  /**
   * The merchant requested a cancellation of the fulfillment request for this fulfillment order.
   *
   */
  | 'CANCELLATION_REQUESTED'
  /** The fulfillment service closed the fulfillment order without completing it. */
  | 'CLOSED'
  /** The fulfillment service rejected the merchant's fulfillment request. */
  | 'REJECTED'
  /** The merchant requested fulfillment for this fulfillment order. */
  | 'SUBMITTED'
  /**
   * The initial request status for the newly-created fulfillment orders. This is the only valid
   * request status for fulfillment orders that aren't assigned to a fulfillment service.
   *
   */
  | 'UNSUBMITTED';

/** Possible error codes that can be returned by `FulfillmentOrderRescheduleUserError`. */
export type FulfillmentOrderRescheduleUserErrorCode =
  /** Fulfillment order could not be found. */
  | 'FULFILLMENT_ORDER_NOT_FOUND';

/** The set of valid sort keys for the FulfillmentOrder query. */
export type FulfillmentOrderSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** The status of a fulfillment order. */
export type FulfillmentOrderStatus =
  /** The fulfillment order has been cancelled by the merchant. */
  | 'CANCELLED'
  /** The fulfillment order has been completed and closed. */
  | 'CLOSED'
  /** The fulfillment order cannot be completed as requested. */
  | 'INCOMPLETE'
  /** The fulfillment order is being processed. */
  | 'IN_PROGRESS'
  /** The fulfillment order is on hold. The fulfillment process can't be initiated until the hold on the fulfillment order is released. */
  | 'ON_HOLD'
  /** The fulfillment order is ready for fulfillment. */
  | 'OPEN'
  /** The fulfillment order is deferred and will be ready for fulfillment after the date and time specified in `fulfill_at`. */
  | 'SCHEDULED';

/** Possible error codes that can be returned by `FulfillmentOrdersSetFulfillmentDeadlineUserError`. */
export type FulfillmentOrdersSetFulfillmentDeadlineUserErrorCode =
  /** The fulfillment orders could not be found. */
  | 'FULFILLMENT_ORDERS_NOT_FOUND';

/** The input fields used to include the address at which the fulfillment occurred. Typically the address of a warehouse or a fulfillment center. */
export type FulfillmentOriginAddressInput = {
  /** The street address of the fulfillment location. */
  address1?: InputMaybe<Scalars['String']>;
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: InputMaybe<Scalars['String']>;
  /** The city in which the fulfillment location is located. */
  city?: InputMaybe<Scalars['String']>;
  /** The country of the fulfillment location. */
  countryCode: Scalars['String'];
  /** The province of the fulfillment location. */
  provinceCode?: InputMaybe<Scalars['String']>;
  /** The zip code of the fulfillment location. */
  zip?: InputMaybe<Scalars['String']>;
};

/** The type of a fulfillment service. */
export type FulfillmentServiceType =
  /** Fulfillment by gift card. */
  | 'GIFT_CARD'
  /** Manual fulfillment by the merchant. */
  | 'MANUAL'
  /** Fullfillment by a third-party fulfillment service. */
  | 'THIRD_PARTY';

/** The status of a fulfillment. */
export type FulfillmentStatus =
  /** The fulfillment was canceled. */
  | 'CANCELLED'
  /** There was an error with the fulfillment request. */
  | 'ERROR'
  /** The fulfillment request failed. */
  | 'FAILURE'
  /**
   * The third-party fulfillment service has acknowledged the fulfillment and is processing it.
   *
   */
  | 'OPEN'
  /**
   * Shopify has created the fulfillment and is waiting for the third-party fulfillment service to transition it to `open` or `success`.
   *
   */
  | 'PENDING'
  /** The fulfillment was completed successfully. */
  | 'SUCCESS';

/** The input fields that specify all possible fields for tracking information. */
export type FulfillmentTrackingInput = {
  /** The name of the tracking company. */
  company?: InputMaybe<Scalars['String']>;
  /** The tracking number of the fulfillment. */
  number?: InputMaybe<Scalars['String']>;
  /** The tracking numbers of the fulfillment, if there are multiple. */
  numbers?: InputMaybe<Array<Scalars['String']>>;
  /** The URL to track the fulfillment. */
  url?: InputMaybe<Scalars['URL']>;
  /** The URLs to track the fulfillment, if there are multiple. */
  urls?: InputMaybe<Array<Scalars['URL']>>;
};

/** The input fields used to create a fulfillment from fulfillment orders. */
export type FulfillmentV2Input = {
  /**
   * Pairs of `fulfillment_order_id` and `fulfillment_order_line_items` that represent the fulfillment
   * order line items that have to be fulfilled for each fulfillment order.  For any given pair, if the
   * fulfillment order line items are left blank then all the fulfillment order line items of the
   * associated fulfillment order ID will be fulfilled.
   *
   */
  lineItemsByFulfillmentOrder: Array<FulfillmentOrderLineItemsInput>;
  /**
   * Whether the customer is notified.
   * If `true`, then a notification is sent when the fulfillment is created.
   *
   */
  notifyCustomer?: InputMaybe<Scalars['Boolean']>;
  /**
   * Address information about the location from which the order was fulfilled.
   *
   */
  originAddress?: InputMaybe<FulfillmentOriginAddressInput>;
  /**
   * The fulfillment's tracking information, including a tracking URL, a tracking number,
   * and the company associated with the fulfillment.
   *
   */
  trackingInfo?: InputMaybe<FulfillmentTrackingInput>;
};

/** Specifies the input fields to issue a gift card. */
export type GiftCardCreateInput = {
  /**
   * The gift card's code. It must be 8-20 characters long and contain only letters(a-z) and numbers(0-9).
   * It is not case sensitive. If not provided, then a random code will be generated.
   *
   */
  code?: InputMaybe<Scalars['String']>;
  /** The ID of the customer who will receive the gift card. Requires `write_customers` access_scope. */
  customerId?: InputMaybe<Scalars['ID']>;
  /**
   * The date at which the gift card will expire. If not provided, then the gift card will never expire.
   *
   */
  expiresOn?: InputMaybe<Scalars['Date']>;
  /** The initial value of the gift card. */
  initialValue: Scalars['Decimal'];
  /** The note associated with the gift card, which is not visible to the customer. */
  note?: InputMaybe<Scalars['String']>;
  /**
   * The suffix of the Liquid template that is used to render the gift card online.
   * For example, if the value is `birthday`, then the gift card is rendered using the template `gift_card.birthday.liquid`.
   * If not provided, then the default `gift_card.liquid` template is used.
   *
   */
  templateSuffix?: InputMaybe<Scalars['String']>;
};

/** Possible error codes that can be returned by `GiftCardUserError`. */
export type GiftCardErrorCode =
  /** The input value should be greater than the minimum allowed value. */
  | 'GREATER_THAN'
  /** Unexpected internal error happened. */
  | 'INTERNAL_ERROR'
  /** The input value is invalid. */
  | 'INVALID'
  /** Missing a required argument. */
  | 'MISSING_ARGUMENT'
  /** The input value is already taken. */
  | 'TAKEN'
  /** The input value is too long. */
  | 'TOO_LONG'
  /** The input value is too short. */
  | 'TOO_SHORT';

/** The set of valid sort keys for the GiftCard query. */
export type GiftCardSortKeys =
  /** Sort by the `amount_spent` value. */
  | 'AMOUNT_SPENT'
  /** Sort by the `balance` value. */
  | 'BALANCE'
  /** Sort by the `code` value. */
  | 'CODE'
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `customer_name` value. */
  | 'CUSTOMER_NAME'
  /** Sort by the `disabled_at` value. */
  | 'DISABLED_AT'
  /** Sort by the `expires_on` value. */
  | 'EXPIRES_ON'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `initial_value` value. */
  | 'INITIAL_VALUE'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** Specifies the input fields to update a gift card. */
export type GiftCardUpdateInput = {
  /**
   * The ID of the customer who will receive the gift card. The ID cannot be changed if the gift card already has an assigned customer ID.
   *
   */
  customerId?: InputMaybe<Scalars['ID']>;
  /**
   * The date at which the gift card will expire. If set to `null`, then the gift card will never expire.
   *
   */
  expiresOn?: InputMaybe<Scalars['Date']>;
  /** The note associated with the gift card, which is not visible to the customer. */
  note?: InputMaybe<Scalars['String']>;
  /**
   * The suffix of the Liquid template that is used to render the gift card online.
   * For example, if the value is `birthday`, then the gift card is rendered using the template `gift_card.birthday.liquid`.
   *
   */
  templateSuffix?: InputMaybe<Scalars['String']>;
};

/** List of supported image content types. */
export type ImageContentType =
  /** A JPG image. */
  | 'JPG'
  /** A PNG image. */
  | 'PNG'
  /** A WEBP image. */
  | 'WEBP';

/** Specifies the input fields for an image. */
export type ImageInput = {
  /** A word or phrase to share the nature or contents of an image. */
  altText?: InputMaybe<Scalars['String']>;
  /** A globally-unique identifier. */
  id?: InputMaybe<Scalars['ID']>;
  /** The URL of the image. May be a staged upload URL. */
  src?: InputMaybe<Scalars['String']>;
};

/**
 * The available options for transforming an image.
 *
 * All transformation options are considered best effort. Any transformation that the original image type doesn't support will be ignored.
 *
 */
export type ImageTransformInput = {
  /**
   * The region of the image to remain after cropping.
   * Must be used in conjunction with the `maxWidth` and/or `maxHeight` fields, where the `maxWidth` and `maxHeight` aren't equal.
   * The `crop` argument should coincide with the smaller value. A smaller `maxWidth` indicates a `LEFT` or `RIGHT` crop, while
   * a smaller `maxHeight` indicates a `TOP` or `BOTTOM` crop. For example, `{ maxWidth: 5, maxHeight: 10, crop: LEFT }` will result
   * in an image with a width of 5 and height of 10, where the right side of the image is removed.
   *
   */
  crop?: InputMaybe<CropRegion>;
  /**
   * Image height in pixels between 1 and 5760.
   *
   */
  maxHeight?: InputMaybe<Scalars['Int']>;
  /**
   * Image width in pixels between 1 and 5760.
   *
   */
  maxWidth?: InputMaybe<Scalars['Int']>;
  /**
   * Convert the source image into the preferred content type.
   * Supported conversions: `.svg` to `.png`, any file type to `.jpg`, and any file type to `.webp`.
   *
   */
  preferredContentType?: InputMaybe<ImageContentType>;
  /**
   * Image size multiplier for high-resolution retina displays. Must be within 1..3.
   *
   */
  scale?: InputMaybe<Scalars['Int']>;
};

/** The incoming line item. */
export type IncomingRequestLineItemInput = {
  /** The ID of the rejected line item. */
  fulfillmentOrderLineItemId: Scalars['ID'];
  /** The rejection message of the line item. */
  message?: InputMaybe<Scalars['String']>;
};

/** Specifies the items and their adjustments. */
export type InventoryAdjustItemInput = {
  /** The change applied to the `available` quantity of the item at the location. */
  availableDelta: Scalars['Int'];
  /** ID of the inventory item to adjust. */
  inventoryItemId: Scalars['ID'];
};

/** Specifies the fields required to adjust the inventory quantity. */
export type InventoryAdjustQuantityInput = {
  /** The change applied to the `available` quantity of the item at the location. */
  availableDelta: Scalars['Int'];
  /** ID of the inventory level to adjust. */
  inventoryLevelId: Scalars['ID'];
};

/** Specifies whether the inventory item should be activated or not at the specified location. */
export type InventoryBulkToggleActivationInput = {
  /** Whether the inventory item can be stocked at the specified location. To deactivate, set the value to false which removes an inventory item's quantities from that location, and turns off inventory at that location. */
  activate: Scalars['Boolean'];
  /** The ID of the location to modify the inventory item's stocked status. */
  locationId: Scalars['ID'];
};

/** Possible error codes that can be returned by `InventoryBulkToggleActivationUserError`. */
export type InventoryBulkToggleActivationUserErrorCode =
  /** An error occurred while setting the activation status. */
  | 'GENERIC_ERROR';

/** Specifies the input fields for an inventory item. */
export type InventoryItemInput = {
  /** Unit cost associated with the inventory item, the currency is the shop's default currency. */
  cost?: InputMaybe<Scalars['Decimal']>;
  /** Whether the inventory item is tracked. */
  tracked?: InputMaybe<Scalars['Boolean']>;
};

/** Inventory item. */
export type InventoryItemUpdateInput = {
  /** Unit cost associated with the inventory item, the currency is the shop's default currency. */
  cost?: InputMaybe<Scalars['Decimal']>;
  /** The ISO 3166-1 alpha-2 country code of where the item originated from. */
  countryCodeOfOrigin?: InputMaybe<CountryCode>;
  /** List of country-specific harmonized system codes. */
  countryHarmonizedSystemCodes?: InputMaybe<Array<CountryHarmonizedSystemCodeInput>>;
  /** The harmonized system code of the inventory item. This must be a number between 6 and 13 digits. */
  harmonizedSystemCode?: InputMaybe<Scalars['String']>;
  /** The ISO 3166-2 alpha-2 province/state code of where the item originated from. */
  provinceCodeOfOrigin?: InputMaybe<Scalars['String']>;
  /** Whether the inventory item is tracked. The value must be true to adjust the item's inventory levels. */
  tracked?: InputMaybe<Scalars['Boolean']>;
};

/** Specifies the input fields for an inventory level. */
export type InventoryLevelInput = {
  /** The available quantity of an inventory item at a location. */
  availableQuantity: Scalars['Int'];
  /** The ID of a location. */
  locationId: Scalars['ID'];
};

/**
 * Specifies the input fields for a LocalizationExtensionInput.
 *
 */
export type LocalizationExtensionInput = {
  /** The key for the localization extension. */
  key: LocalizationExtensionKey;
  /** The localization extension value. */
  value: Scalars['String'];
};

/** The key of a localization extension. */
export type LocalizationExtensionKey =
  /** Extension key 'shipping_credential_br' for country BR. */
  | 'SHIPPING_CREDENTIAL_BR'
  /** Extension key 'shipping_credential_cn' for country CN. */
  | 'SHIPPING_CREDENTIAL_CN'
  /** Extension key 'shipping_credential_kr' for country KR. */
  | 'SHIPPING_CREDENTIAL_KR'
  /** Extension key 'tax_credential_br' for country BR. */
  | 'TAX_CREDENTIAL_BR'
  /** Extension key 'tax_credential_it' for country IT. */
  | 'TAX_CREDENTIAL_IT'
  /** Extension key 'tax_email_it' for country IT. */
  | 'TAX_EMAIL_IT';

/** The purpose of a localization extension. */
export type LocalizationExtensionPurpose =
  /** Extensions that are used for shipping purposes, for example, customs clearance. */
  | 'SHIPPING'
  /** Extensions that are used for taxes purposes, for example, invoicing. */
  | 'TAX';

/** Possible error codes that can be returned by `LocationActivateUserError`. */
export type LocationActivateUserErrorCode =
  /** An error occurred while activating the location. */
  | 'GENERIC_ERROR'
  /** This location currently cannot be activated as inventory, pending orders or transfers are being relocated from this location. */
  | 'HAS_ONGOING_RELOCATION'
  /** Shop has reached its location limit. */
  | 'LOCATION_LIMIT'
  /** Location not found. */
  | 'LOCATION_NOT_FOUND';

/** The input fields to use to specify the address while adding a location. */
export type LocationAddAddressInput = {
  /** The first line of the address. */
  address1?: InputMaybe<Scalars['String']>;
  /** The second line of the address. */
  address2?: InputMaybe<Scalars['String']>;
  /** The name of the city, district, village, or town. */
  city?: InputMaybe<Scalars['String']>;
  /** The two-letter code of country for the address. */
  countryCode: CountryCode;
  /** The phone number of the location. */
  phone?: InputMaybe<Scalars['String']>;
  /**
   * The code for the region of the address, such as the state, province, or district.
   * For example CA for California, United States.
   *
   */
  provinceCode?: InputMaybe<Scalars['String']>;
  /** The ZIP code or postal code of the address. */
  zip?: InputMaybe<Scalars['String']>;
};

/** The input fields to use to add a location. */
export type LocationAddInput = {
  /** The address of the location. */
  address: LocationAddAddressInput;
  /** Whether inventory at this location is available for sale online. */
  fulfillsOnlineOrders?: InputMaybe<Scalars['Boolean']>;
  /** The name of the location. */
  name: Scalars['String'];
};

/** Possible error codes that can be returned by `LocationAddUserError`. */
export type LocationAddUserErrorCode =
  /** The input value is blank. */
  | 'BLANK'
  /** An error occurred while adding the location. */
  | 'GENERIC_ERROR'
  /** The input value is invalid. */
  | 'INVALID'
  /** The ZIP code is not a valid US ZIP code. */
  | 'INVALID_US_ZIPCODE'
  /** The input value is already taken. */
  | 'TAKEN'
  /** The input value is too long. */
  | 'TOO_LONG';

/** Possible error codes that can be returned by `LocationDeactivateUserError`. */
export type LocationDeactivateUserErrorCode =
  /** At least one location must fulfill online orders. */
  | 'CANNOT_DISABLE_ONLINE_ORDER_FULFILLMENT'
  /** Destination location is the same as the location to be deactivated. */
  | 'DESTINATION_LOCATION_IS_THE_SAME_LOCATION'
  /** Destination location is not found or inactive. */
  | 'DESTINATION_LOCATION_NOT_FOUND_OR_INACTIVE'
  /** Failed to relocate active inventories to the destination location. */
  | 'FAILED_TO_RELOCATE_ACTIVE_INVENTORIES'
  /** Failed to relocate incoming movements to the destination location. */
  | 'FAILED_TO_RELOCATE_INCOMING_MOVEMENTS'
  /** Failed to relocate open purchase orders to the destination location. */
  | 'FAILED_TO_RELOCATE_OPEN_PURCHASE_ORDERS'
  /** Failed to relocate open transfers to the destination location. */
  | 'FAILED_TO_RELOCATE_OPEN_TRANSFERS'
  /** Location could not be deactivated without specifying where to relocate inventory at the location. */
  | 'HAS_ACTIVE_INVENTORY_ERROR'
  /** Location needs to be removed from Shopify POS for Retail subscription in Point of Sale channel. */
  | 'HAS_ACTIVE_RETAIL_SUBSCRIPTIONS'
  /** Location could not be deactivated because it has pending orders. */
  | 'HAS_FULFILLMENT_ORDERS_ERROR'
  /** Location could not be deactivated because it has open Shopify Fulfillment Network transfers. */
  | 'HAS_INCOMING_MOVEMENTS_ERROR'
  /** Location could not be deactivated because it has open purchase orders. */
  | 'HAS_OPEN_PURCHASE_ORDERS_ERROR'
  /** Location could not be deactivated because it has open transfers. */
  | 'HAS_OPEN_TRANSFERS_ERROR'
  /** The input value is invalid. */
  | 'INVALID'
  /** Location not found. */
  | 'LOCATION_NOT_FOUND'
  /** Location either has a fulfillment serivice or is the only location with a shipping address. */
  | 'PERMANENTLY_BLOCKED_FROM_DEACTIVATION_ERROR'
  /** Location has incoming inventory. The location can be deactivated after the inventory has been received. */
  | 'TEMPORARILY_BLOCKED_FROM_DEACTIVATION_ERROR';

/** Possible error codes that can be returned by `LocationDeleteUserError`. */
export type LocationDeleteUserErrorCode =
  /** An error occurred while deleting the location. */
  | 'GENERIC_ERROR'
  /** The location cannot be deleted while it has any active Retail subscriptions in the Point of Sale channel. */
  | 'LOCATION_HAS_ACTIVE_RETAIL_SUBSCRIPTION'
  /** The location cannot be deleted while it has inventory. */
  | 'LOCATION_HAS_INVENTORY'
  /** The location cannot be deleted while it has pending orders. */
  | 'LOCATION_HAS_PENDING_ORDERS'
  /** The location cannot be deleted while it is active. */
  | 'LOCATION_IS_ACTIVE'
  /** Location not found. */
  | 'LOCATION_NOT_FOUND';

/** The input fields to use to edit the address of a location. */
export type LocationEditAddressInput = {
  /** The first line of the address. */
  address1?: InputMaybe<Scalars['String']>;
  /** The second line of the address. */
  address2?: InputMaybe<Scalars['String']>;
  /** The name of the city, district, village, or town. */
  city?: InputMaybe<Scalars['String']>;
  /** The two-letter code of country for the address. */
  countryCode?: InputMaybe<CountryCode>;
  /** The phone number of the location. */
  phone?: InputMaybe<Scalars['String']>;
  /**
   * The code for the region of the address, such as the state, province, or district.
   * For example CA for California, United States.
   *
   */
  provinceCode?: InputMaybe<Scalars['String']>;
  /** The ZIP code or postal code of the location. */
  zip?: InputMaybe<Scalars['String']>;
};

/** The input fields to use to edit a location. */
export type LocationEditInput = {
  /** The address of the location. */
  address?: InputMaybe<LocationEditAddressInput>;
  /** Whether inventory at this location is available for sale online. */
  fulfillsOnlineOrders?: InputMaybe<Scalars['Boolean']>;
  /** The name of the location. */
  name?: InputMaybe<Scalars['String']>;
};

/** Possible error codes that can be returned by `LocationEditUserError`. */
export type LocationEditUserErrorCode =
  /** The input value is blank. */
  | 'BLANK'
  /** At least one location must fulfill online orders. */
  | 'CANNOT_DISABLE_ONLINE_ORDER_FULFILLMENT'
  /** An error occurred while editing the location. */
  | 'GENERIC_ERROR'
  /** The input value is invalid. */
  | 'INVALID'
  /** The ZIP code is not a valid US ZIP code. */
  | 'INVALID_US_ZIPCODE'
  /** The record with the ID used as the input value couldn't be found. */
  | 'NOT_FOUND'
  /** The input value is too long. */
  | 'TOO_LONG';

/** The set of valid sort keys for the Location query. */
export type LocationSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `name` value. */
  | 'NAME'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** The fields used to create or update a mailing address. */
export type MailingAddressInput = {
  /**
   * The first line of the address. Typically the street address or PO Box number.
   *
   */
  address1?: InputMaybe<Scalars['String']>;
  /**
   * The second line of the address. Typically the number of the apartment, suite, or unit.
   *
   */
  address2?: InputMaybe<Scalars['String']>;
  /**
   * The name of the city, district, village, or town.
   *
   */
  city?: InputMaybe<Scalars['String']>;
  /**
   * The name of the customer's company or organization.
   *
   */
  company?: InputMaybe<Scalars['String']>;
  /** The two-letter code for the country of the address. */
  countryCode?: InputMaybe<CountryCode>;
  /** The first name of the customer. */
  firstName?: InputMaybe<Scalars['String']>;
  /** The last name of the customer. */
  lastName?: InputMaybe<Scalars['String']>;
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   *
   */
  phone?: InputMaybe<Scalars['String']>;
  /**
   * The code for the region of the address, such as the province, state, or district.
   * For example QC for Quebec, Canada.
   *
   */
  provinceCode?: InputMaybe<Scalars['String']>;
  /** The zip or postal code of the address. */
  zip?: InputMaybe<Scalars['String']>;
};

/** The input fields required to create a market. */
export type MarketCreateInput = {
  /**
   * Whether the market is enabled to receive visitors and sales. If  a Boolean
   * isn't provided, then the
   * market is enabled by default if all included regions have shipping rates, and disabled if
   * any regions don't have shipping rates.
   *
   * **Note**: Regions in inactive markets can't be selected on the storefront or in checkout.
   *
   */
  enabled?: InputMaybe<Scalars['Boolean']>;
  /**
   * The name of the market. Not shown to customers.
   *
   */
  name: Scalars['String'];
  /**
   * The regions to be included in the market. Each region can only be included in one market at
   * a time.
   *
   */
  regions: Array<MarketRegionCreateInput>;
};

/** The input fields used to update the currency settings of a market. */
export type MarketCurrencySettingsUpdateInput = {
  /**
   * The currency which this market’s prices are defined in, and the
   * currency which its customers must use if local currencies are disabled.
   *
   */
  baseCurrency?: InputMaybe<CurrencyCode>;
  /**
   * Whether or not local currencies are enabled. If enabled, then prices will
   * be converted to give each customer the best experience based on their
   * region. If disabled, then all customers in this market will see prices
   * in the market's base currency.
   *
   */
  localCurrencies?: InputMaybe<Scalars['Boolean']>;
};

/** Possible error codes that can be returned by `MarketCurrencySettingsUserError`. */
export type MarketCurrencySettingsUserErrorCode =
  /** The currency settings of the given market cannot be changed because the market manager has exclusive control of pricing. */
  | 'MANAGED_MARKET'
  /** The specified market wasn't found. */
  | 'MARKET_NOT_FOUND'
  /** The shop's payment gateway does not support enabling more than one currency. */
  | 'MULTIPLE_CURRENCIES_NOT_SUPPORTED'
  /** Can't enable or disable local currencies on a single country market. */
  | 'NO_LOCAL_CURRENCIES_ON_SINGLE_COUNTRY_MARKET'
  /** The primary market must use the shop currency. */
  | 'PRIMARY_MARKET_USES_SHOP_CURRENCY'
  /** The specified currency is not supported. */
  | 'UNSUPPORTED_CURRENCY';

/** The type of resources that are market localizable. */
export type MarketLocalizableResourceType =
  /** A metafield. Market localizable fields: `value`. */
  | 'METAFIELD';

/** The fields and values to use when creating or updating a market localization. */
export type MarketLocalizationRegisterInput = {
  /** A reference to the value being localized on the resource that this market localization belongs to. */
  key: Scalars['String'];
  /** The ID of the market that the localization is specific to. */
  marketId: Scalars['ID'];
  /** A hash digest representation of the content being localized. */
  marketLocalizableContentDigest: Scalars['String'];
  /** The value of the market localization. */
  value: Scalars['String'];
};

/** Defines input options for creating a market region. Exactly one option is required. */
export type MarketRegionCreateInput = {
  /** A country code for the region. */
  countryCode: CountryCode;
};

/** The input fields used to update a market. */
export type MarketUpdateInput = {
  /**
   * Whether the market is enabled to receive visitors and sales. **Note**: Regions in
   * inactive markets cannot be selected on the storefront or in checkout.
   *
   */
  enabled?: InputMaybe<Scalars['Boolean']>;
  /**
   * The name of the market. Not shown to customers.
   *
   */
  name?: InputMaybe<Scalars['String']>;
};

/** Possible error codes that can be returned by `MarketUserError`. */
export type MarketUserErrorCode =
  /** The input value is blank. */
  | 'BLANK'
  /** Can't add customer account domain to a market. */
  | 'CANNOT_ADD_CUSTOMER_DOMAIN'
  /** Can't add regions to the primary market. */
  | 'CANNOT_ADD_REGIONS_TO_PRIMARY_MARKET'
  /** Can't add the web presence to the primary market. */
  | 'CANNOT_ADD_WEB_PRESENCE_TO_PRIMARY_MARKET'
  /** Can't delete the only region in a market. */
  | 'CANNOT_DELETE_ONLY_REGION'
  /** Can't delete the primary market. */
  | 'CANNOT_DELETE_PRIMARY_MARKET'
  /** Can't delete the primary market's web presence. */
  | 'CANNOT_DELETE_PRIMARY_MARKET_WEB_PRESENCE'
  /** Can't disable the primary market. */
  | 'CANNOT_DISABLE_PRIMARY_MARKET'
  /** Can't pass both `subfolderSuffix` and `domainId`. */
  | 'CANNOT_HAVE_SUBFOLDER_AND_DOMAIN'
  /** Can't set default locale to null. */
  | 'CANNOT_SET_DEFAULT_LOCALE_TO_NULL'
  /** The language isn't enabled on the store. */
  | 'DISABLED_LANGUAGE'
  /** Domain was not found. */
  | 'DOMAIN_NOT_FOUND'
  /** Duplicates found in languages. */
  | 'DUPLICATE_LANGUAGES'
  /** The input value is invalid. */
  | 'INVALID'
  /** The market wasn't found. */
  | 'MARKET_NOT_FOUND'
  /** No languages selected. */
  | 'NO_LANGUAGES'
  /** The primary market must use the primary domain. */
  | 'PRIMARY_MARKET_MUST_USE_PRIMARY_DOMAIN'
  /** The market region wasn't found. */
  | 'REGION_NOT_FOUND'
  /** Cannot add region-specific language. */
  | 'REGION_SPECIFIC_LANGUAGE'
  /** One of `subfolderSuffix` or `domainId` is required. */
  | 'REQUIRES_DOMAIN_OR_SUBFOLDER'
  /** Exactly one input option is required. */
  | 'REQUIRES_EXACTLY_ONE_OPTION'
  /** Can't have more than 50 markets. */
  | 'SHOP_REACHED_MARKETS_LIMIT'
  /** Can't create subfolders if the primary domain is a country code top-level domain (ccTLDs). */
  | 'SUBFOLDER_NOT_ALLOWED_FOR_CCTLD_DOMAINS'
  /** The subfolder suffix must contain only letters. */
  | 'SUBFOLDER_SUFFIX_MUST_CONTAIN_ONLY_LETTERS'
  /** The input value is already taken. */
  | 'TAKEN'
  /** The input value is too long. */
  | 'TOO_LONG'
  /** The input value is too short. */
  | 'TOO_SHORT'
  /** The language isn't published to the store. */
  | 'UNPUBLISHED_LANGUAGE'
  /** Can't add unsupported country or region. */
  | 'UNSUPPORTED_COUNTRY_REGION'
  /** The market web presence wasn't found. */
  | 'WEB_PRESENCE_NOT_FOUND';

/** The input fields used to create a web presence for a market. */
export type MarketWebPresenceCreateInput = {
  /**
   * The alternate locales for the market’s web presence.
   *
   */
  alternateLocales?: InputMaybe<Array<Scalars['String']>>;
  /**
   * The default locale for the market’s web presence.
   *
   */
  defaultLocale: Scalars['String'];
  /**
   * The web presence's domain ID. This field must be `null` if the `subfolderSuffix` isn't `null`.
   *
   */
  domainId?: InputMaybe<Scalars['ID']>;
  /**
   * The market-specific suffix of the subfolders defined by the web presence.
   * For example: in `/en-us`, the subfolder suffix is `us`.
   * Only ASCII characters are allowed. This field must be `null` if the `domainId` isn't `null`.
   *
   */
  subfolderSuffix?: InputMaybe<Scalars['String']>;
};

/** The input fields used to update a web presence for a market. */
export type MarketWebPresenceUpdateInput = {
  /**
   * The alternate locales for the market’s web presence.
   *
   */
  alternateLocales?: InputMaybe<Array<Scalars['String']>>;
  /**
   * The default locale for the market’s web presence.
   *
   */
  defaultLocale?: InputMaybe<Scalars['String']>;
  /**
   * The web presence's domain ID. This field must be null if `subfolderSuffix` is not null.
   *
   */
  domainId?: InputMaybe<Scalars['ID']>;
  /**
   * The market-specific suffix of the subfolders defined by the web presence.
   * Example: in `/en-us` the subfolder suffix is `us`.
   * Only ASCII characters are allowed. This field must be null if `domainId` is not null.
   *
   */
  subfolderSuffix?: InputMaybe<Scalars['String']>;
};

/** This type combines budget amount and its marketing budget type. */
export type MarketingActivityBudgetInput = {
  /** Budget type for marketing activity. */
  budgetType?: InputMaybe<MarketingBudgetBudgetType>;
  /** Amount of budget for the marketing activity. */
  total?: InputMaybe<MoneyInput>;
};

/** The input fields for creating an externally-managed marketing activity. */
export type MarketingActivityCreateExternalInput = {
  /** The amount spent on the marketing activity. */
  adSpend?: InputMaybe<MoneyInput>;
  /** The budget for this marketing activity. */
  budget?: InputMaybe<MarketingActivityBudgetInput>;
  /** The channel of your marketing event. */
  channel: MarketingChannel;
  /** When the activity ended. */
  end?: InputMaybe<Scalars['DateTime']>;
  /** The referring domain. */
  referringDomain?: InputMaybe<Scalars['String']>;
  /** The ID of an activity that's hosted outside of Shopify. */
  remoteId?: InputMaybe<Scalars['String']>;
  /** The URL for a preview image that's used for the marketing activity. */
  remotePreviewImageUrl?: InputMaybe<Scalars['URL']>;
  /** URL for viewing and/or managing the activity outside of Shopify. */
  remoteUrl: Scalars['URL'];
  /** When the activity is scheduled to end. */
  scheduledEnd?: InputMaybe<Scalars['DateTime']>;
  /** When the activity is scheduled to start. */
  scheduledStart?: InputMaybe<Scalars['DateTime']>;
  /** When the activity started. */
  start?: InputMaybe<Scalars['DateTime']>;
  /**
   * Specifies the settings for the marketing platform and the ad format.
   * The marketing tactic determines which default fields are included
   * in the marketing activity.
   *
   */
  tactic: MarketingTactic;
  /** The title of the marketing activity. */
  title: Scalars['String'];
  /**
   * The
   * [Urchin Traffic Module (UTM) parameters](https://en.wikipedia.org/wiki/UTM_parameters)
   * that are associated with a related marketing campaign. `UTMInput` is required for all
   * marketing tactics except for the Storefront app marketing tactic.
   *
   */
  utm: UtmInput;
};

/** Specifies the input fields required to create a marketing activity. */
export type MarketingActivityCreateInput = {
  /** The budget for this marketing activity. */
  budget?: InputMaybe<MarketingActivityBudgetInput>;
  /** Encoded context containing marketing campaign id. */
  context?: InputMaybe<Scalars['String']>;
  /** The form data in JSON serialized as a string. */
  formData?: InputMaybe<Scalars['String']>;
  /** The ID of the marketing activity extension. */
  marketingActivityExtensionId: Scalars['ID'];
  /** The title of the marketing activity. */
  marketingActivityTitle?: InputMaybe<Scalars['String']>;
  /** The current state of the marketing activity. */
  status: MarketingActivityStatus;
  /**
   * Specifies the
   * [Urchin Traffic Module (UTM) parameters](https://en.wikipedia.org/wiki/UTM_parameters)
   * that are associated with a related marketing campaign. UTMInput is required for all Marketing
   * tactics except Storefront App.
   *
   */
  utm?: InputMaybe<UtmInput>;
};

/** The error code resulted from the marketing activity extension integration. */
export type MarketingActivityExtensionAppErrorCode =
  /** The app is either not responding or returning unexpected data. */
  | 'API_ERROR'
  /** The app needs to be installed. */
  | 'INSTALL_REQUIRED_ERROR'
  /** The shop/user must be onboarded to use the app. */
  | 'NOT_ONBOARDED_ERROR'
  /** The app has returned an error when invoking the platform. */
  | 'PLATFORM_ERROR'
  /** The app has returned validation errors. */
  | 'VALIDATION_ERROR';

/** The set of valid sort keys for the MarketingActivity query. */
export type MarketingActivitySortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE';

/** Status helps to identify if this marketing activity has been completed, queued, failed etc. */
export type MarketingActivityStatus =
  /** This marketing activity is currently running. */
  | 'ACTIVE'
  /** This marketing activity is permanently unavailable. */
  | 'DELETED'
  /** This marketing activity was deleted and it was triggered from outside of Shopify. */
  | 'DELETED_EXTERNALLY'
  /** This marketing activity is disconnected and no longer editable. */
  | 'DISCONNECTED'
  /** This marketing activity has been edited, but it is not yet created. */
  | 'DRAFT'
  /** This marketing activity is unable to run. */
  | 'FAILED'
  /** This marketing activity has completed running. */
  | 'INACTIVE'
  /** This marketing activity is currently not running. */
  | 'PAUSED'
  /** This marketing activity is pending creation on the app's marketing platform. */
  | 'PENDING'
  /** This marketing activity is scheduled to run. */
  | 'SCHEDULED'
  /** The marketing activity's status is unknown. */
  | 'UNDEFINED';

/** StatusBadgeType helps to identify the color of the status badge. */
export type MarketingActivityStatusBadgeType =
  /** This status badge has type attention. */
  | 'ATTENTION'
  /** This status badge has type default. */
  | 'DEFAULT'
  /** This status badge has type info. */
  | 'INFO'
  /** This status badge has type success. */
  | 'SUCCESS'
  /** This status badge has type warning. */
  | 'WARNING';

/** The input fields required to update an externally managed marketing activity. */
export type MarketingActivityUpdateExternalInput = {
  /** The amount spent on the marketing activity. */
  adSpend?: InputMaybe<MoneyInput>;
  /** The budget for the marketing activity. */
  budget?: InputMaybe<MarketingActivityBudgetInput>;
  /** The channel that your marketing event will use. */
  channel?: InputMaybe<MarketingChannel>;
  /** The date and time when the activity ended. */
  end?: InputMaybe<Scalars['DateTime']>;
  /** The referring domain. */
  referringDomain?: InputMaybe<Scalars['String']>;
  /** The preview image URL for the marketing activity. */
  remotePreviewImageUrl?: InputMaybe<Scalars['URL']>;
  /** The URL for managing the activity outside of Shopify. */
  remoteUrl?: InputMaybe<Scalars['URL']>;
  /** The date and time when the activity is scheduled to end. */
  scheduledEnd?: InputMaybe<Scalars['DateTime']>;
  /** The date and time when the activity is scheduled to start. */
  scheduledStart?: InputMaybe<Scalars['DateTime']>;
  /** The date and time when the activity started. */
  start?: InputMaybe<Scalars['DateTime']>;
  /**
   * The settings for the marketing platform and ad format.
   * The selection of the marketing tactic also determines which default fields are included
   * in the marketing activity.
   *
   */
  tactic?: InputMaybe<MarketingTactic>;
  /** The title of the marketing activity. */
  title?: InputMaybe<Scalars['String']>;
  /**
   * Specifies the
   * [Urchin Traffic Module (UTM) parameters](https://en.wikipedia.org/wiki/UTM_parameters)
   * that are associated with a related marketing campaign. UTMInput is required for all marketing
   * tactics except the storefront app.
   *
   */
  utm?: InputMaybe<UtmInput>;
};

/** Specifies the input fields required to update a marketing activity. */
export type MarketingActivityUpdateInput = {
  /** The budget for the marketing activity. */
  budget?: InputMaybe<MarketingActivityBudgetInput>;
  /**
   * The error messages that were generated when the app was trying to complete the activity.
   * Learn more about the
   * [JSON format expected for error messages](/api/marketing-activities/statuses#failed-status).
   *
   */
  errors?: InputMaybe<Scalars['JSON']>;
  /**
   * The form data of the marketing activity. This is only used if the marketing activity is
   *               integrated with the external editor.
   */
  formData?: InputMaybe<Scalars['String']>;
  /** The ID of the marketing activity. */
  id: Scalars['ID'];
  /**
   * A list of the item IDs that were marketed in this marketing activity. Valid types for these items are:
   * * `Product`
   * * `Shop`
   *
   */
  marketedResources?: InputMaybe<Array<Scalars['ID']>>;
  /** The ID of the recommendation that the marketing activity was created from, if one exists. */
  marketingRecommendationId?: InputMaybe<Scalars['ID']>;
  /**
   * The current state of the marketing activity. Learn more about
   * [marketing activities statuses](/api/marketing-activities/statuses).
   *
   */
  status?: InputMaybe<MarketingActivityStatus>;
  /** The target state that the marketing activity is transitioning to. Learn more about [marketing activities statuses](/api/marketing-activities/statuses). */
  targetStatus?: InputMaybe<MarketingActivityStatus>;
  /** The title of the marketing activity. */
  title?: InputMaybe<Scalars['String']>;
  /**
   * Specifies the
   * [Urchin Traffic Module (UTM) parameters](https://en.wikipedia.org/wiki/UTM_parameters)
   * that are associated with a related marketing campaign. UTMInput is required for all Marketing
   * tactics except Storefront App. The utm field can only be set once and never modified.
   *
   */
  utm?: InputMaybe<UtmInput>;
};

/** Possible error codes that can be returned by `MarketingActivityUserError`. */
export type MarketingActivityUserErrorCode =
  /** The input value is invalid. */
  | 'INVALID'
  /** The input value is already taken. */
  | 'TAKEN';

/** The budget type for a marketing activity. */
export type MarketingBudgetBudgetType =
  /** A daily budget. */
  | 'DAILY'
  /** A budget for the lifetime of a marketing activity. */
  | 'LIFETIME';

/**
 * The available marketing channels for a marketing activity or event. A marketing channel is broad category of marketing, used for reporting aggregation.
 *
 */
export type MarketingChannel =
  /** Displayed ads. */
  | 'DISPLAY'
  /** Email. */
  | 'EMAIL'
  /** Referral links. */
  | 'REFERRAL'
  /** Paid search. */
  | 'SEARCH'
  /** Social media. */
  | 'SOCIAL';

/** This object represents marketing engagement input fields for a marketing engagement. */
export type MarketingEngagementInput = {
  /** The total ad spend for the day, if the marketing event is a paid ad with a daily spend. */
  adSpend?: InputMaybe<MoneyInput>;
  /** The total number of clicks on the marketing event for the day. */
  clicksCount?: InputMaybe<Scalars['Int']>;
  /** The total number of comments for the day. */
  commentsCount?: InputMaybe<Scalars['Int']>;
  /** The total number of complaints for the day. */
  complaintsCount?: InputMaybe<Scalars['Int']>;
  /** The total number of fails for the day. */
  failsCount?: InputMaybe<Scalars['Int']>;
  /** The total number of favorites for the day. */
  favoritesCount?: InputMaybe<Scalars['Int']>;
  /** The date time at which the data was fetched. */
  fetchedAt?: InputMaybe<Scalars['DateTime']>;
  /** The total number of impressions for the day. */
  impressionsCount?: InputMaybe<Scalars['Int']>;
  /** Whether the engagements are reported as lifetime values rather than daily totals. */
  isCumulative?: InputMaybe<Scalars['Boolean']>;
  /** The date that these engagements occurred on. */
  occurredOn: Scalars['Date'];
  /** The total number of sends for the day. */
  sendsCount?: InputMaybe<Scalars['Int']>;
  /** The total number of shares for the day. */
  sharesCount?: InputMaybe<Scalars['Int']>;
  /** The total number of unique clicks for the day. */
  uniqueClicksCount?: InputMaybe<Scalars['Int']>;
  /** The total number of unique views for the day. */
  uniqueViewsCount?: InputMaybe<Scalars['Int']>;
  /** The total number of unsubscribes for the day. */
  unsubscribesCount?: InputMaybe<Scalars['Int']>;
  /** The UTC Offset that the app is using to determine which date to allocate spend to. */
  utcOffset?: InputMaybe<Scalars['UtcOffset']>;
  /** The total number of views for the day. */
  viewsCount?: InputMaybe<Scalars['Int']>;
};

/** The set of valid sort keys for the MarketingEvent query. */
export type MarketingEventSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `started_at` value. */
  | 'STARTED_AT';

/** The available types of marketing event. */
export type MarketingTactic =
  /** An abandoned cart recovery email. */
  | 'ABANDONED_CART'
  /** An ad, such as a Facebook ad. */
  | 'AD'
  /** An affiliate link. */
  | 'AFFILIATE'
  /** A direct visit to the online store. */
  | 'DIRECT'
  /** A display ad. */
  | 'DISPLAY'
  /** A follow-up email. */
  | 'FOLLOW_UP'
  /** A link. */
  | 'LINK'
  /** A loyalty program. */
  | 'LOYALTY'
  /** A messaging app, such as Facebook Messenger. */
  | 'MESSAGE'
  /** A newsletter. */
  | 'NEWSLETTER'
  /** A notification in the Shopify admin. */
  | 'NOTIFICATION'
  /** A blog post. */
  | 'POST'
  /** A promotional receipt. */
  | 'RECEIPT'
  /** A retargeting ad. */
  | 'RETARGETING'
  /** Paid search. */
  | 'SEARCH'
  /** Search engine optimization. */
  | 'SEO'
  /** A popup on the online store. */
  | 'STOREFRONT_APP'
  /** A transactional email. */
  | 'TRANSACTIONAL';

/** The possible content types for a media object. */
export type MediaContentType =
  /** An externally hosted video. */
  | 'EXTERNAL_VIDEO'
  /** A Shopify-hosted image. */
  | 'IMAGE'
  /** A 3d model. */
  | 'MODEL_3D'
  /** A Shopify-hosted video. */
  | 'VIDEO';

/** Error types for media. */
export type MediaErrorCode =
  /** Media could not be created because embed permissions are disabled for this video. */
  | 'EXTERNAL_VIDEO_EMBED_DISABLED'
  /** Media could not be created because video is either not found or still transcoding. */
  | 'EXTERNAL_VIDEO_EMBED_NOT_FOUND_OR_TRANSCODING'
  /** Media could not be created because the external video has an invalid aspect ratio. */
  | 'EXTERNAL_VIDEO_INVALID_ASPECT_RATIO'
  /** Media could not be created because the external video could not be found. */
  | 'EXTERNAL_VIDEO_NOT_FOUND'
  /** Media could not be created because the external video is not listed or is private. */
  | 'EXTERNAL_VIDEO_UNLISTED'
  /** Media could not be created because the cumulative file storage limit would be exceeded. */
  | 'FILE_STORAGE_LIMIT_EXCEEDED'
  /** File could not be processed because the source could not be downloaded. */
  | 'GENERIC_FILE_DOWNLOAD_FAILURE'
  /** File could not be created because the size is too large. */
  | 'GENERIC_FILE_INVALID_SIZE'
  /** Media could not be processed because the image could not be downloaded. */
  | 'IMAGE_DOWNLOAD_FAILURE'
  /** Media could not be processed because the image could not be processed. */
  | 'IMAGE_PROCESSING_FAILURE'
  /** Media could not be created because the image has an invalid aspect ratio. */
  | 'INVALID_IMAGE_ASPECT_RATIO'
  /** Media could not be created because the image size is too large. */
  | 'INVALID_IMAGE_FILE_SIZE'
  /** Media could not be created because the image's resolution exceeds the max limit. */
  | 'INVALID_IMAGE_RESOLUTION'
  /** Media could not be processed because the signed URL was invalid. */
  | 'INVALID_SIGNED_URL'
  /** Media timed out because it is currently being modified by another operation. */
  | 'MEDIA_TIMEOUT_ERROR'
  /** Media could not be created because the model file failed processing. */
  | 'MODEL3D_GLB_OUTPUT_CREATION_ERROR'
  /** Media could not be created because the model can't be converted to USDZ format. */
  | 'MODEL3D_GLB_TO_USDZ_CONVERSION_ERROR'
  /** Media could not be created because the model file failed processing. */
  | 'MODEL3D_PROCESSING_FAILURE'
  /** Media could not be created because the model's thumbnail generation failed. */
  | 'MODEL3D_THUMBNAIL_GENERATION_ERROR'
  /** Model failed validation. */
  | 'MODEL3D_VALIDATION_ERROR'
  /** Media error has occured for unknown reason. */
  | 'UNKNOWN'
  /** Media could not be created because the image is an unsupported file type. */
  | 'UNSUPPORTED_IMAGE_FILE_TYPE'
  /** Media could not be created because it has an invalid file type. */
  | 'VIDEO_INVALID_FILETYPE_ERROR'
  /** Media could not be created because it does not meet the maximum duration requirement. */
  | 'VIDEO_MAX_DURATION_ERROR'
  /** Media could not be created because it does not meet the maximum height requirement. */
  | 'VIDEO_MAX_HEIGHT_ERROR'
  /** Media could not be created because it does not meet the maximum width requirement. */
  | 'VIDEO_MAX_WIDTH_ERROR'
  /** Media could not be created because the metadata could not be read. */
  | 'VIDEO_METADATA_READ_ERROR'
  /** Media could not be created because it does not meet the minimum duration requirement. */
  | 'VIDEO_MIN_DURATION_ERROR'
  /** Media could not be created because it does not meet the minimum height requirement. */
  | 'VIDEO_MIN_HEIGHT_ERROR'
  /** Media could not be created because it does not meet the minimum width requirement. */
  | 'VIDEO_MIN_WIDTH_ERROR'
  /** Video failed validation. */
  | 'VIDEO_VALIDATION_ERROR';

/** Host for a Media Resource. */
export type MediaHost =
  /** Host for Vimeo embedded videos. */
  | 'VIMEO'
  /** Host for YouTube embedded videos. */
  | 'YOUTUBE';

/** The possible statuses for a media preview image. */
export type MediaPreviewImageStatus =
  /** Preview image processing has failed. */
  | 'FAILED'
  /** Preview image is being processed. */
  | 'PROCESSING'
  /** Preview image is ready to be displayed. */
  | 'READY'
  /** Preview image is uploaded but not yet processed. */
  | 'UPLOADED';

/** The possible statuses for a media object. */
export type MediaStatus =
  /** Media processing has failed. */
  | 'FAILED'
  /** Media is being processed. */
  | 'PROCESSING'
  /** Media is ready to be displayed. */
  | 'READY'
  /** Media has been uploaded but not yet processed. */
  | 'UPLOADED';

/** Possible error codes that can be returned by `MediaUserError`. */
export type MediaUserErrorCode =
  /** The input value is blank. */
  | 'BLANK'
  /** The input value is invalid. */
  | 'INVALID'
  /** Invalid media type. */
  | 'INVALID_MEDIA_TYPE'
  /** Exceeded the maximum number of 100 variant-media pairs per mutation call. */
  | 'MAXIMUM_VARIANT_MEDIA_PAIRS_EXCEEDED'
  /** Media cannot be modified. It is currently being modified by another operation. */
  | 'MEDIA_CANNOT_BE_MODIFIED'
  /** Media does not exist. */
  | 'MEDIA_DOES_NOT_EXIST'
  /** Media does not exist on the given product. */
  | 'MEDIA_DOES_NOT_EXIST_ON_PRODUCT'
  /** The specified media is not attached to the specified variant. */
  | 'MEDIA_IS_NOT_ATTACHED_TO_VARIANT'
  /** Model3d creation throttle was exceeded. */
  | 'MODEL3D_THROTTLE_EXCEEDED'
  /** Model validation failed. */
  | 'MODEL3D_VALIDATION_ERROR'
  /** Non-ready media are not supported. */
  | 'NON_READY_MEDIA'
  /** Product does not exist. */
  | 'PRODUCT_DOES_NOT_EXIST'
  /** Exceeded the limit of media per product. */
  | 'PRODUCT_MEDIA_LIMIT_EXCEEDED'
  /** Product variant already has attached media. */
  | 'PRODUCT_VARIANT_ALREADY_HAS_MEDIA'
  /** Variant does not exist on the given product. */
  | 'PRODUCT_VARIANT_DOES_NOT_EXIST_ON_PRODUCT'
  /** Variant specified in more than one pair. */
  | 'PRODUCT_VARIANT_SPECIFIED_MULTIPLE_TIMES'
  /** Exceeded the limit of media per shop. */
  | 'SHOP_MEDIA_LIMIT_EXCEEDED'
  /** Only one mediaId is allowed per variant-media input pair. */
  | 'TOO_MANY_MEDIA_PER_INPUT_PAIR'
  /** Video creation throttle was exceeded. */
  | 'VIDEO_THROTTLE_EXCEEDED'
  /** Video validation failed. */
  | 'VIDEO_VALIDATION_ERROR';

/** Warning types for media. */
export type MediaWarningCode =
  /** 3D model physical size might be invalid. The dimensions of your model are very large. Consider reviewing your model to ensure they are correct. */
  | 'MODEL_LARGE_PHYSICAL_SIZE'
  /** 3D model physical size might be invalid. The dimensions of your model are very small. Consider reviewing your model to ensure they are correct. */
  | 'MODEL_SMALL_PHYSICAL_SIZE';

/** The class of the discount for combining purposes. */
export type MerchandiseDiscountClass =
  /** Combined as an order discount. */
  | 'ORDER'
  /** Combined as a product discount. */
  | 'PRODUCT';

/** Possible error codes that can be returned by `MetafieldDefinitionCreateUserError`. */
export type MetafieldDefinitionCreateUserErrorCode =
  /** A duplicate option. */
  | 'DUPLICATE_OPTION'
  /** The input value isn't included in the list. */
  | 'INCLUSION'
  /** The input value is invalid. */
  | 'INVALID'
  /** A field contains an invalid character. */
  | 'INVALID_CHARACTER'
  /** An invalid option. */
  | 'INVALID_OPTION'
  /** The maximum limit of definitions per owner type has exceeded. */
  | 'LIMIT_EXCEEDED'
  /** The pinned limit has been reached for the owner type. */
  | 'PINNED_LIMIT_REACHED'
  /** The input value needs to be blank. */
  | 'PRESENT'
  /** This namespace and key combination is reserved for standard definitions. */
  | 'RESERVED_NAMESPACE_KEY'
  /** The definition limit per owner type has exceeded. */
  | 'RESOURCE_TYPE_LIMIT_EXCEEDED'
  /** The input value is already taken. */
  | 'TAKEN'
  /** The input value is too long. */
  | 'TOO_LONG'
  /** The input value is too short. */
  | 'TOO_SHORT'
  /** This namespace and key combination is already in use for a set of your metafields. */
  | 'UNSTRUCTURED_ALREADY_EXISTS';

/** Possible error codes that can be returned by `MetafieldDefinitionDeleteUserError`. */
export type MetafieldDefinitionDeleteUserErrorCode =
  /** An internal error occurred. */
  | 'INTERNAL_ERROR'
  /** Definition not found. */
  | 'NOT_FOUND'
  /** The input value needs to be blank. */
  | 'PRESENT'
  /** Deleting a reference type metafield definition requires deletion of its associated metafields. */
  | 'REFERENCE_TYPE_DELETION_ERROR';

/**
 * Specifies the input fields that are required to create a metafield definition.
 *
 */
export type MetafieldDefinitionInput = {
  /** The description for the metafield definition. */
  description?: InputMaybe<Scalars['String']>;
  /** The key name used to identify a metafield definition within a namespace. */
  key: Scalars['String'];
  /** The human-readable name for the metafield definition. */
  name: Scalars['String'];
  /** The namespace to group a metafield definition. */
  namespace: Scalars['String'];
  /** The resource type that the metafield definition is attached to. */
  ownerType: MetafieldOwnerType;
  /** Whether to pin the metafield definition. */
  pin?: InputMaybe<Scalars['Boolean']>;
  /** The type of data that the metafield will store. */
  type: Scalars['String'];
  /**
   * A list of [validation options](https://shopify.dev/apps/metafields/definitions/validation) for
   * the metafield. For example, for a metafield with the type `date`, you can set a minimum date validation, so
   * that the metafield will only store dates after the specific minimum date.
   *
   */
  validations?: InputMaybe<Array<MetafieldDefinitionValidationInput>>;
  /** Whether metafields for the definition are visible using the Storefront API. */
  visibleToStorefrontApi?: InputMaybe<Scalars['Boolean']>;
};

/** Possible error codes that can be returned by `MetafieldDefinitionPinUserError`. */
export type MetafieldDefinitionPinUserErrorCode =
  /** The metafield definition is already pinned. */
  | 'ALREADY_PINNED'
  /** An internal error occurred. */
  | 'INTERNAL_ERROR'
  /** The metafield definition was not found. */
  | 'NOT_FOUND'
  /** The pinned limit has been reached for owner type. */
  | 'PINNED_LIMIT_REACHED';

/** Possible metafield definition pinned statuses. */
export type MetafieldDefinitionPinnedStatus =
  /** All metafield definitions. */
  | 'ANY'
  /** Only metafield definitions that are pinned. */
  | 'PINNED'
  /** Only metafield definitions that are not pinned. */
  | 'UNPINNED';

/** The set of valid sort keys for the MetafieldDefinition query. */
export type MetafieldDefinitionSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `name` value. */
  | 'NAME'
  /** Sort by the `pinned_position` value. */
  | 'PINNED_POSITION'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** Possible error codes that can be returned by `MetafieldDefinitionUnpinUserError`. */
export type MetafieldDefinitionUnpinUserErrorCode =
  /** An internal error occurred. */
  | 'INTERNAL_ERROR'
  /** The metafield definition was not found. */
  | 'NOT_FOUND'
  /** The metafield definition isn't pinned. */
  | 'NOT_PINNED';

/**
 * Specifies the input fields that are required to update a metafield definition.
 *
 */
export type MetafieldDefinitionUpdateInput = {
  /** The description for the metafield definition. */
  description?: InputMaybe<Scalars['String']>;
  /** The key name used to identify a metafield definition within a namespace. */
  key: Scalars['String'];
  /** The human-readable name for the metafield definition. */
  name?: InputMaybe<Scalars['String']>;
  /** The namespace to group a metafield definition. */
  namespace: Scalars['String'];
  /** The resource type that the metafield definition is attached to. */
  ownerType: MetafieldOwnerType;
  /** Whether to pin the metafield definition. */
  pin?: InputMaybe<Scalars['Boolean']>;
  /** Whether metafields for the definition are visible using the Storefront API. */
  visibleToStorefrontApi?: InputMaybe<Scalars['Boolean']>;
};

/** Possible error codes that can be returned by `MetafieldDefinitionUpdateUserError`. */
export type MetafieldDefinitionUpdateUserErrorCode =
  /** An internal error occurred. */
  | 'INTERNAL_ERROR'
  /** An invalid input. */
  | 'INVALID_INPUT'
  /** The metafield definition wasn't found. */
  | 'NOT_FOUND'
  /** The pinned limit has been reached for the owner type. */
  | 'PINNED_LIMIT_REACHED'
  /** The input value needs to be blank. */
  | 'PRESENT'
  /** The input value is too long. */
  | 'TOO_LONG';

/**
 * The name and value for a metafield definition validation.
 *
 * For example, for a metafield definition of `single_line_text_field` type, you can set a validation with the name `min` and a value of `10`.
 * This validation will ensure that the value of the metafield is at least 10 characters.
 *
 * Refer to the [list of supported validations](https://shopify.dev/api/admin/graphql/reference/common-objects/metafieldDefinitionTypes#examples-Fetch_all_metafield_definition_types).
 *
 */
export type MetafieldDefinitionValidationInput = {
  /** The name for the metafield definition validation. */
  name: Scalars['String'];
  /** The value for the metafield definition validation. */
  value: Scalars['String'];
};

/** Possible metafield definition validation statuses. */
export type MetafieldDefinitionValidationStatus =
  /** All of this definition's metafields are valid. */
  | 'ALL_VALID'
  /** Asynchronous validation of this definition's metafields is in progress. */
  | 'IN_PROGRESS'
  /** Some of this definition's metafields are invalid. */
  | 'SOME_INVALID';

/** Specifies the input fields to delete a metafield. */
export type MetafieldDeleteInput = {
  /** The ID of the metafield to delete. */
  id: Scalars['ID'];
};

/**
 * The input fields to use to create or update a metafield through a mutation on the owning resource.
 * An alternative way to create or update a metafield is by using the
 * [metafieldsSet](https://shopify.dev/api/admin-graphql/latest/mutations/metafieldsSet) mutation.
 *
 */
export type MetafieldInput = {
  /** The description of the metafield. */
  description?: InputMaybe<Scalars['String']>;
  /**
   * The unique ID of the metafield. You don't include an ID when you create a metafield because the metafield ID
   * is created automatically. The ID is required when you update a metafield.
   *
   */
  id?: InputMaybe<Scalars['ID']>;
  /** The key name of the metafield. Required when creating but optional when updating. */
  key?: InputMaybe<Scalars['String']>;
  /**
   * The namespace for a metafield. The namespace is required when you create a metafield and is optional when you
   * update a metafield.
   *
   */
  namespace?: InputMaybe<Scalars['String']>;
  /**
   * The metafield's [type](https://shopify.dev/apps/metafields/types). The metafield type is required
   * when you create a metafield and is optional when you update a metafield.
   *
   */
  type?: InputMaybe<Scalars['String']>;
  /** The value of a metafield. */
  value?: InputMaybe<Scalars['String']>;
};

/** Possible types of a metafield's owner resource. */
export type MetafieldOwnerType =
  /** The Api Permission metafield owner type. */
  | 'API_PERMISSION'
  /** The Article metafield owner type. */
  | 'ARTICLE'
  /** The Blog metafield owner type. */
  | 'BLOG'
  /** The Collection metafield owner type. */
  | 'COLLECTION'
  /** The Customer metafield owner type. */
  | 'CUSTOMER'
  /** The Discount metafield owner type. */
  | 'DISCOUNT'
  /** The Draft Order metafield owner type. */
  | 'DRAFTORDER'
  /** The Location metafield owner type. */
  | 'LOCATION'
  /** The Order metafield owner type. */
  | 'ORDER'
  /** The Page metafield owner type. */
  | 'PAGE'
  /** The Product metafield owner type. */
  | 'PRODUCT'
  /** The Product Image metafield owner type. */
  | 'PRODUCTIMAGE'
  /** The Product Variant metafield owner type. */
  | 'PRODUCTVARIANT'
  /** The Shop metafield owner type. */
  | 'SHOP';

/**
 * Specifies the input fields to create a `MetafieldStorefrontVisibility` record.
 *
 */
export type MetafieldStorefrontVisibilityInput = {
  /** The key of a metafield to make visible in the Storefront API. */
  key: Scalars['String'];
  /** The namespace of a metafield to make visible in the Storefront API. */
  namespace: Scalars['String'];
  /** The owner type of a metafield to make visible in the Storefront API. */
  ownerType: MetafieldOwnerType;
};

/** Possible metafield validation statuses. */
export type MetafieldValidationStatus =
  /** Any validation status (valid or invalid). */
  | 'ANY'
  /** Invalid (according to definition). */
  | 'INVALID'
  /** Valid (according to definition). */
  | 'VALID';

/**
 * Legacy type information for the stored value.
 * Replaced by `type`.
 *
 */
export type MetafieldValueType =
  /** A `true` or `false` value. */
  | 'BOOLEAN'
  /** A whole number. */
  | 'INTEGER'
  /** A JSON string. */
  | 'JSON_STRING'
  /** A text field. */
  | 'STRING';

/** Specifies the input fields for a metafield value to set. */
export type MetafieldsSetInput = {
  /** The key name of the metafield. */
  key: Scalars['String'];
  /**
   * A container for a group of metafields.
   * Grouping metafields in a namespace prevents your metafields from conflicting with other metafields that have the same key name.
   *
   */
  namespace: Scalars['String'];
  /** The ID of the owner resource. */
  ownerId: Scalars['ID'];
  /**
   * The type of data that the metafield stores.
   * The type of data must be a [supported type](https://shopify.dev/apps/metafields/types).
   *
   */
  type: Scalars['String'];
  /**
   * The data to store in the metafield. The data is always stored as a string, regardless of the metafield's type.
   *
   */
  value: Scalars['String'];
};

/** Possible error codes that can be returned by `MetafieldsSetUserError`. */
export type MetafieldsSetUserErrorCode =
  /** ApiPermission metafields can only be created or updated by the app owner. */
  | 'APP_NOT_AUTHORIZED'
  /** The input value is blank. */
  | 'BLANK'
  /** The input value isn't included in the list. */
  | 'INCLUSION'
  /** The type is invalid. */
  | 'INVALID_TYPE'
  /** The value is invalid for metafield type or for definition options. */
  | 'INVALID_VALUE'
  /** The input value should be less than or equal to the maximum value allowed. */
  | 'LESS_THAN_OR_EQUAL_TO'
  /** The input value needs to be blank. */
  | 'PRESENT'
  /** The input value is too long. */
  | 'TOO_LONG'
  /** The input value is too short. */
  | 'TOO_SHORT';

/** The set of valid sort keys for the MethodDefinition query. */
export type MethodDefinitionSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `rate_provider_type` value. */
  | 'RATE_PROVIDER_TYPE'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** Specifies the fields for a monetary value with currency. */
export type MoneyInput = {
  /** Decimal money amount. */
  amount: Scalars['Decimal'];
  /** Currency of the money. */
  currencyCode: CurrencyCode;
};

/** A single move of an object to a specific position in a set, using a zero-based index. */
export type MoveInput = {
  /** The ID of the object to be moved. */
  id: Scalars['ID'];
  /** The new position of the object in the set. */
  newPosition: Scalars['UnsignedInt64'];
};

/**
 * The possible order action types for a
 * [sales agreement](https://shopify.dev/api/admin-graphql/latest/interfaces/salesagreement).
 *
 */
export type OrderActionType =
  /** An order with a purchase or charge. */
  | 'ORDER'
  /** An edit to the order. */
  | 'ORDER_EDIT'
  /** A refund on the order. */
  | 'REFUND'
  /** An unknown agreement action. Represents new actions that may be added in future versions. */
  | 'UNKNOWN';

/** Represents the reason that the order is being canceled. Valid values are: customer, fraud, inventory, declined, other. */
export type OrderCancelReason =
  /** The customer wanted to cancel the order. */
  | 'CUSTOMER'
  /** Payment was declined. */
  | 'DECLINED'
  /** The order was fraudulent. */
  | 'FRAUD'
  /** There was insufficient inventory. */
  | 'INVENTORY'
  /** Some other reason not listed. */
  | 'OTHER';

/** Specifies the authorized transaction to capture and the total amount to capture from it. */
export type OrderCaptureInput = {
  /** The amount to capture. The capture amount can't be greater than the amount of the authorized transaction. */
  amount: Scalars['Money'];
  /** The currency (in ISO format) that is used to capture the order. This must be the presentment currency (the currency used by the customer) and is a required field for orders where the currency and presentment currency differ. */
  currency?: InputMaybe<CurrencyCode>;
  /** The ID of the order to capture. */
  id: Scalars['ID'];
  /** The ID of the authorized transaction to capture. */
  parentTransactionId: Scalars['ID'];
};

/** Specifies an open order to close. */
export type OrderCloseInput = {
  /** The ID of the order to close. */
  id: Scalars['ID'];
};

/** Possible error codes that can be returned by `OrderCreateMandatePaymentUserError`. */
export type OrderCreateMandatePaymentUserErrorCode =
  /** Errors for mandate payment on order. */
  | 'ORDER_MANDATE_PAYMENT_ERROR_CODE';

/** Represents the order's current financial status. */
export type OrderDisplayFinancialStatus =
  /** Displayed as **Authorized**. */
  | 'AUTHORIZED'
  /** Displayed as **Expired**. */
  | 'EXPIRED'
  /** Displayed as **Paid**. */
  | 'PAID'
  /** Displayed as **Partially paid**. */
  | 'PARTIALLY_PAID'
  /** Displayed as **Partially refunded**. */
  | 'PARTIALLY_REFUNDED'
  /** Displayed as **Pending**. */
  | 'PENDING'
  /** Displayed as **Refunded**. */
  | 'REFUNDED'
  /** Displayed as **Voided**. */
  | 'VOIDED';

/** Represents the order's aggregated fulfillment status for display purposes. */
export type OrderDisplayFulfillmentStatus =
  /** Displayed as **Fulfilled**. All the items in the order have been fulfilled. */
  | 'FULFILLED'
  /** Displayed as **In progress**. Some of the items in the order have been fulfilled, or a request for fulfillment has been sent to the fulfillment service. */
  | 'IN_PROGRESS'
  /** Displayed as **On hold**. All of the unfulfilled items in this order are on hold. */
  | 'ON_HOLD'
  /** Displayed as **Open**. None of the items in the order have been fulfilled. Replaced by "UNFULFILLED" status. */
  | 'OPEN'
  /** Displayed as **Partially fulfilled**. Some of the items in the order have been fulfilled. */
  | 'PARTIALLY_FULFILLED'
  /** Displayed as **Pending fulfillment**. A request for fulfillment of some items awaits a response from the fulfillment service. Replaced by the "IN_PROGRESS" status. */
  | 'PENDING_FULFILLMENT'
  /** Displayed as **Restocked**. All the items in the order have been restocked. Replaced by the "UNFULFILLED" status. */
  | 'RESTOCKED'
  /** Displayed as **Scheduled**. All of the unfulfilled items in this order are scheduled for fulfillment at later time. */
  | 'SCHEDULED'
  /** Displayed as **Unfulfilled**. None of the items in the order have been fulfilled. */
  | 'UNFULFILLED';

/** The input fields used to add a discount during an order edit. */
export type OrderEditAppliedDiscountInput = {
  /** The description of the discount. */
  description?: InputMaybe<Scalars['String']>;
  /** The value of the discount as a fixed amount. */
  fixedValue?: InputMaybe<MoneyInput>;
  /** The value of the discount as a percentage. */
  percentValue?: InputMaybe<Scalars['Float']>;
};

/** Specifies the information to be updated on an order when using the orderUpdate mutation. */
export type OrderInput = {
  /** A new list of custom attributes for the order. Overwrites the existing custom attributes. */
  customAttributes?: InputMaybe<Array<AttributeInput>>;
  /** A new customer email address for the order. Overwrites the existing email address. */
  email?: InputMaybe<Scalars['String']>;
  /** The ID of the order to update. */
  id: Scalars['ID'];
  /** A list of new [localization extensions](https://shopify.dev/api/admin-graphql/latest/objects/localizationextension) to add to the existing list of localization extensions for the order. */
  localizationExtensions?: InputMaybe<Array<LocalizationExtensionInput>>;
  /** A list of new metafields to add to the existing metafields for the order. */
  metafields?: InputMaybe<Array<MetafieldInput>>;
  /** The new contents for the note associated with the order. Overwrites the existing note. */
  note?: InputMaybe<Scalars['String']>;
  /** The new shipping address for the order. Overwrites the existing shipping address. */
  shippingAddress?: InputMaybe<MailingAddressInput>;
  /** A new list of tags for the order. Overwrites the existing tags. */
  tags?: InputMaybe<Array<Scalars['String']>>;
};

/** Possible error codes that can be returned by `OrderInvoiceSendUserError`. */
export type OrderInvoiceSendUserErrorCode =
  /** An error occurred while sending the invoice. */
  | 'ORDER_INVOICE_SEND_UNSUCCESSFUL';

/** Specifies the order to mark as paid. */
export type OrderMarkAsPaidInput = {
  /** The ID of the order to mark as paid. */
  id: Scalars['ID'];
};

/** Specifies a closed order to open. */
export type OrderOpenInput = {
  /** The ID of the order to open. */
  id: Scalars['ID'];
};

/** The type of a payment status. */
export type OrderPaymentStatusResult =
  /** The payment is authorized. */
  | 'AUTHORIZED'
  /** The payment is captured. */
  | 'CAPTURED'
  /** There was an error initiating the payment. */
  | 'ERROR'
  /** The payment is still being processed. */
  | 'PROCESSING'
  /** The payment is in purchased status. */
  | 'PURCHASED'
  /** Redirect required. */
  | 'REDIRECT_REQUIRED'
  /** The payment is refunded. */
  | 'REFUNDED'
  /** Payment can be retried. */
  | 'RETRYABLE'
  /** The payment succeeded. */
  | 'SUCCESS'
  /** Status is unknown. */
  | 'UNKNOWN'
  /** The payment is voided. */
  | 'VOIDED';

/** The likelihood that an order is fraudulent. */
export type OrderRiskLevel =
  /** There is a high level of risk that this order is fraudulent. */
  | 'HIGH'
  /** There is a low level of risk that this order is fraudulent. */
  | 'LOW'
  /** There is a medium level of risk that this order is fraudulent. */
  | 'MEDIUM';

/** The set of valid sort keys for the Order query. */
export type OrderSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `customer_name` value. */
  | 'CUSTOMER_NAME'
  /** Sort by the `financial_status` value. */
  | 'FINANCIAL_STATUS'
  /** Sort by the `fulfillment_status` value. */
  | 'FULFILLMENT_STATUS'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `order_number` value. */
  | 'ORDER_NUMBER'
  /** Sort by the `processed_at` value. */
  | 'PROCESSED_AT'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `total_price` value. */
  | 'TOTAL_PRICE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** A standardized error code, independent of the payment provider. */
export type OrderTransactionErrorCode =
  /** The payment method was invalid. */
  | 'AMAZON_PAYMENTS_INVALID_PAYMENT_METHOD'
  /** The maximum amount has been captured. */
  | 'AMAZON_PAYMENTS_MAX_AMOUNT_CHARGED'
  /** The maximum amount has been refunded. */
  | 'AMAZON_PAYMENTS_MAX_AMOUNT_REFUNDED'
  /** The maximum of 10 authorizations has been captured for an order. */
  | 'AMAZON_PAYMENTS_MAX_AUTHORIZATIONS_CAPTURED'
  /** The maximum of 10 refunds has been processed for an order. */
  | 'AMAZON_PAYMENTS_MAX_REFUNDS_PROCESSED'
  /** The order was canceled, which canceled all open authorizations. */
  | 'AMAZON_PAYMENTS_ORDER_REFERENCE_CANCELED'
  /** The order was not confirmed within three hours. */
  | 'AMAZON_PAYMENTS_STALE'
  /** Call the card issuer. */
  | 'CALL_ISSUER'
  /** The card was declined. */
  | 'CARD_DECLINED'
  /** There is an error in the gateway or merchant configuration. */
  | 'CONFIG_ERROR'
  /** The card is expired. */
  | 'EXPIRED_CARD'
  /** There was an unknown error with processing the payment. */
  | 'GENERIC_ERROR'
  /** The address does not match the card number. */
  | 'INCORRECT_ADDRESS'
  /** The CVC does not match the card number. */
  | 'INCORRECT_CVC'
  /** The card number is incorrect. */
  | 'INCORRECT_NUMBER'
  /** The entered PIN is incorrect. */
  | 'INCORRECT_PIN'
  /** The ZIP or postal code does not match the card number. */
  | 'INCORRECT_ZIP'
  /** The amount is either too high or too low for the provider. */
  | 'INVALID_AMOUNT'
  /** The payment method is not available in the customer's country. */
  | 'INVALID_COUNTRY'
  /** The format of the CVC is incorrect. */
  | 'INVALID_CVC'
  /** The format of the expiry date is incorrect. */
  | 'INVALID_EXPIRY_DATE'
  /** The format of the card number is incorrect. */
  | 'INVALID_NUMBER'
  /** The payment method is momentarily unavailable. */
  | 'PAYMENT_METHOD_UNAVAILABLE'
  /**
   * The card has been reported as lost or stolen, and the card issuer has requested that the merchant keep the card and call the number on the back.
   *
   */
  | 'PICK_UP_CARD'
  /** There was an error while processing the payment. */
  | 'PROCESSING_ERROR'
  /** A real card was used but the gateway was in test mode. */
  | 'TEST_MODE_LIVE_CARD'
  /** The gateway or merchant configuration doesn't support a feature, such as network tokenization. */
  | 'UNSUPPORTED_FEATURE';

/** Specifies the information needed to create an order transaction. */
export type OrderTransactionInput = {
  /** The amount of money for this transaction. */
  amount: Scalars['Money'];
  /** The payment gateway to use for this transaction. */
  gateway: Scalars['String'];
  /** The kind of transaction. */
  kind: OrderTransactionKind;
  /** The ID of the order associated with the transaction. */
  orderId: Scalars['ID'];
  /** The ID of the optional parent transaction, for example the authorization of a capture. */
  parentId?: InputMaybe<Scalars['ID']>;
};

/** The different kinds of order transactions. */
export type OrderTransactionKind =
  /**
   * An amount reserved against the cardholder's funding source.
   * Money does not change hands until the authorization is captured.
   *
   */
  | 'AUTHORIZATION'
  /** A transfer of the money that was reserved by an authorization. */
  | 'CAPTURE'
  /**
   * The money returned to the customer when they've paid too much during a cash transaction.
   *
   */
  | 'CHANGE'
  /** An authorization for a payment taken with an EMV credit card reader. */
  | 'EMV_AUTHORIZATION'
  /**
   * A partial or full return of captured funds to the cardholder.
   * A refund can happen only after a capture is processed.
   *
   */
  | 'REFUND'
  /** An authorization and capture performed together in a single step. */
  | 'SALE'
  /** A suggested refund transaction that can be used to create a refund. */
  | 'SUGGESTED_REFUND'
  /** A cancelation of an authorization transaction. */
  | 'VOID';

/** The different states that an `OrderTransaction` can have. */
export type OrderTransactionStatus =
  /** Awaiting a response. */
  | 'AWAITING_RESPONSE'
  /** There was an error while processing the transaction. */
  | 'ERROR'
  /** The transaction failed. */
  | 'FAILURE'
  /** The transaction is pending. */
  | 'PENDING'
  /** The transaction succeeded. */
  | 'SUCCESS'
  /** The transaction status is unknown. */
  | 'UNKNOWN';

/** Some of the payment methods used in Shopify. */
export type PaymentMethods =
  | 'AMERICAN_EXPRESS'
  | 'BITCOIN'
  | 'BOGUS'
  | 'DANKORT'
  | 'DINERS_CLUB'
  | 'DISCOVER'
  | 'DOGECOIN'
  /** The payment method for Elo payment. */
  | 'ELO'
  | 'FORBRUGSFORENINGEN'
  /** The payment method for Interac payment. */
  | 'INTERAC'
  | 'JCB'
  | 'LITECOIN'
  | 'MAESTRO'
  | 'MASTERCARD'
  | 'PAYPAL'
  /** The payment method for UnionPay payment. */
  | 'UNIONPAY'
  | 'VISA';

/** The input fields used to create a payment schedule for payment terms. */
export type PaymentScheduleInput = {
  /** Specifies the date and time when the payment schedule is due. This field must be provided for fixed type payment terms. */
  dueAt?: InputMaybe<Scalars['DateTime']>;
  /** Specifies the date and time that the payment schedule was issued. This field must be provided for net type payment terms. */
  issuedAt?: InputMaybe<Scalars['DateTime']>;
};

/** The input fields used to create a payment terms. */
export type PaymentTermsCreateInput = {
  /** Specifies the payment schedules for the payment terms. */
  paymentSchedules?: InputMaybe<Array<PaymentScheduleInput>>;
  /** Specifies the payment terms template ID used to generate payment terms. */
  paymentTermsTemplateId: Scalars['ID'];
};

/** Possible error codes that can be returned by `PaymentTermsCreateUserError`. */
export type PaymentTermsCreateUserErrorCode =
  /** An error occurred while creating payment terms. */
  | 'PAYMENT_TERMS_CREATION_UNSUCCESSFUL';

/** The input fields used to delete the payment terms. */
export type PaymentTermsDeleteInput = {
  /** The ID of the payment terms being deleted. */
  paymentTermsId: Scalars['ID'];
};

/** Possible error codes that can be returned by `PaymentTermsDeleteUserError`. */
export type PaymentTermsDeleteUserErrorCode =
  /** An error occurred while deleting payment terms. */
  | 'PAYMENT_TERMS_DELETE_UNSUCCESSFUL';

/** The input fields used to create a payment terms. */
export type PaymentTermsInput = {
  /** Specifies the payment schedules for the payment terms. */
  paymentSchedules?: InputMaybe<Array<PaymentScheduleInput>>;
  /** Specifies the payment terms template ID used to generate payment terms. */
  paymentTermsTemplateId?: InputMaybe<Scalars['ID']>;
};

/** The type of a payment terms or a payment terms template. */
export type PaymentTermsType =
  /** The payment terms or payment terms template is a fixed type. It's due on a specified date. */
  | 'FIXED'
  /** The payment terms or payment terms template is a net type. It's due a number of days after issue. */
  | 'NET'
  /** The payment terms or payment terms template is due on receipt. */
  | 'RECEIPT'
  /** The type of the payment terms or payment terms template is unknown. */
  | 'UNKNOWN';

/** The input fields used to update the payment terms. */
export type PaymentTermsUpdateInput = {
  /** The attributes used to update the payment terms. */
  paymentTermsAttributes: PaymentTermsInput;
  /** The ID of the payment terms being updated. */
  paymentTermsId: Scalars['ID'];
};

/** Possible error codes that can be returned by `PaymentTermsUpdateUserError`. */
export type PaymentTermsUpdateUserErrorCode =
  /** An error occurred while updating payment terms. */
  | 'PAYMENT_TERMS_UPDATE_UNSUCCESSFUL';

/** Represents a valid PayPal Express subscriptions gateway status. */
export type PaypalExpressSubscriptionsGatewayStatus =
  /** The status is disabled. */
  | 'DISABLED'
  /** The status is enabled. */
  | 'ENABLED'
  /** The status is pending. */
  | 'PENDING';

/** The input fields to set a price list adjustment. */
export type PriceListAdjustmentInput = {
  /** The type of price adjustment, such as percentage increase or decrease. */
  type: PriceListAdjustmentType;
  /** The value of the price adjustment as specified by the `type`. */
  value: Scalars['Float'];
};

/** Represents a percentage price adjustment type. */
export type PriceListAdjustmentType =
  /** Percentage decrease type. Prices will have a lower value. */
  | 'PERCENTAGE_DECREASE'
  /** Percentage increase type. Prices will have a higher value. */
  | 'PERCENTAGE_INCREASE';

/**
 * The input field used to filter price lists based on context.
 * For example, you can specify the country code so that the filtered price lists only apply to customers visiting from a specific country.
 *
 */
export type PriceListContext = {
  /** The code of the country that the price list applies to. */
  country?: InputMaybe<CountryCode>;
};

/**
 * The input fields to set the context that a price list applies to.
 * For example, the price list might apply to a specific market.
 *
 */
export type PriceListContextRuleInput = {
  /** The market that this price list applies to. */
  marketId?: InputMaybe<Scalars['ID']>;
};

/** The input fields to create a price list. */
export type PriceListCreateInput = {
  /** A set of facts about the customer used to determine price list eligibility. */
  contextRule?: InputMaybe<PriceListContextRuleInput>;
  /** Three letter currency code for fixed prices associated with this price list. */
  currency: CurrencyCode;
  /** The unique name of the price list, used as a human-readable identifier. */
  name: Scalars['String'];
  /** Relative adjustments to other prices. */
  parent: PriceListParentCreateInput;
};

/** The input fields to create a price list adjustment. */
export type PriceListParentCreateInput = {
  /** The relative adjustments to other prices. */
  adjustment: PriceListAdjustmentInput;
};

/** The input fields used to update a price list's adjustment. */
export type PriceListParentUpdateInput = {
  /** The relative adjustments to other prices.. */
  adjustment: PriceListAdjustmentInput;
};

/** Provides the fields and values to use when creating or updating a fixed price list price. */
export type PriceListPriceInput = {
  /** The compare-at price of the product variant on this price list. */
  compareAtPrice?: InputMaybe<MoneyInput>;
  /** The price of the product variant on this price list. */
  price: MoneyInput;
  /** The product variant ID associated with the price list price. */
  variantId: Scalars['ID'];
};

/**
 * Represents the origin of a price, either fixed (defined on the price list) or relative (calculated using a price list adjustment configuration).
 *
 */
export type PriceListPriceOriginType =
  /** The price is defined on the price list. */
  | 'FIXED'
  /** The price is relative to the adjustment type and value. */
  | 'RELATIVE';

/** Possible error codes that can be returned by `PriceListPriceUserError`. */
export type PriceListPriceUserErrorCode =
  /** The input value is blank. */
  | 'BLANK'
  /** The specified currency doesn't match the price list's currency. */
  | 'PRICE_LIST_CURRENCY_MISMATCH'
  /** The price list doesn't exist. */
  | 'PRICE_LIST_NOT_FOUND'
  /** Only fixed prices can be deleted. */
  | 'PRICE_NOT_FIXED'
  /** A fixed price for the specified product variant doesn't exist. */
  | 'VARIANT_NOT_FOUND';

/** The set of valid sort keys for the PriceList query. */
export type PriceListSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `name` value. */
  | 'NAME'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** The input fields used to update a price list. */
export type PriceListUpdateInput = {
  /** A set of facts about the customer used to determine price list eligibility. */
  contextRule?: InputMaybe<PriceListContextRuleInput>;
  /** The three-letter currency code for fixed prices associated with this price list. */
  currency?: InputMaybe<CurrencyCode>;
  /** The unique name of the price list, used as a human-readable identifier. */
  name?: InputMaybe<Scalars['String']>;
  /** Relative adjustments to other prices. */
  parent?: InputMaybe<PriceListParentUpdateInput>;
};

/** Possible error codes that can be returned by `PriceListUserError`. */
export type PriceListUserErrorCode =
  /** A price list context rule cannot have more than one country. */
  | 'CONTEXT_RULE_COUNTRIES_LIMIT'
  /** A price list for this country is already taken. */
  | 'CONTEXT_RULE_COUNTRY_TAKEN'
  /** Only one context rule option may be specified. */
  | 'CONTEXT_RULE_LIMIT_ONE_OPTION'
  /** Cannot save the price list with context rule because the limit of context rules per shop was reached. */
  | 'CONTEXT_RULE_LIMIT_REACHED'
  /** The specified market wasn't found. */
  | 'CONTEXT_RULE_MARKET_NOT_FOUND'
  /** A price list for this market is already taken. */
  | 'CONTEXT_RULE_MARKET_TAKEN'
  /** A country in a context rule must use a valid currency. */
  | 'COUNTRY_CURRENCY_MISMATCH'
  /** A price list’s currency must be of the pricing rule’s country. */
  | 'CURRENCY_COUNTRY_MISMATCH'
  /** A price list’s currency must be the market currency. */
  | 'CURRENCY_MARKET_MISMATCH'
  /** The price list currency is not supported by the shop's payment gateway. */
  | 'CURRENCY_NOT_SUPPORTED'
  /** The adjustment value must be a positive value and not be greater than 100% for `type` `PERCENTAGE_DECREASE` and not be greater than 1000% for `type` `PERCENTAGE_INCREASE`. */
  | 'INVALID_ADJUSTMENT_VALUE'
  /** The context rule's market does not use the price list currency. */
  | 'MARKET_CURRENCY_MISMATCH'
  /** Cannot create price list for a primary market. */
  | 'PRICE_LIST_NOT_ALLOWED_FOR_PRIMARY_MARKET'
  /** The specified price list doesn't exist. */
  | 'PRICE_LIST_NOT_FOUND'
  /** The input value is already taken. */
  | 'TAKEN';

/** The method by which the price rule's value is allocated to its entitled items. */
export type PriceRuleAllocationMethod =
  /** The value will be applied once across the entitled items. */
  | 'ACROSS'
  /** The value will be applied to each of the entitled items. */
  | 'EACH';

/** Specifies the input fields to update a price rule customer selection. */
export type PriceRuleCustomerSelectionInput = {
  /** List of customers to add to the current list of customers to whom the price rule applies. `savedSearchIds` must be empty. */
  customerIdsToAdd?: InputMaybe<Array<Scalars['ID']>>;
  /** A list of customers to remove from the current list of customers to whom the price rule applies. */
  customerIdsToRemove?: InputMaybe<Array<Scalars['ID']>>;
  /** Whether the price rule applies to all customers. */
  forAllCustomers?: InputMaybe<Scalars['Boolean']>;
  /** List of customer segments that contain the customers to whom the price rule applies. No single customer IDs may be present. */
  segmentIds?: InputMaybe<Array<Scalars['ID']>>;
};

/** Specifies the input fields to manipulate a discount code. */
export type PriceRuleDiscountCodeInput = {
  /** The code to use the discount. */
  code?: InputMaybe<Scalars['String']>;
};

/** Specifies the quantity of prerequisite items required for the price rule to be applicable, compared to quantity of entitled items. */
export type PriceRuleEntitlementToPrerequisiteQuantityRatioInput = {
  /** The quantity of entitled items in the ratio. */
  entitlementQuantity?: InputMaybe<Scalars['Int']>;
  /** The quantity of prerequisite items in the ratio. */
  prerequisiteQuantity?: InputMaybe<Scalars['Int']>;
};

/** Possible error codes that could be returned by a price rule mutation. */
export type PriceRuleErrorCode =
  /** The allocation method must be `ACROSS` for the provided target selection. */
  | 'ALLOCATION_METHOD_MUST_BE_ACROSS_FOR_GIVEN_TARGET_SELECTION'
  /** The discount must apply on either one-time purchase or subscription items, or both. */
  | 'APPLIES_ON_NOTHING'
  /** The input value is blank. */
  | 'BLANK'
  /** Invalid BOGO target selection. */
  | 'BOGO_INVALID_TARGET_SELECTION'
  /** Invalid BOGO target type. */
  | 'BOGO_INVALID_TARGET_TYPE'
  /** Invalid BOGO value type. */
  | 'BOGO_INVALID_VALUE_TYPE'
  /** Can't use both prerequisite customers and saved search. */
  | 'BOTH_CUSTOMER_AND_SAVED_SEARCH_PREREQUISITES_SELECTED'
  /** Can't have both prerequisite customers and prerequisite segments. */
  | 'BOTH_CUSTOMER_AND_SEGMENT_PREREQUISITES_SELECTED'
  /** Can't have both saved searches and segments prerequisites. */
  | 'BOTH_SAVED_SEARCH_AND_SEGMENT_PREREQUISITES_SELECTED'
  /** Can't entitle collections in combination with product variants or products. */
  | 'CANNOT_ENTITLE_COLLECTIONS_WITH_PRODUCTS_OR_VARIANTS'
  /** Can't use collections as a prequisite in combination with product variants or products. */
  | 'CANNOT_PREREQUISITE_COLLECTION_WITH_PRODUCT_OR_VARIANTS'
  /** The customer prerequisites exceeded the maximum number. */
  | 'CUSTOMER_PREREQUISITES_EXCEEDED_MAX'
  /** Invalid customer prerequisites selection. */
  | 'CUSTOMER_PREREQUISITES_INVALID_SELECTION'
  /** Customer prerequisites are missing. */
  | 'CUSTOMER_PREREQUISITES_MISSING'
  /** A duplicate customer prerequisite ID exists. */
  | 'CUSTOMER_PREREQUISITE_DUPLICATE'
  /** A duplicate customer saved search exists. */
  | 'CUSTOMER_SAVED_SEARCH_DUPLICATE'
  /** The customer saved search exceeded the maximum number. */
  | 'CUSTOMER_SAVED_SEARCH_EXCEEDED_MAX'
  /** Invalid customer saved search. */
  | 'CUSTOMER_SAVED_SEARCH_INVALID'
  /** The customer segment prerequisites exceeded the maximum number. */
  | 'CUSTOMER_SEGMENT_EXCEEDED_MAX'
  /** The customer segment prerequisite ID is invalid. */
  | 'CUSTOMER_SEGMENT_INVALID'
  /** A duplicate customer segment prerequisite ID exists. */
  | 'CUSTOMER_SEGMENT_PREREQUISITE_DUPLICATE'
  /** A duplicate discount code exists. */
  | 'DISCOUNT_CODE_DUPLICATE'
  /** The discount end date must be after the start date. */
  | 'END_DATE_BEFORE_START_DATE'
  /** The input value should be equal to the value allowed. */
  | 'EQUAL_TO'
  /** Can't exceed the maximum number. */
  | 'EXCEEDED_MAX'
  /** The input value should be greater than the minimum allowed value. */
  | 'GREATER_THAN'
  /** The input value should be greater than or equal to the minimum value allowed. */
  | 'GREATER_THAN_OR_EQUAL_TO'
  /** Unexpected internal error happened. */
  | 'INTERNAL_ERROR'
  /** The input value is invalid. */
  | 'INVALID'
  /** The `combinesWith` settings are invalid for the discount class. */
  | 'INVALID_COMBINES_WITH_FOR_DISCOUNT_CLASS'
  /** The discountClass is invalid for the price rule. */
  | 'INVALID_DISCOUNT_CLASS_FOR_PRICE_RULE'
  /** The target type is invalid when defining a prerequisite shipping price range. */
  | 'INVALID_TARGET_TYPE_PREREQUISITE_SHIPPING_PRICE_RANGE'
  /** Can't add the same collection twice. */
  | 'ITEM_ENTITLEMENTS_DUPLICATE_COLLECTION'
  /** Can't add the same product twice. */
  | 'ITEM_ENTITLEMENTS_DUPLICATE_PRODUCT'
  /** Can't add the same collection twice. */
  | 'ITEM_ENTITLEMENTS_DUPLICATE_VARIANT'
  /** Can't exceed the maximum number of collection entitlements. */
  | 'ITEM_ENTITLEMENTS_EXCEEDED_MAX_COLLECTION'
  /** Can't exceed the maximum number of product entitlements. */
  | 'ITEM_ENTITLEMENTS_EXCEEDED_MAX_PRODUCT'
  /** Can't exceed the maximum number of variant entitlements. */
  | 'ITEM_ENTITLEMENTS_EXCEEDED_MAX_VARIANT'
  /** Invalid collection. */
  | 'ITEM_ENTITLEMENTS_INVALID_COLLECTION'
  /** Invalid product. */
  | 'ITEM_ENTITLEMENTS_INVALID_PRODUCT'
  /** Invalid combination of target type and selection. */
  | 'ITEM_ENTITLEMENTS_INVALID_TARGET_TYPE_OR_SELECTION'
  /** Invalid variant. */
  | 'ITEM_ENTITLEMENTS_INVALID_VARIANT'
  /** Entitlements are missing. */
  | 'ITEM_ENTITLEMENTS_MISSING'
  /** Invalid entitlement type. */
  | 'ITEM_ENTITLEMENT_INVALID_TYPE'
  /** Can't add the same collection twice. */
  | 'ITEM_PREREQUISITES_DUPLICATE_COLLECTION'
  /** Can't add the same product twice. */
  | 'ITEM_PREREQUISITES_DUPLICATE_PRODUCT'
  /** Can't add the same variant twice. */
  | 'ITEM_PREREQUISITES_DUPLICATE_VARIANT'
  /** Can't exceed the maximum number of item prerequisites. */
  | 'ITEM_PREREQUISITES_EXCEEDED_MAX'
  /** Invalid collection. */
  | 'ITEM_PREREQUISITES_INVALID_COLLECTION'
  /** Invalid product. */
  | 'ITEM_PREREQUISITES_INVALID_PRODUCT'
  /** Invalid type. */
  | 'ITEM_PREREQUISITES_INVALID_TYPE'
  /** Invalid variant. */
  | 'ITEM_PREREQUISITES_INVALID_VARIANT'
  /** Item prerequisites must have at least one item prerequisite if the prerequisite quantity ratio is defined. */
  | 'ITEM_PREREQUISITES_MISSING'
  /** Item prerequisites must be empty if the prerequisite quantity ratio isn't defined. */
  | 'ITEM_PREREQUISITES_MUST_BE_EMPTY'
  /** The input value should be less than the maximum value allowed. */
  | 'LESS_THAN'
  /** The input value should be less than or equal to the maximum value allowed. */
  | 'LESS_THAN_OR_EQUAL_TO'
  /** Missing a required argument. */
  | 'MISSING_ARGUMENT'
  /** The recurring cycle limit must be 1 when a discount doesn't apply on subscription items. */
  | 'MULTIPLE_RECURRING_CYCLE_LIMIT_FOR_NON_SUBSCRIPTION_ITEMS'
  /** Only one of the minimum subtotal or minimum quantity condition can be defined. */
  | 'PREREQUISITE_SUBTOTAL_AND_QUANTITY_RANGE_BOTH_PRESENT'
  /** The allocation limit must be a non-zero positive number. */
  | 'PRICE_RULE_ALLOCATION_LIMIT_IS_ZERO'
  /** The allocation limit can only be set on Buy x, get y (BXGY) discounts. */
  | 'PRICE_RULE_ALLOCATION_LIMIT_ON_NON_BOGO'
  /** The number of discount codes in the shop has reached its limit. */
  | 'PRICE_RULE_EXCEEDED_MAX_DISCOUNT_CODE'
  /** The percentage value must be between 0 and -100. */
  | 'PRICE_RULE_PERCENTAGE_VALUE_OUTSIDE_RANGE'
  /** A duplicate country code exists. */
  | 'SHIPPING_ENTITLEMENTS_DUPLICATE_COUNTRY'
  /** Can't exceed the maximum number of entitlements. */
  | 'SHIPPING_ENTITLEMENTS_EXCEEDED_MAX'
  /** The country is unknown. */
  | 'SHIPPING_ENTITLEMENTS_INVALID_COUNTRY'
  /** Invalid target type or selection. */
  | 'SHIPPING_ENTITLEMENTS_INVALID_TARGET_TYPE_OR_SELECTION'
  /** Missing entitlements. */
  | 'SHIPPING_ENTITLEMENTS_MISSING'
  /** Unsupported destination type. */
  | 'SHIPPING_ENTITLEMENTS_UNSUPPORTED_DESTINATION_TYPE'
  /** The number of discounts in the shop has reached its limit. */
  | 'SHOP_EXCEEDED_MAX_PRICE_RULES'
  /** The input value is already taken. */
  | 'TAKEN'
  /** The input value is too long. */
  | 'TOO_LONG'
  /** Too many arguments provided. */
  | 'TOO_MANY_ARGUMENTS'
  /** The input value is too short. */
  | 'TOO_SHORT'
  /** The variant is already entitled through a product. */
  | 'VARIANT_ALREADY_ENTITLED_THROUGH_PRODUCT';

/** The list of features that can be supported by a price rule. */
export type PriceRuleFeature =
  /** The price rule supports bulk discounts. */
  | 'BULK'
  /** The price rule supports Buy X, Get Y (BXGY) discounts. */
  | 'BUY_ONE_GET_ONE'
  /** The price rule supports Buy X, Get Y (BXGY) discounts that specify a custom allocation limit. */
  | 'BUY_ONE_GET_ONE_WITH_ALLOCATION_LIMIT'
  /** The price rule supports discounts that require a quantity. */
  | 'QUANTITY_DISCOUNTS'
  /** The price rule targets specific customers. */
  | 'SPECIFIC_CUSTOMERS';

/** Specifies the input fields to manipulate a price rule. */
export type PriceRuleInput = {
  /** The maximum number of times that the price rule can be allocated onto an order. */
  allocationLimit?: InputMaybe<Scalars['Int']>;
  /** The method by which the price rule's value is allocated to its entitled items. */
  allocationMethod?: InputMaybe<PriceRuleAllocationMethod>;
  /** Determines which discount classes the discount can combine with. */
  combinesWith?: InputMaybe<DiscountCombinesWithInput>;
  /** The customers that can use this price rule. */
  customerSelection?: InputMaybe<PriceRuleCustomerSelectionInput>;
  /** The items to which the price rule applies. */
  itemEntitlements?: InputMaybe<PriceRuleItemEntitlementsInput>;
  /** The items required for the price rule to be applicable. */
  itemPrerequisites?: InputMaybe<PriceRuleItemPrerequisitesInput>;
  /** Whether the price rule can be applied only once per customer. */
  oncePerCustomer?: InputMaybe<Scalars['Boolean']>;
  /** The number of the entitled items must fall within this range for the price rule to be applicable. */
  prerequisiteQuantityRange?: InputMaybe<PriceRuleQuantityRangeInput>;
  /** The shipping cost must fall within this range for the price rule to be applicable. */
  prerequisiteShippingPriceRange?: InputMaybe<PriceRuleMoneyRangeInput>;
  /** The sum of the entitled items subtotal prices must fall within this range for the price rule to be applicable. */
  prerequisiteSubtotalRange?: InputMaybe<PriceRuleMoneyRangeInput>;
  /** Quantity of prerequisite items required for the price rule to be applicable, compared to quantity of entitled items. */
  prerequisiteToEntitlementQuantityRatio?: InputMaybe<PriceRulePrerequisiteToEntitlementQuantityRatioInput>;
  /** The shipping lines to which the price rule applies. */
  shippingEntitlements?: InputMaybe<PriceRuleShippingEntitlementsInput>;
  /** The type of lines (line_item or shipping_line) to which the price rule applies. */
  target?: InputMaybe<PriceRuleTarget>;
  /** Title of the price rule. */
  title?: InputMaybe<Scalars['String']>;
  /** The maximum number of times that the price rule can be used in total. */
  usageLimit?: InputMaybe<Scalars['Int']>;
  /** PriceRuleValidityPeriod for the price rule. */
  validityPeriod?: InputMaybe<PriceRuleValidityPeriodInput>;
  /** The value of the price rule. */
  value?: InputMaybe<PriceRuleValueInput>;
};

/** Specifies the input fields to update a price rule line item entitlement. */
export type PriceRuleItemEntitlementsInput = {
  /** The collections to which the price rule applies. */
  collectionIds?: InputMaybe<Array<Scalars['ID']>>;
  /** The products to which the price rule applies. */
  productIds?: InputMaybe<Array<Scalars['ID']>>;
  /** The product variants to which the price rule applies. */
  productVariantIds?: InputMaybe<Array<Scalars['ID']>>;
  /** Whether the price rule applies to all items. */
  targetAllLineItems?: InputMaybe<Scalars['Boolean']>;
};

/** Specifies the input fields to update a price rule's item prerequisites. */
export type PriceRuleItemPrerequisitesInput = {
  /** The collections needed for the price rule to be applied. */
  collectionIds?: InputMaybe<Array<Scalars['ID']>>;
  /** The products needed for the price rule to be applied. */
  productIds?: InputMaybe<Array<Scalars['ID']>>;
  /** The product variants needed for the price rule to be applied. */
  productVariantIds?: InputMaybe<Array<Scalars['ID']>>;
};

/**
 * Specifies the input fields to update the money range within which the price rule is applicable.
 *
 */
export type PriceRuleMoneyRangeInput = {
  /** The lower bound of the money range. */
  greaterThan?: InputMaybe<Scalars['Money']>;
  /** The lower or equal bound of the money range. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Money']>;
  /** The upper bound of the money range. */
  lessThan?: InputMaybe<Scalars['Money']>;
  /** The upper or equal bound of the money range. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Money']>;
};

/** Specifies the quantity of prerequisite items required for the price rule to be applicable, compared to quantity of entitled items. */
export type PriceRulePrerequisiteToEntitlementQuantityRatioInput = {
  /** The quantity of entitled items in the ratio. */
  entitlementQuantity?: InputMaybe<Scalars['Int']>;
  /** The quantity of prerequisite items in the ratio. */
  prerequisiteQuantity?: InputMaybe<Scalars['Int']>;
};

/**
 * Specifies the input fields to update the quantity range within which the price rule is applicable.
 *
 */
export type PriceRuleQuantityRangeInput = {
  /** The lower bound of the quantity range. */
  greaterThan?: InputMaybe<Scalars['Int']>;
  /** The lower or equal bound of the quantity range. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  /** The upper bound of the quantity range. */
  lessThan?: InputMaybe<Scalars['Int']>;
  /** The upper or equal bound of the quantity range. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']>;
};

/** The type of page where a shareable price rule URL lands. */
export type PriceRuleShareableUrlTargetType =
  /** The URL lands on a collection page. */
  | 'COLLECTION'
  /** The URL lands on a home page. */
  | 'HOME'
  /** The URL lands on a product page. */
  | 'PRODUCT';

/** Specifies the input fields to update a price rule shipping entitlement. */
export type PriceRuleShippingEntitlementsInput = {
  /** The codes for the countries to which the price rule applies to. */
  countryCodes?: InputMaybe<Array<CountryCode>>;
  /** Whether the price rule is applicable to countries that have not been defined in the shop's shipping zones. */
  includeRestOfWorld?: InputMaybe<Scalars['Boolean']>;
  /** Whether the price rule applies to all shipping lines. */
  targetAllShippingLines?: InputMaybe<Scalars['Boolean']>;
};

/** The set of valid sort keys for the PriceRule query. */
export type PriceRuleSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `ends_at` value. */
  | 'ENDS_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `starts_at` value. */
  | 'STARTS_AT'
  /** Sort by the `title` value. */
  | 'TITLE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** The status of the price rule. */
export type PriceRuleStatus =
  /** The price rule is active. */
  | 'ACTIVE'
  /** The price rule is expired. */
  | 'EXPIRED'
  /** The price rule is scheduled. */
  | 'SCHEDULED';

/** The type of lines (line_item or shipping_line) to which the price rule applies. */
export type PriceRuleTarget =
  /** The price rule applies to line items. */
  | 'LINE_ITEM'
  /** The price rule applies to shipping lines. */
  | 'SHIPPING_LINE';

/** The list of features that can be supported by a price rule. */
export type PriceRuleTrait =
  /** The price rule supports bulk discounts. */
  | 'BULK'
  /** The price rule supports Buy X, Get Y (BXGY) discounts. */
  | 'BUY_ONE_GET_ONE'
  /** The price rule supports Buy X, Get Y (BXGY) discounts that specify a custom allocation limit. */
  | 'BUY_ONE_GET_ONE_WITH_ALLOCATION_LIMIT'
  /** The price rule supports discounts that require a quantity. */
  | 'QUANTITY_DISCOUNTS'
  /** The price rule targets specific customers. */
  | 'SPECIFIC_CUSTOMERS';

/** Specifies the input fields to update the validity period of a price rule. */
export type PriceRuleValidityPeriodInput = {
  /** The time after which the price rule becomes invalid. */
  end?: InputMaybe<Scalars['DateTime']>;
  /** The time after which the price rule is valid. */
  start: Scalars['DateTime'];
};

/** Specifies the input fields to update a price rule. */
export type PriceRuleValueInput = {
  /** The fixed amount value of the price rule. */
  fixedAmountValue?: InputMaybe<Scalars['Money']>;
  /** The percentage value of the price rule. */
  percentageValue?: InputMaybe<Scalars['Float']>;
};

/**
 * The input fields for the private metafield to delete.
 *
 */
export type PrivateMetafieldDeleteInput = {
  /** The key of the private metafield. */
  key: Scalars['String'];
  /** The namespace of the private metafield. */
  namespace: Scalars['String'];
  /** The ID of the resource that owns the metafield. If the field is blank, then the `Shop` resource owns the metafield. */
  owner?: InputMaybe<Scalars['ID']>;
};

/**
 * The input fields for a private metafield.
 *
 */
export type PrivateMetafieldInput = {
  /** The key of the private metafield. */
  key: Scalars['String'];
  /** The namespace of the private metafield. */
  namespace: Scalars['String'];
  /** The resource that owns the metafield. If the field is blank, then the `Shop` resource owns the metafield. */
  owner?: InputMaybe<Scalars['ID']>;
  /** The `value` and `valueType` of the private metafield, wrapped in a `ValueInput` object. */
  valueInput: PrivateMetafieldValueInput;
};

/**
 * The value input contains the value and value type of the private metafield.
 *
 */
export type PrivateMetafieldValueInput = {
  /** The value of a private metafield. */
  value: Scalars['String'];
  /** Represents the private metafield value type. */
  valueType: PrivateMetafieldValueType;
};

/** Supported private metafield value types. */
export type PrivateMetafieldValueType =
  /** An integer metafield. */
  | 'INTEGER'
  /** A JSON string metafield. */
  | 'JSON_STRING'
  /** A string metafield. */
  | 'STRING';

/** Specifies product images to append. */
export type ProductAppendImagesInput = {
  /** The ID of the product. */
  id: Scalars['ID'];
  /** A list of images to be appended to the product. */
  images: Array<ImageInput>;
};

/** The input fields to use when adding a product category to a product. The [Shopify product taxonomy](https://help.shopify.com/txt/product_taxonomy/en.txt) contains the full list of available values. */
export type ProductCategoryInput = {
  /** The ID of the node in the Shopify taxonomy that represents the product category. */
  productTaxonomyNodeId: Scalars['ID'];
};

/** Possible error codes that can be returned by `ProductChangeStatusUserError`. */
export type ProductChangeStatusUserErrorCode =
  /** Product could not be found. */
  | 'PRODUCT_NOT_FOUND';

/** The set of valid sort keys for the ProductCollection query. */
export type ProductCollectionSortKeys =
  /** Sort by the `best-selling` value. */
  | 'BEST_SELLING'
  /** Sort by the `collection-default` value. */
  | 'COLLECTION_DEFAULT'
  /** Sort by the `created` value. */
  | 'CREATED'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `manual` value. */
  | 'MANUAL'
  /** Sort by the `price` value. */
  | 'PRICE'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE';

/** Specifies the product to delete. */
export type ProductDeleteInput = {
  /** The ID of the product. */
  id: Scalars['ID'];
};

/** The set of valid sort keys for the ProductImage query. */
export type ProductImageSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `position` value. */
  | 'POSITION'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** Specifies the input fields required to create a product. */
export type ProductInput = {
  /** The IDs of the collections that this product will be added to. */
  collectionsToJoin?: InputMaybe<Array<Scalars['ID']>>;
  /** The IDs of collections that will no longer include the existing product. */
  collectionsToLeave?: InputMaybe<Array<Scalars['ID']>>;
  /** The custom product type specified by the merchant. */
  customProductType?: InputMaybe<Scalars['String']>;
  /** The description of the product, complete with HTML formatting. */
  descriptionHtml?: InputMaybe<Scalars['String']>;
  /** Whether the product is a gift card. */
  giftCard?: InputMaybe<Scalars['Boolean']>;
  /** The theme template used when viewing the gift card in a store. */
  giftCardTemplateSuffix?: InputMaybe<Scalars['String']>;
  /**
   * A unique, human-friendly string for the product.
   * Automatically generated from the product's title unless otherwise specified.
   *
   */
  handle?: InputMaybe<Scalars['String']>;
  /** Specifies the product to update in productUpdate or creates a new product if absent in productCreate. */
  id?: InputMaybe<Scalars['ID']>;
  /** The images to associate with the product. */
  images?: InputMaybe<Array<ImageInput>>;
  /** The metafields to associate with this product. */
  metafields?: InputMaybe<Array<MetafieldInput>>;
  /** List of custom product options (maximum of 3 per product). */
  options?: InputMaybe<Array<Scalars['String']>>;
  /** The private metafields to associate with this product. */
  privateMetafields?: InputMaybe<Array<PrivateMetafieldInput>>;
  /** The product category in the Shopify product taxonomy. */
  productCategory?: InputMaybe<ProductCategoryInput>;
  /** The product type specified by the merchant. */
  productType?: InputMaybe<Scalars['String']>;
  /**
   * Whether a redirect is required after a new handle has been provided.
   * If true, then the old handle is redirected to the new one automatically.
   *
   */
  redirectNewHandle?: InputMaybe<Scalars['Boolean']>;
  /** Whether the product can only be purchased with a selling plan (subscription). Products that are sold exclusively on subscription can only be created on online stores. If set to `true` on an already existing product, then the product will be marked unavailable on channels that don't support subscriptions. */
  requiresSellingPlan?: InputMaybe<Scalars['Boolean']>;
  /** The SEO information associated with the product. */
  seo?: InputMaybe<SeoInput>;
  /** The standardized product type in the Shopify product taxonomy. */
  standardizedProductType?: InputMaybe<StandardizedProductTypeInput>;
  /** The status of the product. */
  status?: InputMaybe<ProductStatus>;
  /** A comma separated list of tags that have been added to the product. */
  tags?: InputMaybe<Array<Scalars['String']>>;
  /** The theme template used when viewing the product in a store. */
  templateSuffix?: InputMaybe<Scalars['String']>;
  /** The title of the product. */
  title?: InputMaybe<Scalars['String']>;
  /** A list of variants associated with the product. */
  variants?: InputMaybe<Array<ProductVariantInput>>;
  /** The name of the product's vendor. */
  vendor?: InputMaybe<Scalars['String']>;
};

/** The set of valid sort keys for the ProductMedia query. */
export type ProductMediaSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `position` value. */
  | 'POSITION'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** Specifies a publication to which a product will be published. */
export type ProductPublicationInput = {
  /** ID of the publication. */
  publicationId?: InputMaybe<Scalars['ID']>;
  /** The date and time that the product was (or will be) published. */
  publishDate?: InputMaybe<Scalars['DateTime']>;
};

/** Specifies a product to publish and the channels to publish it to. */
export type ProductPublishInput = {
  /** The product to create or update publications for. */
  id: Scalars['ID'];
  /** The publication that the product is published to. */
  productPublications: Array<ProductPublicationInput>;
};

/** The input fields used to create a product feedback. */
export type ProductResourceFeedbackInput = {
  /**
   * The date and time when the payload is constructed.
   * Used to help determine whether incoming feedback is outdated compared to feedback already received, and if it should be ignored upon arrival.
   *
   */
  feedbackGeneratedAt: Scalars['DateTime'];
  /**
   * A concise set of copy strings to be displayed to merchants. Used to guide merchants in resolving problems that your app encounters when trying to make use of their products.
   * You can specify up to four messages. Each message is limited to 100 characters.
   *
   */
  messages?: InputMaybe<Array<Scalars['String']>>;
  /** The ID of the product that the feedback was created on. */
  productId: Scalars['ID'];
  /** The timestamp of the product associated with the feedback. */
  productUpdatedAt: Scalars['DateTime'];
  /** Whether the merchant needs to take action on the product. */
  state: ResourceFeedbackState;
};

/** The set of valid sort keys for the Product query. */
export type ProductSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `inventory_total` value. */
  | 'INVENTORY_TOTAL'
  /** Sort by the `product_type` value. */
  | 'PRODUCT_TYPE'
  /** Sort by the `published_at` value. */
  | 'PUBLISHED_AT'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT'
  /** Sort by the `vendor` value. */
  | 'VENDOR';

/** The possible product statuses. */
export type ProductStatus =
  /** The product is ready to sell and can be published to sales channels and apps. Products with an active status aren't automatically published to sales channels, such as the online store, or apps. By default, existing products are set to active. */
  | 'ACTIVE'
  /** The product is no longer being sold and isn't available to customers on sales channels and apps. */
  | 'ARCHIVED'
  /** The product isn't ready to sell and is unavailable to customers on sales channels and apps. By default, duplicated and unarchived products are set to draft. */
  | 'DRAFT';

/** Specifies a product to unpublish from a channel and the sales channels to unpublish it from. */
export type ProductUnpublishInput = {
  /** The ID of the product to create or update publications for. */
  id: Scalars['ID'];
  /** The channels to unpublish the product from. */
  productPublications: Array<ProductPublicationInput>;
};

/** Specifies the input fields required to append media to a single variant. */
export type ProductVariantAppendMediaInput = {
  /** Specifies the media to append to the variant. */
  mediaIds: Array<Scalars['ID']>;
  /** Specifies the variant to which media will be appended. */
  variantId: Scalars['ID'];
};

/** Specifies the input fields required to detach media from a single variant. */
export type ProductVariantDetachMediaInput = {
  /** Specifies the media to detach from the variant. */
  mediaIds: Array<Scalars['ID']>;
  /** Specifies the variant from which media will be detached. */
  variantId: Scalars['ID'];
};

/** Specifies a product variant to create or update. */
export type ProductVariantInput = {
  /** The value of the barcode associated with the product. */
  barcode?: InputMaybe<Scalars['String']>;
  /** The compare-at price of the variant. */
  compareAtPrice?: InputMaybe<Scalars['Money']>;
  /** The Harmonized System code (or HS Tariff code) for the variant. */
  harmonizedSystemCode?: InputMaybe<Scalars['String']>;
  /** Specifies the product variant to update or create a new variant if absent. */
  id?: InputMaybe<Scalars['ID']>;
  /** The ID of the image that's associated with the variant. */
  imageId?: InputMaybe<Scalars['ID']>;
  /**
   * The URL of an image to associate with the variant.  This field can only be used through mutations that create product images and must match one of the URLs being created on the product.
   *
   */
  imageSrc?: InputMaybe<Scalars['String']>;
  /** The inventory item associated with the variant. Used for unit cost. */
  inventoryItem?: InputMaybe<InventoryItemInput>;
  /** Whether customers are allowed to place an order for the product variant when it's out of stock. */
  inventoryPolicy?: InputMaybe<ProductVariantInventoryPolicy>;
  /** The inventory quantities at each location where the variant is stocked. Used as input only to the `productVariantCreate` mutation. */
  inventoryQuantities?: InputMaybe<Array<InventoryLevelInput>>;
  /** The URL of the media to associate with the variant. This field can only be used in mutations that create media images and must match one of the URLs being created on the product. This field only accepts one value. */
  mediaSrc?: InputMaybe<Array<Scalars['String']>>;
  /** Additional customizable information about the product variant. */
  metafields?: InputMaybe<Array<MetafieldInput>>;
  /** The custom properties that a shop owner uses to define product variants. */
  options?: InputMaybe<Array<Scalars['String']>>;
  /**
   * The order of the product variant in the list of product variants. The first position in the list is 1.
   *
   */
  position?: InputMaybe<Scalars['Int']>;
  /** The price of the variant. */
  price?: InputMaybe<Scalars['Money']>;
  /** The private metafields associated with the product. */
  privateMetafields?: InputMaybe<Array<PrivateMetafieldInput>>;
  /** The product to create the variant for. Used as input only to the `productVariantCreate` mutation. */
  productId?: InputMaybe<Scalars['ID']>;
  /** Whether the variant requires shipping. */
  requiresShipping?: InputMaybe<Scalars['Boolean']>;
  /** The SKU for the variant. */
  sku?: InputMaybe<Scalars['String']>;
  /** The tax code associated with the variant. */
  taxCode?: InputMaybe<Scalars['String']>;
  /** Whether the variant is taxable. */
  taxable?: InputMaybe<Scalars['Boolean']>;
  /** The weight of the variant. */
  weight?: InputMaybe<Scalars['Float']>;
  /** The unit of weight that's used to measure the variant. */
  weightUnit?: InputMaybe<WeightUnit>;
};

/** The valid values for the method of inventory tracking for a product variant. */
export type ProductVariantInventoryManagement =
  /** This product variant's inventory is tracked by a third-party fulfillment service. */
  | 'FULFILLMENT_SERVICE'
  /** This product variant's inventory is not tracked. */
  | 'NOT_MANAGED'
  /** This product variant's inventory is tracked by Shopify. In the unstable API version, this product variant's inventory could also be tracked by both Shopify and a third-party fulfillment service. */
  | 'SHOPIFY';

/**
 * The valid values for the inventory policy of a product variant once it is out of stock.
 *
 */
export type ProductVariantInventoryPolicy =
  /** Customers can buy this product variant after it's out of stock. */
  | 'CONTINUE'
  /** Customers can't buy this product variant after it's out of stock. */
  | 'DENY';

/** Represents a product variant position. */
export type ProductVariantPositionInput = {
  /** Specifies the ID of the product variant to update. */
  id: Scalars['ID'];
  /** The order of the product variant in the list of product variants. The first position in the list is 1. */
  position: Scalars['Int'];
};

/** The set of valid sort keys for the ProductVariant query. */
export type ProductVariantSortKeys =
  /** Sort by the `full_title` value. */
  | 'FULL_TITLE'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `inventory_levels.available` value. */
  | 'INVENTORY_LEVELS_AVAILABLE'
  /** Sort by the `inventory_management` value. */
  | 'INVENTORY_MANAGEMENT'
  /** Sort by the `inventory_policy` value. */
  | 'INVENTORY_POLICY'
  /** Sort by the `inventory_quantity` value. */
  | 'INVENTORY_QUANTITY'
  /** Sort by the `name` value. */
  | 'NAME'
  /** Sort by the `popular` value. */
  | 'POPULAR'
  /** Sort by the `position` value. */
  | 'POSITION'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `sku` value. */
  | 'SKU'
  /** Sort by the `title` value. */
  | 'TITLE';

/** Possible error codes that can be returned by `ProductVariantsBulkCreateUserError`. */
export type ProductVariantsBulkCreateUserErrorCode =
  /** Variant price must be greater than or equal to zero. */
  | 'GREATER_THAN_OR_EQUAL_TO'
  /** Invalid input detected. */
  | 'INVALID'
  /** Input must be for this product. */
  | 'MUST_BE_FOR_THIS_PRODUCT'
  /** Variant options are not enough. */
  | 'NEED_TO_ADD_OPTION_VALUES'
  /** Price cannot take a negative value. */
  | 'NEGATIVE_PRICE_VALUE'
  /** Input is not defined for this shop. */
  | 'NOT_DEFINED_FOR_SHOP'
  /** On create, this key cannot be used. */
  | 'NO_KEY_ON_CREATE'
  /** Variant options are more than the product options. */
  | 'OPTION_VALUES_FOR_NUMBER_OF_UNKNOWN_OPTIONS'
  /** Product does not exist. */
  | 'PRODUCT_DOES_NOT_EXIST'
  /** You reached the limit of available SKUs in your current plan. */
  | 'SUBSCRIPTION_VIOLATION'
  /** Inventory locations cannot exceed the allowed resource limit or 10. */
  | 'TOO_MANY_INVENTORY_LOCATIONS'
  /** Quantity could not be set. The location was not found. */
  | 'TRACKED_VARIANT_LOCATION_NOT_FOUND'
  /** Variant already exists. */
  | 'VARIANT_ALREADY_EXISTS'
  /** Variant options already exist. Please change the variant option(s). */
  | 'VARIANT_ALREADY_EXISTS_CHANGE_OPTION_VALUE';

/** Possible error codes that can be returned by `ProductVariantsBulkDeleteUserError`. */
export type ProductVariantsBulkDeleteUserErrorCode =
  /** The variant does not exist. */
  | 'AT_LEAST_ONE_VARIANT_DOES_NOT_BELONG_TO_THE_PRODUCT'
  /** Cannot delete default variant. */
  | 'CANNOT_DELETE_LAST_VARIANT'
  /** Product does not exist. */
  | 'PRODUCT_DOES_NOT_EXIST';

/** Specifies a product variant to create as part of a variant bulk mutation. */
export type ProductVariantsBulkInput = {
  /** The value of the barcode associated with the product variant. */
  barcode?: InputMaybe<Scalars['String']>;
  /** The compare-at price of the variant. */
  compareAtPrice?: InputMaybe<Scalars['Money']>;
  /** The Harmonized System code (or HS Tariff code) for the variant. */
  harmonizedSystemCode?: InputMaybe<Scalars['String']>;
  /** Specifies the product variant to update or delete. */
  id?: InputMaybe<Scalars['ID']>;
  /** The ID of the image that's associated with the variant. */
  imageId?: InputMaybe<Scalars['ID']>;
  /**
   * The URL of an image to associate with the variant.  This field can only be used through mutations that create product images and must match one of the URLs being created on the product.
   *
   */
  imageSrc?: InputMaybe<Scalars['String']>;
  /** The inventory item associated with the variant, used for unit cost. */
  inventoryItem?: InputMaybe<InventoryItemInput>;
  /** Whether customers are allowed to place an order for the variant when it's out of stock. */
  inventoryPolicy?: InputMaybe<ProductVariantInventoryPolicy>;
  /**
   * The inventory quantities at each location where the variant is stocked. The number of elements
   * in the array of inventory quantities cannot exceed 10 and the amount specified for the plan. Used as input only to the `productVariantCreate` mutation.
   *
   */
  inventoryQuantities?: InputMaybe<Array<InventoryLevelInput>>;
  /** The URL of the media to associate with the variant. */
  mediaSrc?: InputMaybe<Array<Scalars['String']>>;
  /** The additional customizable information about the product variant. */
  metafields?: InputMaybe<Array<MetafieldInput>>;
  /** The custom properties that a shop owner uses to define product variants. */
  options?: InputMaybe<Array<Scalars['String']>>;
  /** The price of the variant. */
  price?: InputMaybe<Scalars['Money']>;
  /** The private metafields associated with the product. */
  privateMetafields?: InputMaybe<Array<PrivateMetafieldInput>>;
  /** Whether the variant requires shipping. */
  requiresShipping?: InputMaybe<Scalars['Boolean']>;
  /** The SKU for the variant. */
  sku?: InputMaybe<Scalars['String']>;
  /** The tax code associated with the variant. */
  taxCode?: InputMaybe<Scalars['String']>;
  /** Whether the variant is taxable. */
  taxable?: InputMaybe<Scalars['Boolean']>;
  /** The weight of the variant. */
  weight?: InputMaybe<Scalars['Float']>;
  /** The unit of weight that's used to measure the variant. */
  weightUnit?: InputMaybe<WeightUnit>;
};

/** Possible error codes that can be returned by `ProductVariantsBulkReorderUserError`. */
export type ProductVariantsBulkReorderUserErrorCode =
  /** Product variant IDs must be unique. */
  | 'DUPLICATED_VARIANT_ID'
  /** Product variant position cannot be zero or negative number. */
  | 'INVALID_POSITION'
  /** Product variant does not exist. */
  | 'MISSING_VARIANT'
  /** Product does not exist. */
  | 'PRODUCT_DOES_NOT_EXIST';

/** Possible error codes that can be returned by `ProductVariantsBulkUpdateUserError`. */
export type ProductVariantsBulkUpdateUserErrorCode =
  /** The price of the variant must be greater than or equal to zero. */
  | 'GREATER_THAN_OR_EQUAL_TO'
  /** Variant options are not enough. */
  | 'NEED_TO_ADD_OPTION_VALUES'
  /** Price cannot take a negative value. */
  | 'NEGATIVE_PRICE_VALUE'
  /** Inventory quantities cannot be provided during update. */
  | 'NO_INVENTORY_QUANTITES_DURING_UPDATE'
  /** Inventory quantities cannot be updated with variants API. */
  | 'NO_INVENTORY_QUANTITIES_ON_VARIANTS_UPDATE'
  /** Variant options are more than the product options. */
  | 'OPTION_VALUES_FOR_NUMBER_OF_UNKNOWN_OPTIONS'
  /** Product does not exist. */
  | 'PRODUCT_DOES_NOT_EXIST'
  /** Product variant does not exist. */
  | 'PRODUCT_VARIANT_DOES_NOT_EXIST'
  /** Product variant is missing ID attribute. */
  | 'PRODUCT_VARIANT_ID_MISSING'
  /** You reached the limit of available SKUs in your current plan. */
  | 'SUBSCRIPTION_VIOLATION'
  /** The variant already exists. */
  | 'VARIANT_ALREADY_EXISTS';

/** The set of valid sort keys for the ProfileItem query. */
export type ProfileItemSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `inventory_total` value. */
  | 'INVENTORY_TOTAL'
  /** Sort by the `product_type` value. */
  | 'PRODUCT_TYPE'
  /** Sort by the `published_at` value. */
  | 'PUBLISHED_AT'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT'
  /** Sort by the `vendor` value. */
  | 'VENDOR';

/** Possible error codes that can be returned by `PubSubWebhookSubscriptionCreateUserError`. */
export type PubSubWebhookSubscriptionCreateUserErrorCode =
  /** Invalid parameters provided. */
  | 'INVALID_PARAMETERS';

/**
 * Specifies the input fields for a PubSub webhook subscription.
 *
 */
export type PubSubWebhookSubscriptionInput = {
  /** The format in which the webhook subscription should send the data. */
  format?: InputMaybe<WebhookSubscriptionFormat>;
  /** The list of fields to be included in the webhook subscription. */
  includeFields?: InputMaybe<Array<Scalars['String']>>;
  /** The list of namespaces for any metafields that should be included in the webhook subscription. */
  metafieldNamespaces?: InputMaybe<Array<Scalars['String']>>;
  /** The Pub/Sub project ID. */
  pubSubProject: Scalars['String'];
  /** The Pub/Sub topic ID. */
  pubSubTopic: Scalars['String'];
};

/** Possible error codes that can be returned by `PubSubWebhookSubscriptionUpdateUserError`. */
export type PubSubWebhookSubscriptionUpdateUserErrorCode =
  /** Invalid parameters provided. */
  | 'INVALID_PARAMETERS';

/** Specifies the input fields required to publish a resource. */
export type PublicationInput = {
  /** ID of the publication. */
  publicationId?: InputMaybe<Scalars['ID']>;
  /**
   * The date and time that the resource was published. Setting this to a date in the future will schedule the resource to be published. Only online store channels support future publishing. This field has no effect if you include it in the `publishableUnpublish` mutation.
   *
   */
  publishDate?: InputMaybe<Scalars['DateTime']>;
};

/**
 * Represents a purchasing company, which is a combination of company, company contact, and company location.
 *
 */
export type PurchasingCompanyInput = {
  /** ID of the company contact. */
  companyContactId: Scalars['ID'];
  /** ID of the company. */
  companyId: Scalars['ID'];
  /** ID of the company location. */
  companyLocationId: Scalars['ID'];
};

/** Represents a purchasing entity. Can either be a customer or a purchasing company. */
export type PurchasingEntityInput = {
  /** Represents a customer. Null if there is a purchasing company. */
  customerId?: InputMaybe<Scalars['ID']>;
  /** Represents a purchasing company. Null if there is a customer. */
  purchasingCompany?: InputMaybe<PurchasingCompanyInput>;
};

/** The fields required to reimburse duties on a refund. */
export type RefundDutyInput = {
  /** The ID of the duty in the refund. */
  dutyId: Scalars['ID'];
  /** The type of refund for this duty. */
  refundType?: InputMaybe<RefundDutyRefundType>;
};

/** The type of refund to perform for a particular refund duty. */
export type RefundDutyRefundType =
  /** The duty is fully refunded. */
  | 'FULL'
  /** The duty is proportionally refunded based on the quantity of the refunded line item. */
  | 'PROPORTIONAL';

/** The input fields to create a refund. */
export type RefundInput = {
  /** The currency that is used to refund the order. This must be the presentment currency, which is the currency used by the customer. This is a required field for orders where the currency and presentment currency differ. */
  currency?: InputMaybe<CurrencyCode>;
  /** An optional note that is attached to the refund. */
  note?: InputMaybe<Scalars['String']>;
  /** Whether to send a refund notification to the customer. */
  notify?: InputMaybe<Scalars['Boolean']>;
  /** The ID of the order that is being refunded. */
  orderId: Scalars['ID'];
  /** A list of duties to refund. */
  refundDuties?: InputMaybe<Array<RefundDutyInput>>;
  /** A list of line items to refund. */
  refundLineItems?: InputMaybe<Array<RefundLineItemInput>>;
  /** The input fields that are required to reimburse shipping costs. */
  shipping?: InputMaybe<ShippingRefundInput>;
  /** A list of transactions involved in the refund. */
  transactions?: InputMaybe<Array<OrderTransactionInput>>;
};

/** The fields required to reimburse line items on a refund. */
export type RefundLineItemInput = {
  /** The ID of the line item in the refund. */
  lineItemId: Scalars['ID'];
  /** The intended location for restocking. If the `restockType` is set to `NO_RESTOCK`, then this value is empty.` */
  locationId?: InputMaybe<Scalars['ID']>;
  /** The quantity of the associated line item to be refunded. */
  quantity: Scalars['Int'];
  /** The type of restock for this line item. */
  restockType?: InputMaybe<RefundLineItemRestockType>;
};

/** The type of restock performed for a particular refund line item. */
export type RefundLineItemRestockType =
  /** The refund line item was canceled. Use this when restocking unfulfilled line items. */
  | 'CANCEL'
  /** Deprecated. The refund line item was restocked, without specifically beingidentified as a return or cancelation. This value is not accepted when creating new refunds. */
  | 'LEGACY_RESTOCK'
  /** Refund line item was not restocked. */
  | 'NO_RESTOCK'
  /** The refund line item was returned. Use this when restocking line items that were fulfilled. */
  | 'RETURN';

/**
 * Input for a remote Authorize.net customer payment profile.
 *
 */
export type RemoteAuthorizeNetCustomerPaymentProfileInput = {
  /**
   * The customerPaymentProfileId value from the Authorize.net API.
   *
   */
  customerPaymentProfileId?: InputMaybe<Scalars['String']>;
  /**
   * The customerProfileId value from the Authorize.net API.
   *
   */
  customerProfileId: Scalars['String'];
};

/**
 * The input fields for a remote Braintree customer payment profile.
 *
 */
export type RemoteBraintreePaymentMethodInput = {
  /**
   * The `customer_id` value from the Braintree API.
   *
   */
  customerId: Scalars['String'];
  /**
   * The `payment_method_token` value from the Braintree API.
   *
   */
  paymentMethodToken?: InputMaybe<Scalars['String']>;
};

/**
 * Input for a remote stripe payment method.
 *
 */
export type RemoteStripePaymentMethodInput = {
  /**
   * The customer_id value from the Stripe API.
   *
   */
  customerId: Scalars['String'];
  /**
   * The payment_method_id value from the Stripe API.
   *
   */
  paymentMethodId?: InputMaybe<Scalars['String']>;
};

/** The available icons for resource alerts. */
export type ResourceAlertIcon =
  /** A checkmark inside a circle. */
  | 'CHECKMARK_CIRCLE'
  /** A lowercase `i` inside a circle. */
  | 'INFORMATION_CIRCLE';

/** The possible severity levels for a resource alert. */
export type ResourceAlertSeverity =
  /** Indicates a critical alert. For example, a blocked app. */
  | 'CRITICAL'
  /** Indicates a neutral alert. For example, an accepted dispute. */
  | 'DEFAULT'
  | 'ERROR'
  /** Indicates an informative alert. For example, an escalated dispute. */
  | 'INFO'
  /** Indicates a success alert. For example, a winning a dispute. */
  | 'SUCCESS'
  /** Indicates an informative alert. For example, a new dispute. */
  | 'WARNING';

/** The state of the resource feedback. */
export type ResourceFeedbackState =
  /** No action required from merchant. */
  | 'ACCEPTED'
  /** The merchant needs to resolve an issue with the resource. */
  | 'REQUIRES_ACTION';

/** SEO information. */
export type SeoInput = {
  /** SEO description of the product. */
  description?: InputMaybe<Scalars['String']>;
  /** SEO title of the product. */
  title?: InputMaybe<Scalars['String']>;
};

/** The possible order action types for a sale. */
export type SaleActionType =
  /** A purchase or charge. */
  | 'ORDER'
  /** A removal or return. */
  | 'RETURN'
  /** An unknown order action. Represents new actions that may be added in future versions. */
  | 'UNKNOWN'
  /** A change to the price, taxes, or discounts for a prior purchase. */
  | 'UPDATE';

/** The possible line types for a sale record. One of the possible order line types for a sale is an adjustment. Sales adjustments occur when a refund is issued for a line item that is either more or less than the total value of the line item. Examples are restocking fees and goodwill payments. When this happens, Shopify produces a sales agreement with sale records for each line item that is returned or refunded and an additional sale record for the adjustment (for example, a restocking fee). The sales records for the returned or refunded items represent the reversal of the original line item sale value. The additional adjustment sale record represents the difference between the original total value of all line items that were refunded, and the actual amount refunded. */
export type SaleLineType =
  /** A sale adjustment. */
  | 'ADJUSTMENT'
  /** A duty charge. */
  | 'DUTY'
  /** A gift card. */
  | 'GIFT_CARD'
  /** A product purchased, returned or exchanged. */
  | 'PRODUCT'
  /** A shipping cost. */
  | 'SHIPPING'
  /** A tip added by the customer. */
  | 'TIP'
  /** An unknown sale line. Represents new types that may be added in future versions. */
  | 'UNKNOWN';

/** Specifies the fields required to create a saved search. */
export type SavedSearchCreateInput = {
  /** A descriptive name of the saved search. */
  name: Scalars['String'];
  /** The query string of a saved search. This includes search terms and filters. */
  query: Scalars['String'];
  /** The type of resource this saved search is searching in. */
  resourceType: SearchResultType;
};

/** Specifies the fields to delete a saved search. */
export type SavedSearchDeleteInput = {
  /** ID of the saved search to delete. */
  id: Scalars['ID'];
};

/** Specifies the fields required to update a saved search. */
export type SavedSearchUpdateInput = {
  /** ID of the saved search to update. */
  id: Scalars['ID'];
  /** A descriptive name of the saved search. */
  name?: InputMaybe<Scalars['String']>;
  /** The query string of a saved search. This included search terms and filters. */
  query?: InputMaybe<Scalars['String']>;
};

/**
 * The page or pages on the online store where the script should be included.
 *
 */
export type ScriptTagDisplayScope =
  /** Include the script on both the web storefront and the order status page. */
  | 'ALL'
  /** Include the script only on the web storefront. */
  | 'ONLINE_STORE'
  /** Include the script only on the order status page. */
  | 'ORDER_STATUS';

/**
 * The input fields for a script tag. This input object is used when creating or updating
 * a script tag to specify its URL, where it should be included, and how it will be cached.
 *
 */
export type ScriptTagInput = {
  /**
   * Whether the Shopify CDN can cache and serve the script tag.
   * If `true`, then the script will be cached and served by the CDN.
   * The cache expires 15 minutes after the script tag is successfully returned.
   * If `false`, then the script is served as is.
   * The default value is `false`.
   *
   */
  cache?: InputMaybe<Scalars['Boolean']>;
  /** The page or pages on the online store where the script should be included. */
  displayScope?: InputMaybe<ScriptTagDisplayScope>;
  /** The URL of the remote script. For example: `https://example.com/path/to/script.js`. */
  src?: InputMaybe<Scalars['URL']>;
};

/** Specifies the type of resources to be returned from a search. */
export type SearchResultType =
  | 'COLLECTION'
  | 'CUSTOMER'
  /** A code discount redeem code. */
  | 'DISCOUNT_REDEEM_CODE'
  | 'DRAFT_ORDER'
  /** A file. */
  | 'FILE'
  | 'ONLINE_STORE_ARTICLE'
  | 'ONLINE_STORE_BLOG'
  | 'ONLINE_STORE_PAGE'
  | 'ORDER'
  | 'PRICE_RULE'
  | 'PRODUCT'
  /** A URL redirect. */
  | 'URL_REDIRECT';

/** The set of valid sort keys for the Segment query. */
export type SegmentSortKeys =
  /** Sort by the `creation_date` value. */
  | 'CREATION_DATE'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `last_edit_date` value. */
  | 'LAST_EDIT_DATE'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** Specifies the input fields required to create or update a selling plan anchor. */
export type SellingPlanAnchorInput = {
  /**
   * The cutoff day of the anchor.
   *
   * If `type` is WEEKDAY, then the value must be between 1-7. Shopify interprets
   * the days of the week according to ISO 8601, where 1 is Monday.
   *
   * If `type` is MONTHDAY, then the value must be between 1-31.
   *
   * If `type` is YEARDAY, then the value must be `null`.
   *
   * This field should only be set if the cutoff field for the delivery policy is `null`.
   *
   */
  cutoffDay?: InputMaybe<Scalars['Int']>;
  /**
   * The day of the anchor.
   *
   * If `type` is WEEKDAY, then the value must be between 1-7. Shopify interprets
   * the days of the week according to ISO 8601, where 1 is Monday.
   *
   * If `type` is not WEEKDAY, then the value must be between 1-31.
   *
   */
  day?: InputMaybe<Scalars['Int']>;
  /**
   * The month of the anchor. If type is different than YEARDAY, then the value must
   * be `null` or between 1-12.
   *
   */
  month?: InputMaybe<Scalars['Int']>;
  /**
   * Represents the anchor type, must be one of WEEKDAY, MONTHDAY, YEARDAY.
   *
   */
  type?: InputMaybe<SellingPlanAnchorType>;
};

/** Represents the anchor type. */
export type SellingPlanAnchorType =
  /** Which day of the month, between 1-31. */
  | 'MONTHDAY'
  /** Which day of the week, between 1-7. */
  | 'WEEKDAY'
  /** Which days of the month and year, month between 1-12, and day between 1-31. */
  | 'YEARDAY';

/** The input fields that are required to create or update a billing policy type. */
export type SellingPlanBillingPolicyInput = {
  /** The fixed billing policy details. */
  fixed?: InputMaybe<SellingPlanFixedBillingPolicyInput>;
  /** The recurring billing policy details. */
  recurring?: InputMaybe<SellingPlanRecurringBillingPolicyInput>;
};

/**
 * The category of the selling plan. For the `OTHER` category,
 *          you must fill out our [request form](https://docs.google.com/forms/d/e/1FAIpQLSeU18Xmw0Q61V8wdH-dfGafFqIBfRchQKUO8WAF3yJTvgyyZQ/viewform),
 *          where we'll review your request for a new purchase option.
 */
export type SellingPlanCategory =
  /** The selling plan is for anything not in one of the other categories. */
  | 'OTHER'
  /** The selling plan is for pre-orders. */
  | 'PRE_ORDER'
  /** The selling plan is for subscriptions. */
  | 'SUBSCRIPTION'
  /** The selling plan is for try before you buy purchases. */
  | 'TRY_BEFORE_YOU_BUY';

/** The input fields that are required to create or update a checkout charge. */
export type SellingPlanCheckoutChargeInput = {
  /** The checkout charge type defined by the policy. */
  type?: InputMaybe<SellingPlanCheckoutChargeType>;
  /** The checkout charge value defined by the policy. */
  value?: InputMaybe<SellingPlanCheckoutChargeValueInput>;
};

/** The checkout charge when the full amount isn't charged at checkout. */
export type SellingPlanCheckoutChargeType =
  /** The checkout charge is a percentage of the product or variant price. */
  | 'PERCENTAGE'
  /** The checkout charge is a fixed price amount. */
  | 'PRICE';

/** The input fields required to create or update an checkout charge value. */
export type SellingPlanCheckoutChargeValueInput = {
  /** The fixed value for an checkout charge. */
  fixedValue?: InputMaybe<Scalars['Decimal']>;
  /** The percentage value. */
  percentage?: InputMaybe<Scalars['Float']>;
};

/** The input fields that are required to create or update a delivery policy. */
export type SellingPlanDeliveryPolicyInput = {
  /** The fixed delivery policy details. */
  fixed?: InputMaybe<SellingPlanFixedDeliveryPolicyInput>;
  /** The recurring delivery policy details. */
  recurring?: InputMaybe<SellingPlanRecurringDeliveryPolicyInput>;
};

/** The input fields required to create or update a fixed billing policy. */
export type SellingPlanFixedBillingPolicyInput = {
  /** The checkout charge policy for the selling plan. */
  checkoutCharge?: InputMaybe<SellingPlanCheckoutChargeInput>;
  /** The date and time to capture the full payment. */
  remainingBalanceChargeExactTime?: InputMaybe<Scalars['DateTime']>;
  /** The period after capturing the payment for the amount due (`remainingBalanceChargeTrigger`), and before capturing the full payment. Expressed as an ISO8601 duration. */
  remainingBalanceChargeTimeAfterCheckout?: InputMaybe<Scalars['String']>;
  /** When to capture the payment for the amount due. */
  remainingBalanceChargeTrigger?: InputMaybe<SellingPlanRemainingBalanceChargeTrigger>;
};

/** The input fields required to create or update a fixed billing policy. */
export type SellingPlanFixedDeliveryPolicyInput = {
  /** The specific anchor dates upon which the delivery interval calculations should be made. */
  anchors?: InputMaybe<Array<SellingPlanAnchorInput>>;
  /** A buffer period for orders to be included in a cycle. */
  cutoff?: InputMaybe<Scalars['Int']>;
  /** The date and time when the fulfillment should trigger. */
  fulfillmentExactTime?: InputMaybe<Scalars['DateTime']>;
  /** What triggers the fulfillment. */
  fulfillmentTrigger?: InputMaybe<SellingPlanFulfillmentTrigger>;
  /** Whether the delivery policy is merchant or buyer-centric. */
  intent?: InputMaybe<SellingPlanFixedDeliveryPolicyIntent>;
  /** The pre-anchor behavior. */
  preAnchorBehavior?: InputMaybe<SellingPlanFixedDeliveryPolicyPreAnchorBehavior>;
};

/** Possible intentions of a Delivery Policy. */
export type SellingPlanFixedDeliveryPolicyIntent =
  /**
   * A merchant-centric delivery policy. Mark this delivery policy to define when the merchant should start fulfillment.
   *
   */
  | 'FULFILLMENT_BEGIN';

/** The fulfillment or delivery behavior of the first fulfillment when the orderis placed before the anchor. */
export type SellingPlanFixedDeliveryPolicyPreAnchorBehavior =
  /**
   * Orders placed can be fulfilled / delivered immediately. Orders placed inside a cutoff can be fulfilled / delivered at the next anchor.
   *
   */
  | 'ASAP'
  /**
   * Orders placed can be fulfilled / delivered at the next anchor date.
   * Orders placed inside a cutoff will skip the next anchor and can be fulfilled /
   * delivered at the following anchor.
   *
   */
  | 'NEXT';

/** Specifies the input fields required to create or update a fixed selling plan pricing policy. */
export type SellingPlanFixedPricingPolicyInput = {
  /** Price adjustment type defined by the policy. */
  adjustmentType?: InputMaybe<SellingPlanPricingPolicyAdjustmentType>;
  /** Price adjustment value defined by the policy. */
  adjustmentValue?: InputMaybe<SellingPlanPricingPolicyValueInput>;
  /** ID of the pricing policy. */
  id?: InputMaybe<Scalars['ID']>;
};

/** Describes what triggers fulfillment. */
export type SellingPlanFulfillmentTrigger =
  /** Use the anchor values to calculate fulfillment date. */
  | 'ANCHOR'
  /** As soon as possible. */
  | 'ASAP'
  /** At an exact time defined by the fulfillment_exact_time field. */
  | 'EXACT_TIME'
  /** Unknown. Usually to be determined in the future. */
  | 'UNKNOWN';

/** Specifies the input fields required to create or update a selling plan group. */
export type SellingPlanGroupInput = {
  /** Identifier for app, exposed in Liquid and product JSON. */
  appId?: InputMaybe<Scalars['String']>;
  /** Merchant facing description of the selling plan group. */
  description?: InputMaybe<Scalars['String']>;
  /** Merchant facing label of the selling plan group. */
  merchantCode?: InputMaybe<Scalars['String']>;
  /** Buyer facing label of the selling plan group. */
  name?: InputMaybe<Scalars['String']>;
  /** The values of all options available on the selling plan group. Selling plans are grouped together in Liquid when they are created by the same app, and have the same `selling_plan_group.name` and `selling_plan_group.options` values. */
  options?: InputMaybe<Array<Scalars['String']>>;
  /** Relative value for display purposes of the selling plan group. A lower position will be displayed before a higher one. */
  position?: InputMaybe<Scalars['Int']>;
  /** List of selling plans to create. */
  sellingPlansToCreate?: InputMaybe<Array<SellingPlanInput>>;
  /** List of selling plans ids to delete. */
  sellingPlansToDelete?: InputMaybe<Array<Scalars['ID']>>;
  /** List of selling plans to update. */
  sellingPlansToUpdate?: InputMaybe<Array<SellingPlanInput>>;
};

/** Specifies resource association with a Selling Plan Group. */
export type SellingPlanGroupResourceInput = {
  /** The IDs of the Products to add to the Selling Plan Group. */
  productIds?: InputMaybe<Array<Scalars['ID']>>;
  /** The IDs of the Variants to add to the Selling Plan Group. */
  productVariantIds?: InputMaybe<Array<Scalars['ID']>>;
};

/** The set of valid sort keys for the SellingPlanGroup query. */
export type SellingPlanGroupSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `name` value. */
  | 'NAME'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** Possible error codes that can be returned by `SellingPlanGroupUserError`. */
export type SellingPlanGroupUserErrorCode =
  /** Billing and delivery policy types must be the same. */
  | 'BILLING_AND_DELIVERY_POLICY_TYPES_MUST_BE_THE_SAME'
  /** The input value is blank. */
  | 'BLANK'
  /** A fixed billing policy's checkout charge value and type must match. */
  | 'CHECKOUT_CHARGE_VALUE_AND_TYPE_MUST_MATCH'
  /** The input value should be equal to the value allowed. */
  | 'EQUAL_TO'
  /** Could not add the resource to the selling plan group. */
  | 'ERROR_ADDING_RESOURCE_TO_GROUP'
  /** A fixed billing policy's fulfillment_exact_time must not be present when the fulfillment_trigger isn't EXACT_TIME. */
  | 'FULFILLMENT_EXACT_TIME_NOT_ALLOWED'
  /** A fixed billing policy's fulfillment_exact_time can't be blank when the fulfillment_trigger is EXACT_TIME. */
  | 'FULFILLMENT_EXACT_TIME_REQUIRED'
  /** The input value should be greater than the minimum allowed value. */
  | 'GREATER_THAN'
  /** The input value should be greater than or equal to the minimum value allowed. */
  | 'GREATER_THAN_OR_EQUAL_TO'
  /** Selling plan group could not be deleted. */
  | 'GROUP_COULD_NOT_BE_DELETED'
  /** Selling plan group does not exist. */
  | 'GROUP_DOES_NOT_EXIST'
  /** The input value isn't included in the list. */
  | 'INCLUSION'
  /** The input value is invalid. */
  | 'INVALID'
  /** The input value should be less than the maximum value allowed. */
  | 'LESS_THAN'
  /** The input value should be less than or equal to the maximum value allowed. */
  | 'LESS_THAN_OR_EQUAL_TO'
  /** The input value is not a number. */
  | 'NOT_A_NUMBER'
  /** The record with the ID used as the input value couldn't be found. */
  | 'NOT_FOUND'
  /** Only one billing policy type can be defined. */
  | 'ONLY_NEED_ONE_BILLING_POLICY_TYPE'
  /** A fixed billing policy's checkout charge can have at most one value. */
  | 'ONLY_NEED_ONE_CHECKOUT_CHARGE_VALUE'
  /** Only one delivery policy type can be defined. */
  | 'ONLY_NEED_ONE_DELIVERY_POLICY_TYPE'
  /** Only one pricing policy type can be defined. */
  | 'ONLY_NEED_ONE_PRICING_POLICY_TYPE'
  /** Only one pricing policy adjustment value type can be defined. */
  | 'ONLY_NEED_ONE_PRICING_POLICY_VALUE'
  /** A selling plan can't have both fixed and recurring billing policies. */
  | 'ONLY_ONE_OF_FIXED_OR_RECURRING_BILLING'
  /** A selling plan can't have both fixed and recurring delivery policies. */
  | 'ONLY_ONE_OF_FIXED_OR_RECURRING_DELIVERY'
  /** Selling plan does not exist. */
  | 'PLAN_DOES_NOT_EXIST'
  /** Selling plan ID must be specified to update. */
  | 'PLAN_ID_MUST_BE_SPECIFIED_TO_UPDATE'
  /** The input value needs to be blank. */
  | 'PRESENT'
  /** Pricing policy's adjustment value and adjustment type must match. */
  | 'PRICING_POLICY_ADJUSTMENT_VALUE_AND_TYPE_MUST_MATCH'
  /** Product does not exist. */
  | 'PRODUCT_DOES_NOT_EXIST'
  /** Product variant does not exist. */
  | 'PRODUCT_VARIANT_DOES_NOT_EXIST'
  /** A fixed billing policy's remaining_balance_charge_exact_time must not be present when the remaining_balance_charge_trigger isn't EXACT_TIME. */
  | 'REMAINING_BALANCE_CHARGE_EXACT_TIME_NOT_ALLOWED'
  /** A fixed billing policy's remaining_balance_charge_exact_time can't be blank when the remaining_balance_charge_trigger is EXACT_TIME. */
  | 'REMAINING_BALANCE_CHARGE_EXACT_TIME_REQUIRED'
  /** A fixed billing policy's remaining_balance_charge_time_after_checkout must be present and greater than zero when the remaining_balance_charge_trigger is TIME_AFTER_CHECKOUT. */
  | 'REMAINING_BALANCE_CHARGE_TIME_AFTER_CHECKOUT_MUST_BE_GREATER_THAN_ZERO'
  /** A fixed billing policy's remaining_balance_charge_trigger can't be NO_REMAINING_BALANCE when the checkout_charge_type is PERCENTAGE and checkout_charge_value is less than 100. */
  | 'REMAINING_BALANCE_CHARGE_TRIGGER_NO_REMAINING_BALANCE_ON_PARTIAL_PERCENTAGE_CHECKOUT_CHARGE'
  /** A fixed billing policy's remaining_balance_charge_trigger can't be NO_REMAINING_BALANCE when the checkout_charge_type is PRICE. */
  | 'REMAINING_BALANCE_CHARGE_TRIGGER_NO_REMAINING_BALANCE_ON_PRICE_CHECKOUT_CHARGE'
  /** A fixed billing policy's remaining_balance_charge_trigger must be NO_REMAINING_BALANCE when the checkout_charge_type is PERCENTAGE and checkout_charge_value is 100. */
  | 'REMAINING_BALANCE_CHARGE_TRIGGER_ON_FULL_CHECKOUT'
  /** The selling plan list provided contains 1 or more invalid IDs. */
  | 'RESOURCE_LIST_CONTAINS_INVALID_IDS'
  /** A fixed delivery policy's anchors must not be present when the fulfillment_trigger isn't ANCHOR. */
  | 'SELLING_PLAN_ANCHORS_NOT_ALLOWED'
  /** A fixed delivery policy's anchors must be present when the fulfillment_trigger is ANCHOR. */
  | 'SELLING_PLAN_ANCHORS_REQUIRED'
  /** Selling plan's billing and delivery policies anchors must be equal. */
  | 'SELLING_PLAN_BILLING_AND_DELIVERY_POLICY_ANCHORS_MUST_BE_EQUAL'
  /** Selling plan's billing cycle must be a multiple of delivery cycle. */
  | 'SELLING_PLAN_BILLING_CYCLE_MUST_BE_A_MULTIPLE_OF_DELIVERY_CYCLE'
  /** Missing billing policy. */
  | 'SELLING_PLAN_BILLING_POLICY_MISSING'
  /** Must include at least one selling plan. */
  | 'SELLING_PLAN_COUNT_LOWER_BOUND'
  /** Exceeded the selling plan limit (31). */
  | 'SELLING_PLAN_COUNT_UPPER_BOUND'
  /** Missing delivery policy. */
  | 'SELLING_PLAN_DELIVERY_POLICY_MISSING'
  /** Cannot have multiple selling plans with the same name. */
  | 'SELLING_PLAN_DUPLICATE_NAME'
  /** Cannot have multiple selling plans with the same options. */
  | 'SELLING_PLAN_DUPLICATE_OPTIONS'
  /** A fixed selling plan can have at most one pricing policy. */
  | 'SELLING_PLAN_FIXED_PRICING_POLICIES_LIMIT'
  /** Selling plan's billing policy max cycles must be greater than min cycles. */
  | 'SELLING_PLAN_MAX_CYCLES_MUST_BE_GREATER_THAN_MIN_CYCLES'
  /** Cannot define option2 on this selling plan as there's no label on the parent selling plan group. */
  | 'SELLING_PLAN_MISSING_OPTION2_LABEL_ON_PARENT_GROUP'
  /** Cannot define option3 on this selling plan as there's no label on the parent selling plan group. */
  | 'SELLING_PLAN_MISSING_OPTION3_LABEL_ON_PARENT_GROUP'
  /** Selling plan's option2 is required because option2 exists. */
  | 'SELLING_PLAN_OPTION2_REQUIRED_AS_DEFINED_ON_PARENT_GROUP'
  /** Selling plan's option3 is required because option3 exists. */
  | 'SELLING_PLAN_OPTION3_REQUIRED_AS_DEFINED_ON_PARENT_GROUP'
  /** Selling plans can't have more than 2 pricing policies. */
  | 'SELLING_PLAN_PRICING_POLICIES_LIMIT'
  /** Selling plan's pricing policies must contain one fixed pricing policy. */
  | 'SELLING_PLAN_PRICING_POLICIES_MUST_CONTAIN_A_FIXED_PRICING_POLICY'
  /** The input value is already taken. */
  | 'TAKEN'
  /** The input value is too big. */
  | 'TOO_BIG'
  /** The input value is too long. */
  | 'TOO_LONG'
  /** The input value is too short. */
  | 'TOO_SHORT'
  /** The input value is the wrong length. */
  | 'WRONG_LENGTH';

/** Specifies the input fields to create or update a selling plan. */
export type SellingPlanInput = {
  /** Selling plan policy which describes the billing details. */
  billingPolicy?: InputMaybe<SellingPlanBillingPolicyInput>;
  /** The category used to classify this selling plan for reporting purposes. */
  category?: InputMaybe<SellingPlanCategory>;
  /** A selling plan policy which describes the delivery details. */
  deliveryPolicy?: InputMaybe<SellingPlanDeliveryPolicyInput>;
  /** Buyer facing string which describes the selling plan commitment. */
  description?: InputMaybe<Scalars['String']>;
  /** ID of the selling plan. */
  id?: InputMaybe<Scalars['ID']>;
  /** A selling plan policy which describes the inventory details. */
  inventoryPolicy?: InputMaybe<SellingPlanInventoryPolicyInput>;
  /** Buyer facing string which describes the selling plan content. */
  name?: InputMaybe<Scalars['String']>;
  /** The values of all options available on the selling plan. Selling plans are grouped together in Liquid when they are created by the same app, and have the same `selling_plan_group.name` and `selling_plan_group.options` values. */
  options?: InputMaybe<Array<Scalars['String']>>;
  /** Relative value for display purposes of this plan. A lower position will be displayed before a higher one. */
  position?: InputMaybe<Scalars['Int']>;
  /**
   * The pricing policies which describe the pricing details. Each selling plan
   * can only contain a maximum of 2 pricing policies.
   *
   */
  pricingPolicies?: InputMaybe<Array<SellingPlanPricingPolicyInput>>;
};

/** Represents valid selling plan interval. */
export type SellingPlanInterval =
  /** Day interval. */
  | 'DAY'
  /** Month interval. */
  | 'MONTH'
  /** Week interval. */
  | 'WEEK'
  /** Year interval. */
  | 'YEAR';

/** The input fields required to create or update an inventory policy. */
export type SellingPlanInventoryPolicyInput = {
  /** When to reserve inventory for the order. The value must be ON_FULFILLMENT or ON_SALE. */
  reserve?: InputMaybe<SellingPlanReserve>;
};

/** Represents a selling plan pricing policy adjustment type. */
export type SellingPlanPricingPolicyAdjustmentType =
  /** Fixed amount off adjustment. */
  | 'FIXED_AMOUNT'
  /** Percentage off adjustment. */
  | 'PERCENTAGE'
  /** Price of the policy. */
  | 'PRICE';

/** Specifies the input fields required to create or update a selling plan pricing policy. */
export type SellingPlanPricingPolicyInput = {
  /** Fixed pricing policy details. */
  fixed?: InputMaybe<SellingPlanFixedPricingPolicyInput>;
  /** Recurring pricing policy details. */
  recurring?: InputMaybe<SellingPlanRecurringPricingPolicyInput>;
};

/** The input fields required to create or update a pricing policy adjustment value. */
export type SellingPlanPricingPolicyValueInput = {
  /** The fixed value for an fixed amount off or a new policy price. */
  fixedValue?: InputMaybe<Scalars['Decimal']>;
  /** The percentage value. */
  percentage?: InputMaybe<Scalars['Float']>;
};

/** Specifies the input fields required to create or update a recurring billing policy. */
export type SellingPlanRecurringBillingPolicyInput = {
  /** Specific anchor dates upon which the billing interval calculations should be made. */
  anchors?: InputMaybe<Array<SellingPlanAnchorInput>>;
  /** The billing frequency, it can be either: day, week, month or year. */
  interval?: InputMaybe<SellingPlanInterval>;
  /** The number of intervals between billings. */
  intervalCount?: InputMaybe<Scalars['Int']>;
  /** Maximum number of billing iterations. */
  maxCycles?: InputMaybe<Scalars['Int']>;
  /** Minimum number of billing iterations. */
  minCycles?: InputMaybe<Scalars['Int']>;
};

/** Specifies the input fields to create or update a recurring delivery policy. */
export type SellingPlanRecurringDeliveryPolicyInput = {
  /** The specific anchor dates upon which the delivery interval calculations should be made. */
  anchors?: InputMaybe<Array<SellingPlanAnchorInput>>;
  /** A buffer period for orders to be included in a cycle. */
  cutoff?: InputMaybe<Scalars['Int']>;
  /** Intention of this delivery policy, it can be either: delivery or fulfillment. */
  intent?: InputMaybe<SellingPlanRecurringDeliveryPolicyIntent>;
  /** The delivery frequency, it can be either: day, week, month or year. */
  interval?: InputMaybe<SellingPlanInterval>;
  /** The number of intervals between deliveries. */
  intervalCount?: InputMaybe<Scalars['Int']>;
  /** The pre-anchor behavior. It can be either: asap or next. */
  preAnchorBehavior?: InputMaybe<SellingPlanRecurringDeliveryPolicyPreAnchorBehavior>;
};

/** Whether the delivery policy is merchant or buyer-centric. */
export type SellingPlanRecurringDeliveryPolicyIntent =
  /**
   * A merchant-centric delivery policy. Mark this delivery policy to define when the merchant should start fulfillment.
   *
   */
  | 'FULFILLMENT_BEGIN';

/** The fulfillment or delivery behaviors of the first fulfillment when the orderis placed before the anchor. */
export type SellingPlanRecurringDeliveryPolicyPreAnchorBehavior =
  /**
   * The orders placed can be fulfilled or delivered immediately. The orders placed inside a cutoff can be fulfilled or delivered at the next anchor.
   *
   */
  | 'ASAP'
  /**
   * The orders placed can be fulfilled or delivered at the next anchor date.
   * The orders placed inside a cutoff will skip the next anchor and can be fulfilled or
   * delivered at the following anchor.
   *
   */
  | 'NEXT';

/** Specifies the input fields required to create or update a recurring selling plan pricing policy. */
export type SellingPlanRecurringPricingPolicyInput = {
  /** Price adjustment type defined by the policy. */
  adjustmentType?: InputMaybe<SellingPlanPricingPolicyAdjustmentType>;
  /** Price adjustment value defined by the policy. */
  adjustmentValue?: InputMaybe<SellingPlanPricingPolicyValueInput>;
  /** Cycle after which the pricing policy applies. */
  afterCycle: Scalars['Int'];
  /** ID of the pricing policy. */
  id?: InputMaybe<Scalars['ID']>;
};

/** When to capture the payment for the remaining amount due. */
export type SellingPlanRemainingBalanceChargeTrigger =
  /** At an exact time defined by the remaining_balance_charge_exact_time field. */
  | 'EXACT_TIME'
  /** When there's no remaining balance to be charged after checkout. */
  | 'NO_REMAINING_BALANCE'
  /** After the duration defined by the remaining_balance_charge_time_after_checkout field. */
  | 'TIME_AFTER_CHECKOUT';

/** When to reserve inventory for a selling plan. */
export type SellingPlanReserve =
  /** Reserve inventory when order is fulfilled. */
  | 'ON_FULFILLMENT'
  /** Reserve inventory at time of sale. */
  | 'ON_SALE';

/** The class of the discount for combining purposes. */
export type ShippingDiscountClass =
  /** Combined as a shipping discount. */
  | 'SHIPPING';

/** Specifies the shipping details for the order. */
export type ShippingLineInput = {
  /** Price of the shipping rate. */
  price?: InputMaybe<Scalars['Money']>;
  /** A unique identifier for the shipping rate. */
  shippingRateHandle?: InputMaybe<Scalars['String']>;
  /** Title of the shipping rate. */
  title?: InputMaybe<Scalars['String']>;
};

/** The input fields that are required to reimburse shipping costs. */
export type ShippingRefundInput = {
  /** The monetary value of the shipping fees to be reimbursed. */
  amount?: InputMaybe<Scalars['Money']>;
  /** Whether a full refund is provided. */
  fullRefund?: InputMaybe<Scalars['Boolean']>;
};

/**
 * Possible branding of a shop.
 * Branding can be used to define the look of a shop including its styling and logo in the Shopify Admin.
 *
 */
export type ShopBranding =
  /** Shop has Rogers branding. */
  | 'ROGERS'
  /** Shop has Shopify branding. */
  | 'SHOPIFY'
  /** Shop has Shopify Gold branding. */
  | 'SHOPIFY_GOLD'
  /** Shop has Shopify Plus branding. */
  | 'SHOPIFY_PLUS';

/**
 * Represents the shop's customer account requirement preference.
 *
 */
export type ShopCustomerAccountsSetting =
  | 'DISABLED'
  | 'OPTIONAL'
  | 'REQUIRED';

/**
 * Specifies the input fields for a shop locale.
 *
 */
export type ShopLocaleInput = {
  /** The market web presences on which the locale should be enabled. Pass in an empty array to remove the locale across all market web presences. */
  marketWebPresenceIds?: InputMaybe<Array<Scalars['ID']>>;
  /** Whether the locale is published. Only published locales are visible to the buyer. */
  published?: InputMaybe<Scalars['Boolean']>;
};

/** Possible error codes that can be returned by `ShopPolicyUserError`. */
export type ShopPolicyErrorCode =
  /** The input value is too big. */
  | 'TOO_BIG';

/** Specifies the input fields required to update a policy. */
export type ShopPolicyInput = {
  /** Policy text, maximum size of 512kb. */
  body: Scalars['String'];
  /** The shop policy type. */
  type: ShopPolicyType;
};

/** Available shop policy types. */
export type ShopPolicyType =
  /** The legal notice. */
  | 'LEGAL_NOTICE'
  /** The privacy policy. */
  | 'PRIVACY_POLICY'
  /** The refund policy. */
  | 'REFUND_POLICY'
  /** The shipping policy. */
  | 'SHIPPING_POLICY'
  /** The purchase options cancellation policy. */
  | 'SUBSCRIPTION_POLICY'
  /** The terms of sale. */
  | 'TERMS_OF_SALE'
  /** The terms of service. */
  | 'TERMS_OF_SERVICE';

/** Possible sort of tags. */
export type ShopTagSort =
  /** Alphabetical sort. */
  | 'ALPHABETICAL'
  /** Popularity sort. */
  | 'POPULAR';

/** The bank account status. */
export type ShopifyPaymentsBankAccountStatus =
  /** A payout to the bank account failed. */
  | 'ERRORED'
  /** A bank account that hasn't had any activity and that's not validated. */
  | 'NEW'
  /** It was determined that the bank account exists. */
  | 'VALIDATED'
  /** Bank account validation was successful. */
  | 'VERIFIED';

/** The possible dispute evidence file types. */
export type ShopifyPaymentsDisputeEvidenceFileType =
  /** Cancellation Policy File. */
  | 'CANCELLATION_POLICY_FILE'
  /** Customer Communication File. */
  | 'CUSTOMER_COMMUNICATION_FILE'
  /** Refund Policy File. */
  | 'REFUND_POLICY_FILE'
  /** Service Documentation File. */
  | 'SERVICE_DOCUMENTATION_FILE'
  /** Shipping Documentation File. */
  | 'SHIPPING_DOCUMENTATION_FILE'
  /** Uncategorized File. */
  | 'UNCATEGORIZED_FILE';

/** Specifies the input fields required to update a dispute evidence object. */
export type ShopifyPaymentsDisputeEvidenceUpdateInput = {
  /** Activity logs. */
  accessActivityLog?: InputMaybe<Scalars['String']>;
  /** Cancellation policy disclosure. */
  cancellationPolicyDisclosure?: InputMaybe<Scalars['String']>;
  /** Cancellation policy file. */
  cancellationPolicyFile?: InputMaybe<ShopifyPaymentsDisputeFileUploadUpdateInput>;
  /** Cancellation rebuttal. */
  cancellationRebuttal?: InputMaybe<Scalars['String']>;
  /** Customer communication file. */
  customerCommunicationFile?: InputMaybe<ShopifyPaymentsDisputeFileUploadUpdateInput>;
  /** Customer email address. */
  customerEmailAddress?: InputMaybe<Scalars['String']>;
  /** Customer first name. */
  customerFirstName?: InputMaybe<Scalars['String']>;
  /** Customer last name. */
  customerLastName?: InputMaybe<Scalars['String']>;
  /** Refund policy disclosure. */
  refundPolicyDisclosure?: InputMaybe<Scalars['String']>;
  /** Refund policy file. */
  refundPolicyFile?: InputMaybe<ShopifyPaymentsDisputeFileUploadUpdateInput>;
  /** Refund refusal explanation. */
  refundRefusalExplanation?: InputMaybe<Scalars['String']>;
  /** Service documentation file. */
  serviceDocumentationFile?: InputMaybe<ShopifyPaymentsDisputeFileUploadUpdateInput>;
  /** The shipping address associated with the dispute evidence. */
  shippingAddress?: InputMaybe<MailingAddressInput>;
  /** Shipping documentation file. */
  shippingDocumentationFile?: InputMaybe<ShopifyPaymentsDisputeFileUploadUpdateInput>;
  /** Whether to submit the evidence. */
  submitEvidence?: InputMaybe<Scalars['Boolean']>;
  /** Uncategorized file. */
  uncategorizedFile?: InputMaybe<ShopifyPaymentsDisputeFileUploadUpdateInput>;
  /** Uncategorized text. */
  uncategorizedText?: InputMaybe<Scalars['String']>;
};

/** Specifies the input fields required to update a dispute file upload object. */
export type ShopifyPaymentsDisputeFileUploadUpdateInput = {
  /** Whether to delete this file upload. */
  destroy?: InputMaybe<Scalars['Boolean']>;
  /** The id of the file upload to be updated. */
  id: Scalars['ID'];
};

/** The reason for the dispute provided by the cardholder's bank. */
export type ShopifyPaymentsDisputeReason =
  /** The customer's bank can't process the charge. */
  | 'BANK_CANNOT_PROCESS'
  /** The customer claims that the purchased product was returned or the transaction was otherwise canceled, but you haven't yet provided a refund or credit. */
  | 'CREDIT_NOT_PROCESSED'
  /** The customer initiated the dispute. Contact the customer for additional details on why the payment was disputed. */
  | 'CUSTOMER_INITIATED'
  /** The customer's bank can't proceed with the debit since it hasn't been authorized. */
  | 'DEBIT_NOT_AUTHORIZED'
  /** The customer claims they were charged multiple times for the same product or service. */
  | 'DUPLICATE'
  /** The cardholder claims that they didn’t authorize the payment. */
  | 'FRAUDULENT'
  /** The dispute is uncategorized, so you should contact the customer for additional details to find out why the payment was disputed. */
  | 'GENERAL'
  /** The customer account associated with the purchase is incorrect. */
  | 'INCORRECT_ACCOUNT_DETAILS'
  /** The customer's bank account has insufficient funds. */
  | 'INSUFFICIENT_FUNDS'
  /** The customer claims they did not receive the products or services purchased. */
  | 'PRODUCT_NOT_RECEIVED'
  /** The product or service was received but was defective, damaged, or not as described. */
  | 'PRODUCT_UNACCEPTABLE'
  /** The customer claims that you continued to charge them after a subscription was canceled. */
  | 'SUBSCRIPTION_CANCELLED'
  /** The customer doesn’t recognize the payment appearing on their card statement. */
  | 'UNRECOGNIZED';

/** The interval at which payouts are sent to the connected bank account. */
export type ShopifyPaymentsPayoutInterval =
  /** Each business day. */
  | 'DAILY'
  /** Payouts will not be automatically made. */
  | 'MANUAL'
  /** Each month, on the day of month specified by monthlyAnchor. */
  | 'MONTHLY'
  /** Each week, on the day of week specified by weeklyAnchor. */
  | 'WEEKLY';

/** The transfer status of the payout. */
export type ShopifyPaymentsPayoutStatus =
  /** The payout has been canceled by Shopify. */
  | 'CANCELED'
  /** The payout has been declined by the bank. */
  | 'FAILED'
  /** The payout has been submitted to the bank. */
  | 'IN_TRANSIT'
  /** The payout has been successfully deposited into the bank. */
  | 'PAID'
  /**
   * The payout has been created and had transactions assigned to it, but
   * it has not yet been submitted to the bank.
   *
   */
  | 'SCHEDULED';

/** The possible transaction types for a payout. */
export type ShopifyPaymentsPayoutTransactionType =
  /** The payout is a deposit. */
  | 'DEPOSIT'
  /** The payout is a withdrawal. */
  | 'WITHDRAWAL';

/** The types of possible verification documents. */
export type ShopifyPaymentsVerificationDocumentType =
  /** The subject's driver's license. */
  | 'DRIVERS_LICENSE'
  /** A government's identification document of the subject. */
  | 'GOVERNMENT_IDENTIFICATION'
  /** The subject's passport. */
  | 'PASSPORT';

/** The status of a verification. */
export type ShopifyPaymentsVerificationStatus =
  /** The verification request has been submitted but a response has not yet been given. */
  | 'PENDING'
  /** The verification has not yet been verified. */
  | 'UNVERIFIED'
  /** The verification has been verified. */
  | 'VERIFIED';

/** Represents the fallback avatar image for a staff member. This is used only if the staff member has no avatar image. */
export type StaffMemberDefaultImage =
  /** Returns a default avatar image for the staff member. */
  | 'DEFAULT'
  /** Returns a URL that returns a 404 error if the image is not present. */
  | 'NOT_FOUND'
  /** Returns a transparent avatar image for the staff member. */
  | 'TRANSPARENT';

/** Represents access permissions for a staff member. */
export type StaffMemberPermission =
  /** The staff member can manage and install apps and channels. */
  | 'APPLICATIONS'
  /** The staff member can manage and install sales channels. */
  | 'CHANNELS'
  /** The staff member can view, create, update, and delete customers, and respond to customer messages in the Shopify Messaging API. */
  | 'CUSTOMERS'
  /** The staff member can view the Shopify Home page, which includes sales information and other shop data. */
  | 'DASHBOARD'
  /** The staff member can view, buy, and manage domains. */
  | 'DOMAINS'
  /** The staff member can create, update, and delete draft orders. */
  | 'DRAFT_ORDERS'
  /** The staff member can update orders. */
  | 'EDIT_ORDERS'
  /** The staff has the same permissions as the [store owner](https://shopify.dev/en/manual/your-account/staff-accounts/staff-permissions#store-owner-permissions) with some exceptions, such as modifying the account billing or deleting staff accounts. */
  | 'FULL'
  /** The staff member can view, create, issue, and export gift cards to a CSV file. */
  | 'GIFT_CARDS'
  /** The staff member can view and modify links and navigation menus. */
  | 'LINKS'
  /** The staff member can create, update, and delete locations where inventory is stocked or managed. */
  | 'LOCATIONS'
  /** The staff member can view and create discount codes and automatic discounts, and export discounts to a CSV file. */
  | 'MARKETING'
  /** The staff member can view, create, and automate marketing campaigns. */
  | 'MARKETING_SECTION'
  /** The staff member can view, create, update, delete, and cancel orders, and receive order notifications. The staff member can still create draft orders without this permission. */
  | 'ORDERS'
  /**
   * The staff member can view the Overview and Live view pages,
   *             which include sales information, and other shop and sales channels data.
   */
  | 'OVERVIEWS'
  /** The staff member can view, create, update, publish, and delete blog posts and pages. */
  | 'PAGES'
  /** The staff member can pay for an order by using a vaulted card. */
  | 'PAY_ORDERS_BY_VAULTED_CARD'
  /** The staff member can view the preferences and configuration of a shop. */
  | 'PREFERENCES'
  /** The staff member can view, create, import, and update products, collections, and inventory. */
  | 'PRODUCTS'
  /** The staff member can view and create all reports, which includes sales information and other shop data. */
  | 'REPORTS'
  /** The staff member can view, update, and publish themes. */
  | 'THEMES'
  /** The staff member can view and create translations. */
  | 'TRANSLATIONS';

/**
 * An image to be uploaded.
 *
 * Deprecated in favor of
 * [StagedUploadInput](https://shopify.dev/api/admin-graphql/latest/objects/StagedUploadInput),
 * which is used by the
 * [stagedUploadsCreate mutation](https://shopify.dev/api/admin-graphql/latest/mutations/stagedUploadsCreate).
 *
 */
export type StageImageInput = {
  /** The image filename. */
  filename: Scalars['String'];
  /** HTTP method to be used by the staged upload. */
  httpMethod?: InputMaybe<StagedUploadHttpMethodType>;
  /** The image MIME type. */
  mimeType: Scalars['String'];
  /** The image resource. */
  resource: StagedUploadTargetGenerateUploadResource;
};

/**
 * The possible HTTP methods that can be used when sending a request to upload a file using information from a
 * [StagedMediaUploadTarget](https://shopify.dev/api/admin-graphql/latest/objects/StagedMediaUploadTarget).
 *
 */
export type StagedUploadHttpMethodType =
  /** The POST HTTP method. */
  | 'POST'
  /** The PUT HTTP method. */
  | 'PUT';

/** The information required to generate staged upload targets. */
export type StagedUploadInput = {
  /**
   * The size of the file to upload, in bytes. This is required when the request's resource property is set to
   * [VIDEO](https://shopify.dev/api/admin-graphql/latest/enums/StagedUploadTargetGenerateUploadResource#value-video)
   * or [MODEL_3D](https://shopify.dev/api/admin-graphql/latest/enums/StagedUploadTargetGenerateUploadResource#value-model3d).
   *
   */
  fileSize?: InputMaybe<Scalars['UnsignedInt64']>;
  /** The file's name and extension. */
  filename: Scalars['String'];
  /**
   * The HTTP method to be used when sending a request to upload the file using the returned staged
   * upload target.
   *
   */
  httpMethod?: InputMaybe<StagedUploadHttpMethodType>;
  /** The file's MIME type. */
  mimeType: Scalars['String'];
  /** The file's intended Shopify resource type. */
  resource: StagedUploadTargetGenerateUploadResource;
};

/**
 * The required fields and parameters to generate the URL upload an"
 * asset to Shopify.
 *
 * Deprecated in favor of
 * [StagedUploadInput](https://shopify.dev/api/admin-graphql/latest/objects/StagedUploadInput),
 * which is used by the
 * [stagedUploadsCreate mutation](https://shopify.dev/api/admin-graphql/latest/mutations/stagedUploadsCreate).
 *
 */
export type StagedUploadTargetGenerateInput = {
  /** The size of the file to upload, in bytes. */
  fileSize?: InputMaybe<Scalars['UnsignedInt64']>;
  /** The filename of the asset being uploaded. */
  filename: Scalars['String'];
  /** The HTTP method to be used by the staged upload. */
  httpMethod?: InputMaybe<StagedUploadHttpMethodType>;
  /** The MIME type of the asset being uploaded. */
  mimeType: Scalars['String'];
  /** The resource type being uploaded. */
  resource: StagedUploadTargetGenerateUploadResource;
};

/** The resource type to receive. */
export type StagedUploadTargetGenerateUploadResource =
  /**
   * Represents bulk mutation variables.
   *
   * For example, bulk mutation variables can be used for bulk operations using the
   * [bulkOperationRunMutation mutation](https://shopify.dev/api/admin-graphql/latest/mutations/bulkOperationRunMutation).
   *
   */
  | 'BULK_MUTATION_VARIABLES'
  /**
   * An image associated with a collection.
   *
   * For example, after uploading an image, you can use the
   * [collectionUpdate mutation](https://shopify.dev/api/admin-graphql/latest/mutations/collectionUpdate)
   * to add the image to a collection.
   *
   */
  | 'COLLECTION_IMAGE'
  /**
   * Represents any file other than HTML.
   *
   * For example, after uploading the file, you can add the file to the
   * [Files page](https://shopify.com/admin/settings/files) in Shopify admin using the
   * [fileCreate mutation](https://shopify.dev/api/admin-graphql/latest/mutations/fileCreate).
   *
   */
  | 'FILE'
  /**
   * An image.
   *
   * For example, after uploading an image, you can add the image to a product using the
   * [productCreateMedia mutation](https://shopify.dev/api/admin-graphql/latest/mutations/productCreateMedia)
   * or to the [Files page](https://shopify.com/admin/settings/files) in Shopify admin using the
   * [fileCreate mutation](https://shopify.dev/api/admin-graphql/latest/mutations/fileCreate).
   *
   */
  | 'IMAGE'
  /**
   * A Shopify hosted 3d model.
   *
   * For example, after uploading the 3d model, you can add the 3d model to a product using the
   * [productCreateMedia mutation](https://shopify.dev/api/admin-graphql/latest/mutations/productCreateMedia).
   *
   */
  | 'MODEL_3D'
  /**
   * An image that's associated with a product.
   *
   * For example, after uploading the image, you can add the image to a product using the
   * [productCreateMedia mutation](https://shopify.dev/api/admin-graphql/latest/mutations/productCreateMedia).
   *
   */
  | 'PRODUCT_IMAGE'
  /**
   * An image.
   *
   * For example, after uploading the image, you can add the image to the
   * [Files page](https://shopify.com/admin/settings/files) in Shopify admin using the
   * [fileCreate mutation](https://shopify.dev/api/admin-graphql/latest/mutations/fileCreate).
   *
   */
  | 'SHOP_IMAGE'
  /**
   * Represents a redirect CSV file.
   *
   * Example usage: This resource can be used for creating a
   * [UrlRedirectImport](https://shopify.dev/api/admin-graphql/2022-04/objects/UrlRedirectImport)
   * object for use in the
   * [urlRedirectImportCreate mutation](https://shopify.dev/api/admin-graphql/latest/mutations/urlRedirectImportCreate).
   *
   */
  | 'URL_REDIRECT_IMPORT'
  /**
   * A Shopify-hosted video.
   *
   * For example, after uploading the video, you can add the video to a product using the
   * [productCreateMedia mutation](https://shopify.dev/api/admin-graphql/latest/mutations/productCreateMedia)
   * or to the [Files page](https://shopify.com/admin/settings/files) in Shopify admin using the
   * [fileCreate mutation](https://shopify.dev/api/admin-graphql/latest/mutations/fileCreate).
   *
   */
  | 'VIDEO';

/** Possible error codes that can be returned by `StandardMetafieldDefinitionEnableUserError`. */
export type StandardMetafieldDefinitionEnableUserErrorCode =
  /** The input value is invalid. */
  | 'INVALID'
  /** The maximum number of definitions per owner type has been exceeded. */
  | 'LIMIT_EXCEEDED'
  /** The input value is already taken. */
  | 'TAKEN'
  /** The standard metafield definition template was not found. */
  | 'TEMPLATE_NOT_FOUND'
  /** The namespace and key is already in use for a set of your metafields. */
  | 'UNSTRUCTURED_ALREADY_EXISTS';

/** Provides the fields and values to use when adding a standard product type to a product. The [Shopify product taxonomy](https://help.shopify.com/txt/product_taxonomy/en.txt) contains the full list of available values. */
export type StandardizedProductTypeInput = {
  /** The id of the node in the Shopify taxonomy that represents the product type. */
  productTaxonomyNodeId: Scalars['ID'];
};

/** Specifies the input fields to delete a storefront access token. */
export type StorefrontAccessTokenDeleteInput = {
  /** The ID of the storefront access token to delete. */
  id: Scalars['ID'];
};

/** Specifies the input fields for a storefront access token. */
export type StorefrontAccessTokenInput = {
  /** A title for the storefront access token. */
  title: Scalars['String'];
};

/**
 * The possible error codes associated with making billing attempts. The error codes supplement the
 * `error_message` to provide consistent results and help with dunning management.
 *
 */
export type SubscriptionBillingAttemptErrorCode =
  /** The amount is too small. */
  | 'AMOUNT_TOO_SMALL'
  /**
   * There was an error during the authentication.
   *
   */
  | 'AUTHENTICATION_ERROR'
  /** Payment method was canceled by buyer. */
  | 'BUYER_CANCELED_PAYMENT_METHOD'
  /** Customer is invalid. */
  | 'CUSTOMER_INVALID'
  /** Customer was not found. */
  | 'CUSTOMER_NOT_FOUND'
  /**
   * Payment method is expired.
   *
   */
  | 'EXPIRED_PAYMENT_METHOD'
  /** The billing agreement ID or the transaction ID for the customer's payment method is invalid. */
  | 'INVALID_CUSTOMER_BILLING_AGREEMENT'
  /**
   * Payment method is invalid. Please update or create a new payment method.
   *
   */
  | 'INVALID_PAYMENT_METHOD'
  /** The shipping address is either missing or invalid. */
  | 'INVALID_SHIPPING_ADDRESS'
  /** A payment has already been made for this invoice. */
  | 'INVOICE_ALREADY_PAID'
  /**
   * Payment method was declined by processor.
   *
   */
  | 'PAYMENT_METHOD_DECLINED'
  /** Payment method cannot be used with the current payment gateway test mode configuration. */
  | 'PAYMENT_METHOD_INCOMPATIBLE_WITH_GATEWAY_CONFIG'
  /**
   * Payment method was not found.
   *
   */
  | 'PAYMENT_METHOD_NOT_FOUND'
  /**
   * Payment provider is not enabled.
   *
   */
  | 'PAYMENT_PROVIDER_IS_NOT_ENABLED'
  /**
   * Gateway is in test mode and attempted to bill a live payment method.
   *
   */
  | 'TEST_MODE'
  /**
   * There was an unexpected error during the billing attempt.
   *
   */
  | 'UNEXPECTED_ERROR';

/** Specifies the fields required to complete a subscription billing attempt. */
export type SubscriptionBillingAttemptInput = {
  /**
   * Select the specific billing cycle to be billed.
   * Default to bill the current billing cycle if not specified.
   *
   */
  billingCycleSelector?: InputMaybe<SubscriptionBillingCycleSelector>;
  /** A unique key generated by the client to avoid duplicate payments. For more information, refer to [Idempotent requests](https://shopify.dev/api/usage/idempotent-requests). */
  idempotencyKey: Scalars['String'];
  /**
   * The date and time used to calculate fulfillment intervals for a billing attempt that
   * successfully completed after the current anchor date. To prevent fulfillment from being
   * pushed to the next anchor date, this field can override the billing attempt date.
   *
   */
  originTime?: InputMaybe<Scalars['DateTime']>;
};

/** The possible status values of a subscription billing cycle. */
export type SubscriptionBillingCycleBillingCycleStatus =
  /** The billing cycle is billed. */
  | 'BILLED'
  /** The billing cycle hasn't been billed. */
  | 'UNBILLED';

/** Possible error codes that can be returned by `SubscriptionBillingCycleUserError`. */
export type SubscriptionBillingCycleErrorCode =
  /** Billing date cannot be set on skipped billing cycle. */
  | 'BILLING_DATE_SET_ON_SKIPPED'
  /** Can't find the billing cycle. */
  | 'CYCLE_NOT_FOUND'
  /** Billing cycle schedule edit input provided is empty. Must take in parameters to modify schedule. */
  | 'EMPTY_BILLING_CYCLE_EDIT_SCHEDULE_INPUT'
  /** The input value is invalid. */
  | 'INVALID'
  /** The index selector is invalid. */
  | 'INVALID_CYCLE_INDEX'
  /** The date selector is invalid. */
  | 'INVALID_DATE'
  /** There's no contract or schedule edit associated with the targeted billing cycle(s). */
  | 'NO_CYCLE_EDITS'
  /** Billing date of a cycle cannot be set to a value outside of its billing date range. */
  | 'OUT_OF_BOUNDS';

/** Specifies the subscription contract and selects the associated billing cycle. */
export type SubscriptionBillingCycleInput = {
  /** The ID of the subscription contract associated with the billing cycle. */
  contractId: Scalars['ID'];
  /** Selects the billing cycle by date or index. */
  selector: SubscriptionBillingCycleSelector;
};

/** Parameters for modifying the shedule of a specific billing cycle. */
export type SubscriptionBillingCycleScheduleEditInput = {
  /** Sets the expected billing date for the billing cycle. */
  billingDate?: InputMaybe<Scalars['DateTime']>;
  /** The reason for editing. */
  reason: SubscriptionBillingCycleScheduleEditInputScheduleEditReason;
  /** Sets the skip status for the billing cycle. */
  skip?: InputMaybe<Scalars['Boolean']>;
};

/** Possible reasons for editing the billing cycle's schedule. */
export type SubscriptionBillingCycleScheduleEditInputScheduleEditReason =
  /** Buyer initiated the schedule edit. */
  | 'BUYER_INITIATED'
  /** Developer initiated the schedule edit. */
  | 'DEV_INITIATED'
  /** Merchant initiated the schedule edit. */
  | 'MERCHANT_INITIATED';

/** Select by either date or index for SubscriptionBillingCycle. */
export type SubscriptionBillingCycleSelector = {
  /** Returns a billing cycle by date. */
  date?: InputMaybe<Scalars['DateTime']>;
  /** Returns a billing cycle by index. */
  index?: InputMaybe<Scalars['Int']>;
};

/** Select a subset of subscription billing cycles within a date range. */
export type SubscriptionBillingCyclesDateRangeSelector = {
  /** The end date and time for the range. */
  endDate: Scalars['DateTime'];
  /** The start date and time for the range. */
  startDate: Scalars['DateTime'];
};

/** Select a subset of subscription billing cycles within an index range. */
export type SubscriptionBillingCyclesIndexRangeSelector = {
  /** The end index for the range. */
  endIndex: Scalars['Int'];
  /** The start index for the range. */
  startIndex: Scalars['Int'];
};

/** The set of valid sort keys for the SubscriptionBillingCycles query. */
export type SubscriptionBillingCyclesSortKeys =
  /** Sort by the `cycle_index` value. */
  | 'CYCLE_INDEX'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** Select subscription billing cycles to be targeted. */
export type SubscriptionBillingCyclesTargetSelection =
  /** Target all future subscription billing cycles. */
  | 'ALL';

/** Specifies the input fields for a Subscription Billing Policy. */
export type SubscriptionBillingPolicyInput = {
  /** Specific anchor dates upon which the billing interval calculations should be made. */
  anchors?: InputMaybe<Array<SellingPlanAnchorInput>>;
  /** The kind of interval that is associated with this schedule (e.g. Monthly, Weekly, etc). */
  interval: SellingPlanInterval;
  /** The number of billing intervals between invoices. */
  intervalCount: Scalars['Int'];
  /** Maximum amount of cycles required in the subscription. */
  maxCycles?: InputMaybe<Scalars['Int']>;
  /** Minimum amount of cycles required in the subscription. */
  minCycles?: InputMaybe<Scalars['Int']>;
};

/** Specifies the input fields required to create a Subscription Contract. */
export type SubscriptionContractCreateInput = {
  /** The attributes used as input for the Subscription Draft. */
  contract: SubscriptionDraftInput;
  /** The currency used for the subscription contract. */
  currencyCode: CurrencyCode;
  /** The ID of the customer to associate with the subscription contract. */
  customerId: Scalars['ID'];
  /** The next billing date for the subscription contract. */
  nextBillingDate: Scalars['DateTime'];
};

/** Possible error codes that can be returned by `SubscriptionContractUserError`. */
export type SubscriptionContractErrorCode =
  /** The input value is invalid. */
  | 'INVALID';

/** The possible status values of the last payment on a subscription contract. */
export type SubscriptionContractLastPaymentStatus =
  /** Failed subscription billing attempt. */
  | 'FAILED'
  /** Successful subscription billing attempt. */
  | 'SUCCEEDED';

/** The possible status values of a subscription. */
export type SubscriptionContractSubscriptionStatus =
  /** The contract is active and continuing per its policies. */
  | 'ACTIVE'
  /** The contract was ended by an unplanned customer action. */
  | 'CANCELLED'
  /** The contract has ended per the expected circumstances. All billing and deliverycycles of the subscriptions were executed. */
  | 'EXPIRED'
  /** The contract ended because billing failed and no further billing attempts are expected. */
  | 'FAILED'
  /** The contract is temporarily paused and is expected to resume in the future. */
  | 'PAUSED';

/**
 * Specifies delivery method fields for a subscription draft.
 * This is an input union: one, and only one, field can be provided.
 * The field provided will determine which delivery method is to be used.
 *
 */
export type SubscriptionDeliveryMethodInput = {
  /** The input fields for the local delivery method. */
  localDelivery?: InputMaybe<SubscriptionDeliveryMethodLocalDeliveryInput>;
  /** The input fields for the pickup delivery method. */
  pickup?: InputMaybe<SubscriptionDeliveryMethodPickupInput>;
  /** The input fields for the shipping delivery method. */
  shipping?: InputMaybe<SubscriptionDeliveryMethodShippingInput>;
};

/**
 * The input fields for a local delivery method.
 *
 * This input accepts partial input. When a field is not provided,
 * its prior value is left unchanged.
 *
 */
export type SubscriptionDeliveryMethodLocalDeliveryInput = {
  /** The address to deliver to. */
  address?: InputMaybe<MailingAddressInput>;
  /** The details of the local delivery method to use. */
  localDeliveryOption?: InputMaybe<SubscriptionDeliveryMethodLocalDeliveryOptionInput>;
};

/** Specifies local delivery option fields. */
export type SubscriptionDeliveryMethodLocalDeliveryOptionInput = {
  /** A custom reference to the delivery method for use with automations. */
  code?: InputMaybe<Scalars['String']>;
  /** The details displayed to the customer to describe the local delivery option. */
  description?: InputMaybe<Scalars['String']>;
  /** The delivery instructions that the customer can provide to the merchant. */
  instructions?: InputMaybe<Scalars['String']>;
  /**
   * The phone number that the customer must provide to the merchant.
   * Formatted using E.164 standard. For example, `+16135551111`.
   *
   */
  phone: Scalars['String'];
  /** The presentment title of the local delivery option. */
  presentmentTitle?: InputMaybe<Scalars['String']>;
  /** The title of the local delivery option. */
  title?: InputMaybe<Scalars['String']>;
};

/**
 * The input fields for a pickup delivery method.
 *
 * This input accepts partial input. When a field is not provided,
 * its prior value is left unchanged.
 *
 */
export type SubscriptionDeliveryMethodPickupInput = {
  /** The details of the pickup method to use. */
  pickupOption?: InputMaybe<SubscriptionDeliveryMethodPickupOptionInput>;
};

/** Specifies pickup option fields. */
export type SubscriptionDeliveryMethodPickupOptionInput = {
  /** A custom reference to the delivery method for use with automations. */
  code?: InputMaybe<Scalars['String']>;
  /** The details displayed to the customer to describe the pickup option. */
  description?: InputMaybe<Scalars['String']>;
  /** The ID of the pickup location. */
  locationId: Scalars['ID'];
  /** The presentment title of the pickup option. */
  presentmentTitle?: InputMaybe<Scalars['String']>;
  /** The title of the pickup option. */
  title?: InputMaybe<Scalars['String']>;
};

/**
 * Specifies shipping delivery method fields.
 *
 * This input accepts partial input. When a field is not provided,
 * its prior value is left unchanged.
 *
 */
export type SubscriptionDeliveryMethodShippingInput = {
  /** The address to ship to. */
  address?: InputMaybe<MailingAddressInput>;
  /** The details of the shipping method to use. */
  shippingOption?: InputMaybe<SubscriptionDeliveryMethodShippingOptionInput>;
};

/** Specifies shipping option fields. */
export type SubscriptionDeliveryMethodShippingOptionInput = {
  /** The carrier service ID of the shipping option. */
  carrierServiceId?: InputMaybe<Scalars['ID']>;
  /** The code of the shipping option. */
  code?: InputMaybe<Scalars['String']>;
  /** The description of the shipping option. */
  description?: InputMaybe<Scalars['String']>;
  /** The presentment title of the shipping option. */
  presentmentTitle?: InputMaybe<Scalars['String']>;
  /** The title of the shipping option. */
  title?: InputMaybe<Scalars['String']>;
};

/** Specifies the input fields for a Subscription Delivery Policy. */
export type SubscriptionDeliveryPolicyInput = {
  /** The specific anchor dates upon which the delivery interval calculations should be made. */
  anchors?: InputMaybe<Array<SellingPlanAnchorInput>>;
  /** The kind of interval that is associated with this schedule (e.g. Monthly, Weekly, etc). */
  interval: SellingPlanInterval;
  /** The number of billing intervals between invoices. */
  intervalCount: Scalars['Int'];
};

/** The reason a discount on a subscription draft was rejected. */
export type SubscriptionDiscountRejectionReason =
  /** Discount is inactive. */
  | 'CURRENTLY_INACTIVE'
  /** Given customer does not qualify for the discount. */
  | 'CUSTOMER_NOT_ELIGIBLE'
  /** Customer usage limit has been reached. */
  | 'CUSTOMER_USAGE_LIMIT_REACHED'
  /** Purchase type does not qualify for the discount. */
  | 'INCOMPATIBLE_PURCHASE_TYPE'
  /** Internal error during discount code validation. */
  | 'INTERNAL_ERROR'
  /** Discount code is not found. */
  | 'NOT_FOUND'
  /** Discount does not apply to any of the given line items. */
  | 'NO_ENTITLED_LINE_ITEMS'
  /** No applicable shipping lines. */
  | 'NO_ENTITLED_SHIPPING_LINES'
  /** Purchase amount of items does not qualify for the discount. */
  | 'PURCHASE_NOT_IN_RANGE'
  /** Quantity of items does not qualify for the discount. */
  | 'QUANTITY_NOT_IN_RANGE'
  /** Discount usage limit has been reached. */
  | 'USAGE_LIMIT_REACHED';

/** Possible error codes that can be returned by `SubscriptionDraftUserError`. */
export type SubscriptionDraftErrorCode =
  /** This line has already been removed. */
  | 'ALREADY_REMOVED'
  /** Cannot commit a contract draft with this mutation. Please use SubscriptionDraftCommit. */
  | 'BILLING_CYCLE_ABSENT'
  /** Billing policy cannot be updated for billing cycle contract drafts. */
  | 'BILLING_CYCLE_CONTRACT_DRAFT_BILLING_POLICY_INVALID'
  /** Delivery policy cannot be updated for billing cycle contract drafts. */
  | 'BILLING_CYCLE_CONTRACT_DRAFT_DELIVERY_POLICY_INVALID'
  /** Cannot commit a billing cycle contract draft with this mutation. Please use SubscriptionBillingCycleContractDraftCommit. */
  | 'BILLING_CYCLE_PRESENT'
  /** The input value is blank. */
  | 'BLANK'
  /** Subscription draft has been already committed. */
  | 'COMMITTED'
  /** Contract draft must be a billing cycle contract draft for contract concatenation. */
  | 'CONCATENATION_BILLING_CYCLE_CONTRACT_DRAFT_REQUIRED'
  /** Currency is not enabled. */
  | 'CURRENCY_NOT_ENABLED'
  /** The customer doesn't exist. */
  | 'CUSTOMER_DOES_NOT_EXIST'
  /** The payment method customer must be the same as the contract customer. */
  | 'CUSTOMER_MISMATCH'
  /** The after cycle attribute must be unique between cycle discounts. */
  | 'CYCLE_DISCOUNTS_UNIQUE_AFTER_CYCLE'
  /** Billing cycle selector cannot select billing cycle outside of index range. */
  | 'CYCLE_INDEX_OUT_OF_RANGE'
  /** Billing cycle selector requires exactly one of index or date to be provided. */
  | 'CYCLE_SELECTOR_VALIDATE_ONE_OF'
  /** Billing cycle selector cannot select billing cycle outside of start date range. */
  | 'CYCLE_START_DATE_OUT_OF_RANGE'
  /** The delivery method can't be blank if any lines require shipping. */
  | 'DELIVERY_METHOD_REQUIRED'
  /** The delivery policy interval must be a multiple of the billing policy interval. */
  | 'DELIVERY_MUST_BE_MULTIPLE_OF_BILLING'
  /** Concatenated contracts cannot contain duplicate subscription contracts. */
  | 'DUPLICATE_CONCATENATED_CONTRACTS'
  /** Maximum number of concatenated contracts on a billing cycle contract draft exceeded. */
  | 'EXCEEDED_MAX_CONCATENATED_CONTRACTS'
  /** The input value should be greater than the minimum allowed value. */
  | 'GREATER_THAN'
  /** The input value should be greater than or equal to the minimum value allowed. */
  | 'GREATER_THAN_OR_EQUAL_TO'
  /** Cannot update a subscription contract with a future contract or schedule edit. */
  | 'HAS_FUTURE_EDITS'
  /** The input value is invalid. */
  | 'INVALID'
  /** The adjustment value must the same type as the adjustment type. */
  | 'INVALID_ADJUSTMENT_TYPE'
  /** The adjustment value must be either fixed_value or percentage. */
  | 'INVALID_ADJUSTMENT_VALUE'
  /** Next billing date is invalid. */
  | 'INVALID_BILLING_DATE'
  /** Must have at least one line. */
  | 'INVALID_LINES'
  /** Note length is too long. */
  | 'INVALID_NOTE_LENGTH'
  /** The input value should be less than the maximum value allowed. */
  | 'LESS_THAN'
  /** The input value should be less than or equal to the maximum value allowed. */
  | 'LESS_THAN_OR_EQUAL_TO'
  /** The value is not an integer. */
  | 'NOT_AN_INTEGER'
  /** Value is not in range. */
  | 'NOT_IN_RANGE'
  /** Discount must have at least one entitled line. */
  | 'NO_ENTITLED_LINES'
  /** Input value is not present. */
  | 'PRESENCE'
  /** The maximum number of cycles must be greater than the minimum. */
  | 'SELLING_PLAN_MAX_CYCLES_MUST_BE_GREATER_THAN_MIN_CYCLES'
  /** Another operation updated the contract concurrently as the commit was in progress. */
  | 'STALE_CONTRACT'
  /** The input value is too long. */
  | 'TOO_LONG'
  /** The input value is too short. */
  | 'TOO_SHORT'
  /** Billing cycle selector cannot select upcoming billing cycle past limit. */
  | 'UPCOMING_CYCLE_LIMIT_EXCEEDED';

/** Specifies the input fields required to create a Subscription Draft. */
export type SubscriptionDraftInput = {
  /** The billing policy for the subscription contract. */
  billingPolicy?: InputMaybe<SubscriptionBillingPolicyInput>;
  /** A list of the custom attributes added to the subscription contract. */
  customAttributes?: InputMaybe<Array<AttributeInput>>;
  /** The delivery method for the subscription contract. */
  deliveryMethod?: InputMaybe<SubscriptionDeliveryMethodInput>;
  /** The delivery policy for the subscription contract. */
  deliveryPolicy?: InputMaybe<SubscriptionDeliveryPolicyInput>;
  /** The shipping price for each renewal the subscription contract. */
  deliveryPrice?: InputMaybe<Scalars['Decimal']>;
  /** The next billing date for the subscription contract. */
  nextBillingDate?: InputMaybe<Scalars['DateTime']>;
  /** The note field that will be applied to the generated orders. */
  note?: InputMaybe<Scalars['String']>;
  /** The ID of the payment method to be used for the subscription contract. */
  paymentMethodId?: InputMaybe<Scalars['ID']>;
  /** The current status of the subscription contract. */
  status?: InputMaybe<SubscriptionContractSubscriptionStatus>;
};

/** Specifies the input fields of a subscription free shipping discount on a contract. */
export type SubscriptionFreeShippingDiscountInput = {
  /** The maximum number of times the subscription free shipping discount will be applied on orders. */
  recurringCycleLimit?: InputMaybe<Scalars['Int']>;
  /** The title associated with the subscription free shipping discount. */
  title?: InputMaybe<Scalars['String']>;
};

/** Specifies the input fields required to add a new subscription line to a contract. */
export type SubscriptionLineInput = {
  /** The price of the product. */
  currentPrice: Scalars['Decimal'];
  /** The custom attributes for this subscription line. */
  customAttributes?: InputMaybe<Array<AttributeInput>>;
  /** Describes expected price changes of the subscription line over time. */
  pricingPolicy?: InputMaybe<SubscriptionPricingPolicyInput>;
  /** The ID of the product variant the subscription line refers to. */
  productVariantId: Scalars['ID'];
  /** The quantity of the product. */
  quantity: Scalars['Int'];
  /** The selling plan for the subscription line. */
  sellingPlanId?: InputMaybe<Scalars['ID']>;
  /**
   * The selling plan name for the subscription line.
   *
   * Defaults to using the selling plan's current name when not specified.
   *
   */
  sellingPlanName?: InputMaybe<Scalars['String']>;
};

/** Specifies the input fields required to update a subscription line on a contract. */
export type SubscriptionLineUpdateInput = {
  /** The price of the product. */
  currentPrice?: InputMaybe<Scalars['Decimal']>;
  /** The custom attributes for this subscription line. */
  customAttributes?: InputMaybe<Array<AttributeInput>>;
  /** Describes expected price changes of the subscription line over time. */
  pricingPolicy?: InputMaybe<SubscriptionPricingPolicyInput>;
  /** The ID of the product variant the subscription line refers to. */
  productVariantId?: InputMaybe<Scalars['ID']>;
  /** The quantity of the product. */
  quantity?: InputMaybe<Scalars['Int']>;
  /** The selling plan for the subscription line. */
  sellingPlanId?: InputMaybe<Scalars['ID']>;
  /** The selling plan name for the subscription line. */
  sellingPlanName?: InputMaybe<Scalars['String']>;
};

/** Represents the subscription lines the discount applies on. */
export type SubscriptionManualDiscountEntitledLinesInput = {
  /** Specify whether the subscription discount will apply on all subscription lines. */
  all?: InputMaybe<Scalars['Boolean']>;
  /** The ID of the lines to add to or remove from the subscription discount. */
  lines?: InputMaybe<SubscriptionManualDiscountLinesInput>;
};

/** Specifies the fixed amount value of the discount and distribution on the lines. */
export type SubscriptionManualDiscountFixedAmountInput = {
  /** Fixed amount value. */
  amount?: InputMaybe<Scalars['Float']>;
  /** Whether the amount is intended per line item or once per subscription. */
  appliesOnEachItem?: InputMaybe<Scalars['Boolean']>;
};

/** Specifies the input fields of a subscription discount on a contract. */
export type SubscriptionManualDiscountInput = {
  /** Entitled line items used to apply the subscription discount on. */
  entitledLines?: InputMaybe<SubscriptionManualDiscountEntitledLinesInput>;
  /** The maximum number of times the subscription discount will be applied on orders. */
  recurringCycleLimit?: InputMaybe<Scalars['Int']>;
  /** The title associated with the subscription discount. */
  title?: InputMaybe<Scalars['String']>;
  /** Percentage or fixed amount value of the discount. */
  value?: InputMaybe<SubscriptionManualDiscountValueInput>;
};

/** Line items that a the discount refers to. */
export type SubscriptionManualDiscountLinesInput = {
  /** The ID of the lines to add to the subscription discount. */
  add?: InputMaybe<Array<Scalars['ID']>>;
  /** The ID of the lines to remove from the subscription discount. */
  remove?: InputMaybe<Array<Scalars['ID']>>;
};

/** Specifies the discount value and its distribution. */
export type SubscriptionManualDiscountValueInput = {
  /** Fixed amount input in the currency defined by the subscription. */
  fixedAmount?: InputMaybe<SubscriptionManualDiscountFixedAmountInput>;
  /** The percentage value of the discount. Value must be between 0 - 100. */
  percentage?: InputMaybe<Scalars['Int']>;
};

/** An array containing all pricing changes for each billing cycle. */
export type SubscriptionPricingPolicyCycleDiscountsInput = {
  /** The price adjustment type. */
  adjustmentType: SellingPlanPricingPolicyAdjustmentType;
  /** The price adjustment value. */
  adjustmentValue: SellingPlanPricingPolicyValueInput;
  /** The cycle after which the pricing policy applies. */
  afterCycle: Scalars['Int'];
  /** The computed price after the adjustments are applied. */
  computedPrice: Scalars['Decimal'];
};

/** Describes expected price changes of the subscription line over time. */
export type SubscriptionPricingPolicyInput = {
  /** The base price per unit for the subscription line in the contract's currency. */
  basePrice: Scalars['Decimal'];
  /** An array containing all pricing changes for each billing cycle. */
  cycleDiscounts: Array<SubscriptionPricingPolicyCycleDiscountsInput>;
};

/** Specifies the kind of the suggested order transaction. */
export type SuggestedOrderTransactionKind =
  /** A suggested refund transaction for an order. */
  | 'SUGGESTED_REFUND';

/** Available customer tax exemptions. */
export type TaxExemption =
  /** This customer is exempt from specific taxes for holding a valid COMMERCIAL_FISHERY_EXEMPTION in British Columbia. */
  | 'CA_BC_COMMERCIAL_FISHERY_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid CONTRACTOR_EXEMPTION in British Columbia. */
  | 'CA_BC_CONTRACTOR_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid PRODUCTION_AND_MACHINERY_EXEMPTION in British Columbia. */
  | 'CA_BC_PRODUCTION_AND_MACHINERY_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in British Columbia. */
  | 'CA_BC_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid SUB_CONTRACTOR_EXEMPTION in British Columbia. */
  | 'CA_BC_SUB_CONTRACTOR_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid DIPLOMAT_EXEMPTION in Canada. */
  | 'CA_DIPLOMAT_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid COMMERCIAL_FISHERY_EXEMPTION in Manitoba. */
  | 'CA_MB_COMMERCIAL_FISHERY_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid FARMER_EXEMPTION in Manitoba. */
  | 'CA_MB_FARMER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Manitoba. */
  | 'CA_MB_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid COMMERCIAL_FISHERY_EXEMPTION in Nova Scotia. */
  | 'CA_NS_COMMERCIAL_FISHERY_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid FARMER_EXEMPTION in Nova Scotia. */
  | 'CA_NS_FARMER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid PURCHASE_EXEMPTION in Ontario. */
  | 'CA_ON_PURCHASE_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid COMMERCIAL_FISHERY_EXEMPTION in Prince Edward Island. */
  | 'CA_PE_COMMERCIAL_FISHERY_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid COMMERCIAL_FISHERY_EXEMPTION in Saskatchewan. */
  | 'CA_SK_COMMERCIAL_FISHERY_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid CONTRACTOR_EXEMPTION in Saskatchewan. */
  | 'CA_SK_CONTRACTOR_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid FARMER_EXEMPTION in Saskatchewan. */
  | 'CA_SK_FARMER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid PRODUCTION_AND_MACHINERY_EXEMPTION in Saskatchewan. */
  | 'CA_SK_PRODUCTION_AND_MACHINERY_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Saskatchewan. */
  | 'CA_SK_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid SUB_CONTRACTOR_EXEMPTION in Saskatchewan. */
  | 'CA_SK_SUB_CONTRACTOR_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid STATUS_CARD_EXEMPTION in Canada. */
  | 'CA_STATUS_CARD_EXEMPTION'
  /** This customer is exempt from VAT for purchases within the EU that is shipping from outside of customer's country. */
  | 'EU_REVERSE_CHARGE_EXEMPTION_RULE'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Alaska. */
  | 'US_AK_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Alabama. */
  | 'US_AL_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Arkansas. */
  | 'US_AR_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Arizona. */
  | 'US_AZ_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in California. */
  | 'US_CA_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Colorado. */
  | 'US_CO_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Connecticut. */
  | 'US_CT_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Washington DC. */
  | 'US_DC_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Delaware. */
  | 'US_DE_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Florida. */
  | 'US_FL_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Georgia. */
  | 'US_GA_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Hawaii. */
  | 'US_HI_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Iowa. */
  | 'US_IA_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Idaho. */
  | 'US_ID_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Illinois. */
  | 'US_IL_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Indiana. */
  | 'US_IN_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Kansas. */
  | 'US_KS_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Kentucky. */
  | 'US_KY_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Louisiana. */
  | 'US_LA_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Massachusetts. */
  | 'US_MA_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Maryland. */
  | 'US_MD_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Maine. */
  | 'US_ME_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Michigan. */
  | 'US_MI_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Minnesota. */
  | 'US_MN_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Missouri. */
  | 'US_MO_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Mississippi. */
  | 'US_MS_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Montana. */
  | 'US_MT_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in North Carolina. */
  | 'US_NC_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in North Dakota. */
  | 'US_ND_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Nebraska. */
  | 'US_NE_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in New Hampshire. */
  | 'US_NH_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in New Jersey. */
  | 'US_NJ_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in New Mexico. */
  | 'US_NM_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Nevada. */
  | 'US_NV_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in New York. */
  | 'US_NY_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Ohio. */
  | 'US_OH_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Oklahoma. */
  | 'US_OK_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Oregon. */
  | 'US_OR_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Pennsylvania. */
  | 'US_PA_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Rhode Island. */
  | 'US_RI_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in South Carolina. */
  | 'US_SC_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in South Dakota. */
  | 'US_SD_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Tennessee. */
  | 'US_TN_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Texas. */
  | 'US_TX_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Utah. */
  | 'US_UT_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Virginia. */
  | 'US_VA_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Vermont. */
  | 'US_VT_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Washington. */
  | 'US_WA_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Wisconsin. */
  | 'US_WI_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in West Virginia. */
  | 'US_WV_RESELLER_EXEMPTION'
  /** This customer is exempt from specific taxes for holding a valid RESELLER_EXEMPTION in Wyoming. */
  | 'US_WY_RESELLER_EXEMPTION';

/** Specifies the type of resources that are translatable. */
export type TranslatableResourceType =
  /** A product collection. Translatable fields: `title`, `body_html`, `meta_title`, `meta_description`. */
  | 'COLLECTION'
  /**
   * The delivery method definition. For example, "Standard", or "Expedited".
   *         Translatable fields: `name`.
   */
  | 'DELIVERY_METHOD_DEFINITION'
  /** An email template. Translatable fields: `title`, `body_html`. */
  | 'EMAIL_TEMPLATE'
  /** A link to direct users. Translatable fields: `title`. */
  | 'LINK'
  /** A Metafield. Translatable fields: `value`. */
  | 'METAFIELD'
  /** An online store article. Translatable fields: `title`, `body_html`, `summary_html`, `meta_title`, `meta_description`. */
  | 'ONLINE_STORE_ARTICLE'
  /** An online store blog. Translatable fields: `title`, `meta_title`, `meta_description`. */
  | 'ONLINE_STORE_BLOG'
  /** A category of links. Translatable fields: `title`. */
  | 'ONLINE_STORE_MENU'
  /** An online store page. Translatable fields: `title`, `body_html`, `meta_title`, `meta_description`. */
  | 'ONLINE_STORE_PAGE'
  /** An online store theme. Translatable fields: `dynamic keys based on theme data`. */
  | 'ONLINE_STORE_THEME'
  /** A packing slip template. Translatable fields: `body`. */
  | 'PACKING_SLIP_TEMPLATE'
  /** A payment gateway. Translatable fields: `name`. */
  | 'PAYMENT_GATEWAY'
  /** An online store product. Translatable fields: `title`, `body_html`, `meta_title`, `meta_description`. */
  | 'PRODUCT'
  /**
   * An online store custom product property name. For example, "Size", "Color", or "Material".
   *         Translatable fields: `name`.
   */
  | 'PRODUCT_OPTION'
  /** An online store product variant. Translatable fields: `title`, `option1`, `option2`, `option3`. The field `title` has been deprecated. */
  | 'PRODUCT_VARIANT'
  /** A selling plan. Translatable fields:`name`, `option1`, `option2`, `option3`, `description`. */
  | 'SELLING_PLAN'
  /** A selling plan group. Translatable fields: `name`. */
  | 'SELLING_PLAN_GROUP'
  /** A shop. Translatable fields: `meta_title`, `meta_description`. */
  | 'SHOP'
  /** A shop policy. Translatable fields: `body`. */
  | 'SHOP_POLICY'
  /** An SMS template. Translatable fields: `body`. */
  | 'SMS_TEMPLATE';

/** Possible error codes that can be returned by `TranslationUserError`. */
export type TranslationErrorCode =
  /** The input value is blank. */
  | 'BLANK'
  /** Translation value is invalid. */
  | 'FAILS_RESOURCE_VALIDATION'
  /** The input value is invalid. */
  | 'INVALID'
  /** Locale language code is invalid. */
  | 'INVALID_CODE'
  /** Locale code format is invalid. */
  | 'INVALID_FORMAT'
  /** Translation key is invalid. */
  | 'INVALID_KEY_FOR_MODEL'
  /** The locale is missing on the market corresponding to the `marketId` argument. */
  | 'INVALID_LOCALE_FOR_MARKET'
  /** Locale is invalid for the shop. */
  | 'INVALID_LOCALE_FOR_SHOP'
  /** Market localizable content is invalid. */
  | 'INVALID_MARKET_LOCALIZABLE_CONTENT'
  /** Translatable content is invalid. */
  | 'INVALID_TRANSLATABLE_CONTENT'
  /** The shop isn't allowed to operate on market custom content. */
  | 'MARKET_CUSTOM_CONTENT_NOT_ALLOWED'
  /** The market corresponding to the `marketId` argument doesn't exist. */
  | 'MARKET_DOES_NOT_EXIST'
  /** The market override locale creation failed. */
  | 'MARKET_LOCALE_CREATION_FAILED'
  /** Resource does not exist. */
  | 'RESOURCE_NOT_FOUND'
  /** The specified resource can't be customized for a market. */
  | 'RESOURCE_NOT_MARKET_CUSTOMIZABLE'
  /** Too many translation keys for the resource. */
  | 'TOO_MANY_KEYS_FOR_RESOURCE';

/** Provides the fields and values to use when creating or updating a translation. */
export type TranslationInput = {
  /** On the resource that this translation belongs to,         the reference to the value being translated. */
  key: Scalars['String'];
  /** ISO code of the locale being translated into. */
  locale: Scalars['String'];
  /** The ID of the market that the translation is specific to. Not specifying this field means that the translation will be available in all markets. */
  marketId?: InputMaybe<Scalars['ID']>;
  /** Hash digest representation         of the content being translated. */
  translatableContentDigest: Scalars['String'];
  /** The value of the translation. */
  value: Scalars['String'];
};

/**
 * Specifies the
 * [Urchin Traffic Module (UTM) parameters](https://en.wikipedia.org/wiki/UTM_parameters)
 * that are associated with a related marketing campaign.
 *
 */
export type UtmInput = {
  /** The name of the UTM campaign. */
  campaign: Scalars['String'];
  /** The UTM campaign medium. */
  medium: Scalars['String'];
  /** The name of the website or application where the referral link exists. */
  source: Scalars['String'];
};

/** Systems of weights and measures. */
export type UnitSystem =
  /** Imperial system of weights and measures. */
  | 'IMPERIAL_SYSTEM'
  /** Metric system of weights and measures. */
  | 'METRIC_SYSTEM';

/** Specifies the input fields required to update a media object. */
export type UpdateMediaInput = {
  /** The alt text associated to the media. */
  alt?: InputMaybe<Scalars['String']>;
  /** Specifies the media to update. */
  id: Scalars['ID'];
  /** The source from which to update the media preview image. May be an external URL or staged upload URL. */
  previewImageSource?: InputMaybe<Scalars['String']>;
};

/** Possible error codes that can be returned by `UrlRedirectBulkDeleteByIdsUserError`. */
export type UrlRedirectBulkDeleteByIdsUserErrorCode =
  /**
   * You must pass one or more [`URLRedirect`](
   *             https://help.shopify.com/en/manual/online-store/menus-and-links/url-redirect
   *           ) object IDs.
   */
  | 'IDS_EMPTY';

/** Possible error codes that can be returned by `UrlRedirectBulkDeleteBySavedSearchUserError`. */
export type UrlRedirectBulkDeleteBySavedSearchUserErrorCode =
  /** The saved search's query cannot match all entries or be empty. */
  | 'INVALID_SAVED_SEARCH_QUERY'
  /** Saved search not found. */
  | 'SAVED_SEARCH_NOT_FOUND';

/** Possible error codes that can be returned by `UrlRedirectBulkDeleteBySearchUserError`. */
export type UrlRedirectBulkDeleteBySearchUserErrorCode =
  /** Invalid search string. */
  | 'INVALID_SEARCH_ARGUMENT';

/** Possible error codes that can be returned by `UrlRedirectUserError`. */
export type UrlRedirectErrorCode =
  /** Redirect could not be created. */
  | 'CREATE_FAILED'
  /** Redirect could not be deleted. */
  | 'DELETE_FAILED'
  /** Redirect does not exist. */
  | 'DOES_NOT_EXIST'
  /** Redirect could not be updated. */
  | 'UPDATE_FAILED';

/** Possible error codes that can be returned by `UrlRedirectImportUserError`. */
export type UrlRedirectImportErrorCode =
  /** The import has already completed. */
  | 'ALREADY_IMPORTED'
  /** CSV file does not exist at given URL. */
  | 'FILE_DOES_NOT_EXIST'
  /** The import is already in progress. */
  | 'IN_PROGRESS'
  /** URL redirect import not found. */
  | 'NOT_FOUND';

/** The input fields to create or update a URL redirect. */
export type UrlRedirectInput = {
  /** The old path to be redirected from. When the user visits this path, they will be redirected to the target location. */
  path?: InputMaybe<Scalars['String']>;
  /** The target location where the user will be redirected to. */
  target?: InputMaybe<Scalars['String']>;
};

/** The set of valid sort keys for the UrlRedirect query. */
export type UrlRedirectSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `path` value. */
  | 'PATH'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** The input fields to use to update a web pixel. */
export type WebPixelInput = {
  /** The web pixel settings in JSON format. */
  settings: Scalars['JSON'];
};

/** The supported formats for webhook subscriptions. */
export type WebhookSubscriptionFormat =
  | 'JSON'
  | 'XML';

/**
 * Specifies the input fields for a webhook subscription.
 *
 */
export type WebhookSubscriptionInput = {
  /** URL where the webhook subscription should send the POST request when the event occurs. */
  callbackUrl?: InputMaybe<Scalars['URL']>;
  /** The format in which the webhook subscription should send the data. */
  format?: InputMaybe<WebhookSubscriptionFormat>;
  /** The list of fields to be included in the webhook subscription. */
  includeFields?: InputMaybe<Array<Scalars['String']>>;
  /** The list of namespaces for any metafields that should be included in the webhook subscription. */
  metafieldNamespaces?: InputMaybe<Array<Scalars['String']>>;
  /** The list of namespaces for private metafields that should be included inthe webhook subscription. */
  privateMetafieldNamespaces?: InputMaybe<Array<Scalars['String']>>;
};

/** The set of valid sort keys for the WebhookSubscription query. */
export type WebhookSubscriptionSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/**
 * The supported topics for webhook subscriptions. You can use webhook subscriptions to receive
 * notifications about particular events in a shop.
 *
 * You don't create webhook subscriptions to
 * [mandatory webhooks](https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks).
 * Instead, you configure mandatory webhooks in your Partner Dashboard as part of your app setup.
 *
 */
export type WebhookSubscriptionTopic =
  /** The webhook topic for `app_purchases_one_time/update` events. Occurs whenever a one-time app charge is updated. */
  | 'APP_PURCHASES_ONE_TIME_UPDATE'
  /** The webhook topic for `app_subscriptions/approaching_capped_amount` events. Occurs when the balance used on an app subscription crosses 90% of the capped amount. */
  | 'APP_SUBSCRIPTIONS_APPROACHING_CAPPED_AMOUNT'
  /** The webhook topic for `app_subscriptions/update` events. Occurs whenever an app subscription is updated. */
  | 'APP_SUBSCRIPTIONS_UPDATE'
  /** The webhook topic for `app/uninstalled` events. Occurs whenever a shop has uninstalled the app. */
  | 'APP_UNINSTALLED'
  /** The webhook topic for `attributed_sessions/first` events. Occurs whenever an order with a "first" attributed session is attributed. Requires the `read_marketing_events` scope. */
  | 'ATTRIBUTED_SESSIONS_FIRST'
  /** The webhook topic for `attributed_sessions/last` events. Occurs whenever an order with a "last" attributed session is attributed. Requires the `read_marketing_events` scope. */
  | 'ATTRIBUTED_SESSIONS_LAST'
  /** The webhook topic for `bulk_operations/finish` events. Notifies when a Bulk Operation finishes. */
  | 'BULK_OPERATIONS_FINISH'
  /** The webhook topic for `carts/create` events. Occurs when a cart is created in the online store. Other types of carts aren't supported. For example, the webhook doesn't support carts that are created in a custom storefront. Requires the `read_orders` scope. */
  | 'CARTS_CREATE'
  /** The webhook topic for `carts/update` events. Occurs when a cart is updated in the online store. Other types of carts aren't supported. For example, the webhook doesn't support carts that are updated in a custom storefront. Requires the `read_orders` scope. */
  | 'CARTS_UPDATE'
  /** The webhook topic for `channels/delete` events. Occurs whenever a channel is deleted. Requires the `read_publications` scope. */
  | 'CHANNELS_DELETE'
  /** The webhook topic for `checkouts/create` events. Occurs whenever a checkout is created. Requires the `read_orders` scope. */
  | 'CHECKOUTS_CREATE'
  /** The webhook topic for `checkouts/delete` events. Occurs whenever a checkout is deleted. Requires the `read_orders` scope. */
  | 'CHECKOUTS_DELETE'
  /** The webhook topic for `checkouts/update` events. Occurs whenever a checkout is updated. Requires the `read_orders` scope. */
  | 'CHECKOUTS_UPDATE'
  /** The webhook topic for `collections/create` events. Occurs whenever a collection is created. Requires the `read_products` scope. */
  | 'COLLECTIONS_CREATE'
  /** The webhook topic for `collections/delete` events. Occurs whenever a collection is deleted. Requires the `read_products` scope. */
  | 'COLLECTIONS_DELETE'
  /** The webhook topic for `collections/update` events. Occurs whenever a collection is updated, including whenever products are added or removed from the collection. Occurs once if multiple products are added or removed from a collection at the same time. Requires the `read_products` scope. */
  | 'COLLECTIONS_UPDATE'
  /** The webhook topic for `collection_listings/add` events. Occurs whenever a collection listing is added. Requires the `read_product_listings` scope. */
  | 'COLLECTION_LISTINGS_ADD'
  /** The webhook topic for `collection_listings/remove` events. Occurs whenever a collection listing is removed. Requires the `read_product_listings` scope. */
  | 'COLLECTION_LISTINGS_REMOVE'
  /** The webhook topic for `collection_listings/update` events. Occurs whenever a collection listing is updated. Requires the `read_product_listings` scope. */
  | 'COLLECTION_LISTINGS_UPDATE'
  /** The webhook topic for `collection_publications/create` events. Occurs whenever a collection publication listing is created. Requires the `read_publications` scope. */
  | 'COLLECTION_PUBLICATIONS_CREATE'
  /** The webhook topic for `collection_publications/delete` events. Occurs whenever a collection publication listing is deleted. Requires the `read_publications` scope. */
  | 'COLLECTION_PUBLICATIONS_DELETE'
  /** The webhook topic for `collection_publications/update` events. Occurs whenever a collection publication listing is updated. Requires the `read_publications` scope. */
  | 'COLLECTION_PUBLICATIONS_UPDATE'
  /** The webhook topic for `customers/create` events. Occurs whenever a customer is created. Requires the `read_customers` scope. */
  | 'CUSTOMERS_CREATE'
  /** The webhook topic for `customers/delete` events. Occurs whenever a customer is deleted. Requires the `read_customers` scope. */
  | 'CUSTOMERS_DELETE'
  /** The webhook topic for `customers/disable` events. Occurs whenever a customer account is disabled. Requires the `read_customers` scope. */
  | 'CUSTOMERS_DISABLE'
  /** The webhook topic for `customers/enable` events. Occurs whenever a customer account is enabled. Requires the `read_customers` scope. */
  | 'CUSTOMERS_ENABLE'
  /** The webhook topic for `customers_marketing_consent/update` events. Occurs whenever a customer's marketing consent is updated. Requires the `read_customers` scope. */
  | 'CUSTOMERS_MARKETING_CONSENT_UPDATE'
  /** The webhook topic for `customers/update` events. Occurs whenever a customer is updated. Requires the `read_customers` scope. */
  | 'CUSTOMERS_UPDATE'
  /** The webhook topic for `customer_groups/create` events. Occurs whenever a customer saved search is created. Requires the `read_customers` scope. */
  | 'CUSTOMER_GROUPS_CREATE'
  /** The webhook topic for `customer_groups/delete` events. Occurs whenever a customer saved search is deleted. Requires the `read_customers` scope. */
  | 'CUSTOMER_GROUPS_DELETE'
  /** The webhook topic for `customer_groups/update` events. Occurs whenever a customer saved search is updated. Requires the `read_customers` scope. */
  | 'CUSTOMER_GROUPS_UPDATE'
  /** The webhook topic for `customer_payment_methods/create` events. Occurs whenever a customer payment method is created. Requires the `read_customer_payment_methods` scope. */
  | 'CUSTOMER_PAYMENT_METHODS_CREATE'
  /** The webhook topic for `customer_payment_methods/revoke` events. Occurs whenever a customer payment method is revoked. Requires the `read_customer_payment_methods` scope. */
  | 'CUSTOMER_PAYMENT_METHODS_REVOKE'
  /** The webhook topic for `customer_payment_methods/update` events. Occurs whenever a customer payment method is updated. Requires the `read_customer_payment_methods` scope. */
  | 'CUSTOMER_PAYMENT_METHODS_UPDATE'
  /** The webhook topic for `disputes/create` events. Occurs whenever a dispute is created. Requires the `read_shopify_payments_disputes` scope. */
  | 'DISPUTES_CREATE'
  /** The webhook topic for `disputes/update` events. Occurs whenever a dispute is updated. Requires the `read_shopify_payments_disputes` scope. */
  | 'DISPUTES_UPDATE'
  /** The webhook topic for `domains/create` events. Occurs whenever a domain is created. */
  | 'DOMAINS_CREATE'
  /** The webhook topic for `domains/destroy` events. Occurs whenever a domain is destroyed. */
  | 'DOMAINS_DESTROY'
  /** The webhook topic for `domains/update` events. Occurs whenever a domain is updated. */
  | 'DOMAINS_UPDATE'
  /** The webhook topic for `draft_orders/create` events. Occurs whenever a draft order is created. Requires the `read_draft_orders` scope. */
  | 'DRAFT_ORDERS_CREATE'
  /** The webhook topic for `draft_orders/delete` events. Occurs whenever a draft order is deleted. Requires the `read_draft_orders` scope. */
  | 'DRAFT_ORDERS_DELETE'
  /** The webhook topic for `draft_orders/update` events. Occurs whenever a draft order is updated. Requires the `read_draft_orders` scope. */
  | 'DRAFT_ORDERS_UPDATE'
  /** The webhook topic for `fulfillments/create` events. Occurs whenever a fulfillment is created. Requires at least one of the following scopes: read_fulfillments, read_marketplace_orders. */
  | 'FULFILLMENTS_CREATE'
  /** The webhook topic for `fulfillments/update` events. Occurs whenever a fulfillment is updated. Requires at least one of the following scopes: read_fulfillments, read_marketplace_orders. */
  | 'FULFILLMENTS_UPDATE'
  /** The webhook topic for `fulfillment_events/create` events. Occurs whenever a fulfillment event is created. Requires the `read_fulfillments` scope. */
  | 'FULFILLMENT_EVENTS_CREATE'
  /** The webhook topic for `fulfillment_events/delete` events. Occurs whenever a fulfillment event is deleted. Requires the `read_fulfillments` scope. */
  | 'FULFILLMENT_EVENTS_DELETE'
  /** The webhook topic for `inventory_items/create` events. Occurs whenever an inventory item is created. Requires the `read_inventory` scope. */
  | 'INVENTORY_ITEMS_CREATE'
  /** The webhook topic for `inventory_items/delete` events. Occurs whenever an inventory item is deleted. Requires the `read_inventory` scope. */
  | 'INVENTORY_ITEMS_DELETE'
  /** The webhook topic for `inventory_items/update` events. Occurs whenever an inventory item is updated. Requires the `read_inventory` scope. */
  | 'INVENTORY_ITEMS_UPDATE'
  /** The webhook topic for `inventory_levels/connect` events. Occurs whenever an inventory level is connected. Requires the `read_inventory` scope. */
  | 'INVENTORY_LEVELS_CONNECT'
  /** The webhook topic for `inventory_levels/disconnect` events. Occurs whenever an inventory level is disconnected. Requires the `read_inventory` scope. */
  | 'INVENTORY_LEVELS_DISCONNECT'
  /** The webhook topic for `inventory_levels/update` events. Occurs whenever an inventory level is updated. Requires the `read_inventory` scope. */
  | 'INVENTORY_LEVELS_UPDATE'
  /** The webhook topic for `locales/create` events. Occurs whenever a shop locale is created Requires the `read_locales` scope. */
  | 'LOCALES_CREATE'
  /** The webhook topic for `locales/update` events. Occurs whenever a shop locale is updated, such as published or unpublished Requires the `read_locales` scope. */
  | 'LOCALES_UPDATE'
  /** The webhook topic for `locations/create` events. Occurs whenever a location is created. Requires the `read_locations` scope. */
  | 'LOCATIONS_CREATE'
  /** The webhook topic for `locations/delete` events. Occurs whenever a location is deleted. Requires the `read_locations` scope. */
  | 'LOCATIONS_DELETE'
  /** The webhook topic for `locations/update` events. Occurs whenever a location is updated. Requires the `read_locations` scope. */
  | 'LOCATIONS_UPDATE'
  /** The webhook topic for `markets/create` events. Occurs when a new market is created. Requires the `read_markets` scope. */
  | 'MARKETS_CREATE'
  /** The webhook topic for `markets/delete` events. Occurs when a market is deleted. Requires the `read_markets` scope. */
  | 'MARKETS_DELETE'
  /** The webhook topic for `markets/update` events. Occurs when a market is updated. Requires the `read_markets` scope. */
  | 'MARKETS_UPDATE'
  /** The webhook topic for `orders/cancelled` events. Occurs whenever an order is cancelled. Requires at least one of the following scopes: read_orders, read_marketplace_orders. */
  | 'ORDERS_CANCELLED'
  /** The webhook topic for `orders/create` events. Occurs whenever an order is created. Requires at least one of the following scopes: read_orders, read_marketplace_orders. */
  | 'ORDERS_CREATE'
  /** The webhook topic for `orders/delete` events. Occurs whenever an order is deleted. Requires the `read_orders` scope. */
  | 'ORDERS_DELETE'
  /** The webhook topic for `orders/edited` events. Occurs whenever an order is edited. Requires at least one of the following scopes: read_orders, read_marketplace_orders. */
  | 'ORDERS_EDITED'
  /** The webhook topic for `orders/fulfilled` events. Occurs whenever an order is fulfilled. Requires at least one of the following scopes: read_orders, read_marketplace_orders. */
  | 'ORDERS_FULFILLED'
  /** The webhook topic for `orders/paid` events. Occurs whenever an order is paid. Requires at least one of the following scopes: read_orders, read_marketplace_orders. */
  | 'ORDERS_PAID'
  /** The webhook topic for `orders/partially_fulfilled` events. Occurs whenever an order is partially fulfilled. Requires at least one of the following scopes: read_orders, read_marketplace_orders. */
  | 'ORDERS_PARTIALLY_FULFILLED'
  /** The webhook topic for `orders/updated` events. Occurs whenever an order is updated. Requires at least one of the following scopes: read_orders, read_marketplace_orders. */
  | 'ORDERS_UPDATED'
  /** The webhook topic for `order_transactions/create` events. Occurs when a order transaction is created or when it's status is updated. Only occurs for transactions with a status of success, failure or error. Requires at least one of the following scopes: read_orders, read_marketplace_orders. */
  | 'ORDER_TRANSACTIONS_CREATE'
  /** The webhook topic for `payment_terms/create` events. Occurs whenever payment terms are created. Requires the `read_payment_terms` scope. */
  | 'PAYMENT_TERMS_CREATE'
  /** The webhook topic for `payment_terms/delete` events. Occurs whenever payment terms are deleted. Requires the `read_payment_terms` scope. */
  | 'PAYMENT_TERMS_DELETE'
  /** The webhook topic for `payment_terms/update` events. Occurs whenever payment terms are updated. Requires the `read_payment_terms` scope. */
  | 'PAYMENT_TERMS_UPDATE'
  /** The webhook topic for `products/create` events. Occurs whenever a product is created. Requires the `read_products` scope. */
  | 'PRODUCTS_CREATE'
  /** The webhook topic for `products/delete` events. Occurs whenever a product publication is deleted. Requires the `read_products` scope. */
  | 'PRODUCTS_DELETE'
  /** The webhook topic for `products/update` events. Occurs whenever a product is updated, or whenever a product is ordered, or whenever a variant is added, removed, or updated. Requires the `read_products` scope. */
  | 'PRODUCTS_UPDATE'
  /** The webhook topic for `product_listings/add` events. Occurs whenever an active product is listed on a channel. Requires the `read_product_listings` scope. */
  | 'PRODUCT_LISTINGS_ADD'
  /** The webhook topic for `product_listings/remove` events. Occurs whenever a product listing is removed from the channel. Requires the `read_product_listings` scope. */
  | 'PRODUCT_LISTINGS_REMOVE'
  /** The webhook topic for `product_listings/update` events. Occurs whenever a product publication is updated. Requires the `read_product_listings` scope. */
  | 'PRODUCT_LISTINGS_UPDATE'
  /** The webhook topic for `product_publications/create` events. Occurs whenever a product publication for an active product is created, or whenever an existing product publication is published. Requires the `read_publications` scope. */
  | 'PRODUCT_PUBLICATIONS_CREATE'
  /** The webhook topic for `product_publications/delete` events. Occurs whenever a product publication for an active product is removed, or whenever an existing product publication is unpublished. Requires the `read_publications` scope. */
  | 'PRODUCT_PUBLICATIONS_DELETE'
  /** The webhook topic for `product_publications/update` events. Occurs whenever a product publication is updated. Requires the `read_publications` scope. */
  | 'PRODUCT_PUBLICATIONS_UPDATE'
  /** The webhook topic for `profiles/create` events. Occurs whenever a delivery profile is created Requires the `read_shipping` scope. */
  | 'PROFILES_CREATE'
  /** The webhook topic for `profiles/delete` events. Occurs whenever a delivery profile is deleted Requires the `read_shipping` scope. */
  | 'PROFILES_DELETE'
  /** The webhook topic for `profiles/update` events. Occurs whenever a delivery profile is updated Requires the `read_shipping` scope. */
  | 'PROFILES_UPDATE'
  /** The webhook topic for `refunds/create` events. Occurs whenever a new refund is created without errors on an order, independent from the movement of money. Requires at least one of the following scopes: read_orders, read_marketplace_orders. */
  | 'REFUNDS_CREATE'
  /** The webhook topic for `scheduled_product_listings/add` events. Occurs whenever a product is scheduled to be published. Requires the `read_product_listings` scope. */
  | 'SCHEDULED_PRODUCT_LISTINGS_ADD'
  /** The webhook topic for `scheduled_product_listings/remove` events. Occurs whenever a product is no longer scheduled to be published. Requires the `read_product_listings` scope. */
  | 'SCHEDULED_PRODUCT_LISTINGS_REMOVE'
  /** The webhook topic for `scheduled_product_listings/update` events. Occurs whenever a product's scheduled availability date changes. Requires the `read_product_listings` scope. */
  | 'SCHEDULED_PRODUCT_LISTINGS_UPDATE'
  /** The webhook topic for `segments/create` events. Occurs whenever a segment is created. Requires the `read_customers` scope. */
  | 'SEGMENTS_CREATE'
  /** The webhook topic for `segments/delete` events. Occurs whenever a segment is deleted. Requires the `read_customers` scope. */
  | 'SEGMENTS_DELETE'
  /** The webhook topic for `segments/update` events. Occurs whenever a segment is updated. Requires the `read_customers` scope. */
  | 'SEGMENTS_UPDATE'
  /** The webhook topic for `selling_plan_groups/create` events. Notifies when a SellingPlanGroup is created. Requires the `read_products` scope. */
  | 'SELLING_PLAN_GROUPS_CREATE'
  /** The webhook topic for `selling_plan_groups/delete` events. Notifies when a SellingPlanGroup is deleted. Requires the `read_products` scope. */
  | 'SELLING_PLAN_GROUPS_DELETE'
  /** The webhook topic for `selling_plan_groups/update` events. Notifies when a SellingPlanGroup is updated. Requires the `read_products` scope. */
  | 'SELLING_PLAN_GROUPS_UPDATE'
  /** The webhook topic for `shipping_addresses/create` events. Occurs whenever a shipping address is created. Requires the `read_shipping` scope. */
  | 'SHIPPING_ADDRESSES_CREATE'
  /** The webhook topic for `shipping_addresses/update` events. Occurs whenever a shipping address is updated. Requires the `read_shipping` scope. */
  | 'SHIPPING_ADDRESSES_UPDATE'
  /** The webhook topic for `shop/update` events. Occurs whenever a shop is updated. */
  | 'SHOP_UPDATE'
  /** The webhook topic for `subscription_billing_attempts/challenged` events. Occurs when the financial instutition challenges the subscripttion billing attempt charge as per 3D Secure. Requires the `read_own_subscription_contracts` scope. */
  | 'SUBSCRIPTION_BILLING_ATTEMPTS_CHALLENGED'
  /** The webhook topic for `subscription_billing_attempts/failure` events. Occurs whenever a subscription billing attempt fails. Requires the `read_own_subscription_contracts` scope. */
  | 'SUBSCRIPTION_BILLING_ATTEMPTS_FAILURE'
  /** The webhook topic for `subscription_billing_attempts/success` events. Occurs whenever a subscription billing attempt succeeds. Requires the `read_own_subscription_contracts` scope. */
  | 'SUBSCRIPTION_BILLING_ATTEMPTS_SUCCESS'
  /** The webhook topic for `subscription_contracts/create` events. Occurs whenever a subscription contract is created. Requires the `read_own_subscription_contracts` scope. */
  | 'SUBSCRIPTION_CONTRACTS_CREATE'
  /** The webhook topic for `subscription_contracts/update` events. Occurs whenever a subscription contract is updated. Requires the `read_own_subscription_contracts` scope. */
  | 'SUBSCRIPTION_CONTRACTS_UPDATE'
  /** The webhook topic for `tax_services/create` events. Occurs whenever a tax service is created. Requires the `read_taxes` scope. */
  | 'TAX_SERVICES_CREATE'
  /** The webhook topic for `tax_services/update` events. Occurs whenver a tax service is updated. Requires the `read_taxes` scope. */
  | 'TAX_SERVICES_UPDATE'
  /** The webhook topic for `tender_transactions/create` events. Occurs when a tender transaction is created. Requires the `read_orders` scope. */
  | 'TENDER_TRANSACTIONS_CREATE'
  /** The webhook topic for `themes/create` events. Occurs whenever a theme is created. Does not occur when theme files are created. Requires the `read_themes` scope. */
  | 'THEMES_CREATE'
  /** The webhook topic for `themes/delete` events. Occurs whenever a theme is deleted. Does not occur when theme files are deleted. Requires the `read_themes` scope. */
  | 'THEMES_DELETE'
  /** The webhook topic for `themes/publish` events. Occurs whenever a theme with the main or mobile (deprecated) role is published. Requires the `read_themes` scope. */
  | 'THEMES_PUBLISH'
  /** The webhook topic for `themes/update` events. Occurs whenever a theme is updated. Does not occur when theme files are updated. Requires the `read_themes` scope. */
  | 'THEMES_UPDATE'
  /** The webhook topic for `variants/in_stock` events. Occurs whenever a variant becomes in stock. Requires the `read_products` scope. */
  | 'VARIANTS_IN_STOCK'
  /** The webhook topic for `variants/out_of_stock` events. Occurs whenever a variant becomes out of stock. Requires the `read_products` scope. */
  | 'VARIANTS_OUT_OF_STOCK';

/**
 * Specifies the weight unit and value inputs.
 *
 */
export type WeightInput = {
  /** Unit of measurement for `value`. */
  unit: WeightUnit;
  /** The weight value using the unit system specified with `weight_unit`. */
  value: Scalars['Float'];
};

/** Units of measurement for weight. */
export type WeightUnit =
  /** Metric system unit of mass. */
  | 'GRAMS'
  /** 1 kilogram equals 1000 grams. */
  | 'KILOGRAMS'
  /** Imperial system unit of mass. */
  | 'OUNCES'
  /** 1 pound equals 16 ounces. */
  | 'POUNDS';

export type ActiveSubscriptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveSubscriptionsQuery = { currentAppInstallation: { activeSubscriptions: Array<{ id: string, createdAt: any, currentPeriodEnd?: any | null, status: AppSubscriptionStatus, returnUrl: any, lineItems: Array<{ id: string, plan: { __typename: 'AppPlanV2', pricingDetails: { interval: AppPricingInterval, discount?: { durationLimitInIntervals?: number | null, remainingDurationInIntervals?: number | null, priceAfterDiscount: { amount: any, currencyCode: CurrencyCode } } | null, price: { amount: any, currencyCode: CurrencyCode } } | { interval: AppPricingInterval, terms: string, balanceUsed: { amount: any, currencyCode: CurrencyCode }, cappedAmount: { amount: any, currencyCode: CurrencyCode } } } }> }> } };

export type AppSubscriptionCancelMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AppSubscriptionCancelMutation = { appSubscriptionCancel?: { userErrors: Array<{ field?: Array<string> | null, message: string }>, appSubscription?: { id: string, createdAt: any, currentPeriodEnd?: any | null, status: AppSubscriptionStatus, returnUrl: any, lineItems: Array<{ id: string, plan: { __typename: 'AppPlanV2', pricingDetails: { interval: AppPricingInterval, discount?: { durationLimitInIntervals?: number | null, remainingDurationInIntervals?: number | null, priceAfterDiscount: { amount: any, currencyCode: CurrencyCode } } | null, price: { amount: any, currencyCode: CurrencyCode } } | { interval: AppPricingInterval, terms: string, balanceUsed: { amount: any, currencyCode: CurrencyCode }, cappedAmount: { amount: any, currencyCode: CurrencyCode } } } }> } | null } | null };

export type AppSubscriptionCreateMutationVariables = Exact<{
  name: Scalars['String'];
  lineItems: Array<AppSubscriptionLineItemInput> | AppSubscriptionLineItemInput;
  returnUrl: Scalars['URL'];
  test?: InputMaybe<Scalars['Boolean']>;
}>;


export type AppSubscriptionCreateMutation = { appSubscriptionCreate?: { confirmationUrl?: any | null, userErrors: Array<{ field?: Array<string> | null, message: string }>, appSubscription?: { id: string, createdAt: any, currentPeriodEnd?: any | null, status: AppSubscriptionStatus, returnUrl: any, lineItems: Array<{ id: string, plan: { __typename: 'AppPlanV2', pricingDetails: { interval: AppPricingInterval, discount?: { durationLimitInIntervals?: number | null, remainingDurationInIntervals?: number | null, priceAfterDiscount: { amount: any, currencyCode: CurrencyCode } } | null, price: { amount: any, currencyCode: CurrencyCode } } | { interval: AppPricingInterval, terms: string, balanceUsed: { amount: any, currencyCode: CurrencyCode }, cappedAmount: { amount: any, currencyCode: CurrencyCode } } } }> } | null } | null };

export type GetCustomersQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetCustomersQuery = { customers: { edges: Array<{ node: { email?: string | null, displayName: string, emailMarketingConsent?: { marketingOptInLevel?: CustomerMarketingOptInLevel | null, marketingState: CustomerEmailMarketingState, consentUpdatedAt?: any | null } | null } }>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type ScriptTagDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ScriptTagDeleteMutation = { scriptTagDelete?: { deletedScriptTagId?: string | null, userErrors: Array<{ field?: Array<string> | null, message: string }> } | null };

export type GetScriptTagsQueryVariables = Exact<{
  src: Scalars['URL'];
}>;


export type GetScriptTagsQuery = { scriptTags: { edges: Array<{ node: { id: string } }> } };

export type GetOrderQueryVariables = Exact<{
  orderId: Scalars['ID'];
}>;


export type GetOrderQuery = { order?: { email?: string | null } | null };

export type GetProductQueryVariables = Exact<{
  productId: Scalars['ID'];
}>;


export type GetProductQuery = { product?: { id: string, title: string, handle: string, totalInventory: number, tags: Array<string>, totalVariants: number, collections: { edges: Array<{ node: { id: string, title: string, description: string, handle: string } }> }, images: { edges: Array<{ node: { id?: string | null, url: any, height?: number | null, width?: number | null, altText?: string | null } }> }, options: Array<{ id: string, name: string, values: Array<string>, position: number }>, variants: { edges: Array<{ node: { id: string, position: number, price: any, sku?: string | null, title: string, compareAtPrice?: any | null, selectedOptions: Array<{ name: string, value: string }>, image?: { altText?: string | null, url: any, height?: number | null, width?: number | null } | null } }> } } | null };

export type GetProductsQueryVariables = Exact<{
  first: Scalars['Int'];
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetProductsQuery = { products: { edges: Array<{ node: { id: string, title: string, handle: string, totalInventory: number, tags: Array<string>, totalVariants: number, collections: { edges: Array<{ node: { id: string, title: string, description: string, handle: string } }> }, images: { edges: Array<{ node: { id?: string | null, url: any, height?: number | null, width?: number | null, altText?: string | null } }> }, options: Array<{ id: string, name: string, values: Array<string>, position: number }>, variants: { edges: Array<{ node: { id: string, position: number, price: any, sku?: string | null, title: string, compareAtPrice?: any | null, selectedOptions: Array<{ name: string, value: string }>, image?: { altText?: string | null, url: any, height?: number | null, width?: number | null } | null } }> } } }>, pageInfo: { hasNextPage: boolean, endCursor?: string | null } } };

export type CreateScriptTagMutationVariables = Exact<{
  input: ScriptTagInput;
}>;


export type CreateScriptTagMutation = { scriptTagCreate?: { scriptTag?: { id: string, src: any } | null, userErrors: Array<{ field?: Array<string> | null, message: string }> } | null };
