import { Box, Heading } from "gestalt";

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
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Milestone Challenges - Dashboard | ${rootData.store?.name}`,
    description: "Your Challenges to complete for the quarter",
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
        questType: QuestType.Milestone,
      },
      {
        request,
      }
    ),
    sdk.GetCurrentStoreChallengeByQuestType(
      {
        questType: QuestType.Milestone,
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
      milestones: daily,
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
        <Heading size="400">MILESTONE</Heading>
      </Box>
      {loaderData.milestones?.challenges
        .filter(
          ({ challengeType }) => challengeType === ChallengeTypeEnum.Challenge
        )
        .map((data) => (
          <Challenge
            data={data}
            key={data.id}
            storeChallenge={loaderData.storechallenges?.find(
              ({ challengeId }) => challengeId === data.id
            )}
          />
        ))}
    </>
  );
}
