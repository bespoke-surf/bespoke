import { Box, Flex, Heading, Image, Link, Mask, Text } from "gestalt";

export default function Resources() {
  return (
    <Box marginTop={6}>
      <Flex justifyContent="between" alignItems="center">
        <Flex direction="column" gap={1}>
          <Heading size="500">Resources</Heading>
          <Text color="subtle">Find new ways to meet your business goals</Text>
        </Flex>
      </Flex>
      <Box marginTop={4} />
      <Flex gap={{ row: 2, column: 2 }} wrap>
        <Mask height={151} rounding={4} width={242}>
          <Image
            alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
            color="rgb(231, 186, 176)"
            naturalHeight={751}
            naturalWidth={564}
            fit="cover"
            src="https://i.ibb.co/7bQQYkX/stock2.jpg"
          >
            <Box height="100%" padding={3}>
              <Flex
                direction="column"
                height="100%"
                justifyContent="between"
                alignItems="center"
              >
                <Text color="light" weight="bold" align="center" size="400">
                  Add Subscribers via API's
                </Text>
                <Link
                  externalLinkIcon={{ color: "light", size: "400" }}
                  href="https://bespoke-api.readme.io/reference/addsubscribertolist"
                  target="blank"
                  display="inlineBlock"
                  underline="none"
                >
                  <Text weight="bold" inline color="light" size="400">
                    API Reference
                  </Text>
                </Link>
              </Flex>
            </Box>
          </Image>
        </Mask>
        <Mask height={151} rounding={4} width={242}>
          <Image
            alt="Tropic greens: The taste of Petrol and Porcelain | Interior design, Vintage Sets and Unique Pieces agave"
            color="rgb(231, 186, 176)"
            naturalHeight={751}
            naturalWidth={564}
            fit="cover"
            src="https://i.ibb.co/d0pQsJz/stock3.jpg"
          >
            <Box height="100%" padding={3}>
              <Flex
                direction="column"
                height="100%"
                justifyContent="between"
                alignItems="center"
              >
                <Text color="light" weight="bold" align="center" size="400">
                  How Suppression works in Bespoke
                </Text>
                <Link
                  externalLinkIcon={{ color: "light", size: "400" }}
                  href="https://bespoke-api.readme.io/reference/supression-hit-tier"
                  target="blank"
                  display="inlineBlock"
                  underline="none"
                >
                  <Text weight="bold" inline color="light" size="400">
                    Learn More
                  </Text>
                </Link>
              </Flex>
            </Box>
          </Image>
        </Mask>
      </Flex>
    </Box>
  );
}
