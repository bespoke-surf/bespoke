import { useRouteLoaderData } from "@remix-run/react";
import { Callout, Flex, Upsell } from "gestalt";
import UnauthPageLayot from "../../components/PageLayout/UnauthPageLayout";
import type { RootData } from "../../root";
import ComparisonTable from "./LandingPage/ComparisonTable";

export default function LandingPage() {
  const rootLoaderData = useRouteLoaderData("root") as RootData;
  return (
    <UnauthPageLayot
      pageHeaderPorps={{
        title: "Open Source Email, Automation & Newsletter",
        subtext:
          "Combining best parts of Mailchimp, Klaviyo's automation, Substack's newsletter & eventually Typeform for surveys",
      }}
    >
      <Flex direction="column" gap={12}>
        {rootLoaderData.OPEN_SOURCE ? null : (
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
        )}
        <ComparisonTable />
        {rootLoaderData.OPEN_SOURCE ? (
          <Upsell
            message="We welcome your PR's. Join and be part of the personalization frontier. Right here on Gihtub."
            title="Personalization Frontier"
            primaryAction={{
              label: "Github",
              accessibilityLabel: "Pricing",
              href: "https://github.com/bespoke-surf/bespoke",
              target: "blank",
            }}
          />
        ) : (
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
        )}
      </Flex>
    </UnauthPageLayot>
  );
}
