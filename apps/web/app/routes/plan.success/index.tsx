import {
  ActivationCard,
  Box,
  Container,
  Flex,
  IconButton,
  Layer,
} from "gestalt";
import BigContainer from "../../components/BigContainer";

import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "react-router";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { isPrivateRoute } from "../../utils/utils.server";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Activated!- Plan | ${rootData.store?.name}`,
    description: "You plan has been activated",
  };
};

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  return {};
}

export default function PlansSuccess() {
  return (
    <Layer>
      <Box
        color="default"
        position="fixed"
        top
        left
        right
        bottom
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          position="absolute"
          top={true}
          marginTop={1}
          marginStart={2}
          left={true}
        >
          <IconButton
            accessibilityLabel="close"
            icon="cancel"
            href="/plan"
            role="link"
            target="self"
          />
        </Box>

        <BigContainer>
          <Flex alignItems="start">
            <Flex.Item flex="grow">
              <Container>
                <Box
                  color="default"
                  padding={3}
                  display="flex"
                  alignItems="center"
                >
                  <Box marginStart={2}>
                    <ActivationCard
                      message="We are supercharged now! Let's get growing!"
                      status="complete"
                      statusMessage="Completed"
                      title="Activated!"
                    />
                  </Box>
                </Box>
              </Container>
            </Flex.Item>
          </Flex>
        </BigContainer>
      </Box>
    </Layer>
  );
}
