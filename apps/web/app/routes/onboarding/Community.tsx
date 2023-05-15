import { useLoaderData } from "@remix-run/react";
import { Box, Flex, Heading, SlimBanner, Text } from "gestalt";
import { useMemo } from "react";
import { CommunityAutomations } from "../dashboard.index";
import type { OnboardingData } from "./types";

export default function Community() {
  const loaderData = useLoaderData<OnboardingData>();

  const community = useMemo(
    () =>
      loaderData?.workflows?.map((data) => (
        <CommunityAutomations
          //@ts-ignore
          data={data}
          key={data.id}
          disable
        />
      )),
    [loaderData?.workflows]
  );

  return (
    <Flex
      direction="column"
      gap={{
        row: 0,
        column: 8,
      }}
    >
      <Box marginBottom={-4}>
        <Flex flex="grow" direction="column" gap={{ row: 0, column: 2 }}>
          <Heading size="400" accessibilityLevel={2}>
            Community
          </Heading>
          <Text>
            Here are the resources that have been shared by the community to aid
            in our advancement.
          </Text>
        </Flex>
      </Box>
      <Flex direction="column" gap={4}>
        {community}
        <Box />
      </Flex>
      <SlimBanner
        iconAccessibilityLabel="info"
        message="Replicate is disabled for now. After establishing your profile head over to the community tab to replicate an automation."
        type="infoBare"
      />
    </Flex>
  );
}
