import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLocation } from "@remix-run/react";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  PageHeader,
  Text,
} from "gestalt";
import { sdk } from "~/graphql/graphqlWrapper.server";
import { getSubdomain, isPrivateRoute } from "~/utils/utils.server";
import BigContainer from "../../components/BigContainer";
import Naviagation from "../../components/Navigation/Navigation";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import type { IntegrationData } from "./types";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Integrations | ${rootData.store?.name}`,
    description:
      "Available integrations with leading ecommerce websites and others.",
  };
};

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const subdomain = getSubdomain(request);
  if (!subdomain) return redirect("/");

  const response = await Promise.all([
    sdk.GetIntegrationWithSubdomain(
      { subdomain },
      { request, forbiddenRedirect: "/" }
    ),
  ]);

  const integration = response[0];

  return json<IntegrationData>({
    integration: integration.getIntegrationWithSubdomain,
  });
}

export default function Integration() {
  const location = useLocation();
  return (
    <BigContainer>
      <Flex alignItems="start">
        <Naviagation />
        <Flex.Item flex="grow">
          <Container>
            {location.pathname.includes("/integrations/") ? null : (
              <>
                <PageHeader
                  borderStyle="none"
                  title="INTEGRATIONS"
                  subtext="Available integrations with leading ecommerce websites and others."
                  helperLink={{
                    accessibilityLabel: "Tell us other integration to create",
                    href: "https://bespoke.canny.io/integrations",
                    text: "Suggest integrations.",
                    onClick: () => undefined,
                  }}
                />
                <Flex justifyContent="center">
                  <Box width="91.5%" paddingY={6}>
                    <Flex direction="column" gap={8}>
                      <Flex direction="row" justifyContent="between">
                        <Flex gap={{ row: 2, column: 0 }} alignItems="center">
                          <Box width={50} height={50}>
                            <Image
                              color="transparent"
                              alt="shopify logo"
                              naturalHeight={400}
                              naturalWidth={400}
                              src="https://res.cloudinary.com/bespoke-cloudinary/image/upload/v1659631710/shopify_pqza7e.svg"
                            />
                          </Box>
                          <Flex direction="column">
                            <Heading size="400">Shopify</Heading>
                            <Text color="subtle">
                              Integrate and sync with Shopify products &
                              customers.
                            </Text>
                          </Flex>
                        </Flex>
                        <Box>
                          {/* <Button
                            text={
                              loaderData.integration?.shopify?.authenticated
                                ? "Edit"
                                : "Add"
                            }
                            color={
                              loaderData.integration?.shopify?.authenticated
                                ? "gray"
                                : "red"
                            }
                            role="link"
                            href="/integrations/shopify"
                          /> */}
                          <Button text="Coming Soon" color="white" />
                        </Box>
                      </Flex>
                      <Divider />
                    </Flex>
                  </Box>
                </Flex>
              </>
            )}
            <Outlet />
          </Container>
        </Flex.Item>
      </Flex>
    </BigContainer>
  );
}
