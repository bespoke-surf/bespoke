import clayStyles from "@clayui/css/lib/css/atlas.css";
import type { LinksFunction } from "@remix-run/node";
import {
  Box,
  Button,
  Container,
  Dropdown,
  Flex,
  PageHeader,
  Text,
  Upsell,
} from "gestalt";
import BigContainer from "../../components/BigContainer";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { Navigation } from "../index/LandingPage/Navigation";
import { AdditionalFeatures } from "./AdditionalFeatures";
import { AdvancedPlan } from "./AdvancedPlan";
import { BasicPlan } from "./BasicPlan";
import { FreePlan } from "./FreePlan";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: clayStyles }];
};

export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export default function Pricing() {
  return (
    <BigContainer>
      <Flex alignItems="start">
        <Navigation />
        <Flex.Item flex="grow">
          <Container>
            <PageHeader
              title="Pricing"
              subtext="Try out our free plan. Store upto 2,000 contacts & 6,000 emails/mo"
              primaryAction={{
                component: (
                  <Button
                    text="Get started"
                    href="/signup"
                    size="lg"
                    color="red"
                  />
                ),
                dropdownItems: [
                  <Dropdown.Link
                    href="/signup"
                    option={{ label: "Get started", value: "signup" }}
                    key="signup"
                  />,
                ],
              }}
            />
            <Flex justifyContent="center">
              <Box width="92.5%" paddingY={6}>
                <FreePlan />
                <Box marginTop={12} />
                <BasicPlan />
                <Box marginTop={12} />
                <AdvancedPlan />
                <Box marginTop={12} />

                <Flex gap={2} direction="column">
                  <Text size="400" align="center">
                    FULL FEATURE BREAKDOWN
                  </Text>
                  <Text size="600" align="center" weight="bold">
                    Choose exactly what you need.
                  </Text>
                  <Text align="center">
                    Compare the features and benefits of each plan
                  </Text>
                </Flex>
                <Box marginTop={12} />
                <AdditionalFeatures heading="Compare feature by plan:" />
                <Box marginTop={12} />
                <Upsell
                  message="Join the discrod server and talk to devs or dive directly to the app with our free plan."
                  title="Talk to Us"
                  primaryAction={{
                    accessibilityLabel: "Discord",
                    label: "Discord",
                  }}
                  secondaryAction={{
                    accessibilityLabel: "Get Started",
                    label: "Get Started",
                  }}
                />
              </Box>
            </Flex>
          </Container>
        </Flex.Item>
      </Flex>
    </BigContainer>
  );
}
