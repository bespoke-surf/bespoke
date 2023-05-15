/* eslint-disable gestalt/prefer-box-inline-style */
import type { LinksFunction } from "@remix-run/node";
import { Image, Mask } from "gestalt";
import { useState } from "react";
import { CdnType } from "../../../../graphql/__generated__/graphql";
import { getImageSrcAndSrcSet } from "../../../../utils/getCloudinarySrcAndSrcSet";

import css from "./index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: css }];
};

const item = [
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670355430/Frame_25_rofk0f.png",
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670148619/Frame_9_2_ri4uu6.png",
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670149551/Frame_10_fcesih.png",
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670152663/Frame_11_3_utc17g.png",
];

const content = [
  "Our platform allows you to easily create professional-looking newsletters that will impress your audience.",
  "Our software makes it simple to create and customize marketing emails that will grab your customers' attention.",
  "Our platform can be easily integrated with your online store, so you can send targeted, personalized messages to your customers.",
  "Our services allow you to automate your marketing efforts, so you can save time and focus on other aspects of your business.",
];
const images = item.map((image) =>
  getImageSrcAndSrcSet(image, false, CdnType.Cloudinary)
);

export default function OurServicesDesktop() {
  const [active, setActive] = useState(0);

  const activeIMage = images[active];

  return (
    <div id="ad-formats" className="zI7 iyn Hsu">
      <div className="zI7 iyn Hsu">
        <div className="OurServiceDesktoBusinessHorizontalTabsWithPin OurServiceDesktoBusinessHorizontalTabsWithPin--desktop">
          <div className="OurServiceDesktoBusinessGridParent">
            <div className="OurServiceDesktoBusinessGridItem OurServiceDesktoBusinessGridItem--span-m-7 OurServiceDesktoBusinessGridItem--span-l-14 OurServiceDesktoBusinessHorizontalTabsWithPin__content-wrapper-left">
              <div className="OurServiceDesktoBusinessHorizontalTabsWithPin__content-left">
                <p
                  className="OurServiceDesktoBusinessText OurServiceDesktoBusinessText--t4 OurServiceDesktoBusinessHorizontalTabsWithPin__eyebrow OurServiceDesktoBusinessText--bold"
                  style={{ color: "inherit" }}
                >
                  What we offer
                </p>
                <h2
                  className="OurServiceDesktoBusinessText OurServiceDesktoBusinessText--h2 OurServiceDesktoBusinessHorizontalTabsWithPin__heading"
                  style={{ color: "inherit" }}
                >
                  Our services
                </h2>
                <div
                  className="OurServiceDesktoBusinessTabs OurServiceDesktoBusinessTabs--pill-buttons"
                  role="tablist"
                  style={{ color: "inherit" }}
                >
                  <button
                    className="OurServiceDesktoBusinessTabs__pill-button OurServiceDesktoBusinessTabs__pill-button--small OurServiceDesktoBusinessTabs__pill-button--selected"
                    id="horizontal-tabs-953-1"
                    role="tab"
                    aria-controls="horizontal-tabs-953-1-description-0 horizontal-tabs-953-1-pins-0"
                    aria-selected="true"
                    type="button"
                    tabIndex={0}
                    style={
                      active === 0
                        ? { backgroundColor: "#005c62", color: "white" }
                        : { backgroundColor: "rgba(255, 255, 255, 0.2)" }
                    }
                    onClick={() => setActive(0)}
                  >
                    <div tabIndex={-1}>
                      <span
                        className="OurServiceDesktoBusinessText OurServiceDesktoBusinessText--cta OurServiceDesktoBusinessTabs__button-text OurServiceDesktoBusinessText--bold"
                        style={{ color: "inherit" }}
                      >
                        Newsletter
                      </span>
                    </div>
                  </button>
                  <button
                    className="OurServiceDesktoBusinessTabs__pill-button OurServiceDesktoBusinessTabs__pill-button--small"
                    id="horizontal-tabs-953-2"
                    role="tab"
                    aria-controls="horizontal-tabs-953-2-description-1 horizontal-tabs-953-2-pins-1"
                    aria-selected="false"
                    type="button"
                    tabIndex={0}
                    style={
                      active === 1
                        ? { backgroundColor: "#005c62", color: "white" }
                        : { backgroundColor: "rgba(255, 255, 255, 0.2)" }
                    }
                    onClick={() => setActive(1)}
                  >
                    <div tabIndex={-1}>
                      <span
                        className="OurServiceDesktoBusinessText OurServiceDesktoBusinessText--cta OurServiceDesktoBusinessTabs__button-text OurServiceDesktoBusinessText--bold"
                        style={{ color: "inherit" }}
                      >
                        Marketing
                      </span>
                    </div>
                  </button>
                  <button
                    className="OurServiceDesktoBusinessTabs__pill-button OurServiceDesktoBusinessTabs__pill-button--small"
                    id="horizontal-tabs-953-3"
                    role="tab"
                    aria-controls="horizontal-tabs-953-3-description-2 horizontal-tabs-953-3-pins-2"
                    aria-selected="false"
                    type="button"
                    tabIndex={0}
                    style={
                      active === 2
                        ? { backgroundColor: "#005c62", color: "white" }
                        : { backgroundColor: "rgba(255, 255, 255, 0.2)" }
                    }
                    onClick={() => setActive(2)}
                  >
                    <div tabIndex={-1}>
                      <span
                        className="OurServiceDesktoBusinessText OurServiceDesktoBusinessText--cta OurServiceDesktoBusinessTabs__button-text OurServiceDesktoBusinessText--bold"
                        style={{ color: "inherit" }}
                      >
                        Integration
                      </span>
                    </div>
                  </button>
                  <button
                    className="OurServiceDesktoBusinessTabs__pill-button OurServiceDesktoBusinessTabs__pill-button--small"
                    id="horizontal-tabs-953-4"
                    role="tab"
                    aria-controls="horizontal-tabs-953-4-description-3 horizontal-tabs-953-4-pins-3"
                    aria-selected="false"
                    type="button"
                    tabIndex={0}
                    style={
                      active === 3
                        ? { backgroundColor: "#005c62", color: "white" }
                        : { backgroundColor: "rgba(255, 255, 255, 0.2)" }
                    }
                    onClick={() => setActive(3)}
                  >
                    <div tabIndex={-1}>
                      <span
                        className="OurServiceDesktoBusinessText OurServiceDesktoBusinessText--cta OurServiceDesktoBusinessTabs__button-text OurServiceDesktoBusinessText--bold"
                        style={{ color: "inherit" }}
                      >
                        Automation
                      </span>
                    </div>
                  </button>
                </div>
                <div
                  className="OurServiceDesktoBusinessTabs__content-region OurServiceDesktoBusinessHorizontalTabsWithPin__description-wrapper"
                  aria-live="polite"
                >
                  <div
                    aria-labelledby="horizontal-tabs-249-1"
                    aria-hidden="false"
                    className="OurServiceDesktoBusinessTabs__content--panel-0 OurServiceDesktoBusinessTabs__content OurServiceDesktoBusinessTabs__content--visible"
                    role="tabpanel"
                    style={{ color: "inherit" }}
                  >
                    <p
                      className="OurServiceDesktoBusinessText OurServiceDesktoBusinessText--h6"
                      style={{ color: "inherit" }}
                    >
                      {content[active]}
                    </p>
                  </div>
                </div>
                <div className="trackingDiv">
                  <a
                    className="OurServiceBusinessHorizontalTabsWithPin__cta OurServiceBusinessButton"
                    href="/signup"
                    style={{
                      color: "rgb(0, 92, 98)",
                      backgroundColor: "inherit",
                      boxShadow: "rgb(0, 92, 98) 0px 0px 0px 2px",
                    }}
                  >
                    <span
                      className="OurServiceBusinessText OurServiceBusinessText--cta OurServiceBusinessButtonText OurServiceBusinessText--bold"
                      style={{ color: "currentcolor" }}
                    >
                      Get Started
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="OurServiceDesktoBusinessGridItem OurServiceDesktoBusinessGridItem--start-m-8 OurServiceDesktoBusinessGridItem--span-m-6 OurServiceDesktoBusinessGridItem--start-l-17 OurServiceDesktoBusinessGridItem--span-l-8">
              <div
                className="OurServiceDesktoBusinessTabs__content-region OurServiceDesktoBusinessHorizontalTabsWithPin__pins-panel"
                aria-live="polite"
              >
                <div
                  aria-labelledby="horizontal-tabs-249-1"
                  aria-hidden="false"
                  className="OurServiceDesktoBusinessTabs__content--panel-0 OurServiceDesktoBusinessTabs__content OurServiceDesktoBusinessTabs__content--visible"
                  role="tabpanel"
                  style={{ color: "rgb(99, 31, 69)" }}
                >
                  <div
                    className="OurServiceDesktoBusinessTransitionHookWrapper"
                    style={{
                      transition:
                        "opacity 0.45s cubic-bezier(0.21, 0.01, 0.21, 0.96) 0s, transform cubic-bezier(0.21, 0.01, 0.21, 0.96)",
                      transform: "none",
                      opacity: 1,
                    }}
                  >
                    <div className="OurServiceDesktoBusinessHorizontalTabsWithPin__pin-grid--9-16 OurServiceDesktoBusinessPinGrid OurServiceDesktoBusinessPinGrid--left-align">
                      <div className="OurServiceDesktoBusinessGridParent">
                        <div className="OurServiceDesktoBusinessGridItem OurServiceDesktoBusinessGridItem--span-4 OurServiceDesktoBusinessGridItem--start-m-auto OurServiceDesktoBusinessGridItem--span-m-3 OurServiceDesktoBusinessGridItem--start-l-auto OurServiceDesktoBusinessGridItem--span-l-6">
                          <div className="OurServiceDesktoBusinessPinContainer OurServiceDesktoBusinessPinContainer--one-one">
                            <div
                              className="OurServiceDesktoBusinessColorPin "
                              style={{ backgroundColor: "rgb(255, 228, 193)" }}
                            />
                          </div>
                          <div className="OurServiceDesktoBusinessPinContainer OurServiceDesktoBusinessPinContainer--nine-sixteen">
                            <Mask height="100%">
                              <Image
                                naturalHeight={1134}
                                naturalWidth={750}
                                alt="our services"
                                color="transparent"
                                src={activeIMage?.src ?? ""}
                                srcSet={activeIMage?.srcSet}
                                sizes={activeIMage?.sizes}
                                fit="cover"
                                role="presentation"
                              />
                            </Mask>
                          </div>
                          <div className="OurServiceDesktoBusinessPinContainer OurServiceDesktoBusinessPinContainer--one-one">
                            <div
                              className="OurServiceDesktoBusinessColorPin "
                              style={{ backgroundColor: "rgb(255, 228, 193)" }}
                            />
                          </div>
                        </div>
                        <div className="OurServiceDesktoBusinessGridItem OurServiceDesktoBusinessGridItem--span-4 OurServiceDesktoBusinessGridItem--start-m-auto OurServiceDesktoBusinessGridItem--span-m-3 OurServiceDesktoBusinessGridItem--start-l-auto OurServiceDesktoBusinessGridItem--span-l-6">
                          <div className="OurServiceDesktoBusinessPinContainer OurServiceDesktoBusinessPinContainer--two-three">
                            <div
                              className="OurServiceDesktoBusinessColorPin "
                              style={{ backgroundColor: "rgb(255, 228, 193)" }}
                            />
                          </div>
                          <div className="OurServiceDesktoBusinessPinContainer OurServiceDesktoBusinessPinContainer--five-six">
                            <div
                              className="OurServiceDesktoBusinessColorPin "
                              style={{ backgroundColor: "rgb(255, 228, 193)" }}
                            />
                          </div>
                          <div className="OurServiceDesktoBusinessPinContainer OurServiceDesktoBusinessPinContainer--five-six">
                            <div
                              className="OurServiceDesktoBusinessColorPin "
                              style={{ backgroundColor: "rgb(255, 228, 193)" }}
                            />
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
  );
}
