import { defer, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Box, Container, Flex, PageHeader } from "gestalt";
import { useMemo } from "react";

import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { ClientOnly } from "remix-utils";
import BigContainer from "../../components/BigContainer";
import Naviagation from "../../components/Navigation";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
import type { Pages } from "./Boxes";
import { Boxes } from "./Boxes";
import type { ToolsLoaderData } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Tools | ${rootData.store?.name}`,
    description: "Tools for growth and to increase revenue",
  };
};

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }
  const subdomain = getSubdomain(request);
  if (!subdomain) return redirect("/");

  const workflowCount = sdk.GetWorkflowCount({ subdomain }, { request });
  const submittedForm = sdk.GetTotalSubmittedForm({ subdomain }, { request });
  const formSubmitRate = sdk.GetTotalFormSubmitRate({ subdomain }, { request });
  const postCount = sdk.GetPostCount({ subdomain }, { request });
  const subscribers = sdk.GetSubscribersCount({ subdomain }, { request });
  const totalLost = sdk.GetListCount({ subdomain }, { request });

  return defer(
    {
      workflowCountPromise: workflowCount,
      submittedFormPromise: submittedForm,
      formSubmitRatePromise: formSubmitRate,
      postCountPromise: postCount,
      subscriberCountPromise: subscribers,
      listCountPromise: totalLost,
    } satisfies ToolsLoaderData,
    {
      headers: {
        "cache-control": "private, max-age=5",
      },
    }
  );
}

const pages: Pages[] = [
  {
    id: "WORKFLOW",
    title: "Automations",
    href: "/automations",
    icon: "clock",
    description: "",
  },
  {
    id: "FORM",
    title: "Signup Forms",
    href: "/signup-forms",
    icon: "drag-drop",
    description: "",
  },
  {
    id: "NEWSLETTER",
    title: "Newsletters",
    href: "/",
    icon: "gmail",
    description: "",
  },
  {
    id: "LISTS",
    icon: "terms",
    title: "Lists",
    href: "/subscriber-lists",
    description:
      "Each subscribers belong to a list. Create a list to add subscribers.",
  },
];

export default function Builds() {
  const boxes = useMemo(
    () => pages.map((data) => <Boxes data={data} key={data.title} />),
    []
  );
  return (
    <>
      <BigContainer>
        <Flex alignItems="start">
          <Naviagation />
          <Flex.Item flex="grow">
            <Container>
              <PageHeader
                borderStyle="none"
                title="TOOLS"
                subtext="Tools to increase growth and revenue."
              />
              <Flex justifyContent="center">
                <Box width="92.5%" paddingY={6}>
                  <Flex
                    direction="column"
                    gap={{ column: 4, row: 0 }}
                    wrap
                    justifyContent="center"
                  >
                    {boxes}
                  </Flex>
                </Box>
              </Flex>
            </Container>
          </Flex.Item>
        </Flex>
      </BigContainer>
      <ClientOnly>{() => <Outlet />}</ClientOnly>
    </>
  );
}
