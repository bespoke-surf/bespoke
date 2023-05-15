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
/*
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670150869/Frame_12_saxf2k.png",
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670150866/Frame_13_jocczp.png",

  "Our dedicated team provides 24/7 customer support, so you can get help whenever you need it.",
  "Try our platform for free with no obligation and see how it can benefit your business.",


*/
export default function VisualFirst() {
  return <New />;
}

const images = item.map((image) =>
  getImageSrcAndSrcSet(image, false, CdnType.Cloudinary)
);

const New = () => {
  const [active, setActive] = useState(0);

  const activeIMage = images[active];

  return (
    <div id="ad-formats" className="zI7 iyn Hsu">
      <div className="zI7 iyn Hsu">
        <div className="OurServiceBusinessHorizontalTabsWithPin OurServiceBusinessHorizontalTabsWithPin--mobile">
          <div className="OurServiceBusinessGridParent">
            <div className="OurServiceBusinessGridItem OurServiceBusinessGridItem--span-8 OurServiceBusinessGridItem--start-m-2 OurServiceBusinessGridItem--span-m-10 OurServiceBusinessGridItem--start-l-3 OurServiceBusinessGridItem--span-l-20">
              <p
                className="OurServiceBusinessText OurServiceBusinessText--t4 OurServiceBusinessHorizontalTabsWithPin__eyebrow OurServiceBusinessText--bold"
                style={{ color: "rgb(0, 92, 98)" }}
              >
                What we offer
              </p>
              <h2
                className="OurServiceBusinessText OurServiceBusinessText--h2 OurServiceBusinessHorizontalTabsWithPin__heading"
                style={{ color: "rgb(0, 92, 98)" }}
              >
                Our services
              </h2>
            </div>
          </div>
          <div
            className="OurServiceBusinessTabs OurServiceBusinessTabs--scrollable OurServiceBusinessTabs--pill-buttons"
            role="tablist"
            style={{ color: "rgb(0, 92, 98)" }}
          >
            <div className="OurServiceBusinessTabs__scroller">
              <button
                className="OurServiceBusinessTabs__pill-button"
                id="horizontal-tabs-843-307"
                role="tab"
                aria-controls="horizontal-tabs-843-307-content"
                aria-selected="false"
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
                    className="OurServiceBusinessText OurServiceBusinessText--cta OurServiceBusinessTabs__button-text OurServiceBusinessText--bold"
                    style={{ color: "inherit" }}
                  >
                    Newsletter
                  </span>
                </div>
              </button>
              <button
                className="OurServiceBusinessTabs__pill-button"
                id="horizontal-tabs-843-308"
                role="tab"
                aria-controls="horizontal-tabs-843-308-content"
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
                    className="OurServiceBusinessText OurServiceBusinessText--cta OurServiceBusinessTabs__button-text OurServiceBusinessText--bold"
                    style={{ color: "inherit" }}
                  >
                    Marketing
                  </span>
                </div>
              </button>
              <button
                className="OurServiceBusinessTabs__pill-button"
                id="horizontal-tabs-843-309"
                role="tab"
                aria-controls="horizontal-tabs-843-309-content"
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
                    className="OurServiceBusinessText OurServiceBusinessText--cta OurServiceBusinessTabs__button-text OurServiceBusinessText--bold"
                    style={{ color: "inherit" }}
                  >
                    Integration
                  </span>
                </div>
              </button>
              <button
                className="OurServiceBusinessTabs__pill-button"
                id="horizontal-tabs-843-310"
                role="tab"
                aria-controls="horizontal-tabs-843-310-content"
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
                    className="OurServiceBusinessText OurServiceBusinessText--cta OurServiceBusinessTabs__button-text OurServiceBusinessText--bold"
                    style={{ color: "inherit" }}
                  >
                    Automation
                  </span>
                </div>
              </button>
              {/* <button
                className="OurServiceBusinessTabs__pill-button"
                id="horizontal-tabs-843-311"
                role="tab"
                aria-controls="horizontal-tabs-843-311-content"
                aria-selected="false"
                type="button"
                tabIndex={0}
                style={
                  active === 4
                    ? { backgroundColor: "#005c62", color: "white" }
                    : { backgroundColor: "rgba(255, 255, 255, 0.2)" }
                }
                onClick={() => setActive(4)}
              >
                <div tabIndex={-1}>
                  <span
                    className="OurServiceBusinessText OurServiceBusinessText--cta OurServiceBusinessTabs__button-text OurServiceBusinessText--bold"
                    style={{ color: "inherit" }}
                  >
                    Support
                  </span>
                </div>
              </button>
              <button
                className="OurServiceBusinessTabs__pill-button OurServiceBusinessTabs__pill-button--selected"
                id="horizontal-tabs-843-312"
                role="tab"
                aria-controls="horizontal-tabs-843-312-content"
                aria-selected="true"
                type="button"
                tabIndex={0}
                style={
                  active === 5
                    ? { backgroundColor: "#005c62", color: "white" }
                    : { backgroundColor: "rgba(255, 255, 255, 0.2)" }
                }
                onClick={() => setActive(5)}
              >
                <div tabIndex={-1}>
                  <span
                    className="OurServiceBusinessText OurServiceBusinessText--cta OurServiceBusinessTabs__button-text OurServiceBusinessText--bold"
                    style={{ color: "inherit" }}
                  >
                    Free
                  </span>
                </div>
              </button> */}
            </div>
          </div>
          <div className="OurServiceBusinessGridParent">
            <div className="OurServiceBusinessGridItem OurServiceBusinessGridItem--span-8 OurServiceBusinessGridItem--start-m-2 OurServiceBusinessGridItem--span-m-10 OurServiceBusinessGridItem--start-l-3 OurServiceBusinessGridItem--span-l-20">
              <div
                className="OurServiceBusinessTabs__content-region OurServiceBusinessHorizontalTabsWithPin__mobile-content"
                aria-live="polite"
              >
                <div
                  aria-labelledby="horizontal-tabs-843-312"
                  aria-hidden="false"
                  id="horizontal-tabs-843-312-content"
                  className="OurServiceBusinessTabs__content--panel-5 OurServiceBusinessTabs__content OurServiceBusinessTabs__content--visible"
                  role="tabpanel"
                  style={{ color: "rgb(99, 31, 69)" }}
                >
                  <div className="OurServiceBusinessPinContainer OurServiceBusinessPinContainer--primary OurServiceBusinessPinContainer--nine-sixteen">
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
                  <p
                    className="OurServiceBusinessText OurServiceBusinessText--t1 OurServiceBusinessHorizontalTabsWithPin__copy"
                    style={{ color: "rgb(0, 92, 98)" }}
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
        </div>
      </div>
    </div>
  );
};
