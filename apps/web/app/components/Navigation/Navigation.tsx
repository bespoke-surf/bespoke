import { useLocation } from "@remix-run/react";
import { Box, Sticky } from "gestalt";
import { useRouteLoaderData } from "react-router-dom";
import type { RootData } from "~/root";
import { SideNav } from "../SideNav/SideNav";

export default function Naviagation() {
  const location = useLocation();
  const rootData = useRouteLoaderData("root") as RootData;

  const disableNav =
    rootData?.isUserSubdomain === true && location.pathname.includes("/post");

  if (disableNav) {
    return null;
  }
  if (location.pathname === "/subscribe") {
    return null;
  }
  return (
    <Sticky top={0} zIndex={{ index: () => 0 }}>
      <Box display="none" mdDisplay="block" lgDisplay="block" height="100vh">
        <SideNav />
      </Box>
    </Sticky>
  );
}
