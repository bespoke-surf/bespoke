import clayStyles from "@clayui/css/lib/css/atlas.css";
import type { LinksFunction } from "@remix-run/node";
import {
  Box,
  Container,
  Flex,
  PageHeader,
  SegmentedControl,
  Text,
  Upsell,
} from "gestalt";
import { useState } from "react";
import BigContainer from "../../components/BigContainer";
import { UnauthenticatedNavigation } from "../../components/UnauthenticatedNavigation";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { AdditionalFeatures } from "./AdditionalFeatures";
import { AdvancedPlan } from "./AdvancedPlan";
import { BasicPlan } from "./BasicPlan";
import { FreePlan, FreePlanHosted } from "./FreePlan";
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: clayStyles }];
};

export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export default function Pricing() {
  const [type, setType] = useState<"hosted" | "cloud">("cloud");
  return (
    <BigContainer>
      <Flex alignItems="start">
        <UnauthenticatedNavigation />
        <Flex.Item flex="grow">
          <Container>
            <PageHeader
              title={
                type === "cloud"
                  ? "We host Bespoke for you. Fully Managed!"
                  : "Host on your own servers. Free Forever!"
              }
            />
            <Flex justifyContent="center">
              <Box width="92.5%" paddingY={6}>
                {/* {type === "cloud" ? (
                  <>
                    <Text align="center" size="500" weight="bold">
                      We host Bespoke For you. Generous Free Plan!
                    </Text>
                    <Box marginTop={8} />
                  </>
                ) : (
                  <>
                    <Text align="center" size="500" weight="bold">
                      Host on your own servers. Free Forever!
                    </Text>
                    <Box marginTop={8} />
                  </>
                )} */}
                <SegmentedControl
                  onChange={({ activeIndex }) => {
                    if (activeIndex === 0) {
                      setType("hosted");
                    } else {
                      setType("cloud");
                    }
                  }}
                  items={["Self-Hosted", "Cloud"]}
                  selectedItemIndex={type === "hosted" ? 0 : 1}
                  responsive
                />
                <Box marginTop={12} />
                {type === "cloud" ? (
                  <>
                    <FreePlan />
                    <Box marginTop={12} />
                    <BasicPlan />
                    <Box marginTop={12} />
                    <AdvancedPlan />
                    <Box marginTop={12} />
                  </>
                ) : (
                  <>
                    <FreePlanHosted />
                    <Box marginTop={12} />
                  </>
                )}

                <Flex gap={2} direction="column">
                  <Box id="full-feature-breakdown">
                    <Text size="400" align="center">
                      FULL FEATURE BREAKDOWN
                    </Text>
                  </Box>
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
                    href: "https://discord.com/invite/sXAkfWBM",
                  }}
                  secondaryAction={{
                    accessibilityLabel: "Get Started",
                    label: "Get Started",
                    href: "/signup",
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
