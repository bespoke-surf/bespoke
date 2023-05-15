export const APP_SUBSCRIPTIONS_CREATE = /* GraphQL*/ `
  mutation AppSubscriptionCreate(
    $name: String!
    $lineItems: [AppSubscriptionLineItemInput!]!
    $returnUrl: URL!
    $test: Boolean
  ) {
    appSubscriptionCreate(
      name: $name
      returnUrl: $returnUrl
      lineItems: $lineItems
      test: $test
    ) {
      userErrors {
        field
        message
      }
      appSubscription {
        id
        createdAt
        currentPeriodEnd
        status
        returnUrl
        lineItems {
          id
          plan {
            pricingDetails {
              ... on AppRecurringPricing {
                discount {
                  durationLimitInIntervals
                  priceAfterDiscount {
                    amount
                    currencyCode
                  }
                  remainingDurationInIntervals
                }
                interval
                price {
                  amount
                  currencyCode
                }
              }
              ... on AppUsagePricing {
                balanceUsed {
                  amount
                  currencyCode
                }
                cappedAmount {
                  amount
                  currencyCode
                }
                interval
                terms
              }
            }
            __typename
          }
        }
      }
      confirmationUrl
    }
  }
`;
