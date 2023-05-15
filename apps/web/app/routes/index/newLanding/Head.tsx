import { Box, Flex } from "gestalt";
import { Suspense, lazy, useReducer } from "react";

const JoinTheWaitlist = lazy(
  () => import("../../../components/footer/JoinTheWaitlist")
);

export default function Head() {
  const [waitList, setWaitlist] = useReducer((s) => !s, false);
  return (
    <>
      <Flex direction="column">
        <h1
          className="BusinessText BusinessText--h1 BusinessHeroHeading__heading"
          style={{ color: "inherit" }}
        >
          <p>Introducing a revolutionary way to strategize emails</p>
        </h1>
        {/* <h1
          className="BusinessText BusinessText--h1 BusinessHeroHeading__heading"
          style={{ color: "inherit" }}
        >
          <p>Customer Prefrences and Personality</p>
        </h1> */}

        <Box marginTop={4} maxWidth={500}>
          <p
            className="BusinessText BusinessText--t2 BusinessHeroHeading__copy"
            style={{ color: "inherit" }}
          >
            {/* Learn more about your customer and their preferences by conducting a
            quiz. And tailor your campaings to their unique needs. Are You Ready
            to Get Started? */}
            Are you are using and paying for a tool to gather customer
            preferences through quizzes and surveys? And another tool to run
            campaigns and workflows? Are you ready to simplify your life?
          </p>
        </Box>
        <Box marginTop={3} />
        <div className="trackingDiv">
          <div
            className="OurServiceBusinessHorizontalTabsWithPin__cta OurServiceBusinessButton"
            // eslint-disable-next-line gestalt/prefer-box-inline-style
            style={{
              color: "black",
              backgroundColor: "white",
              boxShadow: "rgb(0, 0, 0) 0px 0px 0px 2px",
            }}
            onClick={setWaitlist}
          >
            <span
              className="OurServiceBusinessText OurServiceBusinessText--cta OurServiceBusinessButtonText OurServiceBusinessText--bold"
              style={{ color: "black" }}
            >
              Join The Waitlist
            </span>
          </div>
        </div>
      </Flex>
      {waitList && (
        <Suspense>
          <JoinTheWaitlist dismiss={setWaitlist} />
        </Suspense>
      )}
    </>
  );
}
