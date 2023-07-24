import { useLocation } from "@remix-run/react";
import { Avatar, Flex, Link, SideNavigation, Text } from "gestalt";

export default function UnauthSideNav({
  closeMobileNav,
  showHeader = true,
}: {
  closeMobileNav?: () => void;
  showHeader?: boolean;
}) {
  const location = useLocation();
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
    >
      <SideNavigation.TopItem
        href="/"
        active={location.pathname === "/" ? "page" : undefined}
        label="What is Bespoke?"
        onClick={closeMobileNav}
      />
    </SideNavigation>
  );
}
