import { Box, Flex, Text } from "gestalt";

export default function Hello() {
  return (
    <Flex alignContent="center" direction="column">
      <Box>
        <Text weight="bold" size="600" inline>
          Hi there,{" "}
        </Text>
      </Box>
      <Box marginTop={4}>
        <Text>
          Let's begin our journey to assist others while also seeking support to
          empower humanity to become financially independent.
        </Text>
      </Box>
      <Box marginTop={8}>
        <Text color="subtle" inline>
          Quote of the day - "A rising tide lifts all boats"
        </Text>
      </Box>
    </Flex>
  );
}
