import type { LinksFunction } from "@remix-run/node";
import css from "./index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: css }];
};
export default function FreeTrial() {
  return <New />;
}

const New = () => {
  return (
    <div
      className="GetStartedBusinessFlexibleHeader GetStartedBusinessFlexibleHeader__h2"
      data-test-id="GetStartedBusinessFlexibleHeader GetStartedBusinessFlexibleHeader__h2"
    >
      <div className="GetStartedBusinessGridParent">
        <div className="GetStartedBusinessFlexibleHeaderGrid GetStartedBusinessFlexibleHeaderGrid__center">
          <div className="GetStartedBusinessFlexibleHeader__container GetStartedBusinessFlexibleHeader__containerAlignment__center GetStartedBusinessFlexibleHeaderGridAlignment__center">
            <div className="GetStartedBusinessFlexibleHeader__title">
              <h2
                className="GetStartedBusinessText GetStartedBusinessText--text GetStartedBusinessText--centered GetStartedBusinessTurnOffColorTransition"
                style={{ color: "inherit" }}
              >
                <p>Get started today</p>
              </h2>
            </div>
            <div className="BlogContentWrapperHeaderCtas GetStartedBusinessFlexibleHeaderGridAlignment__center">
              <div className="GetStartedBusinessGridParent">
                <div className="GetStartedBusinessGridItem GetStartedBusinessGridItem--span-8 GetStartedBusinessGridItem--start-m-2 GetStartedBusinessGridItem--span-m-10 GetStartedBusinessGridItem--start-l-6 GetStartedBusinessGridItem--span-l-14">
                  <div className="GetStartedBusinessButtonCollection">
                    <div className="GetStartedBusinessButtonCollection__button-wrapper">
                      <div className="trackingDiv">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          className=" GetStartedBusinessButton"
                          style={{
                            color: "#005c62",
                            backgroundColor: "white",
                            boxShadow: "#005c62 0px 0px 0px 2px",
                          }}
                          href="/signup"
                        >
                          <span
                            className="GetStartedBusinessText GetStartedBusinessText--cta GetStartedBusinessButtonText GetStartedBusinessText--bold"
                            style={{ color: "currentColor" }}
                          >
                            Sign up - Free
                          </span>
                        </a>
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
};
