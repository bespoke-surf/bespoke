import { Box, Callout, Flex, Heading, Text } from "gestalt";
import UnauthPageLayot from "../../components/PageLayout/UnauthPageLayout";
import ComparisonTable from "./LandingPage/ComparisonTable";

export default function LandingPage() {
  return (
    <UnauthPageLayot
      pageHeaderPorps={{
        title: "",
        subtext: "",
      }}
    >
      <Box marginBottom={8} marginTop={-12}>
        <Callout
          title="Now deprecated! This site will shut down in few days."
          type="warning"
          message="Bespoke has seized maintenance. You can self host the open source version."
          iconAccessibilityLabel="warning"
          secondaryAction={{
            label: "Guide",
            accessibilityLabel: "Guide",
            href: "https://github.com/bespoke-surf/bespoke#deploying-bespoke",
          }}
        />
        <Box marginTop={8} />
        <Heading size="500">The open source Mailchimp alternative</Heading>
        <Box marginTop={2}>
          <Text>
            Combining best parts of Mailchimp, Klaviyo's automation, Substack's
            newsletter & Typeform for surveys
          </Text>
        </Box>
      </Box>
      <Flex direction="column" gap={12}>
        <ComparisonTable />
      </Flex>
    </UnauthPageLayot>
  );
}
