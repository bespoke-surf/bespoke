import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Box, Flex, Image, Mask, Masonry, PageHeader, Text } from "gestalt";
import { useMemo } from "react";
import { ClientOnly } from "remix-utils";
import { getEnvVars } from "../../../env.server";
import type { ItemFragment } from "../../graphql/__generated__/graphql";
import { CdnType, ItemTypeEnum } from "../../graphql/__generated__/graphql";
import { sdk } from "../../graphql/graphqlWrapper.server";
import type { RootData } from "../../root";
import { GenericCatchBoundary } from "../../route-containers/GenericCatchBoundry";
import { GenericErrorBoundary } from "../../route-containers/GenericErrorBoundry";
import { getImageSrcAndSrcSet } from "../../utils/getCloudinarySrcAndSrcSet";
import { monthName } from "../../utils/months";
import { isPrivateRoute } from "../../utils/utils.server";
export {
  GenericCatchBoundary as CatchBoundary,
  GenericErrorBoundary as ErrorBoundary,
};

export const meta: MetaFunction = ({ parentsData }) => {
  const rootData = parentsData.root as RootData;

  return {
    title: `Subscription Rewards - Growth Path | ${rootData.store?.name}`,
    description:
      "Receive Subscription rewards every month after unlocking growth path",
  };
};

export async function loader({ request }: LoaderArgs) {
  if (getEnvVars().OPEN_SOURCE) {
    return redirect("/");
  }
  const isPrivate = await isPrivateRoute(request);
  if (isPrivate == false) {
    return redirect("/");
  }

  const pathCrate = await sdk.GetSubscriptionRewardItems({}, { request });
  return json(
    {
      pathCrate: pathCrate.getSubscriptionRewardItems,
    },
    {
      headers: {
        "cache-control": "private, max-age=60",
      },
    }
  );
}

export default function PathCrate() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <>
      <PageHeader
        borderStyle="none"
        title={`${monthName[
          new Date().getMonth()
        ]?.toUpperCase()} SUBSCRIPTION REWARDS`}
        subtext="Auto syched when subscription starts."
      />
      <Flex justifyContent="center">
        <Box width="92.5%" paddingY={6}>
          <ClientOnly>
            {() => (
              <Masonry
                renderItem={({ data }) => <Item data={data} />}
                items={loaderData.pathCrate}
                minCols={2}
                layout="flexible"
                gutterWidth={8}
              />
            )}
          </ClientOnly>
        </Box>
      </Flex>
    </>
  );
}

const Item = ({ data }: { data: ItemFragment }) => {
  const getImage = useMemo(
    () =>
      getImageSrcAndSrcSet(data.imageData[0]?.src, false, CdnType.Cloudinary),
    [data.imageData]
  );
  return (
    <>
      <Box borderStyle="sm" rounding={3}>
        <Mask rounding={3}>
          <Image
            alt={data.name}
            color="#f2f4f6"
            naturalHeight={data.imageData[0]?.height ?? 1}
            naturalWidth={data.imageData[0]?.width ?? 1}
            src={getImage?.src ?? ""}
            sizes={getImage?.sizes}
            srcSet={getImage?.srcSet}
          ></Image>
        </Mask>
      </Box>
      <Box paddingX={2} paddingY={1}>
        <Flex
          direction="column"
          justifyContent="start"
          alignItems="start"
          gap={1}
        >
          <Text weight="bold">
            {data.type === ItemTypeEnum.Credits ? "100 Credits" : data.name}
          </Text>
          <Text size="100">
            {data.type === ItemTypeEnum.Credits
              ? "Credits"
              : data.type === ItemTypeEnum.EmailTemplate
              ? "Email Template"
              : "Signup Form"}
          </Text>
        </Flex>
      </Box>
    </>
  );
};
