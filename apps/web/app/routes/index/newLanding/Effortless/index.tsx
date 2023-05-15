/* eslint-disable gestalt/prefer-box-inline-style */

import type { LinksFunction } from "@remix-run/node";
import { CdnType } from "../../../../graphql/__generated__/graphql";
import { getImageSrcAndSrcSet } from "../../../../utils/getCloudinarySrcAndSrcSet";
import css from "./index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: css }];
};
export default function SimpleFlexible() {
  return <New />;
}

const item = [
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670153602/Frame_15_3_tsooan.png",
];

const New = () => {
  return (
    <>
      <div id="ad-tools" className="zI7 iyn Hsu">
        <div className="EffortlessBusinessTextAndImage">
          <div className="EffortlessBusinessGridParent EffortlessBusinessGridParent--nowrap">
            <div className="EffortlessBusinessGridItem EffortlessBusinessGridItem--start-1 EffortlessBusinessGridItem--span-8 EffortlessBusinessGridItem--start-m-8 EffortlessBusinessGridItem--span-m-5 EffortlessBusinessGridItem--start-l-14 EffortlessBusinessGridItem--span-l-10 EffortlessBusinessGridItem--row-start-m-1 EffortlessBusinessTextAndImage__heading-container">
              <h2
                className="EffortlessBusinessText EffortlessBusinessText--h2 EffortlessBusinessTextAndImage__heading"
                style={{ color: "rgb(0, 92, 98)" }}
              >
                Effortless tools
              </h2>
            </div>

            <ImityImage disable={false} removePadding={false} />
            <div className="EffortlessBusinessGridItem EffortlessBusinessGridItem--start-2 EffortlessBusinessGridItem--span-6 EffortlessBusinessGridItem--start-m-8 EffortlessBusinessGridItem--span-m-5 EffortlessBusinessGridItem--start-l-14 EffortlessBusinessGridItem--span-l-10 EffortlessBusinessGridItem--row-start-m-2 EffortlessBusinessTextAndImage__subhead-container">
              <div className="EffortlessBusinessSubheadingLockup">
                <h3
                  className="EffortlessBusinessText EffortlessBusinessText--h5 EffortlessBusinessHeadingLockupWithSubheading__subheading"
                  style={{ color: "rgb(0, 92, 98)" }}
                >
                  Intuitive interface
                </h3>
                <p
                  className="EffortlessBusinessText EffortlessBusinessText--t4 EffortlessBusinessSubheadingLockup__copy"
                  style={{ color: "rgb(0, 92, 98)" }}
                >
                  Our platform is easy to navigate and use, even if you're a
                  first-time user.
                </p>
              </div>
              <div className="EffortlessBusinessSubheadingLockup">
                <h3
                  className="EffortlessBusinessText EffortlessBusinessText--h5 EffortlessBusinessHeadingLockupWithSubheading__subheading"
                  style={{ color: "rgb(0, 92, 98)" }}
                >
                  Quick and simple
                </h3>
                <p
                  className="EffortlessBusinessText EffortlessBusinessText--t4 EffortlessBusinessSubheadingLockup__copy"
                  style={{ color: "rgb(0, 92, 98)" }}
                >
                  You can create newsletters and marketing emails in just a few
                  minutes.
                </p>
              </div>
              <div className="EffortlessBusinessSubheadingLockup">
                <h3
                  className="EffortlessBusinessText EffortlessBusinessText--h5 EffortlessBusinessHeadingLockupWithSubheading__subheading"
                  style={{ color: "rgb(0, 92, 98)" }}
                >
                  Customizable templates
                </h3>
                <p
                  className="EffortlessBusinessText EffortlessBusinessText--t4 EffortlessBusinessSubheadingLockup__copy"
                  style={{ color: "rgb(0, 92, 98)" }}
                >
                  Our templates and design tools make it simple to customize
                  your messages and make them stand out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const image = getImageSrcAndSrcSet(item[0], false, CdnType.Cloudinary);

const ImityImage = ({
  disable,
  removePadding,
}: {
  disable: boolean;
  removePadding: boolean;
}) => {
  return (
    <div
      style={{ display: disable ? "none" : "block" }}
      className="EffortlessBusinessGridItem EffortlessBusinessGridItem--start-3 EffortlessBusinessGridItem--span-4 EffortlessBusinessGridItem--start-m-2 EffortlessBusinessGridItem--span-m-5 EffortlessBusinessGridItem--start-l-3 EffortlessBusinessGridItem--span-l-8 EffortlessBusinessGridItem--center-vertical EffortlessBusinessGridItem--row-start-1 EffortlessBusinessTextAndImage__container"
    >
      <div className="EffortlessBusinessTextAndImage__image">
        <div
          className="EffortlessBusinessTransitionHookWrapper"
          style={{
            transition:
              "opacity 450ms cubic-bezier(0.21, 0.01, 0.21, 0.96) 0s, transform cubic-bezier(0.21, 0.01, 0.21, 0.96)",
            transform: "none",
            opacity: 1,
          }}
        >
          <div
            className="XiG zI7 iyn Hsu"
            style={{
              backgroundColor: "transparent",
              paddingBottom: removePadding ? "0" : "222.26148409893992%",
            }}
          >
            <img
              alt="A Black woman wearing teal sandals"
              className="hCL kVc L4E MIw"
              loading="lazy"
              style={{ borderRadius: "20px" }}
              src={image?.src}
              srcSet={image?.srcSet}
              sizes={image?.sizes}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
