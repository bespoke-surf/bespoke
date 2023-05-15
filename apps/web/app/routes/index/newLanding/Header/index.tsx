/* eslint-disable gestalt/prefer-box-inline-style */
import type { LinksFunction } from "@remix-run/node";
import { Box } from "gestalt";
import { CdnType } from "../../../../graphql/__generated__/graphql";
import { getImageSrcAndSrcSet } from "../../../../utils/getCloudinarySrcAndSrcSet";
import css from "./index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: css }];
};
const item = [
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1669990876/Frame_1_7_z9pgf3.png",
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670149551/Frame_10_fcesih.png",
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1669991502/Frame_2_1_kgna5k.png",
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670232876/Frame_18_kvtrdt.png",
];

const images = item.map((image) =>
  getImageSrcAndSrcSet(image, false, CdnType.Cloudinary)
);

export default function Love() {
  return (
    <>
      <div className="BusinessHeroImageLeft">
        <div className="BusinessGridParent BusinessGridParent--nowrap BusinessGridParent--no-row-gap">
          <div className="BusinessGridItem BusinessGridItem--span-8 BusinessGridItem--start-m-6 BusinessGridItem--span-m-6 BusinessGridItem--start-l-11 BusinessGridItem--span-l-12">
            <div className="BusinessHeroHeading BusinessHeroHeading--centered-mobile">
              <h1
                className="BusinessText BusinessText--h1 BusinessHeroHeading__heading"
                style={{ color: "inherit" }}
              >
                <p>Bespoke: Newsletter, Marketing</p>
              </h1>
              <p
                className="BusinessText BusinessText--t2 BusinessHeroHeading__copy"
                style={{ color: "inherit" }}
              >
                We provides newsletters, marketing software, and automation
                services, with the option to integrate with online stores. Try
                it out for free!
              </p>
              <div className="trackingDiv">
                <a
                  className="OurServiceBusinessHorizontalTabsWithPin__cta OurServiceBusinessButton"
                  href="/signup"
                  style={{
                    color: "rgb(0, 92, 98)",
                    backgroundColor: "white",
                    boxShadow: "rgb(0, 92, 98) 0px 0px 0px 2px",
                  }}
                >
                  <span
                    className="OurServiceBusinessText OurServiceBusinessText--cta OurServiceBusinessButtonText OurServiceBusinessText--bold"
                    style={{ color: "currentColor" }}
                  >
                    Sign up - Free
                  </span>
                </a>
              </div>
            </div>
          </div>

          <BigImage />
        </div>
      </div>
      <Box mdDisplay="none" lgDisplay="none">
        <SmallImage />
      </Box>
    </>
  );
}

const BigImage = () => {
  return (
    <div className="BusinessGridItem BusinessGridItem--start-m-5 BusinessGridItem--span-l-8">
      <div
        className="BusinessTransitionHookWrapper"
        style={{
          transition:
            "opacity 0.45s cubic-bezier(0.21, 0.01, 0.21, 0.96) 0s, transform cubic-bezier(0.21, 0.01, 0.21, 0.96)",
          transform: "none",
          opacity: 1,
        }}
      >
        <Box
          display="none"
          smDisplay="none"
          mdDisplay="inlineBlock"
          lgDisplay="inlineBlock"
        >
          <div className="BusinessPinGrid">
            <div className="BusinessGridParent">
              <div className="BusinessGridItem BusinessGridItem--span-4 BusinessGridItem--start-m-10 BusinessGridItem--span-m-3 BusinessGridItem--start-l-19 BusinessGridItem--span-l-6">
                <div className="BusinessPinContainer BusinessPinContainer--two-three">
                  <div
                    className="XiG zI7 iyn Hsu"
                    style={{ backgroundColor: "transparent", height: "100%" }}
                  >
                    <img
                      alt="A Black woman dressed in white peeks over shoulder"
                      className="hCL kVc L4E MIw N7A XiG"
                      src={images[0]?.src}
                      srcSet={images[0]?.srcSet}
                      sizes={images[0]?.sizes}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
                <div className="BusinessPinContainer BusinessPinContainer--two-three">
                  <div
                    className="XiG zI7 iyn Hsu"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.2)",
                      height: "100%",
                    }}
                  >
                    <img
                      alt="A Black woman dressed in white peeks over shoulder"
                      className="hCL kVc L4E MIw N7A XiG"
                      src={images[1]?.src}
                      srcSet={images[1]?.srcSet}
                      sizes={images[1]?.sizes}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
              <div className="BusinessGridItem BusinessGridItem--span-4 BusinessGridItem--start-m-7 BusinessGridItem--span-m-3 BusinessGridItem--start-l-13 BusinessGridItem--span-l-6">
                <div className="BusinessPinContainer BusinessPinContainer--two-three">
                  <div
                    className="XiG zI7 iyn Hsu"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.2)",
                      height: "100%",
                    }}
                  >
                    <img
                      alt="A Black woman dressed in white peeks over shoulder"
                      className="hCL kVc L4E MIw N7A XiG"
                      src={images[2]?.src}
                      srcSet={images[2]?.srcSet}
                      sizes={images[2]?.sizes}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
                <div className="BusinessPinContainer BusinessPinContainer--two-three">
                  <div
                    className="XiG zI7 iyn Hsu"
                    style={{ backgroundColor: "#004e60", height: "100%" }}
                  >
                    <img
                      alt="A Black woman dressed in white peeks over shoulder"
                      className="hCL kVc L4E MIw N7A XiG"
                      src={images[3]?.src}
                      srcSet={images[3]?.srcSet}
                      sizes={images[3]?.sizes}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

const SmallImage = () => {
  return (
    <div className="BusinessMobilePinBoard BusinessMobilePinBoard--2 BusinessMobilePinBoard--entered">
      <div className="BusinessPinContainer BusinessPinContainer--two-three BusinessMobilePinBoard__pin BusinessMobilePinBoard__pin--hero">
        <div
          className="XiG zI7 iyn Hsu"
          style={{ backgroundColor: "transparent", height: "100%" }}
        >
          <img
            alt="A white stiletto heel leans on a cinder block"
            className="hCL kVc L4E MIw N7A XiG"
            src={images[0]?.src}
            srcSet={images[0]?.srcSet}
            sizes={images[0]?.sizes}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="BusinessPinContainer BusinessPinContainer--two-three BusinessMobilePinBoard__pin">
        <div
          className="XiG zI7 iyn Hsu"
          style={{ backgroundColor: "transparent", height: "100%" }}
        >
          <img
            alt="A white stiletto heel leans on a cinder block"
            className="hCL kVc L4E MIw N7A XiG"
            src={images[1]?.src}
            srcSet={images[1]?.srcSet}
            sizes={images[1]?.sizes}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};
