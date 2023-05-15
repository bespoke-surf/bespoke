import type { LinksFunction } from "@remix-run/node";
import { CdnType } from "../../../../graphql/__generated__/graphql";
import { getImageSrcAndSrcSet } from "../../../../utils/getCloudinarySrcAndSrcSet";
import css from "./index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: css }];
};
const item = [
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670236387/Frame_19_5_skwven.png",
];

export default function Inspiration() {
  return (
    <>
      <TopText />
      <BigImage />
    </>
  );
}

const TopText = () => {
  return (
    <div id="optimize" className="zI7 iyn Hsu">
      <div
        className="InspirationTopTextBusinessFlexibleHeader InspirationTopTextBusinessFlexibleHeader__h2"
        data-test-id="InspirationTopTextBusinessFlexibleHeader InspirationTopTextBusinessFlexibleHeader__h2"
      >
        <div className="InspirationTopTextBusinessGridParent">
          <div className="InspirationTopTextBusinessFlexibleHeaderGrid InspirationTopTextBusinessFlexibleHeaderGrid__center">
            <div className="InspirationTopTextBusinessFlexibleHeader__container InspirationTopTextBusinessFlexibleHeader__containerAlignment__center InspirationTopTextBusinessFlexibleHeaderGridAlignment__center">
              <div className="InspirationTopTextBusinessFlexibleHeader__title">
                <h2
                  className="InspirationTopTextBusinessText InspirationTopTextBusinessText--text InspirationTopTextBusinessText--centered InspirationTopTextBusinessTurnOffColorTransition"
                  style={{ color: "inherit" }}
                >
                  Design Your Signup Forms
                </h2>
              </div>
              <div className="InspirationTopTextBusinessFlexibleHeader__content">
                <div
                  className="InspirationTopTextBusinessText InspirationTopTextBusinessText--text InspirationTopTextBusinessText--centered InspirationTopTextBusinessTurnOffColorTransition"
                  style={{ color: "inherit" }}
                >
                  <p>
                    Choose from our selection of customizable templates and make
                    them your own with our easy-to-use customization tools.
                    Perfect for businesses of all sizes looking for a
                    professional and effective signup form.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const image = getImageSrcAndSrcSet(item[0], false, CdnType.Cloudinary);

const BigImage = () => {
  return (
    <div className="InspirationImageBusinessEditorialSingleImageAndCaption">
      <div className="InspirationImageBusinessEditorialSingleImageAndCaption__FullColumn">
        <div className="InspirationImageBusinessEditorialSingleImageAndCaption__FullColumnImage">
          <img
            alt="Three photos depicting arrangements of yellow flowers and green foliage"
            src={image?.src}
            srcSet={image?.srcSet}
            sizes={image?.sizes}
            width="100%"
          />
        </div>
        <div className="InspirationImageBusinessEditorialSingleImageAndCaption__FullColumnCaption">
          <span
            className="InspirationImageBusinessText InspirationImageBusinessText--t6"
            style={{ color: "rgb(43, 77, 48)" }}
          >
            <p> </p>
          </span>
        </div>
      </div>
    </div>
  );
};
