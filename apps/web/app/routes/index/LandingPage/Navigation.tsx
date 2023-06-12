import { useLocation } from "@remix-run/react";
import { Avatar, Box, Flex, Link, SideNavigation, Sticky, Text } from "gestalt";
import Footer from "../../../components/Naviagtion/storeNav/Footer";

export const Navigation = () => {
  const location = useLocation();
  return (
    <Sticky top={0} zIndex={{ index: () => 0 }}>
      <Box display="none" mdDisplay="block" lgDisplay="block" height="100vh">
        <SideNavigation
          title="Menu"
          accessibilityLabel="Menu"
          header={
            <Flex justifyContent="between">
              <Link href={"/"}>
                <Flex alignItems="center" gap={2}>
                  <Avatar name="Bespoke" size="md" src="" />
                  <Text weight="bold" size="300">
                    Bespoke
                  </Text>
                </Flex>
              </Link>
            </Flex>
          }
          footer={<Footer />}
        >
          <SideNavigation.TopItem
            href="/"
            active={location.pathname === "/" ? "page" : undefined}
            label="What is Bespoke?"
          />
          <SideNavigation.TopItem
            href="/pricing"
            active={location.pathname === "/pricing" ? "page" : undefined}
            label="Free Plan | Pricing"
          />

          <SideNavigation.Section label="App">
            <SideNavigation.TopItem href="" label="Sign Up" />
            <SideNavigation.TopItem href="" label="Login" />
            <SideNavigation.TopItem href="" label="See What's New" />
            <SideNavigation.Group label="Support">
              <SideNavigation.NestedItem href="" label="Devs on Discord" />
              <SideNavigation.NestedItem href="" label="Twitter" />
              <SideNavigation.NestedItem href="" label="Email Us" />
            </SideNavigation.Group>
          </SideNavigation.Section>

          <SideNavigation.Section label="Guides & References">
            <SideNavigation.TopItem href="" label="Self Host Guide | Github" />
            <SideNavigation.TopItem href="" label="API Reference" />
          </SideNavigation.Section>
        </SideNavigation>
      </Box>
    </Sticky>
  );
};
