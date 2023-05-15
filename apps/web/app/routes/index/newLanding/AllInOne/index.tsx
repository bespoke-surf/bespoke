import type { LinksFunction } from "@remix-run/node";
import { CdnType } from "../../../../graphql/__generated__/graphql";
import { getImageSrcAndSrcSet } from "../../../../utils/getCloudinarySrcAndSrcSet";
import css from "./index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: css }];
};
/* eslint-disable gestalt/prefer-box-inline-style */
const item = [
  "https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670080796/Frame_6_2_ag1xf7.png",
];

export default function Solutions() {
  return <Genius />;
}

const image = getImageSrcAndSrcSet(item[0], false, CdnType.Cloudinary);

const TheImage = () => {
  return (
    <div className="SolutionBusinessGridItem SolutionBusinessGridItem--start-3 SolutionBusinessGridItem--span-4 SolutionBusinessGridItem--start-m-8 SolutionBusinessGridItem--span-m-5 SolutionBusinessGridItem--start-l-15 SolutionBusinessGridItem--span-l-8 SolutionBusinessGridItem--center-vertical SolutionBusinessGridItem--row-start-1 SolutionBusinessTextAndImage__container">
      <div className="SolutionBusinessTextAndImage__image">
        <div
          className="SolutionBusinessTransitionHookWrapper"
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
            }}
          >
            <img
              alt="Chart showing ad performance and impressions over time"
              className="hCL kVc L4E MIw"
              loading="lazy"
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

const Genius = () => {
  return (
    <>
      <div className="SolutionBusinessTextAndImage">
        <div className="SolutionBusinessGridParent">
          <TheImage />
        </div>
      </div>
      <div className="SolutionBusinessTextAndImage">
        <div className="SolutionBusinessGridParent">
          <div className="SolutionBusinessGridItem SolutionBusinessGridItem--start-1 SolutionBusinessGridItem--span-8 SolutionBusinessGridItem--start-m-2 SolutionBusinessGridItem--span-m-5 SolutionBusinessGridItem--start-l-1 SolutionBusinessGridItem--span-l-10 SolutionBusinessGridItem--row-start-m-1 SolutionBusinessTextAndImage__heading-container">
            <h2
              className="SolutionBusinessText SolutionBusinessText--h2 SolutionBusinessTextAndImage__heading"
              style={{ color: "inherit" }}
            >
              All-in-One Marketing Platform
            </h2>
          </div>
          <div className="SolutionBusinessGridItem SolutionBusinessGridItem--start-2 SolutionBusinessGridItem--span-6 SolutionBusinessGridItem--start-m-2 SolutionBusinessGridItem--span-m-5 SolutionBusinessGridItem--start-l-1 SolutionBusinessGridItem--span-l-10 SolutionBusinessGridItem--row-start-m-2 SolutionBusinessTextAndImage__subhead-container">
            <div className="SolutionBusinessSubheadingLockup">
              <p
                className="SolutionBusinessText SolutionBusinessText--t4 SolutionBusinessSubheadingLockup__copy"
                style={{ color: "inherit" }}
              >
                <b>
                  Newsletters
                  <br />
                </b>
                Grow your reach and build brand or product awareness.
                <br />
                <br />
                <b>
                  Marketing
                  <br />
                </b>
                Makes it simple to create and customize marketing emails.
                <br />
                <br />
                <b>
                  Integration
                  <br />
                </b>
                Easily integrates with your online store.
                <br />
                <br />
                <b>
                  Automation
                  <br />
                </b>
                Allow you to automate your marketing efforts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
