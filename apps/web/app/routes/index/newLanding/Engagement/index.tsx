/* eslint-disable gestalt/prefer-box-inline-style */

import type { LinksFunction } from "@remix-run/node";
import css from "./index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: css }];
};
export default function AdsWorkHarder() {
  return <DataToEngagement />;
}

const DataToEngagement = () => {
  return (
    <div className="HardWorkfBusinessFourPack">
      <div className="HardWorkfBusinessGridParent HardWorkfBusinessGridParent--no-row-gap">
        <div className="HardWorkfBusinessGridItem HardWorkfBusinessGridItem--span-8 HardWorkfBusinessGridItem--start-m-2 HardWorkfBusinessGridItem--span-m-10 HardWorkfBusinessGridItem--span-l-24 HardWorkfBusinessGridItem--center-horizontal HardWorkfBusinessFourPack__headings">
          <div className="HardWorkfBusinessHeadingLockup">
            <h2
              className="HardWorkfBusinessText HardWorkfBusinessText--h2 HardWorkfBusinessHeadingLockup__heading HardWorkfBusinessText--centered"
              style={{ color: "inherit" }}
            >
              From data to engagement
            </h2>
          </div>
        </div>
        <div className="HardWorkfBusinessGridItem HardWorkfBusinessGridItem--start-2 HardWorkfBusinessGridItem--span-6 HardWorkfBusinessGridItem--start-m-1 HardWorkfBusinessGridItem--span-m-6 HardWorkfBusinessGridItem--start-l-2 HardWorkfBusinessGridItem--span-l-9 HardWorkfBusinessGridItem--row-start-m-2 HardWorkfBusinessGridItem--row-start-l-2 HardWorkfBusinessFourPack__image-container HardWorkfBusinessFourPack__image-container--left">
          <div
            className="HardWorkfBusinessTransitionHookWrapper"
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
                paddingBottom: "12.641083521444695%",
              }}
            >
              <img
                alt="An icon of a light bulb"
                className="hCL kVc L4E MIw"
                src="https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670316754/Frame_23_y9c9es.png"
              />
            </div>
          </div>
        </div>
        <div className="HardWorkfBusinessGridItem HardWorkfBusinessGridItem--start-2 HardWorkfBusinessGridItem--span-6 HardWorkfBusinessGridItem--start-m-1 HardWorkfBusinessGridItem--span-m-6 HardWorkfBusinessGridItem--start-l-2 HardWorkfBusinessGridItem--span-l-9 HardWorkfBusinessGridItem--row-start-m-3 HardWorkfBusinessGridItem--row-start-l-3 HardWorkfBusinessFourPack__text-container HardWorkfBusinessFourPack__text-container--left">
          <span
            className="HardWorkfBusinessText HardWorkfBusinessText--t1 HardWorkfBusinessFourPack__heading HardWorkfBusinessText--centered"
            style={{ color: "inherit" }}
          >
            Data driven marketing
          </span>
          <p
            className="HardWorkfBusinessText HardWorkfBusinessText--t4 HardWorkfBusinessFourPack__body HardWorkfBusinessText--centered"
            style={{ color: "inherit" }}
          >
            We make it easy to organize and analyze large amounts of data.
          </p>
        </div>
        <div className="HardWorkfBusinessGridItem HardWorkfBusinessGridItem--start-2 HardWorkfBusinessGridItem--span-6 HardWorkfBusinessGridItem--start-m-7 HardWorkfBusinessGridItem--span-m-6 HardWorkfBusinessGridItem--start-l-15 HardWorkfBusinessGridItem--span-l-9 HardWorkfBusinessGridItem--row-start-m-2 HardWorkfBusinessGridItem--row-start-l-2 HardWorkfBusinessFourPack__image-container HardWorkfBusinessFourPack__image-container--right">
          <div
            className="HardWorkfBusinessTransitionHookWrapper"
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
                paddingBottom: "12.641083521444695%",
              }}
            >
              <img
                alt="An icon of a light bulb"
                className="hCL kVc L4E MIw"
                src="https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1670316999/Frame_24_bjcfle.png"
              />
            </div>
          </div>
        </div>
        <div className="HardWorkfBusinessGridItem HardWorkfBusinessGridItem--start-2 HardWorkfBusinessGridItem--span-6 HardWorkfBusinessGridItem--start-m-7 HardWorkfBusinessGridItem--span-m-6 HardWorkfBusinessGridItem--start-l-15 HardWorkfBusinessGridItem--span-l-9 HardWorkfBusinessGridItem--row-start-m-3 HardWorkfBusinessGridItem--row-start-l-3 HardWorkfBusinessFourPack__text-container HardWorkfBusinessFourPack__text-container--right">
          <span
            className="HardWorkfBusinessText HardWorkfBusinessText--t1 HardWorkfBusinessFourPack__heading HardWorkfBusinessText--centered"
            style={{ color: "inherit" }}
          >
            Retain and Grow
          </span>
          <p
            className="HardWorkfBusinessText HardWorkfBusinessText--t4 HardWorkfBusinessFourPack__body HardWorkfBusinessText--centered"
            style={{ color: "inherit" }}
          >
            We help to effectively engage and retain your customers.
          </p>
        </div>
      </div>
    </div>
  );
};
