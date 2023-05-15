import { useLocation, useRouteLoaderData } from "@remix-run/react";

import type { SideNavigationTopItemProps } from "gestalt";
import { SideNavigation } from "gestalt";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { RootData } from "~/root";
import { ContactLimitStatus } from "../../graphql/__generated__/graphql";
import Footer from "./storeNav/Footer";
import Header from "./storeNav/Header";

export const StoreNav = ({
  closeMobileSideNav,
}: {
  closeMobileSideNav?: () => void;
}) => {
  const location = useLocation();
  const rootLoaderData = useRouteLoaderData("root") as RootData;
  const [close, setClose] = useState(false);

  useEffect(() => {
    if (location && close) {
      closeMobileSideNav?.();
    }
  }, [location, close, closeMobileSideNav]);

  const dashboardCounter: SideNavigationTopItemProps["counter"] =
    useMemo(() => {
      let count = 0;
      if (
        rootLoaderData?.store?.contactLimitStatus ===
        ContactLimitStatus.BrinkOfDissalwoed
      ) {
        count += 1;
      }
      if (
        rootLoaderData?.store?.contactLimitStatus ===
        ContactLimitStatus.Disallowed
      ) {
        count += 1;
      }
      if (!rootLoaderData?.store?.defaultListIdToCollectEmail) {
        count += 1;
      }

      if (count === 0) {
        return undefined;
      } else {
        return {
          number: String(count),
          accessibilityLabel: `you have ${count} unresolved error`,
        };
      }
    }, [
      rootLoaderData?.store?.contactLimitStatus,
      rootLoaderData?.store?.defaultListIdToCollectEmail,
    ]);
  const pathname = location.pathname;
  const handleClosIsMobile = useCallback(() => {
    if (rootLoaderData.isMobile) {
      setClose(true);
    }
  }, [rootLoaderData.isMobile]);
  return (
    <SideNavigation
      title="Menu"
      accessibilityLabel="Menu"
      header={rootLoaderData.isMobile ? null : <Header />}
      footer={<Footer />}
      dismissButton={{
        onDismiss: () => closeMobileSideNav?.(),
        accessibilityLabel: "Close navigation",
      }}
    >
      {rootLoaderData?.isUserSubdomain ? (
        <>
          <SideNavigation.TopItem
            href="/dashboard"
            active={
              location.pathname.includes("/dashboard") ? "page" : undefined
            }
            icon="home"
            label="Home"
            onClick={handleClosIsMobile}
            counter={dashboardCounter}
            notificationAccessibilityLabel={
              dashboardCounter ? "unresolved errors" : undefined
            }
          />

          <SideNavigation.TopItem
            href="/notifications"
            icon="bell"
            label="Notifications"
            notificationAccessibilityLabel={
              rootLoaderData.unReadCount > 0 ? "unread notification" : undefined
            }
            onClick={handleClosIsMobile}
            counter={
              rootLoaderData.unReadCount > 0
                ? {
                    accessibilityLabel: "notification",
                    number: String(rootLoaderData.unReadCount),
                  }
                : undefined
            }
            active={
              location.pathname.includes("/notifications") ? "page" : undefined
            }
          />

          <SideNavigation.TopItem
            href="/automations"
            label="Workflows"
            //@ts-ignore
            icon="desktop"
            onClick={handleClosIsMobile}
            active={
              location.pathname.includes("/automations") ? "page" : undefined
            }
          />
          <SideNavigation.TopItem
            href="/signup-forms"
            label="Sign-up Forms"
            icon="copy-to-clipboard"
            active={pathname.includes("/signup-forms") ? "page" : undefined}
            onClick={handleClosIsMobile}
          />

          <SideNavigation.Group label="Audience" icon="people">
            <SideNavigation.NestedItem
              href="/subscriber-lists"
              label="Lists & Segments"
              onClick={handleClosIsMobile}
              active={
                location.pathname.includes("/subscriber-lists")
                  ? "page"
                  : undefined
              }
            />
            <SideNavigation.NestedItem
              href="/subscribers"
              label="Profiles"
              active={
                location.pathname.includes("/subscribers") ? "page" : undefined
              }
              onClick={handleClosIsMobile}
            />
          </SideNavigation.Group>
          <SideNavigation.Group label="Public" icon="globe">
            <SideNavigation.NestedItem
              href="/"
              label="Newsletter"
              active={pathname.match(/^\/$/) ? "page" : undefined}
              onClick={handleClosIsMobile}
            />
            <SideNavigation.NestedItem
              href="/products"
              label="Products"
              active={pathname.includes("/products") ? "page" : undefined}
              onClick={handleClosIsMobile}
            />

            <SideNavigation.NestedItem
              href="/about"
              label="About"
              active={pathname.includes("/about") ? "page" : undefined}
              onClick={handleClosIsMobile}
            />
          </SideNavigation.Group>
        </>
      ) : (
        <>
          <SideNavigation.TopItem
            href="/"
            active={location.pathname === "/" ? "page" : undefined}
            //@ts-ignore
            icon="gmail"
            label="Newsletter"
            onClick={handleClosIsMobile}
          />
          {/* <SideNavigation.TopItem
            href="/products"
            icon="idea-pin"
            label="Products"
            onClick={handleClosIsMobile}
            active={
              location.pathname.includes("/products") ? "page" : undefined
            }
          /> */}
          <SideNavigation.TopItem
            href="/about"
            icon="person"
            label="About"
            active={location.pathname === "/about" ? "page" : undefined}
            onClick={handleClosIsMobile}
          />
        </>
      )}
    </SideNavigation>
  );
};
