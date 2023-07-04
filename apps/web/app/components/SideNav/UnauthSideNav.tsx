import { useLocation, useRouteLoaderData } from "@remix-run/react";
import { Avatar, Flex, Link, SideNavigation, Text } from "gestalt";
import type { RootData } from "../../root";
import Footer from "../Footer/Footer";

export default function UnauthSideNav({
  closeMobileNav,
  showHeader = true,
}: {
  closeMobileNav?: () => void;
  showHeader?: boolean;
}) {
  const location = useLocation();
  const rootLoaderData = useRouteLoaderData("root") as RootData;
  return (
    <SideNavigation
      title="Menu"
      accessibilityLabel="menue"
      dismissButton={{
        onDismiss: () => closeMobileNav?.(),
        accessibilityLabel: "Close",
      }}
      header={
        showHeader ? (
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
        ) : undefined
      }
      footer={<Footer />}
    >
      <SideNavigation.TopItem
        href="/"
        active={location.pathname === "/" ? "page" : undefined}
        label="What is Bespoke?"
        onClick={closeMobileNav}
      />

      {rootLoaderData.ENV.OPEN_SOURCE === "true" ? null : (
        <SideNavigation.TopItem
          href="/pricing"
          active={location.pathname === "/pricing" ? "page" : undefined}
          label="Pricing"
          onClick={closeMobileNav}
        />
      )}

      <SideNavigation.Section label="App">
        <SideNavigation.TopItem
          active={location.pathname === "/signup" ? "page" : undefined}
          href="/signup"
          label="Sign Up"
          onClick={closeMobileNav}
        />
        <SideNavigation.TopItem
          active={location.pathname === "/login" ? "page" : undefined}
          href="/login"
          label="Login"
          onClick={closeMobileNav}
        />
      </SideNavigation.Section>

      <SideNavigation.Section label="External Links">
        {rootLoaderData.ENV.OPEN_SOURCE === "true" ? null : (
          <SideNavigation.TopItem
            href="https://github.com/bespoke-surf/bespoke"
            label="Self Host Guide | Github"
            onClick={closeMobileNav}
          />
        )}
        <SideNavigation.TopItem
          href="https://bespoke-api.readme.io/"
          label="API Reference"
          onClick={closeMobileNav}
        />

        <SideNavigation.TopItem
          href="https://feedback.bespoke.surf/changelog"
          label="See What's New"
          onClick={closeMobileNav}
        />

        {rootLoaderData.ENV.OPEN_SOURCE === "true" ? null : (
          <SideNavigation.Group label="Support">
            <SideNavigation.NestedItem
              href="https://discord.gg/h8gekTtq"
              label="Devs on Discord"
              onClick={closeMobileNav}
            />
            <SideNavigation.NestedItem
              href="https://twitter.com/bespoke_surf"
              label="Twitter"
              onClick={closeMobileNav}
            />
            <SideNavigation.NestedItem
              href="mailto:support@bespoke.surf"
              label="Email Us"
              onClick={closeMobileNav}
            />
          </SideNavigation.Group>
        )}
      </SideNavigation.Section>
    </SideNavigation>
  );
}
