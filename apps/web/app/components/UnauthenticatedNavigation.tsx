import { useLocation, useRouteLoaderData } from "@remix-run/react";
import { Avatar, Box, Flex, Link, SideNavigation, Sticky, Text } from "gestalt";
import type { RootData } from "../root";
import Footer from "./Naviagtion/storeNav/Footer";

export const UnauthenticatedNavigation = () => {
  const location = useLocation();
  const rootLoaderData = useRouteLoaderData("root") as RootData;
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
                  <Avatar name="Bespoke" size="md" src="/bespoke-icon.png" />
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

          {rootLoaderData.OPEN_SOURCE ? null : (
            <SideNavigation.TopItem
              href="/pricing"
              active={location.pathname === "/pricing" ? "page" : undefined}
              label="Pricing"
            />
          )}

          <SideNavigation.Section label="App">
            <SideNavigation.TopItem
              active={location.pathname === "/signup" ? "page" : undefined}
              href="/signup"
              label="Sign Up"
            />
            <SideNavigation.TopItem
              active={location.pathname === "/login" ? "page" : undefined}
              href="/login"
              label="Login"
            />
          </SideNavigation.Section>

          <SideNavigation.Section label="External Links">
            {rootLoaderData.OPEN_SOURCE ? null : (
              <SideNavigation.TopItem
                href="https://github.com/bespoke-surf/bespoke"
                label="Self Host Guide | Github"
              />
            )}
            <SideNavigation.TopItem
              href="https://bespoke-api.readme.io/"
              label="API Reference"
            />

            <SideNavigation.TopItem
              href="https://feedback.bespoke.surf/changelog"
              label="See What's New"
            />

            {rootLoaderData.OPEN_SOURCE ? null : (
              <SideNavigation.Group label="Support">
                <SideNavigation.NestedItem
                  href="https://discord.gg/sXAkfWBM"
                  label="Devs on Discord"
                />
                <SideNavigation.NestedItem
                  href="https://twitter.com/bespoke_surf"
                  label="Twitter"
                />
                <SideNavigation.NestedItem
                  href="mailto:support@bespoke.surf"
                  label="Email Us"
                />
              </SideNavigation.Group>
            )}
          </SideNavigation.Section>
        </SideNavigation>
      </Box>
    </Sticky>
  );
};
