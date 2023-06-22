import { Callout, Flex, Heading, List, Upsell } from "gestalt";
import UnautheticatedPageLayout from "../../components/UnauthenticatedPageLayout";
import ComparisonTable from "./LandingPage/ComparisonTable";

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
    <UnautheticatedPageLayout
      pageHeaderPorps={{
        title: "Open Source Email, Automation & Newsletter",
        subtext:
          "Combining best parts of Mailchimp, Klaviyo's automation, Substack's newsletter & eventually Typeform for surveys",
      }}
    >
      <Flex direction="column" gap={12}>
        <Callout
          title="Self Host or Sign Up!"
          message="Self host Bespoke today, follow instruction on Github or Sign up to use Bespoke"
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
          message="Get started with our free plan"
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
    </UnautheticatedPageLayout>
  );
}
