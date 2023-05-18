import { ActivationCard, Box, IconButton, Layer } from "gestalt";

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
    title: `Cancelled - Growth Path | ${rootData.store?.name}`,
    description: "Your growth path has been cancelled",
  };
};

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  return {};
}

export default function PlansCancelled() {
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
        alignItems="center"
        justifyContent="center"
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
            href="/growth-path"
            role="link"
            target="self"
          />
        </Box>

        <Box color="default" padding={3} display="flex" alignItems="center">
          <Box marginStart={2}>
            <ActivationCard
              message="Your subscription has been cancelled."
              status="needsAttention"
              statusMessage="cancelled"
              title="Subscription cancelled!"
            />
          </Box>
        </Box>
      </Box>
    </Layer>
  );
}
