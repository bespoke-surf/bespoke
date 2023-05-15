import type { LinksFunction } from "@remix-run/node";
import css from "./index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: css }];
};
/* eslint-disable gestalt/prefer-box-inline-style */
export default function Analytics() {
  return <New />;
}

const New = () => {
  return (
    <div className="AnalyticsBusinessTextAndImage">
      <div className="AnalyticsBusinessGridParent">
        <div className="AnalyticsBusinessGridItem AnalyticsBusinessGridItem--start-1 AnalyticsBusinessGridItem--span-8 AnalyticsBusinessGridItem--start-m-2 AnalyticsBusinessGridItem--span-m-5 AnalyticsBusinessGridItem--start-l-1 AnalyticsBusinessGridItem--span-l-10 AnalyticsBusinessGridItem--row-start-m-1 AnalyticsBusinessTextAndImage__heading-container">
          <h2
            className="AnalyticsBusinessText AnalyticsBusinessText--h2 AnalyticsBusinessTextAndImage__heading"
            style={{ color: "black", fontSize: "48px" }}
          >
            Subscription Rewards, Bonus Credits etc..
          </h2>
        </div>
        <div className="AnalyticsBusinessGridItem AnalyticsBusinessGridItem--start-3 AnalyticsBusinessGridItem--span-4 AnalyticsBusinessGridItem--start-m-8 AnalyticsBusinessGridItem--span-m-5 AnalyticsBusinessGridItem--start-l-15 AnalyticsBusinessGridItem--span-l-8 AnalyticsBusinessGridItem--center-vertical AnalyticsBusinessGridItem--row-start-1 AnalyticsBusinessTextAndImage__container">
          <div
            className="AnalyticsBusinessTransitionHookWrapper"
            style={{
              transition:
                "opacity 450ms cubic-bezier(0.21, 0.01, 0.21, 0.96) 0s, transform cubic-bezier(0.21, 0.01, 0.21, 0.96)",
              transform: "none",
              opacity: 1,
            }}
          >
            <p
              className="AnalyticsBusinessText AnalyticsBusinessText--t4 AnalyticsBusinessSubheadingLockup__copy"
              style={{ color: "black" }}
            >
              Unlock exciting rewards, score monthly Subscription Rewards, snag
              free bonus Credits, and compete with your industry peers. Access
              optimized community shared tools for supercharged growth of your
              Shopify store. Get bespoke now and watch your store soar! Join us
              in empowering humanity to achieve financial independence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
