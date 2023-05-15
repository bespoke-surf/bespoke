import { Box, Flex, Link, Text } from "gestalt";

const heading1 = "Is Your Gross Revenue over $100k?";
const subheadin1 = (
  <Text>
    If your gross revenue is of $100K,{" "}
    <Link display="inline" href="https://buy.stripe.com/dR68Ap6eJ1tldcQ4gg">
      pre subscribe{" "}
    </Link>{" "}
    for $200 so you can support us before launch.
  </Text>
);
const heading2 = "Are You An Angel Investor?";
const subheadin2 = (
  <Text>
    We are rasing our angel round, here is our{" "}
    <Link
      display="inline"
      href="https://docs.google.com/presentation/d/1NhnWjP8q1X9HqDwdcE-Lo6kAm39FuT3VZzGje3MMkLk/edit?usp=sharing"
    >
      pitch deck
    </Link>
    . We are closing the round soon.
  </Text>
);

export default function SectionMore() {
  return (
    <Flex
      direction="row"
      justifyContent="between"
      wrap
      gap={{ column: 12, row: 0 }}
    >
      <Flex direction="column">
        <Box
          lgDisplay="block"
          mdDisplay="block"
          smDisplay="none"
          display="none"
          marginBottom={4}
        >
          <Text size="400">{heading1}</Text>
        </Box>
        <Box
          lgDisplay="none"
          mdDisplay="none"
          smDisplay="block"
          display="block"
          marginBottom={4}
        >
          <Text size="400">{heading1}</Text>
        </Box>
        <Box
          maxWidth={350}
          lgDisplay="block"
          mdDisplay="block"
          smDisplay="none"
          display="none"
        >
          <Text size="300">{subheadin1}</Text>
        </Box>
        <Box
          lgDisplay="none"
          mdDisplay="none"
          smDisplay="block"
          display="block"
        >
          <Text size="300">{subheadin1}</Text>
        </Box>
      </Flex>
      <Flex direction="column">
        <Box
          lgDisplay="block"
          mdDisplay="block"
          smDisplay="none"
          display="none"
          marginBottom={4}
        >
          <Text size="400">{heading2}</Text>
        </Box>
        <Box
          lgDisplay="none"
          mdDisplay="none"
          smDisplay="block"
          display="block"
          marginBottom={4}
        >
          <Text size="400">{heading2}</Text>
        </Box>

        <Box
          maxWidth={350}
          lgDisplay="block"
          mdDisplay="block"
          smDisplay="none"
          display="none"
        >
          <Text size="300">{subheadin2}</Text>
        </Box>
        <Box
          lgDisplay="none"
          mdDisplay="none"
          smDisplay="block"
          display="block"
        >
          <Text size="300">{subheadin2}</Text>
        </Box>
      </Flex>
    </Flex>
  );
}
