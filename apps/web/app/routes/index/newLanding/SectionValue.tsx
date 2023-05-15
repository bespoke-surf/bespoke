import { Box, Flex, Icon, Text } from "gestalt";

const HEADING1 = "Campaign on Customer Needs";
const SUBHEDING1 =
  "Campaign and workflow strategies yield better results when they are based on customer preferences and personalized content. For instance, promoting curled eyelashes to customers who prefer curled eyelashes would be a well-executed targeted campaign.";
const HEADING2 = "Quiz Customers for Insights";
const SUBHEDING2 =
  "Before running a campaign & strategizing workflows. Send quiz links to gain valuable insights into your customers' preferences. Then, you can tailor your emails accordingly to better meet their expectations.";

export default function SectionValue() {
  return (
    <Flex
      direction="row"
      justifyContent="between"
      wrap
      gap={{ column: 12, row: 0 }}
    >
      <Flex direction="column">
        <Box marginBottom={6}>
          <Icon
            icon="trending"
            accessibilityLabel="face happy"
            size={45}
            color="dark"
          />
        </Box>

        <Box
          lgDisplay="block"
          mdDisplay="block"
          smDisplay="none"
          display="none"
          marginBottom={4}
        >
          <Text size="500">{HEADING1}</Text>
        </Box>
        <Box
          lgDisplay="none"
          mdDisplay="none"
          smDisplay="block"
          display="block"
          marginBottom={4}
        >
          <Text size="400">{HEADING1}</Text>
        </Box>
        <Box
          maxWidth={350}
          lgDisplay="block"
          mdDisplay="block"
          smDisplay="none"
          display="none"
        >
          <Text size="400">{SUBHEDING1}</Text>
        </Box>
        <Box
          lgDisplay="none"
          mdDisplay="none"
          smDisplay="block"
          display="block"
        >
          <Text size="300">{SUBHEDING1}</Text>
        </Box>
      </Flex>
      <Flex direction="column">
        <Box marginBottom={6}>
          <Icon
            icon="insights-audience"
            accessibilityLabel="clock"
            size={45}
            color="dark"
          />
        </Box>

        <Box
          lgDisplay="block"
          mdDisplay="block"
          smDisplay="none"
          display="none"
          marginBottom={4}
        >
          <Text size="500">{HEADING2}</Text>
        </Box>
        <Box
          lgDisplay="none"
          mdDisplay="none"
          smDisplay="block"
          display="block"
          marginBottom={4}
        >
          <Text size="400">{HEADING2}</Text>
        </Box>

        <Box
          maxWidth={350}
          lgDisplay="block"
          mdDisplay="block"
          smDisplay="none"
          display="none"
        >
          <Text size="400">{SUBHEDING2}</Text>
        </Box>
        <Box
          lgDisplay="none"
          mdDisplay="none"
          smDisplay="block"
          display="block"
        >
          <Text size="300">{SUBHEDING2}</Text>
        </Box>
      </Flex>
    </Flex>
  );
}
