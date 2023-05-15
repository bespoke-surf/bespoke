import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useActionData } from "@remix-run/react";
import { withYup } from "@remix-validated-form/with-yup";
import { Box, Container, IconButton } from "gestalt";
import { validationError } from "remix-validated-form";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import SubscribeNow from "./Subscribe";
import SubscribeSuccess from "./SubscribeSuccess";
import { SubscribeActionEnum, SubscribeSchema } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Subscribe | ${rootData.store?.name}`,
    description: `Subscribe to ${rootData?.store?.name}`,
  };
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const action = formData.get("_action");

  if (action === SubscribeActionEnum.subscribe) {
    const validator = withYup(SubscribeSchema);
    const result = await validator.validate(formData);

    if (result.error) {
      return validationError(result.error);
    }

    const email = formData.get("email") as string;
    const storeId = formData.get("storeId") as string;
    const response = await sdk.SubscribeToStore(
      {
        email,
        storeId,
      },
      { request }
    );
    if (response.subscribeToStore === true) {
      return json({
        success: true,
      });
    }
  }

  return null;
}

export default function Subscribe() {
  const actionData = useActionData<{ success: boolean } | null | undefined>();
  return (
    <>
      <Box position="absolute" right top>
        <Link to="..">
          <IconButton
            icon="cancel"
            size="lg"
            iconColor="darkGray"
            accessibilityLabel="close"
          />
        </Link>
      </Box>

      <Container>
        <Box paddingX={2}>
          {!actionData || actionData.success === false ? (
            <SubscribeNow />
          ) : (
            <SubscribeSuccess />
          )}
        </Box>
      </Container>
    </>
  );
}
