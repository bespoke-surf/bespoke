import type { MetaFunction } from "@remix-run/node";
import { Outlet, useRouteLoaderData } from "@remix-run/react";
import { Box, Button, Container, Dropdown, Flex, PageHeader } from "gestalt";
import type { RootData } from "~/root";
import BigContainer from "../../components/BigContainer";
import Naviagation from "../../components/Navigation/Navigation";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { links } from "./links";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
  links,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  const title = `About | ${rootData.store?.name}`;
  const description = rootData.store?.about?.about
    ? rootData.store.about.about
    : "";

  return {
    title,
    description,
    "og:title": title,
    "og:description": description,
    "twitter:title": title,
    "twitter:description": description,
  };
};

export default function About() {
  const rootLoader = useRouteLoaderData("root") as RootData;

  return (
    <BigContainer>
      <Flex alignItems="start">
        <Naviagation />
        <Flex.Item flex="grow">
          <Container>
            <PageHeader
              borderStyle="none"
              title={`ABOUT ${rootLoader?.store?.name?.toUpperCase()}`}
              subtext={`${rootLoader?.store?.about?.about}` ?? ""}
              primaryAction={
                rootLoader?.isUserSubdomain
                  ? {
                      component: (
                        <Button
                          color="red"
                          size="lg"
                          text="Edit About Page"
                          role="link"
                          href="/about/edit"
                          // onClick={() => formik.handleSubmit()}
                          // disabled={loading}
                        />
                      ),
                      dropdownItems: [
                        <Dropdown.Link
                          // onSelect={handleOnSelect}
                          key="add-prodcut"
                          option={{
                            label: "Edit About Page",
                            value: "update",
                          }}
                          href="/about/edit"
                        />,
                      ],
                    }
                  : undefined
              }
            />
            <Flex justifyContent="center" flex="grow">
              <Box width="93.5%" paddingY={6}>
                <Outlet />
              </Box>
            </Flex>
          </Container>
        </Flex.Item>
      </Flex>
    </BigContainer>
  );
}
