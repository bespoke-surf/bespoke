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
          Welcome! You're on the path to creating captivating newsletters and
          marketing your way to profitability.
        </Text>
      </Box>
      <Box marginTop={8}>
        <Text inline>
          We're here to be your enthusiastic companion throughout every step of
          your exhilarating journey!
        </Text>
      </Box>
    </Flex>
  );
}
