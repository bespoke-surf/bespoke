import { useLoaderData } from "@remix-run/react";
import { Box, Flex, Heading, SlimBanner, Text } from "gestalt";
import { useMemo } from "react";
import { ChallengeTypeEnum } from "../../graphql/__generated__/graphql";
import { Challenge } from "../challenges/Challenge";
import type { OnboardingData } from "./types";

export default function Challenges() {
  const loaderData = useLoaderData<OnboardingData>();

  const challenges = useMemo(
    () =>
      loaderData.dailyQuest?.challenges
        .filter(
          ({ challengeType }) => challengeType === ChallengeTypeEnum.Challenge
        )
        .map((data) => (
          <Challenge
            type="day"
            data={data}
            key={data.id}
            storeChallenge={undefined}
          />
        )),
    [loaderData.dailyQuest?.challenges]
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
            Challenges
          </Heading>
          <Text>
            These are the challenges we encounter daily in our pursuit of
            progress and financial growth.
          </Text>
        </Flex>
      </Box>
      <Flex direction="column">
        {challenges}
        <Box />
      </Flex>
      <SlimBanner
        iconAccessibilityLabel="info"
        message="In the next page let's explore the solutions our community has to offer for the daily challenges we face."
        type="infoBare"
      />
    </Flex>
  );
}
