import { Box, Flex, Heading, Text } from "gestalt";

export default function Finish() {
  return (
    <Flex alignContent="center" direction="column" height="80vh">
      <Heading align="start">All Done!</Heading>
      <Box marginTop={4}>
        <Text>
          Let's create your account now, and begin a new chapter with us!
        </Text>
      </Box>
    </Flex>
  );
}
