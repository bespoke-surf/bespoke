import { Feature, TheImage } from "../EmailMarketing/EmailMarketing";

/* eslint-disable gestalt/prefer-box-inline-style */
export const One = () => {
  return (
    <div className="PricingOneBusinessEditorialFeaturedHeaderContainer">
      <div
        className="PricingOneBusinessEditorialFeaturedHeader"
        style={{ height: "calc(100vh - 65px)" }}
      >
        <TheImage />
        <Feature />
      </div>
    </div>
  );
};
