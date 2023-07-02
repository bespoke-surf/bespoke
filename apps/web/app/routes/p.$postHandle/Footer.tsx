import { Box, Divider, Flex, Link, Text } from "gestalt";
import Footer from "../../components/Footer/Footer";

export default function PostFooter() {
  return (
    <>
      <Box marginTop={12}>
        <Divider />
      </Box>
      <Box paddingX={2} paddingY={4}>
        <Flex justifyContent="between" alignItems="baseline">
          <Footer />
          <Link href="/about">
            <Text color="subtle" size="100">
              ABOUT
            </Text>
          </Link>
        </Flex>
      </Box>
    </>
  );
}
