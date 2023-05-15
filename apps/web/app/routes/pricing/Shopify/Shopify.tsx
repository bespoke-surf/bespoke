import { lazy, Suspense, useReducer } from "react";
import { CdnType } from "../../../graphql/__generated__/graphql";
import { getImageSrcAndSrcSet } from "../../../utils/getCloudinarySrcAndSrcSet";

const item = [
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670342781/hookle-app-6Pa7l0unTAY-unsplash_wym5ru.jpg",
];
const image = getImageSrcAndSrcSet(item[0], false, CdnType.Cloudinary);

const JoinTheWaitlist = lazy(
  () => import("../../../components/footer/JoinTheWaitlist")
);

export const Shopify = () => {
  const [waitList, setWaitlist] = useReducer((s) => !s, false);
  return (
    <>
      <div className="PricingShopifyBusinessEditorialTwoColumnFeatured">
        <div
          data-test-id="PricingShopifyBusinessEditorialTwoColumnFeatured__itemContainer_first"
          className="PricingShopifyBusinessEditorialTwoColumnFeatured__itemContainer"
        >
          <div className="PricingShopifyBusinessEditorialTwoColumnFeatured__itemSubContainer">
            <div
              data-test-id="PricingShopifyBusinessEditorialTwoColumnFeatured__firstItem"
              className="PricingShopifyBusinessEditorialTwoColumnFeatured__firstItem"
            >
              <div
                className="PricingShopifyBusinessFlexibleHeader PricingShopifyBusinessFlexibleHeader__h3"
                data-test-id="PricingShopifyBusinessFlexibleHeader PricingShopifyBusinessFlexibleHeader__h3"
              >
                <div className="PricingShopifyBusinessGridParent">
                  <div className="PricingShopifyBusinessFlexibleHeaderGrid PricingShopifyBusinessFlexibleHeaderGrid__center">
                    <div className="PricingShopifyBusinessFlexibleHeader__container PricingShopifyBusinessFlexibleHeader__containerAlignment__center PricingShopifyBusinessFlexibleHeaderGridAlignment__center">
                      <div className="PricingShopifyBusinessFlexibleHeader__title">
                        <h3
                          className="PricingShopifyBusinessText PricingShopifyBusinessText--text PricingShopifyBusinessText--centered PricingShopifyBusinessTurnOffColorTransition"
                          style={{ color: "black" }}
                        >
                          <p>
                            Maximize your sales and save time with our Shopify
                            integration
                          </p>
                        </h3>
                      </div>
                      <div className="PricingShopifyBusinessFlexibleHeader__content">
                        <div
                          className="PricingShopifyBusinessText PricingShopifyBusinessText--text PricingShopifyBusinessText--centered PricingShopifyBusinessTurnOffColorTransition"
                          style={{ color: "black" }}
                        >
                          <p>
                            Sign up now and see how our Shopify integration can
                            help your business grow – say goodbye to tedious
                            manual tasks and hello to more time and more sales!
                          </p>
                        </div>
                      </div>
                      <div className="BlogContentWrapperHeaderCtas PricingShopifyBusinessFlexibleHeaderGridAlignment__center">
                        <div className="PricingShopifyBusinessGridParent">
                          <div className="PricingShopifyBusinessGridItem PricingShopifyBusinessGridItem--span-8 PricingShopifyBusinessGridItem--start-m-2 PricingShopifyBusinessGridItem--span-m-10 PricingShopifyBusinessGridItem--start-l-6 PricingShopifyBusinessGridItem--span-l-14">
                            <div className="PricingShopifyBusinessButtonCollection">
                              <div className="PricingShopifyBusinessButtonCollection__button-wrapper">
                                <div className="trackingDiv">
                                  <div
                                    className=" PricingShopifyBusinessButton"
                                    style={{
                                      color: "#F7FDFC",
                                      backgroundColor: "black",
                                      boxShadow: "0 0 0 2px #F7FDFC",
                                    }}
                                    onClick={setWaitlist}
                                  >
                                    <span
                                      className="PricingShopifyBusinessText PricingShopifyBusinessText--cta PricingShopifyBusinessButtonText PricingShopifyBusinessText--bold"
                                      style={{ color: "currentColor" }}
                                    >
                                      Join The Waitlist
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          data-test-id="PricingShopifyBusinessEditorialTwoColumnFeatured__itemContainer_second"
          className="PricingShopifyBusinessEditorialTwoColumnFeatured__itemContainer"
          style={{ backgroundColor: "black" }}
        >
          <div className="PricingShopifyBusinessEditorialTwoColumnFeatured__itemSubContainer PricingShopifyBusinessEditorialTwoColumnFeatured__itemContainer--imageWithCaption">
            <div
              data-test-id="PricingShopifyBusinessEditorialTwoColumnFeatured__secondItem"
              className="PricingShopifyBusinessEditorialTwoColumnFeatured__secondItem"
            >
              <div className="PricingShopifyBusinessImageWithCaption">
                <div className="PricingShopifyBusinessImageWithCaption__image">
                  <img
                    alt="Stacked pink cans of Wildfish Cannery smoked salmon. A hand holds salmon and a cucumber slice on a cracker. An open can of smoked salmon. Salmon and caviar pieces on a table. Plate with roasted potatoes. White man wears a red t-shirt with a fish drawing."
                    width="100%"
                    src={image?.src}
                    srcSet={image?.srcSet}
                    sizes={image?.sizes}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {waitList && (
        <Suspense>
          <JoinTheWaitlist dismiss={setWaitlist} />
        </Suspense>
      )}
    </>
  );
};
