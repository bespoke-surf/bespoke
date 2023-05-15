import { Box, Flex, Heading, Icon, Text } from "gestalt";

import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { sdk } from "../../graphql/graphqlWrapper.server";
import {
  ChallengeTypeEnum,
  QuestType,
} from "../../graphql/__generated__/graphql";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import { Challenge } from "../challenges/Challenge";
import { endOfDay } from "../challenges/endOfDay";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Daily Challenges - Dashboard | ${rootData.store?.name}`,
    description: "Your Challenges to complete",
  };
};

export async function loader({ request }: LoaderArgs) {
  const isprivate = await isPrivateRoute(request);
  if (isprivate == false) {
    return redirect("/");
  }

  const subdomain = getSubdomain(request);

  if (!subdomain) return redirect("/");

  const response = await Promise.all([
    sdk.GetMandatoryQuest(
      {
        questType: QuestType.Daily,
      },
      {
        request,
      }
    ),
    sdk.GetCurrentStoreChallengeByQuestType(
      {
        questType: QuestType.Daily,
        subdomain,
      },
      {
        request,
      }
    ),
  ]);

  const daily = response[0].getMandatoryQuest;
  const storechallenges = response[1].getCurrentStoreChallengesByQuestType;

  return json(
    {
      dailyQuest: daily,
      storechallenges: storechallenges,
    },
    {
      headers: {
        "cache-control": "private, max-age=60",
      },
    }
  );
}

export default function QuestIndex() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <>
      <Box marginTop={8}>
        <Heading size="400">DAILY</Heading>
      </Box>
      {loaderData.dailyQuest?.challenges
        .filter(
          ({ challengeType }) => challengeType === ChallengeTypeEnum.Challenge
        )
        .map((data) => (
          <Challenge
            type="day"
            data={data}
            key={data.id}
            storeChallenge={loaderData.storechallenges?.find(
              ({ challengeId }) => challengeId === data.id
            )}
          />
        ))}

      <Box
        marginTop={4}
        rounding={3}
        padding={6}
        paddingY={8}
        display="flex"
        justifyContent="center"
        color="elevationAccent"
      >
        <Flex direction="row" alignItems="center" gap={2}>
          <Icon
            icon="clock"
            size={22}
            color="shopping"
            accessibilityLabel="clock"
          />
          <Box>
            <Text inline weight="bold" color="shopping">
              Daily reports due in{" "}
            </Text>
            <Text inline weight="bold" color="dark">
              {endOfDay(true, false)}
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
