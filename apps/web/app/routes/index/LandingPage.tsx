import {
  Box,
  Callout,
  Container,
  Flex,
  Heading,
  List,
  PageHeader,
  Upsell,
} from "gestalt";
import BigContainer from "../../components/BigContainer";
import ComparisonTable from "./LandingPage/ComparisonTable";
import { Navigation } from "./LandingPage/Navigation";

const common = [
  "Design Email",
  "Segmentation (coming soon)",
  "Campaign (coming soon)",
  "A/B Testing & Dashboard Analytics",
  "9 Templates & 2 Forms",
  "Periodic Reports",
  "Newsletter",
  "Sign-up Form",
  "Subscription Rewards Every Month",
  "Ticket & Chat Support",
  "Automation",
  "Dedicated IPs (coming soon)",
  "Benchmarks",
];

export default function LandingPage() {
  return (
    <BigContainer>
      <Flex alignItems="start">
        <Navigation />
        <Flex.Item flex="grow">
          <Container>
            <PageHeader
              title="Open Source Email, Automation & Newsletter"
              subtext="Combining best parts of Mailchimp, Klaviyo's automation, Substack's newsletter & eventually Typeform for surveys"
            />
            <Flex justifyContent="center">
              <Box width="92.5%" paddingY={6}>
                <Flex direction="column" gap={12}>
                  <Callout
                    title="Self Host or Sign Up!"
                    message="Self host Bespoke today, follow instruction on Github or Sign up to use Bespoke"
                    iconAccessibilityLabel="recommendation"
                    type="recommendation"
                    primaryAction={{
                      label: "Sign Up",
                      accessibilityLabel: "Sign Up",
                    }}
                    secondaryAction={{
                      label: "Github",
                      accessibilityLabel: "Github",
                    }}
                  />
                  <ComparisonTable />
                  <Upsell
                    message="Get started with our free plan"
                    title="Pricing"
                    primaryAction={{
                      label: "Pricing",
                      accessibilityLabel: "Pricing",
                    }}
                    secondaryAction={{
                      label: "Get started",
                      accessibilityLabel: "sign up",
                    }}
                  />

                  <Flex gap={4} direction="column">
                    <Heading accessibilityLevel="none" size="400">
                      Feature Summary
                    </Heading>
                    <List
                      labelDisplay="hidden"
                      label="Use the synchronous analytics endpoints if:"
                      type="unordered"
                    >
                      {common.map((value) => (
                        <List.Item text={value} key={value} />
                      ))}
                    </List>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Container>
        </Flex.Item>
      </Flex>
    </BigContainer>
  );
}
