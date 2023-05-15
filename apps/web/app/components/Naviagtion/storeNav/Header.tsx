import { useRouteLoaderData } from "@remix-run/react";
import { Avatar, Flex, IconButton, Link, Text } from "gestalt";
import { useMemo, useReducer, useRef } from "react";
import type { RootData } from "../../../root";
import { getCloudinaryAvatar } from "../../../utils/getCloudinaryFavicon";
import UserMenu from "./UserMenu";

export default function Header() {
  const rootLoaderData = useRouteLoaderData("root") as RootData;
  const [openMoreSettings, toggleMoreSettings] = useReducer((s) => !s, false);
  const anchorRef = useRef(null);

  const avatar = useMemo(
    () => getCloudinaryAvatar(rootLoaderData?.store?.displayPicture?.src),
    [rootLoaderData?.store?.displayPicture?.src]
  );

  return (
    <>
      <Flex justifyContent="between">
        <Link href={"/"}>
          <Flex alignItems="center" gap={2}>
            <Avatar
              name={rootLoaderData?.store?.name ?? ""}
              size="md"
              src={avatar?.src ?? undefined}
            />
            <Text weight="bold" size="300">
              {rootLoaderData.store?.name}
            </Text>
          </Flex>
        </Link>
        {rootLoaderData.isUserSubdomain && (
          <IconButton
            size="sm"
            accessibilityLabel="notification"
            icon="ellipsis"
            iconColor="darkGray"
            ref={anchorRef}
            selected={openMoreSettings}
            onClick={toggleMoreSettings}
          />
        )}
      </Flex>
      {openMoreSettings && rootLoaderData.isUserSubdomain && (
        <UserMenu anchorRef={anchorRef} close={toggleMoreSettings} />
      )}
    </>
  );
}
