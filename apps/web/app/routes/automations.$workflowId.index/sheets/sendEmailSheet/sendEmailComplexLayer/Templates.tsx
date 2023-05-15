import { useLoaderData } from "@remix-run/react";
import {
  Box,
  Button,
  Callout,
  Container,
  Flex,
  IconButton,
  Image,
  Layer,
  Mask,
  Masonry,
  PageHeader,
  Text,
} from "gestalt";
import { useContext, useMemo } from "react";
import { ClientOnly } from "remix-utils";
import type {
  ItemEmailTemplateData,
  ItemFragment,
} from "../../../../../graphql/__generated__/graphql";
import { CdnType } from "../../../../../graphql/__generated__/graphql";
import { getImageSrcAndSrcSet } from "../../../../../utils/getCloudinarySrcAndSrcSet";
import type { AutomationWorkflowIndexData } from "../../../types";
import { TemplateDesignContext, TemplateZIndex } from "./utils";

export default function Templates({ close }: { close: () => void }) {
  const loaderData = useLoaderData<AutomationWorkflowIndexData>();

  return (
    <Layer zIndex={TemplateZIndex}>
      <Box color="light" position="fixed" top left right bottom>
        <Container>
          <Flex alignItems="stretch" justifyContent="end">
            <IconButton
              accessibilityLabel="Close"
              icon="cancel"
              onClick={close}
              iconColor="darkGray"
            />
          </Flex>

          <PageHeader
            borderStyle="none"
            title="Templates"
            subtext="Select an Email Template to load."
          />
          <Flex justifyContent="center">
            <Box width="92.5%" paddingY={6}>
              {loaderData.emailTemplates.length > 1 ? (
                <ClientOnly>
                  {() => (
                    <Masonry
                      renderItem={({ data }) => <Item data={data} />}
                      items={loaderData.emailTemplates}
                      minCols={1}
                    />
                  )}
                </ClientOnly>
              ) : (
                <Callout
                  iconAccessibilityLabel="warning"
                  message="Get templates by unloking Growth Path to claim rewards and receive Subscription reward items."
                  title="No templates available."
                  type="warning"
                  primaryAction={{
                    accessibilityLabel: "growth path rewards",
                    label: "Growth Path Rewards",
                    href: "/growth-path",
                  }}
                  secondaryAction={{
                    accessibilityLabel: "subscription Rewards",
                    label: "Subscription Rewards",
                    href: "/growth-path/subscription-rewards",
                  }}
                />
              )}
            </Box>
          </Flex>
        </Container>
      </Box>
    </Layer>
  );
}

const Item = ({ data }: { data: { item: ItemFragment } }) => {
  const templateContext = useContext(TemplateDesignContext);

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
            <Box height="100%" width="100%" padding={1}>
              <Flex
                justifyContent="end"
                direction="column"
                alignItems="end"
                height="100%"
              >
                <Button
                  text="Load"
                  color="red"
                  onClick={() =>
                    templateContext?.setTemplateDesign(
                      (data.item.data as ItemEmailTemplateData).design
                    )
                  }
                />
              </Flex>
            </Box>
          </Image>
        </Mask>
      </Box>
      <Box paddingX={2} paddingY={1}>
        <Text inline weight="bold">
          {data.item.name}
        </Text>
      </Box>
    </>
  );
};
