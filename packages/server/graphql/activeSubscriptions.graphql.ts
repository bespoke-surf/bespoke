export const ACTIVE_SUBSCRIPTIONS_QUERY = /* GraphQL*/ `
  query ActiveSubscriptions {
    currentAppInstallation {
      activeSubscriptions {
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
