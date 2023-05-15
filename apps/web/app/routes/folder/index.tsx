import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link as RLink, Outlet, useLoaderData } from "@remix-run/react";
import {
  Box,
  Button,
  Callout,
  Container,
  Flex,
  Icon,
  Image,
  Link,
  Mask,
  Masonry,
  PageHeader,
  Text,
  Tooltip,
} from "gestalt";
import { useMemo } from "react";
import { ClientOnly } from "remix-utils";
import BigContainer from "../../components/BigContainer";
import Naviagation from "../../components/Navigation";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { ItemFragment } from "../../graphql/__generated__/graphql";
import { CdnType, ItemTypeEnum } from "../../graphql/__generated__/graphql";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getImageSrcAndSrcSet } from "../../utils/getCloudinarySrcAndSrcSet";
import { getSubdomain, isPrivateRoute } from "../../utils/utils.server";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Folder | ${rootData.store?.name}`,
    description:
      "Claimed and received Rewards and Items bought from the Shop show up here.",
  };
};

export async function loader({ request }: LoaderArgs) {
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const subdomain = getSubdomain(request);
  if (!subdomain) return redirect("/");

  const claimedRewards = await sdk.GetFolderItems({ subdomain }, { request });

  return json(
    {
      folderItems: claimedRewards.getFolderItems,
    },
    {
      headers: {
        "cache-control": "private, max-age=10",
      },
    }
  );
}

export default function SignupForms() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <>
      <BigContainer>
        <Flex alignItems="start">
          <Naviagation />
          <Flex.Item flex="grow">
            <Container>
              <PageHeader
                borderStyle="none"
                title="Folder"
                subtext="Claimed and received Rewards show up here."
              />

              <Flex justifyContent="center">
                <Box width="92.5%" paddingY={6}>
                  {loaderData.folderItems.length > 1 ? (
                    <ClientOnly>
                      {() => (
                        <Masonry
                          renderItem={({ data }) => <Item data={data} />}
                          items={loaderData.folderItems}
                          minCols={1}
                        />
                      )}
                    </ClientOnly>
                  ) : (
                    <Callout
                      iconAccessibilityLabel=""
                      message="Unlock Growth Path to claim rewards and receive Subscription reward items."
                      title="Your folder is empty."
                      type="warning"
                      primaryAction={{
                        accessibilityLabel: "growth path rewards",
                        label: "Growth Path Rewards",
                        href: "/growth-path",
                      }}
                      secondaryAction={{
                        accessibilityLabel: "Subscription Rewards",
                        label: "Subscription Rewards",
                        href: "/growth-path/subscription-rewards",
                      }}
                    />
                  )}
                </Box>
              </Flex>
            </Container>
          </Flex.Item>
        </Flex>
      </BigContainer>
      <Outlet />
    </>
  );
}

const Item = ({ data }: { data: { item: ItemFragment } }) => {
  const getImage = useMemo(
    () =>
      getImageSrcAndSrcSet(
        data.item.imageData[0]?.src,
        false,
        CdnType.Cloudinary
      ),
    [data.item.imageData]
  );
  return (
    <>
      <Box borderStyle="sm" rounding={3}>
        <Mask rounding={3}>
          <Image
            alt={data.item.name}
            color="#f2f4f6"
            naturalHeight={data.item.imageData[0]?.height ?? 1}
            naturalWidth={data.item.imageData[0]?.width ?? 1}
            src={getImage?.src ?? ""}
            sizes={getImage?.sizes}
            srcSet={getImage?.srcSet}
          >
            <Box
              height="100%"
              width="100%"
              padding={1}
              display={
                data.item.type === ItemTypeEnum.SignupForm ? "block" : "none"
              }
            >
              <Flex
                justifyContent="end"
                direction="column"
                alignItems="end"
                height="100%"
              >
                <RLink to={`${data.item.id}/add-form`} prefetch="intent">
                  <Button text="Add" color="red" />
                </RLink>
              </Flex>
            </Box>
          </Image>
        </Mask>
      </Box>
      <Box paddingX={2} paddingY={1}>
        <Flex
          direction="column"
          justifyContent="start"
          alignItems="start"
          gap={1}
        >
          <Box>
            <Text inline weight="bold">
              {data.item.name}
            </Text>
          </Box>
          <Flex gap={1} alignItems="center">
            <Text size="100">
              {data.item.type === ItemTypeEnum.EmailTemplate
                ? "Email Template"
                : "Signup Form"}
            </Text>
            {data.item.type === ItemTypeEnum.EmailTemplate && (
              <Tooltip
                text="Select the Email (complex) Action in your Automation, and load templates tapping the Template button."
                link={
                  <Link
                    href="/automations"
                    display="inlineBlock"
                    underline="always"
                  >
                    <Text color="light" size="100" underline>
                      Take me to Automations
                    </Text>
                  </Link>
                }
              >
                <Icon inline accessibilityLabel="info" icon="info-circle" />
              </Tooltip>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
