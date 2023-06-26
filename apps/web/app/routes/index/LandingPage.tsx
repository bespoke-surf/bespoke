import { Callout, Flex, Upsell } from "gestalt";
import UnautheticatedPageLayout from "../../components/UnauthenticatedPageLayout";
import ComparisonTable from "./LandingPage/ComparisonTable";

const common = [
  "Design Email",
  "Segmentation (coming soon)",
  "Campaign (coming soon)",
  "A/B Testing & Dashboard Analytics",
  "9 Templates & 2 Forms",
  // "Periodic Reports",
  "Newsletter",
  "Sign-up Form",
  "Subscription Rewards Every Month",
  "Ticket & Chat Support",
  "Automation",
  "Dedicated IPs (coming soon)",
  // "Benchmarks",
];

export default function LandingPage() {
  return (
    <UnautheticatedPageLayout
      pageHeaderPorps={{
        title: "Open Source Email, Automation & Newsletter",
        subtext:
          "Combining best parts of Mailchimp, Klaviyo's automation, Substack's newsletter & eventually Typeform for surveys",
      }}
    >
      <Flex direction="column" gap={12}>
        <Callout
          title="Self-Host or Fully Managed"
          message="Self-host Bespoke or sign up to use Bespoke Cloud."
          iconAccessibilityLabel="recommendation"
          type="recommendation"
          primaryAction={{
            label: "Sign Up",
            accessibilityLabel: "Sign Up",
            href: "/signup",
          }}
          secondaryAction={{
            label: "Github",
            accessibilityLabel: "Github",
            href: "https://github.com/bespoke-surf/bespoke",
          }}
        />
        <ComparisonTable />
        <Upsell
          message="Get started with Bespoke Cloud. See full feature breakdown under pricing."
          title="Pricing"
          primaryAction={{
            label: "Pricing",
            accessibilityLabel: "Pricing",
            href: "/pricing",
          }}
          secondaryAction={{
            label: "Get started",
            accessibilityLabel: "sign up",
            href: "/signup",
          }}
        />

        {/* <Flex gap={4} direction="column">
          <Flex direction="column" gap={2}>
            <Heading accessibilityLevel="none" size="400">
              Feature Summary
            </Heading>
            <Text size="200" inline>
              See full feature breakdown under{" "}
              <Link
                underline="always"
                href="/pricing#full-feature-breakdown"
                display="inlineBlock"
              >
                <Text underline size="200">
                  pricing
                </Text>
              </Link>
            </Text>
          </Flex>
          <List
            labelDisplay="hidden"
            label="See full feature breakdown under pricing"
            type="unordered"
          >
            {common.map((value) => (
              <List.Item text={value} key={value} />
            ))}
          </List>
        </Flex> */}
      </Flex>
    </UnautheticatedPageLayout>
  );
}
