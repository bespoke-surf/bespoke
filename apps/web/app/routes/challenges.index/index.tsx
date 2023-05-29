import { Box, Flex, Icon, Text } from "gestalt";

import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  ChallengeTypeEnum,
  QuestType,
} from "../../graphql/__generated__/graphql";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import { Challenge } from "../challenges/Challenge";
import { SuccessChallenge } from "../challenges/SuccessChallenge";
import { endOfWeek } from "../challenges/endOfWeek";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `This Week Challenges - Dashboard | ${rootData.store?.name}`,
    description: "Your Challenges to complete for this week",
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
        questType: QuestType.Weekly,
      },
      {
        request,
      }
    ),
    sdk.GetCurrentStoreChallengeByQuestType(
      {
        questType: QuestType.Weekly,
        subdomain,
      },
      {
        request,
      }
    ),
  ]);

  const weekly = response[0].getMandatoryQuest;

  const storechallenges = response[1].getCurrentStoreChallengesByQuestType;

  return json(
    {
      weeklyQuest: weekly,
      storeChallenges: storechallenges,
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
      {loaderData.weeklyQuest?.challenges
        .filter(
          ({ challengeType }) => challengeType === ChallengeTypeEnum.Challenge
        )
        .map((data) => (
          <Challenge
            type="week"
            data={data}
            key={data.id}
            storeChallenge={loaderData.storeChallenges?.find(
              ({ challengeId }) => challengeId === data.id
            )}
          />
        ))}
      {loaderData.weeklyQuest?.challenges
        .filter(
          ({ challengeType }) => challengeType === ChallengeTypeEnum.Challenge
        )
        .map((data) => {
          const storeChallenge = loaderData.storeChallenges?.find(
            ({ challengeId }) => challengeId === data.id
          );
          if (!storeChallenge) return undefined;
          if (storeChallenge.allCompleted) return undefined;
          return (
            <SuccessChallenge
              data={data}
              key={data.id}
              storeChallenge={storeChallenge}
            />
          );
        })}

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
            size={24}
            color="shopping"
            accessibilityLabel="clock"
          />
          <Box>
            <Text inline weight="bold" color="shopping">
              This Week reports due in{" "}
            </Text>
            <Text inline weight="bold" color="dark">
              {endOfWeek(true, false)}
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
}
