import { Link, useRouteLoaderData } from "@remix-run/react";
import { Avatar, Box, Flex, IconButton, Sticky, Text } from "gestalt";
import { useMemo, useState } from "react";
import type { RootData } from "../root";
import { getCloudinaryAvatar } from "../utils/getCloudinaryFavicon";
import BigContainer from "./BigContainer";
import { StoreNav } from "./Naviagtion/StoreNav";

export default function MobileNavigation() {
  const rootData = useRouteLoaderData("root") as RootData;

  const [shouldShow, setShouldShow] = useState(false);

  const avatar = useMemo(
    () => getCloudinaryAvatar(rootData?.store?.displayPicture?.src),
    [rootData?.store?.displayPicture?.src]
  );

  return (
    <Sticky top={0}>
      <Box
        padding={2}
        borderStyle="raisedBottomShadow"
        color="default"
        display="block"
        smDisplay="block"
        mdDisplay="none"
        lgDisplay="none"
      >
        <BigContainer>
          <Flex
            alignItems="center"
            direction="row"
            justifyContent="between"
            gap={2}
          >
            <Flex.Item flex="grow">
              <Flex gap={2} alignItems="center" justifyContent="between">
                <Link to={"/"}>
                  <Flex alignItems="center" gap={2}>
                    <Avatar
                      name={rootData?.store?.name ?? ""}
                      size="md"
                      src={avatar?.src ?? undefined}
                    />
                    <Text weight="bold" size="200">
                      {rootData?.store?.name}
                    </Text>
                  </Flex>
                </Link>
                <Box lgDisplay="none" mdDisplay="none" display="block">
                  <IconButton
                    iconColor="darkGray"
                    accessibilityLabel="menu"
                    icon="menu"
                    onClick={() => setShouldShow((s) => !s)}
                  />
                </Box>
              </Flex>
            </Flex.Item>
          </Flex>
          {shouldShow && (
            <Box
              position="absolute"
              top
              bottom
              left
              right
              overflow="scrollY"
              display="block"
              mdDisplay="none"
              lgDisplay="none"
              height="100vh"
              color="default"
              zIndex={{ index: () => 999999 }}
            >
              <StoreNav closeMobileSideNav={() => setShouldShow(false)} />
            </Box>
          )}
        </BigContainer>
      </Box>
    </Sticky>
  );
}
