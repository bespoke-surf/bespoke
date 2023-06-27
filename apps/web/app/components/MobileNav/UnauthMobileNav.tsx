import { Link } from "@remix-run/react";
import { Avatar, Box, Flex, IconButton, Sticky, Text } from "gestalt";
import { useReducer } from "react";
import BigContainer from "../BigContainer";
import UnauthSideNav from "../SideNav/UnauthSideNav";

export default function UnauthMobileNav() {
  const [shouldShow, toggleShow] = useReducer((s) => !s, false);

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
                    <Avatar name="Bespoke" size="md" src="/bespoke-icon.png" />
                    <Text weight="bold" size="200">
                      Bespoke
                    </Text>
                  </Flex>
                </Link>
                <Box lgDisplay="none" mdDisplay="none" display="block">
                  <IconButton
                    iconColor="darkGray"
                    accessibilityLabel="menu"
                    icon="menu"
                    onClick={toggleShow}
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
              <UnauthSideNav showHeader={false} closeMobileNav={toggleShow} />
            </Box>
          )}
        </BigContainer>
      </Box>
    </Sticky>
  );
}
