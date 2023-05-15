import { Box, Flex, Text } from "gestalt";

const heading = "              Comparing Bespoke to other tools";
const subject1 =
  'The word "bespoke" itself means "made for a particular customer or user." Our approach is to help you understand your customers\' preferences and needs, and enable you to target your products or promotions to only those customers who align with their needs.';

const subject2 =
  "This provides a pleasant experience for the customer and gives you a clear expectation of what kind of products or promotions you should create or target next.";

export default function Subscription() {
  return (
    <>
      <Box lgDisplay="block" mdDisplay="block" smDisplay="none" display="none">
        <Flex
          direction="row"
          gap={{ row: 12, column: 0 }}
          justifyContent="between"
          alignItems="center"
        >
          <Box>
            <h2
              className="AnalyticsBusinessText AnalyticsBusinessText--h2 AnalyticsBusinessTextAndImage__heading"
              style={{
                color: "black",
                fontSize: "48px",
                textAlign: "start",
              }}
            >
              {heading}
            </h2>
          </Box>
          <Box maxWidth={500}>
            <Text size="400">{subject1}</Text>
            <br />
            <Text size="400">{subject2}</Text>
          </Box>
        </Flex>
      </Box>
      <Box lgDisplay="none" mdDisplay="none" smDisplay="block" display="block">
        <Box>
          <h2
            className="AnalyticsBusinessText AnalyticsBusinessText--h2 AnalyticsBusinessTextAndImage__heading"
            style={{
              color: "black",
              fontSize: "48px",
              textAlign: "start",
            }}
          >
            {heading}
          </h2>
        </Box>
        <Box>
          <Text size="400">{subject1}</Text>
          <br />
          <Text size="400">{subject2}</Text>
        </Box>
      </Box>
    </>
  );
}
