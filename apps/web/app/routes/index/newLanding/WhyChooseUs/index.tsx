import type { LinksFunction } from "@remix-run/node";
import { Box, Icon } from "gestalt";
import css from "./index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: css }];
};

export default function PerfectAudience() {
  return <New />;
}

const New = () => {
  return (
    <div id="targeting" className="zI7 iyn Hsu">
      <div className="WhyChosseUsBusinessTwoColumnSection">
        <div className="WhyChosseUsBusinessHeadingLockup WhyChosseUsBusinessTwoColumnSection__headings">
          <h2
            className="WhyChosseUsBusinessText WhyChosseUsBusinessText--h2 WhyChosseUsBusinessHeadingLockup__heading WhyChosseUsBusinessText--centered"
            style={{ color: "rgb(0, 92, 98)" }}
          >
            Why choose us?
          </h2>
          <p
            className="WhyChosseUsBusinessText WhyChosseUsBusinessText--t3 WhyChosseUsBusinessHeadingLockup__subheading WhyChosseUsBusinessText--centered"
            style={{ color: "rgb(0, 92, 98)" }}
          >
            The Advantages of Using Our Platform
          </p>
        </div>
        <ul className="ColumnList">
          <li className="ColumnList__listItem" style={{ flexBasis: "50%" }}>
            <div className="WhyChosseUsBusinessTwoColumnSection__listItem">
              <div className="WhyChosseUsBusinessTextBlock WhyChosseUsBusinessTextBlock--centered-mobile">
                <Box marginBottom={6}>
                  <Icon
                    icon="face-happy"
                    accessibilityLabel="face happy"
                    size={55}
                    //@ts-ignore
                    color="#005c62"
                  />
                </Box>
                <h6
                  className="WhyChosseUsBusinessText WhyChosseUsBusinessText--t1 WhyChosseUsBusinessTextBlock__heading"
                  style={{ color: "rgb(0, 92, 98)" }}
                >
                  Easy to use
                </h6>
                <p
                  className="WhyChosseUsBusinessText WhyChosseUsBusinessText--t4 WhyChosseUsBusinessTextBlock__body"
                  style={{ color: "rgb(0, 92, 98)" }}
                >
                  Our platform is intuitive and easy to navigate, even for
                  first-time users.
                </p>
              </div>
            </div>
          </li>
          <li className="ColumnList__listItem" style={{ flexBasis: "50%" }}>
            <div className="WhyChosseUsBusinessTwoColumnSection__listItem">
              <div className="WhyChosseUsBusinessTextBlock WhyChosseUsBusinessTextBlock--centered-mobile">
                <Box marginBottom={6}>
                  <Icon
                    icon="clock"
                    accessibilityLabel="clock"
                    size={55}
                    //@ts-ignore
                    color="#005c62"
                  />
                </Box>

                <h6
                  className="WhyChosseUsBusinessText WhyChosseUsBusinessText--t1 WhyChosseUsBusinessTextBlock__heading"
                  style={{ color: "rgb(0, 92, 98)" }}
                >
                  Time-saving
                </h6>
                <p
                  className="WhyChosseUsBusinessText WhyChosseUsBusinessText--t4 WhyChosseUsBusinessTextBlock__body"
                  style={{ color: "rgb(0, 92, 98)" }}
                >
                  You can create newsletters and marketing emails in just a few
                  minutes, saving you time and effort.
                </p>
              </div>
            </div>
          </li>
          <li className="ColumnList__listItem" style={{ flexBasis: "50%" }}>
            <div className="WhyChosseUsBusinessTwoColumnSection__listItem">
              <div className="WhyChosseUsBusinessTextBlock WhyChosseUsBusinessTextBlock--centered-mobile">
                <Box marginBottom={6}>
                  <Icon
                    icon="person"
                    accessibilityLabel="clock"
                    size={55}
                    //@ts-ignore
                    color="#005c62"
                  />
                </Box>

                <h6
                  className="WhyChosseUsBusinessText WhyChosseUsBusinessText--t1 WhyChosseUsBusinessTextBlock__heading"
                  style={{ color: "rgb(0, 92, 98)" }}
                >
                  Personalized
                </h6>
                <p
                  className="WhyChosseUsBusinessText WhyChosseUsBusinessText--t4 WhyChosseUsBusinessTextBlock__body"
                  style={{ color: "rgb(0, 92, 98)" }}
                >
                  Our platform allows you to send targeted, personalized
                  messages to your customers based on their data.
                </p>
              </div>
            </div>
          </li>
          <li className="ColumnList__listItem" style={{ flexBasis: "50%" }}>
            <div className="WhyChosseUsBusinessTwoColumnSection__listItem">
              <div className="WhyChosseUsBusinessTextBlock WhyChosseUsBusinessTextBlock--centered-mobile">
                <Box marginBottom={6}>
                  <Icon
                    icon="cog"
                    accessibilityLabel="clock"
                    size={55}
                    //@ts-ignore
                    color="#005c62"
                  />
                </Box>

                <h6
                  className="WhyChosseUsBusinessText WhyChosseUsBusinessText--t1 WhyChosseUsBusinessTextBlock__heading"
                  style={{ color: "rgb(0, 92, 98)" }}
                >
                  Automated
                </h6>
                <p
                  className="WhyChosseUsBusinessText WhyChosseUsBusinessText--t4 WhyChosseUsBusinessTextBlock__body"
                  style={{ color: "rgb(0, 92, 98)" }}
                >
                  Our automation services allow you to streamline your marketing
                  efforts and save time.
                </p>
              </div>
            </div>
          </li>
          <li className="ColumnList__listItem" style={{ flexBasis: "50%" }}>
            <div className="WhyChosseUsBusinessTwoColumnSection__listItem">
              <div className="WhyChosseUsBusinessTextBlock WhyChosseUsBusinessTextBlock--centered-mobile">
                <Box marginBottom={6}>
                  <Icon
                    icon="info-circle"
                    accessibilityLabel="clock"
                    size={55}
                    //@ts-ignore
                    color="#005c62"
                  />
                </Box>

                <h6
                  className="WhyChosseUsBusinessText WhyChosseUsBusinessText--t1 WhyChosseUsBusinessTextBlock__heading"
                  style={{ color: "rgb(0, 92, 98)" }}
                >
                  Supportive
                </h6>
                <p
                  className="WhyChosseUsBusinessText WhyChosseUsBusinessText--t4 WhyChosseUsBusinessTextBlock__body"
                  style={{ color: "rgb(0, 92, 98)" }}
                >
                  Our team provides 24/7 customer support to help you whenever
                  you need it.
                </p>
              </div>
            </div>
          </li>
          <li className="ColumnList__listItem" style={{ flexBasis: "50%" }}>
            <div className="WhyChosseUsBusinessTwoColumnSection__listItem">
              <div className="WhyChosseUsBusinessTextBlock WhyChosseUsBusinessTextBlock--centered-mobile">
                <Box marginBottom={6}>
                  <Icon
                    icon="heart"
                    accessibilityLabel="clock"
                    size={55}
                    //@ts-ignore
                    color="#005c62"
                  />
                </Box>

                <h6
                  className="WhyChosseUsBusinessText WhyChosseUsBusinessText--t1 WhyChosseUsBusinessTextBlock__heading"
                  style={{ color: "rgb(0, 92, 98)" }}
                >
                  Free
                </h6>
                <p
                  className="WhyChosseUsBusinessText WhyChosseUsBusinessText--t4 WhyChosseUsBusinessTextBlock__body"
                  style={{ color: "rgb(0, 92, 98)" }}
                >
                  Try our platform for free with no obligation and see how it
                  can benefit your business.
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
