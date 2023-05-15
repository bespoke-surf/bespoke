/* eslint-disable gestalt/prefer-box-inline-style */

import type { LinksFunction } from "@remix-run/node";
import { Box } from "gestalt";
import { CdnType } from "../../../../graphql/__generated__/graphql";
import { getImageSrcAndSrcSet } from "../../../../utils/getCloudinarySrcAndSrcSet";
import css from "./index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: css }];
};
export default function PoundCount() {
  return <New />;
}

const item = [
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1683471025/Frame_15_5_i49pgh.png",
];

const image = getImageSrcAndSrcSet(item[0], false, CdnType.Cloudinary);
const New = () => {
  return (
    <div id="pricing" className="zI7 iyn Hsu">
      <div className="PricingBusinessTextAndImage">
        <div className="PricingBusinessGridParent">
          <div className="PricingBusinessGridItem PricingBusinessGridItem--start-1 PricingBusinessGridItem--span-8 PricingBusinessGridItem--start-m-2 PricingBusinessGridItem--span-m-5 PricingBusinessGridItem--start-l-1 PricingBusinessGridItem--span-l-10 PricingBusinessGridItem--row-start-m-1 PricingBusinessTextAndImage__heading-container">
            <p
              className="PricingBusinessText PricingBusinessText--t4 PricingBusinessTextAndImage__eyebrow PricingBusinessText--bold"
              style={{
                color: "inherit",
              }}
            >
              How to Strategize Effectively
            </p>
            <h2
              className="PricingBusinessText PricingBusinessText--h2 PricingBusinessTextAndImage__heading"
              style={{ color: "inherit" }}
            >
              Replicate Most Upvoted Strategies
            </h2>
          </div>
          <div className="PricingBusinessGridItem PricingBusinessGridItem--start-3 PricingBusinessGridItem--span-4 PricingBusinessGridItem--start-m-8 PricingBusinessGridItem--span-m-5 PricingBusinessGridItem--start-l-15 PricingBusinessGridItem--span-l-8 PricingBusinessGridItem--center-vertical PricingBusinessGridItem--row-start-1 PricingBusinessTextAndImage__container">
            <div className="PricingBusinessTextAndImage__image">
              <div
                className="PricingBusinessTransitionHookWrapper"
                style={{
                  transition:
                    "opacity 450ms cubic-bezier(0.21, 0.01, 0.21, 0.96) 0s, transform cubic-bezier(0.21, 0.01, 0.21, 0.96)",
                  transform: "none",
                  opacity: 1,
                }}
              >
                <div
                  className="XiG zI7 iyn Hsu Pbd"
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  <img
                    alt="A graphic showing two adjustable scales for days and daily budget"
                    className="hCL kVc L4E MIw"
                    src={image?.src}
                    srcSet={image?.srcSet}
                    sizes={image?.sizes}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="PricingBusinessGridItem PricingBusinessGridItem--start-2 PricingBusinessGridItem--span-6 PricingBusinessGridItem--start-m-2 PricingBusinessGridItem--span-m-5 PricingBusinessGridItem--start-l-1 PricingBusinessGridItem--span-l-10 PricingBusinessGridItem--row-start-m-2 PricingBusinessTextAndImage__subhead-container">
            <div className="PricingBusinessSubheadingLockup">
              <p
                className="PricingBusinessText PricingBusinessText--t4 PricingBusinessSubheadingLockup__copy"
                style={{ color: "inherit" }}
              >
                You might spend a lot of time developing new email strategies,
                or even hire an email strategist. However, you can now replicate
                the successful strategies shared by other experts.
              </p>
              <Box
                dangerouslySetInlineStyle={{ __style: { marginTop: "2rem" } }}
              />
              <p
                className="PricingBusinessText PricingBusinessText--t4 PricingBusinessSubheadingLockup__copy"
                style={{ color: "inherit" }}
              >
                This approach simplifies the process of launching new
                strategies, and allows you to share your own ideas with others.
                Who can upvote them if they find it effective.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
