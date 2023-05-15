export const APP_SUBSCRIPTION_CANCEL = /* GraphQL*/ `
  mutation AppSubscriptionCancel($id: ID!) {
    appSubscriptionCancel(id: $id) {
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
    }
  }
`;
