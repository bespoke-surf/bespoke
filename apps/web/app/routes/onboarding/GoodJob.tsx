import { Box, Flex, Heading, Text } from "gestalt";

export default function GoodJob() {
  return (
    <Flex alignContent="center" direction="column" height="80vh">
      <Heading align="start">Good Job!</Heading>
      <Box marginTop={4}>
        <Text>
          We are advancing progress. Let's establish our profile and strive for
          financial success for ourselves and others.
        </Text>
      </Box>
    </Flex>
  );
}
