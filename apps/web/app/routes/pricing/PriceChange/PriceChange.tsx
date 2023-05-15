/* eslint-disable gestalt/prefer-box-inline-style */

import { pricingPlan } from "@bespoke/common/dist/pricingPlan";
import { useState } from "react";
import { numberWithCommas } from "../pricingUtil";

export default function PriceChange() {
  return <New />;
}

const selectOptions = pricingPlan.map(({ label, value }) => (
  <option key={value} value={value}>
    {label}
  </option>
));

const New = () => {
  const [contacts, setContacts] = useState("10000");

  const enteredContacts = Number(contacts) > 1500000;

  return (
    <div id="ad-formats" className="zI7 iyn Hsu">
      <div className="zI7 iyn Hsu">
        <div className="OurServiceBusinessHorizontalTabsWithPin OurServiceBusinessHorizontalTabsWithPin--mobile">
          <div className="OurServiceBusinessGridParent">
            <div className="OurServiceBusinessGridItem OurServiceBusinessGridItem--span-8 OurServiceBusinessGridItem--start-m-2 OurServiceBusinessGridItem--span-m-10 OurServiceBusinessGridItem--start-l-3 OurServiceBusinessGridItem--span-l-20">
              <p
                className="OurServiceBusinessText OurServiceBusinessText--t4 OurServiceBusinessHorizontalTabsWithPin__eyebrow OurServiceBusinessText--bold"
                style={{ color: "inherit" }}
              >
                Estimate your price
              </p>
              <h2
                className="OurServiceBusinessText OurServiceBusinessText--h2 OurServiceBusinessHorizontalTabsWithPin__heading"
                style={{ color: "inherit" }}
              >
                How much is your gross revenue in last 12 months?
              </h2>
            </div>
          </div>
          <div
            className="OurServiceBusinessTabs"
            role="tablist"
            style={{
              color: "inherit",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="OurServiceBusinessTabs__scroller ">
              <select
                onChange={(event) => {
                  setContacts(event.target.value);
                }}
                className="PriceChangeSelectList OurServiceBusinessText OurServiceBusinessText--cta OurServiceBusinessButtonText OurServiceBusinessText--bold "
              >
                {selectOptions}
              </select>
            </div>
          </div>
          <div className="OurServiceBusinessGridParent">
            <div className="OurServiceBusinessGridItem OurServiceBusinessGridItem--span-8 OurServiceBusinessGridItem--start-m-2 OurServiceBusinessGridItem--span-m-10 OurServiceBusinessGridItem--start-l-3 OurServiceBusinessGridItem--span-l-20">
              <div className="trackingDiv">
                <h2
                  className="OurServiceBusinessText OurServiceBusinessText--h2 OurServiceBusinessHorizontalTabsWithPin__heading"
                  style={{ color: "inherit" }}
                >
                  $
                  {numberWithCommas(
                    Number(
                      pricingPlan.find(
                        ({ value }) => contacts === String(value)
                      )?.price ?? 0
                    )
                  )}
                  {enteredContacts ? "" : "/m"}
                </h2>
              </div>
            </div>
          </div>
          {enteredContacts && (
            <p
              className="OurServiceBusinessText OurServiceBusinessText--t4 OurServiceBusinessHorizontalTabsWithPin__eyebrow OurServiceBusinessText--bold"
              style={{ color: "inherit" }}
            >
              Calculated based on your monthly gross revenue
            </p>
          )}
          {!enteredContacts && (
            <>
              <p
                className="OurServiceBusinessText OurServiceBusinessText--t4 OurServiceBusinessHorizontalTabsWithPin__eyebrow OurServiceBusinessText--bold"
                style={{ color: "inherit" }}
              >
                Estimated rate may vary based on industry
              </p>

              {/* <p
                className="OurServiceBusinessText OurServiceBusinessText--t4 OurServiceBusinessHorizontalTabsWithPin__eyebrow OurServiceBusinessText--bold"
                style={{ color: "inherit" }}
              >
                send {numberWithCommas(Number(contacts))} emails
              </p> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
